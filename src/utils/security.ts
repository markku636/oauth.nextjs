import DOMPurify, { Config } from 'isomorphic-dompurify';

const sanitizeDefaultTags = [
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'b',
    'a',
    'ol',
    'ul',
    'li',
    'hr',
    'i',
    'br',
    'em',
    'small',
    'sup',
];
const sanitizeDefaultAttrs = ['id', 'class', 'style', 'href', 'rel', 'target'];

// should be used with "dangerouslySetInnerHTML"
export function preventXSS(content: string, trustedTags?: string[], trustedAttributes?: string[]) {
    const tagList =
        trustedTags && trustedTags.length > 0
            ? [...new Set([...sanitizeDefaultTags, ...(trustedTags as string[])])]
            : sanitizeDefaultTags;
    const attrList =
        trustedAttributes && trustedAttributes.length > 0
            ? [...new Set([...sanitizeDefaultAttrs, ...(trustedAttributes as string[])])]
            : sanitizeDefaultAttrs;
    const config = { ALLOWED_TAGS: tagList, ALLOWED_ATTR: attrList } as Config;

    return DOMPurify.sanitize(content, config) as string;
}

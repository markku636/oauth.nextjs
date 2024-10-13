// lib/elasticsearch.ts
import { Client } from '@elastic/elasticsearch';

const client = new Client({
    node: 'http://localhost:9200', // 更改为您的 Elasticsearch 节点地址
});

export default client;

'use client';
import { useAppDispatch, useAppSelector } from '@/redux/features/hooks';
import { closeSearch, selectUI } from '@/redux/features/ui/ui-slice';
import Scrollbar from '@components/common/scrollbar';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { useSearchQuery } from '@framework/product/use-search';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

export default function Search() {
    const { displaySearch } = useAppSelector(selectUI);
    const dispatch = useAppDispatch();

    const [searchText, setSearchText] = React.useState('');
    const { data, isLoading } = useSearchQuery({
        text: searchText,
    });

    function handleSearch(e: React.SyntheticEvent) {
        e.preventDefault();
    }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
        setSearchText(e.currentTarget.value);
    }
    function clear() {
        setSearchText('');
    }

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            if (displaySearch) {
                disableBodyScroll(ref.current);
            } else {
                enableBodyScroll(ref.current);
            }
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [displaySearch]);

    return (
        <div ref={ref}>
            <div
                className={cn('overlay', {
                    open: displaySearch,
                })}
                role="button"
                onClick={() => dispatch(closeSearch())}
            />
            <div
                className={cn(
                    'drawer-search invisible relative left-1/2 top-0 z-30 hidden w-full px-4 opacity-0 transition duration-300 ease-in-out md:w-[730px] lg:w-[930px]',
                    {
                        open: displaySearch,
                    }
                )}
            >
                <div className="flex w-full flex-col justify-center">
                    <div className="mt-3.5 w-full flex-shrink-0 lg:mt-4">
                        <div className="mx-auto mb-1.5 flex w-full flex-col ">
                            <SearchBox
                                onSubmit={handleSearch}
                                onChange={handleAutoSearch}
                                name="search"
                                value={searchText}
                                onClear={clear}
                                ref={(input) => input && input.focus()}
                            />
                        </div>
                        {searchText && (
                            <div className="flex h-full max-h-64vh flex-col overflow-hidden rounded-md bg-white lg:max-h-[550px]">
                                <Scrollbar className="os-host-flexbox">
                                    <div className="h-full">
                                        {isLoading ? (
                                            <div className="border-b border-gray-300 border-opacity-30 p-5 last:border-b-0">
                                                {Array.from({ length: 5 }).map((_, idx) => (
                                                    <SearchResultLoader key={idx} uniqueKey={`top-search-${idx}`} />
                                                ))}
                                            </div>
                                        ) : (
                                            data?.map((item: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className=" relative border-b border-gray-150 p-5 last:border-b-0"
                                                    onClick={() => dispatch(closeSearch())}
                                                >
                                                    <SearchProduct item={item} key={index} />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </Scrollbar>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

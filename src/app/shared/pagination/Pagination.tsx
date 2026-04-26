import {type ReactElement, useEffect, useMemo, useState} from "react";
import leftIcon from '/src/assets/icons/left.svg'
import rightIcon from '/src/assets/icons/right.svg'
import {pagePagination} from "./page-pagination.ts";
import type {PaginationProps} from "./pagination.contract.ts";
import './Pagination.scss'

function Pagination({
                        count,
                        perPage,
                        maxPagesView = 5,
                        onChange,
                    }: PaginationProps): ReactElement {
    const [currentPage, setCurrentPage] = useState(1);

    const pages = useMemo(() => {
        const totalPages = Math.ceil(count / perPage);
        return new Array(totalPages).fill(0).map((_, i) => i + 1)
    }, [count, perPage]);

    useEffect(() => {
        const end = currentPage * perPage;
        const start = end - perPage;

        onChange([start, end]);
    }, [currentPage, perPage, onChange]);

    const pagesView = pagePagination(pages, currentPage, maxPagesView);

    const prevPage = (): void => setCurrentPage((p) => p - 1);
    const nextPage = (): void => setCurrentPage((p) => p + 1);
    const setPage = (page: number): void => setCurrentPage(page);

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={prevPage} type="button">
                    <img alt="Назад" src={leftIcon}/>
                </button>
            )}

            {pagesView.map((page) => (
                <button key={page} type="button" onClick={() => setPage(page)}>
          <span className={page === currentPage ? "page-number __active" : "page-number"}>
            {page}
          </span>
                </button>
            ))}

            {currentPage < pages[pages.length - 1] && (
                <button onClick={nextPage} type="button">
                    <img alt="Вперед" src={rightIcon}/>
                </button>
            )}
        </div>
    );
}

export default Pagination;
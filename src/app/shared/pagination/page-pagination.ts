export function pagePagination(
    pages: number[],
    currentPage: number,
    maxPagesView: number
): number[] {
    const pagesGroup = Math.ceil(currentPage / maxPagesView);
    return pages.slice(
        maxPagesView * (pagesGroup - 1),
        maxPagesView * pagesGroup
    );
}
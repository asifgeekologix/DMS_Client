import React from 'react';
import { Form } from 'react-bootstrap';
import { useTable, useSortBy, usePagination } from 'react-table';

function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="">
        <div className="table-responsive">
          <table className="w-100 docs-table docs-table-rounded" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, key) => (
                <tr key={key} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      className="px-3 text-nowrap py-3"
                      key={i}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      title={`${column.isSorted ? column.isSortedDesc ? 'Sort descending' : 'Sort ascending' : 'Sorting'}`}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className={`d-inline-block ms-2 bi bi-arrow-down`} ></i>
                          ) : (
                            <i className={`d-inline-block ms-2 bi bi-arrow-up`} ></i>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, key) => {
                      return (
                        <td
                          className="border-0 border-bottom text-secondary text-nowrap px-3 py-4"
                          key={key}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {page.length == 0 && (
                <tr className="text-center">
                  <td colSpan={4} className="pt-3">
                    No record found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination d-flex align-items-center mt-4">
          <span className="fs-6">
            Page {pageIndex + 1} of {pageOptions.length == 0 && '1' || pageOptions.length}
          </span>
          <div className="d-flex align-items-center">
            <span className="ms-3 fs-6">Show:</span>
            <div>
              <Form.Select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className="ms-2"
              >
                {[10, 20, 30].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <button
            className=" ms-auto page-btn rounded px-2 py-1 me-2"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            title="First Page"
          >
            {'<<'}
          </button>{' '}
          <button
            className="page-btn rounded px-2 py-1 me-2"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            title="Previous Page"
          >
            {'<'}
          </button>{' '}
          <div className="">
            {pageOptions.map((num, key) => (
              <button
                className={`page-btn rounded px-2 py-1 me-2 ${(pageIndex == key && 'active-page-btn') || ''}`}
                key={key}
                value={key}
                onClick={(e) => gotoPage(Number(e.target.value))}
              >
                {key + 1}
              </button>
            ))}
          </div>
          <button
            className=" page-btn rounded px-2 py-1 me-2"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            title="Next Page"
          >
            {'>'}
          </button>{' '}
          <button
            className="page-btn rounded px-2 py-1 me-2"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            title="Last Page"
          >
            {'>>'}
          </button>{' '}
        </div>
      </div>
    </>
  );
}

export default DataTable;

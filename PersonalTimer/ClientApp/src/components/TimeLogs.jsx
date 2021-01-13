import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./timelog_columns";
import { Container, Table, Button } from "reactstrap";
import { getTimeLogs, deleteTimeLog } from "../services/TimeLogAPI";

function TimeLogs() {
  const columns = useMemo(() => COLUMNS, []);
  const [timeLogs, setTimeLogs] = useState([]);

  useEffect(async () => {
    const timeLogs = await getTimeLogs();
    setTimeLogs(timeLogs);
  }, []);

  const tableInstance = useTable({
    columns: columns,
    data: timeLogs
  }, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow
  } = tableInstance;

  const { pageIndex } = state;

  async function handleDelete(id) {
    await deleteTimeLog(id);
    let newTimeLogs = timeLogs.filter(tl => tl.id !== id);
    setTimeLogs(newTimeLogs);
  }

  return (
    <Container className="mt-5 text-center">
      <Table {...getTableProps()} className="mb-0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>{row.values.category}</td>
                <td>{row.values.description}</td>
                <td>{row.values.duration}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(row.values.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {timeLogs.length > 0 &&
        <>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>

          <div className="mt-2">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage} color="primary" className="mr-3">Previous</Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage} color="primary">Next</Button>
          </div>
        </>
      }
    </Container>
  );
}

export default TimeLogs;

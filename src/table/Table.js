import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

export default function BasicTable({
  rows,
  onEditRow,
  onDeleteRow,
}) {
  const [updatedRows, setUpdatedRows] = useState(rows);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUpdatedRows(rows);
  }, [rows]);

  function deleteRow(rowToDel) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updateRows = updatedRows.filter((row) => row.id !== rowToDel.id);
        setUpdatedRows(updateRows);
        onDeleteRow(rowToDel);
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  }

  function editRow(rowToEdit) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onEditRow(rowToEdit);
      }
    });
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <TableContainer
      className="tableContainer"
      style={{
        height:"78vh",
        backgroundColor: "rgb(236, 240, 243)",
        boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.854)",
      }}
      component={Paper}
    >
      <div className="searchBar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <form onSubmit={(e) => e.preventDefault()}>
                <div
                  className="searchBar"
                  style={{
                    display: "flex",
                    backgroundColor: alpha("#fff", 0.15),
                    borderRadius: "1.6vh", 
                  }}
                >
                  <div
                    style={{
                      padding: "6px 6px 6px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SearchIcon />
                  </div>
                  <InputBase
                    onChange={handleSearchChange}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    style={{
                      color: "inherit",
                      width: "100%",
                      paddingLeft: "35px",
                      marginRight: "10vh",
                    }}
                  />
                </div>
              </form>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <Table className="table" sx={{ maxHeight: 200 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell className="action" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedRows
            .filter((row) =>
              Object.values(row).some(
                (value) =>
                  typeof value === "string" &&
                  value.toLowerCase().includes(search.toLowerCase())
              )
            )
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell className="buttons" align="center">
                  <button className="tableButtons" onClick={() => editRow(row)}>
                    {"Edit" || (row.actions && row.actions.edit)}
                  </button>
                  <button
                    className="tableButtons"
                    onClick={() => deleteRow(row)}
                  >
                    {"Delete" || (row.actions && row.actions.delete)}
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import BasicTable from "./table/Table";
import React, { useState } from "react";
import Register from "./register/Register";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "hamza",
      email: "hamza@gmail.com",
      phone: "03211321456",
      address: "SA-O",
    },
    {
      id: 2,
      name: "hasnat",
      email: "hasnat@gmail.com",
      phone: "03211321456",
      address: "SA-1",
    },
    {
      id: 3,
      name: "Uzair",
      email: "uzair@gmail.com",
      phone: "03211323456",
      address: "SA-3",
    },
    {
      id: 4,
      name: "Mohib",
      email: "mohib@gmail.com",
      phone: "03213421456",
      address: "SA-4",
    },
    {
      id: 5,
      name: "kashif",
      email: "kashif@gmail.com",
      phone: "03211321456",
      address: "SA-6",
    },
    {
      id: 6,
      name: "kaka",
      email: "kaka@gmail.com",
      phone: "03215621456",
      address: "SA-7",
    },
    {
      id: 7,
      name: "Tayyab",
      email: "tayyab@gmail.com",
      phone: "03211321456",
      address: "SA-87",
    },
    {
      id: 8,
      name: "Mustafa",
      email: "mustafa@gmail.com",
      phone: "03211321456",
      address: "SA-47",
    },
    {
      id: 9,
      name: "Shahmeer",
      email: "shahmeer@gmail.com",
      phone: "03211321456",
      address: "SA-37",
    },
  ]);
  const [idCounter, setIdCounter] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editRowData, setEditRowData] = useState(null);

  const handleDeleteRow = (rowToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== rowToDelete.id);
    setRows(updatedRows);
    setEditRowData(null);
    setEditMode(false);
  };

  const handleEditRow = (editedRow) => {
    const updatedRows = rows.map((row) =>
      row.id === editedRow.id ? editedRow : row
    );
    setRows(updatedRows);
    setEditMode(false);
    setEditRowData(null);
  };

  const handleResetEditMode = () => {
    setEditMode(false);
  };

  const handleSubmit = (formData) => {
    const isEmailUnique = !rows.some((row) => row.email === formData.email);
    if (editMode) {
      handleEditRow(formData);
    } else {
      if (!isEmailUnique) {
        Swal.fire("Error", "Email address must be unique", "error");
        return;
      }
      const newRow = {
        id: idCounter,
        ...formData,
      };
      setRows([...rows, newRow]);
      setIdCounter(idCounter + 1);
    }
  };

  return (
    <div className="App">
      <div className="form">
        <Register
          onSubmit={handleSubmit}
          editMode={editMode}
          editRowData={editRowData}
          onEditCallback={setEditRowData}
          onResetEditMode={handleResetEditMode}
        />
        <BasicTable
          rows={rows}
          onDeleteRow={handleDeleteRow}
          onEditRow={(rowData) => {
            setEditMode(true);
            setEditRowData(rowData);
          }}
          editButtonName="Edit"
          deleteButtonName="Delete"
          editMode={editMode}
          editRowData={editRowData}
        />
      </div>
    </div>
  );
}

export default App;

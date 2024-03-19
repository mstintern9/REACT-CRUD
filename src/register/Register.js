import "./register.css";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Register({ onSubmit, editMode, editRowData, onResetEditMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editMode === true) {
      setFormData(editRowData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [editMode, editRowData]);

  const [errors, setErrors] = useState({});
  const [submitLabel, setSubmitLabel] = useState("");

  useEffect(() => {
    setSubmitLabel(editMode ? "Update" : "Submit");
  }, [editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    validateForm(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value === "") {
        acc[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
      return acc;
    }, {});

    const fieldsWithErrorAndEmpty = { ...emptyFields, ...errors };
    if (Object.keys(emptyFields).length > 0) {
      setErrors(fieldsWithErrorAndEmpty);
      return;
    }
    const inputErrors = Object.values(errors).filter((error) => error !== "");
    if (inputErrors.length > 0) {
      return;
    }
    setErrors({});

    if (editMode) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: "Don't save",
      }).then((result) => {
        if (result.isConfirmed) {
          onSubmit(formData);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      onSubmit(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  };

  const validateForm = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "name":
        if (!value) {
          error = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name must contain only alphabetic characters";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^\S+@\S+\.com$/.test(value)) {
          error = "Email is invalid";
        }
        break;

      case "phone":
        if (!value) {
          error = "Phone is required";
        } else if (!/^03\d{9}$/.test(value)) {
          error = "Phone number must start with 03 and should be 11 digits";
        }
        break;
      case "address":
        if (!value) {
          error = "Address is required";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const resetButton = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setErrors({});
    setSubmitLabel("Submit");

    if (editMode) {
      onResetEditMode();
    }
  };

  return (
    <div className="register">
      <div className="inputs">
        <h1 className="title">Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={`input ${errors.name ? "errorBorder" : ""}`}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            className={`input ${errors.email ? "errorBorder" : ""}`}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            className={`input ${errors.phone ? "errorBorder" : ""}`}
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <input
            className={`input ${errors.address ? "errorBorder" : ""}`}
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
          <div className="button">
            <button type="submit" className="submitButton">
              {submitLabel}
            </button>
          </div>
        </form>
        <button type="reset" onClick={resetButton} className="resetButton">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Register;

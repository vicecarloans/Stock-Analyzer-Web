import axios from "axios";
import { getCheckEmailEndpoint, API_BASE_PATH } from "constants/api";

export const registerValidate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(values.password)) {
    errors.password =
      "Minimum eight characters, at least one letter and one number";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Field must not be empty";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Confirm password must match";
  }
  return errors;
};

export const registerValidateAsync = async values => {
  // Validate email against the endpoint
  const errors = {};
  if (
    values.email &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    const CHECK_EMAIL_ENDPOINT = getCheckEmailEndpoint(values.email);
    try {
      const data = await axios.get(`${API_BASE_PATH}${CHECK_EMAIL_ENDPOINT}`);
    } catch (err) {
      errors.email = "Email is already taken";
      throw errors;
    }
  }
};

function isValidDate(dateString) {
  //Date should be in YYYY-MM-DD format
  var regEx = /^\d{4}-\d{1,2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return false; // Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

export const addStockValidation = values => {
  const errors = {};
  if (!values.stockname) {
    errors.stockname = "Stock name is required";
  }
  if (!values.amount) {
    errors.amount = "Amount is required";
  } else if (isNaN(values.amount)) {
    errors.amount = "Amount should be a number";
  }
  if (!values.price) {
    errors.price = "Price is required";
  } else if (isNaN(values.price)) {
    errors.price = "Price should be a number";
  }
  if (!values.date) {
    errors.date = "Date is required";
  } else if (
    !/^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})$/.test(values.date)
  ) {
    errors.date = "Date is invalid";
  }
  return errors;
};

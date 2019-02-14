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

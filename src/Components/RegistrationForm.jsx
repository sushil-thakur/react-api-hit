


import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
const RegisterForm = () => {
  const registerUser = async (values) => {
    try {
      await axios.post("http://localhost:8000/student/register", values);
    } catch (error) {
      console.log("Register api hit failed...", error);
    }
  };
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        address: "",
        gender: "",
        phoneNumber: "",
      }}
      validationSchema={yup.object({
        fullName: yup
          .string()
          .required("Full name is required.")
          .trim()
          .max(255, "Full name must be at max 255 characters."),
        email: yup
          .string()
          .email("Must be a valid email.")
          .required("Email is required.")
          .trim()
          .max(100, "Email must be at max 100 characters.")
          .lowercase(),
        address: yup
          .string()
          .notRequired()
          .max(255, "Address must be at max 255 characters.")
          .trim(),
        password: yup
          .string()
          .required("Password is required.")
          .trim()
          .min(8, "Password must be at least 8 characters.")
          .max(30, "Password must be at max 30 characters."),
        gender: yup
          .string()
          .required("Gender is required.")
          .trim()
          .oneOf(
            ["male", "female", "other", "preferNotToSay"],
            "Gender should be either male or female or other or  preferNotToSay."
          ),

        phoneNumber: yup
          .string()
          .notRequired()
          .trim()
          .min(10, "Phone number must be at least 10 characters.")
          .max(20, "Phone number must be at max 20 characters."),
      })}
      onSubmit={(values) => {
        registerUser(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              gap: "2rem",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              padding: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Register</Typography>

            <FormControl fullWidth>
              <TextField
                label="Full Name"
                {...formik.getFieldProps("fullName")}
              />

              {formik.touched.fullName && formik.errors.fullName ? (
                <FormHelperText error>{formik.errors.fullName}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Email" {...formik.getFieldProps("email")} />

              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Password"
                {...formik.getFieldProps("password")}
              />

              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField label="Address" {...formik.getFieldProps("address")} />

              {formik.touched.address && formik.errors.address ? (
                <FormHelperText error>{formik.errors.address}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select {...formik.getFieldProps("gender")} label="Gender">
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
                <MenuItem value={"preferNotToSay"}>Prefer Not To Say</MenuItem>
              </Select>

              {formik.touched.gender && formik.errors.gender ? (
                <FormHelperText error>{formik.errors.gender}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Phone Number"
                {...formik.getFieldProps("phoneNumber")}
              />

              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <FormHelperText error>
                  {formik.errors.phoneNumber}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
            >
              submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;

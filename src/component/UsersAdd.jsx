import React from "react";
import * as yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import { Fab, Grid, InputAdornment, TextField, Tooltip } from "@mui/material";
import Button from "./common/Button";

const validateAddUsers = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  email: yup.string().email().required(),
  phone: yup
    .number()
    .min(99999999, "Please enter minimum 8 digits")
    .max(999999999999, "Too Long!")
    .required(),
  professional_title: yup
    .string()
    .required("Please enter professional job title"),
  short_information: yup
    .string()
    .required("Please enter short information about you"),
  company: yup.string().required(),
  years: yup.string().required("This field is required"),
  company_address: yup.string().required("This field is required"),
  profile_pic: yup.mixed().required("Please select an profile image"),
  skills: yup.array().of(yup.string()),
  experience: yup.array().of(yup.string()),
});

const UsersAdd = (props) => {
  const { addUsers, add_loading, updateData, updateUsers, is_update } = props;

  return (
    <Formik
      initialValues={
        is_update
          ? updateData
          : {
              name: "",
              email: "",
              phone: "",
              professional_title: "",
              short_information: "",
              github_url: "",
              linkedin_url: "",
              company: "",
              years: "",
              company_address: "",
              experience: [""],
              skills: [""],
            }
      }
      validationSchema={validateAddUsers}
      onSubmit={(values) => {
        let payload = {
          ...values,
        };
        payload.experience = JSON.stringify(payload.experience);
        payload.skills = JSON.stringify(payload.skills);
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        if (is_update) updateUsers(formData);
        else addUsers(formData);
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isValid,
        setFieldValue,
      }) => (
        <Form noValidate autoComplete="off" encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={!touched.name && Boolean(errors.name)}
                helperText={!touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={!touched.email && Boolean(errors.email)}
                helperText={!touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mobile"
                variant="outlined"
                type="text"
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                error={!touched.phone && Boolean(errors.phone)}
                helperText={!touched.phone && errors.phone}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                type="file"
                onChange={(e) =>
                  setFieldValue("profile_pic", e.currentTarget.files[0])
                }
                error={!touched.profile_pic && Boolean(errors.profile_pic)}
                helperText={!touched.profile_pic && errors.profile_pic}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Profession Job Title"
                variant="outlined"
                type="text"
                onChange={handleChange("professional_title")}
                onBlur={handleBlur("professional_title")}
                value={values.professional_title}
                error={
                  !touched.professional_title &&
                  Boolean(errors.professional_title)
                }
                helperText={
                  !touched.professional_title && errors.professional_title
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Short information about you"
                variant="outlined"
                type="text"
                onChange={handleChange("short_information")}
                onBlur={handleBlur("short_information")}
                value={values.short_information}
                error={
                  !touched.short_information &&
                  Boolean(errors.short_information)
                }
                helperText={
                  !touched.short_information && errors.short_information
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Company Name"
                variant="outlined"
                type="text"
                onChange={handleChange("company")}
                onBlur={handleBlur("company")}
                value={values.company}
                error={!touched.company && Boolean(errors.company)}
                helperText={!touched.company && errors.company}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Company Address"
                variant="outlined"
                type="text"
                onChange={handleChange("company_address")}
                onBlur={handleBlur("company_address")}
                value={values.company_address}
                error={
                  !touched.company_address && Boolean(errors.company_address)
                }
                helperText={!touched.company_address && errors.company_address}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Year of experience"
                variant="outlined"
                type="text"
                onChange={handleChange("years")}
                onBlur={handleBlur("years")}
                value={values.years}
                error={!touched.years && Boolean(errors.years)}
                helperText={!touched.years && errors.years}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Github URL"
                variant="outlined"
                type="text"
                onChange={handleChange("github_url")}
                onBlur={handleBlur("github_url")}
                value={values.github_url}
                error={!touched.github_url && Boolean(errors.github_url)}
                helperText={!touched.github_url && errors.github_url}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                variant="outlined"
                type="text"
                onChange={handleChange("linkedin_url")}
                onBlur={handleBlur("linkedin_url")}
                value={values.linkedin_url}
                error={!touched.linkedin_url && Boolean(errors.linkedin_url)}
                helperText={!touched.linkedin_url && errors.linkedin_url}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={6}>
              <FieldArray name="skills" validateOnChange={false}>
                {({ push, remove }) => (
                  <div>
                    {values.skills.map((p, index) => {
                      return (
                        <div key={index}>
                          <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Add skills"
                            name={`skills[${index}]`}
                            onChange={handleChange(`skills[${index}]`)}
                            onBlur={handleBlur(`skills[${index}]`)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <Tooltip title="Add Skills">
                                    {index + 1 === values.skills.length ? (
                                      <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => push(index)}
                                      >
                                        +
                                      </Fab>
                                    ) : (
                                      <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => remove(index)}
                                      >
                                        -
                                      </Fab>
                                    )}
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </Grid>
            <Grid item xs={6}>
              <FieldArray name="experience" validateOnChange={false}>
                {({ push, remove }) => (
                  <div>
                    {values.experience.map((p, index) => {
                      return (
                        <div key={index}>
                          <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Add experience"
                            name={`experience[${index}]`}
                            onChange={handleChange(`experience[${index}]`)}
                            onBlur={handleBlur(`experience[${index}]`)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <Tooltip title="Add Experience">
                                    {index + 1 === values.experience.length ? (
                                      <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => push(index)}
                                      >
                                        +
                                      </Fab>
                                    ) : (
                                      <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => remove(index)}
                                      >
                                        -
                                      </Fab>
                                    )}
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={!isValid}
                variant="contained"
                loading={add_loading}
                fullWidth
              >
                {is_update ? "Update Users" : "Add Users"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UsersAdd;

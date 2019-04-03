import React from "react";
import ReactDOM from "react-dom";
import * as yup from "yup";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import "./styles.css";

const LoginForm = props => {
  const { values, touched, handleChange, errors, isSubmitting } = props;
  return (
    <React.Fragment>
      <h4>
        <strong>
          All the places marked with the <span style={{ color: "red" }}>*</span>{" "}
          are required
        </strong>
      </h4>
      {Object.keys(errors).length !== 0 && !errors.blocked && (
        <p style={{ color: "orange" }}>All fields are required in the form</p>
      )}
      {errors.blocked && <h3>{errors.blocked}</h3>}
      <h3>Login page</h3>
      <Form>
        <label>Email Or Username :</label>
        <Field type="text" name="email" placeholder="Email / Username" />{" "}
        <span style={{ color: "red" }}>
          {" * "}
          <ErrorMessage name="email" />
        </span>
        <br />
        <label>Password</label>
        <Field
          type="password"
          name="password"
          placeholder="Enter your password"
        />{" "}
        <span style={{ color: "red" }}>
          {" * "}
          <ErrorMessage name="password" />{" "}
        </span>
        <br />
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
        <Field type="button" name="toRegister" value="Register" />
      </Form>
    </React.Fragment>
  );
};

const RegisterForm = props => {
  // const {} = props;
  return (
    <React.Fragment>
      <h3>Register page</h3>

      <Form>
        <label>Name: </label>
        <Field type="text" name="register_name" placeholder="Your name" />
        <br />
        <label>Email: </label>
        <Field
          type="email"
          name="register_email"
          placeholder="Enter email address"
        />
        <br />
        <label>Password</label>
        <Field
          type="password"
          name="register_password"
          placeholder="New password"
        />
        <br />
        <label>Confirm password</label>
        <Field
          type="password"
          name="register_pass_confirm"
          placeholder="Re-enter password above"
        />
        <br />
        <button type="submit">Register new user</button>
      </Form>
    </React.Fragment>
  );
};

const myForms = props => {
  const { values, touched, errors } = props;
  return (
    <React.Fragment>
      <h1>Simulating login Page</h1>
      {!touched.toRegister && (
        <LoginForm touched={touched} values={values} errors={errors} />
      )}
      {touched.toRegister && <RegisterForm values={values} />}
    </React.Fragment>
  );
};

const validators = {
  email: yup
    .string()
    .email()
    .required("missing..."),
  password: yup
    .string()
    .min(6)
    .strict(true)
    .required("missing...")
};

const EnhancingForms = withFormik({
  mapPropsToValues: ({ email, password }) => ({
    email: email || "",
    password: password || "",
    register_name: "",
    register_email: "",
    register_password: "",
    register_pass_confirm: "",
    toRegister: false
  }),
  validationSchema: yup.object().shape(validators),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const blockedEmails = [
      {
        email: "siya@uber5.com",
        password: "1234567"
      },
      {
        email: "zanele@uber5.com",
        password: "7654321"
      }
    ];
    let checkIfBlocked = false;
    blockedEmails.forEach(user => {
      if (user.email === values.email) {
        checkIfBlocked = true;
      }
    });
    console.log("blocked? ", checkIfBlocked);
    if (checkIfBlocked) {
      setErrors({ blocked: "This user is blocked from our services" });
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
      // resetForm()
    } else {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  }
})(LoginForm);
const rootElement = document.getElementById("root");
ReactDOM.render(<EnhancingForms />, rootElement);

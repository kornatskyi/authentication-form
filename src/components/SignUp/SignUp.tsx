import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import "../../styles/FormContainer.scss";
import "./SignUp.scss";
interface Props {}

type FormValues = {
  email: string;
  userName: string;
  password: string;
  repeatPassword: string;
};

function SignUp({}: Props): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const displayFormError = (message?: string): ReactElement | undefined => {
    if (message) {
      return <p className="error">{message}</p>;
    }
  };

  console.log("errors", errors);

  return (
    <div className="signUpContainer formContainer">
      <div className="form-header">
        <h2>Create a new account</h2>
      </div>
      <form
        className="signUpForm"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input
          {...register("email", {
            required: { value: true, message: "Input your email!" },
            maxLength: {
              value: 30,
              message: "Field length should be less then 30 chars!",
            },
          })}
          type="text"
          placeholder="Email"
        />
        {displayFormError(errors.email?.message)}
        <input
          {...register("userName", {
            required: { value: true, message: "Choose your user name!" },
            maxLength: {
              value: 16,
              message: "Field length should be less then 16 chars!",
            },
          })}
          type="text"
          placeholder="User name"
        />
        {displayFormError(errors.userName?.message)}

        <input
          {...register("password", {
            required: { value: true, message: "Choose your password" },
            maxLength: {
              value: 30,
              message: "Field length should be less then 30 chars!",
            },
          })}
          type="password"
          className="password"
          placeholder="Password"
        />
        {displayFormError(errors.password?.message)}

        <input
          {...register("repeatPassword", {
            required: { value: true, message: "Repeat your password" },
            maxLength: {
              value: 30,
              message: "Field length should be less then 30 chars!",
            },
          })}
          type="password"
          className="password"
          placeholder="Repeat password"
        />
        {displayFormError(errors.repeatPassword?.message)}

        <input type="submit" className="button" value="Sign Up" />
      </form>

      <div className="form-footer"></div>
      <p>
        Already have an account? <a href="/registration">Log In</a>
      </p>
    </div>
  );
}

export default SignUp;

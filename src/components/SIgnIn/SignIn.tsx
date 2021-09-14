import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import "./SignIn.scss";

interface Props {}

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn({}: Props): ReactElement {
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

  return (
    <div className="signInContainer formContainer">
      <div className="form-header">
        <h2>Login to you account</h2>
      </div>
      <form className="signInForm" onSubmit={handleSubmit((data) => {
          console.log(data);
        })}>
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
          {...register("password", {
            required: { value: true, message: "Input your password!" },
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

        <input type="submit" className="button" value="Sign In" />
      </form>

      <div className="form-footer"></div>
      <p>
        Don't have an account? <a href="/registration">Sign up</a>
      </p>
      <a href="/restore-password"></a>
    </div>
  );
}

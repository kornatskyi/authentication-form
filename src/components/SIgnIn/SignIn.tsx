import React, { ReactElement } from "react";
import "./SignIn.scss";

interface Props {}

export default function SignIn({}: Props): ReactElement {
  return (
    <div className="signInContainer formContainer">
      <div className="form-header">
        <h2>Login to you account</h2>
      </div>
      <form className="signInForm">
        <input type="text" placeholder="Email" />
        <input type="password" className="password" placeholder="Password" />
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

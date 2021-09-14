import React, { ReactElement } from "react";
import "../../styles/FormContainer.scss";
import "./SignUp.scss";
interface Props {}

function SignUp({}: Props): ReactElement {
  return (
    <div className="signUpContainer formContainer">
      <div className="form-header">
        <h2>Create a new account</h2>
      </div>
      <form className="signInForm">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Nikname" />
        <input type="password" className="password" placeholder="Password" />
        <input
          type="password"
          className="password"
          placeholder="Repeat password"
        />
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

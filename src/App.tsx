import React from "react";
import img from "./assets/images/logo512.png";
import SignIn from "./components/SIgnIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

export default function App() {
  return (
    <div className="appContainer">
      <SignUp />
    </div>
  );
}

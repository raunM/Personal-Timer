import React from "react";
import NavMenu from "./NavMenu";
import "./Layout.css";

export default (props: { children?: React.ReactNode, loggedIn: boolean, setLoggedIn: any }) => (
  <div className="layout">
    <NavMenu loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
    {props.children}
  </div>
);

import React from "react";
import NavMenu from "./NavMenu";
import "./Layout.css";

export default (props: { children?: React.ReactNode, loggedIn: boolean, setLoggedIn: any }) => (
  <div className="layout" style={{ backgroundImage: "url(/images/background.jpg)" }}>
    <NavMenu loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
    {props.children}
  </div>
);

import React, { useState } from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../services/UserAPI";
import "./NavMenu.css";

type Props = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavMenu(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory();

  function toggle() {
    setIsOpen(!isOpen);
  }

  function logout() {
    logoutUser();
    history.push({ pathname: "/" });
    props.setLoggedIn(false);
	}

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-dark" dark>
        <Container>
          <NavbarBrand tag={Link} to="/">Personal Timer</NavbarBrand>

          <NavbarToggler onClick={toggle} className="mr-2" />

          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
            <ul className="navbar-nav flex-grow">
              {(props.loggedIn && 
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/time-logs">Time Logs</NavLink>
                </NavItem>
              )}

              {(props.loggedIn && 
                <NavItem>
                  <NavLink tag={Link} onClick={() => logout() } className="text-light" to="/">Logout</NavLink>
                </NavItem>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu;

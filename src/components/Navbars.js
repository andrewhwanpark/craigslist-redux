import React from "react";
import { Link } from "react-router-dom";

// Import Bootstrap styles
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Navbars() {
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to="/">
          craigslist redux
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/sell">
            Sell
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    </header>
  );
}

export default Navbars;

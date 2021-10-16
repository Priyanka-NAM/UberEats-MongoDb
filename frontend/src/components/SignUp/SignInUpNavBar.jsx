import React, { useHistory } from "react-router-dom";
import { Button, Nav, Container, Navbar } from "react-bootstrap";
import UberELogo from "../Home/HomeIcons/logo";

function SignInUpNAV() {
  const history = useHistory(null);
  const tostartpage = useHistory(null);
  const handletoSignin = () => {
    history.push("/signin");
  };
  const handleImage = () => {
    tostartpage.push("/");
  };
  return (
    <Navbar bg='dark' variant='dark'>
      <Container
        align='right'
        style={{
          padding: "0px",
          margin: "0px",
        }}>
        <Navbar.Brand href='#home'>
          <Nav>
            <Nav.Item
              style={{
                marginLeft: "50px",
                width: "100%",
              }}
              onClick={handleImage}>
              <img
                style={{ height: "60px", marginRight: "100px" }}
                src={UberELogo.UberEWLogo.src}
                alt={UberELogo.UberEWLogo.alt}
              />
            </Nav.Item>
            <Nav.Item
              style={{
                marginLeft: "350%",
                marginRight: "0",
                paddingRight: "10px",
              }}>
              <Button variant='dark' type='submit' onClick={handletoSignin}>
                Sign In
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default SignInUpNAV;

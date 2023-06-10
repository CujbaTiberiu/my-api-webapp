import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const User = {
      username: username,
      password: password,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResponseText(data);
      } else {
        console.log("Error occurred with the request");
        alert("Username or email wrong!");
      }
    } catch (error) {
      console.log("Generic error occurred", error);
      alert(error);
    }

    setLoading(false);
  };

  return (
    <Container className="py-5">
      {loading ? (
        <Row>
          <Col className="mx-auto mb-4">
            <Spinner animation="border" variant="primary" size="lg" />
          </Col>
        </Row>
      ) : responseText ? (
        <Row>
          <Col xs={10} md={6} className="mx-auto mb-4">
            <h1 className="text-white my-2">User Page</h1>
            <h3 className="text-white my-5">
              Bellow you have your token! Check our API documentation for
              further details!
            </h3>
            <ListGroup class="border border-success rounded">
              <ListGroup.Item className="fw-bold text-white bg-black py-2">
                Username
              </ListGroup.Item>
              <ListGroup.Item variant="info py-2">
                {responseText.username}
              </ListGroup.Item>
              <ListGroup.Item className="fw-bold text-white bg-black py-2">
                AccessToken
              </ListGroup.Item>
              <ListGroup.Item
                className="py-2"
                variant="info"
                style={{ wordBreak: "break-word" }}
              >
                {responseText.accessToken}
              </ListGroup.Item>
              <ListGroup.Item className="fw-bold text-white bg-black py-2">
                TokenType
              </ListGroup.Item>
              <ListGroup.Item variant="info py-2">
                {responseText.tokenType}
              </ListGroup.Item>
            </ListGroup>
            <Link to="/" className="nav-link">
              <Button variant="success" className="text-white bg-dark my-3">
                Go to login page
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={10} md={6} className="mx-auto mb-4">
            <div className="login-box">
              <h1 className="my-3 text-white">Login Page</h1>
              <form>
                <div className="user-box">
                  <input
                    type="text"
                    name=""
                    value={username}
                    onChange={handleUserNameChange}
                    required
                  />
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    name=""
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <label>Password</label>
                </div>
                <center>
                  <a className="color-white" onClick={handleSubmit}>
                    LOGIN
                    <span></span>
                  </a>
                </center>
              </form>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default LoginPage;

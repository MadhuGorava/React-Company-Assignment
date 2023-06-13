import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Badge, Table, th, td } from "react-bootstrap";
const JokesApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jokes, setJokes] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // Get jokes from the Jokes API
    fetch(
      "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
    )
      .then((response) => response.json())
      .then((data) => setJokes(data.jokes));
  }, []);
  const handleLogin = () => {
    // Validate the login form
    if (username === "" || password === "") {
      alert("Please enter a username and password.");
      return;
    }
    // Authenticate the user
    setIsAuthenticated(true);
    // If the user is authenticated, redirect to the homepage
    if (isAuthenticated) {
      window.location.href = "/home";
    }
  };
  const handleLogout = () => {
    // Log the user out
    setIsAuthenticated(false);
    // Redirect to the login screen
    window.location.href = "/login";
  };
  return (
    <div className="container">
      <h1>Jokes App</h1>
      <nav>
        <a href="/login">Login</a>
        <a href="/home">Home</a>
      </nav>
      {!isAuthenticated && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {isAuthenticated && (
        <Homepage jokes={jokes} handleLogout={handleLogout} />
      )}
    </div>
  );
};
const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <Form onSubmit={handleLogin}>
      <FormGroup>
        <Badge for="username">Username</Badge>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={setUsername}
          required
        />
      </FormGroup>
      <FormGroup>
        <Badge for="password">Password</Badge>
        <Form.Control
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={setPassword}
          required
        />
      </FormGroup>
      <Button type="submit">Login</Button>
    </Form>
  );
};
const Homepage = ({ jokes, handleLogout }) => {
  return (
    <div>
      <h2>Jokes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => (
            <tr>
              <td>{joke.joke}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
export default JokesApp;

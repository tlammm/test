import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../Style/SignUp.css";
import M from "materialize-css";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Cactus
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:5000/signin", data)
      .then((res) => {
        if (res.data.error) {
          M.toast({ html: res.data.error, classes: "red" });
        } else {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch({ type: "USER", payload: res.data.user });
          M.toast({ html: "Signed in successfully", classes: "green" });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
    // fetch("http://localhost:5000/signin", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     password,
    //     email,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.error) {
    //       M.toast({ html: data.error, classes: "red" });
    //     } else {
    //       localStorage.setItem("jwt", data.token);
    //       localStorage.setItem("user", JSON.stringify(data.user));
    //       dispatch({ type: "USER", payload: data.user });
    //       M.toast({ html: "Signed in successfully", classes: "green" });
    //       history.push("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="signup">
      <Container component="main" maxWidth="xs">
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                SignIn();
              }}
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>

        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <div className="image">
        <img
          src="https://ih1.redbubble.net/image.1539737948.3563/raf,600x600,075,t,FFFFFF:97ab1c12de.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

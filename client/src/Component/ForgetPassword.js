import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../Style/SignUp.css";
import M from "materialize-css";

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ChangePassword = () => {
    if (confirmPassword !== password) {
      M.toast({ html: "Password does not match", classes: "red" });
      return;
    }
    fetch("http://localhost:5000/changepassword", {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        M.toast({ html: result.data, classes: "green" });
        history.push("/profile");
      });
  };
  return (
    <div className="signup">
      <Container component="main" maxWidth="xs">
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ChangePassword();
              }}
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Change Password
              </Button>
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

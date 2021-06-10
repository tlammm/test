import React, { useEffect, useState } from "react";
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  upload: {
    width: "20%",
    marginTop: theme.spacing(1),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cactus");
    data.append("cloud_name", "dxeac7lyn");
    fetch("https://api.cloudinary.com/v1_1/dxeac7lyn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const uploadFields = () => {
    if (!/^[a-z0-9]{3,16}$/.test(username)) {
      M.toast({
        html: "Username must consist of 6 to 30 characters, and can only contain lowercase alphanumeric characters",
        classes: "red",
      });
      return;
    }
    const payload = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      pic: url,
    };
    axios
      .post("http://localhost:5000/signup", payload)
      .then((res) => {
        if (res.data.error) {
          M.toast({ html: res.data.error, classes: "red" });
        } else {
          M.toast({ html: res.data.message, classes: "green" });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  const SignUp = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }

    // fetch("http://localhost:5000/signup", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     password,
    //     email,
    //     confirmPassword,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) {
    //       M.toast({ html: data.error, classes: "red" });
    //     } else {
    //       M.toast({ html: data.message, classes: "green" });
    //       history.push("/signin");
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
              Sign Up
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                SignUp();
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
                value={username}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ background: "white", marginTop: "10px" }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin" variant="body2">
                    {"Already have an account? Sign In"}
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

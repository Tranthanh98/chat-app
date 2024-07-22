import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import * as httpClient from "../utils/httpClient";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../slices";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useBoundStore();

  const navigate = useNavigate();

  useEffect(() => {
    // Load the Google Sign-In script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    // Initialize the Google Sign-In button
    const initializeGoogleSignIn = () => {
      console.log("client id", process.env.REACT_APP_GG_CLIENT);

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GG_CLIENT,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    };

    const handleCredentialResponse = (response) => {
      httpClient
        .sendPost("/auth/google", {
          credential: response.credential,
        })
        .then((res) => {
          setUserInfo(res.data.userInfo);
          localStorage.setItem("token", res.data.token);
          navigate("/chat");
        });
    };

    loadGoogleScript();
  }, [navigate, setUserInfo]);

  const login = async () => {
    try {
      const payload = { email, password };
      const res = await httpClient.sendPost("/user/login", payload);
      setUserInfo(res.data.userInfo);
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://picsum.photos/1280)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            margin: "32px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              margin: 4,
              backgroundColor: "linear-gradient(to bottom, #4b6cb7, #182848)",
            }}
          >
            <LockClockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormControl
            sx={{
              width: "100%", // Fix IE 11 issue.
              marginTop: 4,
            }}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(v) => setEmail(v.target.value)}
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
              autoComplete="current-password"
              onChange={(v) => setPassword(v.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: "12px 0 4px",
              }}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <MadeWithLove />
            </Box> */}
          </FormControl>
          <div id="google-signin-button"></div>
          {/* <Button onClick={loginWithGoogle}>Login with Google</Button> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

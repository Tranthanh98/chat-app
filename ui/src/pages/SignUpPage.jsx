import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import * as httpClient from "../utils/httpClient";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onRegister = async () => {
    const payload = {
      friendlyName: `${firstName} ${lastName}`,
      email,
      password,
    };

    try {
      const res = await httpClient.sendPost("/user/register", payload);
      navigate("/login");
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "red",
          }}
        >
          <LockClockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormControl
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: 12,
          }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(v) => setFirstName(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(v) => setLastName(v.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(v) => setEmail(v.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(v) => setPassword(v.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree with the policy"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: "12px 0 8px",
            }}
            onClick={onRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
}

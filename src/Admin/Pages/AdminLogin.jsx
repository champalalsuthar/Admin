import "./login.css";
import {
  Avatar,
  Button,
  CssBaseline,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { MdLockOutline } from "react-icons/md";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { adminLogin } from "../../API/common/adminLogin";
import { useAuth } from "../../Context/AuthContext";

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/crm/home");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.email && !credentials.password) {
        toast.error("All fields are required", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (!emailRegex.test(credentials.email)) {
        toast.error("Please enter a valid email", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (credentials.password.length < 5) {
        toast.error("Please enter valid password", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (credentials.email && credentials.password) {
        const data = {
          email: credentials.email,
          password: credentials.password,
        };
        const response = await adminLogin(data);

        if (response.success) {
          toast.success("Login Successfully", {
            autoClose: 500,
            theme: "colored",
          });
          login(
            response.data._id,
            response.authToken,
            response.data.type,
            response.data
          );
        } else {
          console.log("error", response);
          toast.error(response.error || "Invalid Credentials", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          insetBlockStart: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={credentials.email}
            name="email"
            onChange={handleOnChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name="password"
            onChange={handleOnChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickShowPassword}
                    sx={{ cursor: "pointer" }}
                  >
                    {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                  </InputAdornment>
                ),
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;

import {
  Button,
  Grid,
  Typography,
  ImageListItem,
  Stack,
  Box,
  InputLabel,
  IconButton,
  FormControl,
  InputAdornment,
  FilledInput,
} from "@mui/material";
import imf from "../../../asserts/images/logo.png";
import Visibility from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SubmitHandler, useForm } from "react-hook-form";
import { common } from "@mui/material/colors";
import { login } from "../../../provider/AuthProvider";
import { FunctionComponent } from "react";
import { Route, useHistory } from "react-router";
import { Password } from "@mui/icons-material";

type LoginInputs = {
  username: string;
  password: string;
};

const Login: FunctionComponent = ({ children }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    fetch("http://192.168.1.3:8000/api/login/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((res) => {
        login({ accessToken: res.data.access_token });
        // navigate("/dashboard");
        history.push("/dashboard");
      });
  };

  return (
    <>
      <Stack
        spacing={5}
        sx={{ height: "100vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid container justifyContent="center">
          <Grid item xs={4}>
            <Grid container justifyContent="center">
              <Stack>
                <ImageListItem>
                  <img src={imf} alt="Girl in a jacket" />
                </ImageListItem>
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", pt: 1 }}
                >
                  Enabaling 100% Call Sampling
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={4}>
            <Box
              component="form"
              autoComplete="off"
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.24)",
                borderRadius: 2,
                p: 8,
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  Sign in Quality Works
                </Typography>
                <FormControl variant="filled">
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <FilledInput
                    {...register("username")}
                    id="username"
                    sx={{ mb: 1 }}
                    disableUnderline={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <AccountCircleIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FilledInput
                    type="password"
                    {...register("password", { required: true })}
                    id="password"
                    sx={{ mb: 2 }}
                    disableUnderline={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    p: 1.5,
                    backgroundColor: "#28A428",
                    color: common.white,
                    fontFamily: "Roboto",
                    fontSize: "20px",
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Login>
          <Component {...matchProps} />
        </Login>
      )}
    />
  );
};

export default Login;

// import {
//   Button,
//   Grid,
//   Typography,
//   ImageListItem,
//   Stack,
//   Box,
//   InputLabel,
//   IconButton,
//   FormControl,
//   InputAdornment,
//   FilledInput,
// } from "@mui/material";
// import imf from "../../../asserts/images/logo.png";
// import Visibility from "@mui/icons-material/Visibility";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { common } from "@mui/material/colors";
// import { login } from "../../../provider/AuthProvider";
// import { FunctionComponent } from "react";
// import { Route, useHistory } from "react-router";
// import { Password } from "@mui/icons-material";
// type LoginInputs = {
//   username: string;
//   password: string;
// };

// var api_base_url = process.env.REACT_APP_API_BASE_URL;
// console.log(api_base_url);
// console.log(process.env);
// const Login: FunctionComponent = ({ children }) => {
//   const history = useHistory();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<LoginInputs>();
//   const onSubmit: SubmitHandler<LoginInputs> = (data) => {
//     console.log(data);
//     fetch(`${api_base_url}/api/login/`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((res) => {
//         console.log(res);
//         if (!res.error) {
//           history.push("/dashboard");
//         } else {
//           console.log(res.message);
//         }
//         login({ accessToken: res.data.access_token });
//         // navigate("/dashboard");
//       });
//   };

//   return (
//     <>
//       <Stack
//         spacing={5}
//         sx={{ height: "100vh" }}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Grid container justifyContent="center">
//           <Grid item xs={4}>
//             <Grid container justifyContent="center">
//               <Stack>
//                 <ImageListItem>
//                   <img src={imf} alt="Girl in a jacket" />
//                 </ImageListItem>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ textAlign: "center", pt: 1 }}
//                 >
//                   Enabaling 100% Call Sampling
//                 </Typography>
//               </Stack>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid container justifyContent="center">
//           <Grid item xs={4}>
//             <Box
//               component="form"
//               autoComplete="off"
//               sx={{
//                 border: "1px solid rgba(0, 0, 0, 0.24)",
//                 borderRadius: 2,
//                 p: 8,
//               }}
//             >
//               <Stack spacing={2}>
//                 <Typography variant="h4" sx={{ fontWeight: 500 }}>
//                   Sign in Quality Works
//                 </Typography>
//                 <FormControl variant="filled">
//                   <InputLabel htmlFor="username">Username</InputLabel>
//                   <FilledInput
//                     {...register("username")}
//                     id="username"
//                     sx={{ mb: 1 }}
//                     disableUnderline={true}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton edge="end">
//                           <AccountCircleIcon />
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                 </FormControl>
//                 <FormControl variant="filled">
//                   <InputLabel htmlFor="password">Password</InputLabel>
//                   <FilledInput
//                     type="password"
//                     {...register("password", { required: true })}
//                     id="password"
//                     sx={{ mb: 2 }}
//                     disableUnderline={true}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton edge="end">
//                           <Visibility />
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                 </FormControl>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="success"
//                   onClick={handleSubmit(onSubmit)}
//                   sx={{
//                     p: 1.5,
//                     backgroundColor: "#28A428",
//                     color: common.white,
//                     fontFamily: "Roboto",
//                     fontSize: "20px",
//                   }}
//                 >
//                   Sign In
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>
//         </Grid>
//       </Stack>
//     </>
//   );
// };

// export const LoginLayoutRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(matchProps) => (
//         <Login>
//           <Component {...matchProps} />
//         </Login>
//       )}
//     />
//   );
// };

// export default Login;

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
import { FunctionComponent, useState } from "react";
import { Route, useHistory } from "react-router";
import { Password } from "@mui/icons-material";

import { ErrorMessage } from "@hookform/error-message";
import Alert from "@mui/material/Alert";

type LoginInputs = {
  username: string;
  password: string;
};

var api_base_url = process.env.REACT_APP_API_BASE_URL;
console.log(api_base_url);
console.log(process.env);
const Login: FunctionComponent = ({ children }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    if (errors) {
      setShowAlert(false);
    }
    console.log(data);
    fetch(`${api_base_url}/api/login/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          history.push("/dashboard");
        } else {
          setShowAlert(true);
          console.log(res.message);
        }
        login({ accessToken: res.data.access_token });
        // navigate("/dashboard");
      });
  };
  console.log("errors", errors);
  console.log("errors not ", !errors);
  console.log("username", !errors.username);
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
              {showAlert && (
                <Alert severity="error">username and password invalid</Alert>
              )}

              <Stack spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  Sign in Quality Works
                </Typography>
                <FormControl variant="filled">
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <FilledInput
                    {...register("username", {
                      required: "Please enter username!",
                    })}
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
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <Typography sx={{ color: "red" }}>{message}</Typography>
                  )}
                />
                <FormControl variant="filled">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FilledInput
                    type="password"
                    {...register("password", {
                      required: "Please enter password!",
                    })}
                    id="password"
                    sx={{ mb: 1 }}
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
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <Typography sx={{ color: "red" }}>{message}</Typography>
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    p: 1.5,
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

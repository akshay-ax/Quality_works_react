import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./theme";
import routes from "./Routes";
import GlobalStyles from "./Components/dashboard/GlobalStyles";
import "./App.css";
import Login, { LoginLayoutRoute } from "./views/pages/login/Login";
import Dashboard from "./layouts/Dashboard";
import { ComponentType, FC } from "react";
import { DashboardLayoutRoute } from "./layouts/DefaultLayout";
import Analaytics from "./layouts/Analaytics";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/jquery/dist/jquery.min.js";

// const MainLayout = React.lazy(() => import("./Components/MainLayout"));
// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// );

// Pages
// const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
interface RouteItem {
  key: String;
  title: String;
  tooltip?: String;
  path?: String;
  component?: FC<{}>;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<RouteItem>;
  appendDivider?: boolean;
}

const App = () => {
  console.log(routes);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <LoginLayoutRoute path="/login" exact component={Login} />
              <DashboardLayoutRoute path="/" component={Dashboard} />
              {/* <DashboardLayoutRoute path="/analaytic" component={Analaytics} /> */}
              {/* {routes.map((route: RouteItem) =>
                route.subRoutes ? (
                  route.subRoutes.map((item: any) => (
                    <Route
                      key={`${item.key}`}
                      path={`${item.path}`}
                      component={item.component || Dashboard}
                      exact
                    />
                  ))
                ) : (
                  <Route
                    key={`${route.key}`}
                    path={`${route.path}`}
                    component={route.component || Dashboard}
                    exact
                  />
                )
              )} */}
            </Switch>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
      {/* <React.Suspense fallback={loading}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/login"
                render={(props: any) => <Login {...props} />}
              />
              <Route
                exact
                path="/404"
                render={(props: any) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                render={(props: any) => <Page500 {...props} />}
              />
              <Route
                path="/app"
                render={(props: any) => <DashboardLayout {...props} />}
              />
              <Route
                path="/main"
                render={(props: any) => <MainLayout {...props} />}
              />
            </Switch>
          </BrowserRouter>
        </React.Suspense> */}
    </>
  );
};

export default App;

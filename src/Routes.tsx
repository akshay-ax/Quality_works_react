import { ComponentType, FC } from "react";
import Analytics from "./layouts/Analytics";
import CallClosure from "./layouts/CallClosure";
import Dashboard from "./layouts/Dashboard";
import DefaultLayout from "./layouts/DefaultLayout";
import Keywords from "./layouts/Keywords";
import Lobs from "./layouts/Lobs";
import Locations from "./layouts/Locations";
import ProcessKnowledge from "./layouts/ProcessKnowledge";
import Salutation from "./layouts/Salutation";
import Sentiment from "./layouts/Sentiment";
import SoftSkills from "./layouts/SoftSkills";
import SopConfiguration from "./layouts/SopConfiguration";
import TeamManagement from "./layouts/TeamManagement";
import Teams from "./layouts/Teams";
import Voice from "./layouts/Voice";
import Workspace from "./layouts/Workspace";
import Home from "./views/dashboard/Home";
import Login from "./views/pages/login/Login";
import Page404 from "./views/pages/page404/Page404";
import Page500 from "./views/pages/page500/Page500";

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

// const Dashboard = React.lazy(() => import("./views/dashboard/Home"));

const routes: Array<RouteItem> = [
  // {
  //   path: "app",
  //   element: <DashboardLayout />,
  //   children: [
  //     { path: "*", element: <Navigate to="/404" /> },
  //     { path: "login", element: <Login /> },
  //     { path: "/dashboard", element: <Home /> },
  //   ],
  // },
  // { path: "/", component: <Navigate to="/login" /> },
  // {
  //   path: "/login",
  //   title: "Login",
  //   key: "router-login",
  //   enabled: true,
  //   component: Login,
  // },
  // { path: "mu", element: <Page500 /> },
  // { path: "*", element: <Navigate to="/404" /> }
  {
    path: "/login",
    title: "Login",
    key: "router-login",
    enabled: true,
    component: Login,
  },
  {
    path: "/dashboard",
    enabled: true,
    title: "Dashboard",
    key: "router-dashboard",
    component: Dashboard,
  },
  // { path: "/", element: <Navigate to="/analytics" /> },
  {
    path: "/sopconfiguration",
    enabled: true,
    title: "SOP Configuration",
    key: "router-sopconfiguration",
    component: SopConfiguration,
  },
  {
    path: "/teammanagement",
    enabled: true,
    title: "SOP Configuration",
    key: "router-teammanagement",
    component: TeamManagement,
    subRoutes: [
      {
        path: "/teammanagement/workspace",
        key: "router-workspace",
        enabled: true,
        title: "workspace",
        component: Workspace,
      },
      {
        path: "/teammanagement/location",
        key: "router-salutation",
        enabled: true,
        title: "location",
        component: Locations,
      },
      {
        path: "/teammanagement/lobs",
        key: "router-lobs",
        enabled: true,
        title: "lobs",
        component: Lobs,
      },
      {
        path: "/teammanagement/teams",
        key: "router-teams",
        enabled: true,
        title: "teams",
        component: Teams,
      },
    ],
  },
  {
    path: "/analytic",
    enabled: true,
    title: "Analytic",
    key: "router-analatics",
    component: Analytics,
  },
  {
    path: "/analytic/agent",
    enabled: true,
    title: "Analytic",
    key: "router-analatics-agent",
    component: Analytics,
  },
  {
    path: "/analytic",
    enabled: true,
    title: "Analytic",
    key: "router-sub-analatics",
    component: Analytics,
    subRoutes: [
      {
        path: "/analytic/agent/salutation",
        key: "router-salutation",
        enabled: true,
        title: "salutation",
        component: Salutation,
      },
      // {
      //   path: "/analytic/agent/csat",
      //   key: "router-csat",
      //   enabled: true,
      //   title: "CSAT",
      //   component: Csat,
      // },
      {
        path: "/analytic/agent/softskills",
        key: "router-softskills",
        enabled: true,
        title: "Soft Skills",
        component: SoftSkills,
      },
      {
        path: "/analytic/agent/processknowledge",
        key: "router-processknowledge",
        enabled: true,
        title: "Process Knowledge",
        component: ProcessKnowledge,
      },
      {
        path: "/analytic/agent/callclosure",
        key: "router-callclosure",
        enabled: true,
        title: "Call closure",
        component: CallClosure,
      },
      {
        path: "/analytic/agent/voice",
        key: "router-voice",
        enabled: true,
        title: "Voice",
        component: Voice,
      },
      {
        path: "/analytic/agent/Sentiment",
        key: "router-sentiment",
        enabled: true,
        title: "Sentiment",
        component: Sentiment,
      },
      {
        path: "/analytic/customer/keywords",
        key: "router-customer-keyword",
        enabled: true,
        title: "Sentiment",
        component: Keywords,
      },
      // {
      //   path: "/processKnowledge",
      //   key: "router-processKnowledge",
      //   enabled: true,
      //   title: "Process Knowledge",
      //   component: ,
      // },
      // {
      //   path: "/softskills",
      //   key: "router-softskills",
      //   enabled: true,
      //   title: "Softskills",
      //   component: SoftSkills,
      // },
    ],
  },
  {
    path: "404",
    key: "router-Page404",
    enabled: true,
    title: "404",
    component: Page404,
  },
];

// export const route: Array<any> = [
//   {
//       key: "router-home",
//       title: "Home",
//       tooltip: "Home",
//       path: "/",
//       enabled: true,
//       component: Home,
//       icon: HomeIcon,
//       appendDivider: true
//   },
//   {
//       key: "router-dashboard",
//       title: "Dashboard",
//       tooltip: "Dashboard",
//       path: "/dashboard",
//       enabled: true,
//       component: Dashboard,
//       icon: DashboardIcon
//   },
//   {
//       key: "router-gh",
//       title: "GitHub",
//       tooltip: "GitHub",
//       enabled: true,
//       icon: GitHubIcon,
//       subRoutes: [
//           {
//               key: "router-gh-private",
//               title: "Private Repos",
//               tooltip: "Private Repos",
//               path: "/gh/private",
//               enabled: true,
//               component: GHPrivate,
//               icon: PrivateIcon
//           }
//           , {
//               key: "router-gh-public",
//               title: "Public Repos",
//               tooltip: "Public Repos",
//               path: "/gh/public",
//               enabled: false,
//               component: GHPublic,
//               icon: PublicIcon
//           }
//       ]
//   },
//   {
//       key: "router-code",
//       title: "Code Editor",
//       tooltip: "Code Editor",
//       path: "/code-editor",
//       enabled: true,
//       component: CodeEditor,
//       icon: CodeIcon,
//       appendDivider: true
//   },
//   {
//       key: "router-settings",
//       title: "Settings",
//       tooltip: "Settings",
//       path: "/settings",
//       enabled: true,
//       component: Settings,
//       icon: SettingsIcon
//   },
// ]

export default routes;

// const routes = [
//   {
//     path: "app",
//     element: <DashboardLayout />,
//     children: [

//     ],
//   },
//   {
//     path: "main",
//     element: <MainLayout />,
//     children: [],
//   },
//   { path: "/", exact: true, name: "Home" },
//   { path: "/dashboard", name: "Dashboard", component: Dashboard },
// ];

// export default routes;

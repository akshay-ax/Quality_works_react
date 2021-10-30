import { authFetch } from "../../provider/AuthProvider";
const api_base_url = process.env.REACT_APP_API_BASE_URL;
const getTeams = () => {
  return authFetch(`${api_base_url}/api/manageteam/`).then((res) => res.json());
};

const getReportingManager = () => {
  return authFetch(`${api_base_url}/api/reportingmanager/`).then((res) =>
    res.json()
  );
};

const addteam = (teamname, noOfagent, location, loblist, reportingmanager) => {
  return authFetch(`${api_base_url}/api/manageteam/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      team_name: teamname,
      no_agents: noOfagent,
      locations: location,
      reporting_manager_id: reportingmanager,
      lob_id_list: loblist,
    }),
  }).then((res) => res.json());
};

const deleteTeam = (id) => {
  return authFetch(`${api_base_url}/api/manageteam/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }).then((res) => res.json());
};

const EditTeam = (
  id,
  Reporting_manager,
  LOB,
  Locations,
  No_agentns,
  Team_name
) => {
  return authFetch(`${api_base_url}/api/manageteam/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Reporting_manager: Reporting_manager,
      Locations: Locations,
      No_agentns: No_agentns,
      Team_name: Team_name,
      LOB: LOB,
    }),
  }).then((res) => res.json());
};

const TeamsService = {
  getTeams,
  getReportingManager,
  addteam,
  EditTeam,
  deleteTeam,
  //   get,
  //   create,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};
export default TeamsService;

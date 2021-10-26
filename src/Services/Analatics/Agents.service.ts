import { authFetch } from "../../provider/AuthProvider";

const getAllLob = () => {
  return authFetch("http://44.199.168.156:80/api/lob/").then((res) =>
    res.json()
  );
};

const getAllFilter = () => {
  return authFetch("http://44.199.168.156:80/elastic/allfilter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const getAllFilterOnLob = (lobid?, startDate?, endDate?) => {
  return authFetch("http://44.199.168.156:80/elastic/allfilter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      start_date: startDate,
      end_date: endDate,
      Lob_id: lobid,
    }),
  }).then((res) => res.json());
};

const getAllFilterOnAgent = (
  MatrixListId?,
  agentsId?,
  Teamlist?,
  lobvalue?,
  startDate?,
  endDate?
) => {
  return authFetch("http://44.199.168.156:80/elastic/allfilter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Matrix_list: MatrixListId,
      Agent_list: agentsId,
      Team_list: Teamlist,
      Lob_id: lobvalue,
      start_date: startDate,
      end_date: endDate,
    }),
  }).then((res) => res.json());
};

const getAllFilterOnTeam = (
  Agentlist?,
  teamsId?,
  lobvalue?,
  startDate?,
  endDate?,
  MatrixListId?
) => {
  return authFetch("http://44.199.168.156:80/elastic/allfilter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Matrix_list: MatrixListId,
      Agent_list: Agentlist,
      Team_list: teamsId,
      Lob_id: lobvalue,
      start_date: startDate,
      end_date: endDate,
    }),
  }).then((res) => res.json());
};

const getAllFilterOnDateRange = (
  Agentlist?,
  MatrixListId?,
  Teamlist?,
  s_Date?,
  e_Date?
) => {
  return authFetch("http://44.199.168.156:80/elastic/allfilter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      start_date: s_Date,
      end_date: e_Date,
      Matrix_list: MatrixListId,
      Agent_list: Agentlist,
      Team_list: Teamlist,
    }),
  }).then((res) => res.json());
};

const getAllFilterOnMatrixType = (
  lobvalue?,
  matrixListId?,
  Agentlist?,
  Teamlist?,
  startDate?,
  endDate?
) => {
  return authFetch("http://44.199.168.156:80/elastic/allfilter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Lob_id: lobvalue,
      Matrix_list: matrixListId,
      Agent_list: Agentlist,
      Team_list: Teamlist,
      start_date: startDate,
      end_date: endDate,
    }),
  }).then((res) => res.json());
};

const getAllMatrixType = () => {
  return authFetch("http://44.199.168.156:80/api/reporting/").then((res) =>
    res.json()
  );
};

const teamDataShow = (lobid) => {
  return authFetch("http://44.199.168.156:80/api/showteam/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: lobid }),
  }).then((res) => res.json());
};

const agentDataShow = (teamid) => {
  return authFetch("http://44.199.168.156:80/api/showagent/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: teamid }),
  }).then((res) => res.json());
};

const CallCloserData = (agentId?, teamId?, lobId?) => {
  return authFetch("http://44.199.168.156:80/elastic/callclosure/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Agent_id: agentId,
      Team_id: teamId,
      Lob_id: lobId,
    }),
  }).then((res) => res.json());
};

const ProcessKnowledgeData = (agentId?, teamId?, lobId?) => {
  return authFetch("http://44.199.168.156:80/elastic/process_knowledge/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Agent_id: agentId,
      Team_id: teamId,
      Lob_id: lobId,
    }),
  }).then((res) => res.json());
};

const SalutationData = (agentId?, teamId?, lobId?) => {
  return authFetch("http://44.199.168.156:80/elastic/salutation/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Agent_id: agentId,
      Team_id: teamId,
      Lob_id: lobId,
    }),
  }).then((res) => res.json());
};

const SantimentData = (agentId?, teamId?, lobId?) => {
  return authFetch("http://44.199.168.156:80/elastic/sentiment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Agent_id: agentId,
      Team_id: teamId,
      Lob_id: lobId,
    }),
  }).then((res) => res.json());
};

const SoftSkillData = (agentId?, teamId?, lobId?) => {
  return authFetch("http://44.199.168.156:80/elastic/sentiment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Agent_id: agentId,
      Team_id: teamId,
      Lob_id: lobId,
    }),
  }).then((res) => res.json());
};
// const getAllLob = () => {
//     return authFetch("http://44.199.168.156:80/api/lob/").then((res) =>
//       res.json()
//     );
//   };

// const create = (data: ITutorialData) => {
//   return http.post("/tutorials", data);
// };

// const update = (id: any, data: ITutorialData) => {
//   return http.put(`/tutorials/${id}`, data);
// };

// const remove = (id: any) => {
//   return http.delete(`/tutorials/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

// const findByTitle = (title: string) => {
//   return http.get(`/tutorials?title=${title}`);
// };

const AnalayticService = {
  getAllLob,
  getAllFilter,
  getAllMatrixType,
  teamDataShow,
  agentDataShow,
  getAllFilterOnLob,
  getAllFilterOnAgent,
  getAllFilterOnTeam,
  getAllFilterOnDateRange,
  getAllFilterOnMatrixType,
  SoftSkillData,
  CallCloserData,
  ProcessKnowledgeData,
  SalutationData,
  SantimentData,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};
export default AnalayticService;

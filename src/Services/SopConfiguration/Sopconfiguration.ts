import { authFetch } from "../../provider/AuthProvider";
const api_base_url = process.env.REACT_APP_API_BASE_URL;

const getSopConfigData = () => {
  return authFetch(`${api_base_url}/api/soptypes/`).then((res) => res.json());
};

const addSubSop = (sopId, title) => {
  return authFetch(`${api_base_url}/api/subsop/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sop_type_id: sopId,
      sub_sop: title,
    }),
  }).then((res) => res.json());
};

const deleteSubSop = (id) => {
  console.log(id);
  return authFetch(`${api_base_url}/api/subsop/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({}),
  }).then((res) => res.json());
};

const EditSubSop = (id, sopId, subSopName) => {
  return authFetch(`${api_base_url}/api/subsop/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Sop_types: sopId,
      Sop_sub_type: subSopName,
    }),
  }).then((res) => res.json());
};

const addSopType = (SopName) => {
  return authFetch(`${api_base_url}/api/soptypes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Sop_name: SopName,
    }),
  }).then((res) => res.json());
};

// const addSubSop = () => {
//     return authFetch(`${api_base_url}/api/soptypes/`).then((res) =>
//       res.json()
//     );
//   };

const SopConfigurationService = {
  getSopConfigData,
  addSubSop,
  deleteSubSop,
  EditSubSop,
  addSopType,
  //   get,
  //   create,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};
export default SopConfigurationService;

import { authFetch } from "../../provider/AuthProvider";

const getSopConfigData = () => {
  return authFetch("http://192.168.1.3:8000/api/soptypes/").then((res) =>
    res.json()
  );
};

const addSubSop = (sopId, title) => {
  return authFetch("http://192.168.1.3:8000/api/subsop/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sop_type_id: sopId,
      sub_sop: title,
    }),
  }).then((res) => res.json());
};

const deleteSubSop = (id) => {
  return authFetch(`http://192.168.1.3:8000/api/subsop/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }).then((res) => res.json());
};

const EditSubSop = (id, sopId, subSopName) => {
  return authFetch(`http://192.168.1.3:8000/api/subsop/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Sop_types: sopId,
      Sop_sub_type: subSopName,
    }),
  }).then((res) => res.json());
};

const addSopType = (SopName) => {
  return authFetch(`http://192.168.1.3:8000/api/soptypes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Sop_name: SopName,
    }),
  }).then((res) => res.json());
};

// const addSubSop = () => {
//     return authFetch("http://192.168.1.3:8000/api/soptypes/").then((res) =>
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

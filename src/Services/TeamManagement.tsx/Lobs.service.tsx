import { authFetch } from "../../provider/AuthProvider";
const api_base_url = process.env.REACT_APP_API_BASE_URL;
const getLobs = () => {
  return authFetch(`${api_base_url}/api/lob/`).then((res) => res.json());
};

const addLobs = (lobname) => {
  return authFetch(`${api_base_url}/api/lob/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lob_name: lobname,
    }),
  }).then((res) => res.json());
};

const deleteLobs = (id) => {
  return authFetch(`${api_base_url}/api/lob/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }).then((res) => res.json());
};

const EditLobs = (lobname, id) => {
  return authFetch(`${api_base_url}/api/lob/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Lob_name: lobname,
    }),
  }).then((res) => res.json());
};

const LobsService = {
  getLobs,
  addLobs,
  deleteLobs,
  EditLobs,
  //   get,
  //   create,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};
export default LobsService;

import { authFetch } from "../../provider/AuthProvider";

const getLobs = () => {
  return authFetch("http://192.168.1.3:8000/api/lob/").then((res) =>
    res.json()
  );
};

const addLobs = (lobname) => {
  return authFetch("http://192.168.1.3:8000/api/lob/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lob_name: lobname,
    }),
  }).then((res) => res.json());
};

const deleteLobs = (id) => {
  return authFetch(`http://192.168.1.3:8000/api/lob/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }).then((res) => res.json());
};

const EditLobs = (lobname, id) => {
  return authFetch(`http://192.168.1.3:8000/api/lob/${id}/`, {
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

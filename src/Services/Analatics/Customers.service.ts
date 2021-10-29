import { authFetch } from "../../provider/AuthProvider";

const api_base_url = process.env.REACT_APP_API_BASE_URL;
const getAllLob = () => {
  return authFetch(`${api_base_url}/api/lob/`).then((res) => res.json());
};

const CustomerService = {
  getAllLob,
  //   get,
  //   create,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};
export default CustomerService;

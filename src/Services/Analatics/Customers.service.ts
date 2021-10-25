import { authFetch } from "../../provider/AuthProvider";

const getAllLob = () => {
  return authFetch("http://192.168.1.3:8000/api/lob/").then((res) =>
    res.json()
  );
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

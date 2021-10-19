import React, { useState } from "react";
import Page404 from "../page404/Page404";

const Page500 = () => {
  const [selected, setSelected] = useState([]);
  const options = [
    { value: "1", label: "Jimmy" },
    { value: "2", label: "Laura" },
    { value: "3", label: "Tommy" },
    { value: "4", label: "Jane" },
    { value: "5", label: "Mike" },
  ];
  return (
    <>
      <Page404 options={options} value={selected} onChange={setSelected} />
    </>
  );
};

export default Page500;

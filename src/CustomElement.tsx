import { FilledInput } from "@mui/material";
import React from "react";

const TextField = ({ onChange, ...rest }: any) => {
  return <FilledInput sx={{ mb: 1 }} disableUnderline={true} {...rest} />;
};

export default TextField;

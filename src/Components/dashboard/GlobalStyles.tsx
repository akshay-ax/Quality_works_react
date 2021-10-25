import { createStyles, makeStyles } from "@mui/styles";

const useStyles: any = makeStyles(() =>
  createStyles({
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px #BDBDBD",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "#BDBDBD",
        borderRadius: "24px",
        outline: "1px solid #BDBDBD",
      },
      "a:hover ": {
        textDecoration: "none",
      },
      html: {
        height: "100%",
        width: "100%",
      },
      body: {
        fontFamily: "Roboto",
        backgroundColor: "#ffffff",
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
  },
  grow: {
    flexGrow: 1,
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
});

export default useStyles;

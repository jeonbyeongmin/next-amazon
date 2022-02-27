import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { ReactChild } from "react";
import useStyles from "../utils/styles";

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  const styled = useStyles();

  return (
    <div>
      <Head>
        <title>NEXT AMAZON</title>
      </Head>
      <AppBar position="static" className={styled.navbar}>
        <Toolbar>
          <Typography>AMAZON</Typography>
        </Toolbar>
      </AppBar>
      <Container className={styled.main}>{children}</Container>
      <footer className={styled.footer}>
        <Typography>All rights reserved. NEXT AMAZON</Typography>
      </footer>
    </div>
  );
};

export default Layout;

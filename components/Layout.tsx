import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
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
          <NextLink href="/" passHref>
            <Link>
              <Typography className={styled.brand}>AMAZON</Typography>
            </Link>
          </NextLink>
          <div className={styled.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>login</Link>
            </NextLink>
          </div>
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

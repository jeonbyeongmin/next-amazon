import type { ReactChild } from "react";
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { useMemo } from "react";
import useStyles from "../utils/styles";
import { useDarkModeDispatch, useDarkModeState } from "../utils/DarkModeStore";
import Cookies from "js-cookie";
import { useCartState } from "../utils/CartStore";

interface LayoutProps {
  children: ReactChild;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  const styled = useStyles();
  const { darkMode } = useDarkModeState();
  const darkModeDispatch = useDarkModeDispatch();
  const { cart } = useCartState();

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          h1: {
            fontSize: "1.6rem",
            fontWeight: 400,
            margin: "1rem 0",
          },
          h2: {
            fontSize: "1.4rem",
            fontWeight: 400,
            margin: "1rem 0",
          },
          body1: {
            fontWeight: "normal",
          },
        },
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#f0c000",
          },
          secondary: {
            main: "#208080",
          },
        },
      }),
    [darkMode]
  );

  const darkModeChangeHandler = () => {
    darkModeDispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title}` : "NEXT AMAZON"}</title>
        <meta name="description" content={description} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={styled.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={styled.brand}>amazon</Typography>
              </Link>
            </NextLink>
            <div className={styled.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
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
      </ThemeProvider>
    </div>
  );
};

export default Layout;

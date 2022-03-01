import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import { GetServerSideProps, NextPage } from "next";
import Product from "../../models/Product";
import db from "../../utils/db";
import { ProductType } from "../../types/product";
import { useCallback } from "react";

interface DetailProps {
  product: ProductType;
}

export const Detail: NextPage<DetailProps> = ({ product }) => {
  const styled = useStyles();

  const handleDalgonaClick = useCallback((e) => {
    console.log(e.currentTarget);
  }, []);

  if (!product) return <div>Product Not Found</div>;
  return (
    <Layout title={product.name} description={product.description}>
      <>
        <div className={styled.section}>
          <NextLink href="/" passHref>
            <Link onClick={handleDalgonaClick}>
              <Typography>back to products</Typography>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category : {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand : {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating : {product.rating} stars ({product.numReviews})
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        ${product.countInStock > 0 ? "In Stock" : "Unvailable"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth variant="contained" color="primary">
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </>
    </Layout>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};

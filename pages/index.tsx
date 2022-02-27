import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Products</h1>
        <ul>
          <li>product1</li>
          <li>product2</li>
          <li>product3</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;

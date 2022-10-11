import FullLayout from "../src/layouts/FullLayout";
import Head from "next/head";
import "../styles/style.scss";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../src/_context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Data Management System</title>
        <meta
          name="description"
          content="Data Management System"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <FullLayout>
          <Component {...pageProps} />
        </FullLayout>
      </AuthProvider>
    </>
  );
}

export default MyApp;

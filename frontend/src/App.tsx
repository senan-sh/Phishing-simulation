import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
// import useUserLoader from "./hooks/api/useUserLoader";
// import PageLoader from "./components/PageLoader";
import Layout from "./layout";

export default function App() {
  // const { loading } = useUserLoader();

  // if (loading) {
  //   return <PageLoader title="Please wait..." />;
  // }

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

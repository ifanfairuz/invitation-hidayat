import { PageWrapper } from "@components/layout";
import Head from "next/head";
import { withAuthedSSR } from "@lib/auth";

export const getServerSideProps = withAuthedSSR(async () => {
  return {
    redirect: {
      destination: "/dashboard/tamu",
      permanent: false,
    },
  };
});

const Dashboard: AuthedPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Nduoseh</title>
        <meta name="description" content="Nduoseh Dashboard Page" />
      </Head>
      <PageWrapper withSidebar dashboardTitle="Dashboard">
        <div className="p-4"></div>
      </PageWrapper>
    </>
  );
};

export default Dashboard;

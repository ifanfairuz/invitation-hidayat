import { PageWrapper } from "@components/layout";
import Head from "next/head";
export { authed as getServerSideProps } from "@lib/auth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Nduoseh</title>
        <meta name="description" content="Nduoseh Dashboard Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper withSidebar dashboardTitle="Dashboard">
        <div className="p-4"></div>
      </PageWrapper>
    </>
  );
}

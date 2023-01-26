import { PageWrapper } from "@components/layout";
import TableUcapan from "@components/table/TableUcapan";
import Head from "next/head";
export { authed as getServerSideProps } from "@lib/auth";

const DashboardUcapan: AuthedPage = () => {
  return (
    <>
      <Head>
        <title>Ucapan | Nduoseh</title>
        <meta name="description" content="Nduoseh Dashboard Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper withSidebar>
        <div className="p-4">
          <TableUcapan data={require("MOCK_DATA_UCAPAN.json")} />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardUcapan;

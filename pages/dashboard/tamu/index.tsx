import { PageWrapper } from "@components/layout";
import TableTamu from "@components/table/TableTamu";
import Head from "next/head";
export { authed as getServerSideProps } from "@lib/auth";

export default function DashboardTamu() {
  return (
    <>
      <Head>
        <title>Tamu Undangan | Nduoseh</title>
        <meta name="description" content="Nduoseh Dashboard Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper withSidebar>
        <div className="p-4">
          <TableTamu data={require("MOCK_DATA.json")} />
        </div>
      </PageWrapper>
    </>
  );
}

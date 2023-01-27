import { PageWrapper } from "@components/layout";
import TableTamu from "@components/table/TableTamu";
import Head from "next/head";
import { Tamu } from "@prisma/client";
import { getAllTamu } from "@repo/tamu";
import { withAuthedSSR } from "@lib/auth";

export const getServerSideProps = withAuthedSSR<DashboardTamuProps>(
  async () => {
    const data = await getAllTamu();
    return { props: { data } };
  }
);

type DashboardTamuProps = {
  data: Tamu[];
};
const DashboardTamu: AuthedPage<DashboardTamuProps> = ({ data }) => {
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
          <TableTamu data={data} />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardTamu;

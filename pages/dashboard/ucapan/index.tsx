import { PageWrapper } from "@components/layout";
import TableUcapan from "@components/table/TableUcapan";
import { Comment } from "@prisma/client";
import Head from "next/head";
import { withAuthedSSR } from "@lib/auth";
import { getAllComment } from "@repo/comment";

export const getServerSideProps = withAuthedSSR(async () => {
  const data = await getAllComment(false);
  return { props: { data } };
});

interface DashboardUcapanProps {
  data: Comment[];
}
const DashboardUcapan: AuthedPage<DashboardUcapanProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Ucapan | Nduoseh</title>
        <meta name="description" content="Nduoseh Dashboard Page" />
      </Head>
      <PageWrapper withSidebar>
        <div className="p-4 md:px-6 lg:px-8">
          <TableUcapan data={data} />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardUcapan;

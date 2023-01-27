import FormTamu from "@components/forms/FormTamu";
import { PageWrapper } from "@components/layout";
import Head from "next/head";
import { withAuthedSSR } from "@lib/auth";
import { Tamu } from "@prisma/client";
import { getTamu } from "@repo/tamu";

export const getServerSideProps = withAuthedSSR<DashboardTamuEditProps>(
  async (_, { req }) => {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const id = parseInt(url.searchParams.get("id") || "0");
      const data = await getTamu(id);
      if (!data) throw "NoData";
      return { props: { data } };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard/tamu",
        },
      };
    }
  }
);

type DashboardTamuEditProps = {
  data: Tamu;
};
const DashboardTamuEdit: AuthedPage<DashboardTamuEditProps> = ({ data }) => {
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
          <FormTamu mode="edit" data={data} />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardTamuEdit;

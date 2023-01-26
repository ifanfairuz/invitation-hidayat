import FormUcapan from "@components/forms/FormUcapan";
import { PageWrapper } from "@components/layout";
import Head from "next/head";
export { authed as getServerSideProps } from "@lib/auth";

const DashboardUcapanAdd: AuthedPage = () => {
  return (
    <>
      <Head>
        <title>Ucapan Undangan | Nduoseh</title>
        <meta name="description" content="Nduoseh Dashboard Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper withSidebar>
        <div className="p-4">
          <FormUcapan mode="add" />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardUcapanAdd;

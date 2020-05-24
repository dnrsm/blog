import * as React from "react";
import SEO from "../components/Seo";
import Layout from "../components/Layout";

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>お探しのページは見つかりません。</p>
  </Layout>
);

export default NotFoundPage;

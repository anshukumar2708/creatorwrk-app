import { FC, Suspense } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Layout } from "./layout/layout";
import Loader from "./components/common/loader";
import Router from "./router";

const App: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader note="from APP suspense" />}>
        <Router />
      </Suspense>
    </Layout>
  );
};

export default App;

import React from "react";
import Layout from "./layout/layout";
import { useSelector } from "react-redux";
import Loader from "./components/loader/loader";

const App = () => {
  const loadingState = useSelector((state) => state.loading);

  return loadingState ? <Loader /> : <Layout />;
};

export default App;

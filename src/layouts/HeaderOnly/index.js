import React from "react";
import Header from "../Components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div color="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;

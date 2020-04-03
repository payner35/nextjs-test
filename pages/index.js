import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Router from "next/router";
import cloudinary from "cloudinary-core";
import { withAuth, withLoginRequired } from "use-auth0-hooks";


const Index = ({ auth }) => {
  const { user } = auth;

  useEffect(() => {
   
    console.log(user);

  });

  return <div></div>;
};

export default withLoginRequired(withAuth(Index));

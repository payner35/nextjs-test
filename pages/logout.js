import React, { useEffect } from "react";
import { useAuth } from "use-auth0-hooks";


const Logout = () => {

  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });

  return <div></div>;
};

export default (Logout);

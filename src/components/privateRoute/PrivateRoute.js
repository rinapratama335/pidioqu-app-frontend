import React, { useContext } from "react";
import { BlockLoading } from "react-loadingg";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <BlockLoading />
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;

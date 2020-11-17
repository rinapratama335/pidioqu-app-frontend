import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Route, Redirect } from "react-router-dom";
import { BlockLoading } from "react-loadingg";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  console.log("Data state private route:", state);

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

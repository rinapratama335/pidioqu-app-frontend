import { useContext, useEffect } from "react";
import swal from "sweetalert";
import { UserContext } from "./context/userContext";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import HomePage from "./pages/home-page/HomePage";
import { API, setAuthToken } from "./apiConfig/api";

// Jika di localstorage ada token  maka eksesusi fungsi setAuthToken untuk menaruh token di localstorage
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };

    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            state.isLogin ? (
              (swal(
                "Kamu sudah login!",
                "halaman ini tidak bisa diakses",
                "error"
              ),
              (<Redirect to="/home" />))
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            state.isLogin ? (
              (swal(
                "Kamu sudah login!",
                "halaman ini tidak bisa diakses",
                "error"
              ),
              (<Redirect to="/home" />))
            ) : (
              <Login />
            )
          }
        />
        <PrivateRoute path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

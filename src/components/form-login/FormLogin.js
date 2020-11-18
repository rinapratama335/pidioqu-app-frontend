import { useState, useContext } from "react";
import BlockLoading from "react-loadingg/lib/BlockLoading";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../apiConfig/api";
import { UserContext } from "../../context/userContext";
import "./FormLogin.scss";

const FormLogin = () => {
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await API.post("/login", body, config);

      console.log("Response Data Login:", res.data.data.user);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data.user,
      });

      setAuthToken(res.data.data.user.token);

      try {
        const res = await API.get("/auth");

        console.log("Data user yang login:", res);

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data,
        });

        setLoading(false);
        history.push("/home");
      } catch (err) {
        console.log(err);

        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: "LOGIN_FAIL",
      });
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="field">
          <button>Login</button>
        </div>
      </form>
      <h6 className="has-text-right mt-5">
        Don't have an account? <Link to="/register">Register</Link>
      </h6>
    </div>
  );
};

export default FormLogin;

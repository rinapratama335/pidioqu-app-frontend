import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../apiConfig/api";
import { UserContext } from "../../context/userContext";
import "./FormRegister.scss";

const FormRegister = () => {
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    });

    try {
      const res = await API.post("/register", body, config);

      console.log(res);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data.user,
      });

      setAuthToken(res.data.data.user.token);

      try {
        const user = await API.get("/auth");

        console.log(user);

        dispatch({
          type: "USER_LOADED",
          payload: user.data.data.user,
        });

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <input
            className="input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <input
            className="input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
          <button>Register</button>
        </div>
      </form>
      <h6 className="has-text-right mt-5">
        Have an account? <Link to="/login">Login</Link>
      </h6>
    </div>
  );
};

export default FormRegister;

import { useContext } from "react";
import { Redirect } from "react-router-dom";
import FormRegister from "../../components/form-register/FormRegister";
import { UserContext } from "../../context/userContext";
import "./Register.scss";

const Register = () => {
  const [state] = useContext(UserContext);

  return (
    <div className="column is-half is-offset-one-quarter">
      <div className="card register">
        <div className="card-content">
          <h2 className="title has-text-centered is-uppercase">Registrasi</h2>
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;

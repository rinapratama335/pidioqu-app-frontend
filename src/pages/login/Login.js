import FormLogin from "../../components/form-login/FormLogin";
import "./Login.scss";

const Register = () => {
  return (
    <div className="column is-half is-offset-one-quarter">
      <div className="card register">
        <div className="card-content">
          <h2 className="title has-text-centered is-uppercase">Login</h2>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;

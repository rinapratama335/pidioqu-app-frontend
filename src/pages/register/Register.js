import FormRegister from "../../components/form-register/FormRegister";
import "./Register.scss";

const Register = () => {
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

import { Link, useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../API/fetchRequestUser";
import { useDispatch, useSelector } from "react-redux";
import { rulesValidationForms } from "../services/rulesValidationForms";
import { message } from "antd";
function SignIn() {
  const { passwordRules, emailRules } = rulesValidationForms;
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const error = useSelector((state) => state.user.error);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(loginUser({ email, password }));
  };
  if (login === false) {
    return (
      <div className="form--wrapper">
        <h1 className="form__h1">Sign In</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            Email address
            <input
              type="email"
              className="form__input input--email"
              {...register("email", emailRules)}
            />
          </label>
          <label className="label">
            Password
            <input
              type="password"
              className="form__input input--password"
              {...register("password", passwordRules)}
            />
          </label>
          {error === 422 && message.error("Invalid Email or Password")}
          <p>
            <input
              className="button form__button form__button--submit"
              type="submit"
              disabled={!isValid}
            />
          </p>
        </form>
        <p className="link--sign">
          Don’t have an account?{" "}
          <Link className="link--blue" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </div>
    );
  } else if (login === true) {
    return <Navigate to={fromPage} />;
  }
}
export default SignIn;

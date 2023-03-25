import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerNewUser } from "../API/fetchRequestUser";
import { useDispatch, useSelector } from "react-redux";
import { rulesValidationForms } from "../services/rulesValidationForms";
function SignUp() {
  const { usernameRules, passwordRules, emailRules } = rulesValidationForms;
  const dispatch = useDispatch();
  const reg = useSelector((state) => state.user.register);
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(registerNewUser({ username, email, password }));
  };
  return (
    <div className="form--wrapper">
      <h1 className="form__h1">Create new account</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          Username
          <input
            className="form__input input--username"
            {...register("username", usernameRules)}
          />
          <div className="form__error">
            {errors?.username && <p>{errors?.username?.message || "Error"}</p>}
          </div>
        </label>
        <label className="label">
          Email address
          <input
            type="email"
            className="form__input input--email"
            {...register("email", emailRules)}
          />
          <div className="form__error">
            {errors?.email && <p>{errors?.email?.message || "Error"}</p>}
          </div>
        </label>
        <label className="label">
          Password
          <input
            type="password"
            className="form__input input--password"
            {...register("password", passwordRules)}
          />
          <div className="form__error">
            {errors?.password && <p>{errors?.password?.message || "Error"}</p>}
          </div>
        </label>
        <label className="label">
          Repeat Password
          <input
            type="password"
            className="form__input input--repeat-password"
            {...register("repeatPassword", {
              required: "Поле обязательно для заполнения",
              validate: (value) => value === watch("password"),
            })}
          />
          <div className="form__error">
            {errors?.repeatPassword && <p>{errors?.repeatPassword?.message}</p>}
          </div>
        </label>
        <label className="label__checkbox">
          <input
            type="checkbox"
            className="checkbox checkbox--agree"
            {...register("agree", {
              required: true,
            })}
          />
          I agree to the processing of my personal information
        </label>
        <p>
          <input
            className="button form__button form__button--submit"
            type="submit"
            disabled={!isValid}
          />
        </p>
      </form>
      <p className="link--sign">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
      {reg === "success" && reset() && (
        <div>
          Registration was successful!
          <p className="link--sign">
            Now you can Log In{" "}
            <Link className="link--blue" to="/sign-in">
              Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
export default SignUp;

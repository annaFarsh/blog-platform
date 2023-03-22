import { useForm } from "react-hook-form";
import { updateUser } from "../API/fetchRequestUser";
import { useDispatch, useSelector } from "react-redux";
import { rulesValidationForms } from "../services/rulesValidationForms";

function Profile() {
  const { usernameRules, passwordRules, emailRules, imageRules } =
    rulesValidationForms;
  const { value: funcValidImage, message: errorImage } = imageRules;
  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    dispatch(updateUser({ username, email, password, image, token }));
  };
  return (
    <div className="form--wrapper">
      <h1 className="form__h1">Edit Profile</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          Username
          <input
            className="form__input input--username"
            placeholder={username}
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
            placeholder={email}
            {...register("email", emailRules)}
          />
        </label>
        <label className="label">
          New Password
          <input
            type="password"
            className="form__input input--password"
            {...register("password", passwordRules)}
          />
        </label>
        <label className="label">
          Avatar image (url)
          <input
            type="password"
            className="form__input input--password"
            {...register("image", {
              validate: (value) => funcValidImage(value) === true,
            })}
          />
          <div className="form__error">
            {errors?.image && <p>{errorImage}</p>}
          </div>
        </label>
        <p>
          <input
            className="button form__button form__button--submit"
            type="submit"
            disabled={!isValid}
          />
        </p>
      </form>
    </div>
  );
}
export default Profile;

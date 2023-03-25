import { deleteTag } from "../store/articleSlice";
import TagForm from "./TagForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { rulesValidationForms } from "../services/rulesValidationForms";
import uuid from "react-uuid";
function ArticleForm({ send, article }) {
  const { titleRules, articleRules } = rulesValidationForms;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const tags = useSelector((state) => state.articles.tags);
  const articleEdit = useSelector((state) => state.articles.articleEdit);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: article?.title || "",
      body: article?.body || "",
      description: article?.description || "",
    },
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const { title, description, body } = data;
    send({ title, description, body, tags, token });
  };
  useEffect(() => {
    reset();
  }, [articleEdit, reset]);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label className="label">
        Title
        <input
          className="form__input input--title"
          type="text"
          {...register("title", titleRules)}
        />
        <div className="form__error">
          {errors?.title && <p>{errors?.title?.message || "Error"}</p>}
        </div>
      </label>
      <label className="label">
        Short description
        <input
          className="form__input input--description"
          type="text"
          {...register("description", articleRules)}
        />
        <div className="form__error">
          {errors?.description && (
            <p>{errors?.description?.message || "Error"}</p>
          )}
        </div>
      </label>
      <label className="label">
        Text
        <textarea
          className="form__input input--textarea"
          {...register("body", articleRules)}
        ></textarea>
        <div className="form__error">
          {errors?.body && <p>{errors?.body?.message || "Error"}</p>}
        </div>
      </label>
      <div className="label">
        Tags
        {tags.map((tag) => {
          return (
            <div className="tag" id={tag.id} key={uuid()}>
              <div className="tag__text">{tag.value}</div>

              <button
                className="form__button form__button--delete"
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(deleteTag(tag.id));
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <TagForm />
      </div>
      <div>
        <input
          className="button form__button form__button--submit"
          type="submit"
          disabled={!isValid}
          value="Send"
        />
      </div>
    </form>
  );
}
export default ArticleForm;

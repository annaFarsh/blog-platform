import { createArticle } from "../API/fetchRequestArticles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TagForm from "../components/TagForm";
import { deleteTag } from "../store/articleSlice";
function NewArticle() {
  const tags = useSelector((state) => state.articles.tags);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const send = () => {
    dispatch(createArticle({ title, description, body, tags, token }));
  };

  return (
    <div className="new-article">
      <h1 className="new-article__h1">Create new Article</h1>
      <form className="form">
        <label className="label">
          Title
          <input
            className="form__input input--title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="label">
          Short description
          <input
            className="form__input input--description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label className="label">
          Text
          <textarea
            className="form__input input--textarea"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
        </label>
        <label className="label">
          Tags
          {tags.map((tag) => {
            return (
              <div className="tag" id={tag.id} key={tag.id}>
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
        </label>
        <div>
          <input
            className="button form__button form__button--submit"
            type="submit"
            value="Send"
            onClick={(event) => {
              event.preventDefault();
              send();
            }}
          />
        </div>
      </form>
    </div>
  );
}
export default NewArticle;

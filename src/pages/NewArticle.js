import { createArticle } from "../API/fetchRequestArticles";
import { useDispatch } from "react-redux";
import ArticleForm from "../components/ArticleForm";
import { message } from "antd";
function NewArticle() {
  const dispatch = useDispatch();

  const createNewArticle = ({ title, description, body, tags, token }) => {
    dispatch(createArticle({ title, description, body, tags, token })).then(
      () => message.success("The Article was created!"),
      () => message.error("Server Error")
    );
  };

  return (
    <div className="new-article">
      <h1 className="new-article__h1">Create new Article</h1>
      <ArticleForm send={createNewArticle} />
    </div>
  );
}
export default NewArticle;

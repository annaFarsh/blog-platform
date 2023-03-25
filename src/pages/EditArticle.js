import ArticleForm from "../components/ArticleForm";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../API/fetchRequestArticles";
import { message } from "antd";
function EditArticle() {
  const article = useSelector((state) => state.articles.article);
  const slug = article.slug;
  const dispatch = useDispatch();
  const editUserArticle = ({ title, description, body, tags, token }) => {
    dispatch(
      updateArticle({ title, description, body, tags, token, slug })
    ).then(
      () => message.success("The Article was updated!"),
      () => message.error("Server Error")
    );
  };
  return (
    <div className="edit-article">
      <h1 className="edit-article__h1">Edit article</h1>
      <ArticleForm send={editUserArticle} article={article} />
    </div>
  );
}
export default EditArticle;

import { createArticle } from "../API/fetchRequestArticles";
import {useDispatch, useSelector} from "react-redux";
import ArticleForm from "../components/ArticleForm";
import { message } from "antd";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
function NewArticle() {
  const dispatch = useDispatch();
    const articleCreated = useSelector((state) => state.articles.articleCreated);
    const navigate = useNavigate();
  const createNewArticle = ({ title, description, body, tags, token }) => {
    dispatch(createArticle({ title, description, body, tags, token })).then(
      () => message.success("The Article was created!"),
      () => message.error("Server Error")
    );
  };
    useEffect(() => {
        if (articleCreated === true) {
            navigate('/articles', { replace: true });
        }
    }, [navigate, articleCreated]);
  return (
    <div className="new-article">
      <h1 className="new-article__h1">Create new Article</h1>
      <ArticleForm send={createNewArticle} />
    </div>
  );
}
export default NewArticle;

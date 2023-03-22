import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneArticle } from "../API/fetchRequestArticles";
import Article from "../components/Article";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SingleArticle() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.article);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getOneArticle(slug));
  }, [dispatch, slug]);
  return <>{article && <Article article={article} />}</>;
}
export default SingleArticle;

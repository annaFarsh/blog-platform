import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneArticle } from "../API/fetchRequestArticles";
import Article from "../components/Article";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function SingleArticle() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.article);
  const token = useSelector((state) => state.user.token);
  const toggleFavorite = useSelector((state) => state.articles.toggleFavorite);
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const articleWasDeleted = useSelector(
    (state) => state.articles.articleWasDeleted
  );
  const articleEdit = useSelector((state) => state.articles.articleEdit);
  useEffect(() => {
    if (articleWasDeleted === true || articleEdit === true) {
      navigate(fromPage, { replace: true });
    }
  }, [articleWasDeleted, navigate, fromPage, articleEdit]);
  useEffect(() => {
    dispatch(getOneArticle({ slug, token }));
  }, [dispatch, slug, token, toggleFavorite]);
  return <>{article && <Article article={article} />}</>;
}
export default SingleArticle;

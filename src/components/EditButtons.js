import { message, Popconfirm } from "antd";
import { deleteArticle } from "../API/fetchRequestArticles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EditButtons({ article }) {
  const slug = article.slug;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const confirm = () => {
    dispatch(deleteArticle({ slug, token })).then(
      () => message.success("The Article was deleted"),
      () => message.error("Server Error")
    );
  };
  return (
    <div className="buttons">
      <Popconfirm
        title="Delete the article"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
        что
        placement={"right"}
      >
        <button className="article-user__button button--red button--delete">
          Delete
        </button>
      </Popconfirm>
      <button
        onClick={() => navigate("/edit-article", { state: article })}
        className="article-user__button button--green button--edit"
      >
        Edit
      </button>
    </div>
  );
}
export default EditButtons;

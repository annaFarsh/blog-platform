import NotFound from "../img/NotFound.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetError } from "../store/articleSlice";

function NotFoundPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div>
        <img alt="sad cat" src={NotFound} />
      </div>
      <div>Sorry, the page you visited does not exist.</div>
      <div>
        {" "}
        <button
          className="form__button button button--green"
          onClick={() => {
            dispatch(resetError());
            navigate("/", { replace: true });
          }}
          type="submit"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
export default NotFoundPage;

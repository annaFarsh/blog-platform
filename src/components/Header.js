import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteLoginLS } from "../services/functionForWorkWithLS";
import { logoutUser } from "../store/userSlice";
import UserAvatar from "../img/UserAvatar.svg";
import { resetError } from "../store/articleSlice";
function Header() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.image);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  function logout() {
    deleteLoginLS();
    dispatch(logoutUser());
  }

  return (
    <header className="header">
      <button
        onClick={() => {
          dispatch(resetError());
          navigate(fromPage);
        }}
        className="header__button button button--home"
      >
        Realworld Blog
      </button>

      {login === false && (
        <div className="header__info-panel">
          <button className="button button--sign-in header-button">
            <Link to="sign-in">Sign In</Link>
          </button>
          <button className="button button--green button--sign-up header-button">
            <Link to="sign-up">Sign Up</Link>
          </button>
        </div>
      )}
      {login === true && (
        <div className="login-header">
          <button className="header-button button button--green button--create">
            <Link to="new-article">Create article</Link>
          </button>

          <Link className="header__profile" to="profile">
            <button className="header-button button button--profile">
              {username}
            </button>

            <img
              alt="аватар"
              src={avatar}
              width="46px"
              height="46px"
              onError={(e) => (e.target.src = UserAvatar)}
            />
          </Link>

          <div>
            <button
              className="button header__button button--logout"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;

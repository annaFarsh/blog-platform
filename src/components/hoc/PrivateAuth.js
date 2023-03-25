import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NotAccessPage from "../../pages/NotAccessPage";
const PrivateAuth = ({ children }) => {
  const location = useLocation();
  const login = useSelector((state) => state.user.login);
  if (!login) {
    return <NotAccessPage state={{ from: location }} />;
  }
  return children;
};
export default PrivateAuth;

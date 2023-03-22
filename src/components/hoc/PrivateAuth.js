import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateAuth = ({ children }) => {
    const location = useLocation();
    const login = useSelector((state) => state.user.login);
    if (!login) {
        return <Navigate to="/sign-in" state={{ from: location }} />;
    }
    return children;
};
export default PrivateAuth;
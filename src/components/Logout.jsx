import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigte = useNavigate;

  const handleLogout = () => {
    setToken();
    navigte("/login", { replace: true });
  };

  handleLogout();

  return <>Logout Page</>;
};

export default Logout;

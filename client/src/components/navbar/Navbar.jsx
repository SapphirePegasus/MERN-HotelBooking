import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logoimg from './campfirelogo.png';
import accntimg from './accounticon.png';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickRegister = () => {
    navigate("/signup");
  };

  const handleClickLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <img className="logoimg" src={logoimg} alt="logohere"></img>
            Camp Fire...
          </span>
        </Link>
        {user ? 
        (
          <div className="accountItems">
            <img className="accountimg" src={accntimg} alt="logohere"></img> 
            {user.username}
            <button className="navButton" onClick={handleClickLogout}>Log Out</button>
          </div>
        )
        : 
        (
          <div className="navItems">
            <button className="navButton" onClick={handleClickRegister}>Sign Up</button>
            <button className="navButton" onClick={handleClickLogin}>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

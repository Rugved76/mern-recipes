import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    // window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link className="nav-item" to='/'>
        <h1 style={{ marginRight: '56rem' }}>Recipes</h1>
      </Link>
      <Link className='nav-item' to="/create-recipe">✚</Link>
      <Link className='nav-item' to="/saved-recipes">Saved </Link>
      {!cookies.access_token ? (
        <Link className='nav-item' to="/auth">Login</Link>
      ) : (
        <button className="submit" onClick={logout}> Logout </button>
      )}
    </div>
  );
};

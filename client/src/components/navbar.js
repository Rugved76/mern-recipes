import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    // window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <h1 style={{marginRight:'58rem'}}>Recipes</h1>
      <Link className='nav-item'to="/">Home</Link>
      <Link className='nav-item'to="/create-recipe">Create</Link>
      <Link className='nav-item' to="/saved-recipes">Saved </Link> 
      {!cookies.access_token ? (
        <Link className='nav-item'to="/auth">Login</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};

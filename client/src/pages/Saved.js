import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { url } from "./Home";
import { Link } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`${url}/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div className="savedcard">
              <Link to={`/${recipe._id}`}>
                <h2 style={{marginBottom:'0'}}>{recipe.name}</h2>
              </Link>
              <p style={{marginTop:'0'}}>{recipe.instructions}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

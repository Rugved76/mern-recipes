import "../App.css";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { Navigate,Link } from "react-router-dom";
import axios from "axios";
import loadingGif from '../components/PVtR.gif'
// export const url = `http://localhost:3001`    // nothin
export const url = `https://recipeserver-odjx.onrender.com`


export const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [redirect, setRedirect ] = useState(false)
    const userID = useGetUserID();

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`${url}/recipes`);
            setRecipes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSavedRecipes = async () => {
        try {
            const response = await axios.get(`${url}/recipes/savedRecipes/ids/${userID}`);
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRecipes();
        fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(`${url}/recipes`, {
                recipeID,
                userID,
            });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const deleterecipe = async (recipeID) => {
        try {
            await axios.delete(`${url}/recipes/${recipeID}`);
            setRedirect(true)
        } catch (error) {
            console.log(error);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (recipes[0]) ? (
        <div>
            <ul className="ul">
                {recipes.map((recipe) =>
                (
                    <li className="li" key={recipe._id}>
                        <div className="card">

                            <Link className="textdata" to={`/${recipe._id}`}>
                                <h2>{recipe.name}</h2>
                            </Link>

                            <p className="inst">{truncateText(recipe.instructions, 125)}</p>

                            <button className="submit"
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>

                            <button
                                className="submit"
                                onClick={() => deleterecipe(recipe._id)}>
                                DEL
                            </button>
                        </div>
                    </li>
                )
                )}
            </ul>
        </div>
    ) : (
        <img className="loadinggif" src={loadingGif} alt="Loading..." />
    )

};

import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { url } from "./Home";
import { Link } from "react-router-dom";
import loadingGif from '../components/PVtR.gif'

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

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (savedRecipes[0]) ? (  // savedRecipes is not a data but an array of data so [0]
        <div className="savedbody">
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div className="savedcard">
                            <Link to={`/${recipe._id}`}>
                                <h2 style={{ marginBottom: '0' }}>{recipe.name}</h2>
                            </Link>
                            <p className="inst">{truncateText(recipe.instructions,125)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <img className="loadinggif" src={loadingGif} alt="Loading..." />
    )
};

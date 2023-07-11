import { useParams } from "react-router-dom";
import { url } from "./Home";
import { useEffect, useState } from "react";
import axios from 'axios'
import './recipepage.css'

export const RecipePage = () => {

    const [recipeInfo, setRecipeInfo] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${url}/recipes/${id}`)
                setRecipeInfo(response.data)
            } catch (er) {
                console.log(er)
            }
        }

        fetchRecipe();
    }, [])

    return (recipeInfo) ? (
        <div>
            <div style={{ marginTop: '10px' }} className="card">
                <h1>{recipeInfo.name}</h1>
                <h6>@<span style={{color:'blue'}}>{recipeInfo.userOwner}</span></h6>
                <p>{recipeInfo.instructions}</p>
            </div>
        </div>
    ) : (
        <div>nothing to show here...</div>
    )
}
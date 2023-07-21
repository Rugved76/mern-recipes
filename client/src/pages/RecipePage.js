import { useParams } from "react-router-dom";
import { url } from "./Home";
import { useEffect, useState } from "react";
import axios from 'axios'
import loadingGif from '../components/PVtR.gif'

export const RecipePage = () => {

    const [recipeInfo, setRecipeInfo] = useState('');
    const { id } = useParams();

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`${url}/recipes/${id}`)
            setRecipeInfo(response.data)
        } catch (er) {
            console.log(er)
        }
    }

    useEffect(() => {
        fetchRecipe();
    }, [])

    return (recipeInfo) ? (
        <div className="savedbody">
            <div style={{ marginTop: '5.7rem' }} className="card">
                <h1>{recipeInfo.name}</h1>
                <h6>@<span style={{color:'blue'}}>{recipeInfo.userOwner}</span></h6>
                <p>{recipeInfo.instructions}</p>
            </div>
        </div>
    ) : (
        <img className="loadinggif" src={loadingGif} alt="Loading..." />
    )
}

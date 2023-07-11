import { useParams } from "react-router-dom";
import { url } from "./home";
import { useEffect, useState } from "react";
import './recipepage.css'

export const RecipePage = () =>{
    const [recipeInfo, setRecipeInfo] = useState(null);
    const {recipeId} = useParams();

    useEffect(()=>{
        fetch(`${url}/${recipeId}`)
            .then(response => {
                response.json().then(recipeInfo=>{
                    setRecipeInfo(recipeInfo)
                })
            })
    },[])

    if(!recipeInfo) return '';

    return(
        <div>
            <h1>{recipeInfo}.name</h1>
        </div>
    )
}
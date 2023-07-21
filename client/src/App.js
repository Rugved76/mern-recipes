import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from './components/Footer'
import { Auth } from "./pages/Authentication";
import { CreateRecipe } from "./pages/Create";
import { Home } from "./pages/Home";
import { SavedRecipes } from "./pages/Saved";
import { RecipePage } from "./pages/RecipePage";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-recipe" element={<CreateRecipe />} />
                    <Route path="/saved-recipes" element={<SavedRecipes />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/:id" element={<RecipePage />} />
                </Routes>
                <Footer  />
            </Router>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import axios from "axios";
import "./Recipe.css"
import Masonry from "react-masonry-css";


function Recipe() {

    const [searchText,setSearchText] = useState("");
    const [recipes, setRecipes] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;
    // console.log(apiKey);
    const [hasSearch, setHasSearch] = useState(false);

    //触发调用api
    const handleSearch = async () => {
        try {

            
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchText}&number=20`
            );
            console.log("here");
            console.log(response.data);

            setRecipes(response.data.results);
            setHasSearch(true);

            // console.log(recipe)

        }catch (error) {
            console.error(error);

        }
    };
    //按回车键触发搜索
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          console.log('enter')
        handleSearch();

      }
    };

    const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
    };





    return (
        <div className="recipe-app">
            <h1 className="app-title">recipe search</h1>
        <div className="search-container">
            <input
                type="text"
                value={searchText}
                onChange={(e)=>{setSearchText(e.target.value)}}
                placeholder="Enter a recipe name,such as apple"
                className="search-input"
            />
            <button
                onClick={handleSearch}
                onKeyDown={handleKeyDown}

                className="search-button">search
            </button>
        </div>
            {/*如果搜索不到结果就提示搜索不到*/}
        {hasSearch && recipes.length === 0 ?
            (<div className="no-results">No results found.</div>
            ) : (
                <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
                >
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-image"
                    />
                    <h2 className="recipe-title">{recipe.title}</h2>
                  </div>
                    ))}
                </Masonry>
            )
        }


        </div>
    )
}

export default Recipe;
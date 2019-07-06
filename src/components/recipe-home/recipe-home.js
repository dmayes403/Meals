import React, { Component, useState, useEffect } from 'react';
import './recipe-home.scss';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const RecipeHome = props => {
    const styles = {
        tab: {
            color: '#4c8492'
        },
    }
    const [tabIndex, setTabIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedIng, setSelectedIng] = useState(null);
    const [meals, setMeals] = useState([]);
    const [mealId, setMealId] = useState(null);
    const [meal, setMeal] = useState(null);


    useEffect(() => {
        axios.all([
            axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`),
            axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`),
            axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`),
        ]).then(data => {
            setCategories(data[0].data.meals);
            setAreas(data[1].data.meals);
            setIngredients(data[2].data.meals);
        },)
    }, [])

    useEffect(() => {
        let letter;
        let word;
        if (selectedCat) {
            letter = 'c';
            word = selectedCat.category;
        } else if (selectedArea) {
            letter = 'a';
            word = selectedArea.area;
        } else if (selectedIng) {
            letter = 'i';
            word = selectedIng.ingredient;
        }

        if (word && letter) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${letter}=${word}`).then(response => {
                console.log(response.data.meals);
                setMeals(response.data.meals);
            })
        }
    }, [selectedCat, selectedArea, selectedIng]);

    useEffect(() => {
        if (mealId) {
            console.log(mealId);
            axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(response => {
                console.log(response.data.meals[0]);
                setMeal(response.data.meals[0]);
            })
        }
    }, [mealId])

    return (
        <div className="rh-main-container">
            <Card className="rh-category-container" style={{backgroundColor: '#fffde8'}}>
                <Tabs
                    value={tabIndex}>
                    <Tab style={styles.tab} label="Categories" onClick={() => setTabIndex(0)}/>
                    <Tab style={styles.tab} label="Areas" onClick={() => setTabIndex(1)}/>
                    <Tab style={styles.tab} label="Ingredients" onClick={() => setTabIndex(2)}/>
                </Tabs>

                <div className="rh-sections-container">
                    {tabContainer(tabIndex, categories, areas, ingredients)}
                </div>
            </Card>

            {displayMealsList()}

            {displayMealDetails()}
        </div>
    )

    function tabContainer(selectedTabIndex, tempCats, tempAreas, tempIngredients) {
        switch (selectedTabIndex) {
            case 0:
                return (
                    tempCats.map((category, index) => {
                        return (
                            <div className="catRow" key={index}
                                onClick={() => handleTabRowClick({'category': category.strCategory})}>{category.strCategory}</div>
                        )
                    })
                )
            case 1:
                return  (
                    tempAreas.map((area, index) => {
                        return (
                            <div className="catRow" key={index}
                                onClick={() => handleTabRowClick({'area': area.strArea})}>{area.strArea}</div>
                        )
                    })
                )
            case 2:
                return (
                    tempIngredients.map((ingredient, index) => {
                        return (
                            <div className="catRow" key={index}
                                onClick={() => handleTabRowClick({'ingredient': ingredient.strIngredient})}>{ingredient.strIngredient}</div>
                        )
                    })
                )
        }
    }

    function displayMealsList() {
        let selected = {};
        if (selectedCat) {
            selected = {section: 'Category', title: selectedCat.category};
        } else if (selectedArea) {
            selected = {section: 'Area', title: selectedArea.area};
        } else if (selectedIng) {
            selected = {section: 'Ingredient', title: selectedIng.ingredient};
        }

        if (selectedCat || selectedArea || selectedIng) {
            return (
                <Card className="rh-meals-container" style={{backgroundColor: '#fffde8'}}>
                    <div className="title">{selected.section}: {selected.title}</div>
                    <hr style={{marginBottom: '0px'}}></hr>
                    <div className="rh-meals-list-container">
                        {displayMeals()}
                    </div>
                </Card>
            )
        }
    }

    function handleTabRowClick(row) {
        if (row.category) {
            setSelectedCat(row);
            setSelectedArea(null);
            setSelectedIng(null);
        } else if (row.area) {
            setSelectedArea(row);
            setSelectedCat(null);
            setSelectedIng(null);
        } else {
            setSelectedIng(row);
            setSelectedCat(null);
            setSelectedArea(null);
        }
    }

    function handleMealsRowClick(meal) {
        console.log(meal);
        setMealId(meal.idMeal);
    }

    function displayMeals() {
        if (meals.length) {
            return meals.map((meal, index) => {
                return (<div key={index} onClick={() => handleMealsRowClick(meal)}className="catRow">{meal.strMeal}</div>)
            })
        }
    }

    function displayMealDetails() {
        if (meal) {
            return (
                <div>
                    <img src={meal.strMealThumb}></img>
                </div>
            )
        }
    }
}

export default RecipeHome;


// const mapStateToProps = ({recipes}) => {
//     console.log(recipes);
//     return recipes;
// };

// export default connect(mapStateToProps, actions)(RecipeHome);

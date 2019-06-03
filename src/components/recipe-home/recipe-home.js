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
    const [tabIndex, setTabIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);


    useEffect(() => {
        axios.all([
            axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`),
            axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`),
            axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`),
        ]).then(data => {
            console.log(data);
            setCategories(data[0].data.meals);
            setAreas(data[1].data.meals);
            setIngredients(data[2].data.meals);
            console.log(categories);
        },)
    }, [])

    return (
        <div className="rh-main-container">
            <Card className="rh-category-container" style={{backgroundColor: '#fffde8'}}>
                {/* {categories.map((recipe, index) => {
                    return <div key={index}>{recipe.strCategory}</div>
                })} */}
                <Tabs
                    value={0}>
                    <Tab label="Categories" />
                    <Tab label="Areas" />
                    <Tab label="Ingredients" />
                </Tabs>
            </Card>

            <div className="rh-meals-container">

            </div>

            <div className="rh-meal-container">

            </div>
        </div>
    )
}

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

export default RecipeHome;





// class RecipeHome extends Component {
//     const [tabIndex, setTabIndex] = useState(0);
//     componentDidMount() {
//         this.props.getCategories();
//     }

//     render() {
//         return (
//             <div className="rh-main-container">
//                 <Card className="rh-category-container" style={{backgroundColor: '#fffde8'}}>
//                     {/* {this.props.categories.map((recipe, index) => {
//                         return <div key={index}>{recipe.strCategory}</div>
//                     })} */}
//                     <Tabs
//                         value={0}>
//                         <Tab label="Categories" />
//                         <Tab label="Areas" />
//                         <Tab label="Ingredients" />
//                     </Tabs>
//                 </Card>
    
//                 <div className="rh-meals-container">
    
//                 </div>
    
//                 <div className="rh-meal-container">
    
//                 </div>
//             </div>
//         )
//     }
// }

// function TabContainer(props) {
//     return (
//       <Typography component="div" style={{ padding: 8 * 3 }}>
//         {props.children}
//       </Typography>
//     );
//   }

// const mapStateToProps = ({recipes}) => {
//     console.log(recipes);
//     return recipes;
// };

// export default connect(mapStateToProps, actions)(RecipeHome);

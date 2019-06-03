import React, { Component } from 'react';
import './recipe-home.scss';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeHome extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <div className="rh-main-container">
                <div className="rh-category-container">
                    {this.props.categories.map((recipe, index) => {
                        return <div key={index}>{recipe.strCategory}</div>
                    })}
                </div>
    
                <div className="rh-meals-container">
    
                </div>
    
                <div className="rh-meal-container">
    
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({recipes}) => {
    console.log(recipes);
    return recipes;
};

export default connect(mapStateToProps, actions)(RecipeHome);

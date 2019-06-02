
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import RecipeReducer from './recipeReducer';

export default combineReducers({
    form: reduxForm,
    recipes: RecipeReducer
});
import axios from 'axios';
import { FETCH_CATEGORIES} from './types';

export const getCategories = () => dispatch => {
    // const res = await axios.get(`/api/searchMovies/${movieTitle}/${pageNumber}`);
    // dispatch({ type: SEARCH_MOVIES, payload: { movies: res.data.movies, pageData: res.data.pageData }});
    axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`).then(res => {
        console.log(res.data.meals);
        dispatch({ type: FETCH_CATEGORIES, payload: res.data.meals});
    })
};
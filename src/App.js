import React from 'react';
import './App.css';
import { 
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Home from './components/home/home'
import TopNav from './components/top-nav/top-nav';
import RecipeHome from './components/recipe-home/recipe-home';

function App() {
    return (
        <Router>
            <TopNav />
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/recipe-home" component={RecipeHome}/>
            </div>
        </Router>
    );
}

export default App;

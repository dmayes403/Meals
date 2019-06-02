import React from 'react';
import './top-nav.scss';
import { Link } from 'react-router-dom';
import AccountCircleOutline from '@material-ui/icons/AccountCircleOutlined'

function TopNav() {
    return (
        <div className="tp-main-container">
            <div className="tp-menu-items">
                <Link to={'/'} className="tp-title">Meal Plan</Link>
                <span style={{fontSize: '24px'}}>|</span>
                <Link to={'/recipe-home'} className="tp-menu-item">Recipes</Link>
                <Link to={'/my-plan'} className="tp-menu-item">My Plan</Link>
            </div>
            <AccountCircleOutline style={{fontSize: '32px', color: '#4c8492'}} />
        </div>
    )
}

export default TopNav;
// need to figure out useEffect, useState, useContext, useReducer
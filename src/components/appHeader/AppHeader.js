import React from 'react';
import './appHeader.css';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <div className='appHeader'>
            <div className='linkDiv'><NavLink className={(link) => (link.isActive ? 'active' : '')} to='ParsingFormJSON.React/'>Данные</NavLink></div>
            <div className='linkDiv'><NavLink className={(link) => (link.isActive ? 'active' : '')} to='/projectsPage'>Проекты</NavLink></div>
        </div>
    );
};

export default AppHeader;
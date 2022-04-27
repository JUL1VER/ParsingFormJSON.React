import React from 'react';
import LocalStoreService from '../service/servise';
import InputPage from '../inputPage/InputPage';
import './projectsPage.css';

const ProjectsPage = () => {
    const data = new LocalStoreService();
    
    const dataArr = data.getInfoFromStorage().map((value) => <li className='oneBlock' key={value.id}>{value.subject}</li>)
    
    return (
        <div className='dataBlock'>
            <ul className='dataList'>
                {dataArr}
            </ul>
        </div>
    );
};

export default ProjectsPage;
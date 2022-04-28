import { useState } from 'react';
import React from 'react';
import LocalStoreService from '../service/servise';
import './projectsPage.css';
import { monthMap } from '../../constants/monthMap';

const ProjectsPage = () => {
    const data = new LocalStoreService();

    const getData = data.getInfoFromStorage()

    const toNormalDate = (date) => {
        const normalDate = new Date(date)
        const day = normalDate.getDate().toString().length < 2 ? '0' + normalDate.getDate() : normalDate.getDate()
        const month = normalDate.getMonth().toString().length < 2 ? '0' + normalDate.getMonth() : normalDate.getMonth()
        
        const stringNormalDate = day + '.' + month + '.' + normalDate.getFullYear()

        return stringNormalDate
    }

    const [detailedData, setDetailedData] = React.useState({subject: getData[0].subject, 
                                                            startDate: getData[0].startDate, 
                                                            endDate: getData[0].endDate,
                                                            createdBy: getData[0].createdBy,
                                                            description: getData[0].description})

    const filterData = (id) => {
        let selected = getData.filter(value => value.id === id)
        
        setDetailedData(...selected);
    }
    
    const dataArr = getData.map((value) => {
        
        const startDate = new Date(value.startDate);
        const endDate = new Date(value.endDate);

        const startDateString = startDate.getDate() + ' ' + monthMap.get(startDate.getMonth()) + ' ' + startDate.getFullYear() + ' - ' +
                                endDate.getDate() + ' ' + monthMap.get(endDate.getMonth()) + ' ' + endDate.getFullYear();


        return(
            <li className='oneBlock' key={value.id} onClick={() => filterData(value.id)}>
                <div className="dateBlock">{startDateString}</div>
                <div className="subjNameBlock">{value.subject}</div>
                <div className="personBlock">{value.createdBy}</div>
            </li>
        )}
    )
    
    return (
        <div className="projectPageWrapper">
            <div className='dataBlock'>
                <ul className='dataList'>
                    {dataArr}
                </ul>
            </div>
            <div className="projectInfo">
                <div className="projectName">{detailedData.subject}</div>
                <div className="wrapperBlockInfo">
                    <div className="blockStartDate">Дата начала <span className="startText">{toNormalDate(detailedData.startDate)}</span></div>
                    <div className="blockEndDate">Дата окончания<span className="endText">{toNormalDate(detailedData.endDate)}</span></div>
                    <div className="blockPerson">Автор <span className="personText">{detailedData.createdBy}</span></div>
                </div>
                <div className="description">Описание <span className="descrText">{detailedData.description}</span></div>
                <button className="changeInfo">Изменить</button>
            </div>
        </div>
    );
};

export default ProjectsPage;
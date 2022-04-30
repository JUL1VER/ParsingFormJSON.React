import { useState } from 'react';
import React from 'react';
import LocalStoreService from '../service/servise';
import './projectsPage.css';
import { monthMap } from '../../constants/monthMap';

const ProjectsPage = () => {
    const data = new LocalStoreService();

    let getData = data.getInfoFromStorage().sort((elem1, elem2) => {
        if (+elem1.id < +elem2.id) {
            return -1;
        }
        if (+elem1.id > +elem2.id) {
            return 1;
        }
        return 0;
    })

    const toNormalDate = (date) => {
        const normalDate = new Date(date)
        const day = normalDate.getDate().toString().length < 2 ? '0' + normalDate.getDate() : normalDate.getDate()
        const month = (normalDate.getMonth()+1).toString().length < 2 ? '0' + (normalDate.getMonth()+1) : (normalDate.getMonth()+1)
        
        const stringNormalDate = day + '.' + month + '.' + normalDate.getFullYear()

        return stringNormalDate
    }

    const [detailedData, setDetailedData] = React.useState({id: getData[0].id,
                                                            subject: getData[0].subject, 
                                                            startDate: getData[0].startDate, 
                                                            endDate: getData[0].endDate,
                                                            createdBy: getData[0].createdBy,
                                                            description: getData[0].description})

    const filterData = (id) => {
        let selected = getData.filter(value => value.id === id)
        
        setDetailedData(...selected);
    }

    const [inputInfoChange, setInputInfoChange] = React.useState(true);

    const saveInfo = (e) => {
        if (!inputInfoChange) {
            setDetailedData((prevState) => {
                const sendData = {id: prevState.id,
                subject: infoTitle.length ? infoTitle : prevState.subject,
                startDate: infoStartDate != null ? infoStartDate : prevState.startDate,
                endDate: infoEndDate != null ? infoEndDate : prevState.endDate,
                createdBy: infoPerson.length ? infoPerson : prevState.createdBy,
                description: infoDescr.length ? infoDescr : prevState.description}
                data.setInfo([sendData])
                getData = data.getInfoFromStorage().sort((elem1, elem2) => {
                    if (+elem1.id < +elem2.id) {
                        return -1;
                    }
                    if (+elem1.id > +elem2.id) {
                        return 1;
                    }
                    return 0;
                })
                dataArr();
                return sendData;
            })
        }
        setInputInfoChange(!inputInfoChange)
    }

    let infoTitle = '';
    let infoStartDate = null;
    let infoEndDate = null;
    let infoPerson = '';
    let infoDescr = '';
    
    const dataArr = () => getData.map((value) => {
        
        const startDate = new Date(value.startDate);
        const endDate = new Date(value.endDate);

        const startDateString = startDate.getDate() + ' ' + monthMap.get(startDate.getMonth())  + ' ' + startDate.getFullYear() + ' - ' +
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
                    {dataArr()}
                </ul>
            </div>
            <div className="projectInfo">
                {
                    inputInfoChange ? 
                    <div className="projectName">{detailedData.subject}</div> :
                    <input type="text" defaultValue={detailedData.subject} onChange={(e) => {infoTitle = e.target.value}} className="inputProject"/>
                }
                <div className="wrapperBlockInfo">
                    <div className="blockStartDate">
                        Дата начала 
                        {
                            inputInfoChange ? 
                            <span className="startText">{toNormalDate(detailedData.startDate)}</span> : 
                            <input type="datetime-local" defaultValue={detailedData.startDate} onChange={(e) => {infoStartDate = e.target.value}} className="inputDate"/>
                        }
                    </div>
                    <div className="blockEndDate">
                        Дата окончания
                        {
                            inputInfoChange ? 
                            <span className="endText">{toNormalDate(detailedData.endDate)}</span> : 
                            <input type="datetime-local" defaultValue={detailedData.endDate} onChange={(e) => {infoEndDate = e.target.value}}className="inputDate"/>
                        }
                    </div>
                    <div className="blockPerson">
                        Автор 
                        {
                            inputInfoChange ? 
                            <span className="personText">{detailedData.createdBy}</span> : 
                            <textarea type="text" defaultValue={detailedData.createdBy} onChange={(e) => {infoPerson = e.target.value}} className="inputInfoChange"/>
                        }
                    </div>
                </div>
                <div className="description">
                    Описание 
                    {
                        inputInfoChange ? 
                        <span className="descrText">{detailedData.description}</span> : 
                        <textarea defaultValue={detailedData.description} onChange={(e) => {infoDescr = e.target.value}} className="inputInfoChange"/>
                    }
                </div>
                <button className="changeInfo" onClick={() => saveInfo()}>
                    {inputInfoChange ? 'Изменить' : 'Сохранить'}
                </button>
            </div>
        </div>
    );
};

export default ProjectsPage;
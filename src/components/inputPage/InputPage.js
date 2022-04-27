import React from 'react';
import './inputPage.css';
import LocalStoreService from '../service/servise';

const InputPage = () => {

    const service = new LocalStoreService();

    let parseData = '';

    const parsText = () => {
        const parsedData = JSON.parse(parseData);
        console.log(parsedData.Projects);
        service.setInfo(parsedData.Projects);
    }

    console.log(service.getInfoFromStorage());

    return (
        <>
            <div>
                <textarea className='jsontext' onChange={(e) => parseData = e.target.value}>
                </textarea>
            </div>
            <button className="saveData" onClick={parsText}>Сохранить</button>
        </>  
    );
};

export default InputPage;
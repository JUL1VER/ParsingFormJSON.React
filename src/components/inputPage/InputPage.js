import React from 'react';
import './inputPage.css';
import LocalStoreService from '../service/servise';
import * as defJSON from '../../constants/defaultJSON.json';

const InputPage = () => {

    const service = new LocalStoreService();

    let parseData = JSON.stringify(defJSON);

    const parsText = () => {
        const parsedData = JSON.parse(parseData);
        service.setInfo(parsedData.Projects);
    }

    parsText();

    return (
        <div className="inputPageWrapper">
            <div>
                <textarea defaultValue={parseData} className='jsontext' onChange={(e) => parseData = e.target.value}>
                </textarea>
            </div>
            <button className="saveData" onClick={parsText}>Сохранить</button>
        </div>
    );
};

export default InputPage;
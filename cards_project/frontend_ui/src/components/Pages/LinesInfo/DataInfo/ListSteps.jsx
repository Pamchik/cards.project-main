import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProcessStep from './ProcessStep';
import { API_Url } from '../../../../App.js';


function ListSteps({
    selectedID,
    currentLineUrl,
    line_type
}) {
    
    const [processStepData, setProcessStepData] = useState([])
    useEffect(() => {
        axios
            .get(`${API_Url}/api/process-list/`)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.position_number - b.position_number);
                setProcessStepData(sortedData)
            });
    }, [])

    // Отслеживать открытие форм с информацией
        const [activeSpoiler, setActiveSpoiler] = useState(null);
        const handleSpoilerClick = (event) => {
            const clickedSpoiler = event.currentTarget;
            const spoilerBlock = clickedSpoiler.nextElementSibling;
            
            if (activeSpoiler && activeSpoiler !== clickedSpoiler) {        // Остальные формы будут закрыты при открытии новой
                activeSpoiler.classList.remove('active');
                activeSpoiler.nextElementSibling.style.display = 'none';
            }

            clickedSpoiler.classList.toggle('active');
            spoilerBlock.style.display = spoilerBlock.style.display === 'none' || !spoilerBlock.style.display ? 'block' : 'none';
            
            setActiveSpoiler(clickedSpoiler);
        };


    return (
        <div className="tabs-general__pane  tabs-general__pane_show">
        <div className="detailed-card-info">
            <div className="spoiler-num-cycle one">
                {processStepData.map(item => (
                    <ProcessStep 
                        handleSpoilerClick={handleSpoilerClick} 
                        selectedID={selectedID}
                        currentLineUrl={currentLineUrl}
                        line_type={line_type}
                        urlComponentName={item.url_name}
                        componentName={item.component_name}
                    />
                ))}
            </div>
        </div>
    </div>
    )
}

export default ListSteps
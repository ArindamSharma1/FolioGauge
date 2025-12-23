import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', color = 'primary' }) => {
    return (
        <div className={`spinner-wrapper ${size}`}>
            <div className={`spinner ${color}`}></div>
        </div>
    );
};

export default Spinner;

import React from 'react';
import './StrangerTitle.css';

const StrangerTitle = ({ text = "INTELLINA", subheading = "Welcome to" }) => {
    return (
        <div className="stranger-container">
            <div className="stranger-content">
                <div className="stranger-sub">{subheading}</div>
                <div className="stranger-wrapper">
                    <div className="line-top"></div>
                    <h1 className="stranger-title" data-text={text}>
                        {text}
                    </h1>
                    <div className="line-bottom"></div>
                </div>
            </div>
        </div>
    );
};

export default StrangerTitle;

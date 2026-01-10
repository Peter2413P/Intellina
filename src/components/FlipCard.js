import React from 'react';
import './FlipCard.css';

const FlipCard = ({ name, role, description, linkedin, isUpsideDown }) => {
    return (
        <div className={`flip-card-container ${isUpsideDown ? 'upside-down-theme' : ''}`}>
            <div className="st-card">
                <div className="st-card-bg"></div>

                {/* Profile Icon / Image Placeholder */}
                <div className="st-product-img">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </div>

                <div className="st-content">
                    <h2>{name}</h2>

                    <div className="st-details">
                        {/* Role Tags */}
                        <div className="st-role-container">
                            <span className="st-role-tag">{role}</span>
                        </div>

                        {/* Description - Brief */}
                        <p className="st-description">
                            {description || "Member of the Intellina Team."}
                        </p>

                        {/* LinkedIn / Connect Button */}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="st-btn">
                                Connect
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;

import React from 'react';
import './NotFoundPage.css';
import Navbar from "../navbar/Navbar";

const NotFoundPage = () => {
    return (
        <>
            <Navbar/>
            <div className="not-found-container">
                <div className="card">
                    <h1>404 Not Found</h1>
                    <p>Oops! The page you're looking for does not exist.</p>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;

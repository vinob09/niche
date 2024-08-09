import React from 'react';
import './Loader.css'

function Loader() {
    return (
        <section className="loader">
            <div style={{ '--i': 0 }} className="slider"></div>
            <div style={{ '--i': 1 }} className="slider"></div>
            <div style={{ '--i': 2 }} className="slider"></div>
            <div style={{ '--i': 3 }} className="slider"></div>
            <div style={{ '--i': 4 }} className="slider"></div>
        </section>
    );
}

export default Loader;

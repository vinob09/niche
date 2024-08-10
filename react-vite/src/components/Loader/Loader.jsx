import React from 'react';
import './Loader.css'

function Loader() {
    return (
        /*<section className="loader">
            <div style={{ '--i': 0 }} className="slider"></div>
            <div style={{ '--i': 1 }} className="slider"></div>
            <div style={{ '--i': 2 }} className="slider"></div>
            <div style={{ '--i': 3 }} className="slider"></div>
            <div style={{ '--i': 4 }} className="slider"></div>
        </section>*/
        /* From Uiverse.io by adamgiebl */
        <section class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </section>

    );
}

export default Loader;

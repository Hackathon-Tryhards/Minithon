import React, { useEffect } from 'react';
import './RainAnimation.css';

const RainAnimation = () => {
    useEffect(() => {
        const rainContainer = document.querySelector('.rain');
        const cloud = document.querySelector('.cloud');
        const cloudHeight = cloud.offsetHeight; // Get the height of the cloud

        const createRainDrop = () => {
            const drop = document.createElement('div');
            drop.className = 'drop';

            // Randomize the position and animation duration
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
            drop.style.opacity = Math.random();

            // Position the raindrop to start from the cloud
            drop.style.top = (Math.random() * 10 + cloudHeight) + 'px';

            rainContainer.appendChild(drop);

            // Remove the drop after it falls
            drop.addEventListener('animationend', () => {
                drop.remove();
            });
        };

        // Generate raindrops at regular intervals
        const interval = setInterval(createRainDrop, 100);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div className="rain-animation">
            <div className="cloud"></div>
            <div className="rain"></div>
        </div>
    );
};

export default RainAnimation;

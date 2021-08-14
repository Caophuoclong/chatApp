import React from 'react';
import PropTypes from 'prop-types';

Main.propTypes = {
    
};

function Main(props) {
    return (
        <div className="w-3/5 bg-black flex flex-cols mr-2 h-full">
            <div className="status-bar w-full h-auto"></div>
            <div className="chat-area h-4/6 w-full bg-white"></div>
            <div className="inp-area w-full h-auto"></div>
        </div>
    );
}

export default Main;
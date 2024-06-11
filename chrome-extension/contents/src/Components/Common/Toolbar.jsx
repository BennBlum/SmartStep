import React from 'react';
import { toggleChatbot, ViewNames } from '../../Common';
import logo from '~/assets/smartstep-icon.png';

export default function Toolbar({ switchView }) {
    return (
        <div>
            <img src={logo} className="app-icon" alt="Logo" onClick={() => switchView(ViewNames.WELCOME)}/>
            <button className="nav-link" onClick={() => switchView(ViewNames.SEARCH)}>Search</button>
            <button className="nav-link" onClick={() => switchView(ViewNames.REGISTRY)}>Hub</button>
            <button id="btnClose" className="close-x-btn" onClick={toggleChatbot}>×</button>
        </div>        
    );
}
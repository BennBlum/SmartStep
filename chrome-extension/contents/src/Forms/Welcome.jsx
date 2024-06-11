import React from 'react';
import { toggleChatbot, ViewNames } from '../Common';
import logo from '~/assets/smartstep.png';

export function Welcome({ switchMainView }) {
    return (
        <div id="divWelcome">
            <div id="applogo" className="chatbot-header">
                <img src={logo} className="app-logo" alt="Logo" />
                <button id="btnClose" className="close-btn" onClick={toggleChatbot}>×</button>
            </div>
            <p className="sub-body">Welcome to SmartStep, a guidance system that is designed to assist you with any task you need help
                with. Whether you're new to our
                platform or a seasoned pro, our features are designed to make your experience seamless and
                enjoyable. Let's dive in and achieve great things together!</p>
            <button id="btnWelcome" className="std-btn" onClick={() => switchMainView(ViewNames.SEARCH)}>Let's go!</button>
        </div>
    );
}

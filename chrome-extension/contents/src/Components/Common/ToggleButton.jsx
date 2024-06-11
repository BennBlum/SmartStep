import React from 'react';
import { toggleChatbot } from '../../Common';

function ToggleButton() {
  return (
    <button type="button" id="btnSmartStep" className="toggle-btn" onClick={toggleChatbot}>
      <img src="smartstep-icon.png" className="app-icon" alt="Logo" />
    </button>
  );
}

export default ToggleButton;
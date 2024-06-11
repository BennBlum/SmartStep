import React from 'react';

function SvgSymbols() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <symbol id="stop-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <rect x="15" y="15" width="20" height="20" fill="#515151" />
      </symbol>
      <symbol id="record-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <circle cx="25" cy="25" r="10" fill="#515151" />
      </symbol>
      <symbol id="back-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <line x1="35" y1="25" x2="15" y2="25" stroke="#515151" strokeWidth="2" />
        <polygon points="15,25 25,15 25,35" fill="#515151" />
      </symbol>
      <symbol id="forward-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <line x1="15" y1="25" x2="35" y2="25" stroke="#515151" strokeWidth="2" />
        <polygon points="35,25 25,15 25,35" fill="#515151" />
      </symbol>
      <symbol id="submit-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <line x1="25" y1="15" x2="25" y2="35" stroke="#515151" strokeWidth="2" />
        <polygon points="25,15 15,25 35,25" fill="#515151" />
      </symbol>
      <symbol id="play-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <polygon points="17,15 27,25 17,35" fill="#515151" />
        <polygon points="27,15 37,25 27,35" fill="#515151" />
      </symbol>
      <symbol id="plus-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <line x1="15" y1="25" x2="35" y2="25" stroke="#515151" strokeWidth="2" />
        <line x1="25" y1="15" x2="25" y2="35" stroke="#515151" strokeWidth="2" />
      </symbol>
      <symbol id="minus-svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#515151" strokeWidth="2" />
        <line x1="15" y1="25" x2="35" y2="25" stroke="#515151" strokeWidth="2" />
      </symbol>
    </svg>
  );
}

export default SvgSymbols;
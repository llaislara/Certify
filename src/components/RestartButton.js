import React from 'react';

function RestartButton({ restartApp }) {
  return (
    <button onClick={restartApp} className="restart-button">
      Restart
    </button>
  );
}

export default RestartButton;

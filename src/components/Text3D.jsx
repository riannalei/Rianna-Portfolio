import React from 'react';
import './Text3D.css';

const Text3D = ({ primary, secondary, className = '' }) => {
  return (
    <div className={`text3d-container ${className}`}>
      <p className="text3d-primary">{primary}</p>
      <p className="text3d-secondary">{secondary || primary}</p>
    </div>
  );
};

export default Text3D;
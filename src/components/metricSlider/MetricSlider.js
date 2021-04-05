import React, { useState, useEffect, useContext } from 'react';
import { TempContext } from '../../context/TempContextProvider';
import './MetricSlider.css';

const MetricSlider = () => {
  const [checked, toggleChecked] = useState(true);
  const { toggleTemp } = useContext(TempContext);
  
  useEffect(() => {
    toggleTemp();
  }, [checked]);
  
  return (
    <input
      type="checkbox"
      className="switch"
      id="metric-system"
      checked={checked}
      onChange={() => toggleChecked(!checked)}
    />
  );
}

export default MetricSlider;

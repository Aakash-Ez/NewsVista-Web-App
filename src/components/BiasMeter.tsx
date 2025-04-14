import React from 'react';
import '../styles.css';

interface BiasMeterProps {
  score: number; // between -1 (left) and 1 (right)
}

const BiasMeter: React.FC<BiasMeterProps> = ({ score }) => {
  const percentage = ((score + 1) / 2) * 100; // maps -1..1 to 0..100

  return (
    <div style={{ width: '100%', padding: '4px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: '#1890ff' }}>Left</span>
        <span style={{ color: '#8c8c8c' }}>Center</span>
        <span style={{ color: '#fa541c' }}>Right</span>
      </div>
      <div
        style={{
          position: 'relative',
          height: 8,
          background: 'linear-gradient(to right, #1890ff,rgb(255, 255, 255), #fa541c)',
          borderRadius: 4
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -6,
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '6px solid #000'
          }}
        />
      </div>
    </div>
  );
};

export default BiasMeter;

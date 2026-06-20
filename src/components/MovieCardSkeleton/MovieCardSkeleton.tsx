import React from 'react';
import './MovieCardSkeleton.css';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="skeleton-shimmer" style={{ height: '400px', width: '100%' }}></div>
        
        <div className="card-body bg-light" style={{ padding: '1.5rem' }}>
          <div className="skeleton-shimmer mb-2 rounded" style={{ height: '20px', width: '80%' }}></div>
          <div className="skeleton-shimmer rounded" style={{ height: '15px', width: '40%' }}></div>
        </div>
      </div>
    </div>
  );
};
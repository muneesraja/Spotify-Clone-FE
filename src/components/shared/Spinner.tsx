import React from 'react';

/**
 * A simple loading spinner component.
 */
export function Spinner() {
  return (
    <div 
      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
      role="status"
      aria-live="polite"
      aria-label="Loading..."
    ></div>
  );
} 
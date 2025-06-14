import React from 'react';

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>
      {children}
    </button>
  );
} 
import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>{children}</div>;
} 
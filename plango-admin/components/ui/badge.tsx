import React from 'react';

export default function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ background: '#eee', borderRadius: '8px', padding: '2px 8px', fontSize: '12px' }}>{children}</span>;
} 
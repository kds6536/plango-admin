import React from 'react';

export default function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />;
} 
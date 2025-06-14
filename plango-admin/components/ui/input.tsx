import React from 'react';

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />;
} 
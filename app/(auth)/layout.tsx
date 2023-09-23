import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='grid h-full  place-items-center'>{children}</div>;
}

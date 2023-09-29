import React from 'react';

interface ServerPageProps {
  params: {
    serverId: string;
  };
}
export default function ServerPage({ params }: ServerPageProps) {
  return <div>ServerPage</div>;
}

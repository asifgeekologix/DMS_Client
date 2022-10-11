import dynamic from 'next/dynamic';
import React from 'react';
const Configure = dynamic(import('../src/components/Configure'), { ssr: false });

function DefaultPage() {

  return (
    <>
      <Configure />
    </>
  );
}

export default DefaultPage;

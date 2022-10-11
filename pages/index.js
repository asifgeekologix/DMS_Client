import dynamic from 'next/dynamic';
import React from 'react';
const MyDocuments = dynamic(import('components/MyDocuments'));

function DefaultPage() {

  return (
    <>
      <MyDocuments />
    </>
  );
}

export default DefaultPage;

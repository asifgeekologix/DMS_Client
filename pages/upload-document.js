import dynamic from 'next/dynamic';
import React from 'react';
const UploadDocument = dynamic(import('components/UploadDocument'));

function DefaultPage() {

  return (
    <>
      <UploadDocument />
    </>
  );
}

export default DefaultPage;

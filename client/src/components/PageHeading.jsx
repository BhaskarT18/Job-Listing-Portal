import React from 'react';

const PageHeader = ({ title }) => {
  return (
    <header className="text-center align-items-center  font-semi p-10 m-5 text-2xl">
        <h1>Job Details</h1>
      <h2 className="page-title">{title}</h2>
    </header>
  );
};

export default PageHeader;
import React from 'react';
import { useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();

  return <h2>Edit Employee - ID: {id}</h2>;
};

export default EditEmployee;

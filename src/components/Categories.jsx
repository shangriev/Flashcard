import React from 'react';

export const Categories = () => {
  const categories = [
    'JavaScript',
    'React',
    'TypeScript',
    'Redux Toolkit',
    'Все категории',
  ];

  return (
    <ul>
      {categories.map((objName, i) => (
        <li key={i}>{objName}</li>
      ))}
    </ul>
  );
};

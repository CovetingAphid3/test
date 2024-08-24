import React from 'react';
import styles from '../style';

function Title({ children, id }) {
   return (
      <h1
         id={id && id}
         className={`${styles.heading2} text-center text-ring font-bold`}
      >
         {children}
      </h1>
   )
}

export default Title;


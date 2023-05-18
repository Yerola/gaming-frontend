import styles from "./Error.module.scss";
import { useState, useEffect } from "react";

const Error = ({ msj }) => {

  return (
  
        <div className={styles.error}>
          <p className={styles.errorText}>{msj}</p>
        </div>
    
    
  );
};

export default Error;

import styles from "./Error.module.scss";
import { useState, useEffect } from "react";

const Error = ({ msj }) => {
  //const [visible, setVisible] = useState(true);

  /*useEffect(() => {
    const isVisible = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(isVisible);
  }, [visible]);*/
  return (
  
        <div className={styles.error}>
          <p className={styles.errorText}>{msj}</p>
        </div>
    
    
  );
};

export default Error;

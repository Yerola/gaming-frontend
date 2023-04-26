import styles from "./JoinLayout.module.scss";

//este componente sera mi contenedor de contenido

export function JoinLayout({ children }) {
  return (
    <div className={styles.container}>
      <div>
        
      </div>
      <div>{children}</div>
    </div>
  );
}

import { Container } from "semantic-ui-react";
import classNames from "classnames";
import { TopBar, Footer } from "@/components/Layout";
import styles from "./BasicLayout.module.scss";

export function BasicLayout(props) {
  const {
    children, // para que se renderice la página
    isOpenSearch = false, //search cerrado
    isContainer = false,
    relative = false, //a la parte de arriba de la web
  } = props;

  return (
    <>
      <TopBar isOpenSearch={isOpenSearch} />

      <Container fluid>
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer ? <Container>{children}</Container> : children}
        </div>
      </Container>

      <Footer />
    </>
  );
}

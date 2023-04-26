import styles from './BasicLayout.module.scss';
import { Container } from "semantic-ui-react";
import classNames from "classnames";

export function BasicLayout(props) {
  console.log(props)
    const {children,isOpenSearch=false,isContainer=false,relative=false}=props;
  return (
    <>
    <Container fluid>
      {/* con la classNames condicionamos las className */}
      <div className={classNames({[styles.relative]:relative})} >
      {isContainer?<Container>{children}</Container>:children}
      </div>
    </Container>
    </>
  )
};

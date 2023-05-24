import { Image,Icon } from "semantic-ui-react";
import Link from "next/link";
import { Account } from "../Account";
import { Menu } from "../Menu";
import styles from "./TopBar.module.scss";
import { useState } from "react";

export function TopBar(props) {
  const { isOpenSearch } = props;
const [openClose,setOpenClose]=useState(false);

const handleOpenMenu=()=>{
  setOpenClose(!openClose)
  console.log(openClose)
}

  return (
    <div  className={`${styles.topBar} ${openClose ? "" : styles.hideTopBar}`}>
      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Gaming" />
        </Link>
      </div>

      <div className={styles.center}>
        <Menu isOpenSearch={isOpenSearch} openClose={openClose} />
      </div>

      <div className={styles.right}>
        <Account />
      </div>
      <Icon name="bars" className={styles.bars} onClick={handleOpenMenu} ></Icon>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import styles from "../../styles/header.module.scss";
import Image from "next/image";

interface Props {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box}>
          {/* <img src="/inflearn.png" width={110} height={20} alt="인프런 로고" /> */}
          <Image
            src="https://lecture-1.vercel.app/inflearn.png"
            width={110}
            height={20}
            alt="인프런 로고"
          />
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default HeaderComponent;

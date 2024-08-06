import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomePage.module.css'; // Adjust the path as necessary

// You can replace this with the actual path to your logo
// import logo from '../../public/assets/logo.svg';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* <Image src={logo} alt="Logo" width={500} height={250} className={styles.logo} /> */}
      <div className={styles.taglineContainer}>
        <h1 className={styles.taglineBold}>
          Empowering Secure, Cross-Chain ICOs
        </h1>
        <h2 className={styles.taglineRegular}>
          with Advanced Blockchain Technology
        </h2>
      </div>
      <Link href="/get-started" passHref>
        <button className={styles.button}>Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
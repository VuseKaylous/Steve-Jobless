import React from "react";
import Link from "next/link";
import styles from "../AuthPage.module.css";

const LoginPage = () => (
  <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Đăng Nhập Tài Khoản Admin</h1>
        <form>
          <input type="text" placeholder="Tên đăng nhập" className={styles.inputField} />
          <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Đăng nhập</button>
        </form>
      </div>
    </div>
  </div>
);

export default LoginPage;

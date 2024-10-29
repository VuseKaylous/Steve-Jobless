import React from "react";
import Link from "next/link";
import styles from "./LoginPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Đăng Ký Tài Khoản Tài Xế</h1>
        <form>
          <input type="text" placeholder="Tên đăng nhập" className={styles.inputField} />
          <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Đăng nhập</button>
        </form>
        <div className={styles.linkContainer}>
          <span>Quên mật khẩu? </span>
          <Link href="/driver/forgot-password" legacyBehavior>
            <a className={styles.link}>Quên mật khẩu</a>
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <span>Chưa có tài khoản </span>
          <Link href="/driver/signup" legacyBehavior>
            <a className={styles.link}>Đăng ký</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

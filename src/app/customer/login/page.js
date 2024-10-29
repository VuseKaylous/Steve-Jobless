import React from "react";
import Link from "next/link";
import styles from "../AuthPage.module.css";

const LoginPage = () => (
  <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Đăng Nhập Tài Khoản Khách Hàng</h1>
        <form>
          <input type="text" placeholder="Tên đăng nhập" className={styles.inputField} />
          <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Đăng nhập</button>
        </form>
        <div className={styles.linkContainer}>
          <span>Quên mật khẩu? </span>
          <Link href="/customer/forgot-password" className={styles.link}>Quên mật khẩu</Link>
        </div>
        <div className={styles.linkContainer}>
          <span>Chưa có tài khoản </span>
          <Link href="/customer/signup" className={styles.link}>Đăng ký</Link>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;

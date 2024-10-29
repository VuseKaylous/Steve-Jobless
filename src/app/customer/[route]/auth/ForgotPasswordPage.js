import React from "react";
import Link from "next/link";
import styles from "./AuthPage.module.css";

const ForgotPasswordPage = () => (
  <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Quên Mật Khẩu</h1>
        <form>
          <input type="email" placeholder="Email" className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Quên mật khẩu</button>
        </form>
        <div className={styles.linkContainer}>
          <span>Đã nhớ mật khẩu? </span>
          <Link href="/customer/login" className={styles.link}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  </div>
);

export default ForgotPasswordPage;

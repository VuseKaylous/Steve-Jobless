import React from "react";
import Link from "next/link";
import styles from "../AuthPage.module.css";

const SignupPage = () => (
  <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Đăng Ký Tài Khoản Khách Hàng</h1>
        <form>
          <input type="text" placeholder="Tên đăng nhập" className={styles.inputField} />
          <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
          <input type="email" placeholder="Email" className={styles.inputField} />
          <input type="text" placeholder="Số điện thoại" className={styles.inputField} />
          <input type="text" placeholder="CCCD" className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Đăng ký</button>
        </form>
        <div className={styles.linkContainer}>
          <span>Đã có tài khoản? </span>
          <Link href="/customer/login" className={styles.link}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  </div>
);

export default SignupPage;

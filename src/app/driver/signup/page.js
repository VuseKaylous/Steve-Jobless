import React from "react";
import Link from "next/link";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Đăng Ký Tài Khoản Tài Xế</h1>
        <form>
          <input type="text" placeholder="Tên đăng nhập" className={styles.inputField} />
          <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
          <input type="email" placeholder="Email" className={styles.inputField} />
          <input type="text" placeholder="Số điện thoại" className={styles.inputField} />
          <input type="text" placeholder="CCCD" className={styles.inputField} />
          <input type="text" placeholder="Mã giấy phép lái xe" className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Đăng ký</button>
        </form>
        <div className={styles.linkContainer}>
          <span>Đã có tài khoản? </span>
          <Link href="/driver/login" legacyBehavior>
            <a className={styles.link}>Đăng nhập</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div style={{ backgroundColor: "#00B140", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      <div style={{ position: "absolute", left: 20, bottom: 20 }}>
        <Image src="/girl.png" alt="Anime Girl" width={700} height={700} />
      </div>
      <div style={{ width: "400px", backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "25px", fontSize: "24px", fontFamily: "Arial, sans-serif" }}>Crab</h1>
        <form>
          <div style={{ marginBottom: "15px" }}>
            <input type="text" placeholder="Tên đăng nhập" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontFamily: "Arial, sans-serif" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input type="password" placeholder="Mật khẩu" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontFamily: "Arial, sans-serif" }} />
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" style={{ marginLeft: "10px", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>Ghi nhớ đăng nhập</label>
          </div>
          <div style={{ marginBottom: "20px", textAlign: "left", display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: "16px", marginRight: "20px", fontFamily: "Arial, sans-serif" }}>Bạn là:</label>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", marginRight: "20px", fontFamily: "Arial, sans-serif" }}>
                <input type="radio" name="role" value="customer" defaultChecked style={{ marginRight: "10px" }} /> Khách hàng
              </label>
              <label style={{ display: "flex", alignItems: "center", fontFamily: "Arial, sans-serif" }}>
                <input type="radio" name="role" value="driver" style={{ marginRight: "10px" }} /> Tài xế
              </label>
            </div>
          </div>
          <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#00B140", color: "white", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "16px", fontFamily: "Arial, sans-serif" }}>
            Đăng nhập
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <span style={{ fontSize: "14px", fontFamily: "Arial, sans-serif" }}>Chưa có tài khoản? </span>
          <Link href="/register" legacyBehavior>
            <a style={{ color: "red", textDecoration: "none", fontWeight: "bold", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>Đăng ký</a>
          </Link>
          <br />
          <Link href="/forgot-password" legacyBehavior>
            <a style={{ color: "#007bff", textDecoration: "none", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>Quên mật khẩu</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


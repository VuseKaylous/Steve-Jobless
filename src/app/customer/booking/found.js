import React, { useState, useEffect } from "react";
import styles from "./page.module.css"

const Found = ({ driverId }) => {
  const [driverInfo, setDriverInfo] = useState({});

  useEffect(() => {
    const fetchDriverInfo = async () => {
      const requestData = {
        driverId: driverId,
      };
      const response = await fetch('/api/customer/getinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        setDriverInfo(data);
      } else {
        console.error('Failed to fetch driver information');
      }
    };

    if (driverId) {
      fetchDriverInfo();
    }
  }, [driverId]);

  console.log(driverInfo);

  return (
    <div className={styles.modalContent}>
      <div>
        <p className="mx-auto h5 fw-bold m-0">Đã tìm thấy tài xế!</p>
        <br></br>
        <p className="mx-auto h5 ms-5" style={{textAlign: "left"}}>SĐT: {driverInfo.phone_number}</p>
        <p className="mx-auto h5 ms-5" style={{textAlign: "left"}}>Tài xế: {driverInfo.name}</p>
        <p className="mx-auto h5 ms-5" style={{textAlign: "left"}}>Biển số xe: {driverInfo.vehicle_registration}</p>
      </div>
    </div>
  )
}

export default Found;

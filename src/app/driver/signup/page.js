'use client';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BusinessRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    birthdate: '',
    password: '',
    driver_license_id: '',
    vehicle_registration: '',
    country: 'Việt Nam',
    countryCode: '+84'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for phone country code change
  const handlePhoneCodeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      countryCode: e.target.value
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone_number || 
        !formData.birthdate || !formData.password ||
        !formData.driver_license_id || !formData.vehicle_registration) {
      setError('Vui lòng điền đầy đủ thông tin');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }

    // Validate birthdate format (dd/mm/yyyy)
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(formData.birthdate)) {
      setError('Ngày sinh không đúng định dạng (dd/mm/yyyy)');
      return false;
    }

    return true;
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Format phone number with country code
      const fullPhoneNumber = `${formData.countryCode}${formData.phone_number.replace(/^0+/, '')}`;
      
      // Convert birthdate from dd/mm/yyyy to yyyy-mm-dd
      const [day, month, year] = formData.birthdate.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      const requestData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        birthdate: formattedDate,
        phone_number: fullPhoneNumber,
        driver_license_id: formData.driver_license_id,
        vehicle_registration: formData.vehicle_registration
      };

      const response = await fetch('/api/driver/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        throw new Error(data?.error || `Error: ${response.status} ${response.statusText}`);
      }

      if (!data) {
        throw new Error('Empty response from server');
      }

      console.log('Registration successful:', data);
      router.push('./login');

      // Navigation or success handling can be done here

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-11">
            <div className="card shadow-sm">
              <img
                src="/image.png"
                alt="Business banner"
                className="card-img-top rounded-top"
              />
              <div className="card-body">
                <h1 className="card-title h1 fw-bold text-dark mb-3">Crab</h1>
                <p className="text-muted mb-4">
                  Quản lý nhu cầu di chuyển, đồ ăn và giao hàng của bạn
                </p>
                <div className="bg-light p-4 rounded">
                  <h2 className="h4 fw-bold text-dark mb-3">Thông tin cá nhân</h2>
                  <p className="text-muted mb-4">
                    Chúng tôi sẽ cần các giấy tờ đăng ký để chuẩn bị mọi thứ sẵn sàng trước khi bạn bắt đầu.
                  </p>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Quốc gia</label>
                        <select 
                          className="form-select"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option>Việt Nam</option>
                          <option>Hoa Kỳ</option>
                          <option>Nhật Bản</option>
                          <option>Pháp</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@gmail.com"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Số điện thoại liên hệ của bạn</label>
                        <div className="input-group">
                          <select 
                            className="form-select"
                            value={formData.countryCode}
                            onChange={handlePhoneCodeChange}
                          >
                            <option>+84</option>
                            <option>+1</option>
                            <option>+81</option>
                            <option>+82</option>
                            <option>+33</option>
                          </select>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bắt buộc cung cấp SĐT"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input 
                          type="text" 
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Ngày tháng năm sinh</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="dd/mm/yyyy"
                          name="birthdate"
                          value={formData.birthdate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input 
                          type="password" 
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Số giấy phép lái xe</label>
                        <input 
                          type="text" 
                          className="form-control"
                          name="driver_license_id"
                          value={formData.driver_license_id}
                          onChange={handleInputChange}
                          placeholder="Nhập số giấy phép lái xe"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Số đăng ký xe</label>
                        <input 
                          type="text" 
                          className="form-control"
                          name="vehicle_registration"
                          value={formData.vehicle_registration}
                          onChange={handleInputChange}
                          placeholder="Nhập số đăng ký xe"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-success w-100"
                      style={{backgroundColor: '#00B14F'}}
                      disabled={loading}
                    >
                      {loading ? 'Đang xử lý...' : 'Tiếp theo'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
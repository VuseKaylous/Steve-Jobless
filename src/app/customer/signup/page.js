'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';



export default function BusinessRegistration() {
  const router = useRouter();
  // ... giữ nguyên các state khác ...
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    birthdate: '',
    password: '',
    country: 'Việt Nam',
    countryCode: '+84'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ... giữ nguyên các handlers khác ...
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneCodeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      countryCode: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone_number ||
      !formData.birthdate || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{2,4})$/;
    if (!dateRegex.test(formData.birthdate)) {
      setError('Ngày sinh không đúng định dạng (dd/mm/yyyy)');
      return false;
    }

    return true;
  };

  // Cập nhật hàm handleSubmit với xử lý lỗi chi tiết hơn
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const fullPhoneNumber = `${formData.countryCode}${formData.phone_number.replace(/^0+/, '')}`;

      const [day, month, year] = formData.birthdate.split('/');
      const formattedDate = `20${year}-${month}-${day}`;

      const requestData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        birthdate: formattedDate,
        phone_number: fullPhoneNumber
      };

      console.log('Sending data:', requestData); // Log request data

      const response = await fetch('/api(customer)/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Log raw response for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is empty
      const responseText = await response.text();
      console.log('Response text:', responseText);

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

      // Success case
      console.log('Registration successful:', data);
      router.push('/customer/emailverify')

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
      ;
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
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <div className="badge bg-success rounded-circle p-3 text-white">1</div>
                    <span className="ms-2 text-success fw-medium">Thông tin cá nhân</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="badge bg-secondary rounded-circle p-3 text-white">3</div>
                    <span className="ms-2 text-muted">Xác minh email</span>
                  </div>
                </div>
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
                        <small className="text-muted">Chúng tôi sẽ xác minh thông tin này ở bước cuối cùng.</small>
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
                          placeholder="dd/mm/yy"
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
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100"
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
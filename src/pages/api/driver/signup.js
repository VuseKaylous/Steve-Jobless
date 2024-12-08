import { executeQuery } from '@/lib/db';

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Destructure request body
      const { 
        name, 
        email, 
        password, 
        birthdate, 
        phone_number, 
        driver_license_id, 
        vehicle_registration 
      } = req.body;

      // Validate input fields
      if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Invalid name' });
      }

      // Email validation
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Password validation
      if (!password || password.length < 8) {
        return res.status(400).json({ 
          error: 'Password must be at least 8 characters long' 
        });
      }

      // Birthdate validation (basic check)
      if (!birthdate || isNaN(Date.parse(birthdate))) {
        return res.status(400).json({ error: 'Invalid birthdate' });
      }

      // Phone number validation (basic check)
      if (!phone_number || !/^\+?[\d\s-]{10,}$/.test(phone_number)) {
        return res.status(400).json({ error: 'Invalid phone number' });
      }

      // Driver license validation
      if (!driver_license_id) {
        return res.status(400).json({ error: 'Driver license ID is required' });
      }

      // Vehicle registration validation
      if (!vehicle_registration) {
        return res.status(400).json({ error: 'Vehicle registration is required' });
      }

      // Check if email already exists
      const checkEmail = await executeQuery(
        'SELECT id FROM drivers WHERE email = ?',
        [email]
      );

      if (checkEmail.length > 0) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Insert new driver
      const result = await executeQuery(
        `INSERT INTO drivers 
        (name, email, password, birthdate, phone_number, driver_license_id, vehicle_registration) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          name, 
          email, 
          password, 
          birthdate, 
          phone_number, 
          driver_license_id, 
          vehicle_registration
        ]
      );

      // Return driver information (excluding sensitive data)
      return res.status(201).json({
        id: result.insertId,
        name,
        email,
        birthdate,
        phone_number
      });

    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ 
        error: 'An error occurred during registration',
        details: error.message 
      });
    }
  } else {
    // Handle non-POST methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
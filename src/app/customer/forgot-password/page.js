'use client';

import './tailwind.css';
import { useState } from 'react';

export default function BusinessRegistration() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-left" style={{ backgroundImage: 'url(/image2.png)' }}>

      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Forgot password?</h2>
          <p className="text-gray-600 mb-4">Submit your email and we'll send you a password reset link.</p>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg mb-4">Submit</button>
          <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Back to Login</button>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-500">Help Centre</a>
          </div>
        </div>
      </div>
    </div>
  );
}


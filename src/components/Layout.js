import React from 'react';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div>
      <header>
        <nav>
          <button onClick={() => handleNavigate('/customer')}>Customer</button>
          <button onClick={() => handleNavigate('/driver')}>Driver</button>
          <button onClick={() => handleNavigate('/admin')}>Admin</button>
        </nav>
      </header>
      <main>{children}</main>
      <footer>© 2024 Your App</footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import { useAuth } from '../context/authContext';

const Admin = () => {
  const { user, signOut } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={signOut} style={{ marginTop: '1rem' }}>
        Sign Out
      </button>
    </div>
  );
};

export default Admin;


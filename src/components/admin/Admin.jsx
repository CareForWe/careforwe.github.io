import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import styles from './Admin.module.css';
import cfwLogo from '../../assets/cfw_index.png';
import { ListingsView } from './Listings';
import { ModulesView } from './Modules';

const Admin = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <img src={cfwLogo} alt="CareForWe" className={styles.logo} />
        </div>
        <ul className={styles.navList}>
          <li>
            <span
              className={`${styles.navItem} ${activeTab === 'listings' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              <svg className={styles.navIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="1" y="2" width="14" height="3" rx="1" />
                <rect x="1" y="7" width="14" height="3" rx="1" />
                <rect x="1" y="12" width="14" height="3" rx="1" />
              </svg>
              Listings
            </span>
          </li>
          <li>
            <span
              className={`${styles.navItem} ${activeTab === 'modules' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('modules')}
            >
              <svg className={styles.navIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />
              </svg>
              Modules
            </span>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', padding: '1rem 1.25rem' }}>
          <button
            onClick={signOut}
            className={styles.navItem}
            style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', color: '#868e96', fontSize: '0.875rem' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.mainContent}>
        {activeTab === 'listings' ? <ListingsView /> : <ModulesView />}
      </main>
    </div>
  );
};

export default Admin;

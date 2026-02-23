import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext';
import styles from './Admin.module.css';
import cfwLogo from '../../assets/cfw_index.png';

const LISTINGS = [
  { id: 1, index: '1.1', name: 'Pain', moduleGroup: 'Medical Essentials for Caregivers', status: 'Published', category: 'Symptom Management' },
  { id: 2, index: '1.2', name: 'Breathlessness', moduleGroup: 'Medical Essentials for Caregivers', status: 'Published', category: 'Symptom Management' },
  { id: 3, index: '1.3', name: 'Nausea and Vomiting', moduleGroup: 'Medical Essentials for Caregivers', status: 'Draft', category: 'Symptom Management' },
  { id: 4, index: '1.4', name: 'Constipation', moduleGroup: 'Medical Essentials for Caregivers', status: 'Draft', category: 'Symptom Management' },
  { id: 5, index: '1.5', name: 'Diarrhoea', moduleGroup: 'Medical Essentials for Caregivers', status: 'Draft', category: 'Symptom Management' },
  { id: 6, index: '1.6', name: 'Abdominal Bloating', moduleGroup: 'Medical Essentials for Caregivers', status: 'Draft', category: 'Symptom Management' },
  { id: 7, index: '1.7', name: 'Limb Swelling', moduleGroup: 'Medical Essentials for Caregivers', status: 'Archived', category: 'Symptom Management' },
  { id: 8, index: '1.8', name: 'Confusion', moduleGroup: 'Medical Essentials for Caregivers', status: 'Published', category: 'Symptom Management' },
  { id: 9, index: '1.9', name: 'Seizures', moduleGroup: 'Medical Essentials for Caregivers', status: 'Draft', category: 'Symptom Management' },
];

const PSEUDO_MODULES = [
  { id: 1, number: '1.0', name: 'Medical Essentials for Caregivers' },
];

function StatusBadge({ status }) {
  const classMap = {
    Published: styles.badgePublished,
    Draft: styles.badgeDraft,
    Archived: styles.badgeArchived,
  };
  return (
    <span className={`${styles.badge} ${classMap[status] ?? styles.badgeDraft}`}>
      {status === 'Published' && <span style={{ marginRight: '4px' }}>●</span>}
      {status}
    </span>
  );
}

function ActionMenu({ item, actions }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleAction = (action) => {
    setOpen(false);
    console.log(`${action} on:`, item.name);
  };

  return (
    <div className={styles.actionCell} ref={ref}>
      <button
        className={styles.actionButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Actions"
      >
        ···
      </button>
      {open && (
        <div className={styles.dropdown}>
          {actions.map((action) => (
            <button
              key={action}
              className={`${styles.dropdownItem} ${action === 'Delete' ? styles.dropdownItemDelete : ''}`}
              onClick={() => handleAction(action)}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Listings view ----------
function ListingsView() {
  const handleCreateListing = () => {
    console.log('Create Listing clicked');
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your Listings</h1>
        <button className={styles.createButton} onClick={handleCreateListing}>
          Create Listing
        </button>
      </div>

      <p className={styles.entryMeta}>
        Showing 1 to {LISTINGS.length} of {LISTINGS.length} entries
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Module</th>
              <th>Status</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {LISTINGS.map((listing) => (
              <tr key={listing.id}>
                <td>
                  <div className={styles.moduleCell}>
                    <span className={styles.moduleName}>{listing.name}</span>
                    <span className={styles.indexBadge}>{listing.index}</span>
                  </div>
                </td>
                <td>
                  <StatusBadge status={listing.status} />
                </td>
                <td>
                  <span className={styles.categoryBadge}>{listing.category}</span>
                </td>
                <td>
                  <ActionMenu item={listing} actions={['Edit', 'Preview', 'Publish', 'Delete']} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ---------- Create Module form ----------
function CreateModuleForm({ onCancel }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // Placeholder — ready for: supabase.from('modules').insert({ number, name, is_universal: true })
    console.log('Save Module:', { number, name, is_universal: true });
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Create Module</h1>
      </div>

      <form className={styles.formCard} onSubmit={handleSave}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="moduleNumber">
            Module Number
          </label>
          <input
            id="moduleNumber"
            className={styles.formInput}
            type="text"
            placeholder="e.g. 1.0"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="moduleName">
            Module Name
          </label>
          <input
            id="moduleName"
            className={styles.formInput}
            type="text"
            placeholder="e.g. Medical Essentials for Caregivers"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Save Module
          </button>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

// ---------- Modules list view ----------
function ModulesView() {
  const [showCreate, setShowCreate] = useState(false);

  if (showCreate) {
    return <CreateModuleForm onCancel={() => setShowCreate(false)} />;
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Modules</h1>
        <button className={styles.createButton} onClick={() => setShowCreate(true)}>
          Create Module
        </button>
      </div>

      <p className={styles.entryMeta}>
        Showing 1 to {PSEUDO_MODULES.length} of {PSEUDO_MODULES.length} entries
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {PSEUDO_MODULES.map((mod) => (
              <tr key={mod.id}>
                <td>
                  <span className={styles.numberBadge}>{mod.number}</span>
                </td>
                <td>
                  <span className={styles.moduleName}>{mod.name}</span>
                </td>
                <td>
                  <ActionMenu item={mod} actions={['Edit', 'Delete']} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ---------- Root Admin component ----------
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

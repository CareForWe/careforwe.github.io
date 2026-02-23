import React, { useState, useEffect, useRef } from 'react';
import styles from './Admin.module.css';

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

export function ListingsView() {
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

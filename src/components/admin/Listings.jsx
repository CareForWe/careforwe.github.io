import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'radix-ui';
import styles from './Admin.module.css';
import { supabase } from '../../supabaseClient';

const ListingStatus = Object.freeze({
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
});

function StatusBadge({ status }) {
  const classMap = {
    [ListingStatus.PUBLISHED]: styles.badgePublished,
    [ListingStatus.DRAFT]: styles.badgeDraft,
    [ListingStatus.ARCHIVED]: styles.badgeArchived,
  };
  return (
    <span className={`${styles.badge} ${classMap[status] ?? styles.badgeDraft}`}>
      {status === ListingStatus.PUBLISHED && <span style={{ marginRight: '4px' }}>●</span>}
      {status}
    </span>
  );
}

function ActionMenu({ item, onDelete }) {
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
          <button
            className={`${styles.dropdownItem} ${styles.dropdownItemDelete}`}
            onClick={() => { setOpen(false); onDelete(item); }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function DeleteConfirmModal({ listingTitle, onConfirm, onCancel }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <h2 className={styles.modalTitle}>Delete Listing</h2>
        <p className={styles.modalBody}>
          Are you sure you want to delete <strong>{listingTitle}</strong>? This action cannot be undone.
        </p>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateListingModal({ onCancel, onSaved }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(ListingStatus.DRAFT);
  const [moduleId, setModuleId] = useState('');
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchModules() {
      const { data, error } = await supabase
        .from('modules')
        .select('id, number, name')
        .order('number', { ascending: true });
      if (!error) {
        setModules(data ?? []);
        if (data && data.length > 0) setModuleId(data[0].id);
      }
      setLoadingModules(false);
    }
    fetchModules();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from('module_entries')
      .insert({ title, content, category, status, module_id: moduleId, created_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      console.error('Error saving listing:', error.message);
      return;
    }
    onSaved();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard} style={{ maxWidth: '520px', width: '90%' }}>
        <h2 className={styles.modalTitle}>Create Listing</h2>

        <Form.Root onSubmit={handleSave}>
          <Form.Field className={styles.formGroup} name="title">
            <div className={styles.fieldHeader}>
              <Form.Label className={styles.formLabel}>Title</Form.Label>
              <Form.Message className={styles.formError} match="valueMissing">
                Please enter a title
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className={styles.formInput}
                type="text"
                placeholder="e.g. Pain Management"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className={styles.formGroup} name="content">
            <div className={styles.fieldHeader}>
              <Form.Label className={styles.formLabel}>Content</Form.Label>
              <Form.Message className={styles.formError} match="valueMissing">
                Please enter content
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className={styles.formInput}
                placeholder="Entry content…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className={styles.formGroup} name="category">
            <div className={styles.fieldHeader}>
              <Form.Label className={styles.formLabel}>Category</Form.Label>
              <Form.Message className={styles.formError} match="valueMissing">
                Please enter a category
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className={styles.formInput}
                type="text"
                placeholder="e.g. Symptom Management"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className={styles.formGroup} name="status">
            <div className={styles.fieldHeader}>
              <Form.Label className={styles.formLabel}>Status</Form.Label>
            </div>
            <Form.Control asChild>
              <select
                className={styles.formInput}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                {Object.values(ListingStatus).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Form.Control>
          </Form.Field>

          <Form.Field className={styles.formGroup} name="module">
            <div className={styles.fieldHeader}>
              <Form.Label className={styles.formLabel}>Module</Form.Label>
              <Form.Message className={styles.formError} match="valueMissing">
                Please select a module
              </Form.Message>
            </div>
            <Form.Control asChild>
              <select
                className={styles.formInput}
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                required
                disabled={loadingModules}
              >
                {loadingModules && <option value="">Loading modules…</option>}
                {modules.map((mod) => (
                  <option key={mod.id} value={mod.id}>
                    {mod.number} — {mod.name}
                  </option>
                ))}
              </select>
            </Form.Control>
          </Form.Field>

          <div className={styles.modalActions} style={{ marginTop: '1.5rem' }}>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <Form.Submit asChild>
              <button className={styles.createButton} disabled={saving}>
                {saving ? 'Saving…' : 'Save Listing'}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
}

export function ListingsView() {
  const [showCreate, setShowCreate] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('module_entries')
      .select('id, title, content, category, status, module_id, modules(name, number), created_at')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching listings:', error.message);
      setFetchError(error.message);
    } else {
      setListings(data ?? []);
    }
    setLoading(false);
  }

  async function handleConfirmDelete() {
    const { error } = await supabase.from('module_entries').delete().eq('id', pendingDelete.id);
    if (!error) {
      setListings((prev) => prev.filter((l) => l.id !== pendingDelete.id));
    }
    setPendingDelete(null);
  }

  return (
    <>
      {showCreate && (
        <CreateListingModal
          onCancel={() => setShowCreate(false)}
          onSaved={() => { setShowCreate(false); fetchListings(); }}
        />
      )}

      {pendingDelete && (
        <DeleteConfirmModal
          listingTitle={pendingDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your Listings</h1>
        <button className={styles.createButton} onClick={() => setShowCreate(true)}>
          Create Listing
        </button>
      </div>

      <p className={styles.entryMeta}>
        {loading ? 'Loading…' : `Showing 1 to ${listings.length} of ${listings.length} entries`}
      </p>

      {fetchError && (
        <p className={styles.fetchError}>Failed to load listings: {fetchError}</p>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && listings.map((listing) => (
              <tr key={listing.id}>
                <td>
                  <div className={styles.moduleCell}>
                    <span className={styles.moduleName}>{listing.title}</span>
                    {listing.modules && (
                      <span className={styles.indexBadge}>
                        {listing.modules.number} — {listing.modules.name}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <StatusBadge status={listing.status} />
                </td>
                <td>
                  <span className={styles.categoryBadge}>{listing.category}</span>
                </td>
                <td>
                  <ActionMenu item={listing} onDelete={setPendingDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Form, Separator } from 'radix-ui';
import styles from './Admin.module.css';
import { supabase } from '../../supabaseClient';
import { Pagination, PAGE_SIZE } from './Pagination';

function DeleteConfirmModal({ moduleName, onConfirm, onCancel }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <h2 className={styles.modalTitle}>Delete Module</h2>
        <p className={styles.modalBody}>
          Are you sure you want to delete <strong>{moduleName}</strong>? This action cannot be undone.
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

function CreateModuleForm({ onCancel, onSaved }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('modules')
      .insert({ number, name, is_universal: true, created_at: new Date().toISOString() })
      .select();
    if (error) {
      console.error('Error saving module:', error.message);
      return;
    }
    console.log('Module inserted:', data?.[0]);
    onSaved();
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Create Module</h1>
      </div>

      <Separator.Root className={styles.separator} />

      <Form.Root className={styles.formCard} onSubmit={handleSave}>
        <Form.Field className={styles.formGroup} name="moduleNumber">
          <div className={styles.fieldHeader}>
            <Form.Label className={styles.formLabel}>Module Number</Form.Label>
            <Form.Message className={styles.formError} match="valueMissing">
              Please enter a module number
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. 1.0"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.formGroup} name="moduleName">
          <div className={styles.fieldHeader}>
            <Form.Label className={styles.formLabel}>Module Name</Form.Label>
            <Form.Message className={styles.formError} match="valueMissing">
              Please enter a module name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Medical Essentials for Caregivers"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>

        <div className={styles.formActions}>
          <Form.Submit asChild>
            <button className={styles.createButton}>Save Module</button>
          </Form.Submit>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form.Root>
    </>
  );
}

export function ModulesView() {
  const [showCreate, setShowCreate] = useState(false);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchModules();
  }, []);

  async function fetchModules() {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('modules')
      .select('id, number, name')
      .order('number', { ascending: true });
    if (error) {
      console.error('Error fetching modules:', error.message);
      setFetchError(error.message);
    } else {
      setModules(data ?? []);
      setPage(1);
    }
    setLoading(false);
  }

  async function handleConfirmDelete() {
    const { error } = await supabase.from('modules').delete().eq('id', pendingDelete.id);
    if (!error) {
      setModules((prev) => prev.filter((m) => m.id !== pendingDelete.id));
    }
    setPendingDelete(null);
  }

  const totalPages = Math.max(1, Math.ceil(modules.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageEnd = Math.min(page * PAGE_SIZE, modules.length);
  const pagedModules = modules.slice(pageStart, pageEnd);

  if (showCreate) {
    return (
      <CreateModuleForm
        onCancel={() => setShowCreate(false)}
        onSaved={() => { setShowCreate(false); fetchModules(); }}
      />
    );
  }

  return (
    <>
      {pendingDelete && (
        <DeleteConfirmModal
          moduleName={pendingDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Modules</h1>
        <button className={styles.createButton} onClick={() => setShowCreate(true)}>
          Create Module
        </button>
      </div>

      <p className={styles.entryMeta}>
        {loading
          ? 'Loading…'
          : modules.length === 0
          ? 'No entries found'
          : `Showing ${pageStart + 1} to ${pageEnd} of ${modules.length} entries`}
      </p>
      {fetchError && (
        <p className={styles.fetchError}>Failed to load modules: {fetchError}</p>
      )}

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
            {!loading && pagedModules.map((mod) => (
              <tr key={mod.id}>
                <td>
                  <span className={styles.numberBadge}>{mod.number}</span>
                </td>
                <td>
                  <span className={styles.moduleName}>{mod.name}</span>
                </td>
                <td>
                  <ActionMenu item={mod} onDelete={setPendingDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}

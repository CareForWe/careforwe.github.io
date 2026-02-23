import React, { useState } from 'react';
import { Form, Separator } from 'radix-ui';
import styles from './Admin.module.css';
import { supabase } from '../../supabaseClient';

const PSEUDO_MODULES = [
  { id: 1, number: '1.0', name: 'Medical Essentials for Caregivers' },
];

function ActionMenu({ item, actions }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
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

function CreateModuleForm({ onCancel }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('modules').insert({ number, name, is_universal: true });
    if (error) {
      console.error('Error saving module:', error);
      return;
    }
    console.log('Save Module:', { number, name, is_universal: true });
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

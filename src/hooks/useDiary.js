import { useEffect, useState, useMemo } from 'react';
import { v4 } from 'uuid';

import { createDiary } from '../util/createDiary';
import storage from '../util/storage';

export const useDiary = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setEntries(storage.fetch());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) storage.persist(entries);
  }, [entries, loading]);

  const diary = useMemo(() => {
    const diaryEntries = Object.entries(createDiary(entries));
    return diaryEntries.sort(([a], [b]) => b.localeCompare(a));
  }, [entries]);

  const formEntry = editId
    ? entries.find(entry => entry.id === editId)
    : null;

  const addEntry = data => {
    setEntries(prev => {
      const newEntry = { ...data, id: v4() };
      return prev.concat([newEntry]);
    });
  };

  const editEntry = data => {
    const targetIndex = entries.findIndex(entry => entry.id === data.id);
    if (targetIndex >= 0) {
      setEntries(prev => {
        const newState = prev.slice();
        newState[targetIndex] = data;
        return newState;
      });
    }
  }

  const removeEntry = id => {
    if (id) setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return {
    diary,
    loading,
    addEntry,
    editEntry,
    removeEntry,
    setEditId,
    formEntry,
    formOpen,
    setFormOpen,
  };
};

import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchTasks({ query, status, page, pageSize })
      .then((data) => {
        if (active) {
          setTasks(data.items);
          setTotal(data.total);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
        }
      });

    return () => { active = false; };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}

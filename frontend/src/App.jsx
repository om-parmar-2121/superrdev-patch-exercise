import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { tasks, total, loading, error } = useTasks(query, status, page, 10);

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      {/* A. Application Header */}
      <header className="app-header" role="banner">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <div className="app-header__mark" aria-hidden="true" />
            <span className="app-header__title">Taskboard</span>
          </div>
        </div>
      </header>

      {/* B–F. Main Content */}
      <main className="page" role="main">
        {/* B. Page Heading */}
        <div className="page-heading">
          <h1 className="page-heading__title">Tasks</h1>
          <div className="page-heading__meta">
            <p className="page-heading__subtitle">Manage and track your team&rsquo;s work.</p>
            {total > 0 && (
              <span className="page-heading__count">{total} total</span>
            )}
          </div>
        </div>

        {/* C. Toolbar */}
        <div className="toolbar" role="search" aria-label="Filter tasks">
          <SearchBar value={query} onChange={(q) => { setQuery(q); setPage(1); }} />
          <StatusFilter value={status} onChange={(s) => { setStatus(s); setPage(1); }} />
        </div>

        {/* D. Task Table Card */}
        <div className="card">
          <div className="table-scroll">
            <TaskTable tasks={tasks} loading={loading} error={error} />
          </div>

          {/* E. Pagination — inside the card */}
          {totalPages > 1 && (
            <div className="pagination" aria-label="Pagination">
              <span className="pagination__info">
                Page {page} of {totalPages}
              </span>
              <div className="pagination__controls">
                <button
                  className="pagination__btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <span className="pagination__page">{page}</span>
                <button
                  className="pagination__btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

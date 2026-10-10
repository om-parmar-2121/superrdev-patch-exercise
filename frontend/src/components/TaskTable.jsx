export default function TaskTable({ tasks, loading, error }) {
  if (loading) {
    return (
      <div className="state-box">
        <div className="state-box__icon state-box__icon--loading">
          <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <p className="state-box__title">Loading tasks</p>
        <p className="state-box__message">Fetching your task list&hellip;</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-box">
        <div className="state-box__icon state-box__icon--error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <p className="state-box__title">Something went wrong</p>
        <p className="state-box__message state-box__message--error">{error}</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="state-box">
        <div className="state-box__icon state-box__icon--empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>
        <p className="state-box__title">No tasks found</p>
        <p className="state-box__message">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  const formatStatus = (s) => s.replace(/_/g, ' ');
  const formatPriority = (p) => p.charAt(0) + p.slice(1).toLowerCase();
  const priorityClass = (p) => {
    const key = p.toLowerCase();
    if (key === 'high') return 'priority-high';
    if (key === 'medium') return 'priority-medium';
    return 'priority-low';
  };

  return (
    <table className="task-table" role="table">
      <thead>
        <tr>
          <th className="col-id">ID</th>
          <th>Task</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assignee</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="col-id">{task.id}</td>
            <td className="col-details">
              <div className="task-name">{task.title}</div>
              {task.description && (
                <div className="task-description">{task.description}</div>
              )}
            </td>
            <td>
              <span className={`status-pill status-pill--${task.status.toLowerCase()}`}>
                {formatStatus(task.status)}
              </span>
            </td>
            <td className={`col-priority ${priorityClass(task.priority)}`}>
              {formatPriority(task.priority)}
            </td>
            <td className="col-assignee">{task.assignee || '\u2014'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

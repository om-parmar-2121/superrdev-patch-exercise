# Notes

### Changes and Verification
1. **Fixed SQL search precedence:** Added parentheses to the native query in `TaskRepository.java` (and `task_search_package.sql`). I verified this by restarting the Spring Boot server and running `curl` tests against `/api/tasks?status=IN_PROGRESS`, confirming it correctly isolates the requested status.
2. **Fixed pagination reset bug:** Updated `App.jsx` so `onChange` handlers for search and status call `setPage(1)`. Verified by confirming Vite rebuilt successfully (`npm run build`).
3. **Fixed search race condition:** Added an `active` cleanup flag in the `useTasks.js` `useEffect` hook. I statically verified this blocks stale responses from modifying `tasks`, `total`, `loading`, and `error` states. 

### Intentionally Left Unchanged
- I did not add backend sorting functionality. I prioritized high-impact data integrity bugs (SQL) and obvious UI failures (pagination, race conditions) over incomplete features like sorting, remaining within the patch scope.
- I preserved the existing backend architecture and did not migrate to a MERN/TypeScript stack, honoring the prompt instructions.

### Biggest Remaining Risk
The most critical remaining risk is the **in-memory pagination** inside `TaskController.java`. The backend pulls every matching task from the database into a `List<Task>` memory structure before computing `subList()`. As the dataset scales, this will inevitably lead to severe heap exhaustion and out-of-memory errors.

### Tools Used
I used the Antigravity AI assistant to navigate the codebase, parse the SQL defect, simulate backend latency constraints, issue terminal commands to restart Spring Boot, test the live API with `curl`, and generate the exact git patches.

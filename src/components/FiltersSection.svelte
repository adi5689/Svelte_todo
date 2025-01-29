<script>
  export let searchQuery;
  export let filterByStatus;
  export let sortBy;
  export let totalTasks;
  export let tasks;
  export let today;

  // Emit events to notify the parent of changes
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const handleSearchInput = (event) => {
    searchQuery = event.target.value.trim();
    dispatch("search", searchQuery); // Notify parent of search query change
  };

  const handleStatusChange = (event) => {
    filterByStatus = event.target.value;
    dispatch("filter", filterByStatus); // Notify parent of filter change
  };

  const handleSortChange = (event) => {
    sortBy = event.target.value;
    dispatch("sort", sortBy); // Notify parent of sort change
  };
</script>

<div class="filters-section">
  <h2 class="sub-title">Filters & Sorting</h2>

  <!-- 🔎 Search -->
  <div class="form-group">
    <label for="search">Search</label>
    <input
      type="text"
      id="search"
      bind:value={searchQuery}
      on:input={handleSearchInput}
      placeholder="Search tasks..."
    />
  </div>

  <!-- ✅ Status Filter -->
  <div class="form-group">
    <label for="status">Filter by Status</label>
    <select
      id="status"
      bind:value={filterByStatus}
      on:change={handleStatusChange}
    >
      <option value="all">All</option>
      <option value="done">Done</option>
      <option value="pending">Pending</option>
    </select>
  </div>

  <!-- 🔄 Sort By -->
  <div class="form-group">
    <label for="sort">Sort by</label>
    <select id="sort" bind:value={sortBy} on:change={handleSortChange}>
      <option value="createdAt">Creation Date</option>
      <option value="modifiedAt">Last Modified</option>
      <option value="title">Title</option>
    </select>
  </div>

  <!-- 📊 Summary -->
  <div class="summary-cards">
    <div class="task-count-card">
      <h3>Total Tasks</h3>
      <p>{totalTasks}</p>
    </div>

    <div class="tasks-done-card">
      <h3>Tasks Done Today</h3>
      <p>
        {(tasks || []).filter(
          (task) => task.createdAt.startsWith(today) && task.isMarkedDone
        ).length}
      </p>
    </div>
  </div>
</div>

<style>
  .filters-section {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 1.5rem;
  }

  .form-group label {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--text-color);
  }

  input,
  select {
    padding: 0.7rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
    color: var(--text-color);
    background-color: var(--card-bg);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23510dd7' d='M512 704L192 384h640z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
  }

  .summary-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: center;
  }

  .task-count-card,
  .tasks-done-card {
    flex: 1;
    padding: 1rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .task-count-card h3,
  .tasks-done-card h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--primary-color);
  }

  .task-count-card p,
  .tasks-done-card p {
    margin: 0.5rem 0 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
  }
</style>

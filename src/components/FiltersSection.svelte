<script>
  export let searchQuery;
  export let filterByStatus;
  export let sortBy;
  export let totalTasks;
  export let tasks;
  export let today;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const handleSearchInput = (event) => {
    searchQuery = event.target.value.trim();
    dispatch("search", searchQuery); 
  };

  const handleStatusChange = (event) => {
    filterByStatus = event.target.value;
    dispatch("filter", filterByStatus); 
  };

  const handleSortChange = (event) => {
    sortBy = event.target.value;
    dispatch("sort", sortBy); 
  };
</script>

<div class="filters-section">
  <h2 class="sub-title">Filters & Sorting</h2>

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

  <div class="form-group">
    <label for="sort">Sort by</label>
    <select id="sort" bind:value={sortBy} on:change={handleSortChange}>
      <option value="createdAt">Creation Date</option>
      <option value="modifiedAt">Last Modified</option>
      <option value="title">Title</option>
    </select>
  </div>

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
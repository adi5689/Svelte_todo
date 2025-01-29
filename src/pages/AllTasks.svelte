<script>
  import "../styles/allTasks.css";
  import { tasks } from "../stores/todos";
  import FiltersSection from "../components/FiltersSection.svelte";
  import TaskList from "../components/GroupedAllTasks.svelte";

  let today = new Date().toISOString().slice(0, 10);
  let expandedTaskId = null;
  let editingTaskId = null;
  let editTitle = "";
  let editDescription = "";

  let searchQuery = "";
  let sortBy = "createdAt";
  let filterByStatus = "all";

  $: totalTasks = $tasks.length;

  $: groupedTasks = $tasks.reduce((acc, task) => {
    const taskDate = new Date(task.createdAt)
      .toLocaleDateString("en-CA")
      .split("T")[0];
    if (!acc[taskDate]) acc[taskDate] = [];
    acc[taskDate].push(task);
    return acc;
  }, {});

  $: filteredGroupedTasks = Object.entries(groupedTasks)
    .map(([date, tasksForDate]) => ({
      date,
      tasks: tasksForDate
        .filter((task) => {
          const matchesSearch = task.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesStatus =
            filterByStatus === "all" ||
            (filterByStatus === "done" && task.isMarkedDone) ||
            (filterByStatus === "pending" && !task.isMarkedDone);
          return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
          if (sortBy === "createdAt") {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();

            if (isNaN(dateA) || isNaN(dateB)) return 0; // Prevent invalid sorting
            return dateB - dateA;
          }

          if (sortBy === "modifiedAt") {
            const dateA = new Date(a.modifiedAt).getTime();
            const dateB = new Date(b.modifiedAt).getTime();

            if (isNaN(dateA) || isNaN(dateB)) return 0;
            return dateB - dateA;
          }

          if (sortBy === "title") {
            return a.title.localeCompare(b.title);
          }

          return 0;
        }),
    }))
    .filter(({ tasks }) => tasks.length > 0)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (isNaN(dateA) || isNaN(dateB)) return 0;

      return dateB - dateA; // Sort descending
    });
</script>

<div class="container">
  <div class="content">
    <FiltersSection
      {searchQuery}
      {filterByStatus}
      {sortBy}
      {totalTasks}
      tasks={$tasks}
      {today}
      on:search={(e) => (searchQuery = e.detail)}
      on:filter={(e) => (filterByStatus = e.detail)}
      on:sort={(e) => (sortBy = e.detail)}
    />
    <TaskList
      {filteredGroupedTasks}
      {expandedTaskId}
      {editingTaskId}
      {editTitle}
      {editDescription}
    />
  </div>
</div>

<style>
  .container {
    margin: auto;
    padding: 2rem;
    background: var(--bg-color);
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  }

  .content {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .content {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>

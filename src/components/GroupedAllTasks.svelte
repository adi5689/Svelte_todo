<script>
    import TaskItem from "./TaskItem.svelte";
    export let filteredGroupedTasks;
    export let expandedTaskId;
    export let editingTaskId;
    export let editTitle;
    export let editDescription;
  </script>
  
  <div class="task-list-card">
    <h1 class="title">Tasks</h1>
  
    {#if filteredGroupedTasks.length > 0}
      {#each filteredGroupedTasks as { date, tasks }}
        <div class="date-group">
          <h3 class="date-header">
            {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </h3>
          <ul class="task-list">
            {#each tasks as task (task.id)}
              <TaskItem
                {task}
                {expandedTaskId}
                {editingTaskId}
                {editTitle}
                {editDescription}
              />
            {/each}
          </ul>
        </div>
      {/each}
    {:else}
      <div class="no-task">
        <p>No tasks found!</p>
      </div>
    {/if}
  </div>
  
  <style>
    .task-list-card {
      background: var(--card-bg);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      height: 75vh;
      overflow-y: scroll;
    }
  
    .task-list {
      list-style: none;
      padding: 0;
    }
  
    .no-task {
      padding: 1rem;
      text-align: center;
      font-size: 1rem;
      color: var(--primary-color);
    }
  
    .date-group {
      margin-bottom: 2rem;
    }
  
    .date-header {
      font-size: 1.2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--primary-color);
      padding-bottom: 0.5rem;
    }
  </style>
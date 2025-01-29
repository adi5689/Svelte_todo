<script>
    import TaskItem from "./TaskItem.svelte";
    export let todaysTasks;
    export let expandedTaskId;
    export let editingTaskId;
    export let editTitle;
    export let editDescription;
  </script>
  
  <div class="task-list-card">
    <h1 class="title">Today's Tasks</h1>
  
    {#if todaysTasks && todaysTasks.length > 0}
      <ul class="task-list">
        {#each todaysTasks as task (task.id)}
          <TaskItem
            {task}
            {expandedTaskId}
            {editingTaskId}
            {editTitle}
            {editDescription}
          />
        {/each}
      </ul>
    {:else}
      <div class="no-task">
        <p>No tasks for today!</p>
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
  </style>
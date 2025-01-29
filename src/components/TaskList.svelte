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
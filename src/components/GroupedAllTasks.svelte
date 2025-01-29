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
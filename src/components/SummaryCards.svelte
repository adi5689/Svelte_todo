<script>
    export let todaysTasks;
  </script>
  
  <div class="summary-cards">
    <div class="task-count-card">
      <h3>Total Tasks for Today</h3>
      <p>{todaysTasks.length}</p>
    </div>
  
    <div class="tasks-done-card">
      <h3>Tasks Done</h3>
      <p>
        {todaysTasks.filter((task) => task.isMarkedDone).length}
      </p>
    </div>
  </div>
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
  
  <style>
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
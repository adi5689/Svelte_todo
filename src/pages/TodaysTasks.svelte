<script>
  import "../styles/todaysTasks.css";
  import { tasks } from "../stores/todos";
  import TaskForm from "../components/TaskForm.svelte";
  import SummaryCards from "../components/SummaryCards.svelte";
  import TaskList from "../components/TaskList.svelte";

  let expandedTaskId = null;
  let editingTaskId = null;
  let editTitle = "";
  let editDescription = "";

  $: todaysTasks = $tasks.filter((task) => {
    const taskDate = new Date(task.createdAt).toLocaleDateString("en-CA");
    const todayLocal = new Date().toLocaleDateString("en-CA");
    return taskDate === todayLocal;
  });
</script>

<div class="container">
  <div class="content">
    <div>
      <TaskForm />
      <SummaryCards {todaysTasks} />
    </div>

    <TaskList
      {todaysTasks}
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

  @media (max-width: 480px) {
    .content {
      gap: 0.5rem;
    }
  }
</style>

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

<script>
  import { Router, Route } from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import TodaysTasks from "./pages/TodaysTasks.svelte";
  import AllTasks from "./pages/AllTasks.svelte";
</script>

<Router>
  <Navbar />
  <Route path="/" component={TodaysTasks} />
  <Route path="/all-tasks" component={AllTasks} />
</Router>

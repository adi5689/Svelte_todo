<script>
  import { addTask } from "../stores/todos";
  import { v4 as uuidv4 } from "uuid";

  let title = "";
  let description = "";
  let titleError = "";
  let descriptionError = "";
  let isFormValid = false;

  // Validation function
  const validateForm = () => {
    titleError = title.trim().length < 3 ? "Title must be at least 3 characters" : "";
    descriptionError = description.trim().length > 0 && description.trim().length < 5 
      ? "Description must be at least 5 characters" 
      : "";

    isFormValid = title.trim().length >= 3 && (description.trim().length === 0 || description.trim().length >= 5);
  };

  const handleAddTask = () => {
    validateForm();
    if (isFormValid) {
      addTask({
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        isMarkedDone: false,
      });

      // Resetting fields & clearing validation errors
      title = "";
      description = "";
      titleError = "";
      descriptionError = "";
      isFormValid = false;
    }
  };
</script>

<form on:submit|preventDefault={handleAddTask} class="form add-task-card">
  <h2 class="sub-title">Add Task</h2>

  <div class="form-group">
    <label for="title">Title</label>
    <input
      type="text"
      id="title"
      bind:value={title}
      on:input={validateForm}
      placeholder="Enter title"
      required
    />
    {#if titleError && title}
      <p class="error">{titleError}</p>
    {/if}
  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea
      id="description"
      bind:value={description}
      on:input={validateForm}
      placeholder="Enter description"
    ></textarea>
    {#if descriptionError && description}
      <p class="error">{descriptionError}</p>
    {/if}
  </div>

  <button type="submit" class="btn" disabled={!isFormValid}>Add Todo</button>
</form>
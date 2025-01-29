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

      // Reset fields & clear validation errors
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

  <!-- Title Input -->
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

  <!-- Description Input -->
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

  <!-- Submit Button -->
  <button type="submit" class="btn" disabled={!isFormValid}>Add Todo</button>
</form>

<style>
  .form {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .form-group label {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--text-color);
    margin-bottom: 5px;
  }

  input, textarea {
    padding: 0.7rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
  }

  /* Error Message */
  .error {
    color: red;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  /* Disabled Button */
  .btn {
    width: 100%;
    padding: 0.7rem;
    border: none;
    background: var(--primary-color);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  .btn:hover {
    background: #5a2bd8;
  }

  .btn:disabled {
    background: gray;
    cursor: not-allowed;
  }
</style>

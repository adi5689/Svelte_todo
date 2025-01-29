<script>
  import { slide } from "svelte/transition";
  import {
    toggleTaskCompletion,
    deleteTask,
    updateTask,
  } from "../stores/todos";

  export let task;
  export let expandedTaskId;
  export let editingTaskId;
  export let editTitle = "";
  export let editDescription = "";
  let noChangesMessage = "";

  const handleToggleCompletion = (id) => toggleTaskCompletion(id);
  const handleDelete = (id) => deleteTask(id);

  const toggleAccordion = (id) => {
    if (editingTaskId !== id) {
      expandedTaskId = expandedTaskId === id ? null : id;
    }
  };

  const startEditing = (task) => {
    if (editingTaskId === task.id) {
      editingTaskId = null;
    } else {
      editingTaskId = task.id;
      editTitle = task.title;
      editDescription = task.description;
      noChangesMessage = "";
    }
  };

  const saveEdit = (id) => {
    if (editTitle === task.title && editDescription === task.description) {
      noChangesMessage = "No changes made!";
      setTimeout(() => {
        noChangesMessage = "";
        editingTaskId = null;
      }, 1500);
      return;
    }

    updateTask(id, {
      title: editTitle,
      description: editDescription,
      modifiedAt: new Date().toISOString(),
    });

    editingTaskId = null;
    noChangesMessage = "";
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  $: isExpanded = expandedTaskId === task.id;
  $: isEditing = editingTaskId === task.id;
</script>

<li class="task">
  <div
    class="task-header"
    on:click={() => toggleAccordion(task.id)}
    on:keydown={(event) =>
      (event.key === "Enter" || event.key === " ") && toggleAccordion(task.id)}
    role="button"
    aria-expanded={isExpanded}
    tabindex="0"
  >
    <label class="checkbox-container">
      <div>
        <input
          type="checkbox"
          checked={task.isMarkedDone}
          on:click|stopPropagation={() => handleToggleCompletion(task.id)}
        />
        <span class="custom-checkbox"></span>
      </div>
      <div class="task-info">
        <span class={task.isMarkedDone ? "completed" : "uncomplete"}
          >{task.title}</span
        >
        <small class="task-date">Created: {formatDate(task.createdAt)}</small>
      </div>
    </label>

    <div class="buttons-action">
      <div class="task-actions">
        <button
          on:click|stopPropagation={() => startEditing(task)}
          type="button"
          aria-label="Edit task"
        >
          <span class="akar-icons--edit"></span>
        </button>
        <button
          on:click|stopPropagation={() => handleDelete(task.id)}
          type="button"
          aria-label="Delete task"
        >
          <span class="mdi-light--delete"></span>
        </button>
      </div>
      <div
        class="arrow-container {isExpanded ? 'rotate' : ''}"
        aria-hidden="true"
      >
        <span class="ep--arrow-down-bold"></span>
      </div>
    </div>
  </div>

  {#if isEditing}
    <div transition:slide class="edit-fields open">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" bind:value={editTitle} />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea bind:value={editDescription}></textarea>
      </div>

      <button class="btn" on:click={() => saveEdit(task.id)}>Save</button>
      {#if noChangesMessage}
        <p class="no-changes-msg">{noChangesMessage}</p>
      {/if}
    </div>
  {/if}

  {#if isExpanded}
    <div transition:slide class="task-details open">
      <p class="description">
        <strong>Description:</strong>
        {task.description || "No description"}
      </p>
      <small class="task-date"
        >Last Modified: {formatDate(task.modifiedAt)}</small
      >
    </div>
  {/if}
</li>
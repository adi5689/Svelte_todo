import { persisted } from 'svelte-local-storage-store';

// Create a writable store for tasks with localStorage persistence
export const tasks = persisted('tasks', []);

// Function to add a task
export function addTask(task) {
  tasks.update((existingTasks) => [
    ...existingTasks,
    { 
      ...task, 
      createdAt: new Date().toISOString(), 
      modifiedAt: new Date().toISOString(), 
      isMarkedDone: false 
    }
  ]);
}

// Function to update a task
export function updateTask(taskId, updatedTask) {
  tasks.update((existingTasks) =>
    existingTasks.map((task) =>
      task.id === taskId
        ? { ...task, ...updatedTask, modifiedAt: new Date().toISOString() }
        : task
    )
  );
}

// Function to delete a task
export function deleteTask(taskId) {
  tasks.update((existingTasks) =>
    existingTasks.filter((task) => task.id !== taskId)
  );
}

// Function to toggle task completion
export function toggleTaskCompletion(taskId) {
  tasks.update((existingTasks) =>
    existingTasks.map((task) =>
      task.id === taskId
        ? { ...task, isMarkedDone: !task.isMarkedDone }
        : task
    )
  );
}

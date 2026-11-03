const STORAGE_KEY = 'todo-app:v2';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lists: [], tasks: [] };

    const data = JSON.parse(raw);

    if (!data || !Array.isArray(data.lists) || !Array.isArray(data.tasks)) {
      console.warn('Повреждённая структура данных, стартуем с пустым состоянием');
      return { lists: [], tasks: [] };
    }

    const validLists = data.lists.filter(list =>
      list &&
      typeof list.id === 'string' &&
      typeof list.title === 'string'
    );

    const validTasks = data.tasks.filter(task =>
      task &&
      typeof task.id === 'string' &&
      typeof task.listId === 'string' &&
      typeof task.title === 'string' &&
      typeof task.done === 'boolean' &&
      Array.isArray(task.subtasks)
    );

    return { lists: validLists, tasks: validTasks };
  } catch (error) {
    console.warn('Не удалось прочитать сохранённые данные', error);
    return { lists: [], tasks: [] };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Не удалось сохранить данные', error);
  }
}

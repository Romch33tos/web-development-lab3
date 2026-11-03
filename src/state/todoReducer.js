export const initialState = {
  lists: [],
  tasks: [],
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'list/added':
      return {
        ...state,
        lists: [...state.lists, action.list],
      };

    case 'list/renamed':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.id ? { ...list, title: action.title } : list
        ),
      };

    case 'list/removed':
      return {
        lists: state.lists.filter((list) => list.id !== action.id),
        tasks: state.tasks.filter((task) => task.listId !== action.id),
      };

    case 'task/added':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };

    case 'task/toggled':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task
        ),
      };

    case 'task/updated':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, ...action.changes } : task
        ),
      };

    case 'task/removed':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };

    case 'tasks/cleared':
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.listId !== action.listId || !task.done
        ),
      };

    case 'subtask/added':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id !== action.taskId
            ? task
            : {
                ...task,
                subtasks: [...task.subtasks, action.subtask],
              }
        ),
      };

    case 'subtask/toggled':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id !== action.taskId
            ? task
            : {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === action.id
                    ? { ...subtask, done: !subtask.done }
                    : subtask
                ),
              }
        ),
      };

    case 'subtask/removed':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id !== action.taskId
            ? task
            : {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.id !== action.id
                ),
              }
        ),
      };

    default:
      throw new Error(`Неизвестное действие: ${action.type}`);
  }
}

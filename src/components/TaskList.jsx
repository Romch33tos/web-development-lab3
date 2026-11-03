import { TaskItem } from './TaskItem.jsx';

export function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

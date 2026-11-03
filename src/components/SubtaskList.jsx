import { SubtaskItem } from './SubtaskItem.jsx';

export function SubtaskList({ task }) {
  if (task.subtasks.length === 0) return null;

  return (
    <ul className="subtask-list">
      {task.subtasks.map((subtask) => (
        <SubtaskItem key={subtask.id} taskId={task.id} subtask={subtask} />
      ))}
    </ul>
  );
}

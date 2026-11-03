import { Link, useParams, useSearchParams } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';
import { TaskTitleField } from './TaskTitleField.jsx';
import { TaskDescriptionField } from './TaskDescriptionField.jsx';
import { SubtaskList } from './SubtaskList.jsx';
import { AddSubtaskForm } from './AddSubtaskForm.jsx';

export function TaskCard() {
  const { listId, taskId } = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useTodos();

  const task = state.tasks.find(
    (t) => t.id === taskId && t.listId === listId
  );

  const queryString = searchParams.toString();
  const backLink = `/lists/${listId}${queryString ? `?${queryString}` : ''}`;

  if (!task) {
    return (
      <section className="task-card">
        <h2>Задача не найдена</h2>
        <p>Возможно, она была удалена или перенесена.</p>
        <Link to={backLink}>Вернуться к списку</Link>
      </section>
    );
  }

  const done = task.subtasks.filter((s) => s.done).length;
  const total = task.subtasks.length;

  return (
    <section className="task-card" aria-labelledby="task-card-title">
      <h2 id="task-card-title" className="visually-hidden">
        Карточка задачи
      </h2>
      <TaskTitleField task={task} />
      <TaskDescriptionField task={task} />

      <h3 className="task-card__subtitle">Подзадачи</h3>
      {total > 0 && (
        <p className="task-card__progress">
          <progress value={done} max={total} />
          Выполнено {done} из {total}
        </p>
      )}

      <SubtaskList task={task} />
      <AddSubtaskForm taskId={task.id} />

      <Link to={backLink} className="task-card__close">
        Закрыть карточку
      </Link>
    </section>
  );
}

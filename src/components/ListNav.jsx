import { NavLink } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function ListNav() {
  const { state } = useTodos();

  return (
    <nav className="list-nav">
      <h2 className="visually-hidden">Списки задач</h2>
      <ul className="list-nav__list">
        {state.lists.map((list) => {
          const activeCount = state.tasks.filter(
            (task) => task.listId === list.id && !task.done
          ).length;

          return (
            <li key={list.id} className="list-nav__item">
              <NavLink
                to={`/lists/${list.id}`}
                className={({ isActive }) =>
                  isActive ? 'list-nav__link list-nav__link--active' : 'list-nav__link'
                }
              >
                <span className="list-nav__name">{list.title}</span>
                <span className="list-nav__count">{activeCount}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

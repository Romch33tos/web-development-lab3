import { ListNav } from './ListNav.jsx';
import { AddListForm } from './AddListForm.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">Менеджер задач</h1>
      <AddListForm />
      <ListNav />
      <ThemeToggle />
    </aside>
  );
}

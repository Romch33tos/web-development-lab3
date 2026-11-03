import { createHashRouter, useParams } from 'react-router';
import { Layout } from './components/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ListPage } from './pages/ListPage.jsx';
import { TaskCard } from './components/TaskCard.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function ListRoute() {
  const { listId } = useParams();
  return <ListPage key={listId} listId={listId} />;
}

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'lists/:listId',
        element: <ListRoute />,
        children: [
          { path: 'tasks/:taskId', element: <TaskCard /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

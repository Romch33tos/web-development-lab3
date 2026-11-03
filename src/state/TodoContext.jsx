import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { todoReducer, initialState } from './todoReducer.js';
import { loadState, saveState } from './storage.js';

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos вызван вне TodoProvider');
  }
  return context;
}

import { render, screen } from '@testing-library/react';
import TaskList from './taskList';


test('renders task list', () => {
  render(<TaskList data={[]}/>);
  expect(screen.getByText('My To-Do list')).toBeInTheDocument();
});
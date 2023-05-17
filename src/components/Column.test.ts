// import { render } from '@testing-library/react';
// import Column from './Column';

// // Mock TaskCard component
// jest.mock('./TaskCard', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="mock-task-card" />),
// }));

// describe('Column component', () => {
//   test('renders title correctly', () => {
//     const title = 'Test Title';
//     const tasks = [];

//     const { getByText } = render(<Column title={title} tasks={tasks} />);
//     const titleElement = getByText(title.toUpperCase());

//     expect (titleElement).toBeInTheDocument();
//   });

//   test('renders TaskCard components for each task', () => {
//     const title = 'Test Title';
//     const tasks = [
//       { id: 1, name: 'Task 1' },
//       { id: 2, name: 'Task 2' },
//       { id: 3, name: 'Task 3' },
//     ];

//     const { getAllByTestId } = render(<Column title={title} tasks={tasks} />);
//     const taskCards = getAllByTestId('mock-task-card');

//     expect(taskCards.length).toBe(tasks.length);
//   });

//   // Add more test cases as needed
// });

export interface Task {
    id: string;
    title: string;
    status: 'todo' | 'inprogress' | 'done';
}  
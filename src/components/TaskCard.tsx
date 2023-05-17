import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types';
import { Card, CardContent, Typography } from '@mui/material';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided:any) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent>
          <Typography variant="h6">{`KNBN-${task.id}`}</Typography>
            <Typography variant="h6">{task.title}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;

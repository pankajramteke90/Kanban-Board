import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../types";
import TaskCard from "./TaskCard";
import { Box } from "@mui/material";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column: FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <Box width="300px" mr={2}>
      <Typography variant="h5" gutterBottom>
        {title?.toLocaleUpperCase()}
      </Typography>
      <Droppable droppableId={title}>
        {(provided: any) => (
          <Paper {...provided.droppableProps} ref={provided.innerRef}>
            <Box p={2}>
              {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          </Paper>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;

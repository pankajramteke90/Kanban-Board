import { Box, Container, Grid, LinearProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../redux/kanbanSlice";
import { Task } from "../types";

import Column from "./Column";
// import { DropResult } from "react-beautiful-dnd";

const KanbanBoard: FC = () => {
  const tasks = useSelector((state: any) => state.kanban.tasks);
  const loading = useSelector((state: any) => state.kanban.loading);
  const error = useSelector((state: any) => state.kanban.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const task = tasks.find((t: Task) => t.id === draggableId);
    if (!task) {
      return;
    }
    const newTask: Task = {
      ...task,
      status: destination.droppableId as "todo" | "inprogress" | "done",
    };
    dispatch(updateTask(newTask) as any);
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // <DragDropContext onDragEnd={handleDragEnd}>
    //   <Box display="flex" justifyContent="center">
    //     <Column
    //       tasks={tasks.filter((t: Task) => t.status === "todo")}
    //       title="todo"
    //     />
    //     <Column
    //       tasks={tasks.filter((t: Task) => t.status === "inprogress")}
    //       title="inprogress"
    //     />
    //     <Column
    //       tasks={tasks.filter((t: Task) => t.status === "done")}
    //       title="done"
    //     />
    //   </Box>
    // </DragDropContext>
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Column
            tasks={tasks.filter((t: Task) => t.status === "todo")}
            title="todo"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Column
            tasks={tasks.filter((t: Task) => t.status === "inprogress")}
            title="inprogress"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Column
            tasks={tasks.filter((t: Task) => t.status === "done")}
            title="done"
          />
        </Grid>
      </Grid>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;

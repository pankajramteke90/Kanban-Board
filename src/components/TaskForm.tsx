import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Task } from "../types";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { addTask } from "../redux/kanbanSlice";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "todo",
    };
    dispatch(addTask(newTask) as any);
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;

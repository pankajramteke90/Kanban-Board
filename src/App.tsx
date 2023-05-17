import { FC, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import TaskForm from "./components/TaskForm";
import { Provider } from "react-redux";
import store from "./redux/store"
const App: FC = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  return (
    <div style={{backgroundColor:"gray",height:"100vh",width:"100vw"}}>
    <Provider  store={store}>
      <button onClick={() => setIsTaskFormOpen(true)}>Add Task</button>
      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
      />
      <KanbanBoard />
    </Provider>
    </div>
  );
};


export default App;

// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import KanbanBoard from './components/KanbanBoard';
// import { Container } from '@material-ui/core';

// function App() {
//   return (
//     <BrowserRouter>
//       <Container maxWidth="md">
//         <Switch>
//           <Route path="/" component={KanbanBoard} />
//         </Switch>
//       </Container>
//     </BrowserRouter>
//   );
// }

// export default App;

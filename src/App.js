import {Component} from 'react';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';



const initialTasksList=[
  {
    id: uuidv4(),
    title:"Learn React",
    description:"I have to learn react js.",
    priority:"HIGH",
    dueDate:"2024-05-18",
    status:"In Progress",
    isChecked:false,
  },
  {
    id: uuidv4(),
    title:"Learn Node",
    description:"I have to learn Node js.",
    priority:"MEDIUM",
    dueDate:"2024-05-15",
    status:"In Progress",
    isChecked:false,
  },
  {
    id: uuidv4(),
    title:"Learn css",
    description:"I have to learn css.",
    priority:"LOW",
    dueDate:"2024-05-10",
    status:"In Progress",
    isChecked:false,
  },
]



class App extends Component{
  state={tasksList:initialTasksList}

  onAddButton=(newTask)=>{
    const {tasksList}=this.state;
    const addingTask={
      id: uuidv4(),
      title:newTask.title,
      description:newTask.description,
      priority:newTask.priority,
      dueDate:newTask.dueDate,
      status:"In Progress",
      isChecked:false,
    }
    this.setState({tasksList:[...tasksList,addingTask]})
  }



  changeTaskStatus=(newTasksList)=>{
    this.setState({tasksList:[...newTasksList]})
  }

  onClickDelete=(id)=>{
    const {tasksList}=this.state;
    const deletedTasksList=tasksList.filter(each=>each.id!==id);
    this.setState({tasksList:deletedTasksList});
  }

  onEditTask=(editedTasksList)=>{
    
    this.setState({tasksList:[...editedTasksList]})
  }

  render(){
    const {tasksList}=this.state;
    localStorage.setItem('myList', JSON.stringify(tasksList));
    
    return (
      <div className='app'>
        <div className="task-app">
          <h1 className='main-heading'>My Tasks</h1>
          <TaskForm onAddButton={this.onAddButton} />
          <TaskList tasksList={tasksList} 
          changeTaskStatus={this.changeTaskStatus} 
          onClickDelete={this.onClickDelete}
          onEditTask={this.onEditTask}
          />
        </div>
      </div>
    );
  }
}

export default App;

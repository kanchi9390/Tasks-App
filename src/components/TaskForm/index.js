import {Component} from 'react';
import { format } from 'date-fns';
import './index.css';


const taskPriorityOptions = [
     {
       optionId: 'HIGH',
       displayText: 'High',
     },
     {
       optionId: 'MEDIUM',
       displayText: 'Medium',
     },
     {
          optionId: 'LOW',
          displayText: 'Low',
     },
   ]

class TaskForm extends Component{
     state={title:"",description:"",priority:taskPriorityOptions[0].optionId,dueDate:format(new Date(), 'yyyy-MM-dd')}
     
     onChangeTitle=(event)=>{
          this.setState({title:event.target.value});
     }
     onChangeDescription=(event)=>{
          this.setState({description:event.target.value});
     }
     onChangePriority=(event)=>{
          this.setState({priority:event.target.value});
     }
     onChangeDuedate=(event)=>{
          this.setState({dueDate:event.target.value});
     }

     addButton=()=>{
          const {title,description,priority,dueDate}=this.state;
          const newTask={
               title,
               description,
               priority,
               dueDate
          }
          this.setState({title:"",
          description:"",
          priority:taskPriorityOptions[0].optionId,
          dueDate:format(new Date(), 'yyyy-MM-dd')},
          this.props.onAddButton(newTask));
     }

     render(){
          const {title,description,priority,dueDate}=this.state;
          return(
               /*<form className='task-form'>
                    <h2 className='create-task'>Create Task</h2>
                    <label forHtml="title" className='labels'>Title</label>
                    <input type="text" id="title"/>
               </form>*/
               <div className='task-create-container'>
                    <form className="task-form">
                         <h1 className="create-task-heading ">Create Task</h1>
                         <label htmlFor="TITLE" className="labels">
                         TITLE
                         </label>
                         <input
                              type="text"
                              id="TITLE"
                              placeholder="TITLE"
                              className="input-box"
                              value={title}
                              onChange={this.onChangeTitle}
                         />
                         <label htmlFor="DESCRIPTION" className="labels">
                              DESCRIPTION
                         </label>
                         <input
                              type="text"
                              id="DESCRIPTION"
                              className="input-box"
                              placeholder="DESCRIPTION"
                              value={description}
                              onChange={this.onChangeDescription}
                         />
                         <label htmlFor="PRIORITY" className="labels">
                              PRIORITY
                         </label>
                         <select
                              id="PRIORITY"
                              className="priority-input-box"
                              value={priority}
                              onChange={this.onChangePriority}
                         >
                              {taskPriorityOptions.map(eachType => (
                              <option value={eachType.optionId} key={eachType.optionId}>
                                   {eachType.displayText}
                              </option>
                              ))}
                         </select>
                         <label htmlFor="DUE DATE" className="labels">
                              DUE DATE
                         </label>
                         <input
                              type="date"
                              id="DUE DATE"
                              className="input-box"
                              placeholder="DUE DATE"
                              value={dueDate}
                              onChange={this.onChangeDuedate}
                         />
                         <button
                              type="button"
                              className="add-btn"
                              onClick={this.addButton}
                         >
                              Add Task
                         </button>
                    </form>
                    <img 
                    src="https://www.actitime.com/wp-content/uploads/2020/12/How-to-Create-a-Project-Task-List.png" 
                    alt="task-create-img" className='task-create-img'
                    />
               </div>
          )
     }
}

export default TaskForm;
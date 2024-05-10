import Popup from 'reactjs-popup';
import { useState } from "react"
import 'reactjs-popup/dist/index.css';

import { MdOutlineDelete } from "react-icons/md";

import './index.css';

const editTaskPriorityOptions = [
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

const Task=(props)=>{
     const {eachTask,onChangeStatus,onClickDelete,onEditTask}=props;
     const {id,title,description,priority,dueDate,isChecked}=eachTask;
     
     const [editTitle, setTitle] = useState(title);

     const onChangeEditTitle=(event)=>setTitle(event.target.value);

     const [editDescription, setDescription] = useState(description);

     const onChangeEditDescription=(event)=>setDescription(event.target.value);

     const [editPriority, setPriority] = useState(priority);

     const onChangeEditPriority=(event)=>setPriority(event.target.value);

     const [editDueDate, setDueDate] = useState(dueDate);

     const onChangeEditDueDate=(event)=>setDueDate(event.target.value);

     const changeStatus=()=>(onChangeStatus(id));
     const onDelete=()=>(onClickDelete(id));
     const editTask=()=>{
          const {tasksList}=props;
          const editedTasksList=tasksList.map(each=>{
               if(each.id===id){
                    return{
                         id:each.id,
                         title:editTitle,
                         description:editDescription,
                         priority:editPriority,
                         dueDate:editDueDate,
                         status:each.status,
                         isChecked:each.isChecked,
                    }
               }
               return each
          });
          onEditTask(editedTasksList)
     }

     
     

     return(
          <li className='each-task'>
               <input type="checkbox" className='checkbox' onChange={changeStatus} checked={isChecked}/>
               <div className="task-details">
                    <div>
                         <h1 className="task-title">{title}</h1>
                         <p className="task-description">{description}</p>
                         <p className="task-due">due by {dueDate}</p>
                    </div>
                    <h1 className={`task-priority ${priority}`}>{priority}</h1>
                    <div className="task-btns">
                         <div className="popup-container">
                              <Popup
                                   modal
                                   trigger={
                                        <button className="edit-btn">Edit</button>
                                   }
                              >
                                   {close => (
                                   <>
                                   <form className="task-form">
                                        <h1 className="create-task-heading ">Modify Task</h1>
                                        <label htmlFor="TITLE" className="labels">
                                        TITLE
                                        </label>
                                        <input
                                             type="text"
                                             id="TITLE"
                                             placeholder="TITLE"
                                             className="input-box"
                                             value={editTitle}
                                             onChange={onChangeEditTitle}
                                             
                                        />
                                        <label htmlFor="DESCRIPTION" className="labels">
                                             DESCRIPTION
                                        </label>
                                        <input
                                             type="text"
                                             id="DESCRIPTION"
                                             className="input-box"
                                             placeholder="DESCRIPTION"
                                             value={editDescription}
                                             onChange={onChangeEditDescription}
                                             
                                        />
                                        <label htmlFor="PRIORITY" className="labels">
                                             PRIORITY
                                        </label>
                                        <select
                                             id="PRIORITY"
                                             className="priority-input-box"
                                             value={editPriority}
                                             onChange={onChangeEditPriority}
                                             
                                        >
                                             {editTaskPriorityOptions.map(eachType => (
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
                                             value={editDueDate}
                                             onChange={onChangeEditDueDate}
                                        />
                                   </form>
                                   <button
                                        type="button"
                                        className="add-btn"
                                        onClick={editTask}
                                        
                                   >
                                        Save Task
                                   </button>
                                   <button
                                        
                                        type="button"
                                        className="edit-btn"
                                        onClick={() => {close()}}
                                        
                                   >
                                        close
                                   </button>
                                   </>
                                   )}
                              </Popup>
                         </div>

                         <button className="delete-btn" onClick={onDelete}><MdOutlineDelete /> </button>
                    </div>
               </div>
          </li>
     )
}
export default Task;
import { Component } from "react";
import "./index.css";
import Task from '../Task'


const taskStatusList=[
     {
       optionId: 'ALL',
       displayText: 'All',
     },
     {
       optionId: 'IN PROGRESS',
       displayText: 'In Progress',
     },
     {
          optionId: 'COMPLETED',
          displayText: 'Completed',
     },
   ]
const sortOrderList=[
     {
          optionId: 'PRIORITY',
          displayText: 'Priority',
     },
     {
          optionId: 'DUEDATE',
          displayText: 'Due Date',
     },
]
const priorityValues = {
     HIGH: 1,
     MEDIUM: 2,
     LOW: 3,
   };




class TaskList extends Component{
     state={activeTab:taskStatusList[0].displayText,sortOrder:sortOrderList[0].displayText}

     onChangeTab=(event)=>{
          this.setState({activeTab:event.target.innerText});
     }

     onChangeStatus=(id)=>{
          const {tasksList,changeTaskStatus}=this.props;
          const newTasksList=tasksList.map(each=>{
               if(each.id===id){
                    return{
                         id:each.id,
                         title:each.title,
                         description:each.description,
                         priority:each.priority,
                         dueDate:each.dueDate,
                         status:each.isChecked?"In Progress":"Completed",
                         isChecked:!each.isChecked,
                    }
               }
               return each
          });
          changeTaskStatus(newTasksList);
     }

     sortByPriority = () => {
          const {tasksList}=this.props
          const sortedTasks = [...tasksList].sort((a, b) => priorityValues[a.priority] - priorityValues[b.priority]);
          return sortedTasks;
     };
      
     sortByDueDate = () => {
          const {tasksList}=this.props
          const sortedTasks = [...tasksList].sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA - dateB;
          });
          return sortedTasks ;
     };

     onChangeSortOrder=(event)=>{
          this.setState({sortOrder:event.target.value});
     }

     render(){
          const {tasksList,onClickDelete,onEditTask}=this.props;
          const {activeTab,sortOrder}=this.state;

          const sortedTasks=(sortOrder==="Priority")?this.sortByPriority():this.sortByDueDate();
          
          const updatedTasksList=sortedTasks.filter(each=>{
               return(
               each.status===activeTab || activeTab==="All")
          });

          

          

          return(
               <div className="task-list-container">
                    <h1 className="task-list-heading">Tasks List</h1>
                    <ul className="task-tab-list">
                         {taskStatusList.map(each=>{
                              const isActive=(each.displayText===activeTab)?"active":"";
                              return(
                              <li key={each.optionId} className={`task-tab ${isActive}`} onClick={this.onChangeTab} >{each.displayText}</li>
                         )})}
                         <li>
                         <select
                              id="sortOrder"
                              className="sort-input-box"
                              value={sortOrder}
                              onChange={this.onChangeSortOrder}
                         >
                              {sortOrderList.map(eachType => (
                              <option value={eachType.displayText} key={eachType.optionId}>
                                   {eachType.displayText}
                              </option>
                              ))}
                         </select>
                         </li>
                    </ul>
                    <hr className="line"/>
                    <ul className="task-list">
                         {updatedTasksList.map(each=>(
                              <Task key={each.id} 
                              eachTask={each}
                              tasksList={tasksList}
                              onChangeStatus={this.onChangeStatus} 
                              onClickDelete={onClickDelete}
                              onEditTask={onEditTask}
                              />
                         ))}
                    </ul>
               </div>
          )
     }
}

export default TaskList;

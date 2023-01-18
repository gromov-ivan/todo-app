const TaskListItem = props => {
    return (
        <>
            <table id="table">
                <tbody>
                {
                props.tasks.map((task, index) => 
                <tr key={index}>
                    <td>{index+1}. </td>
                    <td id={task.id}>{task.name}</td>
                    <td><button onClick={()=> props.markDone(task.id)}>Done</button></td>
                    <td></td>
                    <td><button onClick={()=> props.deleteTask(index)}>X</button></td>
                    </tr>)
                }
                </tbody>
            </table>
            <button onClick={props.savedb} style={{marginLeft:'40px', marginTop:'40px'}}>Save to DB</button>
            <button onClick={props.loadFromDb}>Load from DB</button>
        </>
    );
}
export default TaskListItem;
let taskList = [];

$("#add").on("click",()=>{
    // console.log("hi")
    let task = document.getElementById("taskInp").value;
    let priority = document.getElementById("priority").value;
    // console.log(task, priority);

    let date = new Date();

    let taskObj = {
        id : Date.now(), 
        task, 
        priority}
    // console.log(taskObj);

    taskList.push(taskObj);
    console.log(taskList)
})
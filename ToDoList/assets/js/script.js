let taskList = [];

function getPriority(id){
    switch(parseInt(id)){
        case 1 :
            return  "<span>high</span>";
        case 2 :
            return  "<span>medium</span>";
        case 3 :
            return  "<span>low</span>";
    }
}

$("#add").on("click",()=>{
    // console.log("hi")
    let task = document.getElementById("taskInp").value;
    let priority = document.getElementById("priority").value;
    // console.log(task, priority);

    let taskObj = {
        id : Date.now(), 
        task, 
        priority}
    // console.log(taskObj);

    taskList.push(taskObj);
    // console.log(taskList)
  
    document.getElementById("Tasks").innerHTML = "";
  
    taskList.forEach((data, idx) => {
        document.getElementById("Tasks").innerHTML = `
        <h1>${idx + 1} ${data.task} ${getPriority(data.priority)}</h1>
        `
    });
})
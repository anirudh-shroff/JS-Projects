let students = [];

const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const gradeInput = document.querySelector("#grade");
const addBtn = document.querySelector("#addBtn");
const studentList = document.querySelector("#studentList");
const searchInput = document.querySelector("#searchInput");
const form = document.querySelector("#studentForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const ageValue = Number(ageInput.value);
    const gradeValue = gradeInput.value.trim();

    // console.log(student);

    console.log(ageValue)
    if (!nameValue || !ageInput.value || !gradeValue) {
        alert("Please enter all the details");
        return;
    } else if (isNaN(ageValue) || ageValue < 0 || !ageValue) {
        alert("Please enter a valid age");
        ageInput.value = "";
        return;
    } else if (editIndex === null) {
        const student = new Student(nameValue, ageValue, gradeValue);
        students.push(student);
    } else {
        students[editIndex].name = nameValue;
        students[editIndex].age = ageValue;
        students[editIndex].grade = gradeValue;
        editIndex = null;
        addBtn.innerText = "Add";
    }

    nameInput.value = "";
    ageInput.value = "";
    gradeInput.value = "";

    displayStudents();
    searchInput.value = "";
})

let studentIdCounter = Date.now();

class Student {
    constructor(name, age, grade) {
        this.id = studentIdCounter++;
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
}

function deleteStudent(idx) {
    students.splice(idx, 1);
    displayStudents();
}

let editIndex = null;

function editStudents(idx) {
    editIndex = idx;

    nameInput.value = students[idx].name;
    ageInput.value = students[idx].age;
    gradeInput.value = students[idx].grade;
    addBtn.innerText = "Update";

}

function displayStudents(list = students) {
    studentList.innerHTML = "";

    if (list.length === 0) {
        studentList.innerHTML = `<p class="text-center">No Students available</p>`;
        return;
    }

    let table = `
        <table class="table table-striped-columns">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    list.forEach((stu, idx) => {
        table += `
            <tr>
                <td>${stu.id}</td>
                <td>${stu.name}</td>
                <td>${stu.age}</td>
                <td>${stu.grade}</td>
                <td class= "d-flex justify-content-between">
                    <button class="btn btn-sm btn-warning" onclick="editStudents(${idx})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${idx})">Delete</button>
                </td>
            </tr>
        `;
    });

    table += `</tbody></table>`;
    studentList.innerHTML = table;
}


searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
    const searchTermLower = searchTerm.toLowerCase();
    const filteredStudents = students.filter(student => student.name.toLowerCase().includes(searchTermLower) || student.id.toString().includes(searchTerm));
    displayStudents(filteredStudents);
})

// addBtn.addEventListener("click", () => {
//     // console.log("Add button");

// });

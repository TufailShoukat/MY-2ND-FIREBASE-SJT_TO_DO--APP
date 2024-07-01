import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDiqzKWIPYPLCJ_LWmx4vovUk5_vzm-lc0",
    authDomain: "my-first-project-9cd31.firebaseapp.com",
    projectId: "my-first-project-9cd31",
    storageBucket: "my-first-project-9cd31.appspot.com",
    messagingSenderId: "36408870032",
    appId: "1:36408870032:web:6a5ccff1d14776cbd58415",
    measurementId: "G-F2BD5NY6D2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const todoCollection = collection(db, 'todos');

const getTodoInput = document.getElementById("todo_input");
const getTodoAddBtn = document.getElementById("add_todo");

getTodosFromDb();
getTodoAddBtn.addEventListener("click", addTodoToDb);

async function addTodoToDb() {
    try {
        const obj = {
            todo: getTodoInput.value,
            
        };
        const docRef = await addDoc(todoCollection, obj);
       
        getTodoInput.value = "";
        console.log(docRef)
        
    } catch (e) {
        console.log(e);
    }
}

async function getTodosFromDb() {
    try {
        const querySnapshot = await getDocs(todoCollection);
        const todoCollectionDiv = document.getElementById("todocollection");
        todoCollectionDiv.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const todoItem = doc.data().todo;
            const todoId = doc.id;
            const todoElement = document.createElement("div");
            todoElement.className = "todo-item";
            todoElement.innerHTML = `
                <span class="todo-text">${todoItem}</span>
                <button onclick="editTodo('${todoId}', '${todoItem}')">Edit</button>
                <button onclick="deleteTodoFromDb('${todoId}')">Delete</button>
            `;
            todoCollectionDiv.appendChild(todoElement);
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteTodoFromDb(todoId) {
    try {
        await deleteDoc(doc(db, 'todos', todoId));
        getTodosFromDb();
    } catch (e) {
        console.log(e);
    }
}

window.editTodo = async function(todoId, currentTodo) {
    const newTodo = prompt("Edit your todo", currentTodo);
    if (newTodo) {
        try {
            await updateDoc(doc(db, 'todos', todoId), { todo: newTodo });
            getTodosFromDb();
        } catch (e) {
            console.log(e);
        }
    }
};

window.deleteTodoFromDb = deleteTodoFromDb;




















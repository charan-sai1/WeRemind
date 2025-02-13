// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { getDatabase,ref, set,onValue, push, update, remove } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHEqRYGZvE0ZWDz6TnUHOY3FOXzdsXb8c",
  authDomain: "we-remind-c735d.firebaseapp.com",
  databaseURL: "https://we-remind-c735d-default-rtdb.firebaseio.com/",
  projectId: "we-remind-c735d",
  storageBucket: "we-remind-c735d.firebasestorage.app",
  messagingSenderId: "1032120940607",
  appId: "1:1032120940607:web:c116b0eaad6f47d1ece08a",
  measurementId: "G-LMBNZ0QPHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function writeUserData(userId,mail,username) {
  const refer = ref(db, "users/" + userId);
  set(refer, {
    username: username,
    email: mail,
    tasks: {}
  });
}

function addTask(userId, title, desc, duedate, status, priority) {
  if (!title || !desc || !duedate || status === undefined || priority === undefined) {
    throw new Error("All task properties must be defined");
  }
  
  const tasksRef = ref(db, "users/" + userId + "/tasks");
  const task = {
    createdAt: new Date().toISOString(),
    title: title,
    status: status,
    dueDate: duedate,
    priority: priority,
    description: desc
  };
  push(tasksRef, task);
}

function editTask(updatedTask) {
  const userId = getCurrentUserId()
  console.log(userId,updatedTask.id)
  const taskRef = ref(db, "users/" + userId + "/tasks/" + updatedTask.id);
  update(taskRef, updatedTask);
}

function deleteTask(userId, taskId) {
  const taskRef = ref(db, "users/" + userId + "/tasks/" + taskId);
  remove(taskRef);
}

function getTasks(userId, callback) {
  const tasksRef = ref(db, "users/" + userId + "/tasks");
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const tasksList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    callback(tasksList); // Return tasks as a list of objects
  });
}

function getAllTasks(callback) {
  const tasksRef = ref(db, "users");
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const allTasks = [];
    for (const userId in data) {
      if (data[userId].tasks) {
        for (const taskId in data[userId].tasks) {
          allTasks.push({ userId, taskId, ...data[userId].tasks[taskId] });
        }
      }
    }
    callback(allTasks);
  });
}

function getCurrentUserId() {
  const user = auth.currentUser;
  return user ? user.uid : null;
}

function logout(navigate) {
  signOut(auth).then(() => {
    console.log("User signed out successfully");
    navigate('/'); // Navigate to the home page
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
}

export { auth, db, writeUserData, createUserWithEmailAndPassword, signInWithEmailAndPassword, addTask, getTasks, editTask, getAllTasks, getCurrentUserId, deleteTask, logout };
// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [message, setMessage] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [dueDate, setDueDate] = useState("");

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = () => {
//     axios
//       .get(`${API_URL}/api/viewAll`)
//       .then((res) => setTasks(res.data))
//       .catch((err) => console.log(err));
//   };

//   const addTask = (e) => {
//     e.preventDefault();
//     axios
//       .post(`${API_URL}/api/addTask`, { title, description, priority, dueDate })
//       .then((res) => {
//         setMessage(res.data.status);
//         loadTasks();
//         setTitle("");
//         setDescription("");
//         setDueDate("");
//       })
//       .catch((err) => console.log(err));
//   };

//   const deleteTask = (id) => {
//     axios
//       .post(`${API_URL}/api/deleteTask`, { id })
//       .then((res) => {
//         setMessage(res.data.status);
//         loadTasks();
//       })
//       .catch((err) => console.log(err));
//   };

//   const toggleTask = (id) => {
//     axios
//       .post(`${API_URL}/api/toggleTask`, { id })
//       .then(() => loadTasks())
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card p-4 bg-light">
//         <h2 className="text-center mb-3">🗓️ Daily Task & Productivity Tracker</h2>
//         <form onSubmit={addTask}>
//           <input
//             className="form-control mb-2"
//             placeholder="Task Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <input
//             className="form-control mb-2"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <select
//             className="form-control mb-2"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//           >
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//           </select>
//           <input
//             type="date"
//             className="form-control mb-3"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//           <button className="btn btn-primary w-100">Add Task</button>
//         </form>

//         <div className="text-success mt-3">{message}</div>

//         <hr />
//         <h4 className="text-center mb-3">Task List</h4>
//         <table className="table table-bordered">
//           <thead className="table-secondary">
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Priority</th>
//               <th>Due</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No Tasks Yet
//                 </td>
//               </tr>
//             ) : (
//               tasks.map((task, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{task.title}</td>
//                   <td>{task.priority}</td>
//                   <td>
//                     {task.dueDate
//                       ? new Date(task.dueDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td>{task.completed ? "✅ Done" : "❌ Pending"}</td>
//                   <td>
//                     <button
//                       className="btn btn-success btn-sm me-2"
//                       onClick={() => toggleTask(task._id)}
//                     >
//                       Toggle
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteTask(task._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

const loadTasks = () => {
  axios
    .get(`${API_URL}/api/viewAll`)
    .then((res) => {
      const data = res?.data;
      // ensure it's always an array
      setTasks(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.error("viewAll error:", err);
      setTasks([]); // keep UI stable
    });
};


const addTask = (e) => {
  e.preventDefault();
  axios
    .post(`${API_URL}/api/addTask`, { title, description, priority, dueDate })
    .then((res) => {
      setMessage(res.data?.status || "Saved");
      loadTasks(); // reload safely
      setTitle(""); setDescription(""); setDueDate("");
    })
    .catch((err) => console.error("addTask error:", err));
};

const deleteTask = (id) => {
  axios
    .post(`${API_URL}/api/deleteTask`, { id })
    .then((res) => {
      setMessage(res.data?.status || "Deleted");
      loadTasks();
    })
    .catch((err) => console.error("deleteTask error:", err));
};

const toggleTask = (id) => {
  axios
    .post(`${API_URL}/api/toggleTask`, { id })
    .then(() => loadTasks())
    .catch((err) => console.error("toggleTask error:", err));
};


  return (
    <div className="container mt-4">
      <div className="card p-4 bg-light">
        <h2 className="text-center mb-3">🗓️ Daily Task & Productivity Tracker</h2>
        <form onSubmit={addTask}>
          <input
            className="form-control mb-2"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="form-control mb-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            className="form-control mb-3"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="btn btn-primary w-100">Add Task</button>
        </form>

        <div className="text-success mt-3">{message}</div>

        <hr />
        <h4 className="text-center mb-3">Task List</h4>
        <table className="table table-bordered">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             {!Array.isArray(tasks) || tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Tasks Yet
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.priority}</td>
                  <td>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{task.completed ? "✅ Done" : "❌ Pending"}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => toggleTask(task._id)}
                    >
                      Toggle
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

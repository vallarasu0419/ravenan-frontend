import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Toast } from "../../components/Tost";
import { instance } from "../../controller/Common";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";

const ViewTask = () => {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");
  const [taskDetails, setTaskDetails] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const getTask = async () => {
    try {
      const response = await instance.get(
        `/api/getTask?userId=${userDetails.userId}`
      );

      if (response.status === 200) {
        setTaskDetails(response.data);
      } else {
        setTaskDetails([]);
        Toast.fire({
          title: response.data.message,
          icon: "error",
        });
        console.error("Error fetching tasks:", response.data.message);
      }
    } catch (error) {
      setTaskDetails([]);
      console.error("An error occurred while fetching tasks:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setOpenDelete(true);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h3 className="mb-4">View Tasks</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {taskDetails.length > 0 ? (
              taskDetails.map((task, index) => (
                <tr key={task.taskId}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditClick(task)}
                    >
                      <i className="bi bi-pencil-fill"></i> Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDeleteClick(task)}
                    >
                      <i className="bi bi-trash-fill"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {open && (
        <EditModal
          open={open}
          setOpen={setOpen}
          task={selectedTask}
          getTask={getTask}
        />
      )}
      {openDelete && (
        <DeleteModal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          task={selectedTask}
          getTask={getTask}
        />
      )}
    </>
  );
};

export default ViewTask;

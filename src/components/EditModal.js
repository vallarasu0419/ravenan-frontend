import React, { useState } from "react";
import TextInputComponent from "./TextInputComponent";
import DropDown from "./DropDown";
import { instance } from "../controller/Common";
import { Toast } from "./Tost";
import moment from "moment";

const EditModal = ({ open, setOpen, task, getTask }) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    dueDate: moment(task.dueDate).format("YYYY-MM-DD") || "",
    status: task.status || "Pending",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.dueDate) newErrors.dueDate = "Due Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await instance.put(
        `/api/updateTask?taskId=${task.taskId}`,
        formData
      );
      if (response.status === 200) {
        Toast.fire({
          title: "Task edited successfully",
          icon: "success",
        });
        getTask();
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          status: "",
        });
        setOpen(false);
      } else {
        Toast.fire({
          title: response.data.message,
          icon: "error",
        });
        console.error("Error during registration:", response.data.message);
      }
    } catch (error) {
      Toast.fire({
        title: "An error occurred while editing the task",
        icon: "error",
      });
      console.error("An error occurred while editing the form:", error);
    }
  };

  return (
    <div
      className={`modal fade ${open ? "show" : ""}`}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden={!open}
      style={{
        display: open ? "block" : "none",
        zIndex: 1050,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Task
            </h5>
          </div>
          <form onSubmit={handleEdit}>
            <div className="modal-body">
              <TextInputComponent
                label="Title"
                type="text"
                placeholder="Enter the task title"
                value={formData.title}
                onChange={handleChange}
                id="title-input"
                name="title"
                error={errors.title}
              />

              <TextInputComponent
                label="Description"
                type="text"
                placeholder="Enter the task description"
                value={formData.description}
                onChange={handleChange}
                id="description-input"
                name="description"
                error={errors.description}
              />

              <TextInputComponent
                label="Due Date"
                type="date"
                placeholder="Select the due date"
                value={formData.dueDate}
                onChange={handleChange}
                id="dueDate-input"
                name="dueDate"
                error={errors.dueDate}
              />

              <DropDown
                label="Status"
                value={formData.status}
                onChange={handleChange}
                name="status"
                id="status-dropdown"
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Completed", label: "Completed" },
                ]}
                error={errors.status}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-outline-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

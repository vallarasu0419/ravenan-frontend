import React, { useState } from "react";
import TextInputComponent from "./TextInputComponent";
import DropDown from "./DropDown";
import { instance } from "../controller/Common";
import { Toast } from "./Tost";

const DeleteModal = ({ openDelete, setOpenDelete, task, getTask }) => {
  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.delete(
        `/api/deleteTask?taskId=${task.taskId}`
      );
      if (response.status === 200) {
        Toast.fire({
          title: "Task deleted successfully",
          icon: "success",
        });
        getTask();

        setOpenDelete(false);
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
      className={`modal fade ${openDelete ? "show" : ""}`}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden={!openDelete}
      style={{
        display: openDelete ? "block" : "none",
        zIndex: 1050,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Delete Task
            </h5>
          </div>
          <form onSubmit={handleDelete}>
            <div className="modal-body">
              Are you sure you want to delete this task?
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
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

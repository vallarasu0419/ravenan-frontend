import React, { useState } from "react";
import DropDown from "../../components/DropDown";
import TextInputComponent from "../../components/TextInputComponent";
import { Toast } from "../../components/Tost";
import { instance } from "../../controller/Common";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const CreateTask = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userDetails = cookies.get("user");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    userId: userDetails.userId,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required.";
    if (!formData.status) newErrors.status = "Status is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await instance.post("/api/createTask", formData);

      if (response.status === 200) {
        Toast.fire({
          title: "Task created successfully",
          icon: "success",
        });
        navigate("/dashboardLayout/viewTask");
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          status: "",
        });
      } else {
        Toast.fire({
          title: response.data.message,
          icon: "error",
        });
        console.error("Error during registration:", response.data.message);
      }
    } catch (error) {
      Toast.fire({
        title: "An error occurred while submitting the task",
        icon: "error",
      });
      console.error("An error occurred while submitting the form:", error);
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-register btn-primary">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

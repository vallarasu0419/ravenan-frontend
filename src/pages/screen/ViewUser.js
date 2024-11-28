import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import image from "../../assets/Mention-bro.svg";

const ViewUser = () => {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm"
        style={{
          display: "flex",
          flexDirection: windowWidth <= 800 ? "column" : "row",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "50%",
        }}
      >
        <div
          className="card-left"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f4f4f4",
            borderRadius: "10px",
          }}
        >
          <img
            src={image}
            alt="User Avatar"
            style={{
              minWidth: "100px",
              minHeight: "100px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          className="card-right"
          style={{
            flex: 2,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
          }}
        >
          <h4>{userDetails?.name || "User"}</h4>
          <p>
            <strong>Email:</strong> {userDetails?.email || "user@example.com"}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails?.mobile || "Not Provided"}
          </p>
          <p>
            <strong>Gender:</strong> {userDetails?.gender || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;

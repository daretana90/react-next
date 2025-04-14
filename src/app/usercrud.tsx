"use client";
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Usercrud = () => {
  const [users, setUsers] = React.useState([
    {
      id: 0,
      name: "",
      email: "",
      status: "",
    },
  ]);
  const [user, setUser] = React.useState([
    {
      id: 0,
      name: "",
      email: "",
      status: "",
    },
  ]);
  const [editing, setEditing] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const API_URL = "http://localhost:5000/api/users";

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      setUsers(response.data.empData);
    } catch (error) {
      console.log(error);
    }
  };

  function updateUser(id: number) {
    console.log(id);
  }
  function deleteUser(id: number) {
    console.log(id);
  }

  return (
    <>
      <div className="border p-10 m-5">
        <table className="table border p-5">
          <thead>
            <tr>
              <td>
                <b>ID</b>
              </td>
              <td>
                <b>NOMBRE</b>
              </td>
              <td>
                <b>CORREO</b>
              </td>
              <td>
                <b>ACCIONES</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      updateUser(user.id);
                    }}
                  >
                    {" "}
                    ACTUALIZAR💫
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    ELIMINAR ✖️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Usercrud;

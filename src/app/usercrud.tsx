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
    setUsers([]);
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      setUsers(response.data.empData);
      toast.success("Obtener usuarios");
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (userId: number) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function updateUser(userId: number, userMail: string) {
    console.log("UPDATE FUNCION", userId);
    toast.info("Usuario actualizado");
    try {
      const response = await axios.put(`${API_URL}/user/${userId}`, {
        name: "UPDATE FROM REACT",
        email: `${userMail}REACT`,
      });
      console.log(response);
      if (response.data === 1) {
        alert("Registro eliminado correctamente");
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(userId: number) {
    console.log("DELETE FUNCION", userId);
    try {
      toast.warning("Usuario eliminado");
      const response = await axios.delete(`${API_URL}/${userId}`);
      console.log(response);
      if (response.data === 1) {
        alert("Registro eliminado correctamente");
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="border p-10 m-5">
        <span className="text-3xl font-bold underline py-5">
          CRUD para usuarios
        </span>
        <br />
        <div className="py-5">
          <button
            onClick={fetchUsers}
            className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
          >
            OBTENER
          </button>
        </div>
        <table className="table border p-5">
          <thead>
            <tr className="border p-5">
              <td>
                <b className="m-2">ID</b>
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
                      updateUser(user.id, user.email);
                    }}
                    className="m-2 text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                    title="ACTUALIZAR REGISTRO"
                  >
                    {" "}
                    ACTUALIZAR💫
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                    className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                    title="ELIMINAR REGISTRO"
                  >
                    ELIMINAR ✖️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />

        {/* <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div> */}
      </div>
    </>
  );
};

export default Usercrud;

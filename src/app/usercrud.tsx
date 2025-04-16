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
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  // EXPRESS SQL SERVER
  // const API_URL = "http://localhost:5000/api/users";
  // LARAVEL Lumen LumenMySQL
  const API_URL = "http://lumen/LEARN/lumen/blog/public/api";

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setUsers([]);
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log(response);
      // setUsers(response.data.empData);
      setUsers(response.data);
      toast.success("Obtener usuarios");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    console.log("CREATE FUNCION");
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/users`, {
        name: "REACT USER CREATED",
        email: "mail@mail.com",
      });
      console.log(response);
      if (response.data.insertado >= 1) {
        toast.info("Usuario creado");
        fetchUsers();
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function updateUser(id: number, mail: string) {
    console.log("UPDATE FUNCION", id);
    toast.info("Usuario actualizado");
    try {
      const response = await axios.put(`${API_URL}/user/${id}`, {
        name: "UPDATED",
        email: `update-${mail}`,
      });
      console.log(response);
      if (response.data === 1) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id: number) {
    console.log("DELETE FUNCION", id);
    try {
      toast.warning("Usuario eliminado");
      const response = await axios.delete(`${API_URL}/user/${id}`);
      console.log(response);
      if (response.data === 1) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editUser = async (userId: number) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function loadingHTML(loading: boolean) {
    if (!loading) return null;
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
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
            onClick={createUser}
            className="m-1 text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
          >
            AGREGAR ➕
          </button>
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
          {loadingHTML(loading)}
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <span className="p-1">{user.id}</span>
                </td>
                <td>
                  <span className="p-1">{user.name}</span>
                </td>
                <td>
                  <span className="p-1">{user.email}</span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      updateUser(user.id, user.email);
                    }}
                    className="m-2 text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                    title="ACTUALIZAR REGISTRO"
                  >
                    ACTUALIZAR 💫
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
      </div>

      <ToastContainer autoClose={1000} />

      <div></div>
    </>
  );
};

export default Usercrud;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, DeleteUser, setUser } from "../../store/slice/userSlice";
import UserEdit from "../userEdit/UserEdit";
import Createuser from "./Createuser";
import { toast } from "sonner";
export default function Dashboard() {
  const admin = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchitem, setSearch] = useState("");
  const [newUser, setNew] = useState(false);

  const fetch = async () => {
    const { data } = await axios.get("/api/admin/dasboard");
    setUsers(
      data.map((e) => ({
        ...e,
        isEdit: false,
      }))
    );
  };
  useEffect(() => {
    test();
  }, []);

  useEffect(() => {
    if (searchitem.trim() !== "") {
      let res = users.filter((user) =>
        user.userName.toLowerCase().includes(searchitem.toLowerCase())
      );
      setUsers(res);
    } else {
      fetch();
    }
  }, [searchitem]);

  const test = async () => {
    try {
      setloading(true);
      const { data } = await axios.get("/api/admin/dasboard");
      setTimeout(() => {
        setUsers(
          data.map((e) => ({
            ...e,
            isEdit: false,
          }))
        );
        setloading(false);
      }, 800);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editAndSave = (i) => {
    setUsers(
      users.map((e, ind) => (ind == i ? { ...e, isEdit: !e.isEdit } : e))
    );
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.put(`/api/admin/delete/${id}`);
      toast.error(data.msg);
      dispatch(DeleteUser(id));
      fetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="antialiased font-sans bg-gray-200 h-screen">
        {loading ? (
          <>
            {" "}
            <div className="flex  justify-center h-screen items-center">
              <img src="/loading.gif" alt="" />
            </div>{" "}
          </>
        ) : (
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-semibold leading-tight">Users</h2>
                <div className="flex items-center space-x-6">
                  <img
                    src={admin.profile}
                    alt="User"
                    className="w-10 h-10 rounded-full shadow-md object-cover"
                  />
                  <p className="text-gray-900">{admin.userName}</p>
                  <button
                    className="text-red-500"
                    onClick={() => dispatch(clearUser())}
                  >
                    Logout
                    <i className="ps-1 fas fa-power-off"></i>
                  </button>
                </div>
              </div>
              <div className="my-2 flex sm:flex-row flex-col rounded-lg space-x-6">
                <div className="block relative rounded-xl shadow-lg">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 rounded-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current text-gray-500"
                    >
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
                    </svg>
                  </span>
                  <input
                    placeholder="Search"
                    className="rounded-lg appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <button
                  className=" px-4 py- bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
                  onClick={() => setNew(!newUser)}
                >
                  {!newUser ? "+ Create" : " Back"}
                </button>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                  {!newUser ? (
                    <table className="min-w-full leading-normal ">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            email
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Created at
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((person, i) =>
                          person.isEdit ? (
                            <UserEdit key={i} fn={fetch} user={person} />
                          ) : (
                            <tr key={i}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-10 h-10">
                                    <img
                                      className="w-full h-full object-cover rounded-full"
                                      src={person.profile}
                                      alt={person.userName}
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap ps-3">
                                      {person.userName}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {person.email}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {person.createdAt.slice(0, 10)}
                                </p>
                              </td>
                              <td className="ps-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex space-x-2 gap-4">
                                  <i
                                    onClick={() => editAndSave(i)}
                                    className="fas fa-edit text-blue-500 cursor-pointer"
                                  ></i>
                                  <i
                                    onClick={() => {
                                      deleteUser(person._id);
                                    }}
                                    className="fas fa-trash text-red-500 cursor-pointer"
                                  ></i>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <Createuser save={setNew} fn={fetch} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

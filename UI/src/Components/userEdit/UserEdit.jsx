import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function UserEdit({ user, fn }) {
  const [formdata, setForm] = useState({});
  const dispatch = useDispatch();
  const btnRef = useRef();
  const handleData = (e) => {
    if (e.target.value.trim() !== "") {
      setForm({ ...formdata, [e.target.id]: e.target.value });
      e.target.style.border = "";
      btnRef.current.disabled = false;
    } else {
      btnRef.current.disabled = true;
      e.target.style.border = "none";
      e.target.style.border = "1px solid red";
      e.target.placeholder = "can not be empty";
      toast.error("Field can not be empty");
    }
  };
  const formSubmit = async () => {
    try {
      const { data } = await axios.put(`/api/admin/edit/${user._id}`, formdata);

      fn();
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error.message);
    }
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full object-cover rounded-full"
                src={user.profile}
                alt="Vera Carpenter"
              />
            </div>
            <div className="ml-3 ">
              <input
                type="text"
                className="border p-2"
                id="userName"
                defaultValue={user.userName}
                onChange={handleData}
              />
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <input
            type="email"
            id="email"
            className="border p-2"
            defaultValue={user.email}
            onChange={handleData}
          />
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {user.createdAt.slice(0, 10)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex space-x-2 gap-4">
            <button
              ref={btnRef}
              onClick={formSubmit}
              className="bg-green-500 disabled:opacity-50 p-2 rounded-lg text-white shadow-md"
            >
              save
              <i className="fas fa-save text-blue-500 cursor-pointer ps-2"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

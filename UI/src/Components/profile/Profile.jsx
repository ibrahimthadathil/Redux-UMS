import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, updateUserData } from "../../store/slice/userSlice";
import axios from "axios";
import {toast} from 'sonner'
import { Link } from "react-router-dom";
export default function Profile() {
  const [img, setImg] = useState("");
  const ref = useRef();
  const imgref = useRef();
  const dispatch = useDispatch();
  const [imgLoad, setLoading] = useState(false);
  const [progres, setProgres] = useState(0);
  const user = useSelector((state) => state.user);
  const [formdata, setForm] = useState({});

  const uploadIMG = async (img) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "crud_app");
      data.append("cloud_name", "dtluwvh50");
      const { data: res } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtluwvh50/image/upload",
        data,
        {
          onUploadProgress: (ProgressEventevent) => {
            const totalLength = ProgressEventevent.lengthComputable
              ? ProgressEventevent.total
              : ProgressEventevent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            if (totalLength !== null) {
              setProgres(
                Math.round((ProgressEventevent.loaded * 100) / totalLength)
              );
            }
          },
        }
      ); 
      setImg(res.url.toString());
      setLoading(false);
    } catch (error) {
      console.log(error);
      
    }
  };

  const handlechange = (e) => {
    if (e) return setForm({ ...formdata, [e?.target?.id]: e.target.value });
    setForm({ ...formdata, img });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`/api/upload/${user._id}`,formdata)
      console.log(data.user);
      
      dispatch(updateUserData(data.user))
      toast.success(data.msg)
      
    } catch (error) {
     
     toast.error(error.response.data)
      
    }
  }
  
  useEffect(() => {
    handlechange();
  }, [img]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-5">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex space-x-80">
              <button
                className=" text-red-400"
                onMouseMove={() => (ref.current.textContent = "Logout")}
                onMouseLeave={() =>
                  (ref.current.innerHTML = '<i class="fas fa-power-off"></i>')
                }
                onClick={() => dispatch(clearUser())}
                ref={ref}
              >
                <i class="fas fa-power-off"></i>
              </button>
              {user.is_admin && <Link to={'/dash'} className="text-gray-900 absolute">
              <i className="fas fa-home"></i>
            </Link>}
              </div>
                
              <div className="text-center">
                <form onSubmit={handleSubmit}>
                  <div className="mt-3 mb-4">
                    <input
                      type="file"
                      ref={imgref}
                      hidden
                      accept="image/"
                      id="img"
                      onChange={(e) => {
                        uploadIMG(e.target.files[0]);
                      }}
                    />
                    {imgLoad && (
                      <h3 className="text-green-800 font-semibold">
                        Uploading..{progres}%
                      </h3>
                    )}
                    <img
                      src={img ? img : user.profile}
                      alt="Profile"
                      className="rounded-full w-24 mx-auto cursor-pointer object-cover "
                      onClick={() => imgref.current.click()}
                    />
                  </div>
                  <div className="relative flex items-center">
                    <input
                      className="text-center p-2 pr-8 rounded-lg bg-slate-100 mb-2 w-full"
                      type="text"
                      id="username"
                      defaultValue={user.userName}
                      onChange={handlechange}
                    />
                    <i className="fas fa-edit absolute right-3 text-gray-400"></i>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      className="text-center p-2 pr-8 rounded-lg bg-slate-100 mb-2 w-full"
                      type="email"
                      id="email"
                      defaultValue={user.email}
                      onChange={handlechange}
                    />
                    <i className="fas fa-edit absolute right-3 text-gray-400"></i>
                  </div>
                  <button className="bg-blue-500 text-white rounded-full px-6 py-2">
                    Update
                  </button>

                </form>
                  

                <div className="flex justify-between text-center mt-5 mb-2">
                  <div>
                    <p className="text-xl font-semibold">8471</p>
                    <p className="text-gray-600 text-sm">Wallets Balance</p>
                  </div>
                  <div className="px-3">
                    <p className="text-xl font-semibold">8512</p>
                    <p className="text-gray-600 text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">4751</p>
                    <p className="text-gray-600 text-sm">Total Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState } from "react";
import { CloseOutlined, CloudUploadOutlined } from "@ant-design/icons";

export const EditProfile = ({ kill, death, xp, token, onBack }) => {
  // refs + state
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    "https://www.shutterstock.com/image-photo/stitch-disney-character-cartoon-vector-600nw-2522057197.jpg"
  ); // replace with your placeholder
  const [name, setName] = useState("Akshat");
  const [add, setAdd] = useState("address");

  // open file picker
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // on file selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Saving profile:", { name, avatar: preview });
    onBack();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-51">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <CloseOutlined style={{ fontSize: "16px" }} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>

        <div
          onClick={handleImageClick}
          className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer group"
        >
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition">
            <CloudUploadOutlined className="text-white text-2xl" />
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={add}
          disabled={true}
          className=" w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSave}
          className=" w-full py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-200 ease-in-out"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

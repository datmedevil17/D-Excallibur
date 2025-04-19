import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Input, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CharacterShowcase } from "./CharacterShowcase";
import Stats from "./Stats.json";
import Colors from "./Colors.json";

export const PlayerProfileForm = ({ onSubmit }) => {
  const [roomCode, setRoomCode] = useState("");
  const [gun, setGun] = useState("Revolver");
  const [color, setColor] = useState("black");
  const [formData, setFormData] = useState({
    name: "Player 1",
    address: "temp",
    weapon: "AK",
    color: "blue",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/08/09/33/cat-7978052_1280.jpg",
    xp: "195",
    token: "0",
    roomCode: "",
    league: "major",
  });
  const getRank = (xp) => {
    if (xp < 100) return "private";
    if (xp < 200) return "corporal";
    if (xp < 300) return "sergeant";
    return "major";
  };
  useEffect(()=>{
    setRoomCode(window.location.hash.substring(4));
    const updatedData = {
      ...formData,
      roomCode:window.location.hash.substring(4),
    };
    setFormData(updatedData);
  },[])
  const [editMode, setEditMode] = useState(false);
  const handlePlay = () => {
    if (!roomCode.trim()) {
      toast.error("Please enter a Room Code to join or create a game.", {
        position: "top-center",
      });
      return;
    }
    window.location.hash = "r=a"+roomCode;
    const updatedData = {
      ...formData,
      roomCode: roomCode,
      league: getRank(formData.xp),
      weapon: gun,
      color: color,
    };
  
    setFormData(updatedData);
    onSubmit(updatedData);  
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <div className="h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative">
        <img src="./logo.PNG" className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 mb-[5vh]" width={"700px"}/>
        <div className="absolute left-4 top-4 z-10 ">
          <button
            onClick={() => console.log("hi")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Connect to Wallet
          </button>
        </div>
        <div className="absolute left-0 md:left-1/2 bottom-1/4 z-10 flex flex-col md:translate-x-[-25vw] mx-2">
          <Segmented
            vertical
            className="bg-[rgba(0,0,0,0.5)]"
            options={[
              ...Colors.map((color) => ({
                label: (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                    <Avatar
                      src={color.imgUrl}
                      shape="square"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white px-1 font-bold">
                      {color.name}
                    </div>
                  </div>
                ),
                value: color.type,
              })),
              {
                label: (
                  <button
                    onClick={() => {
                      console.log("Open skin shop");
                    }}
                    className="p-1 sm:p-2"
                  >
                    <Avatar
                      size={{
                        xs: 32,
                        sm: 40,
                        md: 64,
                      }}
                      className="bg-[rgba(0,0,0,0.5)]"
                      icon={<ShoppingCartOutlined />}
                    />
                  </button>
                ),
                value: "shop",
              },
            ]}
            value={color}
            onChange={(value) => setColor(value)}
          />
        </div>

        <CharacterShowcase weapon={gun} key={gun + color} color={color} />
        <div className="absolute right-0 md:right-1/2 bottom-1/4 z-10 flex flex-col md:translate-x-[25vw] mx-2">
          <Segmented
            vertical
            className="bg-[rgba(0,0,0,0.5)]"
            options={[
              ...Stats.map((gun) => ({
                label: (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                    <Avatar
                      src={gun.imgUrl}
                      shape="square"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white px-1 font-bold">
                      {gun.name}
                    </div>
                  </div>
                ),
                value: gun.type,
              })),
              {
                label: (
                  <button
                    onClick={() => {
                      console.log("Open weapon shop");
                    }}
                    className="p-1 sm:p-2"
                  >
                    <Avatar
                      size={{
                        xs: 32,
                        sm: 40,
                        md: 64,
                      }}
                      className="bg-[rgba(0,0,0,0.5)]"
                      icon={<ShoppingCartOutlined />}
                    />
                  </button>
                ),
                value: "shop",
              },
            ]}
            value={gun}
            onChange={(value) => setGun(value)}
          />
        </div>

        <div className="absolute right-4 bottom-4 z-10 flex flex-col">
          <div className="text-sm text-gray-300">
            Enter Room Code to Join / Create
          </div>

          <Input
            addonBefore="R"
            placeholder="ABCDE"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="rounded-lg bg-yellow-400"
          />

          <button
            onClick={handlePlay}
            className="mt-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Play Game
          </button>
        </div>
      </div>
      {/* Edit Form (shown only in edit mode) */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weapon</label>
                <input
                  name="weapon"
                  value={formData.weapon}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Photo URL
                </label>
                <input
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">XP</label>
                <input
                  name="xp"
                  value={formData.xp}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Token</label>
                <input
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Room Code
                </label>
                <input
                  name="roomCode"
                  value={formData.roomCode}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-30 p-3 rounded-lg"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-lg font-medium transition-all"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

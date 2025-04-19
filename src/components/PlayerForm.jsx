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
    address: "",
    weapon: "AK",
    color: "blue",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/08/09/33/cat-7978052_1280.jpg",
    xp: "5000",
    token: "5000",
    roomCode: "Castl",
    level: "89",
    rank: "Champion IV",
  });
  useEffect(() => {}, []);
  const [editMode, setEditMode] = useState(false);

  const handlePlay = () => {
    if (!roomCode.trim()) {
      toast.error("Please enter a Room Code to join or create a game.", {
        position: "top-center",
      });
      return;
    }

    console.log("Joining room:", roomCode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setEditMode(false);
  };

  return (
    <>
      {/* Top Bar */}
      {/* <div className="flex justify-between items-center p-4 bg-black bg-opacity-30 rounded-2xl backdrop-blur-sm shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={formData.photo || "/avatar.png"}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white border-opacity-50"
          />
          <div className="space-y-1">
            {editMode ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-lg font-bold tracking-wide bg-transparent border-b border-white"
              />
            ) : (
              <div className="text-lg font-bold tracking-wide">
                {formData.name}
              </div>
            )}
            <div className="text-xs bg-blue-600 bg-opacity-80 px-3 py-1 rounded-full w-fit">
              LV {formData.level}
            </div>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="text-sm font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-1.5 rounded-full shadow-md">
            {formData.rank}
          </div>
          <button className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-all">
            <span className="text-lg">🎁</span>
          </button>
          <div className="flex items-center space-x-2 bg-black bg-opacity-30 px-3 py-1.5 rounded-full">
            <span className="text-yellow-300">🪙</span>
            <span className="text-sm">{formData.xp}</span>
          </div>
          <div className="flex items-center space-x-2 bg-black bg-opacity-30 px-3 py-1.5 rounded-full">
            <span className="text-blue-300">💎</span>
            <span className="text-sm">{formData.token}</span>
          </div>
          <button
            onClick={toggleEditMode}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
          >
            ⚙️
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-red-800 relative ">
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
            className="bg-[rgba(0,0,0,0.2)]"
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
            className="bg-[rgba(0,0,0,0.2)]"
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
            className="rounded-lg"
          />

          <button
            onClick={handlePlay}
            className="mt-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Play Game
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <div className="flex justify-between items-center mt-8 px-8">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 rounded-xl text-sm font-medium shadow-lg">
          ROOM: {formData.roomCode}
        </div>
        <button
          onClick={() => setEditMode(false)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 text-lg font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all"
        >
          FIGHT NOW
        </button>
      </div> */}

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

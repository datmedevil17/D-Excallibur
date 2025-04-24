import { LockOutlined } from "@ant-design/icons";
import { Avatar, Input, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CharacterShowcase } from "./CharacterShowcase";
import Stats from "./Stats.json";
import Colors from "./Colors.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";
import { getXTokenBalance } from "../contracts/function";
import { formatEther } from "viem";
import { EditProfile } from "./EditProfile";

export const PlayerProfileForm = ({ onSubmit }) => {
  const [roomCode, setRoomCode] = useState("");
  const [gun, setGun] = useState("Revolver");
  const [color, setColor] = useState("black");
  const [colorId, setColorId] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [gunId, setGunId] = useState(1);
  const [playerColors, setPlayerColors] = useState([1, 3, 4]);
  const [playerGuns, setPlayerGuns] = useState([1, 3, 4]);
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
  const [userBalance, setUserBalance] = useState("0");
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    onSuccess: async (data) => {
      const address = data.accounts[0];
      try {
        const balance = await getXTokenBalance(address);
        setUserBalance(formatEther(balance));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    },
  });

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRank = (xp) => {
    if (xp < 100) return "private";
    if (xp < 200) return "corporal";
    if (xp < 300) return "sergeant";
    return "major";
  };
  useEffect(() => {
    setRoomCode(window.location.hash.substring(4));
    const updatedData = {
      ...formData,
      roomCode: window.location.hash.substring(4),
    };
    setFormData(updatedData);
  }, []);
  const errorClick = () => {
    toast.error("Please purchase locked items before playing.", {
      position: "top-center",
    });
  };
  const [editMode, setEditMode] = useState(false);
  const handlePlay = () => {
    if (!roomCode.trim()) {
      toast.error("Please enter a Room Code to join or create a game.", {
        position: "top-center",
      });
      return;
    }
    window.location.hash = "r=R" + roomCode.toUpperCase();
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

  useEffect(() => {
    const selectedColor = Colors.find((c) => c.type === color);
    if (selectedColor) {
      setColorId(selectedColor.id);
    }
  }, [color]);

  useEffect(() => {
    const selectedGun = Stats.find((c) => c.type === gun);
    if (selectedGun) {
      setGunId(selectedGun.id);
    }
  }, [gun]);

  return (
    <>
      <div className="h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative">
        <img
          src="./logo.PNG"
          className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 mb-[5vh]"
          width={"700px"}
        />
        <div className="absolute left-4 top-4 z-10">
          <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg w-[320px]">
            <div
              className="absolute top-2 right-2 text-white cursor-pointer hover:text-gray-300 transition"
              onClick={() => setIsEdit(!isEdit)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                />
              </svg>
            </div>
            <img
              src={`/ranks/${getRank(formData.xp)}.png`}
              alt="Player"
              className="w-16 h-16 rounded-full object-cover mr-4"
              style={{
                border: `3px solid ${color}`,
                padding: "2px",
              }}
            />
            <div className="flex-1">
              <div className="flex gap-5 items-center">
                <div className="text-white text-lg">Akshat</div>
                <div className="text-white font-semibold text-xs">address</div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={`/ranks/${getRank(formData.xp)}.png`}
                  alt="League"
                  className="w-4 h-4"
                />
                <div className="flex-1 h-3 bg-white/20 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${formData.xp % 100}%` }}
                  />
                </div>
                <div className="text-white text-xs font-bold">
                  {formData.xp % 100}/100
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="absolute left-4 top-4 z-10">
          {!isConnected ? (
            <div className="flex flex-col gap-2">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className={`
                    px-4 py-2 rounded-lg
                    ${
                      isLoading && connector.id === pendingConnector?.id
                        ? "bg-gray-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    text-white font-semibold transition-all
                    flex items-center justify-center min-w-[160px]
                  `}
                  disabled={!connector.ready || isLoading}
                >
                  {isLoading && connector.id === pendingConnector?.id
                    ? "Connecting..."
                    : "Connect Wallet"}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-[rgba(0,0,0,0.5)] p-3 rounded-lg text-white">
              <p className="font-medium">Address: {formatAddress(address)}</p>
              <p className="font-medium">Balance: {userBalance} XTK</p>
            </div>
          )}
        </div> */}
        <div className="absolute left-0 md:left-1/2 bottom-1/4 z-10 flex flex-col md:translate-x-[-25vw] mx-2">
          <Segmented
            vertical
            className="bg-[rgba(0,0,0,0.5)] p-1"
            options={[
              ...Colors.map((color) => ({
                label: (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                    <Avatar
                      src={color.imgUrl}
                      shape="square"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {!playerColors.includes(color.id) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <LockOutlined className="text-white text-xl" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white px-1 font-bold">
                      {color.name}
                    </div>
                  </div>
                ),
                value: color.type,
              })),
            ]}
            value={color}
            onChange={(value) => setColor(value)}
          />
        </div>

        <CharacterShowcase weapon={gun} key={gun + color} color={color} />

        {isEdit && (
          <>
            <EditProfile onBack={()=>{setIsEdit(false)}}/>
          </>
        )}
        <div className="absolute right-0 md:right-1/2 bottom-1/4 z-10 flex flex-col md:translate-x-[25vw] mx-2">
          <Segmented
            vertical
            className="bg-[rgba(0,0,0,0.5)] p-1"
            options={[
              ...Stats.map((gun) => ({
                label: (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                    <Avatar
                      src={gun.imgUrl}
                      shape="square"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {!playerGuns.includes(gun.id) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <LockOutlined className="text-white text-xl" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white px-1 font-bold">
                      {gun.name}
                    </div>
                  </div>
                ),
                value: gun.type,
              })),
            ]}
            value={gun}
            onChange={(value) => setGun(value)}
          />
        </div>

        <div className="absolute right-4 bottom-4 z-10 flex flex-col ">
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
          {playerColors.includes(colorId) && playerGuns.includes(gunId) ? (
            <button
              onClick={handlePlay}
              className="mt-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Play Game
            </button>
          ) : (
            <button
              className="mt-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-inner opacity-60 "
              onClick={errorClick}
            >
              Play Game
            </button>
          )}
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

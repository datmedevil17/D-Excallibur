import React, { useState } from "react";

export const PlayerProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "Player 1",
    address: "",
    weapon: "AK",
    color: "blue",
    photo: "/pirate-character.png",
    xp: "5000",
    token: "5000",
    roomCode: "Castle Maze",
    level: "89",
    rank: "Champion IV"
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 p-6 text-white font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-30 rounded-2xl backdrop-blur-sm shadow-lg">
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
              <div className="text-lg font-bold tracking-wide">{formData.name}</div>
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
      </div>

      {/* Main Content */}
      <div className="flex mt-8 space-x-6">
        {/* Left Sidebar */}
        <div className="w-64 space-y-3">
          {[
            { name: "Hero", count: 3, icon: "🦸" },
            { name: "Skill", count: 3, icon: "✨" },
            { name: "Guild", icon: "🏰" },
            { name: "Quest", icon: "📜" },
          ].map((item, i) => (
            <button
              key={i}
              className="relative w-full flex items-center space-x-3 bg-black bg-opacity-30 hover:bg-opacity-40 rounded-xl px-4 py-3 text-left transition-all group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
              {item.count && (
                <span className="ml-auto text-xs bg-red-500 rounded-full px-2 py-1">
                  {item.count}
                </span>
              )}
            </button>
          ))}
          <button className="relative w-full flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl px-4 py-3 text-left group">
            <span className="text-xl">🛒</span>
            <span className="text-sm font-bold text-black">SHOP</span>
            <span className="ml-auto text-xs bg-red-500 rounded-full px-2 py-1">
              3
            </span>
          </button>
        </div>

        {/* Character + Middle Panel */}
        <div className="flex-1 flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-md bg-gradient-to-br from-blue-800 via-purple-800 to-red-800 rounded-2xl p-6 shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 px-4 py-1 rounded-full text-xs font-bold shadow-md">
              Online - {formData.weapon || "Alien"}
            </div>
            {editMode ? (
              <input
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Character Image URL"
                className="w-full bg-black bg-opacity-30 p-2 rounded-lg mb-4"
              />
            ) : null}
            <img
              src={formData.photo || "/pirate-character.png"}
              alt="Character"
              className="w-56 h-80 mx-auto object-contain"
            />
            <div className="flex justify-center mt-6 space-x-3">
              {editMode ? (
                <>
                  <input
                    name="weapon"
                    value={formData.weapon}
                    onChange={handleChange}
                    placeholder="Weapon"
                    className="bg-black bg-opacity-30 p-2 rounded-lg w-full"
                  />
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Color"
                    className="bg-black bg-opacity-30 p-2 rounded-lg w-full"
                  />
                </>
              ) : (
                <>
                  <button className="bg-black bg-opacity-30 hover:bg-opacity-40 p-3 rounded-xl transition-all flex items-center justify-center">
                    <span className="text-xl">+</span>
                    <span className="ml-1 text-sm">Slot</span>
                  </button>
                  <button className="bg-black bg-opacity-30 hover:bg-opacity-40 p-3 rounded-xl transition-all flex items-center justify-center">
                    <span className="text-xl">+</span>
                    <span className="ml-1 text-sm">Slot</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="text-sm text-white text-opacity-70 tracking-wide">
            {editMode ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-all"
              >
                Save Changes
              </button>
            ) : (
              "Tap to Change"
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 space-y-3 flex flex-col items-end">
          <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all w-full flex items-center justify-center space-x-2">
            <span>🔗</span>
            <span>Connect</span>
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all w-full flex items-center justify-center space-x-2">
            <span>🔗</span>
            <span>Social</span>
          </button>
          <button className="bg-black bg-opacity-30 hover:bg-opacity-40 p-3 rounded-xl transition-all w-full flex items-center justify-center">
            <span className="text-xl">📊</span>
          </button>
          <button className="relative bg-black bg-opacity-30 hover:bg-opacity-40 p-3 rounded-xl transition-all w-full flex items-center justify-center">
            <span className="text-xl">🎥</span>
            <span className="absolute top-1 right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5">
              3
            </span>
          </button>
          <button className="bg-black bg-opacity-30 hover:bg-opacity-40 p-3 rounded-xl transition-all w-full flex items-center justify-center">
            <span className="text-xl">🛠️</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center mt-8 px-8">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 rounded-xl text-sm font-medium shadow-lg">
          ROOM: {formData.roomCode}
        </div>
        <button 
        onClick={() => setEditMode(false)}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 text-lg font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all">
          FIGHT NOW
        </button>
      </div>

      {/* Edit Form (shown only in edit mode) */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
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
                <label className="block text-sm font-medium mb-1">Photo URL</label>
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
                <label className="block text-sm font-medium mb-1">Room Code</label>
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
    </div>
  );
};
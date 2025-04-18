import { useState } from "react";

export const PlayerProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    weapon: "",
    color: "",
    league: "",
    photo: "",
    xp :"",
    token : "",
    roomCode : ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        gap: "1rem",
        color: "black",
      }}
    >
      <h2>Enter Player Details</h2>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        name="weapon"
        placeholder="Weapon"
        value={formData.weapon}
        onChange={handleChange}
      />
      <input
        name="color"
        placeholder="Favorite Color"
        value={formData.color}
        onChange={handleChange}
      />
      <input
        name="league"
        placeholder="League"
        value={formData.league}
        onChange={handleChange}
      />
      <input
        name="photo"
        placeholder="photo Image URL"
        value={formData.photo}
        onChange={handleChange}
      />
      <input
        name="xp"
        placeholder="XP"
        value={formData.xp}
        onChange={handleChange}
      />

      <input
        name="token"
        placeholder="Token"
        value={formData.token}
        onChange={handleChange}
      />

      <input
        name="roomCode"
        placeholder="Room Code"
        value={formData.roomCode}
        onChange={handleChange}
      />

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "#1e90ff",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </form>
  );
};

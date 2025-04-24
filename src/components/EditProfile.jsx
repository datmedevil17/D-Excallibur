import { CloseOutlined } from "@ant-design/icons";

export const EditProfile = ({ kill, death, xp, token, onBack }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-51">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <CloseOutlined style={{ fontSize: "16px" }} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit profile</h2>
      </div>
    </div>
  );
};

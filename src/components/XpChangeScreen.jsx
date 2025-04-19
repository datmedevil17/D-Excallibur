// components/XpChangeScreen.js
export const XpChangeScreen = ({ kill, death, xp,token, onBack }) => {
    const newXP = Number(kill)*10 - Number(death)*3;
    const getRank = (xp) => {
      if (xp < 100) return "private";
      if (xp < 200) return "corporal";
      if (xp < 300) return "sergeant";
      return "major";
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-51">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Match Summary</h2>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-semibold">Kills:</span> {kill}</p>
            <p><span className="font-semibold">Deaths:</span> {death}</p>
            <p><span className="font-semibold">XP Change:</span> {newXP}</p>
            <p><span className="font-semibold">Token Change:</span> {Math.max(newXP,0)}</p>
            <p><span className="font-semibold">Old Token:</span> {token}</p>
            <p><span className="font-semibold">New Token:</span> {Number(token) + Math.max(Number(newXP), 0)}</p>
            <p><span className="font-semibold">Old Rank:</span> {getRank(Number(xp))}</p>
            <p><span className="font-semibold">New Rank:</span> {getRank(Number(xp) + Number(newXP))}</p>
          </div>
          <button
            onClick={onBack}
            className="mt-6 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };
  
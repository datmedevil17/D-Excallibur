import { DollarOutlined, CloseOutlined, LockOutlined, CheckCircleFilled, FireFilled, ThunderboltFilled } from "@ant-design/icons";
import Colors from "./Colors.json";
import Stats from "./Stats.json";
import { toast } from "react-toastify";
import { mintWeapon, buySkin, approveXToken } from "../contracts/function";
import { useCallback, useState } from "react";
import { platformAddress } from "../contracts/contracts";

export const Shop = ({ onClose, balance, updateBalance, playerWeapons, playerSkins }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('skins');
  const [selectedWeapon, setSelectedWeapon] = useState(Stats[0]);
  const SKIN_PRICE = 20;

  const handleBuyItem = useCallback(async (type, id, price) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      toast.info("Approving transaction...");
      await approveXToken(platformAddress, BigInt(price * 10**18));
      
      if (type === 'weapon') {
        await mintWeapon(id, BigInt(price * 10**18));
      } else {
        await buySkin(id - 1);
      }
      
      toast.success(`${type === 'weapon' ? 'Weapon' : 'Skin'} acquired!`);
      updateBalance();
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, updateBalance]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50">
      <div className="h-full flex max-w-8xl mx-auto">
        {/* Sidebar */}
        <div className="w-80 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur p-6 flex flex-col border-r border-white/5">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Shop
            </h2>
            <div className="bg-yellow-400/10 px-4 py-2 rounded-xl flex items-center gap-2 border border-yellow-400/20">
              <DollarOutlined className="text-yellow-400 text-lg" />
              <span className="text-yellow-400 font-bold text-lg">{balance}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-col gap-3 mb-8">
            {['skins', 'weapons'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-4 rounded-xl text-left transition-all duration-300 hover:translate-x-1
                  ${activeTab === tab 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30'
                  }`}
              >
                <div className="font-bold capitalize text-lg">{tab}</div>
                <div className="text-sm opacity-75">
                  {tab === 'skins' ? 'Character Customization' : 'Combat Arsenal'}
                </div>
              </button>
            ))}
          </div>

          {/* Weapon List - Only show in weapons tab */}
          {activeTab === 'weapons' && (
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {Stats.map((weapon) => (
                <button
                  key={weapon.id}
                  onClick={() => setSelectedWeapon(weapon)}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1
                    ${selectedWeapon.id === weapon.id 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/20">
                      <img 
                        src={weapon.imgUrl} 
                        alt={weapon.name} 
                        className="w-full h-full object-contain p-2" 
                      />
                      {playerWeapons?.[weapon.id - 1] > 0 && (
                        <div className="absolute top-1 right-1">
                          <CheckCircleFilled className="text-green-400 text-lg" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{weapon.name}</div>
                      <div className="text-xs space-x-3 mt-1">
                        <span className="text-orange-400 flex items-center gap-1">
                          <FireFilled /> {weapon.DAMAGE}
                        </span>
                        <span className="text-yellow-400 flex items-center gap-1">
                          <ThunderboltFilled /> {weapon.FIRE_RATE}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <CloseOutlined style={{ fontSize: '24px' }} />
          </button>

          {activeTab === 'skins' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Colors.map((skin) => (
                <div key={skin.id} 
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300
                    ${playerSkins?.[skin.id - 1] 
                      ? 'bg-gradient-to-br from-green-600/10 to-green-900/10 border border-green-500/20' 
                      : 'bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-white/5'
                    }`}
                >
                  <div className="p-6">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-black/20">
                      <img 
                        src={skin.imgUrl} 
                        alt={skin.name} 
                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110" 
                      />
                      {!playerSkins?.[skin.id - 1] && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center">
                          <LockOutlined className="text-4xl text-white/80 mb-2" />
                          <div className="text-sm text-white/60">Locked</div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{skin.name}</h3>
                    {playerSkins?.[skin.id - 1] ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20">
                        <CheckCircleFilled />
                        <span>Equipped</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuyItem('skin', skin.id, SKIN_PRICE)}
                        disabled={isProcessing}
                        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 
                          hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl
                          transition-all duration-300 flex items-center justify-center gap-2 font-medium 
                          shadow-lg shadow-indigo-500/20 disabled:shadow-none"
                      >
                        <DollarOutlined /> {SKIN_PRICE} - Unlock
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Weapon Details
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-white/5">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="relative lg:w-1/3">
                  <div className="aspect-square rounded-xl overflow-hidden bg-black/20">
                    <img 
                      src={selectedWeapon.imgUrl} 
                      alt={selectedWeapon.name} 
                      className="w-full h-full object-contain p-8" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-white mb-6">{selectedWeapon.name}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-black/30 p-6 rounded-xl border border-white/5">
                      <div className="text-orange-400 flex items-center gap-2 mb-2 text-lg">
                        <FireFilled /> Damage
                      </div>
                      <div className="text-3xl font-bold text-white">{selectedWeapon.DAMAGE}</div>
                    </div>
                    <div className="bg-black/30 p-6 rounded-xl border border-white/5">
                      <div className="text-yellow-400 flex items-center gap-2 mb-2 text-lg">
                        <ThunderboltFilled /> Fire Rate
                      </div>
                      <div className="text-3xl font-bold text-white">{selectedWeapon.FIRE_RATE}</div>
                    </div>
                  </div>
                  {playerWeapons?.[selectedWeapon.id - 1] > 0 ? (
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20">
                      <CheckCircleFilled />
                      <span className="text-lg">Ready for Combat</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleBuyItem('weapon', selectedWeapon.id, selectedWeapon.price)}
                      disabled={isProcessing}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 
                        hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl
                        transition-all duration-300 flex items-center gap-3 text-lg font-medium 
                        shadow-lg shadow-purple-500/20 disabled:shadow-none"
                    >
                      <DollarOutlined /> {selectedWeapon.price} - Add to Arsenal
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
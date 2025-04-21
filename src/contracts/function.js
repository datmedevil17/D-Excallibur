import { readContract, writeContract } from "@wagmi/core";
import { config } from "../components/providers";
import { tokenAbi, tokenAddress, platformAbi, platformAddress } from "./contracts"

// XToken Read Functions
export const getXTokenBalance = async (address) => {
  return await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [address],
  });
};

export const getXTokenTotalSupply = async () => {
  return await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "totalSupply",
  });
};

// XToken Write Functions
export const mintXToken = async (to, amount) => {
  return await writeContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "mint",
    args: [to, amount],
  });
};

export const approveXToken = async (spender, amount) => {
  return await writeContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "approve",
    args: [spender, amount],
  });
};

// WeaponProfileSystem Read Functions
export const getProfile = async (address) => {
  return await readContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "profiles",
    args: [address],
  });
};

export const getWeaponBalances = async (address) => {
  return await readContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "getWeaponBalances",
    args: [address],
  });
};

export const getOwnedSkins = async (address) => {
  return await readContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "getOwnedSkins",
    args: [address],
  });
};

export const getXTokenBalanceInPlatform = async (address) => {
  return await readContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "getXTokenBalance",
    args: [address],
  });
};

// WeaponProfileSystem Write Functions
export const setProfile = async (uri, name) => {
  return await writeContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "setProfile",
    args: [uri, name],
  });
};

export const mintWeapon = async (id, amount) => {
  return await writeContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "mintWeapon",
    args: [id, amount],
  });
};

export const buySkin = async (skinId) => {
  return await writeContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "buySkin",
    args: [skinId],
  });
};

export const depositXToken = async (amount) => {
  return await writeContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "depositXToken",
    args: [amount],
  });
};

export const withdrawXToken = async (amount) => {
  return await writeContract(config, {
    abi: platformAbi,
    address: platformAddress,
    functionName: "withdrawXToken",
    args: [amount],
  });
};

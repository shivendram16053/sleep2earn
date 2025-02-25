import { ethers } from "ethers";
import contractABI from "./Sleep2EarnToken.json";

const CONTRACT_ADDRESS = "0x4d9A5d7f408B6e73c92A6084CccdFC6661cb465a";

export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask is required!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
};

import { ethers } from "ethers";
import contractABI from "./Sleep2EarnToken.json";

const CONTRACT_ADDRESS = "0xD91077eC42739F507EFAe933E375E2b1D6DA9e2F"; 

export async function getContract() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return null;
  }
  
  

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
}

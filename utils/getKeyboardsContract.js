// 'ethers' is the library we'll use to get a wallet instance
import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0x5B262c3d59F61d844f705C23aE7A7e491F2416de';
const contractABI = abi.abi;

// Here, we're wrapping those 3 lines of code to get to get the contract into a function
export default function getKeyboardsContract(ethereum) {
    if(ethereum) {
        const  provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        return undefined;
    }
}
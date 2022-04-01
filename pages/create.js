// 'ethers' is the library we'll use to get a wallet instance
import { ethers } from "ethers";

import Router from "next/router";

// These are hooks
// useState: allows you to keep up with local states
// useEffect: is a hook that allows you to invoke a function when the component loads
import { useState, useEffect } from "react";

import PrimaryButton from "../components/primary-button";

import Keyboard from "../components/keyboard";

import abi from "../utils/Keyboards.json"

import getKeyboardsContract from "../utils/getKeyboardsContract";

import { useMetaMaskAccount } from "../components/meta-mask-account-provider";

export default function Create() {

    // Refer to Lines: 61 -> 66 in 'meta-mask-account-provider.js' file
    const { ethereum, connectedAccount, connectAccount } = useMetaMaskAccount();

    // const [ethereum, setEthereum] = useState(undefined); {{ DEFUNCT }}
    // const [connectedAccount, setConnectedAccount] = useState(undefined); {{ DEFUNCT }}

    const [keyboardKind, setKeyboardKind] = useState(0)
    const [isPBT, setIsPBT] = useState(false)
    const [filter, setFilter] = useState('')

    const [mining, setMining] = useState(false)

    const keyboardsContract = getKeyboardsContract(ethereum);

    const contractAddress = '0x5B262c3d59F61d844f705C23aE7A7e491F2416de';
    const contractABI = abi.abi;

    {/* const handleAccounts = (accounts) => { {{ DEFUNCT -- see Lines: 23 + 24 above }}
        if (accounts.length > 0) {
            const account = accounts[0];
            console.log('We have an authorized account: ', account);
            setConnectedAccount(account);
        } else {
            console.log("No authorized accounts yet")
        }
    };

    const getConnectedAccount = async () => { {{ DEFUNCT -- see Lines: 23 + 24 above }}
        if (window.ethereum) {
            setEthereum(window.ethereum);
        }

        if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            handleAccounts(accounts);
        }
    };
    // useEffect(() => getConnectedAccount(), []); {{ DEFUNCT }}
    useEffect(() => getConnectedAccount());

    const connectAccount = async () => { {{ DEFUNCT -- see Lines: 23 + 24 above }}
        if (!ethereum) {
            alert('MetaMask 🦊 is required to connect an account');
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        handleAccounts(accounts);
    };
*/}

    {/* const submitCreate = async (e) => { {{ DEFUNCT }}
        e.preventDefault();

        if (!ethereum) {
            console.error('Ethereum object is required to create a keyboard');
            return;
        }
    */}

    const submitCreate = async (e) => {
        e.preventDefault();

        if (!keyboardsContract) {
            console.error('KeyboardsContract object is required to create a keyboard');
            return;
        }

        setMining(true);
        // The addition of a 'try' block ensures that if the transaction fails for any reason (contd. below)
        // The user does not get stuck in the loading state
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);

            const createTxn = await keyboardsContract.create(keyboardKind, isPBT, filter)
            console.log('Create transaction started...', createTxn.hash)

            await createTxn.wait();
            console.log('Create keyboard!', createTxn.hash);

            Router.push('/');
        } finally {
            setMining(false);
        }
    }

    if (!ethereum) {
        return <p>Please install MetaMask 🦊 to connect to this site</p>
    }

    if (!connectedAccount) {
        return <PrimaryButton onClick={connectAccount}>Connect 🦊 Wallet</PrimaryButton>
    }

    return (

        <div className="flex flex-col gap-y-8">
            <form className="mt-8 flex-col gap-y-6">
                <div>
                    <label htmlFor="keyboard-type" className="block text-sm font-medium text-gray-700">
                        Keyboard Type
                    </label>
                    <select
                        id="keyboard-type"
                        name="keyboard-type"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={keyboardKind}
                        onChange={(e) => { setKeyboardKind(e.target.value) }}
                    >
                        <option value="0">60%</option>
                        <option value="1">75%</option>
                        <option value="2">80%</option>
                        <option value="3">ISO-105</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="keycap-type" className="block text-sm font-medium text-gray-700">
                        Keycap Type
                    </label>
                    <select
                        id="keycap-type"
                        name="keycap-type"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={isPBT ? "pbt" : "abs"}
                        onChange={(e) => { setIsPBT(e.target.value === "pbt") }}
                    >
                        <option value="abs">ABS</option>
                        <option value="pbt">PBT</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                        Filter
                    </label>
                    <select
                        id="filter"
                        name="filter"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        onChange={(e) => { setFilter(e.target.value) }}
                        value={filter}
                    >
                    <option value="">None</option>
                    <option value="sepia">Sepia</option>
                    <option value="grayscale">Grayscale</option>
                    <option value="invert">Invert</option>
                    <option value="hue-rotate-90">Hue Rotate (90°)</option>
                    <option value="hue-rotate-180">Hue Rotate (180°)</option>
                    </select>
                </div>

                {/* Notes ##
                // We use thr create button to indicate that we're waiting for the transaction to be mined
                // We do this by changing the button's text, and disabling it whilst we're waiting
                */}
                <PrimaryButton type="submit" disabled={mining} onClick={submitCreate}>
                    {mining ? "Processing..." : "Create Keyboard"}
                </PrimaryButton>
            </form>
            <div>
                <h2 className="block text-1g font-medium text-gray-700">Preview</h2>
                <Keyboard kind={keyboardKind} isPBT={isPBT} filter={filter} />
            </div>
        </div>
    )
}
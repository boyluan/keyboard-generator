// These are hooks
// useState: allows you to keep up with local states
// useEffect: is a hook that allows you to invoke a function when the component loads
import { useState, useEffect } from "react";

import PrimaryButton from "../components/primary-button";

import Keyboard from "../components/keyboard";

import abi from "../utils/Keyboards.json"

// 'ethers' is the library we'll use to get a wallet instance
import { ethers } from "ethers";

import addressesEqual from "../utils/addressesEqual";

// import { UserIcon } from "@heroicons/react/solid"; // See Link: <https://heroicons.com/>

import { TagIcon } from "@heroicons/react/outline"; // See Link: <https://heroicons.com/>

// import { UserIcon } from "@heroicons/react/outline"; // See Link: <https://heroicons.com/>

import TipButton from "../components/tip-button";

import getKeyboardsContract from "../utils/getKeyboardsContract";

// We can add toast notifications using the react-hot-toast library (contd. below)
// We've already used the CLI to install: yarn add react-hot-toast
// And updated our _app.js file to include the toast-notification-displayer (see Line: 5)
import { toast } from "react-hot-toast"

import { useMetaMaskAccount } from "../components/meta-mask-account-provider";

// import WebFont from "webfontloader";

export default function Home() {
  // Refer to Lines: 61 -> 66 in 'meta-mask-account-provider.js' file
  const { ethereum, connectedAccount, connectAccount } = useMetaMaskAccount();

  // Add 2 state variables

  // When MetaMask is installed, it sets 'window.ethereum' to an object
  // And this allows us to call functions on MetaMask AND on the Ethereum blockchain
  // We're going to store that in our 'ethereum' state when it's available
  // const [ethereum, setEthereum] = useState(undefined); {{ DEFUNCT }}

  // Our 'connectedAccount' will store the address of the account that is logged in
  // This will be your wallet address once we have everything hooked up!
  // const [connectedAccount, setConnectedAccount] = useState(undefined); {{ DEFUNCT }}

  // We use this state to hold the retrieved keyboards
  const [keyboards, setKeyboards] = useState([]);

  // We created a form with a single input to describe our keyboard (see from Line: 132)
  // Thus, we must add a state variable to hold the value for this input
  // const [newKeyboard, setNewKeyboard] = useState("")

  const [keyboardsLoading, setKeyboardsLoading] = useState(false);

  const keyboardsContract = getKeyboardsContract(ethereum);

  // There are 2 pieces of data that our dApp needs, in order to connect to our smart contract (contd. below)
  // 1) Its deployed address
  // 2) and its .abi (Application Binary Interface)
  // The ABI: describes all of the functionality that the smart contract has (contd. below)
  // It's a way of describing the interface of our smart contract
  // As it tells our app i) what functions can be called ii) how they can be called iii) and what they return

  // const contractAddress = '0xf7f6c3b5c6e99C3150054deFF9c7C700F62E37c3' {{ DEFUNCT }}
  const contractAddress = '0x4c3E130BBC0930896C28AbFABAe2d600309dfD64';
  const contractABI = abi.abi;

  // The 'handAccounts' function just gets us the first account, if there are any
  // And sets 'connectedAccount' (see Line: 25)
  // It also has some debug logging
  {/* const handleAccounts = (accounts) => { {{ DEFUNCT -- see Lines: 31 + 32 above }}
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };
*/}

  {/* const getConnectedAccount = async () => { {{ DEFUNCT -- see Lines: 31 + 32 above }}
    // Note that window doesn't exist server-side, so we need to make sure this function only runs on the client
    // server-side = smart contract ## client = dApp
    // It sets the 'ethereum' state to the 'window.ethereum' provided by MetaMask
    if (window.ethereum) {
      setEthereum(window.ethereum);
    }

    if (ethereum) {
      // Here, we have our first request to MetaMask
      // This requests the accounts from MM that have been connected to our dApp
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      // console.log({accounts});
      handleAccounts(accounts);
    }
  };
  // We have a 'useEffect' so that 'getConnectedAccount' function runs on the client, when the web page is loaded
  // useEffect(() => getConnectedAccount(), []); {{ DEFUNCT }}
  useEffect(() => getConnectedAccount());
*/}

  {/* const connectAccount = async () => { {{ DEFUNCT -- see Lines: 31 + 32 above }}
    if (!ethereum) {
      alert('MetaMask is required to connect an account');
      return;
    }

    // Here, we see another request to MetaMask 🦊 -- 'eth_requestAccounts'
    // This will actually open MM 🦊 and ask the user to give permission to connect to the dApp
    // It;; return us whichever account they authorize
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // We only want to deal with 1 account, so we call our 'handleAccounts' function again (See Line: 20), to select the first one 
    // console.log({accounts});
    handleAccounts(accounts);
  };
*/}

  {/* // We add a 'submitCreate' function, which runs when the submit button is clicked
  const submitCreate = async (e) => {
    e.preventDefault();

    if (!ethereum) {
      console.error('Ethereum object is required to create a keyboard');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);

    const createTxn = await keyboardsContract.create(newKeyboard);
    console.log('Create transaction started...', createTxn.hash);

    await createTxn.wait();
    console.log('Created keyboard!', createTxn.hash);

    await getKeyboards();

    // ## Notes ##
    // We're getting the provider, signer, and smart contract in exactly the same way as the getKeyboards function
    // And then we're calling the create function on our smart contract
    // Essentially: our create function returns a transaction and we await that

    // Once our transaction has been confirmed, we call 'getKeyboards()' again, to get the latest state
  } */}

  // This function is just getting data from the blockchain - there's no transaction here
  const getKeyboards = async () => {
    if (keyboardsContract && connectedAccount) {
      setKeyboardsLoading(true);
      try {
        // We use the code on Lines 127 + 128 each time we want to make a call on behalf of the connected account in MM 🦊
        // It just gets us a signer who can call contracts
        // 'Signers' is just a fancy name for an Ethereum account (contd. below)
        // And it can call contracts and make transactions
        // const provider = new ethers.providers.Web3Provider(ethereum); {{ DEFUNCT }}
        // const signer = provider.getSigner(); {{ DEFUNCT }}
        // Here, we're using that information about our smart contract
        // Once we have this, we can make calls to it
        // const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer); {{ DEFUNCT }}

        // Here, we're calling a function on/from our smart contract (the 'getKeyboards' function)
        // It's skin to calling a backend server API
        // Note: that the function name is exact the same as the one we defined in our smart contract (see Line: 7 in Keyboards.sol)
        const keyboards = await keyboardsContract.getKeyboards();

        // And once we've fetched they keyboards from the contract:
        // We just log them out and record them in that 'keyboards' variable
        console.log('Retrieved keyboards...', keyboards)

        setKeyboards(keyboards)
      } finally {
        setKeyboardsLoading(false)
      }
    }
  }
  // The dependency array now includes '!!keyboardsContract'
  // Which is just a fancy way to make sure it runs we go from now having the contract available, to having it defined
  useEffect(() => getKeyboards(), [!!keyboardsContract, connectedAccount])


  const addContractEventHandlers = () => {
    if (keyboardsContract && connectedAccount) {
      keyboardsContract.on('KeyboardCreated', async (keyboard) => {
        if (connectedAccount && !addressesEqual(keyboard.owner, connectedAccount)) {
          toast('Somebody created a new keyboard', { id: JSON.stringify(keyboard) })
        }
        await getKeyboards();
      })

      // Here, we add a second handler for TipSent
      // This time, we're using the 'amount' from the emitted event, as part of the toast notification
      keyboardsContract.on('TipSent', (recipient, amount) => {
        if (addressesEqual(recipient, connectedAccount)) {
          toast(`You received a tip of ${ethers.utils.formatEther(amount)} eth`, { id: recipient + amount });
        }
      })
    }
  }
  useEffect(addContractEventHandlers, [!!keyboardsContract, connectedAccount]);

  // ## We have 3 returns (i.e. states)

  // If 'ethereum' is missing, then our DApp can't do much
  // So we ask the user to install MetaMask, so they can log in and use it
  // State #1
  if (!ethereum) {
    return <p>Please install MetaMask to connect to this site</p>
  }

  // If there's no connected account, then we render a connect button
  // Moving into our second state means (contd. below):
  // We have MM 🦊 (and there ethereum is defined)
  // But we don't have an account connected -- therefore we render a button to connect an account
  // Clicking on this button will run our 'connectAccount' function (see Line: 48)
  // State #2
  if (!connectedAccount) {
    return <PrimaryButton onClick={connectAccount}>Connect 🦊 Wallet</PrimaryButton>
  }

  // If there is a connected account, then we display it
  // i.e. 1) If you reload the dApp 2) Click the button and authorize a MM 🦊 account
  // 3) Then you should get the 3rd state showing that you're connected
  // State #3
  if (keyboards.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">Create a Keyboard</PrimaryButton>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {keyboards.map(
            ([kind, isPBT, filter, owner], i) => (
              <div key={i} className="relative">
                <Keyboard key={i} kind={kind} isPBT={isPBT} filter={filter} />
                <span className="absolute top-1 right-6">
                  {addressesEqual(owner, connectedAccount) ?
                    <TagIcon className="h-5 w-5 text-black" /> :
                    // <TipButton ethereum={ethereum} index={i} /> {{ DEFUNCT }}
                    <TipButton keyboardsContract={keyboardsContract} index={i} />
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>
    )
  }

  if (keyboardsLoading) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">Create a Keyboard</PrimaryButton>
        <p>Loading Keyboards...</p>
      </div>
    )
  }

  // No keyboards yet
  return (
    <div className="flex flex-col gap-4">
      <PrimaryButton type="link" href="/create">Create a Keyboard</PrimaryButton>
      <p>No keyboards yet!</p>
    </div>
  )


  // return <p>Connected Account: {connectedAccount}</p> {{ DEFUNCT }}
  {/* return (
    <div className="flex flex-col gap-y-8">
      <form className="flex flex-col gap-y-2">
        <div>
          <label htmlFor="keyboard-description" className="block text-sm font-medium text-gray-700">
            Keyboard Description
          </label>
        </div>
        <input
          name="keyboard-type"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={newKeyboard}
          onChange={(e) => { setNewKeyboard(e.target.value) }}
        />
        <PrimaryButton type="submit" onClick={submitCreate}>
          Create Keyboard
        </PrimaryButton>
        </form>
        {/* On the next line, we're just mapping over our keyboard state (contd. below)
        // And writing each keyboard in its own paragraph
        {{ REDACTED close bracket -- see Line: xxx }}
        <div>{keyboards.map((keyboard, i) => <p key={i}>{keyboard}</p>)}</div>
      </div>
  )*/}
}

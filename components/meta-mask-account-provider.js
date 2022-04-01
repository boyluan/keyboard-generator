import { useState, useEffect, createContext, useContext } from "react";
import { networks } from '../utils/networks';

const MetaMaskAccountContext = createContext();

export default function MetaMaskAccountProvider({children}) {
    const [ethereum, setEthereum] = useState(undefined);
    const [connectedAccount, setConnectedAccount] = useState(undefined);

    // Create a stateful variable to store the network next to all the others
	const [network, setNetwork] = useState('');

    // We can add some logic to tell the user if they're using the wrong chain
    // And since we've extracted our Ethereum logic into that MetaMaskProvider (contd. below)
    // We can add a check here, instead of having to update multiple pages
    const setEthereumFromWindow = async () => {
        if(window.ethereum) {
            // Reload if chain changes
            // See: <https://docs.metamask.io/guide/ethereum-provider.html#chainchanged>
            // Below is an event handler that reload the page, if the chain changes
            // This lets the user fix the issue by simply changing their chain in MetaMask 🦊
            // The page will then refresh with the correct chain, and everything will load as expected.
            // Likewise if they change the chain from Rinkeby after connecting, we'll reload to that error state (see Line: 32)
            window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
            // We now check the user's network 'chain ID'
            // Here, we make a new call to 'eth_chainId'
            // And this returns the connected chain ID
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setNetwork(networks[chainId]);
            // Rinkeby has ID 4 (0x4 in hex), so that's what we expect to get back
            const rinkebyId = '0x4'; // See: <https://docs.metamask.io/guide/ethereum-provider.html#chain-ids>
            // If Rinkeby is the connected chain, then we set ethereum as before/as intended
            if(chainId === rinkebyId) {
                setEthereum(window.ethereum);
                // If it is NOT the connected chain, then we just alert the user that they need to use the Rinkeby network
                // Our dApp will not work without it!
            } else {
                alert('Please use Rinkeby network');
            }
        };
    }
    useEffect(() => setEthereumFromWindow(), [])

    const handleAccounts = (accounts) => {
        if (accounts.length > 0) {
            const account = accounts[0];
            console.log('We have an authorized account: ', account);
            setConnectedAccount(account);
        } else {
            console.log("No authorized accounts yet")
        }
    };

    const getConnectedAccount = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            handleAccounts(accounts);
        }
    };
    useEffect(() => getConnectedAccount());

    const connectAccount = async () => {
        if (!ethereum) {
            console.error('Ethereum object is required to connect an account');
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        handleAccounts(accounts);
    };

    // What's new is that this component uses React context (contd. below)
    // Thus, it makes everything in this line available to its children
    // So any child of this component can access 'ethereum', it can access 'connectedAccount'
    // And it can call the 'connectAccount' function
    const value = {ethereum, connectedAccount, connectAccount};

    return (
        <MetaMaskAccountContext.Provider value={value}>
            {children}
        </MetaMaskAccountContext.Provider>
    )

    // ##
    // This component is effectively hiding away all the detail about how ethereum gets set
    // And what happens when we actually call 'connectAccount'
    // It's all the same as we've already seen, it just doesn't have to be exposed to our pages anymore

    // ##
    // To use this, we need it to be the parent of each page in our dApp
    // And that is what 'pages/_app.js' is for
    // We used and amended this file when we added the <Toaster /> to display notifications
    // This time we're going to add our 'MetaMaskAccountProvider' as a parent component there
    // See Lines: 7 + 9 -> 16
}

// NB ##
// A component has our ethereum and connectedAccount state variables
// And it also has our logic to 'setEthereum', our 'getConnectedAccount' function, and our 'connectAccount' function
// These are all exactly the same as we've seen before in the other files

// The function below is just a way for us to access these returned values
// It's a bit nicer than calling 'useContext' in all of our pages, because it tells us exactly what's being provided
export function useMetaMaskAccount() {
    return useContext(MetaMaskAccountContext);
}
import { useState, useEffect, createContext, useContext } from "react";


const MetaMaskAccountContext = createContext();

export default function MetaMaskAccountProvider({children}) {
    const [ethereum, setEthereum] = useState(null);
    const [connectedAccount, setConnectedAccount] = useState(null);
    console.log("hello")

	const [network, setNetwork] = useState('');

    const setEthereumFromWindow = async () => {
        if(window.ethereum) {
            window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            // setNetwork(networks[chainId]);
            const rinkebyId = '0x4';
            if(chainId === rinkebyId) {
                setEthereum(window.ethereum);
            
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

    const value = {ethereum, connectAccount, connectedAccount};

    return (
        <MetaMaskAccountContext.Provider value={ {ethereum, connectedAccount, connectedAccount} }>
            {children}
        </MetaMaskAccountContext.Provider>
    )

}

export function useMetaMaskAccount() {
    return useContext(MetaMaskAccountContext);
}

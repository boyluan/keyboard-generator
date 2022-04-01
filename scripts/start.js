async function main() {
    const provider = hre.ethers.getDefaultProvider()

    // 'Signers' is just a fancy name for an Ethereum account (contd. below)
    // And it can call contracts and make transactions
    // Our localized Ethereum network comes with a bunch of them -- we're getting the first 2
    // But so far, everything we've done has been with that 'owner' account
    const [owner, somebodyElse] = await hre.ethers.getSigners();

    // Here, we are getting our 'Keyboards.sol' contract
    // This requires us to have the contract in that 'contracts/' directory
    // And the name needs to match our file under that
    // hre.ethers is auto-imported when we run it using hardhat. You don't need to import anything
    const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");

    // The next line creates a 'deploy' transaction for our contract
    const keyboardsContract = await keyboardsContractFactory.deploy();

    // The third line waits for it to complete
    // Everything that writes to the blockchain is a transaction, including deploying a contract
    // And we always have to wait for a transaction to be mined
    await keyboardsContract.deployed();

    // A deployed contract as an address (contd. below)
    // Which is how things such as a dApp (decentralized web app) can connect to it
    // console.log("Contract deployed to:", keyboardsContract.address); {{ DEFUNCT }}

    // We're calling the 'getKeyboards()' function that we defined in our function (contd. below)
    // Ref. Line: 7 in our Keyboards.sol smart contract
    // const keyboards = await keyboardsContract.getKeyboards(); {{ DEFUNCT }}
    // let keyboards = await keyboardsContract.getKeyboards(); {{ DEFUNCT }}

    // Random solidity note: you don't have to initialize arrays (contd. below)
    // Our 'createdKeyboards' variable is automatically an empty array
    // So we're good to just return it here
    // NOTE: An array variable is actually a function, and it takes an index as a parameter, and returns it at that index
    // const keyboards = await keyboardsContract.createdKeyboards; {{ DEFUNCT }}

    // Which then returns our 'createdKeyboards;' variable (see Line: 31 -- Keyboards.sol)
    // And once this variable has been returned, it logs the line below
    // console.log("We got the keyboards!", keyboards); {{ DEFUNCT }}

    // To update contract state, we need a TRANSACTION
    // So when we call 'create' (ref. function @ Line: 54 -- in Keyboards.sol), it returns a transaction
    // const keyboardTxn = await keyboardsContract.create("A really great keyboard!"); {{ DEFUNCT }}

    // ##

    // Now that we've changed our smart contract, running the start.js script will error out
    // This is because we're calling the OLD version of 'create'
    // So we can update our start.js script to test our amended smart contract code (contd. below)
    // By changing the 'main' function (see Line: 1)
    // const keyboardTxn1 = await keyboardsContract.create("A really great keyboard!"); {{ DEFUNCT }}

    // const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia"); {{ DEFUNCT }}
    // We then call (Line 58), to wait for it to be mined.
    // Once it has been mined, the state will have been updated in our contract
    // And our next call to get the keyboards, returns it
    // await keyboardTxn.wait(); {{ DEFUNCT }}
    // await keyboardTxn1.wait(); {{ DEFUNCT }}

    // Here, we're connecting our second signer to the contract - and then calling 'create' again
    // Basically a different user just created a keyboard!
    // const keyboardTx2 = await keyboardsContract.connect(somebodyElse).create("An even better keyboard!"); {{ DEFUNCT }}

    // const keyboardTxn2 = await keyboardsContract.connect(somebodyElse).create(1, false, "grayscale"); {{ DEFUNCT }}
    // await keyboardTxn2.wait(); {{ DEFUNCT }}

    // NB:
    // ## Updating the state of a variable in a contract (via a TRANSACTION), will update it for everyone
    // ## Having multiple users creating transactions doesn't change the contract -- just update your .js file

    {/* keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards); */}

    // When we save a keyboard, we're storing the address that created it

    // keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards(); {{ DEFUNCT }}
    // console.log("And as somebody else!", keyboards); {{ DEFUNCT }}

    // const balanceBefore = await hre.ethers.provider.getBalance(somebodyElse.address); {{ DEFUNCT }}
    // console.log("somebodyElse balance before", hre.ethers.utils.formatEther(balanceBefore)); {{ DEFUNCT }}

    // This is where the owner tips the owner of the second keyboard (i.e. somebodyElse) 1,000 eth
    // Hardhat gives all our local accounts 10,000 ETH each
    // This is the part we'll want to use for our dApp
    // This is how we call our new tip function and send eth as part of our call
    // const tipTxn = await keyboardsContract.tip(1, {value: hre.ethers.utils.parseEther("1000")}); // tip the 2nd keyboard as owner {{ DEFUNCT }}
    // await tipTxn.wait(); {{ DEFUNCT }}

    // NB:
    // # We make the payment in wei --the smallest denomination of an ether
    // # 1 ether = 1,000,000,000,000,000,000 wei (10^18)
    // The 'ethers' library includes some functions to convert between wei and ether (contd. below)
    // This is so that we don't need to try and type out that long number in our code
    // So we use 'parseEther("1000") to convert 1000 ether to 10^21 wei
    // Note that when we get the balance, we get that in wei as well
    // Thus we use formatEther to convert that to ether

    // const balanceAfter = await hre.ethers.provider.getBalance(somebodyElse.address) {{ DEFUNCT }}
    // console.log("somebodyElse balance after", hre.ethers.utils.formatEther(balanceAfter)); {{ DEFUNCT }}

    // 'keyboardTxnReceipt' ia the response from the code on (Line: 107)
    // And it includes information about the transaction
    // One of the things it includes, is a list of events emitted by the transaction
    const keyboardTxn = await keyboardsContract.create(0, true, "sepia");
    // const keyboardTxnReceipt = await keyboardTxn.wait(); {{ DEFUNCT }}
    // console.log(keyboardTxnReceipt.events); {{ DEFUNCT }}
    await keyboardTxn.wait();

    const tipTxn = await keyboardsContract.connect(somebodyElse).tip(0, {value: hre.ethers.utils.parseEther("1")})
    const tipTxnReceipt = await tipTxn.wait();
    console.log(tipTxnReceipt.events);


}

// The following pattern is recommended, to be able to use 'async/await' everywhere
// And to properly handle errors
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
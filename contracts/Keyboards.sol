// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Keyboards {
    // We're going to use an enum to store the type of a keyboard
    // This allows us to make sure we're always using a supported value
    enum KeyboardKind {
        SixtyPercent,
        SeventyFivePercent,
        EightyPercent,
        Iso105
    }

    // Now we can add a keyboard STRUCT (contd. below)
    // Structs in Solidity allows developers to create their own complex data types
    // Here, our struct is a container that stores multiple fields that describe a single keyboard
    struct Keyboard {
        KeyboardKind kind;
        // ABS = false, PBT = true
        bool isPBT;
        // tailwind filters to layer over
        string filter;
        // person who created it
        address owner;

        // This contains a field 'kind' that contains a value from the above enum (ref. Line: 7)
    }

    // Our smart contract can emit (sends) events, and our dApp can listen for them and take action
    // Here, we update the contract to emit and event whenever a user creates a keyboard
    // Next, we update our 'create' function to emit that event at the end (see Line: 63)
    event KeyboardCreated(
        Keyboard keyboard
    );

    // We'll also add in an event for when a user is tipped
    // This will allow us to tell others when they have received a tip on our site
    event TipSent(
        address recipient,
        uint256 amount
    );

    // Now we can change our 'createdKeyboards' variable to hold an array of 'Keyboard' instead of just strings
    // We'll initially get some errors in the returns for the 'getKeyboards' and 'create' functions (contd. below)
    // And this is because our existing functions expected to be creating and returning [strings]
    // But they are now needing to deal with 'Keyboard' objects
    // string[] public createdKeyboards; {{ DEFUNCT }}
    Keyboard[] public createdKeyboards;

    /* function getKeyboards() view public returns(string[] memory) {
        return createdKeyboards;
    } {{ DEFUNCT }} */

    // ## ##

    // The 'getKeyboards' function is easier to fix - we just change its return type
    function getKeyboards() view public returns(Keyboard[] memory) {
        return createdKeyboards;
    }

    // ## ##

    // Amending the 'create' function is more complex, however (contd. below)
    // We need to pass it each of the values in our struct, and then build up an instance of that struct
    // Then we can add that to our array

    /* function create(string calldata _description) external {
        createdKeyboards.push(_description);
    } {{ DEFUNCT }} */

    function create(
        KeyboardKind _kind,
        bool _isPBT,
        string calldata _filter
    ) external {
        Keyboard memory newKeyboard = Keyboard({
            kind: _kind,
            isPBT: _isPBT,
            filter: _filter,
            // In any Solidity function, 'msg.sender' is always set to the address that called the function
            owner: msg.sender

            // And this is the upside of an account having to be connected to our dApp before we can call any functions of the smart contract (contd. below)
            // Every function call is made by an address that we can access in the function
        });

        createdKeyboards.push(newKeyboard);
        emit KeyboardCreated((newKeyboard));
    }

    // This function is marked as 'payable'
    // This means that when we call it, we can sent it eth
    // This is really cool because the smart contract can do whatever it wants with the money that's sent to it
    // It can even just hold onto it, if it wants to
    // A smart contract has its own balance. You can see that in Etherscan
    function tip(uint256 _index) external payable {
        address payable owner = payable(createdKeyboards[_index].owner);
        // In this case, we're immediattely paying the owner of the keyboard whatever eth is sent to us
        // And we do so, by calling the line of code below ↓↓
        owner.transfer(msg.value);

        // 'msg.value' works similarly to what we saw with msg.sender
        // Except that it is only available on PAYABLE FUNCTIONS
        // We'd get a compiler error if our function wasn't payable
        // It's set to whatever payment has been made to the function

        // Now we update out 'tip' function to emit the 'TipSent' event
        emit TipSent(owner, msg.value);

        // ##
        // You can get fancy with the code, if you like
        // Such as stipulating a minimum amount for tips (e.g. 0.5 eth) - the function can check that
        // Or perhaps you want the smart contract to hold on to a percentage of tips, as a service fee
    }
}
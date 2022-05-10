pragma solidity ^0.4.0;

contract HelloWorld {
    string value;

    constructor() public {
        value = "HelloWorld!";
    }

    function get() public view returns (string memory) {
        return value;
    }

    function set(string memory v) public {
        value = v;
    }
}

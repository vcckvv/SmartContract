// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, ERC721Enumerable, Ownable {
    
	string[] uriArr;
 
	constructor() ERC721("NFT Token", "NFT") {
		
	}
	
	//example1: ipfs://QmUtb97bLLNPYTYPzCPxuLhu3q4kRcMzhtrW7W5xJVgr9B
	//example2: https://ipfs.io/ipfs/QmUtb97bLLNPYTYPzCPxuLhu3q4kRcMzhtrW7W5xJVgr9B
	//example3: data:application/json;base64,eyJuYW1lIjoicmFCaXQiLCJkZXNjcmlwdGlvbiI6InJhQml0IiwiaW1hZ2UiOiJodHRwczovL2lwZnMuaW8vaXBmcy9RbVJUaFBQQjFQRXNTNnRTS2RRWDRwMlVEbThNMUVWeERIckJ2dVR4OWRudkZlIn0=
	function mint(string memory uri) public {
		require(bytes(uri).length > 0);

		_safeMint(msg.sender, uriArr.length);
		uriArr.push(uri);
	}

	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(tokenId < uriArr.length);

		return uriArr[tokenId];
	}

	function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId);
	}

	function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
		return super.supportsInterface(interfaceId);
	}
}

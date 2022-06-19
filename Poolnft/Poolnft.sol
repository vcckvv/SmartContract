// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./ERC721.sol";
import "./TreeLibrary.sol";

struct IDTree{
	TreeLibrary.Tree tree;
}

library IDTreeLib{
	using TreeLibrary for TreeLibrary.Tree;
	
	function root(IDTree storage self) external view returns (uint _key) {
		_key = self.tree.root;
	}
	
	function first(IDTree storage self) external view returns (uint _key) {
		_key = self.tree.first();
	}
	
	function last(IDTree storage self) external view returns (uint _key) {
		_key = self.tree.last();
	}
	
	function next(IDTree storage self, uint key) external view returns (uint _key) {
		_key = self.tree.next(key);
	}
	
	function prev(IDTree storage self, uint key) external view returns (uint _key) {
		_key = self.tree.prev(key);
	}
	
	function exists(IDTree storage self, uint key) external view returns (bool _exists) {
		_exists = self.tree.exists(key);
	}
	
	function isEmpty(IDTree storage self) external view returns (bool) {
		return self.tree.isEmpty();
	}

	function getCount(IDTree storage self) external view returns (uint) {
		return self.tree.getCount();
	}

	//////////////////////////////////////////

	function insert(IDTree storage self, uint _key) external {
		self.tree.insert(_key);
	}
	
	function remove(IDTree storage self, uint _key) external {
		self.tree.remove(_key);
	}

}

struct NFTSave{
	string uri;
	address creator;
	string title;
	uint hash;
}

struct NFTData{
	string uri;
	address creator;
	string creatorName;
	address owner;
	string ownerName;
	string title;
	uint hash;

	AuctionData auctionData;
}

struct AuctionData{
	bool isActive;
	uint endTime;//拍賣結束時間
	uint directPrice;//直購價
	uint nowPrice;//目前拍賣價
	address bidder;//目前出價人
}

enum LogType{
	StartAuction, StopAuction, Bid, Trade, Send, SendFail
}

struct LogData{
	LogType logType;

	address owner;//fromAddr
	address bidder;//toAddr
	uint tokenID;

	uint endTime;
	uint directPrice;
	uint nowPrice;//bidPrice、sendValue

	uint time;
}

library PoolnftLib{
	using IDTreeLib for IDTree;

	event Log(LogType logType, address indexed owner, address indexed bidder, uint indexed tokenID,
		uint endTime, uint directPrice, uint nowPrice, uint time);

	function startAuctionLog(address owner, uint tokenID, uint endTime, uint directPrice, uint nowPrice) public {
		emit Log(LogType.StartAuction, owner, address(0), tokenID, endTime, directPrice, nowPrice, block.timestamp);
	}

	function stopAuctionLog(address owner, uint tokenID) public {
		emit Log(LogType.StopAuction, owner, address(0), tokenID, 0, 0, 0, block.timestamp);
	}

	function bidLog(address owner, address bidder, uint tokenID, uint nowPrice) public {
		emit Log(LogType.Bid, owner, bidder, tokenID, 0, 0, nowPrice, block.timestamp);
	}

	function tradeLog(address owner, address bidder, uint tokenID, uint nowPrice) public {
		emit Log(LogType.Trade, owner, bidder, tokenID, 0, 0, nowPrice, block.timestamp);
	}

	function sendLog(address toAddr, uint sendValue, bool isFail) public {
		emit Log(isFail ? LogType.SendFail : LogType.Send, address(0), toAddr, 0, 0, 0, sendValue, block.timestamp);
	}

	function tokenData(uint tokenID, NFTSave[] memory nftSaveAr, mapping(address => string) storage addrNameMap,
			mapping(uint => AuctionData) storage auctionMap, Poolnft poolnft) 
			external view returns (NFTData memory data){

		require(poolnft.isToken(tokenID) );

		data.uri=nftSaveAr[tokenID].uri;

		data.creator=nftSaveAr[tokenID].creator;
		data.creatorName=addrNameMap[data.creator];

		data.owner=poolnft.ownerOf(tokenID);
		data.ownerName=addrNameMap[data.owner];

		data.title=nftSaveAr[tokenID].title;
		data.hash=nftSaveAr[tokenID].hash;
		
		data.auctionData=auctionMap[tokenID];
	}

	function tokensData(uint[] memory tokenIDAr, NFTSave[] memory nftSaveAr,
			mapping(address => string) storage addrNameMap,
			mapping(uint => AuctionData) storage auctionMap, Poolnft poolnft
			) external view returns (NFTData[] memory dataAr) {
		
		dataAr=new NFTData[](tokenIDAr.length);

		for(uint i=0; i<tokenIDAr.length; i++){

			uint tokenID=tokenIDAr[i];
			if(tokenID==0){
				break;
			}
			
			require(poolnft.isToken(tokenID) );

			dataAr[i].uri=nftSaveAr[tokenID].uri;

			dataAr[i].creator=nftSaveAr[tokenID].creator;
			dataAr[i].creatorName=addrNameMap[dataAr[i].creator];

			dataAr[i].owner=poolnft.ownerOf(tokenID);
			dataAr[i].ownerName=addrNameMap[dataAr[i].owner];

			dataAr[i].title=nftSaveAr[tokenID].title;
			dataAr[i].hash=nftSaveAr[tokenID].hash;

			dataAr[i].auctionData=auctionMap[tokenID];
		}
	}

	function getOwnData(uint startIdx, uint size, IDTree storage idTree, Poolnft poolnft)
			external view returns (NFTData[] memory dataAr) {

		uint[] memory idAr=new uint[](size);
		
		uint id=idTree.first();
		uint lastID=idTree.last();
		uint i=0;
		while(true){
			if(i>=startIdx){
				idAr[i-startIdx]=id;

				if(i-startIdx == size-1){
					break;
				}
			}
			i++;

			if(id==lastID){
				break;
			}
			id=idTree.next(id);
		}

		return poolnft.tokensData(idAr);
	}

	function sendOrgCoin(address addr, uint value) public {
		if(payable(addr).send(value)==false){
			//遇到特殊合約可能出錯，這裡跳過錯誤，避免被卡住
			sendLog(addr, value, true);
		}
		else{
			sendLog(addr, value, false);
		}
	}

	function getAuctionNFTData(uint startIdx, uint size, IDTree storage idTree, Poolnft poolnft)
			external view returns (NFTData[] memory dataAr) {
		
		uint[] memory idAr=new uint[](size);
		
		uint id=idTree.first();
		uint lastID=idTree.last();
		uint i=0;
		while(true){
			if(i>=startIdx){
				idAr[i-startIdx]=id;

				if(i-startIdx == size-1){
					break;
				}
			}
			i++;

			if(id==lastID){
				break;
			}
			id=idTree.next(id);
		}

		return poolnft.tokensData(idAr);
	}

	function startAuction(uint tokenID, uint endTime, uint directPrice, uint nowPrice,
			mapping(uint => AuctionData) storage auctionMap,
			mapping(address => IDTree) storage userAuctionMap,
			Poolnft poolnft) external {

		require(poolnft.isToken(tokenID) );
		require(poolnft.ownerOf(tokenID)==msg.sender && directPrice>0 && nowPrice>0 && directPrice>=nowPrice);

		auctionMap[tokenID]=AuctionData(true, endTime, directPrice, nowPrice, address(0) );
		userAuctionMap[msg.sender].insert(tokenID);

		startAuctionLog(msg.sender, tokenID, endTime, directPrice, nowPrice);
	}

	function stopAuction(uint tokenID, mapping(uint => AuctionData) storage auctionMap,
			mapping(address => IDTree) storage userAuctionMap,
			Poolnft poolnft) external {

		require(poolnft.isToken(tokenID) );

		AuctionData storage data=auctionMap[tokenID];

		require(poolnft.ownerOf(tokenID)==msg.sender && data.isActive &&
			(data.bidder==address(0) || data.bidder==msg.sender) );

		if(data.bidder==msg.sender){
			sendOrgCoin(data.bidder, data.nowPrice);

			poolnft.setBidBalance(poolnft.bidBalance()-data.nowPrice);
		}

		data.isActive=false;
		userAuctionMap[msg.sender].remove(tokenID);

		stopAuctionLog(msg.sender, tokenID);
	}

	function bid(uint tokenID, mapping(uint => AuctionData) storage auctionMap,
			mapping(address => IDTree) storage userAuctionMap,
			Poolnft poolnft) external {

		require(poolnft.isToken(tokenID) );

		AuctionData storage data=auctionMap[tokenID];

		require(data.isActive);

		address owner=poolnft.ownerOf(tokenID);

		if(msg.value>=data.directPrice){//時間過了也可以用直購價買
			if(data.bidder!=address(0) ){
				sendOrgCoin(data.bidder, data.nowPrice);
				poolnft.setBidBalance(poolnft.bidBalance()-data.nowPrice);
			}

			sendOrgCoin(owner, msg.value);

			data.isActive=false;
			poolnft.libTransfer(owner, msg.sender, tokenID);

			userAuctionMap[owner].remove(tokenID);

			tradeLog(owner, msg.sender, tokenID, msg.value);
			return;
		}

		require(data.endTime>block.timestamp);

		if(data.bidder==address(0) ){
			require(msg.value>=data.nowPrice);
		}
		else{
			require(msg.value>data.nowPrice);

			sendOrgCoin(data.bidder, data.nowPrice);
			poolnft.setBidBalance(poolnft.bidBalance()-data.nowPrice);
		}

		data.bidder=msg.sender;
		data.nowPrice=msg.value;
		poolnft.setBidBalance(poolnft.bidBalance()+msg.value);

		bidLog(owner, msg.sender, tokenID, msg.value);
	}

	function bidEnd(uint tokenID, mapping(uint => AuctionData) storage auctionMap,
			mapping(address => IDTree) storage userAuctionMap,
			Poolnft poolnft) external {

		require(poolnft.isToken(tokenID) );

		AuctionData storage data=auctionMap[tokenID];
		address owner=poolnft.ownerOf(tokenID);

		require(data.isActive && data.endTime<=block.timestamp);
		require((owner==msg.sender && data.bidder!=address(0) ) || data.bidder==msg.sender);

		sendOrgCoin(owner, data.nowPrice);
		poolnft.setBidBalance(poolnft.bidBalance()-data.nowPrice);

		data.isActive=false;
		poolnft.libTransfer(owner, data.bidder, tokenID);

		userAuctionMap[owner].remove(tokenID);

		tradeLog(owner, data.bidder, tokenID, data.nowPrice);
	}
}

contract Poolnft is ERC721, IERC721Enumerable {
	using IDTreeLib for IDTree;

	address immutable founderAddr;

	NFTSave[] nftSaveAr;
	mapping(address => uint[]) createMap;
	mapping(address => IDTree) ownMap;

	mapping(address => string) addrNameMap;
	mapping(string => address) nameUseMap;

 
	constructor() ERC721("Poolnft", "NFT") {
		founderAddr=msg.sender;
		nftSaveAr.push();//塞入一個空資料，讓ID從1開始，因為IDTree不接受0
	}
	
	function mint(string memory uri, string memory title, uint hash) public {
		require(bytes(uri).length > 0);
		require(bytes(title).length>0 && bytes(title).length <= 60*3);//一個中文字一般3個bytes

		uint id=nftSaveAr.length;
		_safeMint(msg.sender, id);

		nftSaveAr.push(NFTSave(uri, msg.sender, title, hash) );

		createMap[msg.sender].push(id);
		//ownMap[msg.sender].insert(id);在_safeMint中的_beforeTokenTransfer已做
	}
	
	function testMassMint(string memory uri, string memory title, uint hash, uint count) public {
		require(msg.sender==founderAddr);
		require(bytes(uri).length > 0);
		require(bytes(title).length>0 && bytes(title).length <= 60*3);//一個中文字一般3個bytes

		NFTSave memory save=NFTSave(uri, msg.sender, title, hash);

		for(uint i=0; i<count; i++){

			uint id=nftSaveAr.length;
			_safeMint(msg.sender, id);

			nftSaveAr.push(save);
			createMap[msg.sender].push(id);
		}
	}
	
	function isToken(uint tokenID) public view returns (bool) {
		return tokenID > 0 && tokenID < nftSaveAr.length;
	}

	function changeURI(uint tokenID, string memory uri) public {
		require(isToken(tokenID) );
		require(nftSaveAr[tokenID].creator==msg.sender || ownerOf(tokenID)==msg.sender);//擁有者或創作者才能改

		nftSaveAr[tokenID].uri=uri;
	}

	function tokenURI(uint tokenID) public view virtual override returns (string memory) {
		require(isToken(tokenID) );

		return nftSaveAr[tokenID].uri;
	}

	function tokenData(uint tokenID) public view returns (NFTData memory data) {
		
		return PoolnftLib.tokenData(tokenID, nftSaveAr, addrNameMap, auctionMap, this);
	}

	function tokensData(uint[] memory tokenIDAr) public view returns (NFTData[] memory dataAr) {
		
		return PoolnftLib.tokensData(tokenIDAr, nftSaveAr, addrNameMap, auctionMap, this);
	}

	function getTokensData(uint startIdx, uint size) public view returns (NFTData[] memory dataAr) {
		
		uint[] memory idAr=new uint[](size);
		
		for(uint i=startIdx; i<nftSaveAr.length && i<startIdx+size; i++){
			idAr[i-startIdx]=i + 1;
		}

		return tokensData(idAr);
	}

	function getCreateCount(address user) public view returns (uint count) {
		return createMap[user].length;
	}

	function getCreateData(address user, uint startIdx, uint size) public view returns (NFTData[] memory dataAr) {
		
		uint[] memory idAr=new uint[](size);
		
		for(uint i=startIdx; i<createMap[user].length && i<startIdx+size; i++){
			idAr[i-startIdx]=createMap[user][i];
		}

		return tokensData(idAr);
	}

	function getOwnCount(address user) public view returns (uint count) {
		return ownMap[user].getCount();
	}

	function getOwnData(address user, uint startIdx, uint size) public view returns (NFTData[] memory dataAr) {

		IDTree storage idTree=ownMap[user];
		if(idTree.isEmpty() ){
			return dataAr;
		}

		return PoolnftLib.getOwnData(startIdx, size, idTree, this);
	}

	//////////////////////////////////////////////////////////
	//IERC721Enumerable
	//////////////////////////////////////////////////////////

	function totalSupply() external view returns (uint){
		return nftSaveAr.length-1;
	}

	function tokenOfOwnerByIndex(address owner, uint index) external view returns (uint){

		IDTree storage idTree=ownMap[owner];
		require(index < idTree.getCount() );

		uint id=idTree.first();
		uint lastID=idTree.last();
		uint i=0;
		while(true){
			if(i==index){
				return id;
			}
			i++;

			if(id==lastID){
				break;
			}
			id=idTree.next(id);
		}

		revert();
	}

	function tokenByIndex(uint index) external view returns (uint){
		uint id=index+1;
		require(isToken(id) );

		return id;
	}

	function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC721) returns (bool) {
		return interfaceId == type(IERC721Enumerable).interfaceId || super.supportsInterface(interfaceId);
	}

	//////////////////////////////////////////////////////////

	function setName(string memory name) public {
		require(nameUseMap[name]==address(0) );
		require(bytes(name).length>0 && bytes(name).length<60*3);//一個中文字一般3個bytes

		string memory oldName=addrNameMap[msg.sender];
		if(bytes(oldName).length!=0){
			nameUseMap[oldName]=address(0);
		}

		nameUseMap[name]=msg.sender;
		addrNameMap[msg.sender]=name;
	}

	function getName(address addr) public view returns (string memory) {
		return addrNameMap[addr];
	}

	function getNameAddr(string memory name) public view returns (address addr) {
		return nameUseMap[name];
	}

	function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721) {
		
		require(!auctionMap[tokenId].isActive);//拍賣時不能轉移
		
		super._beforeTokenTransfer(from, to, tokenId);
		
		if(from!=address(0) ){
			ownMap[from].remove(tokenId);
		}
		ownMap[to].insert(tokenId);
	}
	
	//////////////////////////////////////////////////////////

	mapping(uint => AuctionData) auctionMap;
	mapping(address => IDTree) userAuctionMap;
	uint public bidBalance=0;
	bool isLibCall=false;

	event Log(LogType logType, address indexed owner, address indexed bidder, uint indexed tokenID,
		uint endTime, uint directPrice, uint nowPrice, uint time);

	function setBidBalance(uint value) external {
		require(isLibCall);

		bidBalance=value;
	}

	function libTransfer(address fromAddr, address toAddr, uint tokenID) external {
		require(isLibCall);

		_transfer(fromAddr, toAddr, tokenID);
	}

	function getAuctionNFTData(address user, uint startIdx, uint size) public view returns (NFTData[] memory dataAr) {
		
		IDTree storage idTree=userAuctionMap[user];
		if(idTree.isEmpty() ){
			return dataAr;
		}

		return PoolnftLib.getAuctionNFTData(startIdx, size, idTree, this);
	}

	function getAuctionCount(address user) public view returns (uint count) {
		return userAuctionMap[user].getCount();
	}

	function startAuction(uint tokenID, uint endTime, uint directPrice, uint nowPrice) public {
		PoolnftLib.startAuction(tokenID, endTime, directPrice, nowPrice, auctionMap, userAuctionMap, this);
	}

	function stopAuction(uint tokenID) public {
		isLibCall=true;
		PoolnftLib.stopAuction(tokenID, auctionMap, userAuctionMap, this);
		isLibCall=false;
	}

	function bid(uint tokenID) public payable {
		isLibCall=true;
		PoolnftLib.bid(tokenID, auctionMap, userAuctionMap, this);
		isLibCall=false;
	}

	function bidEnd(uint tokenID) public {
		isLibCall=true;
		PoolnftLib.bidEnd(tokenID, auctionMap, userAuctionMap, this);
		isLibCall=false;
	}

	//////////////////////////////////////////////////////////

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}

	function getOtherBalance() public view returns (uint) {
		return address(this).balance-bidBalance;
	}

	function withdrawOther(uint value) public{
		require(msg.sender==founderAddr);
		require(value<=getOtherBalance() );
		
		payable(msg.sender).transfer(value);
	}

}

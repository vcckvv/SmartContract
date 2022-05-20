pragma solidity ^0.8.0;
// SPDX-License-Identifier: CC-BY-SA-4.0

contract CoolChat {
	address founderAddr;

	mapping (address => string) 	addrNameMap;
	mapping (string => bool) 		nameUseMap;
	
	address[] writerArray;
	string[] writerNameArray;
	uint256[] timeArray;
	string[] articleArray;


	constructor() {
		founderAddr = msg.sender;
	}

	function getArticleCount() public view returns (uint256 index) {
		return articleArray.length;
	}

	function getArticle(uint256 index) public view returns (address, string memory, uint256, string memory) {
		require(index<articleArray.length);
	
		return (writerArray[index], writerNameArray[index], timeArray[index], articleArray[index]);
	}

	function getArticles(uint256 index, uint256 count) public view returns (address[] memory, string[] memory, uint256[] memory, string[] memory) {
		require(count>=1);
		require(index+count-1<articleArray.length);
		
		address[] memory outWriterArray=new address[](count);
		string[] memory outWriterNameArray=new string[](count);
		uint256[] memory outTimeArray=new uint256[](count);
		string[] memory outArticleArray=new string[](count);
		
		
		for(uint i=0; i<count; i++){
			outWriterArray[i]=writerArray[index+i];
			outWriterNameArray[i]=writerNameArray[index+i];
			outTimeArray[i]=timeArray[index+i];
			outArticleArray[i]=articleArray[index+i];
		}

		return (outWriterArray, outWriterNameArray, outTimeArray, outArticleArray);
	}

	function addArticle(string memory str) public {
		require(bytes(str).length>0 && bytes(str).length<=3000);//utf8中文字最多1000字
		
		writerArray.push(msg.sender);
		writerNameArray.push(addrNameMap[msg.sender]);
		timeArray.push(block.timestamp);
		articleArray.push(str);
	}
	
	function testMassArticle(uint256 num) public {
		require(msg.sender==founderAddr);
	
		string memory name=addrNameMap[msg.sender];
		string[4] memory strArray=["0", "1", "2", "3"];
		
		for(uint i=0; i<num; i++){
			writerArray.push(msg.sender);
			writerNameArray.push(name);
			timeArray.push(block.timestamp);
			articleArray.push(strArray[i%4]);
		}
	}
	
	function isUsedName(string memory name) public view returns (bool) {
		return nameUseMap[name];
	}

	function getWriterName(address addr) public view returns (string memory) {
		return addrNameMap[addr];
	}

	function setWriterName(string memory name) public {
		require(bytes(name).length>0 && bytes(name).length<=90);//utf8中文字最多30字
		require(nameUseMap[name]==false);
		
		string memory oldName=addrNameMap[msg.sender];
		if(bytes(oldName).length!=0){
			nameUseMap[oldName]=false;
		}
		nameUseMap[name]=true;
		addrNameMap[msg.sender]=name;
	}
}

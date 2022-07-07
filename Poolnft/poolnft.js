if(typeof window.ethereum === "undefined"){
	alert("error : 尚未安裝MetaMask，此網頁需要安裝MetaMask才能使用");
	throw new Error();
}

const abi = [{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "operator","type": "address"},{"indexed": false,"internalType": "bool","name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "enum LogType","name": "logType","type": "uint8"},{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "bidder","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenID","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "endTime","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "directPrice","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "nowPrice","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "time","type": "uint256"}],"name": "Log","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "bid","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [],"name": "bidBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "bidEnd","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"},{"internalType": "string","name": "uri","type": "string"}],"name": "changeURI","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"}],"name": "getAuctionCount","outputs": [{"internalType": "uint256","name": "count","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "uint256","name": "startIdx","type": "uint256"},{"internalType": "uint256","name": "size","type": "uint256"}],"name": "getAuctionNFTData","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "uri","type": "string"},{"internalType": "address","name": "creator","type": "address"},{"internalType": "string","name": "creatorName","type": "string"},{"internalType": "address","name": "owner","type": "address"},{"internalType": "string","name": "ownerName","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"components": [{"internalType": "bool","name": "isActive","type": "bool"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"},{"internalType": "address","name": "bidder","type": "address"}],"internalType": "struct AuctionData","name": "auctionData","type": "tuple"}],"internalType": "struct NFTData[]","name": "dataAr","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"}],"name": "getCreateCount","outputs": [{"internalType": "uint256","name": "count","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "uint256","name": "startIdx","type": "uint256"},{"internalType": "uint256","name": "size","type": "uint256"}],"name": "getCreateData","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "uri","type": "string"},{"internalType": "address","name": "creator","type": "address"},{"internalType": "string","name": "creatorName","type": "string"},{"internalType": "address","name": "owner","type": "address"},{"internalType": "string","name": "ownerName","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"components": [{"internalType": "bool","name": "isActive","type": "bool"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"},{"internalType": "address","name": "bidder","type": "address"}],"internalType": "struct AuctionData","name": "auctionData","type": "tuple"}],"internalType": "struct NFTData[]","name": "dataAr","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "addr","type": "address"}],"name": "getName","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"}],"name": "getNameAddr","outputs": [{"internalType": "address","name": "addr","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getOtherBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"}],"name": "getOwnCount","outputs": [{"internalType": "uint256","name": "count","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "uint256","name": "startIdx","type": "uint256"},{"internalType": "uint256","name": "size","type": "uint256"}],"name": "getOwnData","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "uri","type": "string"},{"internalType": "address","name": "creator","type": "address"},{"internalType": "string","name": "creatorName","type": "string"},{"internalType": "address","name": "owner","type": "address"},{"internalType": "string","name": "ownerName","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"components": [{"internalType": "bool","name": "isActive","type": "bool"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"},{"internalType": "address","name": "bidder","type": "address"}],"internalType": "struct AuctionData","name": "auctionData","type": "tuple"}],"internalType": "struct NFTData[]","name": "dataAr","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "startIdx","type": "uint256"},{"internalType": "uint256","name": "size","type": "uint256"}],"name": "getTokensData","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "uri","type": "string"},{"internalType": "address","name": "creator","type": "address"},{"internalType": "string","name": "creatorName","type": "string"},{"internalType": "address","name": "owner","type": "address"},{"internalType": "string","name": "ownerName","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"components": [{"internalType": "bool","name": "isActive","type": "bool"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"},{"internalType": "address","name": "bidder","type": "address"}],"internalType": "struct AuctionData","name": "auctionData","type": "tuple"}],"internalType": "struct NFTData[]","name": "dataAr","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "isToken","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "fromAddr","type": "address"},{"internalType": "address","name": "toAddr","type": "address"},{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "libTransfer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "uri","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "bytes","name": "data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "operator","type": "address"},{"internalType": "bool","name": "approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "value","type": "uint256"}],"name": "setBidBalance","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"}],"name": "setName","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"}],"name": "startAuction","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "stopAuction","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "uri","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"internalType": "uint256","name": "count","type": "uint256"}],"name": "testMassMint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "index","type": "uint256"}],"name": "tokenByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "tokenData","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "uri","type": "string"},{"internalType": "address","name": "creator","type": "address"},{"internalType": "string","name": "creatorName","type": "string"},{"internalType": "address","name": "owner","type": "address"},{"internalType": "string","name": "ownerName","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"components": [{"internalType": "bool","name": "isActive","type": "bool"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"},{"internalType": "address","name": "bidder","type": "address"}],"internalType": "struct AuctionData","name": "auctionData","type": "tuple"}],"internalType": "struct NFTData","name": "data","type": "tuple"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "uint256","name": "index","type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenID","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256[]","name": "tokenIDAr","type": "uint256[]"}],"name": "tokensData","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "uri","type": "string"},{"internalType": "address","name": "creator","type": "address"},{"internalType": "string","name": "creatorName","type": "string"},{"internalType": "address","name": "owner","type": "address"},{"internalType": "string","name": "ownerName","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "uint256","name": "hash","type": "uint256"},{"components": [{"internalType": "bool","name": "isActive","type": "bool"},{"internalType": "uint256","name": "endTime","type": "uint256"},{"internalType": "uint256","name": "directPrice","type": "uint256"},{"internalType": "uint256","name": "nowPrice","type": "uint256"},{"internalType": "address","name": "bidder","type": "address"}],"internalType": "struct AuctionData","name": "auctionData","type": "tuple"}],"internalType": "struct NFTData[]","name": "dataAr","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "value","type": "uint256"}],"name": "withdrawOther","outputs": [],"stateMutability": "nonpayable","type": "function"}];
const contractAddr = "0xFFC56B04A7D67fB0e565d9e938aba14c496C6060";

/*
IDTreeLib 0x5D3bB5fB171Ba109DA08b16F33a596323C330aD9
PoolnftLib 0xD94631D7f498cE63a3CC843a3A8302569E47c4ff
*/

const zeroAddr = "0x0000000000000000000000000000000000000000";

let utils=ethers.utils;

let userAddr = null;
let provider = null;
let contract = null;
let contractSigner = null;

let userAddrInput=document.getElementById("userAddrInput");
let balanceInput=document.getElementById("balanceInput");

let listType="";
let listAddr=null;

async function init(){
	try{
		let response = await window.ethereum.request({method: 'eth_requestAccounts'});
		userAddr = response[0];
		userAddrInput.value = userAddr;
		
		await switchMumbai();
		
		provider = new ethers.providers.Web3Provider(window.ethereum);
		
		updateBalance();
		
		contract = new ethers.Contract(contractAddr, abi, provider);
		contractSigner = contract.connect(provider.getSigner() );
		
		initPage();
		
	}catch(err){
		alert(err.message);
	}
}
init();

window.ethereum.on('accountsChanged', function (accounts) {
	init();
});

window.ethereum.on('chainChanged', async function(networkId){
	if(networkId!=0x13881){
		alert("此網站只能在Mumbai testnet上運作！");
		await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{ chainId: '0x13881' }],});
	}
});

async function switchMumbai(){
	try{
		await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{ chainId: '0x13881' }],});
	}catch(err){
		if(err.code == 4902){//has not been added to MetaMask
			const chainData = [{
			    chainId: '0x13881',
			    chainName: 'Mumbai',
			    nativeCurrency:{
			    	name: 'MATIC',
			    	symbol: 'MATIC',
			    	decimals: 18
			    },
			    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
			    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
			}];
			
			try{
				await window.ethereum.request({method: 'wallet_addEthereumChain', params: chainData,});
			}catch(err2){
				alert(err2.message);
			}
		}
		else{
			alert(err.message);
		}
	}
}

async function updateBalance(){
	try{
		let balanceNum=await provider.getBalance(userAddr);
		balanceInput.value=utils.formatEther(balanceNum);
	}catch(err){
		alert(err.message);
	}
}

async function showNFTList(pageNum){
	if(pageNum<0 || pageNum>=pageCount){
		return;
	}
	
	for(let i=0; i<pageSize ; i++){
		nfts[i].style.display="none";
	}
	
	nowPage=pageNum;
	let getCount=pageSize;
	if(pageNum==pageCount-1){
		if(nftCount==0){
			pageList.innerHTML="";
			return;
		}
		
		getCount=nftCount%pageSize;
		if(getCount==0){
			getCount=pageSize;
		}
	}
	
	let startIndex=nftCount - pageNum*pageSize - getCount;
	
	let nowNftCount=0;
	try{
		switch(listType){
		case "all":
		case "create":{
			nowNftCount=nftCount;//只增不減，所以不檢查
			break;
		}
		case "own":{
			nowNftCount=await contract.getOwnCount(listAddr);
			break;
		}
		case "auction":{
			nowNftCount=await contract.getAuctionCount(listAddr);
			break;
		}
		}
	}catch(err){
		alert(err.message);
		return;
	}
	if(nowNftCount!=nftCount){
		alert("列表數目有變，進行頁面更新");
		reload();
		return;
	}
	
	let data=null;
	try{
		switch(listType){
		case "all":{
			data = await contract.getTokensData(startIndex, getCount);
			break;
		}
		case "own":{
			data = await contract.getOwnData(listAddr, startIndex, getCount);
			break;
		}
		case "create":{
			data = await contract.getCreateData(listAddr, startIndex, getCount);
			break;
		}
		case "auction":{
			data = await contract.getAuctionNFTData(listAddr, startIndex, getCount);
			break;
		}
		}
	}catch(err){
		alert(err.message);
		return;
	}
	
	for(let i=0; i<getCount; i++){
		let index = getCount-1-i;
		
		let nftID=data[index].id;
		let uri=data[index].uri;
		let title=data[index].title;
		let isOnAuction=data[index].auctionData.isActive;
		
		let isLoadJSON=false;
		if(/^data:application\/json;base64,/.test(uri) ){
			uri=uri.replace(/^data:application\/json;base64,/, "");
			
			try{
				uri=atob(uri);
				uri=JSON.parse(uri).image;
			}
			catch(err){
				console.log(err);
				uri="";
			}
			
			uri=toSafeUrl(uri);
			
			imgLinks[i].setAttribute("onclick", "showImgWnd('" + uri + "')");
			imgs[i].src=uri;
		}
		else{
			if(/^ipfs:\/\//.test(uri) ){
				uri=uri.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
			}
			
			imgLinks[i].setAttribute("onclick", "");
			imgs[i].src="";
			loadJSONImg(i, uri);
		}
		
		title=toSafeText(title);
		titles[i].innerHTML=nftID+ ".「"+ title+ "」";
		titles[i].href="view.html?" + nftID;
		
		onAuctions[i].style.display=(isOnAuction ? "" : "none");
		
		nfts[i].style.display="";
	}
	
	const nearNum=3;
	let listStr="<button id='page0' onclick='showNFTList(0)'>0</button>";
	
	if(pageNum-nearNum>=2){
		listStr+="..."
	}
	
	let start=pageNum-nearNum;
	if(start<=0){
		start=1;
	}
	
	let end=pageNum+nearNum;
	if(end>=pageCount){
		end=pageCount-1;
	}
	
	for(let i=start; i<=end; i++){
		listStr+="<button id='page" + i + "' onclick='showNFTList(" + i + ")'>" + i + "</button>";
	}
	
	if(end<pageCount-2){
		listStr+="...<button id='page" + (pageCount-1) + "' onclick='showNFTList(" + (pageCount-1) + ")'>" + (pageCount-1) + "</button>";
	}
	else if(end==pageCount-2){
		listStr+="<button id='page" + (pageCount-1) + "' onclick='showNFTList(" + (pageCount-1) + ")'>" + (pageCount-1) + "</button>";
	}
	
	pageList.innerHTML=listStr;
	let nowPageBtn=document.querySelector("#page" + pageNum);
	nowPageBtn.style="background-color: #B83C11";
	nowPageBtn.onclick="";
	
	nftList.scrollIntoView();
}

async function loadJSONImg(imgIndex, url){
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			try{
				let jsonObj=JSON.parse(this.responseText);
				let imgUri=jsonObj.image;
				
				if(/^ipfs:\/\//.test(imgUri) ){
					imgUri=imgUri.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
				}
				
				imgUri=imgUri.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				
				imgLinks[imgIndex].setAttribute("onclick", "showImgWnd('" + imgUri + "')");
				imgs[imgIndex].src=imgUri;
			}
			catch(err){
				console.log(err);
			}
		}
	};
	
	xhttp.open("GET", url, true);
	xhttp.send();
}

//data uri沒辦法直接當連結，應該是瀏覽器的安全限制，所以改用開新視窗來解決
function showImgWnd(imgUri){
	var img=new Image();
	img.src=imgUri;
	
	let wnd=window.open("");
	wnd.document.write(img.outerHTML);
	//wnd.document.write(imgUri + "<br>" + img.outerHTML);
}

async function showStartBlockTime(){
	if(! /^\d+$/.test(startBlock.value)  ){
		startBlockTime.innerHTML="error";
		return;
	}
	
	try{
		startBlockTime.innerHTML="";
		let startBlockNum=parseInt(startBlock.value);
		startBlockTime.innerHTML=timestampToStr((await provider.getBlock(startBlockNum) ).timestamp);
	}catch(err){
		alert(err.message);
	}
		
}

async function showEndBlockTime(){
	if(! /^\d+$/.test(endBlock.value) ){
		endBlockTime.innerHTML="error";
		return;
	}
	
	try{
		endBlockTime.innerHTML="";
		let endBlockNum=parseInt(endBlock.value);
		endBlockTime.innerHTML=timestampToStr((await provider.getBlock(endBlockNum) ).timestamp);
	}catch(err){
		alert(err.message);
	}
		
}

////////////////////////////////////////////////////////////////////

function sha256(s){
	var chrsz   = 8;
	var hexcase = 0;
 
	function safe_add (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
	
	function core_sha256 (m, l) {
		
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
 
		for ( var i = 0; i<m.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
 
			for ( var j = 0; j<64; j++) {
				if (j < 16){
					W[j] = m[j + i];
				}
				else{
					W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
				}
 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
 
	function str2binb (str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
 
	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}
	
	function uint82binb (ar) {
		var bin = Array();
		var mask = (1 << 8) - 1;
		for(var i = 0; i < ar.length * 8; i += 8) {
			bin[i>>5] |= (ar[i / 8] & mask) << (24 - i%32);
		}
		return bin;
	}
 
	//var hash= core_sha256(str2binb(s), s.length * chrsz);
	var hash= core_sha256(uint82binb(s), s.length * 8);
	return binb2hex(hash);
}

function Utf8Encode(string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		}
		else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		}
		else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}

	return utftext;
}

////////////////////////////////////////////////////////////////////

function isNum(numStr){
	return /^\d+(\.\d+)?$/.test(numStr);
}

function isUint(numStr){
	return /^\d+?$/.test(numStr);
}

function toHexStr(bigNum, len){
	return ethers.utils.hexZeroPad(bigNum, len).replace(/^0x/, "");
}

function timestampToStr(timestamp){
	let time = new Date(timestamp * 1000);
	let year = time.getFullYear();
	let month = time.getMonth()+1;
	let date = time.getDate();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
			
	return year + "年" + month + "月" + date + "日" + hour + "時" + min + "分" + sec + "秒";
}

function toTimestamp(year, mon, day, hour, min, sec){
	
	if(!isUint(year) || !isUint(mon) || !isUint(day) || !isUint(hour) || !isUint(min) || !isUint(sec) ){
		return null;
	}
	
	let date=new Date(year, mon-1, day, hour, min, sec);
	
	let time=date.getTime();
	if(isNaN(time) ){
		return null;
	}
	
	time = new Date(time);
	let year2 = time.getFullYear();
	let mon2 = time.getMonth()+1;
	let day2 = time.getDate();
	let hour2 = time.getHours();
	let min2 = time.getMinutes();
	let sec2 = time.getSeconds();
	
	if(year2!=year || mon2!=mon || day2!=day || hour2!=hour || min2!=min || sec2!=sec){
		return null;
	}
	
	return Math.round(time/1000);
}

function toSafeUrl(url){
	return url.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/'/g, "%27").replace(/"/g, "%22");
}

function toSafeText(str){
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toSafeInputText(str){
	return str;
}

function toJSONText(str){
	return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function addrEq(addr1, addr2){
	return addr1.toLowerCase()==addr2.toLowerCase();
}

function reload(){
	window.location.replace(location.href);
}

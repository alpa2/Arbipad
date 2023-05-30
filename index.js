window.userWalletAddress = null;

// 2. when the browser is ready
window.onload = async (event) => {

  // 2.1 check if ethereum extension is installed
  if (window.ethereum) {

    // 3. create web3 instance
    window.web3 = new Web3(window.ethereum);

  } else {

    // 4. prompt user to install Metamask
    alert("Please install MetaMask or any BSC Extension Wallet");
  }

  // 5. check if user is already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress");

  // 6. show the user dashboard
  showUserDashboard();
};
// 1. Web3 login function
const loginWithEth = async () => {
    // 1.1 check if there is global window.web3 instance
    if (window.web3) {
      try {
        // 2. get the user's ethereum account - prompts metamask to login
        const selectedAccount = await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => accounts[0])
          .catch(() => {
            // 2.1 if the user cancels the login prompt
            throw Error("Please select an account");
          });
  
        // 3. set the global userWalletAddress variable to selected account
        window.userWalletAddress = selectedAccount;
  
        // 4. store the user's wallet address in local storage
        window.localStorage.setItem("userWalletAddress", selectedAccount);
  
        // 5. show the user dashboard
        showUserDashboard();
  
      } catch (error) {
        alert(error);
      }
    } else {
      alert("wallet not found");
    }
  };
  
  // 6. when the user clicks the login button run the loginWithEth function
  document.querySelector(".login-btn").addEventListener("click", loginWithEth);
// function to show the user dashboard
const showUserDashboard = async () => {

    // if the user is not logged in - userWalletAddress is null
    if (!window.userWalletAddress) {
  
      // change the page title
      document.title = "Web3 Login";
  
      // show the login section
      document.querySelector(".login-section").style.display = "flex";
  
      // hide the user dashboard section
      document.querySelector(".dashboard-section").style.display = "none";
  
      // return from the function
      return false;
    }
  
    // change the page title
    document.title = "Web3 Dashboard 🤝";
  
    // hide the login section
    document.querySelector(".login-section").style.display = "none";
  
    // show the dashboard section
    document.querySelector(".dashboard-section").style.display = "flex";
  
    // show the user's wallet address
    // showUserWalletAddress();
  
    // get the user's wallet balance
    // getWalletBalance();
  };
// show the user's wallet address from the global userWalletAddress variable
const showUserWalletAddress = () => {
    const walletAddressEl = document.querySelector(".wallet-address");
    walletAddressEl.innerHTML = window.userWalletAddress;
  };
// get the user's wallet balance
const getWalletBalance = async () => {
    // check if there is global userWalletAddress variable
    if (!window.userWalletAddress) {
      return false;
    }
  
    // get the user's wallet balance
    const balance = await window.web3.eth.getBalance(window.userWalletAddress);
  
    // convert the balance to ether
    document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
      balance,
      "ether"
    );
  };
// web3 logout function
const logout = () => {
    // set the global userWalletAddress variable to null
    window.userWalletAddress = null;
  
    // remove the user's wallet address from local storage
    window.localStorage.removeItem("userWalletAddress");
  
    // show the user dashboard
    showUserDashboard();
  };
  
  // when the user clicks the logout button run the logout function
  document.querySelector(".logout-btn").addEventListener("click", logout);
  var claimCount = 0;
  var claimed = false;

  function claimReward() {
    claimCount++;
    claimed = true;
    alert("Congratulations on joining the whitelist waiting list. We will take a snapshot of the top 1000 users. Please be patient...");
  }







const ethereumButton = document.querySelector('.Web3Button');
const showAccount = document.querySelector('.showAccount');
const showBalance = document.querySelector('.showBalance');
 
const cont = document.querySelector('.cont');
 
const toAccount = document.querySelector('.account');
const toBalance = document.querySelector('.balance');
const btnPay = document.querySelector('.btnPay');
 
// 我的账户余额，对方账户余额
let AccountValue, BalanceValue, toAccountValue, toBalanceValue;
 
// 页面显示转账内容
function showCont() {
	// 我的账户余额，对方账户余额
	// AccountValue,BalanceValue,toAccountValue,toBalanceValue
	cont.innerHTML = `我的账户:${AccountValue}-->对方账户:${toAccountValue},余额:${BalanceValue},转账金额:${web3.utils.fromWei(toBalanceValue, 'ether')}`;
}
// 获取内容
toAccount.onblur = () => {
	toAccountValue = toAccount.value;
	console.log(toAccount.value);
}
toBalance.onblur = () => {
	if (toBalance.value) {
		// eth转wei 转账 web3.utils.toWei('1', 'ether')
		toBalanceValue = web3.utils.toWei(toBalance.value, 'ether');
		showCont();
	}
	console.log(toBalance.value, toBalanceValue);
}
 
// Web3浏览器检测
if (typeof window.ethereum !== 'undefined') {
	console.log('MetaMask is installed!');
}
 
// 实例化
window.web3 = new Web3(ethereum);
var web3 = window.web3;
 
// 检测MetaMask
if (web3.currentProvider.isMetaMask == true) {
	console.log('metamask 可用');
} else {
	console.log('metamask 不可用');
}
 
// 获取账户信息
ethereumButton.addEventListener('click', () => {
	getAccount();
});
 
async function getAccount() {
	// 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
	const enable = await ethereum.enable();
	console.log(enable,11)
 
	// 授权获取账户
	// let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	let accounts = await web3.eth.getAccounts();
	AccountValue = accounts[0];
	console.log(AccountValue,1);
 
	// 返回指定地址账户的余额
	let balance = await web3.eth.getBalance(AccountValue);
	BalanceValue = web3.utils.fromWei(balance, 'ether');
	console.log(balance,BalanceValue,2);
	showAccount.innerHTML = AccountValue;
	showBalance.innerHTML = `wei:${balance}, ether:${BalanceValue}`;
 
	console.log(AccountValue, balance, BalanceValue);
}
 
// 转账
btnPay.addEventListener('click', () => {
	toPay();
});
 
async function toPay() {
	showCont();
	// 转账
	var r = confirm("确认转账吗？");
	if (r == true) {
		// const res = await web3.eth.sendTransaction({
		//     from:AccountValue,
		//     to:toAccountValue,
		//     value:toBalanceValue,
		// });
		// console.log(res);
		web3.eth.sendTransaction({
			from: AccountValue,
			to: toAccountValue,
			value: toBalanceValue,
		}, (err, address) => {
			if (!err) {
				console.log(address);
				alert("转账成功！");
			} else {
				console.log(err);
			}
		});
	}
	else {
		alert("您已经取消转账！");
	}
 
}


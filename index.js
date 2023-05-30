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







document.getElementById("connectWalletBtn").addEventListener("click", async function() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // 请求用户授权
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // 创建 Web3 对象
          const provider = new Web3(window.ethereum);
          window.web3 = provider;

          alert("已连接钱包");
        } catch (error) {
          console.error(error);
          alert("连接钱包失败");
        }
      } else {
        alert("未检测到钱包插件，请安装钱包插件并刷新页面");
      }
    });

    // 转账按钮点击事件处理程序
    document.getElementById("transferBtn").addEventListener("click", async function() {
      if (typeof window.web3 === 'undefined') {
        alert("请先连接钱包");
        return;
      }

      // 要转账的BSC地址
      const toAddress = "0x1234567890abcdef";

      // 转账数额（以wei为单位）
      const amount = window.web3.utils.toWei("0.1", "ether");

      try {
        // 发起转账交易
        const txHash = await window.web3.eth.sendTransaction({
          from: window.web3.currentProvider.selectedAddress,
          to: toAddress,
          value: amount,
        });

        alert("转账成功，交易哈希：" + txHash);
      } catch (error) {
        console.error(error);
        alert("转账失败");
      }
    });








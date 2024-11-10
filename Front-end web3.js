<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blockchain Data Sharing</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Secure Data Sharing with Blockchain</h1>
    <div id="app">
        <input type="file" id="fileInput" />
        <button onclick="shareData()">Share Data</button>
        <div id="sharedData"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js"></script>
    <script>
        let web3;
        let contract;
        let account;

        // Initialize web3
        async function init() {
            if (typeof window.ethereum !== 'undefined') {
                web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                account = (await web3.eth.getAccounts())[0];

                // Initialize contract
                const contractAddress = 'YOUR_CONTRACT_ADDRESS';
                const contractABI = [/* ABI of your smart contract */];
                contract = new web3.eth.Contract(contractABI, contractAddress);
            } else {
                alert('Please install MetaMask to use this app!');
            }
        }

        // Function to share data
        async function shareData() {
            const file = document.getElementById('fileInput').files[0];
            if (!file) {
                alert('Please select a file to share.');
                return;
            }

            // Upload the file to IPFS (using a service like Infura or Pinata)
            const ipfsHash = await uploadToIPFS(file);

            // Share data using smart contract
            await contract.methods.shareData(ipfsHash).send({ from: account });
            alert('Data shared successfully!');
            loadSharedData();
        }

        // Function to load shared data
        async function loadSharedData() {
            const sharedData = await contract.methods.getSharedData().call({ from: account });
            const dataContainer = document.getElementById('sharedData');
            dataContainer.innerHTML = '';

            sharedData.forEach((data) => {
                const dataDiv = document.createElement('div');
                dataDiv.textContent = `Data Hash: ${data.dataHash}, Timestamp: ${data.timestamp}`;
                dataContainer.appendChild(dataDiv);
            });
        }

        // Function to upload file to IPFS
        async function uploadToIPFS(file) {
            // Implement file upload to IPFS (e.g., using Pinata or Infura)
            return 'ipfsHashOfTheFile'; // Replace with actual IPFS hash
        }

        window.onload = init;
    </script>
</body>
</html>

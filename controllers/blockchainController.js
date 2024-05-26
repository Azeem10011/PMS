const Web3 = require("web3");
const contract = require("@truffle/contract");
const artifacts = require("../blockchain-node-api/build/contracts/Property.json");
const artifactsTransaction = require("../blockchain-node-api/build/contracts/Transaction.json");
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const { BL_PRIVATE_KEY, CONTRACT_ADDRESS, TRANSACTION_CONTRACT_ADDRESS } =
  process.env;

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    `wss://eth-sepolia.g.alchemy.com/v2/${process.env.PROJECT_ID}`
  )
);
const contractInstance = contract(artifacts);
contractInstance.setProvider(web3.currentProvider);

exports.getProperty = async (blockId) => {
  try {
    const instance = new web3.eth.Contract(
      artifactsTransaction.abi,
      TRANSACTION_CONTRACT_ADDRESS
    );
    // const { propertyId } = req.params;
    const contact = await instance.methods.getTransaction(blockId).call();
    console.log(contact);
    return contact;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
    return false;
  }
};

// exports.setProperty = async ({ data, account }) => {
//   try {
//     // let { account } = req.body;
//     const instance = new web3.eth.Contract(artifacts.abi, CONTRACT_ADDRESS);
//     // const gas = await instance.methods.setPropertyData().estimateGas({ from: account });
//     let gas = await instance.methods
//       .setPropertyData()
//       .estimateGas({ from: account });
//     gas = gas;
//     console.log(gas);
//     const gasPrice = web3.utils.toWei("0.000001", "ether"); // Reduced gas price

//     console.log(gasPrice);

//     let balance = await web3.eth.getBalance(account);
//     balance = web3.utils.fromWei(balance, "ether");
//     console.log(balance);

//     const tx = {
//       from: account,
//       to: CONTRACT_ADDRESS,
//       gas: gas, // Reduced gas limit
//       gasPrice: gasPrice, // Reduced gas price (in wei)
//       data: instance.methods.setPropertyData().encodeABI(),
//     };

//     const signature = await web3.eth.accounts.signTransaction(
//       tx,
//       BL_PRIVATE_KEY
//     );

//     web3.eth
//       .sendSignedTransaction(signature.rawTransaction)
//       .on("receipt", (receipt) => {
//         console.log(receipt);
//         res.sendStatus(200);
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.setTransaction = async ({ buyer, plot, transaction, account }) => {
  try {
    const instance = new web3.eth.Contract(
      artifactsTransaction.abi,
      TRANSACTION_CONTRACT_ADDRESS
    );

    // console.log(gasPrice);

    // let balance = await web3.eth.getBalance(account);
    // balance = web3.utils.fromWei(balance, "ether");
    // console.log(balance);
    const buyerData = {
      name: buyer?.name || "",
      cnic: buyer?.cnic || "",
      email: buyer?.email || "",
      contact_no: buyer?.contact_no || "",
    };

    const plotData = {
      plot_no: plot.plot_no,
      no_of_square_feet: plot.no_of_square_feet,
      property: plot.property.toString(),
      phase: plot.phase.toString(),
    };

    const transactionData = [
      transaction.blockId,
      buyerData,
      plotData,
      transaction.price,
      transaction.is_constructed,
      transaction.payment_method,
    ];

    console.log(transactionData);
    let gas = await instance.methods
      .createTransaction(...transactionData)
      .estimateGas({ from: account });
    gas = Math.floor(gas);
    console.log(gas);
    const gasPrice = web3.utils.toWei("0.000001", "ether"); // Reduced gas price

    const tx = {
      from: account,
      to: TRANSACTION_CONTRACT_ADDRESS,
      gas: gas, // Reduced gas limit
      gasPrice: gasPrice, // Reduced gas price (in wei)
      data: instance.methods.createTransaction(...transactionData).encodeABI(),
    };

    const signature = await web3.eth.accounts.signTransaction(
      tx,
      BL_PRIVATE_KEY
    );

    await web3.eth
      .sendSignedTransaction(signature.rawTransaction)
      .on("receipt", (receipt) => {
        console.log(receipt);
      });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// const Web3 = require("web3");
// const contract = require("@truffle/contract");
// const artifacts = require("../blockchain-node-api/build/contracts/Transaction.json");
// // const CONTACT_ABI = require("./config");
// // const CONTACT_ADDRESS = require("./config");

// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// const contractInstance = contract(artifacts);
// contractInstance.setProvider(web3.currentProvider);

// const getPropertyData = async (propertyId) => {
//   const instance = await contractInstance.deployed();
//   return await instance.properties;
// };

// const setPropertyData = async () => {
//   let accounts = await web3.eth.getAccounts();
//   const instance = await contractInstance.deployed();
//   return await instance.setPropertyData(12, { from: accounts[0] });
// };

// exports.getProperty = async () => {
//   // try {
//   //   // const { propertyId } = req.params;
//   //   const propertyData = await getPropertyData();
//   //   res.json(propertyData);
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).json({ error: "Internal Server Error" });
//   // }
//   try {
//     const instance = await contractInstance.deployed();
//     // let cache = [];
//     // const COUNTER = await contractInstance.methods.count().call();
//     // for (let i = 1; i <= COUNTER; i++) {
//     const contact = await instance.getTransaction(1234);
//     // cache = [...cache, contact];
//     // }
//     console.log(contact);
//     // res.json(cache);
//     return;
//   } catch (error) {
//     console.error(error);
//     // res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.setProperty = async (req, res) => {
//   try {
//     // const { propertyId } = req.params;
//     // const data = req.body.data;
//     // Assuming data is an array of values
//     await setPropertyData();
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.setTransaction = async ({ buyer, plot, transaction, account }) => {
//   try {
//     // const instance = new web3.eth.Contract(
//     //   artifactsTransaction.abi,
//     //   TRANSACTION_CONTRACT_ADDRESS
//     // );

//     // console.log(gasPrice);

//     // let balance = await web3.eth.getBalance(account);
//     // balance = web3.utils.fromWei(balance, "ether");
//     // console.log(balance);
//     const buyerData = {
//       name: buyer?.name || "",
//       cnic: buyer?.cnic || "",
//       email: buyer?.email || "",
//       contact_no: buyer?.contact_no || "",
//     };

//     const plotData = {
//       plot_no: plot.plot_no,
//       no_of_square_feet: plot.no_of_square_feet,
//       property: plot.property.toString(),
//       phase: plot.phase.toString(),
//     };

//     const transactionData = [
//       transaction.id,
//       buyerData,
//       plotData,
//       transaction.price,
//       transaction.is_constructed,
//       transaction.payment_method,
//     ];

//     console.log(transactionData);

//     let accounts = await web3.eth.getAccounts();
//     const instance = await contractInstance.deployed();
//     return await instance.createTransaction(...transactionData, {
//       from: accounts[0],
//     });
//   } catch (error) {
//     console.error(error);
//     // res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledNewICO = require("./build/DiagonICO.json");

const provider = new HDWalletProvider(
  process.env.PHRASE,
  process.env.INFURA_API_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  try {
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledNewICO.abi)
      .deploy({
        data: web3.utils.asciiToHex("0x" + compiledNewICO.evm.bytecode),
        arguments: ["0xf7ee0d44511d3d79cf19a83399b645754b3c2c97"]
      })
      .send({ from: accounts[0], gas: 1500000, gasPrice: "20" });
    console.log("Contract Deployed to:", result.options.address);
  } catch (err) {
    console.log(err);
  }
};

deploy();

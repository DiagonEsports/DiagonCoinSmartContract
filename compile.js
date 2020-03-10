const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");

fs.removeSync(buildPath);

const diagonPath = path.resolve(__dirname, "contracts", "DiagonICO.sol");

const source = fs.readFileSync(diagonPath, "UTF-8");

let input = {
  language: "Solidity",
  sources: {
    "DiagonICO.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

let output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output.contracts) {
  const contractName = contract.replace(".sol", "");
  console.log("Writing: ", contractName + ".json");
  fs.outputJsonSync(
    path.resolve(buildPath, contractName + ".json"),
    output.contracts[contract][contractName]
  );
}

import web3 from "../web3";
import diagonIco from "./build/DiagonICO.json";

const instance = new web3.eth.Contract(
  diagonIco.abi,
  "0xa063341d10054188e3cb715bfb663b37c0c1515e"
);

export default instance;

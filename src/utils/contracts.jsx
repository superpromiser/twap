import { ContractFactory, ethers } from "ethers";
import { HIKARI_ADDR } from "../abis/address";
import ERC20ABI from "../abis/ERC20ABI.json";
import HIKARIABI from "../abis/HIKARIABI.json";
import FactoryV2ABI from "../abis/IUniswapV2Factory.json";
import RouterV2ABI from "../abis/IUniswapV2Router02.json";
import V2OracleABI from "../abis/UniswapV2Oracle.json";

export const RPC_ENDPOINT = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

export const addresses = {
  1: {
    token1: "0xd4126f195a8de772eeffa61a4ab6dd43462f4e39",
    token2: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    factoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    routerV2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  },
  5: {
    token1: "0x6eF5b03Aa311801B585fd460C5F569d1DA05b347",
    token2: "0xE366eCB27D3C29df9F286f1C67e5985A76389A33",
    factoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    routerV2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  },
};

export const getContract = (abi, address, chainID, signer) => {
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider(
    RPC_ENDPOINT[chainID]
  );
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (address, chainID, signer) => {
  return getContract(ERC20ABI, address, chainID, signer);
};

export const getHikariContract = (chainID, signer) => {
  return getContract(HIKARIABI, HIKARI_ADDR, chainID, signer);
};

export const getFactoryV2Contract = (chainID, signer) => {
  return getContract(
    FactoryV2ABI,
    addresses[chainID].factoryV2,
    chainID,
    signer
  );
};

export const getRouterV2Contract = (chainID, signer) => {
  return getContract(RouterV2ABI, addresses[chainID].routerV2, chainID, signer);
};

export const getV2OracleFactory = async (signer) => {
  const uniswapV2OracleFactory = new ContractFactory(
    V2OracleABI.abi,
    V2OracleABI.bytecode,
    signer
  );
  return uniswapV2OracleFactory;
};

export const getV2OracleFactoryContract = (twapAddress, chainID, signer) => {
  return getContract(V2OracleABI.abi, twapAddress, chainID, signer);
};

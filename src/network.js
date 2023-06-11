import * as chain from "wagmi/chains";

const network = {
  ...chain.gnosis,
  rpcUrls: {
    ...chain.gnosis.rpcUrls,
    alchemy: {
      http: [
        "https://rpc.eu-central-2.gateway.fm/v4/gnosis/non-archival/mainnet"
      ],
    },
  },
  subgraphUrl: `https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai`,
  cashToken: "0x2bF2ba13735160624a0fEaE98f6aC8F70885eA61",
  armyToken: "0x6C357412329f9a3EE07017Be93ed0aC551faa77b",
  hillAddress: "0x75ef7C347652f3a4232a0C6f6b9b26492E2E0A94",
  
  // new data to be used: 
  token: "0x2bF2ba13735160624a0fEaE98f6aC8F70885eA61",
  contractAddress: "0x6B7f3c66BCb255f2d9C88aeeBE95143Da9546e65", // This is Fran's personal account for testing for now.

};

export default Object.freeze(network);

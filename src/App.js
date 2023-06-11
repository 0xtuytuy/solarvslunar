import './App.css';
import {CreateStream} from './CreateStream';
import {SendFunds} from './SendFunds';
import styled from "styled-components";

import { WagmiConfig, createClient, configureChains, mainnet, useConnect } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { polygonMumbai } from 'wagmi/chains';
import { ConnectButton } from './components/ConnectWallet';
import { ConnectWalletButton} from './components/ConnectWalletButton';
import { useState } from 'react';

const Background = styled.img`
  width: 100%;
  overflow: hidden;
`;

const ConnectionButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.25);
  text-align: center;
  height: 30px;
  width: 150px;
  display: block;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: black;
  line-height: 30px; 
  box-sizing: border-box;
`;


const PlayArea = styled.div`
  width: 450px;
  height: 300px;
  padding: 25px;
  display: block;
  position: absolute;
  top: calc(50vh - 175px);
  left: calc(50vw - 250px);

  background: #FFFFFF;
  box-shadow: 0px 0px 35px rgba(0,0,0,0.25);
  border-radius: 25px;
  box-shadow: 0px 0px 50px rgba(255,220,45,0.5);
  color: #000000;
  text-align: center;

  transition: border-radius 1s ease-in-out, box-shadow 1s ease-in-out;
`
const Layout = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: stretch;

  > * {
    flex: 1;
  }
`;

// Configure chains & providers
// To do: add in infura/ alchemy as provider so we dont hit rate limit
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()] // use public provider for now
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
  ],
  provider,
  webSocketProvider,
});

function App() {
  const [good, setGood] = useState(true);

  const switchSide = () =>{
    console.log("switching sides");
    setGood(!good)
  }
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <WagmiConfig client={client}>
        <Layout> 
          <Background src={good ? "/bg-good.png": "./bg-evil.png"}/>
          <ConnectButton/>
          <PlayArea>
            {
              good 
              ? <SendFunds />
              : <CreateStream /> 
            }
            

          </PlayArea>
          <button
            style={{width: "180px", 
              height: "80px", 
              position: "absolute",
              right: "0px",
              bottom: "50px",
              backgroundSize:"cover",
              background: "/btn_evil.png",
              backgroundSize: "100% 100%"
            }}
            onClick={switchSide}
              
          >
            switch sides
          </button>
        </Layout>
      </WagmiConfig>
    </div>
  );
}

export default App;

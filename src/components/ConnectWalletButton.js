import { useAccount, useConnect } from 'wagmi';
import { ConnectButton } from './ConnectWallet';

export const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount();

  return !isConnected ? (
    <div className="flex flex-col mt-2">
      <ConnectButton />
    </div>
  ) : (
    <>
      <div 
        style={{position: "absolute", top: "20px", left: "20px", boxShadow: "0px 0px 10px rgba(0,0,0,0.25)", textAlign: "center", height: "30px", width: "150px", display: "block", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", color: "black", lineHeight: "25px", boxSizing: "border-box", borderRadius: "5px", backgroundColor:"white"}}
      >
        {address.substring(0, 6)}...{address.substring(address.length - 4)}
      </div>
    </>
  );
};

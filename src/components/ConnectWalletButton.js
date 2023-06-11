import { useAccount, useConnect } from 'wagmi';
import { ConnectButton } from './ConnectWallet';

export const ConnectWalletButton = () => {
  const { isConnected } = useAccount();
  const { address } = useAccount();

  return !isConnected ? (
    <div className="flex flex-col mt-2">
      <ConnectButton />
    </div>
  ) : (
    <>
      <div className="flex gap-x-1 justify-center items-center">
        {address.substring(0, 6)}...{address.substring(address.length - 4)}
      </div>
    </>
  );
};

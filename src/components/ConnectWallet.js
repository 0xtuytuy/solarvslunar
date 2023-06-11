import React from "react";
import { useConnect } from "wagmi";

export const ConnectButton = () => {
    const { connect, connectors } = useConnect();
  
    return (
      <>
        {connectors.map((connector) => (
         
            <button
              key={connector.id}
              disabled={!connector.ready}
              onClick={(e) => connect({ connector })}
            >
              Connect
            </button>
        ))}
      </>
    );
  };
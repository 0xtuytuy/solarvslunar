import React from "react";
import { useConnect } from "wagmi";

export const ConnectButton = () => {
    const { connect, connectors } = useConnect();
  
    return (
      <>
        {connectors.map((connector) => (
          <div
            key={connector.id}
          >
            <button
              disabled={!connector.ready}
              onClick={(e) => connect({ connector })}
            >
              Connect
            </button>
          </div>
        ))}
      </>
    );
  };
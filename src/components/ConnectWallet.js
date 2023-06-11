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
              style={{position: "absolute", top: "20px", left: "20px", boxShadow: "0px 0px 10px rgba(0,0,0,0.25)", textAlign: "center", height: "30px", width: "150px", display: "block", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", color: "black", lineHeight: "25px", boxSizing: "border-box", borderRadius: "5px", backgroundColor:"white"}}
            >
              Connect
            </button>
        ))}
      </>
    );
  };
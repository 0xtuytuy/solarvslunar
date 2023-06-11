
import { Framework } from "@superfluid-finance/sdk-core";
import network from "./network";
import { useProvider, useSigner, useAccount } from "wagmi";
import { useState } from "react";
import { ethers } from "ethers";

export const CreateStream = () => {

    const [flowRate, setFlowRate] = useState("1210");

    const provider = useProvider();
    const { data: signer } = useSigner();

    const sendStream = async () => {

        const sf = await Framework.create({
            chainId: network.id,
            provider,
            customSubgraphQueriesEndpoint: network.subgraphUrl,
        })

        const token = await sf.loadSuperToken(network.cashToken);
        // Write operation example

        console.log(sf);
        console.log(token);
        const {contractAddress} = network;
        console.log(contractAddress);
        const approveOp = token.approve({ receiver: contractAddress, amount: ethers.utils.parseEther("1000")});
        const sendStreamOp = token.createFlow({ receiver: contractAddress, flowRate: "100000" })//flowRate: ethers.utils.parseUnits(flowRate, 18).div(3600*24)});// Number(flowRate)*1e18/(3600*24) });
        const approveSubscriptionsOp = token.approveSubscription({ publisher: contractAddress, indexId: "23" });
        const batchCall = sf.batchCall(
            [
                approveOp,
                sendStreamOp,
                approveSubscriptionsOp  //TODO, add this when we use the contract
            ]
        );

        console.log(batchCall);
        console.log("signer")
        console.log(signer)
        const txnResponse = signer && await batchCall.exec(signer);
        console.log(txnResponse);
        const txnReceipt = txnResponse && await txnResponse.wait();
        console.log(txnReceipt)
        // Transaction Complete when code reaches here
    }

    return (
        <div>
        <div className="sendingInfos">
          <div className="title">The average yield is: </div>
        </div>
        <div className="sendingWrapper">
          <div className="title">How much do you want to stream? (Daily)</div>
          <input type="text" value={flowRate} onChange={(e) => setFlowRate(e.target.value)} />
          <button onClick={sendStream}>STREAM!</button>
        </div>
            <div>{/* here we should have the average yield. If necessary, make it up */}</div>
        </div>
    )
}

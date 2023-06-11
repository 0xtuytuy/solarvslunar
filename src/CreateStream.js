
import { Framework } from "@superfluid-finance/sdk-core";
import network from "./network";
import { useProvider, useSigner, useAccount } from "wagmi";
import { useState } from "react";

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

        const approveOp = token.approve({ receiver: network.contractAddress, amount: "100000000000" });
        const sendStreamOp = token.createFlow({ receiver: network.contractAddress, flowRate });
        const approveSubscriptionsOp = token.approveSubscription({ publisher: network.contractAddress, indexId: "23" });
        const batchCall = sf.batchCall(
            [
                approveOp, 
                sendStreamOp, 
                //approveSubscriptionsOp  //TODO, add this when we use the contract
            ]
        );

        const txnResponse = signer && await batchCall.exec(signer);
        const txnReceipt = txnResponse && await txnResponse.wait();
        console.log(txnReceipt)
        // Transaction Complete when code reaches here
    }

    return (
        <div>
            <div>The average yield is:</div>
            <div>{/* here we should have the average yield. If necessary, make it up */}</div>
            <div>How much do you want to stream?</div>
            <input type="text" value={flowRate} onChange={(e) => setFlowRate(e.target.value)} />
            <button onClick={sendStream}>createStream</button>
        </div>
    )
}
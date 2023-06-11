
import { Framework } from "@superfluid-finance/sdk-core";
import network from "./network";
import { useProvider, useSigner, useAccount } from "wagmi";
import { useEffect, useState } from "react";

export const SendFunds = () => {

    const [amount, setAmount] = useState("0");

    const [totalFlowRate, setTotalFlowRate] = useState(0);
    const [gambleAmount, setGambleAmount] = useState(0);
    const [txnReceipt, setTxnReceipt] = useState("");

    useEffect(() => {
        // here we call the subgraph to get the total flowrate for the hill
        
        
        setTotalFlowRate(10000000);
    }, []);


    useEffect(() => {
        // here we call the contract directly to get the gamble amount
        // we should then make it tick down, maybe fake it

        // getMinGambleAmount returns uint256
        
        setGambleAmount(100000000000);
    }, []);

    const provider = useProvider();
    const { data: signer } = useSigner();
    const account = useAccount();

    const sendFunds = async () => {
        const sf = await Framework.create({
            chainId: network.id,
            provider,
            customSubgraphQueriesEndpoint: network.subgraphUrl,
        })

        const token = await sf.loadSuperToken(network.cashToken);
        
        // Write operation example
        const transferOperation = token.send({ recipient: network.contractAddress, amount });
        const txnResponse = signer && await transferOperation.exec(signer);
        const receipt = txnResponse && await txnResponse.wait();
        setTxnReceipt(receipt);
        // Transaction Complete when code reaches here
    }

    return (
        <div>
            {
                !txnReceipt 
                ? (
                    <>
                        <div>You will receive: </div>
                        <div>{totalFlowRate*24/3600}/ day</div>
                        <div>The current Gamble amount is:</div>
                        <div>{gambleAmount}</div>
                        <div>How much do you want to send?</div>
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <button onClick={sendFunds}>Send()</button>
                    </>
                )
                : (
                    <>
                        <div>Transaction Complete!</div> 
                        <div>You are now receiving</div>
                        <div>{totalFlowRate*24/3600}/ day</div>
                        <div>
                            {totalFlowRate.toString()}
                        </div>
                    </>
                )
            }
        </div>
    )
}


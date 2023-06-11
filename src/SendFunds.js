
import { Framework } from "@superfluid-finance/sdk-core";
import network from "./network";
import { useProvider, useSigner, useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ContractABI from "./ContractABI.json";

export const SendFunds = () => {

    const [amount, setAmount] = useState("0");

    const [totalFlowRate, setTotalFlowRate] = useState(0);
    const [gambleAmount, setGambleAmount] = useState(0);
    const [txnReceipt, setTxnReceipt] = useState("");
    const [sf, setSf] = useState();
    const [token, setToken] = useState("");

    const { data: totalGamble, isError, isLoading } = useContractRead({
        address: network.contractAddress,
        abi: ContractABI,
        functionName: 'getMinGambleAmount',
      })

    useEffect(() => {
        const createSfStuff = async () => {
            const sf = await Framework.create({
                chainId: network.id,
                provider,
                customSubgraphQueriesEndpoint: network.subgraphUrl,
            })
        
            const token = await sf.loadSuperToken(network.cashToken);
            
            setSf(sf);
            setToken(token);

            const results = await sf.query.listStreams(
                { receiver: network.contractAddress, token: network.cashToken }        );
            if(results.data.length > 0) {
                let sum; 
                results.data.map(a=>Number(a.currentFlowRate)).reduce((acc, item) => {
                return acc + Number(item);
                
            });
            setTotalFlowRate(sum);
            console.log(sum)
             }
        }
        // here we call the subgraph to get the total flowrate for the hill
        
        createSfStuff();

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
        
        // Write operation example
        const transferOperation = token.send({ recipient: network.contractAddress, amount: ethers.utils.parseEther(amount) });
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
                        <div className="gambleAmountWrapper">
                          <div className="title">The current Gamble amount is:</div>
                          <div className="gambleAmount">{totalGamble && totalGamble.toString()}</div>
                        </div>

                        <div className="sendingInfos">
                          <div className="title">You will receive: </div>
                          <div className="flowRate">{totalFlowRate*24/3600} <span>/ day</span></div>
                        </div>
                        <div className="sendingWrapper">
                          <div className="title">How much do you want to send?</div>
                          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                          <button onClick={sendFunds}>Stream!</button>
                        </div>
                    </>
                )
                : (
                    <>
                        <div>Transaction Complete!</div> 
                        <div>You are now receiving</div>
                        <div>{(totalFlowRate*24/3600).toFixed(2)} $FRACTION / day</div>
                    </>
                )
            }
        </div>
    )
}


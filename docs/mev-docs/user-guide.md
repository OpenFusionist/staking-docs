---
sidebar_position: 90
---

# User Guide


## Benefits

- Front-running Protection: Transactions are sent to a private mempool, making them invisible to sandwich bots and front-running bots. Particularly suitable for DeFi scenarios and meme coin trading.

## How to Use

Users can add the Protect RPC to their wallets and interact with it like a regular RPC. Advanced users may also use `eth_sendPrivateTransaction` to interact with the Protect RPC.

Below are the configurations for the Endurance Protect RPC. Add them to common wallets (e.g., MetaMask, Rabby...) to send protected private transactions:

```bash
Network Name: Endurance Protect RPC
New RPC URL: https://rpc.endurancehub.org
Chain ID: 648
Currency Symbol: ACE
Block Explorer URL: https://explorer-endurance.fusionist.io
```

## Notes

- Currently, only some nodes on the Endurance Network support the protected RPC. Transactions sent via the protected RPC typically take around `25 seconds` to be confirmed on-chain.

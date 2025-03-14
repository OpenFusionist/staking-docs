---
sidebar_position: 30
---

# Running Nodes

## Reth-Lighthouse Template

### Get Started

There is a template to easily run a node on the Endurance mainnet. Just follow this repo's README:

- https://github.com/OpenFusionist/mainnet-reth-lighthouse

With just 5 command line steps, you can run a live node.

### Check the Node Status

Execute `./status.sh` and you will get some output like this:

```
Requesting current block number from the Endurance mainnet...
Current Block Number: {"jsonrpc":"2.0","result":"0x6f07c","id":1}
---
Requesting current Execution Layer node peer count...
Execution Layer Peers: {"jsonrpc":"2.0","result":"0x3","id":1}
---
Requesting current Consensus Layer node peer count...
Consensus Layer Peers: {"data":{"connected":"28","connecting":"0","disconnected":"12","disconnecting":"0"}}
---
Requesting current syncing status of the Endurance 2.0 node...
Syncing Status: {"data":{"is_syncing":true,"is_optimistic":true,"el_offline":false,"head_slot":"455903","sync_distance":"155461"}}
---
Requesting current validator status...
Validator Status: {"data":[]}
---
```

You need to confirm that the `Execution Layer Peers` number is larger than 0 and the `Consensus Layer Peers` number is also larger than 0; this is normal.

And the `Syncing Status` shows the node's sync status. When it reaches this condition, your node has finished syncing:

|Key|Value|
|---|---|
|is_syncing|false|
|is_optimistic|false|
|el_offline|false|
|sync_distance|0|

If everything is okay, you already have a node ready to become a validator now.

:::tip

If you have more templates like this, such as Geth-Prysm, feel free to contribute your template!

:::
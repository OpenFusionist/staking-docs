---
sidebar_position: 51
---

# Endurance Mainnet Recovery: Node Migration Guide

This guide is for exchanges, RPC node operators and explorers. Wallet and app users can skip it.

**You can download Geth now.** If you already run Geth, schedule a maintenance window to back up its database. Start step 3 once Endurance publishes the beacon files and bootnodes in the [hard fork announcement](./mainnet-recovery-hard-fork.md#release-materials).

## 1. Upgrade Geth and check your beacon client

**Endurance Geth v1.15.14** applies the recovery rules at block **7,155,516**. On Linux/amd64, pull the [recovery build](https://github.com/OpenFusionist/go-ethereum/releases/tag/v1.15.14):

```bash
docker pull ghcr.io/openfusionist/go-ethereum@sha256:9b00183842ee5a3c49545728a103bec638731e6bb0384645a70c05c02fcfc643
```

**You can keep your beacon client.** This fork requires no changes to the consensus-layer (CL) software. We tested **OpenFusionist Lighthouse v7.0.2** in our two-node rehearsal. Other Electra-compatible clients should also work. If you use another client or version, test your setup using steps 3 and 4 before reopening services.

**Optional Lighthouse download.** If you want the tested build, use the Linux image below or a [standalone binary](https://github.com/OpenFusionist/lighthouse/releases/tag/v7.0.2). Skip this download if you already use the OpenFusionist v7.0.2 build.

```bash
docker pull ghcr.io/openfusionist/lighthouse@sha256:2f1d224d884df7aa99cfe16935d5e63d874231f81a1d3fbb3958924a976a8569
```

## 2. Prepare your execution data

If your beacon node already uses the **new Endurance `genesis.ssz`** and is connected to Geth v1.15.14, leave your database as it is and skip to step 4.

**New node or switching from Nethermind, Besu, Reth or Erigon?** Keep your old database and give Geth a separate data directory. Use the checks below if you have a verified Endurance Geth backup. Otherwise, wait for fresh-sync instructions from Endurance.

**Reusing a Geth database?** Stop Geth cleanly. Copy its database, including any external `ancient` directory. Keep the original offline. Start the upgraded Geth on the **independent copy only**, isolated from peers and beacon clients. With Docker, mount only copied data and use `--network none`.

**Open the copy's Geth console.** On Docker, run `docker ps`. Replace `endurance-geth-copy` below with the **NAMES** entry for your working copy. Find its socket path:

```bash
docker logs endurance-geth-copy 2>&1 | grep 'IPC endpoint opened'
```

Use the path after `url=` in the next command. For example:

```bash
docker exec -it endurance-geth-copy geth attach /data/geth.ipc
```

Outside Docker, use `geth attach /path/to/working-copy/geth.ipc` with the copy's socket path. In the console, check the latest block number and the hash of block **7,155,515**:

```js
eth.blockNumber
var anchor = eth.getBlock(7155515); anchor && anchor.hash
```

Expected hash for **7,155,515**:

```text
0x5f44432f34ad074de48e76784c2ac0735139440682d7eda850d1e98df63734d3
```

| What the copy reports | Next step |
|---|---|
| Latest block is **7,155,515** and the hash matches | Skip the rewind. Check the balance below. |
| Latest block is **above 7,155,515** on the old chain and the hash matches | Rewind the isolated copy as described below. |
| Latest block is **below 7,155,515**, the block is missing, or the hash differs | Stop here. Use a verified Geth backup containing this block and its state, or wait for fresh-sync instructions. |

**Only if the table calls for a rewind**, run `debug.setHead("0x6d2f3b")` once in the isolated copy's console. This removes later blocks from the copy. Stop Geth cleanly, start it again on the same isolated copy, and repeat both checks. Continue only at **7,155,515** with the expected hash.

Check that Geth can read an account balance at that block:

```js
eth.getBalance("0x0000000000000000000000000000000000000000", 7155515).toString(10)
```

A number, including zero, means the read succeeded. If Geth reports missing state, use another verified backup or wait for fresh-sync instructions. Stop the isolated Geth when you finish.

## 3. Connect the new beacon node

1. Download `genesis.ssz`, `config.yaml` and the new bootnode list from the announcement. Check the files against the published checksums.
2. Give the beacon client a **new, empty data directory**. Keep the old beacon database offline and remove any old checkpoint-sync URL or saved peers from the new configuration.
3. Start Geth on the verified copy with networking enabled (chain ID **648**). Start the beacon node with the new files and bootnodes. Connect them through Geth's private Engine API using the same JWT secret. An RPC node needs no validator keys.
4. Check the beacon node's `/eth/v1/beacon/genesis` endpoint. Its `genesis_time` and `genesis_validators_root` must match the published values. Keep deposits and withdrawals paused while the node syncs.

## 4. Verify the new chain before reopening

After block production resumes, open the upgraded Geth console. The first line returns the finalized height. The second returns the parent hash and block hash of **7,155,516**, in that order:

```js
var f = eth.getBlock("finalized"); f && f.number
var b = eth.getBlock(7155516); b && [b.parentHash, b.hash]
```

If either result is `null`, wait and check again. Reopen deposits and withdrawals only when all three checks pass:

1. **Sync and finality.** The beacon endpoint `/eth/v1/node/syncing` reports `is_syncing: false` and `is_optimistic: false`. Geth's finalized height is **7,155,516 or higher**.
2. **Parent hash.** The first hash matches the expected hash for **7,155,515** in step 2.
3. **Block hash.** The second hash matches block **7,155,516** on an independent upgraded Endurance node. Both chains use chain ID 648, so the ID alone cannot identify the new chain.

If you track affected balances, compare them at blocks **7,155,515** and **7,155,516**. The ACE recovery transfers have no transaction hashes, and the FAME burn has no ERC-20 `Transfer` event.

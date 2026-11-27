---
sidebar_position: 50
---

# Endurance Mainnet Recovery Hard Fork

Endurance plans to resume block production on **Wednesday, December 2, 2026, at 14:00 Singapore time (06:00 UTC)**. This time is tentative. We will update this announcement when the schedule is confirmed.

| Item | Details |
|---|---|
| Planned restart | **December 2, 2026, 14:00 Singapore time / 06:00 UTC** |
| Last finalized block retained from the old chain | **7,155,515** |
| First block under the new rules | **7,155,516** |
| Endurance mainnet chain ID | **648** |

## For everyday users

**No action is required if you use Endurance through a wallet or an app.** You can keep your current wallet, address and network settings. Once the network resumes and your wallet or app reconnects, you can use Endurance as usual. The technical instructions below are for node operators.

If you use an exchange, please check its announcement for when Endurance deposits and withdrawals reopen.

## Why a hard fork is needed

Following the bridge incident, Endurance needs to recover affected funds and restart consensus with new validator signing keys. All nodes must apply the same balance changes at the same block and follow the same new beacon chain. This requires a coordinated upgrade of both the execution layer and the consensus layer.

## What changes

- **ACE recovery.** At block **7,155,516**, the upgraded Geth client will transfer approximately **53.737 million ACE** from 35 identified addresses to the recovery treasury. **The total supply of ACE stays the same.** The treasury receives exactly the amount deducted from those addresses.
- **FAME adjustment.** Two stakes linked to the incident will be removed from the FAME pool. The corresponding **2 million FAME** will be burned, reducing the FAME token supply by that amount. The 2 million ACE recovered from the pool is included in the ACE recovery total above.
- **New beacon chain genesis.** The beacon chain will restart with a new genesis state and new validator signing keys. Endurance will retain its execution history through block **7,155,515**. Wallet addresses and the mainnet chain ID stay the same.
- **Project-operated validators.** The project’s **33,000** original `0x01` validators will be consolidated into **515** validators with `0x02` compounding withdrawal credentials. Their combined balance at the transition remains **1,056,068.253134012 ACE**, including accrued rewards. They will keep the same withdrawal address.

## What node operators need to do

1. **Install the Endurance recovery build of Geth.** This build contains the recovery rules for block **7,155,516**. We will publish the version, download link and checksum on GitHub. If you already run Geth, you may be able to reuse your execution database as described below.
2. **Start the beacon node with the new genesis.** Once the restart time is confirmed, we will publish `genesis.ssz`, `config.yaml`, bootnode information and checksums. Use a **fresh beacon-node data directory** with the new files. The old beacon database is optional for historical queries and can be kept offline.
3. **Switch to Geth if you use another execution client.** Given the recovery timeline, Geth is the only execution client we are releasing for this fork. Operators using **Nethermind, Besu, Reth or Erigon** should prepare a separate Geth data directory and follow the migration guide when it is published. Geth cannot open another client’s database.
4. **Verify the new chain.** Once the new beacon chain reaches its scheduled genesis time and block **7,155,516** has been produced, you can query its hash from an upgraded Endurance execution-layer node. Check that its parent hash matches the hash listed below for block **7,155,515**. Exchanges and custodians should verify that an independent upgraded node reports the same hash for **7,155,516** and wait until the new chain has finalized **7,155,516** before reopening deposits and withdrawals.

### Optional: reuse an existing Geth database

The retained execution block is **7,155,515**. Its hash is:

`0x5f44432f34ad074de48e76784c2ac0735139440682d7eda850d1e98df63734d3`

If your Geth head is already at this block, verify the hash and confirm that you can read account balances at that height. You can skip the rewind.

If your Geth head is **above** this block and you want to avoid a full resync:

1. Stop Geth cleanly and make an independent copy of its database, including the `ancient` data if stored separately. Keep the original offline.
2. Start Geth on the **working copy only**, isolated from peers and consensus clients. Verify that block `7,155,515` in the copy has the hash shown above.
3. Rewind the working copy through its local IPC socket. Replace the example path with the socket for that copy. The command removes later blocks from the copy.

   ```bash
   geth attach --exec 'debug.setHead("0x6d2f3b")' /path/to/working-copy/geth.ipc
   ```

4. Restart the copy in isolation. Before connecting it to the new beacon node, verify that its latest block is exactly **7,155,515**, that the hash matches, and that an account balance query at that block succeeds. If pruning has removed the required state or the rewind lands below that height, use the recovery procedure in the forthcoming node migration guide.

**For explorers and indexers:** Geth applies the recovery directly to the block state. The ACE transfers have no transaction hashes, and the FAME burn has no ERC-20 `Transfer` event. Compare the state at blocks **7,155,515** and **7,155,516** to reconcile balances.

## Community validators

We will return **each community validator’s full balance at block 7,155,515** to its existing withdrawal address after the upgrade. This applies to all community validators, including those already using Geth. You do not need to migrate or restart a node to receive your refund.

Affected community stakers will also receive **additional ACE compensation**. We will announce the amount and payment schedule separately.

## Release materials

| Item | Availability |
|---|---|
| Endurance recovery Geth build, version and checksum | To be published on GitHub |
| Beacon chain genesis, configuration, bootnodes and checksums | To be published after the restart time is confirmed |
| Node migration guide | To be published |

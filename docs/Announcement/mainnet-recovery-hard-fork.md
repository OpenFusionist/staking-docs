---
sidebar_position: 50
---

# Endurance Mainnet Recovery Hard Fork

The proposed genesis time for the new Endurance beacon chain is **Wednesday, December 2, 2026 at 14:00 Singapore time (06:00 UTC)**. The execution-layer recovery rules take effect at **block 7,155,516**.

<table>
  <tbody>
    <tr>
      <th scope="row">New beacon chain genesis time</th>
      <td><strong>December 2, 2026 at 14:00 Singapore time (06:00 UTC)</strong></td>
    </tr>
    <tr>
      <th scope="row">Last finalized pre-fork execution block</th>
      <td><strong>7,155,515</strong></td>
    </tr>
    <tr>
      <th scope="row">Execution-layer hard fork activation block</th>
      <td><strong>7,155,516</strong></td>
    </tr>
    <tr>
      <th scope="row">Endurance mainnet chain ID</th>
      <td><strong>648</strong></td>
    </tr>
  </tbody>
</table>

## For everyday users

**Wallet and app users do not need to take any action.** Keep your current address and network settings. Once block production resumes and your app reconnects, you can use Endurance as usual.

If you use an exchange, check its announcement for when Endurance deposits and withdrawals reopen.

## Why a hard fork is needed

To recover funds from the bridge incident, all nodes must apply the same balance changes at block **7,155,516**. They must also follow a new beacon chain with new validator signing keys. Both changes require coordination across the network.

## What changes

- **ACE recovery.** Geth will transfer approximately **53.737 million ACE** from 35 identified addresses to the recovery treasury. The treasury receives exactly the amount deducted. **Total ACE supply stays the same.**
- **FAME adjustment.** The fork removes two stakes linked to the incident and burns the corresponding **2 million FAME**, reducing FAME supply by that amount. The **2 million ACE** recovered from the pool is already included in the ACE total above.
- **New beacon chain genesis.** Endurance keeps its execution history through block **7,155,515**. Only the beacon chain starts from a new genesis state. Wallet addresses and the mainnet chain ID stay the same.
- **Project-operated validators.** The project will consolidate its **33,000** original `0x01` validators into **515** validators with `0x02` compounding withdrawal credentials. Their combined balance remains **1,056,068.253134012 ACE**, including accrued rewards. The withdrawal address stays the same.

## What node operators need to do

1. **Upgrade to Endurance Geth v1.15.14.** This is the only execution client released for this fork. If you use Nethermind, Besu, Reth or Erigon, give Geth a separate data directory and keep your old database.
2. **Prepare your beacon node.** You can keep compatible beacon software. Once the genesis time is confirmed, download the new beacon files and bootnodes listed under [Release materials](#release-materials). Verify the checksums and use a new, empty beacon data directory. You can keep the old beacon database offline for historical queries.
3. **Verify the chain before reopening deposits and withdrawals.** Check that block **7,155,516** has the parent hash shown below. Wait for that block to be finalized and confirm that an independent upgraded node reports the same hash for **7,155,516**. The [node migration guide](./mainnet-recovery-node-migration.md) includes the commands.

### Optional: reuse an existing Geth database

The last finalized pre-fork execution block is **7,155,515**. Its hash is:

`0x5f44432f34ad074de48e76784c2ac0735139440682d7eda850d1e98df63734d3`

If your Geth database is at this height, check the hash and confirm you can read a balance at that block. If your old node went past it, rewind **only an isolated copy**. Follow [step 2 of the migration guide](./mainnet-recovery-node-migration.md#2-prepare-your-execution-data) to back up the database, check the copy and rewind it if needed.

**For exchanges and explorers tracking affected balances:** Compare the account and token balances at blocks **7,155,515** and **7,155,516**. The ACE recovery transfers have no transaction hashes, and the FAME burn has no ERC-20 `Transfer` event.

## Community validators

After the upgrade, we will return **each community validator's full balance at block 7,155,515** to its existing withdrawal address, even if the node stays offline. This applies regardless of which execution client the operator used, including Geth.

Affected community stakers will also receive **additional ACE compensation**. We will announce the amount and payment schedule separately.

## Release materials

| Item | Availability |
|---|---|
| Endurance Geth for Linux/amd64 | [v1.15.14 on GitHub](https://github.com/OpenFusionist/go-ethereum/releases/tag/v1.15.14) (marked as a pre-release) |
| Beacon chain genesis, configuration, bootnodes and checksums | To be published once the genesis time for the new beacon chain is confirmed |
| Node migration guide | [Read the guide](./mainnet-recovery-node-migration.md) |

Pull the Linux/amd64 image by its published registry digest:

```bash
docker pull ghcr.io/openfusionist/go-ethereum@sha256:9b00183842ee5a3c49545728a103bec638731e6bb0384645a70c05c02fcfc643
```

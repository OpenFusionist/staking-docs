---
sidebar_position: 0
---

###  For Legacy Reth-Lighthouse Node migrate to EthPillar

below is the process for migrating an existing validator from a legacy Reth-Lighthouse setup to the EthPillar way. Follow these steps carefully to ensure a smooth and safe transition.


#### 1. Safely Shut Down Your Legacy Node

The first step is to locate your validator keys and securely stop your old node. This prevents any risk of double-signing, which can lead to slashing penalties.

First, find the absolute path to your `validator_keys` directory. You will need this exact path later to import your keys into EthPillar.

```bash
# Replace /path/to/your/setup with the actual location of your node files.
find /path/to/your/setup/mainnet-reth-lighthouse/validator_keys
```

Once you have recorded the `validator_keys` path, navigate to your node's directory and execute the shutdown script.

```bash
cd mainnet-reth-lighthouse
./down.sh
```

> **CRITICAL:** To prevent double-signing penalties (slashing), it is crucial to wait for at least **two full epochs (approximately 13 minutes)** after shutting down your old node before your new validator comes online. This waiting period ensures your old validator is fully offline from the network's perspective. Also do not manually restart the old reth-lighthouse node. For safety's sake, completely delete the old directory after the migration is completed.

---

#### 2. Set Up Your New EthPillar Node

Next, install and configure your new node using the EthPillar.

Follow the official EthPillar documentation to **[Setup Validator for Endurance](https://openfusionist.github.io/staking-docs/getting-started/ethpillar/)**. This instructional **[video guide](https://www.youtube.com/watch?v=YLuZPUW9Q9Q)** can also be a helpful reference.

> **IMPORTANT:** Since you are migrating existing validator keys, you can **skip** the step titled `Generate Validator Key & Send Deposit`. You will be importing your keys directly in the next step, not creating new ones.

---

#### 3. Import Your Validator Keys into EthPillar

With your EthPillar node running, you can now import your existing validator keys.

1.  In the EthPillar Terminal, navigate to the **Validator** section.
2.  Choose the option: **Generate/Import Validator Keys**.
3.  Click on **Import Validator Keys from Offline key generation or Backup**.
4.  In the input field, provide the `validator_keys` path that you recorded in Step 1.
5.  Click **Import**.
6.  You will be prompted to enter the password for decrypting the keystore files. Enter your validator key password and continue to the next step.

> **NOTE:** You will **not** need to upload a `deposit-data.json` file, as your validator is already active on the Beacon Chain. You can safely omit or skip this part of the import process.

---

#### 4. Verify the Import and Monitor Your Validator

After importing the keys, it's essential to check the logs to confirm that your validator client has successfully recognized and loaded them.

Check the logs of your new validator client. You are looking for a log entry that confirms the number of validators being managed.

For example, if your logs show `validators=1` (or whatever number of validators you imported), the import was successful.

```bash
# Example log from a Nimbus validator client managed by EthPillar
Jul 21 09:16:24 dev nimbus_validator_client[200349]: INF 2025-07-21 09:16:24.000+02:00 Slot start                                 slot=3629182 epoch=113411 attestationIn=<unknown> blockIn=<unknown> validators=1 node_status=synced delay=1ms682us998ns
```

If the `validators=` value matches the number of keys you imported, your migration is complete. Your validator is now successfully running on EthPillar.


#### 5. Clean up your old node

After successfully running EthPillar, you can delete the old node file directory to avoid accidentally restarting the old node, which could lead to slashing.

```bash
rm -rf mainnet-reth-lighthouse
```


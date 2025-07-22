---
sidebar_position: 150
---

# Endurance Network's Pectra Hardfork

If you are a regular Web3 user for Endurance Network, you can safely ignore this section. The specific upgrade guide below is intended for node operators.

## 1.Upgrade basic info

| Item | Value |
| --- | --- |
| Upgrade Time | Wed Aug 20 2025 06:00:00 GMT+0000 |
| Upgrade Epoch | 120150 |
| Upgrade Block | ~3,828,237 |

The upgrade should be completed before this deadline, and we recommend doing it **as early as possible** to account for any unforeseen issues.

for more technical details about Pectra fork, please refer to [High-level Pectra Fork overview](https://ethereum.org/en/roadmap/pectra/)

## 2. How to upgrade

### for Exchange/Third-party partner

#### Pull the Network Config

- download the network config from our github repo:
```bash
git clone https://github.com/OpenFusionist/network_config.git && cd network_config

./decompress.sh 

(optional) check md5sum 
> sha256sum genesis.json
2cc997a7da959439555383636278d1a94738f4f95d268e5ede8e7b7b802c5b31 genesis.json
> sha256sum chainspec.json
f4c5e8218ee8843b635427b8f10a4dd6475bfaa1363315c33a1bdcffe9cc4b96 chainspec.json 
> sha256sum besu.json
389a9059a52a8b0b3a4cafbb1d8461027d2ea6d0b6efedde4d62d4496d035d6f besu.json
>sha256sum  config.yaml
0170e5483626880589de6d8f4bd5dd56df26688aeb2470f596773b927a73295c  config.yaml

```

- (Optional) DIFF origin and updated genesis data:
    - [install json diff tools: jd](https://github.com/josephburnett/jd)
```bash
# 1. diff <origin-updated> genesis.json

jd origin/genesis.json updated/genesis.json
@ ["config","blobSchedule"]
+ {"cancun":{"baseFeeUpdateFraction":3338477,"max":6,"target":3},"prague":{"baseFeeUpdateFraction":5007716,"max":9,"target":6}}
@ ["config","depositContractAddress"]
+ "0xace0000000000000000000000000000000000ace"
@ ["config","pragueTime"]
+ 1755669600

# 2. diff <origin-updated> config.yaml
diff origin/config.yaml updated/config.yaml
index 63146d5..ea64a92 100644
--- a/pectra/config.yaml
+++ b/pectra/config.yaml
@@ -37,6 +37,14 @@ CAPELLA_FORK_EPOCH: 0
 DENEB_FORK_VERSION: 0x50000001
 DENEB_FORK_EPOCH: 1
 
+# Electra
+ELECTRA_FORK_VERSION: 0x60000001
+ELECTRA_FORK_EPOCH: 120150
+
+# Fulu
+FULU_FORK_VERSION: 0x70000001
+FULU_FORK_EPOCH: 18446744073709551615
+
 # Time parameters
 # ---------------------------------------------------------------
 # 12 seconds
@@ -79,15 +87,13 @@ DEPOSIT_CONTRACT_ADDRESS: 0xace0000000000000000000000000000000000ace
 # Networking
 # ---------------------------------------------------------------
 # `10 * 2**20` (= 10485760, 10 MiB)
-GOSSIP_MAX_SIZE: 10485760
+MAX_PAYLOAD_SIZE: 10485760
 # `2**10` (= 1024)
 MAX_REQUEST_BLOCKS: 1024
 # `2**8` (= 256)
 EPOCHS_PER_SUBNET_SUBSCRIPTION: 256
 # `MIN_VALIDATOR_WITHDRAWABILITY_DELAY + CHURN_LIMIT_QUOTIENT // 2` (= 33024, ~5 months)
 MIN_EPOCHS_FOR_BLOCK_REQUESTS: 33024
-# `10 * 2**20` (=10485760, 10 MiB)
-MAX_CHUNK_SIZE: 10485760
 # 5s
 TTFB_TIMEOUT: 5
 # 10s
@@ -113,4 +119,18 @@ MAX_REQUEST_BLOB_SIDECARS: 768
 # `2**12` (= 4096 epochs, ~18 days)
 MIN_EPOCHS_FOR_BLOB_SIDECARS_REQUESTS: 4096
 # `6`
-BLOB_SIDECAR_SUBNET_COUNT: 6
\ No newline at end of file
+BLOB_SIDECAR_SUBNET_COUNT: 6
+# `uint64(6)`
+MAX_BLOBS_PER_BLOCK: 6
+
+# Electra
+# 2**7 * 10**9 (= 128,000,000,000)
+MIN_PER_EPOCH_CHURN_LIMIT_ELECTRA: 128000000000
+# 2**8 * 10**9 (= 256,000,000,000)
+MAX_PER_EPOCH_ACTIVATION_EXIT_CHURN_LIMIT: 256000000000
+# `9`
+BLOB_SIDECAR_SUBNET_COUNT_ELECTRA: 9
+# `uint64(9)`
+MAX_BLOBS_PER_BLOCK_ELECTRA: 9
+# MAX_REQUEST_BLOCKS_DENEB * MAX_BLOBS_PER_BLOCK_ELECTRA
+MAX_REQUEST_BLOB_SIDECARS_ELECTRA: 1152

```


- backup your origin genesis files,and put above new files in the same path.
eg.
```bash
1. backup
cp -r /path/to/your/genesis.json /path/to/your/genesis.json.bak
cp -r /path/to/your/chainspec.json /path/to/your/chainspec.json.bak
cp -r /path/to/your/besu.json /path/to/your/besu.json.bak
cp -r /path/to/your/config.yaml /path/to/your/config.yaml.bak

2. replace
cp network_config/genesis.json /path/to/your/genesis.json
cp network_config/chainspec.json /path/to/your/chainspec.json
cp network_config/besu.json /path/to/your/besu.json
cp network_config/config.yaml /path/to/your/config.yaml
```



#### Update client version

You need to be running these client versions or any later stable release before the Pectra fork epoch.

**For consensus/validator clients:**

- [Lighthouse version 7.0.0](https://github.com/sigp/lighthouse/releases/tag/v7.0.0)
    - If the previous launch included parameters: `--http-allow-sync-stalled` ,**remove** it. ref:https://github.com/sigp/lighthouse/issues/5430
- [Prysm version 6.0.0](https://github.com/OffchainLabs/prysm/releases/tag/v6.0.0)
[](https://github.com/sigp/lighthouse/releases/tag/v7.0.0)

**For execution clients:**

- [go-ethereum (Geth) version 1.15.10](https://github.com/ethereum/go-ethereum/releases/tag/v1.15.10)

For Geth, you need to stop the node and then re-execute the `init` command for the configuration to take effect. Here's an example, adjust according to the actual path:

```bash
# 1. init
docker run \
  --rm \
  -it \
  -v $(pwd)/execution-data:/execution-data \
  -v $(pwd)/../../el-cl-genesis-data:/el-cl-genesis-data \
  ethereum/client-go:v1.15.10 \
  --state.scheme=hash \
  --datadir=/execution-data \
  init \
  /el-cl-genesis-data/custom_config_data/genesis.json
  
 # 2. start node(below is a Demo Docker Compose file as reference)
 execution:
    image: ethereum/client-go:v1.15.10
    command:
      - --networkid=648
      - --state.scheme=path
      - --verbosity=4
      - --datadir=/execution-data
      - --http
      - --http.addr=0.0.0.0
      - --http.port=8545
      - --http.vhosts=*
      - --http.corsdomain=*
      - --http.api=admin,engine,net,eth,web3,debug,txpool
      - --ws
      - --ws.addr=0.0.0.0
      - --ws.port=8546
      - --ws.api=admin,engine,net,eth,web3,debug
      - --ws.origins=*
      - --allow-insecure-unlock
      - --nat=extip:${IP_ADDRESS}
      - --authrpc.port=8551
      - --authrpc.addr=0.0.0.0
      - --authrpc.vhosts=*
      - --authrpc.jwtsecret=/el-cl-genesis-data/jwt/jwtsecret
      - --syncmode=full
      - --rpc.allow-unprotected-txs
      - --metrics
      - --metrics.addr=0.0.0.0
      - --metrics.port=9001
      - --port=30303
      - --discovery.port=30303
      - --bootnodes=${EL_BOOTNODES}
    volumes:
      - ./execution-data:/execution-data
      - ./el-cl-genesis-data:/el-cl-genesis-data
    ports:
      - "8545:8545" 
      - "8546:8546" 
      - "8551:8551" 
      - "9001:9001" 
      - "30303:30303/tcp"
      - "30303:30303/udp"
    restart: unless-stopped
  
```

Check the docker logs If there is similar output, it indicates a successful upgrade, otherwise you can provide detailed error logs to our engineering team for help.
```bash
docker logs -f --tail 100 geth-execution 2>&1 | grep 'Prague'
INFO [07-16|09:17:36.478] Ready for fork activation                fork=Prague date="20 Aug 25 06:00 UTC" remaining=836h42m24s timestamp=1,755,669,600
INFO [07-16|09:20:48.271] Ready for fork activation                fork=Prague date="20 Aug 25 06:00 UTC" remaining=836h39m12s timestamp=1,755,669,600
INFO [07-16|09:23:48.289] Ready for fork activation                fork=Prague date="20 Aug 25 06:00 UTC" remaining=836h36m12s timestamp=1,755,669,600
```

You can check the latest block information on this Block Explorer to ensure your Execution Layer (EL) node block syncs to the latest block:

- https://explorer-endurance.fusionist.io/

You can check the latest slot information for the beacon node on this Dora Explorer to ensure your Consensus Layer (CL) node syncs to the latest slot:

- https://beacon.fusionist.io/


### for Solo Staker

solo staker use [ethpillar-endurance](https://github.com/OpenFusionist/EthPillar-Endurance) to upgrade, it greatly simplifies the upgrade process.
opening EthPillar in terminal:
```
ethpillar
```
1. Navigate to System Administration > Update EthPillar and then quit and relaunch ethpillar
2. Navigate to Execution Client > Update to latest release
3. Navigate to Consensus Client > Update to latest release
4. Navigate to MEV-Boost > Update to latest release

Check the logs. If there is similar output, it indicates a successful upgrade,otherwise you need to check the logs for more details and get help from our Discord.
```bash
journalctl -u execution --since today  | grep 'Prague'

Jul 16 08:06:22 dev reth[3417514]: - Prague                           @1755669600
```

### For Legacy Reth-Lighthouse Node

We recommend migrating to EthPillar. See the [Migration Guide](../getting-started/legacy-way/Migrate-to-ethpillar).

If you prefer to keep the legacy workflow, you can still upgrade your node to the Pectra Hardfork by following the [Legacy Upgrade Guide](https://github.com/OpenFusionist/mainnet-reth-lighthouse#upgrade-for-pectra-hardfork).

> **IMPORTANT:** The legacy scripts only support the Pectra Hardfork and will not be maintained for future upgrades.



## 3. Technical Support
If you have any questions about upgrade, feel free to ask:
- [Discord](https://discord.com/channels/926691694680870982/1212701304787566592)
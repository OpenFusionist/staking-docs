---
sidebar_position: 70
---

# Staking More Keys

## Generate more keys

Generate more keys by following the steps in [Generate Keys](./generate-key.md). **You must use the same keystore password as before.**

:::note

It's not necessary to use the same keystore password as before, but using the same password helps reduce complexity and the probability of operational errors.

:::

You will have two `deposit_data-` files and two `keystore-m-` files now, one old and one new:

```
validator_keys/
├── deposit_data-1716876797.json
├── deposit_data-1716882465.json
├── keystore-m_12381_3600_0_0_0-1716876797.json
└── keystore-m_12381_3600_0_0_0-1716882465.json
```

## Copy the Keystore File to the Node

Copy the keystore file to your node's `validator_keys` folder:

```
mainnet-reth-lighthouse/
├── validator_keys
│   ├── keystore-m_12381_3600_0_0_0-1716876797.json
│   ├── keystore-m_12381_3600_0_0_0-1716882465.json
```

Generate the secrets file again:

```bash
python3 lighthouseSecrets.py validator_keys/ 12345678
```

## Restart Your Node

Stop your node with this command:

```
./down.sh
```

Then start your node:

```
./start.sh
```

Check the node's status:

```
./status.sh
```

You will get this output, which contains two `voting_pubkey` loaded by the node:

```
---
Requesting current validator status...
Validator Status: {"data":[{"enabled":true,"description":"","voting_pubkey":"0xb8d4524f48828ff1b878918c2b403a9d693ffd078901b6b41b28fd76fed8abda12ec2e8bafe3f9b9b80322c238a7412b"},{"enabled":true,"description":"","voting_pubkey":"0xaeacbec992120142f1271abc77c78ec51d0137ed86e3820489a3419edd6aaf0c0d293ec91ed25980cc8a789c89bb820e"}]}
---
```

### Troubleshooting

You can check your validator logs using this command:

```
docker logs -f mainnet-reth-lighthouse-validator-1
```

If you accidentally start your node before generating the secrets file, and an error appears like this:

```
May 28 08:37:45.471 INFO Logging to file                         path: "/validator_keys/logs/validator.log"
May 28 08:37:45.477 INFO Lighthouse started                      version: Lighthouse/v5.1.3-3058b96
May 28 08:37:45.477 INFO Configured for network                  name: custom (/network_config)
May 28 08:37:45.477 INFO Starting validator client               validator_dir: "/validator_keys", beacon_nodes: ["http://beacon:5052/"]
May 28 08:37:45.477 INFO Metrics HTTP server started             listen_address: 0.0.0.0:5064
May 28 08:37:45.480 INFO Completed validator discovery           new_validators: 0

The validator_definitions.yml file does not contain either of the following fields for "/validator_keys/keystore-m_12381_3600_0_0_0-1716882465.json":

 - voting_keystore_password
 - voting_keystore_password_path

You may exit and update validator_definitions.yml or enter a password. If you choose to enter a password now then this prompt will be raised next time the validator is started.

Enter password (or press Ctrl+c to exit):
May 28 08:37:46.036 INFO Enabled validator                       voting_pubkey: 0xb8d4524f48828ff1b878918c2b403a9d693ffd078901b6b41b28fd76fed8abda12ec2e8bafe3f9b9b80322c238a7412b, signing_method: local_keystore
May 28 08:37:46.037 ERRO Failed to initialize validator          validator: 0xaeacbec992120142f1271abc77c78ec51d0137ed86e3820489a3419edd6aaf0c0d293ec91ed25980cc8a789c89bb820e, signing_method: local_keystore, error: UnableToReadPasswordFromUser("Error reading from tty: No such device or address (os error 6)")
May 28 08:37:46.037 CRIT Failed to start validator client        reason: Unable to initialize validators: UnableToReadPasswordFromUser("Error reading from tty: No such device or address (os error 6)")
May 28 08:37:46.037 INFO Internal shutdown received              reason: Failed to start validator client
May 28 08:37:46.037 INFO Shutting down..                         reason: Failure("Failed to start validator client")
Failed to start validator client
```

Just need to execution this command to delete the `validator_definitions.yml` file and restart your node again, everything will be fixed:

```
rm validator_keys/validator_definitions.yml
```

## Send Deposit

As in the [Send Deposit](./send-deposit.md) step, you need to send your newly generated `deposit_data-` file in the [staking launchpad](https://staking.fusionist.io/en/).

---
sidebar_position: 100
---

# Import Keys by Lighthouse


You **should not** use these parameters in your startup:

```
--validators-dir=/validator_keys
--secrets-dir=/validator_keys_secrets
```
:::note

It means you need to delete these [two lines](https://github.com/OpenFusionist/mainnet-reth-lighthouse/blob/main/compose.yaml#L93-L94) before starting your node:

:::

You can run this script in the `mainnet-reth-lighthouse` folder to import your keys:

```bash
./importAccount.sh ./validator_keys
```

You need to type your keystore's password and validate it. This output will show if everything is okay:

```
Running account manager for custom (/network_config) network
validator-dir path: "/root/.lighthouse/custom/validators"
WARNING: DO NOT USE THE ORIGINAL KEYSTORES TO VALIDATE WITH ANOTHER CLIENT, OR YOU WILL GET SLASHED.

Keystore found at "/validator_keys/keystore-m_12381_3600_0_0_0-1716876797.json":

 - Public key: 0xb8d4524f48828ff1b878918c2b403a9d693ffd078901b6b41b28fd76fed8abda12ec2e8bafe3f9b9b80322c238a7412b
 - UUID: 793186fa-6ece-40de-9614-64cb22efe9ed

If you enter the password it will be stored as plain-text in validator_definitions.yml so that it is not required each time the validator client starts.

Enter the keystore password, or press enter to omit it:

Password is correct.

Successfully imported keystore.
Successfully updated validator_definitions.yml.

Successfully imported 1 validators (0 skipped).

WARNING: DO NOT USE THE ORIGINAL KEYSTORES TO VALIDATE WITH ANOTHER CLIENT, OR YOU WILL GET SLASHED.
```

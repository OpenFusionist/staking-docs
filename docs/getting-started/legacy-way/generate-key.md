---
sidebar_position: 40
---

# Generate Keys

:::warning

You will lose your assets forever if you use the wrong CLI tool or wrong parameters to generate a key, and send a deposit using the wrong keys.

:::

## Cli Tool

### Get Started

On Endurance mainnet you must be use this cli tool to generate your validator's key:

- https://github.com/OpenFusionist/staking-deposit-cli

You can install this CLI from source using the repo's README. Note that using `virtualenv` is recommended and better, as this CLI tool only supports lower versions of Python.

You can also download the pre-built binary from this [release page](https://github.com/OpenFusionist/staking-deposit-cli/releases/tag/v2.7.0-endurance).

### Check your keys

You will get a folder named `validator_keys` after you generate the key, and two files inside it: one starting with `deposit_data-` and another starting with `keystore-`.

```
validator_keys/
├── deposit_data-1716876797.json
└── keystore-m_12381_3600_0_0_0-1716876797.json
```

The important thing is to make sure the `fork_version` is correct in the file starting with `deposit_data-`. Its value must be equal to `10000001`. You can verify this value with the `jq` command like this:

```
jq '.[].fork_version' validator_keys/deposit_data-1716876797.json
```

It will output:

```
"10000001"
```

This shows the `fork_version` is correct. If you run this command and it outputs another value, never use this key to deposit on Endurance!

## GUI Tool

You can build this GUI tool yourself (no pre-built version currently):

- https://github.com/OpenFusionist/wagyu-key-gen

## Additional Info

The Endurance mainnet uses these parameters to generate keys. If you are a professional user, you can use these parameters to do it:

| Name | Value |
| --- | --- |
| Genesis validator root | `0x6e1583608783377f139b7bac661aff7d5cca656af16ac34f9d0eda27dbf1316c` |
| Genesis fork version | `0x10000001` |



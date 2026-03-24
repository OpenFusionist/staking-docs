---
sidebar_position: 100
---

# Lighthouse v7.0.2 Security Patch

**Date:** March 24, 2026

## Summary

Lighthouse v7.0.2 is a **security patch** for the Endurance network. It backports important security fixes from upstream Lighthouse v8.1.1 and v8.1.2 into the v7.x release line used by Endurance.

**All Endurance node operators running Lighthouse are strongly recommended to upgrade immediately.**

For full release details, see: [GitHub Release — v7.0.2](https://github.com/OpenFusionist/lighthouse/releases/tag/v7.0.2)

## How to Upgrade

### For Exchange/Third-party Partner

Update the Lighthouse image in your `compose.yaml` or startup script:

```diff
- image: sigp/lighthouse:v7.0.0
+ image: ghcr.io/openfusionist/lighthouse:v7.0.2
```

Then restart your beacon node and validator client:
```bash
docker compose pull
docker compose up -d
```

If you use pre-built binaries, download the new version from the [release page](https://github.com/OpenFusionist/lighthouse/releases/tag/v7.0.2) and replace your existing `lighthouse` binary.

### For Solo Staker

If you are using [EthPillar-Endurance](https://github.com/OpenFusionist/EthPillar-Endurance), **no action is required** — EthPillar does not use Lighthouse.

### For Legacy Reth-Lighthouse Node

If you are using [mainnet-reth-lighthouse](https://github.com/OpenFusionist/mainnet-reth-lighthouse), simply pull the latest changes and restart:

```bash
git pull
./start.sh
```

## Technical Support

If you have any questions, feel free to ask:
- [Discord](https://discord.com/channels/926691694680870982/1212701304787566592)

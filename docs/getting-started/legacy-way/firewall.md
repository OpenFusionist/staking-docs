---
sidebar_position: 40
---
# Setup Firewall

A firewall is important to protect your node's security. If you do not set up a firewall and allow all port access, your node may be compromised or you may lose your assets! So please be cautious about opening your ports to the network.

## Reth-Lighthouse Template

If you start your node using the Reth-Lighthouse template, these ports are necessary to open:

```
22/tcp
30303/tcp
30303/udp
9000/tcp
9000/udp
9001/udp
```


### ufw

You can use `ufw` on your Linux system, and use this command to set up your node's firewall:

```
sudo ufw allow 22/tcp
sudo ufw allow 30303/tcp
sudo ufw allow 30303/udp
sudo ufw allow 9000/tcp
sudo ufw allow 9000/udp
sudo ufw allow 9001/udp
```

After allowing these ports, activate your `ufw`:

```
sudo ufw enable
```

And you can check your `ufw` status by:

```
sudo ufw status
```

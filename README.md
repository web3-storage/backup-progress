# backup progress

Show the progress of the `backup` job by tailing the cloudwatch logs

```
❯ tail -n +1 -f backup-log-full.log | node progress.js
 ██████████████████░░░░░░░░░░░░░░░░░░░░░░ nft-0.json | 46% | 537,994 of 1,000,000 left
 ████████████████████████░░░░░░░░░░░░░░░░ nft-1.json | 61% | 389,359 of 1,000,000 left
 ████████████████████████████████████████ nft-2.json | 99% | 5,035 of 1,000,000 left
 ████████████████████████████████░░░░░░░░ nft-3.json | 79% | 203,383 of 1,000,000 left
 ████████████████████████████░░░░░░░░░░░░ nft-4.json | 69% | 300,458 of 1,000,000 left
 ████████████████████████████████████████ nft-5.json | 99% | 3,425 of 1,000,000 left
 ███████████████████████░░░░░░░░░░░░░░░░░ nft-6.json | 58% | 413,764 of 1,000,000 left
 ████████████████████████████████████████ nft-7.json | 99% | 4,462 of 1,000,000 left
 ██████████████████████████████░░░░░░░░░░ nft-8.json | 75% | 246,987 of 1,000,000 left
 ████████████████████████████████████████ nft-9.json | 99% | 4,529 of 1,000,000 left
 ████████████████████████████████████████ nft-10.json | 99% | 8,039 of 1,000,000 left
 ████████████████████████████████████████ nft-11.json | 99% | 6,205 of 1,000,000 left
 ████████████████████████████████████████ nft-12.json | 99% | 1,460 of 1,000,000 left
 ████████████████████████████████████████ nft-13.json | 99% | 2,841 of 1,000,000 left
 ████████████████████████████████████████ nft-14.json | 99% | 4,457 of 1,000,000 left
 ████████████████████████████████████████ nft-15.json | 99% | 4,746 of 1,000,000 left
 ████████████████████████████████████████ nft-16.json | 99% | 5,340 of 1,000,000 left
 ████████████████████████████████████████ nft-17.json | 99% | 8,138 of 1,000,000 left
 ████████████████████████░░░░░░░░░░░░░░░░ nft-18.json | 59% | 401,216 of 1,000,000 left
 ███████████████████████████████████████░ nft-19.json | 97% | 22,078 of 1,000,000 left
 ████████████████████████████████████████ nft-20.json | 99% | 4,593 of 1,000,000 left
 ████████████████████████████████████████ nft-21.json | 99% | 3,960 of 1,000,000 left
 ███████████████████████████░░░░░░░░░░░░░ nft-22.json | 66% | 336,298 of 1,000,000 left
 ████████████████████████████████████████ nft-23.json | 99% | 5,865 of 1,000,000 left
 ████████████████████████████████████████ nft-24.json | 99% | 5,492 of 1,000,000 left
 ██████████████████████████░░░░░░░░░░░░░░ nft-25.json | 64% | 358,388 of 1,000,000 left
 ████████████████████████████████████████ nft-26.json | 99% | 3,114 of 1,000,000 left
 ██████████████████████████████░░░░░░░░░░ nft-27.json | 75% | 245,303 of 1,000,000 left
 ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ nft-28.json | 30% | 694,551 of 1,000,000 left
 ████████████████████████████████████████ nft-29.json | 99% | 5,593 of 1,000,000 left
 ██████████████████████░░░░░░░░░░░░░░░░░░ nft-30.json | 55% | 87,707 of 196,294 left
 ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ web3-0.json | 3% | 960,808 of 1,000,000 left
 ███████████████████░░░░░░░░░░░░░░░░░░░░░ web3-1.json | 46% | 533,830 of 1,000,000 left
 █████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ web3-2.json | 32% | 675,264 of 1,000,000 left
 ██████████████████████████░░░░░░░░░░░░░░ web3-3.json | 64% | 354,639 of 1,000,000 left
 ███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ web3-4.json | 17% | 474,317 of 576,770 left
 ████████████████████████████████░░░░░░░░ total       | 78% | 7,323,638 of 34,773,064 left
```

## Getting started

You need:

- macos or linux (or a shell that can run `tail`)
- aws cli installed and configured with access to the PL nitro aws account.
- node v18
- `pnpm`

Run `pnpm i` to install the deps

### Tailing the logs

Run `node tail.js` to print out the command you can copy and paste to run that will tail the cloudwatch logs for the backup process. e.g

```bash
$ node tail.js
## Run this (AWS_PROFILE in env as needed)
aws logs tail prod-backup-ipfs-cluster --since 2023-02-01T12:00:00.000Z --region us-west-2 --format short --filter-pattern '{ $.status = "ok" }' --follow >> backup-log-full.log
```

This will create `backup-log-full.log` in the root of the project, and may take a few hours to fetch ~3GB of logs on the first run.

The command is provided for you to run as you see fit, as you are the boss here, we're just trying to make it easier. It's pretty handy to keep the log tailing serperate from the progress indicating.

### Resuming the tail

You will at some point want to close your laptop or your network will fail, or aws will just give up. No bother! You can pick up where you left off.

Run `node tail.js` again, and it will read `backup-log-full.log`, pickout the last timestamp and provide you with an updated version of that command you can run with the `--since` value set so you start streaming from where you left off.

Note that the `>>` in the command is important as you want to append the subsequent logs on to the end of the file rather than overwriting it.

### Showing progress

Visualise the `backup-log-full.log` by piping it in to `progress.js`

```bash
tail -n +1 -f backup-log-full.log | node progress.js
```

Here we tell `tail -n +1` asks tail to start from the first line of the file, and `-f` has it follow along, outputting new lines as they are added. This means we can start showing progress immediately, and continue as our local copy of the log catches up to the current time.


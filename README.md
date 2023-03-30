# backup progress

Show the progress of the [backup] job by tailing the cloudwatch logs

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
- aws cli installed and configured with access to the aws account that backup is runnning in
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

### Resuming the tail

You will at some point want to close your laptop or your network will fail, or aws will just give up. No bother! You can pick up where you left off.

Run `node tail.js` again, and it will read `backup-log-full.log`, pickout the last timestamp and provide you with an updated version of that command you can run with the `--since` value set so you start streaming from where you left off.

Note that the `>>` in the command is important as you want to append the subsequent logs on to the end of the file rather than overwriting it.

### Showing progress

Visualise the `backup-log-full.log` by piping it in to `progress.js`

```bash
tail -n +1 -f backup-log-full.log | node progress.js
```

Here we tell `tail -n +1` asks tail to start from the first line of the file, and `-f` has it follow along, outputting new lines as they are added. This means we can start showing progress immediately, and continue as our local copy of the log catches up to the current time.

## Notes

At time of writing (2023-03-29) the following batches have completed. These show up as 99% in the progress indicator when i run it, so it's likely that my local copy of the log has dropped some log lines along the way.

```csv
@timestamp,@message,file
2023-03-03 15:57:26.849,2023-03-03T15:57:26.848Z backup:nft-2.json backup complete 🎉,nft-02.json
2023-02-17 06:53:33.598,2023-02-17T06:53:33.598Z backup:nft-5.json backup complete 🎉,nft-05.json
2023-02-18 02:58:31.295,2023-02-18T02:58:31.295Z backup:nft-7.json backup complete 🎉,nft-07.json
2023-02-16 05:48:44.567,2023-02-16T05:48:44.567Z backup:nft-9.json backup complete 🎉,nft-09.json
2023-03-05 16:34:02.234,2023-03-05T16:34:02.234Z backup:nft-11.json backup complete 🎉,nft-11.json
2023-02-20 19:43:27.253,2023-02-20T19:43:27.253Z backup:nft-12.json backup complete 🎉,nft-12.json
2023-02-26 09:31:34.912,2023-02-26T09:31:34.912Z backup:nft-13.json backup complete 🎉,nft-13.json
2023-03-02 20:51:45.711,2023-03-02T20:51:45.711Z backup:nft-13.json backup complete 🎉,nft-13.json
2023-03-12 01:38:20.245,2023-03-12T01:38:20.245Z backup:nft-14.json backup complete 🎉,nft-14.json
2023-03-05 07:18:52.838,2023-03-05T07:18:52.838Z backup:nft-15.json backup complete 🎉,nft-15.json
2023-03-04 10:33:40.773,2023-03-04T10:33:40.773Z backup:nft-16.json backup complete 🎉,nft-16.json
2023-03-03 17:15:20.788,2023-03-03T17:15:20.787Z backup:nft-17.json backup complete 🎉,nft-17.json
2023-03-03 06:28:01.071,2023-03-03T06:28:01.071Z backup:nft-20.json backup complete 🎉,nft-20.json
2023-03-11 10:04:48.225,2023-03-11T10:04:48.222Z backup:nft-21.json backup complete 🎉,nft-21.json
2023-03-04 23:52:48.021,2023-03-04T23:52:48.021Z backup:nft-23.json backup complete 🎉,nft-23.json
2023-03-06 01:34:56.563,2023-03-06T01:34:56.562Z backup:nft-24.json backup complete 🎉,nft-24.json
2023-02-19 07:14:27.854,2023-02-19T07:14:27.854Z backup:nft-26.json backup complete 🎉,nft-26.json
2023-03-04 00:30:03.750,2023-03-04T00:30:03.750Z backup:nft-29.json backup complete 🎉,nft-29.json
```

Per the following query across the last 2 months

```
fields @timestamp, @message
| filter @message like "backup complete"
| sort @timestamp desc
```

https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:logs-insights$3FqueryDetail$3D~(end~'2023-03-30T08*3a20*3a41.000Z~start~'2023-02-01T09*3a08*3a42.000Z~timeType~'ABSOLUTE~tz~'Local~editorString~'fields*20*40timestamp*2c*20*40message*0a*7c*20filter*20*40message*20like*20*22backup*20complete*22*0a*7c*20sort*20*40timestamp*20desc~queryId~'78b3f82c-5b6c-4914-9105-8131076af8a5~source~(~'prod-backup-ipfs-cluster))$26tab$3Dlogs



[backup]: https://github.com/web3-storage/backup

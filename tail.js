import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { subSeconds } from 'date-fns'

const FILE = 'backup-log-full.log'

// no logs before 2023-02-06T12:22:01
let since = '2023-02-01T12:00:00.000Z'

// read the timestamp of the last log line in FILE, and set since to that -1 second
// ...some overlap is fine, but gaps are not fine.
if (existsSync(FILE)) {
  // e.g. 2023-03-30T09:25:28 {"sourceDataFile":"nft-3.json","cid":"bafybeicyxrarjti63necdfg72sz2wnyqhbmcr3jmao4o62ma5vrvak7yrq","status":"ok","size":516978}
  const lastLine = execSync(`tail -1 ${FILE}`, { encoding: 'utf-8' })
  const lastTimestamp = lastLine.substring(0, 19)

  // ensure it's parsed as UTC
  const date = new Date(lastTimestamp + '.000Z')

  // ensure we tail the logs from before the last line of our current log
  since = subSeconds(date, 1).toISOString()
}

console.log('## Run this (AWS_PROFILE in env as needed)')
console.log(`aws logs tail prod-backup-ipfs-cluster --since ${since} --region us-west-2 --format short --filter-pattern '{ $.status = "ok" }' --follow >> ${FILE}`)

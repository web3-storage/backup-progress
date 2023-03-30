import readline from 'node:readline'
import cliProgress from 'cli-progress'

const COUNT_PER_FILE = 1_000_000
const inputCounts = new Map([
  ['nft-30.json', 196294],
  ['web3-4.json', 576770]
])
function getCountPerFile (file) {
  return inputCounts.get(file) ?? COUNT_PER_FILE
}

const nice = Intl.NumberFormat()

// create new container
const multibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true,
  format: ' {bar} {file} | {percentage}% | {remain} of {nicetotal} left'
}, cliProgress.Presets.shades_grey)

const bars = new Map()
let maxAll = 0
for (const i of [...Array(31).keys()]) {
  const file = `nft-${i}.json`
  const max = getCountPerFile(file)
  maxAll += max
  bars.set(file, multibar.create(max, 0, { file, bytes: 0, remain: nice.format(getCountPerFile(file)), nicetotal: nice.format(max) }))
}
for (const i of [...Array(5).keys()]) {
  const file = `web3-${i}.json`
  const max = getCountPerFile(file)
  maxAll += max
  bars.set(file, multibar.create(max, 0, { file, bytes: 0, remain: nice.format(getCountPerFile(file)), nicetotal: nice.format(max) }))
}
bars.set('total', multibar.create(maxAll, 0, { file: 'total      ', remain: nice.format(maxAll), nicetotal: nice.format(maxAll) }))

const input = readline.createInterface({ input: process.stdin })
const metrics = new Map()
let allRemain = maxAll
let lastTimestamp = -1
let lastCid = ''
let rewind = false
for await (const line of input) {
  // 2023-02-27T15:00:21 {"sourceDataFile":"nft-24.json","cid":"QmS9Vs5UPuVViH6pK56FYZFbjMQFzr5V9BGboUdk8HF4K8","status":"ok","size":731848}
  const { sourceDataFile, size, cid } = JSON.parse(line.substring(20))
  const timestamp = line.substring(0, 19)
  if (timestamp < lastTimestamp) {
    // back in time! if we get a log dump and then try to resume from the date, cloudwatch goes further back than we asked.
    rewind = true
    continue
  }
  if (rewind && timestamp === lastTimestamp) {
    if (cid === lastCid) {
      // caught up!
      rewind = false
    }
    continue
  }
  lastCid = cid
  lastTimestamp = timestamp
  const res = metrics.get(sourceDataFile) ?? { count: 0, bytes: 0 }
  const bytes = res.bytes + size
  const count = res.count + 1
  const remain = getCountPerFile(sourceDataFile) - count
  allRemain--
  metrics.set(sourceDataFile, { count, bytes })
  bars.get(sourceDataFile).update(count, { bytes, remain: nice.format(remain) })
  bars.get('total').increment(1, { remain: nice.format(allRemain) })
}

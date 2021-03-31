#! node
// Generate new cron job

// This is not typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')


if (process.argv.length < 3) {
    console.error('Usage: mkjob [job name]')
    process.exit(-1)
}

// Convert name to camelCase
const jobName = process.argv[2]
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/([^\w]|_)/g, '')

const jobsDir = `${__dirname}/../src/jobs`
fs.mkdirSync(jobsDir, { recursive: true })

fs.writeFileSync(`${jobsDir}/${jobName}.ts`,
    `import { CronJob } from 'cron'

export const job = async (): Promise<void> => {
    // TODO: implement the job
}

// Every 5 minutes // TODO: change time string
export default new CronJob('*/5 * * * *', job)
`)

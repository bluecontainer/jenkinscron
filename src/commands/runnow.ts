import {Command, flags} from '@oclif/command'
import * as parser from 'cron-parser'
import * as fs from 'fs'
import * as process from 'process'

export default class Runnow extends Command {
  static description = 'run the following commands now'

  static flags = {
    help: flags.help({char: 'h'}),
    interval: flags.integer({char: 'i', description: 'polling interval in seconds', default: 60, required: true}),
    exists: flags.string({char: 'e', description: 'check if the string exists in the output'}),
    dateepoch: flags.integer({char: 'd', description: 'the date epoch to evaluate for', required: true, default: (Date.now() / 1000)}),
    verbose: flags.boolean({char: 'v', description: 'verbose output', default: false})
  }

  static args = [
    {name: 'crontabfile', description: 'crontab file to process', default: '-', required: true}
  ]

  static examples = [
    '$ jenkinscron runnow sample/crontab.txt',
    '$ jenkinscron runnow sample/crontab.txt -e "1 minute"',
    '$ jenkinscron runnow sample/crontab.txt -i 300 -d $(date -v-15M +%s)',
  ]

  async readFromFile(input: NodeJS.ReadableStream) {
    let crontab = new Array<string>()
    return new Promise<string[]>((resolve, reject) => {
      input.pipe(require('split')())
        .on('data', (line: string) => {
          if (line.length > 0) {
            crontab.push(line)
          }
        })
        .on('end', () => {
          resolve(crontab)
        })
    })
  }

  async run() {
    const {args, flags} = this.parse(Runnow)

    const crontab: string[] = args.crontabfile === '-'
      ? (await this.readFromFile(process.stdin))
      : (await this.readFromFile(fs.createReadStream(args.crontabfile)))

    const now = new Date(flags.dateepoch * 1000)
    const options = {
      currentDate: now
    }

    for (const entry of crontab) {
      const array = entry.split(' ')
      const cronExpressionString = array.slice(0, 5).join(' ')
      const command = array.slice(5,).join(' ')
      const pollInterval = flags.interval * 1000
      try {
        const cronExpression = parser.parseExpression(cronExpressionString, options)
        const next = cronExpression.next().toDate()
        const diff = Math.abs(now.valueOf() - next.valueOf())

        if (flags.verbose) {
          const prev = cronExpression.prev().toDate()
          this.log(entry)
          this.log(`prev=${prev}`)
          this.log(`next=${next}`)
          this.log(`diff=${diff}`)
        }

        if (diff < pollInterval) {
          if (flags.exists) {
            if (command.includes(flags.exists || '')) {
              return
            }
          } else {
            this.log(command)
          }
        }
      } catch (err) {
        this.error(err)
      }
    }

    if (flags.exists) {
      this.exit(1)
    }
  }
}

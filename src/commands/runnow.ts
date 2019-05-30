import {Command, flags} from '@oclif/command'
import * as parser from 'cron-parser'
import * as fs from 'fs'
import * as process from 'process'
import {Readable} from 'stream'

export default class Runnow extends Command {
  static description = 'run the following commands now'

  static flags = {
    help: flags.help({char: 'h'}),
    interval: flags.integer({char: 'i', description: 'polling interval in seconds', default: 60, required: true}),
    verbose: flags.boolean({char: 'v', description: 'verbose output', default: false})
  }

  static args = [
    {name: 'crontab', description: 'crontab to process', default: '-', required: true}
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

    const crontab: string[] = args.crontab === '-'
      ? (await this.readFromFile(process.stdin))
      : (await this.readFromFile(fs.createReadStream(args.crontab)))

    const now = new Date()

    for (const entry of crontab) {
      const array = entry.split(' ')
      const cronExpressionString = array.slice(0, 5).join(' ')
      const command = array.slice(5,).join(' ')
      const pollInterval = flags.interval * 1000
      try {
        const cronExpression = parser.parseExpression(cronExpressionString)
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
          this.log(command)
        }
      } catch (err) {
        this.log('Error: ' + err.message)
      }
    }
  }
}

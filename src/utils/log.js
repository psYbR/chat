import { logLevel } from '../config'

const log = (message, level = 1) => {
  if (level >= logLevel) {
    console.log(message)
  }
}

export default log
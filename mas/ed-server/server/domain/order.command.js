
const handle = require('./order.commandhandle')
module.exports = async (cmd) => {
  switch (cmd.command) {
    case 'create':
      await handle.create(cmd)
      break
    case 'changeStatus':
      await handle.chageStatus(cmd)
      break
    default:
      throw new Error(`Command: ${cmd.command} not recognized`)
  }
}

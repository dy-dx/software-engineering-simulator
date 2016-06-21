import { addDollars } from './actioncreators'
const engineerValue = 10 // fixme

class Game {
  elapsed = 0

  setStore (store) {
    this.store = store
  }

  runUpdate () {
    const engineerCount = this.store.getState().workers.engineers
    this.store.dispatch(addDollars(engineerCount * engineerValue))
  }

  update (delta) {
    // update stuff once per second
    const updatesDue = Math.floor((this.elapsed + delta) / 1000) - Math.floor(this.elapsed / 1000)
    this.elapsed += delta

    for (let i = 0; i < updatesDue; i++) {
      this.runUpdate()
    }
  }
}

export default Game

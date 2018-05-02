import MOVES from '../MOVES'

export default class Area {
  constructor(rows = []) {
    this.rows = rows
    this.render()
  }
  activate(x, y) {
    const block = this.getBlock(x, y)
    block.activate()
    this.activeBlock = block
  }
  deactivate(x, y) {
    const block = this.getBlock(x, y)
    block.deactivate()
  }
  move(direction = MOVES.RIGHT) {
    let oldX = this.activeBlock.x, 
      oldY = this.activeBlock.y,
      newX = oldX,
      newY = oldY
    
    switch(direction) {
      case MOVES.UP: ++newY;break;
      case MOVES.DOWN: --newY;break;
      case MOVES.RIGHT: ++newX;break;
      case MOVES.LEFT: --newX;break;
    }

    if(newY >= this.rows.length || newX >= this.rows[0].blocks.length
      || newY < 0 || newX < 0) return

    console.log(oldX, this.rows[0].blocks.length)
    this.deactivate(oldY, oldX)
    this.activate(newY, newX)

  }
  getBlock(x, y) {
    return this.rows[x].blocks[y]
  }
  render() {
    const renderedRows = this.rows.map(row => row.render())
    
    this.renderedArea = document.createElement('div')
    this.renderedArea.className = 'area'

    renderedRows.forEach((row) => {
      this.renderedArea.appendChild(row)
      row.style.height = `${100 / (renderedRows.length)}%`
    })

    return this.renderedArea
  }
  push(row) {
    this.rows.push(row)
  }
}
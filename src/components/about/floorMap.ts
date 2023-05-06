const mapData = `
ooooooooooo

`

const mapWidth = 10
const mapHeight = 10

type FloorType = 'floor' | 'interaction' | 'empty'

export const getMapInfo = () => {
  return {
    width: mapWidth,
    height: mapHeight
  }
}

export const getMapStatus = (x: number, y: number) => {
  return 'floor'
}

export const getMapInteraction = (x: number, y: number) => {
  return 'empty'
}

export const pathFinding = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const path = []

  for (let i = start.x; i <= end.x; i += 1 * Math.sign(end.x - start.x)) {
    path.push({ x: i, y: start.y })
  }
  for (let i = start.y; i <= end.y; i += 1 * Math.sign(end.y - start.y)) {
    path.push({ x: end.x, y: i })
  }

  return path
}

export function calcTileType(index, boardSize) {
  if (index === 0) {
    return "top-left";
  } else if (index + 1 < boardSize) {
    return "top";
  } else if (index === boardSize - 1) {
    return "top-right";
  } else if (index === boardSize * boardSize - 1) {
    return "bottom-right";
  } else if (index === boardSize * boardSize - boardSize) {
    return "bottom-left";
  } else if ((index + 1) % boardSize === 0) {
    return "right";
  } else if (index % boardSize === 0) {
    return "left";
  } else if (index === boardSize * boardSize - 1) {
    return "bottom-right";
  } else if (
    index > boardSize * boardSize - boardSize &&
    index < boardSize * boardSize - 1
  ) {
    return "bottom";
  } else {
    return "center";
  }
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return "critical";
  }

  if (health < 50) {
    return "normal";
  }

  return "high";
}

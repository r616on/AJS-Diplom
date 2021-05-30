import Team from "./Team";
import PositionedCharacter from "./PositionedCharacter";

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator(allowedTypes, maxLevel = 1) {
  // return person
  const min = Math.ceil(0);
  const max = Math.floor(allowedTypes.length - 1);
  const minL = Math.ceil(1);
  const maxL = Math.floor(maxLevel);
  for (let item of allowedTypes) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const levelRandom = Math.floor(Math.random() * (maxL - minL + 1)) + minL;
    yield new allowedTypes[random](levelRandom);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const generator = characterGenerator(allowedTypes, maxLevel);
  const team = new Team();
  for (let i = 0; i < characterCount; i += 1) {
    team.add(generator.next().value);
  }
  return team;
  // TODO: write logic here
}

export function generateStart(allowedTypes, player) {
  // Arr index people and ii
  const boardSize = 8;
  let indexArr = [];
  if (player === "people") {
    for (let i = 0; i < boardSize * boardSize; i += 1) {
      if (i % boardSize === 0) {
        indexArr.push(i);
      } else if ((i - 1) % boardSize === 0) {
        indexArr.push(i);
      }
    }
  }
  if (player === "ii") {
    for (let i = 0; i < boardSize * boardSize; i += 1) {
      if ((i + 1) % boardSize === 0) {
        indexArr.push(i);
      } else if ((i + 2) % boardSize === 0) {
        indexArr.push(i);
      }
    }
  }

  //random Set(Index)
  let indexRandomArr = new Set();
  const min = Math.ceil(0);
  const max = Math.floor(indexArr.length - 1);
  let i = 0;
  while (i < allowedTypes.length) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    indexRandomArr.add(indexArr[random]);
    if (indexRandomArr.size === allowedTypes.length) {
      i = allowedTypes.length;
    }
  }
  indexRandomArr = [...indexRandomArr];

  // new PositionedCharacterArr
  let PositionedCharacterArr = [];
  for (let i = 0; i < allowedTypes.length; i += 1) {
    PositionedCharacterArr.push(
      new PositionedCharacter(allowedTypes[i], indexRandomArr[i])
    );
  }

  return PositionedCharacterArr;
}

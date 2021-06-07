import Team from './Team';
import PositionedCharacter from './PositionedCharacter';

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function* characterGenerator(allowedTypes, maxLevel = 1) {
  for (let i = 0; i < 30; i += 1) {
    yield new allowedTypes[getRandom(0, allowedTypes.length - 1)](
      getRandom(1, maxLevel),
    );
  }
}

export function generateTeam(allowedTypes, maxLevel, amount) {
  const generator = characterGenerator(allowedTypes, maxLevel);
  const personArr = [];
  for (let i = 0; i < amount; i += 1) {
    personArr.push(generator.next().value);
  }
  return personArr;
  // TODO: write logic here
}

export function genPositioned(allowedTypes, player, oldTeam) {
  // Arr index people and ii
  const boardSize = 8;
  const indexArr = [];
  if (player === 'people') {
    for (let i = 0; i < boardSize * boardSize; i += 1) {
      if (i % boardSize === 0) {
        indexArr.push(i);
      } else if ((i - 1) % boardSize === 0) {
        indexArr.push(i);
      }
    }
  }
  if (player === 'ii') {
    for (let i = 0; i < boardSize * boardSize; i += 1) {
      if ((i + 1) % boardSize === 0) {
        indexArr.push(i);
      } else if ((i + 2) % boardSize === 0) {
        indexArr.push(i);
      }
    }
  }
  if (oldTeam) {
    oldTeam = oldTeam.map((person) => person.character);
    allowedTypes = allowedTypes.concat(oldTeam);
  }
  let indexRandomArr = new Set();
  let i = 0;
  while (i < allowedTypes.length) {
    const random = getRandom(0, indexArr.length - 1);
    indexRandomArr.add(indexArr[random]);
    if (indexRandomArr.size === allowedTypes.length) {
      i = allowedTypes.length;
    }
  }
  indexRandomArr = [...indexRandomArr];

  // new PositionedCharacterArr
  const PositionedCharacterArr = [];
  for (let i = 0; i < allowedTypes.length; i += 1) {
    PositionedCharacterArr.push(
      new PositionedCharacter(allowedTypes[i], indexRandomArr[i]),
    );
  }

  return PositionedCharacterArr;
}

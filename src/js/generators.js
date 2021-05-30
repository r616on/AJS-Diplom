/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel = 1) {
  // random class
  const min = Math.ceil(0);
  const max = Math.floor(allowedTypes.length - 1);
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  ///randomLevel
  const minL = Math.ceil(1);
  const maxL = Math.floor(maxLevel);
  const levelRandom = Math.floor(Math.random() * (maxL - minL + 1)) + minL;
  // return person
  for (let item of allowedTypes) {
    yield new allowedTypes[random](levelRandom);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
}

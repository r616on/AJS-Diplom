import genAvailableTravel from './genAvailableTravel';

export default function genAvailableAttack(index, num) {
  const size = 8;
  const leftTwoOne = [index - size * 2 - 1, index + size * 2 - 1];
  const leftTwoTwo = [index - size - 2, index + size - 2];
  const rightTwoOne = [index - size * 2 + 1, index + size * 2 + 1];
  const rightTwoTwo = [index - size + 2, index + size + 2];
  const numTwoFull = leftTwoOne.concat(leftTwoTwo, rightTwoOne, rightTwoTwo);

  const leftThreeOne = [index - size * 3 - 1, index + size * 3 - 1];
  const leftThreeTwo = [index + size * 3 - 2, index - size * 3 - 2];
  const leftThreeThree = [
    index - size - 3,
    index - size * 2 - 3,
    index + size - 3,
    index + size * 2 - 3,
  ];
  const rightThreeOne = [index - size * 3 + 1, index + size * 3 + 1];
  const rightThreeTwo = [index + size * 3 + 2, index - size * 3 + 2];
  const rightThreeThree = [
    index - size + 3,
    index - size * 2 + 3,
    index + size + 3,
    index + size * 2 + 3,
  ];
  const numThreeLeftFull = leftThreeOne.concat(leftThreeTwo, leftThreeThree);
  const numThreeRightFull = rightThreeOne.concat(
    rightThreeTwo,
    rightThreeThree,
  );
  const numThreeFull = leftThreeOne.concat(
    rightThreeOne,
    rightThreeTwo,
    rightThreeThree,
    leftThreeTwo,
    leftThreeThree,
  );
  const leftFourOne = [index - size * 4 - 1, index + size * 4 - 1];
  const leftFourTwo = [index - size * 4 - 2, index + size * 4 - 2];
  const leftFourThree = [index - size * 4 - 3, index + size * 4 - 3];
  const leftFourFour = [
    index - size - 4,
    index - size * 2 - 4,
    index - size * 3 - 4,
    index + size - 4,
    index + size * 2 - 4,
    index + size * 3 - 4,
  ];

  const rightFourOne = [index - size * 4 + 1, index + size * 4 + 1];
  const rightFourTwo = [index - size * 4 + 2, index + size * 4 + 2];
  const rightFourThree = [index - size * 4 + 3, index + size * 4 + 3];
  const rightFourFour = [
    index - size + 4,
    index - size * 2 + 4,
    index - size * 3 + 4,
    index + size + 4,
    index + size * 2 + 4,
    index + size * 3 + 4,
  ];
  const numForRightFull = rightFourOne.concat(
    rightFourTwo,
    rightFourThree,
    rightFourFour,
  );
  const numForLeftFull = leftFourOne.concat(
    leftFourTwo,
    leftFourThree,
    leftFourFour,
  );

  const numForFull = numForRightFull.concat(numForLeftFull);
  /// /////////////////////////////////////
  let arrResultFin = [];
  if (num === 1) {
    arrResultFin = genAvailableTravel(index, 1);
  }
  if (num === 2) {
    if (index % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(
        rightTwoOne,
        rightTwoTwo,
      );
    } else if ((index - 7) % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(
        leftTwoOne,
        leftTwoTwo,
      );
    } else if ((index - 1) % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(
        rightTwoOne,
        rightTwoTwo,
        leftTwoOne,
      );
    } else if ((index - 6) % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(
        rightTwoOne,
        leftTwoOne,
        leftTwoTwo,
      );
    } else {
      arrResultFin = genAvailableTravel(index, 2).concat(numTwoFull);
    }
  }
  /// /////////////////////

  if (num === 4) {
    if (index % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        rightTwoOne,
        rightTwoTwo,
        numThreeRightFull,
        numForRightFull,
      );
    } else if ((index - 7) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        leftTwoOne,
        leftTwoTwo,
        numThreeLeftFull,
        numForLeftFull,
      );
    } else if ((index - 1) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        leftTwoOne,
        leftThreeOne,
        leftFourOne,
        rightTwoOne,
        rightTwoTwo,
        numThreeRightFull,
        numForRightFull,
      );
    } else if ((index - 6) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        rightTwoOne,
        rightThreeOne,
        rightFourOne,
        leftTwoOne,
        leftTwoTwo,
        numThreeLeftFull,
        numForLeftFull,
      );
    } else if ((index - 2) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        numTwoFull,
        leftThreeOne,
        leftThreeTwo,
        leftFourOne,
        leftFourTwo,
        numThreeRightFull,
        numForRightFull,
      );
    } else if ((index - 5) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        numTwoFull,
        rightThreeOne,
        rightThreeTwo,
        rightFourOne,
        rightFourTwo,
        numForLeftFull,
        numThreeLeftFull,
      );
    } else if ((index - 3) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        numTwoFull,
        numThreeFull,
        numForRightFull,
        leftFourOne,
        leftFourTwo,
        leftFourThree,
      );
    } else if ((index - 4) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        numTwoFull,
        numThreeFull,
        numForLeftFull,
        rightFourOne,
        rightFourTwo,
        rightFourThree,
      );
    } else {
      arrResultFin = genAvailableTravel(index, 4).concat(
        numTwoFull,
        numThreeFull,
        numForFull,
      );
    }
  }
  arrResultFin = arrResultFin.filter((item) => item > -1 && item < 64);
  arrResultFin = arrResultFin.sort((a, b) => {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
  });
  return arrResultFin;
}

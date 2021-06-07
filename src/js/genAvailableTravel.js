export default function genAvailableTravel(index, num) {
  const size = 8;
  /// ////////
  function genArrPers(index, num, position = 'center') {
    let arrResult = [];
    const arrCentr = [index - size * num, index + size * num];
    const arrLeft = [
      index - size * num - 1 * num,
      index - 1 * num,
      index + size * num - 1 * num,
    ];
    const arrRight = [
      index - size * num + 1 * num,
      index + 1 * num,
      index + size * num + 1 * num,
    ];
    if (position === 'noLeft') {
      arrResult = arrCentr.concat(arrRight);
    } else if (position === 'noRight') {
      arrResult = arrCentr.concat(arrLeft);
    } else if (position === 'center') {
      arrResult = arrCentr.concat(arrLeft, arrRight);
    }
    return arrResult.filter((item) => item > -1 && item < 64);
  }

  /// //////////

  let arrResultFin = [];

  if (num === 1) {
    if (index % size === 0) {
      arrResultFin = genArrPers(index, 1, 'noLeft');
    } else if ((index - 7) % size === 0) {
      arrResultFin = genArrPers(index, 1, 'noRight');
    } else {
      arrResultFin = genArrPers(index, 1);
    }
  }

  if (num === 2) {
    if (index % size === 0) {
      arrResultFin = genArrPers(index, 1, 'noLeft').concat(
        genArrPers(index, 2, 'noLeft'),
      );
    } else if ((index - 7) % size === 0) {
      arrResultFin = genArrPers(index, 1, 'noRight').concat(
        genArrPers(index, 2, 'noRight'),
      );
    } else if ((index - 1) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2, 'noLeft'),
      );
    } else if ((index - 6) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2, 'noRight'),
      );
    } else {
      arrResultFin = genArrPers(index, 1).concat(genArrPers(index, 2));
    }
  }

  /// /////////////Goode
  if (num === 4) {
    if (index % size === 0) {
      arrResultFin = genArrPers(index, 1, 'noLeft').concat(
        genArrPers(index, 2, 'noLeft'),
        genArrPers(index, 3, 'noLeft'),
        genArrPers(index, 4, 'noLeft'),
      );
    } else if ((index - 7) % size === 0) {
      arrResultFin = genArrPers(index, 1, 'noRight').concat(
        genArrPers(index, 2, 'noRight'),
        genArrPers(index, 3, 'noRight'),
        genArrPers(index, 4, 'noRight'),
      );
    } else if ((index - 1) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2, 'noLeft'),
        genArrPers(index, 3, 'noLeft'),
        genArrPers(index, 4, 'noLeft'),
      );
    } else if ((index - 6) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2, 'noRight'),
        genArrPers(index, 3, 'noRight'),
        genArrPers(index, 4, 'noRight'),
      );
    } else if ((index - 2) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2),
        genArrPers(index, 3, 'noLeft'),
        genArrPers(index, 4, 'noLeft'),
      );
    } else if ((index - 5) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2),
        genArrPers(index, 3, 'noRight'),
        genArrPers(index, 4, 'noRight'),
      );
    } else if ((index - 3) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2),
        genArrPers(index, 3),
        genArrPers(index, 4, 'noLeft'),
      );
    } else if ((index - 4) % size === 0) {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2),
        genArrPers(index, 3),
        genArrPers(index, 4, 'noRight'),
      );
    } else {
      arrResultFin = genArrPers(index, 1).concat(
        genArrPers(index, 2),
        genArrPers(index, 3),
        genArrPers(index, 4),
      );
    }
  }
  arrResultFin = arrResultFin.sort((a, b) => {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  });
  return arrResultFin;
}

import genAvailableTravel from "./genAvailableTravel";

export default function genAvailableAttack(index, num) {
  const size = 8;
  const left_2_1 = [index - size * 2 - 1, index + size * 2 - 1];
  const left_2_2 = [index - size - 2, index + size - 2];
  const right_2_1 = [index - size * 2 + 1, index + size * 2 + 1];
  const right_2_2 = [index - size + 2, index + size + 2];
  const num_2_Full = left_2_1.concat(left_2_2, right_2_1, right_2_2);

  const left_3_1 = [index - size * 3 - 1, index + size * 3 - 1];
  const left_3_2 = [index + size * 3 - 2, index - size * 3 - 2];
  const left_3_3 = [
    index - size - 3,
    index - size * 2 - 3,
    index + size - 3,
    index + size * 2 - 3,
  ];
  const right_3_1 = [index - size * 3 + 1, index + size * 3 + 1];
  const right_3_2 = [index + size * 3 + 2, index - size * 3 + 2];
  const right_3_3 = [
    index - size + 3,
    index - size * 2 + 3,
    index + size + 3,
    index + size * 2 + 3,
  ];
  const num_3_left_Full = left_3_1.concat(left_3_2, left_3_3);
  const num_3_Right_Full = right_3_1.concat(right_3_2, right_3_3);
  const num_3_Full = left_3_1.concat(
    right_3_1,
    right_3_2,
    right_3_3,
    left_3_2,
    left_3_3
  );
  const left_4_1 = [index - size * 4 - 1, index + size * 4 - 1];
  const left_4_2 = [index - size * 4 - 2, index + size * 4 - 2];
  const left_4_3 = [index - size * 4 - 3, index + size * 4 - 3];
  const left_4_4 = [
    index - size - 4,
    index - size * 2 - 4,
    index - size * 3 - 4,
    index + size - 4,
    index + size * 2 - 4,
    index + size * 3 - 4,
  ];

  const right_4_1 = [index - size * 4 + 1, index + size * 4 + 1];
  const right_4_2 = [index - size * 4 + 2, index + size * 4 + 2];
  const right_4_3 = [index - size * 4 + 3, index + size * 4 + 3];
  const right_4_4 = [
    index - size + 4,
    index - size * 2 + 4,
    index - size * 3 + 4,
    index + size + 4,
    index + size * 2 + 4,
    index + size * 3 + 4,
  ];
  const num_4_Right_Full = right_4_1.concat(right_4_2, right_4_3, right_4_4);
  const num_4_Left_Full = left_4_1.concat(left_4_2, left_4_3, left_4_4);

  const num_4_Full = num_4_Right_Full.concat(num_4_Left_Full);
  ////////////////////////////////////////
  let arrResultFin = [];
  if (num === 1) {
    arrResultFin = genAvailableTravel(index, 1);
  }
  if (num === 2) {
    if (index % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(right_2_1, right_2_2);
    } else if ((index - 7) % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(left_2_1, left_2_2);
    } else if ((index - 1) % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(
        right_2_1,
        right_2_2,
        left_2_1
      );
    } else if ((index - 6) % size === 0) {
      arrResultFin = genAvailableTravel(index, 2).concat(
        right_2_1,
        left_2_1,
        left_2_2
      );
    } else {
      arrResultFin = genAvailableTravel(index, 2).concat(num_2_Full);
    }
  }
  ////////////////////////

  if (num === 4) {
    if (index % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        right_2_1,
        right_2_2,
        num_3_Right_Full,
        num_4_Right_Full
      );
    } else if ((index - 7) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        left_2_1,
        left_2_2,
        num_3_left_Full,
        num_4_Left_Full
      );
    } else if ((index - 1) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        left_2_1,
        left_3_1,
        left_4_1,
        right_2_1,
        right_2_2,
        num_3_Right_Full,
        num_4_Right_Full
      );
    } else if ((index - 6) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        right_2_1,
        right_3_1,
        right_4_1,
        left_2_1,
        left_2_2,
        num_3_left_Full,
        num_4_Left_Full
      );
    } else if ((index - 2) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        num_2_Full,
        left_3_1,
        left_3_2,
        left_4_1,
        left_4_2,
        num_3_Right_Full,
        num_4_Right_Full
      );
    } else if ((index - 5) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        num_2_Full,
        right_3_1,
        right_3_2,
        right_4_1,
        right_4_2,
        num_4_Left_Full,
        num_3_left_Full
      );
    } else if ((index - 3) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        num_2_Full,
        num_3_Full,
        num_4_Right_Full,
        left_4_1,
        left_4_2,
        left_4_3
      );
    } else if ((index - 4) % size === 0) {
      arrResultFin = genAvailableTravel(index, 4).concat(
        num_2_Full,
        num_3_Full,
        num_4_Left_Full,
        right_4_1,
        right_4_2,
        right_4_3
      );
    } else {
      arrResultFin = genAvailableTravel(index, 4).concat(
        num_2_Full,
        num_3_Full,
        num_4_Full
      );
    }
  }
  arrResultFin = arrResultFin.filter((item) => item > -1 && item < 64);
  arrResultFin = arrResultFin.sort((a, b) => {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  });
  return arrResultFin;
}


const SCALE_UNIT = 0.5;


export const lateralPlus = {
  name: 'Lateral Plus',
  description: 'increase lateral +1',
  execute: (player) => {

    // this should increase lateral scale by 1 unit


    return {
      ...player,
      lateralScale: player.lateralScale + SCALE_UNIT,
    }
  }
}

export default {

}

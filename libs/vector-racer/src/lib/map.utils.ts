export interface Map {
  name: string;
  paths: [number, number][][];
  start: {
    line: [number, number][];
    direction: [number, number];
    positions: [number, number][];
  };
}

export const scaleMap = (map: Map, scale: number): Map => {
  const scaledPaths = map.paths.map((path) => {
    return path.map((point) => {
      return [point[0] * scale, point[1] * scale] as [number, number];
    });
  });

  const scaledStartLine = map.start.line.map((point) => {
    return [point[0] * scale, point[1] * scale] as [number, number];
  });

  const scaledStartDirection = [map.start.direction[0] * scale, map.start.direction[1] * scale] as [number, number];

  const scaledStartPositions = map.start.positions.map((point) => {
    return [point[0] * scale, point[1] * scale] as [number, number];
  });

  return {
    ...map,
    paths: scaledPaths,
    start: {
      line: scaledStartLine,
      direction: scaledStartDirection,
      positions: scaledStartPositions,
    },
  };
};

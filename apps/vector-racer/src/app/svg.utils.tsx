export const generatePath = (gridSize: number, path: [number, number][]) => {
  return <path d={generatePathStr(gridSize, path)} stroke="black" fill="transparent" />;
};

export const generatePathStr = (gridSize: number, path: [number, number][]) => {
  const [start, ...rest] = path;
  const d = rest.reduce(
    (acc, curr) => `${acc} L ${curr[0]*gridSize} ${curr[1]*gridSize}`,
    `M ${start[0]*gridSize} ${start[1]*gridSize}`
  );

  return d;
}

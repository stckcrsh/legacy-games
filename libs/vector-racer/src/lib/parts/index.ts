import { Part } from './part';
import parts from './parts';

const partObj = parts.reduce((acc, part) => {
  acc[part.id] = part;
  return acc;
}, {} as Record<string, Part>);

export const partLookup = (partId: string) => {
  const part = partObj[partId];
  if (!part) {
    throw new Error(`Part ${partId} not found`);
  }
  return part;
};

export default parts;
export * from './part';

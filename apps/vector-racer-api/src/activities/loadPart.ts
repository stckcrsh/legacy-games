import { Part, partLookup } from '@vector-racer/lib';

type PartId = string;

export async function loadPart(partId: PartId): Promise<Part> {
  return partLookup(partId);
}

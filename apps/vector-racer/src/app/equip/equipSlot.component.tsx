import { Select } from 'grommet';
import { memo, useMemo } from 'react';

import { Part, partLookup } from '@vector-racer/lib';

const filterTypes = (slotTypes: string[]) => ({ part }: { id: string, part: Part }) => slotTypes.find(slotType => partLookup(part.id).slots.includes(slotType))

type PartId = string;

interface Props {
  slotName: string;
  slotTypes: string[];
  inventoryOptions: { id: string, part: Part }[];
  inventory: Record<string, boolean>;
  value?: PartId,
  onChange: (partId?: PartId) => void;
  defaultName?: string;
}

export const EquipSlot = memo(({
  slotName,
  slotTypes,
  inventoryOptions,
  inventory,
  value,
  onChange,
  defaultName
}: Props) => {
  const options = useMemo(() =>
    inventoryOptions
      .filter(filterTypes(slotTypes))
      .map((inventoryItem) => ({
        id: inventoryItem.id,
        name: partLookup(inventoryItem.part.id).name,
        disabled: inventory[inventoryItem.id]
      }))
    , [inventoryOptions, slotTypes, inventory]
  )

  return (
    <label>
      {slotName}:
      <Select
        options={[
          {
            id: undefined,
            name: defaultName ? `${defaultName} (default) ` : 'Empty',
            disabled: false
          },
          ...options
        ]}
        valueKey="id"
        defaultValue={{
          id: undefined,
          name: defaultName ? `${defaultName} (default) ` : 'Empty',
          disabled: false
        }}
        labelKey="name"
        onChange={(evt) => {
          console.log({ evt });
          onChange(evt.value.id)
        }}
        disabledKey={'disabled'}
        value={value}></Select>
    </label>
  )
})

import { Box } from 'grommet';
import { values } from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { nascar } from '@vector-racer/lib';

import { EquipBloc, equippedParts, EquipState, getDefaultPart } from './equip.bloc';
import { EquippedCards } from './equippedCards.component';
import { EquipSlot } from './equipSlot.component';
import { StatBlock } from './statBlock.component';

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Pane = styled(Box)`
  display: flex;
  flex-grow: 1;
`

export const Equip = memo(() => {
  const equipBloc = useMemo(() => new EquipBloc(nascar), []);
  const [state, setState] = useState<EquipState | null>(null);

  useEffect(() => {
    const sub = equipBloc.state$.subscribe({
      next: state => {
        setState(state)
      },
      error: err => {
        console.error(err);
      }
    })
    return () => sub.unsubscribe();
  }, [equipBloc.state$])
  if (!state) {
    return null;
  }
  return (
    <>
      <Container>
        <Pane>
          {Object.entries(state.slots).map(([slotName, { types }]) => {
            return (
              <EquipSlot
                key={slotName}
                defaultName={getDefaultPart(slotName)(state)}
                inventory={state.inventory}
                inventoryOptions={values(state.inventoryEntities)}
                slotName={slotName}
                slotTypes={types}
                onChange={(inventoryId) => {
                  equipBloc.selectedPart$.next({
                    slotName,
                    inventoryId
                  })
                }}
              />
            )
          })}
        </Pane>
        <Pane>
          Stats Block
          <StatBlock parts={equippedParts(state)} />
        </Pane>
      </Container >

      <Box>
        <EquippedCards parts={equippedParts(state)} />
      </Box>
    </>
  )

})

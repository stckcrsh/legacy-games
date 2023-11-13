import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { memo, useMemo } from 'react';

import { nascar, Part } from '@vector-racer/lib';

interface Props {
  parts: Part[]
}


// lateralScaleModifier: -0.1,
// forwardScaleModifier: .1,
// backwardScaleModifier: 0,
// weight: 0,
// heatPool: 0,
// cards: ['accelerate', 'turn'],

interface Stats {
  acceleration: number;
  lateral: number;
  braking: number;
  weight: number;
  heatPool: number;
  cards: string[];
}

const fixed = (num: number) => num.toFixed(2);

export const StatBlock = memo(({ parts }: Props) => {
  const chassis = nascar;

  const stats = useMemo(() => {
    const base: Stats = {
      acceleration: chassis.baseForwardScale,
      lateral: chassis.baseLateralScale,
      braking: chassis.baseBackwardScale,
      weight: chassis.baseWeight,
      heatPool: 0,
      cards:[]
    }

    return parts.reduce((acc, part) => ({
      acceleration: acc.acceleration + part.forwardScaleModifier,
      lateral: acc.lateral + part.lateralScaleModifier,
      braking: acc.braking + part.backwardScaleModifier,
      weight: acc.weight + part.weight,
      heatPool: acc.heatPool + part.heatPool,
      cards: acc.cards.concat(part.cards)
    }), base)
  }, [parts, chassis])

  return (
    <div>
      <Box width="medium">
        <NameValueList>
          <NameValuePair name="Lateral">
            <Text color="text-strong">{fixed(stats.lateral)}</Text>
          </NameValuePair>
          <NameValuePair name="Acceleration">
            <Text color="text-strong">{fixed(stats.acceleration)}</Text>
          </NameValuePair>

          <NameValuePair name="Braking">
            <Text color="text-strong">{fixed(stats.braking)}</Text>
          </NameValuePair>
          <NameValuePair name="Weight">
            <Text color="text-strong">{fixed(stats.weight)}</Text>
          </NameValuePair>
          <NameValuePair name="Heat Pool">
            <Text color="text-strong">{fixed(stats.heatPool)}</Text>
          </NameValuePair>

        </NameValueList>
      </Box>
    </div>
  )

})

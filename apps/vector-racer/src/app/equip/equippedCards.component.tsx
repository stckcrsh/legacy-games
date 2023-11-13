import { Box, Card as CardComp, CardBody, CardFooter, CardHeader } from 'grommet';
import { memo, useMemo } from 'react';
import styled from 'styled-components';

import { Card, cardLookup, Part } from '@vector-racer/lib';

const CardContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`

export const EquippedCards = memo(({ parts }: { parts: Part[] }) => {
  const cards: Card[] = useMemo(() => {
    return parts.reduce<Card[]>((acc, part) => {
      return acc.concat(part.cards.map(card => cardLookup[card]))
    }, [])
  }, [parts])


  return <CardContainer>
    {cards.map((card, idx) => (

      <CardComp key={idx} height="small" width="small" background="light-1">
        <CardHeader pad="small">{card.name}</CardHeader>
        <CardBody pad="medium">{card.description}</CardBody>
        <CardFooter pad={{ horizontal: "small" }} background="light-2">
        </CardFooter>
      </CardComp>
    ))}
  </CardContainer>
})

# Vector Racer

## Dictionary

| name  | description                               |
| ----- | ----------------------------------------- |
| IT    | Individual Task                           |
| GT    | Group Task                                |
| Phase | The time leading up to and including a GT |

## TODO List

- [x] tracking a race laps and finish line
- [x] float grid
  - [x] rotating the neighbors to match the direction of travel
  - [/] Spreading out the neighbors based on stats
  - [ ] adding new neighbors based on stats
- [ ] Plan out car parts and what they do
  - [ ] Car statistics
- [ ] race track designer
- [ ] multiple checkpoints for lap tracking
- [ ] online
  - [x] Server
  - [/] basic user management
- [ ] multiplayer
- [ ] playing cards
- [ ] Track Effects
  - [ ] weather
    - [ ] rain
    - [ ] solar storm shit like this
  - [ ] terrain
    - [ ] pavement
    - [ ] dirt
    - [ ] water??
  - [ ] obstacles
    - [ ] rocks
    - [ ] crashes
    - [ ] gravity wells
- [ ] Crashing
- [ ] Different racing rules 
  - [ ] time trial 
  - [ ] # of laps
  - [ ] top speed
  - [ ] space race with planets
  - [ ] hill climb (move up but it progressively subtracts from your vector see how high you can get)
- [ ] Collectibles
  - [ ] Money
  - [ ] Photo ops
- [ ] Currencies
  - [ ] IT tokens
  - [ ] money
  - [ ] Sponsorships
  - [ ] qualifiers
  - [ ] The shop
- [ ] gambling on races
- [ ] rubber band mechanics
  - [ ] drafting
- [ ] race prizes/loot boxes
- [ ] AI racers

## Tracking laps and finish line

Maps need to track all the borders/sides of the roads. Then we need to track corners and start and finish line.  
Start with an easy oval race track
the corners would just be the two ends and the start/finish would be in the center of the straight away.

start with rectangle race track

create multiple check points in the race so that they need to be passed in a specific order to count as a lap. This removes the weird circling the finish line shit

## float grid

get unit vector of velocity
get that angle then rotate the neighbors by that

## Car parts

### GPT ideas
Companies
1. "Wheezy's Exhaust Notes" - A sponsorship from a racer known for their over-the-top engine noise.

2. "Squeaky Clean Racing Soaps" - A humorous endorsement for a soap brand, suggesting that racers need a clean image off the track.

3. "Skid Marks Underwear" - For the racers who always leave their mark on the track, in this case, their endorsement is about comfortable underwear.

4. "Rocket Fuel Energy Drinks" - The idea is that these energy drinks give racers a boost, making it seem like they're fueled by actual rockets.

5. "Mullet Mania Barber Shop" - For a racer with a wild hairstyle reminiscent of a mullet, promoting a barbershop.

6. "Tireless Tire Company" - An endorsement from a racer who never seems to need new tires, even in intense races.

7. "Lap It Up Ice Cream" - A sponsorship for a racer who loves to "lap" up the competition and ice cream at the same time.

8. "Adrenaline Junkie Insurance" - A racer promoting an insurance company for those who live life on the edge.

9. "Turbocharged Toothpaste" - An endorsement for a toothpaste that promises to give racers the fastest smile in the game.

10. "Finish Line Fashion" - For the racer who is always looking stylish, even when covered in dirt and oil.

11. "Pit Stop Pizza" - A pizza sponsorship for racers to grab a quick bite during pit stops.

12. "Hug the Curb Hugging Service" - A humorous endorsement for a towing service that specializes in hugging the curb, not crashing.

Car companies
1. "VroomTastic Racing"
2. "ThunderBlunder Parts Co."
3. "ApexPredator Performance"
4. "TurboTrouble Engineering"
5. "NitroFizzle Motors"
6. "Blaze and Confuse Tech"
7. "WarpSneeze Dynamics"
8. "Driftless Solutions"
9. "BoostGaffe Racing Systems"
10. "OverStall Components"
11. "AeroWhiff Performance Parts"
12. "Adrena-LOL Racing Gear"
13. "Igni-Not-So-Tech Racing"
14. "HyperSnooze Innovations"
15. "SpinFail Automotive"
16. "RapidLurch Performance"
17. "ProSlip Racing Components"
18. "AeroSprinkle Technologies"
19. "NitroFlashback Racing"
20. "RacePulseless Engineering"


## Stats
aerodynamics - turn more at higher speed / lower top speed
drs - boost to top speed lowers drag / higher top speed
kers - kinetic energy recovery system # of cards
variance on vector (%chance that it changes ) could be based on wheel degredation
wheel degredation could be used for pits

weight - light cars increase the gap between neighbors heavy lowers
cooling - reducing heat

RPG classes

- chasis - aerodynamics and equipment slots base stats
 - formula (single seaters) 
 - karting
 - funny cars
 - spaceship (planets and such)
 - 

- Wheels front/back -
- engine - heat
- brakes - decelleration consumes heat 2 levels on the card with extra heat on the higher braking
- suspension

- misc
  - spoiler
  - rear wing - +1 to handling, -2 top speed
  - front wing - +1 handling +1 to braking, -1 top speed

set bonuses (having front and rear wings)

3 main stats
Lateral - turning
Acceleration - forward vector
braking - backwards vector

weight will affect each of these with some basic multiplier light weight will be higher than heavier vehicles
heavier vehicles will have a higher top speed to account for this.



## Sponsorships
Sponsorships are gained in a number of ways
- challenges/achievements
  - TOP speed
  - Fastest lap
  - fastest corner
- winning races
- collectibles in the races
- give aways
- placement prizes

sponsorhsips payout at the beggining of a phase and last a number of phases
ex. 
  2 phases
    10G
    1 IT Token

  This pays out 10G and 1 IT token at the beginning of each phase for 2 phases totalling 20G and 2 IT tokens

Every player gets a perpetual sponsorship which is their main sponsor

## Terrain and weather

dirt track
oil slicks
the edges

rain
sunny

## Obstructions

Gravity wells
Planets
rocks
maybe moving obsticals

## Currencies

Money is something that is gained from races and ITs. This is used to purchase items from the shop.

IT Tokens are used to gain entry to the ITs that are available.

One qualifier token is given out each week and is used to determine pole position or eligibility for the weekly GT. Qualifier tokens do not accumulate across phases

Sponsorships are defined above and can give any of the currencies as payment

## Cards
How does the card playing work?
When do you draw cards?
When/How do you play them?
Do we go through the deck a bunch of times or only once a race?
Deck size is determined by the car body type and the parts

Things i want 
- Something like Heat where there is a finite resource and when its spent it hurts you till you can clear it.
- I want the ability to have big turns and give the players in the back the ability to risk everything 


what things do you pay heat for
- cards could be two sided and have a free side and a pay side
- if you go above your max speed then you pay heat
- certain terrains could cause you to pay a heat
- if its hot out

if you get 3 heat in your hand then you discard all non heat cards from your hand
gaining heat should allow you to draw cards faster which has pros and cons

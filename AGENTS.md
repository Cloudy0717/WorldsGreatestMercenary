# RPG Maker MZ — Engine Conventions

All event command parameter formats are defined in `js/rmmz_objects.js` (Game_Interpreter methods). Always check that file instead of guessing.

## Drop Items (Enemies.json)

```javascript
// rmmz_objects.js:4988
if (di.kind > 0 && Math.random() * di.denominator < rate) {
```

| kind | Source |
|------|--------|
| 1 | Items.json (`$dataItems[dataId]`) |
| 2 | Weapons.json (`$dataWeapons[dataId]`) |
| 3 | Armors.json (`$dataArmors[dataId]`) |

`kind: 0` is filtered out by `> 0` — never use it.

## Battle Processing (code 301)

```javascript
// rmmz_objects.js:10881
parameters: [designationType, troopId_or_varId, canEscape, canLose]
```

| designationType | Meaning |
|----------------|---------|
| 0 | Direct — troopId_or_varId = Troop ID |
| 1 | Variable — troopId_or_varId = Variable ID |
| 2+ | Random Encounter |

## Transfer Player (code 201)

```javascript
// rmmz_objects.js:10439
parameters: [designationType, mapId, x, y, direction, fadeType]
```

| designationType | Meaning |
|----------------|---------|
| 0 | Direct — mapId/x/y are literal values |
| 1 | Variable — mapId/x/y are variable IDs |

Direction: 0=same, 2=down, 4=left, 6=right, 8=up
Fade: 0=black, 1=white, 2=none

## Control Self Switch (code 123)

```javascript
// rmmz_objects.js:10297
parameters: [selfSwitchCh, operation]
```

| operation | Meaning |
|-----------|---------|
| 0 | ON (sets value to true) |
| 1 | OFF (sets value to false) |

**CRITICAL**: code 121 = Control Switches (`$gameSwitches`), code 123 = Control Self Switch (`$gameSelfSwitches`). DO NOT confuse them.

## Switch Map (System.json switches)

| ID | Name | Set When |
|----|------|----------|
| 1 | 开场剧情完成 | Opening cutscene ends (EV003 → SelfA → 105) |
| 2 | 首次回家 | Player enters home first time (not yet implemented) |
| 3 | 莉亞的信件1 | Not yet implemented |
| 4 | 第二章开启 | Sister reunites with medicine money (EV002 Page 4, code 121) |
| 5 | 第三章开启 | Not yet implemented |
| 6 | 第四章开启 | Not yet implemented |
| 7 | 第五章开启 | Not yet implemented |

## Shop Processing (code 302)

```javascript
// Followed by code 605 entries
parameters: [carryOverItems?, ...]
```

Shop item entries (code 605):
```
parameters: [kind, dataId, price, ...]
```
Where kind: 0=Item, 1=Weapon, 2=Armor

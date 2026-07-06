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
| 3 | 莉亞的信件1 | Guild master delivers letter during quest (EV004 Page 2, code 121) |
| 4 | 第二章开启 | Sister reunites with medicine money (EV002 Page 4, code 121) |
| 5 | 第三章开启 | Not yet implemented |
| 6 | 第四章开启 | Not yet implemented |
| 7 | 第五章开启 | Not yet implemented |

## Shop Processing (code 302 / 605)

```javascript
// rmmz_objects.js:10931
const goods = [params];
// params = first item: [kind, dataId, priceType, customPrice, purchaseOnly]
// 605 entries = subsequent items: [kind, dataId, priceType, customPrice]
```

| Field | Meaning |
|-------|---------|
| kind | 0=Item, 1=Weapon, 2=Armor |
| dataId | ID in respective database |
| priceType | 0=use item default price, 1=use customPrice |
| customPrice | Used only if priceType !== 0 |
| purchaseOnly (302 only) | `false` for buy/sell, `true` for buy only |

```javascript
// Window_ShopBuy.makeItemList:3327
this._price.push(goods[2] === 0 ? item.price : goods[3]);
```

## Recover All (code 314)

```javascript
// rmmz_objects.js:10071
parameters: [partyMemberIndex, HPRecoveryMode?]
// params[0]=0 recovers entire party, [0,0] = full recovery
```

## Show Choices (code 102)

```javascript
// rmmz_objects.js:9793
parameters: [choicesArray, cancelType, defaultType, positionType, background]
```

| Field | Meaning |
|-------|---------|
| choicesArray | Array of choice strings |
| cancelType | Index of cancel choice (or -2 for disable) |
| defaultType | 0=first, 1=last, 2=disable |
| positionType | 0=top, 1=center, 2=bottom |
| background | 0=window, 1=dim, 2=transparent |

## Conditional Branch — Gold (code 111 type 7)

```javascript
// rmmz_objects.js:9975
case 7: // Gold
    switch (params[2]) {
        case 0: // >=
        case 1: // <=
        case 2: // <
    }
```

## Map012 — 森林城鎮 (Chapter 2 Hub) — Door Events

| Event | Name | Position | Destination | Exit To |
|-------|------|----------|-------------|---------|
| EV001 | 回村外道路 | (16,39) | Map003 (28,34) | — |
| EV002 | 森林旅館 | (9,12) | Map013 (10,15) | (9,13) |
| EV003 | 森林道具店 | (22,12) | Map014 (10,15) | (22,13) |
| EV004 | 森林武器店 | (27,15) | Map015 (10,15) | (27,16) |
| EV005 | 森林公會 | (27,27) | Map016 (10,15) | (27,28) |
| EV006 | 民宅 | (9,23) | Map017 (10,15) | (9,24) |

Each door event uses `!Door1` (index 4), priority=1, trigger=0.  
Interiors follow Map040 template (17×17, tileset 3, identical to Map006/007/008).

## Interior Maps (Map013–Map017)

Each interior has EV001 (exit door at (10,15) → back to Map012) and EV002 (NPC):

| Map | Name | NPC | Position | Char | Service |
|-----|------|-----|----------|------|---------|
| 013 | 森林旅館 | 旅館老闆 | (9,5) | People2 idx=1 | 50G rest, Recover All |
| 014 | 森林道具店 | 道具店店主 | (9,5) | People4 idx=2 | Shop (Potion, Super Potion, Antidote, etc.) |
| 015 | 森林武器店 | 武器防具店店主 | (9,5) | People1 idx=0 | Shop (weapons + armors) |
| 016 | 森林公會 | 公會接待員 | (9,5) | People3 idx=0 | Dialog (Chapter 2 hints) |
| 017 | 民宅 | 居民 | (8,8) | People2 idx=3 | Dialog (town guide) |

All interiors use the same tile data as Map040 (= Map006/007/008), 17×17, tileset 3.

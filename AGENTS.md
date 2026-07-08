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

## Variable Map (System.json variables)

| ID | Name | Values |
|----|------|--------|
| 0 | 主線：哥布林討伐 | Ch1 quest progress |
| 1 | (used for sister's medicine money tracking) | 0=start, 1=accepted, 2=quest done, 3=returned |
| 2 | 第二章：遺跡調查進度 | 0=未接, 1=已接, 2=BOSS擊敗, 3=已回報 |

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
| EV007 | 往森林道路 | (17,0) | Map018 (17,0) | — |

Each door event uses `!Door1` (index 4), priority=1, trigger=0.  
Interiors follow Map040 template (17×17, tileset 3, identical to Map006/007/008).

## Interior Maps (Map013–Map017)

Each interior has EV001 (exit door at (10,15) → back to Map012) and EV002 (NPC):

| Map | Name | NPC | Position | Char | Service |
|-----|------|-----|----------|------|---------|
| 013 | 森林旅館 | 旅館老闆 | (9,5) | People2 idx=1 | 50G rest, Recover All |
| 014 | 森林道具店 | 道具店店主 | (9,5) | People4 idx=2 | Shop (Potion, Super Potion, Antidote, etc.) |
| 015 | 森林武器店 | 武器防具店店主 | (9,5) | People1 idx=0 | Shop (weapons + armors) |
| 016 | 森林公會 | 公會接待員 | (9,5) | People3 idx=0 | Ch2 quest (5 pages, Var2 tracking) |
| 017 | 民宅 | 居民 | (8,8) | People2 idx=3 | Dialog (town guide) |

All interiors use the same tile data as Map040 (= Map006/007/008), 17×17, tileset 3.

## Chapter 2 Maps (Map018–020)

Map connection flow: Map012 (north) ↔ Map018 (森林道路) ↔ Map019 (密林遺跡) ↔ Map020 (遺跡深處)

| Map | Name | Size | Tileset | Source | Encounters | BGM |
|-----|------|------|---------|--------|------------|-----|
| 018 | 森林道路 | 18×30 | 2 (Forest/Outside) | RMMZ sample Map013 | Troop 1 (Gnome), Troop 2 (Crow), Troop 3 (树怪) | — |
| 019 | 密林遺跡 | 20×30 | 4 (Dungeon) | Casper Gaming Cave Pack — Stone Cave (Map015) | Troop 4 (紫火焰羊), Troop 6 (恶魔法师), Troop 3 (树怪) | Dungeon1 |
| 020 | 遺跡深處 | 40×40 | 4 (Dungeon) | Casper Gaming Cave Pack — Dirt Cave (Map014) | None (boss room) | Battle2 |

### Map018 森林道路 — Events (8 total)

| Event | Name | Position | Type | Details |
|-------|------|----------|------|---------|
| EV01 | 往森林城鎮 | (0,8) | Door → Map012 (19,4) | Left south exit |
| EV02 | 往密林遺跡 | (17,13) | Door → Map019 (3,28) | Right north exit |
| EV03 | 往森林城鎮 | (0,9) | Door → Map012 (19,4) | Left south exit (2nd tile) |
| EV04 | 往密林遺跡 | (17,14) | Door → Map019 (3,28) | Right north exit (2nd tile) |
| EV05 | 路標 | (12,2) | Signpost (Action) | "▲往北：密林遺跡 ▼往南：森林城鎮" |
| EV06 | 旅行者 | (6,4) | NPC (Talk) | People2 idx=3; Page1: Sw4→hint ruins, Page2: generic |
| EV07 | 獵人 | (14,7) | NPC (Talk) | People1 idx=5; Sw4→give Potion once (SelfA), then remind |
| EV08 | 草叢 | (2,6) | Hidden item (Talk) | Give Dispel Herb once (SelfA), then empty |

### Map019 密林遺跡 — Events (7 total)

| Event | Name | Position | Type | Details |
|-------|------|----------|------|---------|
| EV01 | 往森林道路 | (3,29) | Door → Map018 (16,13) | Entrance |
| EV02 | 往遺跡深處 | (8,6) | Door → Map020 (23,29) | Page1 (Var2=1): hint then transfer; Page2: direct |
| EV03 | 古代祭壇 | (10,14) | Investigation (Talk) | Page1 (Var2=1): lore about altar; Page2: generic |
| EV04 | 寶箱 | (4,20) | Chest (Action) | Give Potion once (SelfA) |
| EV05 | 魔物偷襲 | (15,12) | Ambush (Touch→Battle) | Troop 4, once (SelfA) |
| EV06 | 筆記碎片 | (7,24) | Lore (Talk) | Adventurer's journal, foreshadows boss |
| EV07 | 破裂的牆壁 | (10,0) | Decoration (Talk) | Giant claw marks on wall |

### Map020 遺跡深處 — Events (3 total)

| Event | Name | Position | Type | Details |
|-------|------|----------|------|---------|
| EV01 | 出口 | (23,30) | Door → Map019 (8,7) | Exit |
| EV02 | 遺跡守護者 | (20,20) | Boss (Action) | Page1 (Var2=1): cutscene→Battle Troop7→Var2=2; Page2 (Var2=2): post-boss; Page3: hint |
| EV03 | 寶箱 | (33,25) | Chest (Action) | Give Dragon Blade (Weapon 5) once (SelfA) |

### Ch2 Quest Flow (Var 2 tracking)
1. Var2=0: Guild offers quest (Sw4 ON) → Accept → Var2=1
2. Var2=1: Go to Map19 → Map20 → Boss fight → Set Var2=2
3. Var2=2: Return to guild → Report → Var2=3 (reward 2000G + Magic Water)
4. Var2=3: Quest completed, guild thanks player

Note: Map019-020 use `tilesetId: 4` (our Dungeon), converted from Cave Pack's ts=1. Tile IDs are 100% compatible (both default MZ RTP).

## External Resources Used

| Resource | Source | License | Used For |
|----------|--------|---------|----------|
| Cave Map Pack (5 maps) | Casper Gaming (itch.io, free) | MZ RTP, credit Casper Gaming | Map019 (Dirt Cave), Map020 (Stone Cave) |
| RMMZ Sample Maps (104 maps) | RPG Maker MZ v1.0.1 | Included with MZ license | Map templates throughout |

## Enemies & Troops (Phase 4 Balance Applied)

Params order: MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK

| ID | Name | MHP | ATK | DEF | MAT | MDF | AGI | EXP | Gold | Battler | Area | Notes |
|----|------|-----|-----|-----|-----|-----|-----|-----|------|---------|------|-------|
| 0 | Goblin | 200 | 25 | 15 | 18 | 15 | 18 | 8 | 8 | Goblin | Ch1 early | Basic melee |
| 1 | Gnome | 250 | 20 | 15 | 20 | 18 | 20 | 10 | 8 | Gnome | Ch1 early | Has Venom |
| 2 | Crow | 200 | 18 | 12 | 18 | 15 | 28 | 12 | 7 | Crow | Ch1 early | Fast, frail |
| 8 | 哥布林弓手 | 160 | 18 | 10 | 15 | 12 | 22 | 10 | 5 | Goblin(hue) | Ch1 early | Ranged, squishy |
| 13 | 狼人 | 400 | 35 | 18 | 20 | 18 | 28 | 25 | 12 | Wolfman | Ch1 mid | Double attack |
| 9 | 巨型蝙蝠 | 250 | 25 | 12 | 20 | 15 | 30 | 18 | 8 | Petitdevil | Ch1 mid | Poison, fast |
| 3 | 树怪 | 600 | 35 | 22 | 30 | 28 | 25 | 35 | 20 | Treant | Ch1 cave | Fire weak(x2) |
| 10 | 寶箱怪 | 700 | 30 | 30 | 20 | 25 | 15 | 60 | 150 | Mimic | Ch1 cave | Tanky, gold-rich |
| 5 | 哥布林王 | 1000 | 50 | 25 | 45 | 30 | 30 | 100 | 200 | Highking | Ch1 boss | Dropped Elixir |
| 4 | 紫火焰羊 | 1200 | 50 | 25 | 55 | 35 | 35 | 120 | 80 | Hi_monster | Ch1 cave+ | Fire magic |
| 11 | 火蜥蜴 | 700 | 45 | 25 | 55 | 30 | 25 | 100 | 60 | Salamander | Ch2 road | Fire immune |
| 12 | 石傀儡 | 1500 | 55 | 40 | 20 | 35 | 15 | 200 | 120 | Gatekeeper | Ch2 ruins | Phys resist(.7) |
| 6 | 恶魔法师 | 2000 | 55 | 30 | 150 | 80 | 35 | 300 | 200 | Demoncount | Ch2 ruins | Dark magic |
| 7 | 遺跡守護者 | 3500 | 90 | 50 | 60 | 50 | 20 | 600 | 1000 | Stoneknight | Ch2 boss | Phys×0.8 Mag×1.2 |

Troops: ID 1-7 + ID 8-15 multi-enemy. Ch2 boss drops Dragon Blade (Weapon 5, 1/4).

## 🚨 Encoding Warning: NEVER use PowerShell `Set-Content` / `ConvertTo-Json` on MZ JSON files

RPG Maker MZ JSON files are **UTF-8 without BOM**. Using PowerShell to edit these files can corrupt Chinese text via cp1252 mojibake.

### Safe approach: Use `rpgmaker-mz-*` MCP tools instead

```javascript
rpgmaker-mz_add_event_commands(mapId, eventId, commands, append)
rpgmaker-mz_update_event(mapId, eventId, ...)
```

### If you MUST edit via script, use Python (not PowerShell)

```python
import json
with open('MapXXX.json', 'rb') as f:
    raw = f.read()
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]  # strip BOM
obj = json.loads(raw.decode('utf-8'))
# ... modify obj ...
output = json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
with open('MapXXX.json', 'wb') as f:
    f.write(output.encode('utf-8'))
```

### Symptoms of corrupted encoding
- Chinese text appears as Latin-1 gibberish (e.g., `èŽ‰äºž` instead of `莉亞`)
- BOM (`EF BB BF`) added to file
- File is valid UTF-8 but text is garbled

### Fix method (if corruption already happened)
The corruption chain is: original UTF-8 → read as cp1252 → re-encoded as UTF-8. To reverse, map each garbled character back to its original cp1252 byte, then decode as UTF-8. Be careful to include C1 control chars (0x81, 0x8D, 0x8F, 0x90, 0x9D) which are undefined in cp1252 but appear as U+0081 etc.

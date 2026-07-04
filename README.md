
<p align="center">
  <img src="https://img.shields.io/badge/RPG%20Maker%20MZ-1.0.0-8B4513?style=for-the-badge&logo=gamepad&logoColor=white" alt="RPG Maker MZ"/>
  <img src="https://img.shields.io/badge/status-in%20development-yellow?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20Web-lightgrey?style=for-the-badge" alt="Platform"/>
</p>

<br>

<h1 align="center">World's Greatest Mercenary</h1>
<h3 align="center">世界最強傭兵</h3>

<p align="center">
  <i>A classic fantasy RPG built with RPG Maker MZ</i>
</p>

<br>

---

## 📖 Story

In a small village nestled at the edge of the kingdom, a young adventurer dreams of becoming the **world's greatest mercenary**. But dark forces are stirring in the nearby forest, corrupting the land and summoning monsters through an ancient teleportation array.

Your journey will take you through:

```
起始之村 (Starting Village)
    ↓
村外道路 (Country Road)
    ↓
傭兵公會 (Mercenary Guild)
    ↓
幽暗森林 (Dark Forest)
    ↓
幽暗洞穴 (Dark Cave)
    ↓
傳送大廳 (Teleportation Hall) — BOSS
```

Face treacherous monsters, uncover the source of the corruption, and prove yourself worthy of the title — **World's Greatest Mercenary**.

<br>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Classic RPG Gameplay
- Turn-based battles with strategic depth
- Player-touch enemy encounters
- Boss fights with story-driven narratives
- Progressive difficulty scaling

</td>
<td width="50%">

### 🗺️ Handcrafted Maps
- **Forest Ruins** — Overgrown temple complex with waterways
- **Stone Cave** — Underground cavern system with lava pools
- **Teleportation Hall** — Ancient chamber of mystical power
- **Cabin Shop** — Rest and buy supplies from the wandering merchant

</td>
</tr>
<tr>
<td width="50%">

### ⚔️ Battle System
- 5 enemy types: Goblins, Gnomes, Crows, Treants, and a final boss
- Weapon variety: Swords, Staves, Spears, Axes, Bows, and more
- Recovery items: Potions, Antidotes, Magic Water, and Elixirs
- Enemies disappear after defeat (self-switch system)

</td>
<td width="50%">

### 🏪 Shop & Progression
- Merchant NPC in the forest cabin
- Affordable weapons and potions
- Equipment upgrades as you progress
- Classic RPG economy

</td>
</tr>
</table>

<br>

---

## 🖼️ Screenshots

<p align="center">
  <i>※ Screenshots coming soon — open the project in RPG Maker MZ to explore!</i>
</p>

<!-- 
TODO: Add actual screenshots
![Starting Village](screenshots/village.png)
![Country Road](screenshots/road.png)
![Dark Forest](screenshots/forest.png)
![Boss Arena](screenshots/boss.png)
-->

<br>

---

## 🗂️ Project Structure

```
WorldsGreatestMercenary/
├── data/                    # Game data (maps, actors, items, etc.)
│   ├── Map001.json — 起始之村  (Starting Village)
│   ├── Map003.json — 村外道路  (Country Road)
│   ├── Map005.json — 幽暗森林  (Dark Forest)  ← sample map
│   ├── Map009.json — 幽暗洞穴  (Dark Cave)    ← sample map
│   ├── Map010.json — BOSS戰   (Boss Arena)   ← sample map
│   ├── Map011.json — 小木屋   (Cabin Shop)
│   ├── MapInfos.json
│   ├── Actors.json
│   ├── Enemies.json
│   ├── Items.json
│   ├── Weapons.json
│   ├── Troops.json
│   └── ...
├── img/                     # Graphics assets
│   ├── characters/          # Character sprites
│   ├── enemies/             # Enemy battler images (~100+)
│   ├── tilesets/            # Map tilesets
│   ├── battlebacks/         # Battle background images
│   └── ...
├── audio/                   # Sound effects & music
├── js/                      # Core engine scripts
├── index.html               # Web deployment entry
└── package.json
```

<br>

---

## 🚀 Getting Started

### Prerequisites

- **RPG Maker MZ** (for editing)
- A modern web browser (for playing the web build)

### Installation

```bash
# Clone the repository
git clone https://github.com/Cloudy0717/WorldsGreatestMercenary.git

# Open the project
# Launch RPG Maker MZ → File → Open Project → Select the folder
```

### Play in Browser

Simply open `index.html` in any modern browser, or deploy to any static hosting service.

<br>

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| ⬆⬇⬅➡ | Move |
| Space / Enter | Confirm / Interact |
| Esc / X | Cancel / Menu |
| F5 | Fullscreen |
| F2 | Toggle performance display |
| F3 | Toggle FPS display |
| F4 | Toggle window mode |

<br>

---

## 🛠️ Built With

<p align="center">
  <a href="https://www.rpgmakerweb.com/products/rpg-maker-mz">
    <img src="https://img.shields.io/badge/RPG%20Maker%20MZ-Engine-8B4513?style=for-the-badge&logo=gamepad&logoColor=white"/>
  </a>
  <a href="https://github.com/Cloudy0717/WorldsGreatestMercenary">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

- **Engine:** [RPG Maker MZ](https://www.rpgmakerweb.com/products/rpg-maker-mz)
- **Sample Maps:** RMMZ built-in templates (Forest, Stone Cave, Hall of Teleportation)
- **Assets:** Default RTP assets (characters, enemies, tilesets, SFX)
- **Scripting:** JavaScript (RMMZ core engine), JSON data files

<br>

---

## 📝 Credits

| Role | Name |
|------|------|
| **Development** | [Cloudy0717](https://github.com/Cloudy0717) |
| **Engine** | [RPG Maker MZ](https://www.rpgmakerweb.com/products/rpg-maker-mz) by Gotcha Gotcha Games |
| **Sample Maps** | RPG Maker MZ built-in template collection |
| **Art Assets** | RPG Maker MZ RTP (Runtime Package) |

<br>

---

## 📄 License

This project is provided under the terms of the **RPG Maker MZ End User License Agreement**.

The game's custom code and story content are available under the MIT License — see the [LICENSE](LICENSE) file for details.

*RPG Maker MZ engine assets are the property of Gotcha Gotcha Games and used under license.*

<br>

---

<p align="center">
  <sub>Made with ❤️ and RPG Maker MZ</sub>
  <br>
  <sub>© 2026 Cloudy0717</sub>
</p>

<p align="center">
  <a href="https://github.com/Cloudy0717/WorldsGreatestMercenary/issues">
    <img src="https://img.shields.io/github/issues/Cloudy0717/WorldsGreatestMercenary?style=flat-square" alt="Issues"/>
  </a>
  <a href="https://github.com/Cloudy0717/WorldsGreatestMercenary/stargazers">
    <img src="https://img.shields.io/github/stars/Cloudy0717/WorldsGreatestMercenary?style=flat-square" alt="Stars"/>
  </a>
  <a href="https://github.com/Cloudy0717/WorldsGreatestMercenary">
    <img src="https://img.shields.io/github/last-commit/Cloudy0717/WorldsGreatestMercenary?style=flat-square" alt="Last Commit"/>
  </a>
</p>

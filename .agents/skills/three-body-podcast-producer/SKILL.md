---
name: three-body-podcast-producer
description: >-
  Produces natural, thrilling, and canon-accurate 3-episode podcast series (12 minutes per episode)
  for each book of Cixin Liu's Three-Body Problem trilogy in both Video Podcast and Voice-Only
  (Audio) formats, grounded in the full novel markdown and summary files in three_body_markdown/.
---

# Three-Body Problem Podcast Producer

Creates **3-episode podcast arcs (12 minutes per episode)** for any book in the *Remembrance of Earth's Past* trilogy, outputting **both Video Podcast and Voice-Only (Audio) scripts** that are thrilling, conversational, and strictly faithful to the source texts in `three_body_markdown/`.

---

## Source Files Reference (`three_body_markdown/`)

Always locate and cross-reference **both** the summary file (for structure and verified science) and the full novel markdown (for exact quotes, character details, sensory atmosphere, and fact-checking):

| Book | Summary & Science Verification | Full Novel Markdown (Ground Truth) |
| :--- | :--- | :--- |
| **Book 1** (*The Three-Body Problem*) | `Book 1 - The Three-Body Problem - Summary, Events & Science Verification.md` (EN)<br>`Book 1 - The Three-Body Problem - Summary, Events & Science Verification (VI).md` (VI) | `The Three Body Problem 1 - Cixin Liu - Tom Doherty Associates.md` |
| **Book 2** (*The Dark Forest*) | `Book 2 - The Dark Forest - Summary, Events & Science Verification.md` (EN)<br>`Book 2 - The Dark Forest - Summary, Events & Science Verification (VI).md` (VI) | `The Dark Forest - Cixin Liu.md` |
| **Book 3** (*Death's End*) | `Book 3 - Death's End - Summary, Events & Science Verification.md` (EN)<br>`Book 3 - Death's End - Summary, Events & Science Verification (VI).md` (VI) | `Death's End - Cixin Liu - Book III, New York (State), 2016 - Tor Publishing Group.md` |

> **Important**: The full novel files are large (730 KB – 1.37 MB). Never read an entire full novel file into context at once. Instead, read the **Summary** file in full first, then use targeted search (`rg -n` / `Select-String`) and `read_file` with specific line ranges on the **Full Novel Markdown** to verify quotes, scenes, character names, and physics details.

---

## 3-Episode Arc Blueprint (Per Book)

Split each book into **3 escalating 12-minute episodes** with clear dramatic tension and cliffhangers:

### Book 1: *The Three-Body Problem*
- **Ep 1 (The Countdown & The Game)**: Cultural Revolution prologue (Ye Wenjie at Red Coast), Wang Miao's impossible countdown, the flickering universe, and entering the *Three Body* VR game.
- **Ep 2 (The Trisolaran Secret)**: Solving the chaotic eras, the human computer, ETO's factions, Operation Guzheng (the Panama Canal nanowire ambush), and capturing the *Judgment Day* hard drive.
- **Ep 3 (The Sophon Lock & "You Are Bugs")**: Unfolding protons into 11D→2D→0D sophons, locking down human physics, the cosmic broadcast revealed, and Da Shi's locust speech.

### Book 2: *The Dark Forest*
- **Ep 1 (The Wallfacer Gambit)**: The Doomsday Crisis, the Wallfacer Project, Luo Ji's seemingly absurd "spell" on star 187J3X1, and the Trisolaran assassination plots.
- **Ep 2 (The Droplet Massacre)**: The Great Ravine, humanity's false Golden Age of 2,000 warships, the arrival of the Strong-Interaction Probe (Droplet), and the Battle of Darkness.
- **Ep 3 (The Dark Forest Deterrence)**: Cosmic Sociology axioms, Chains of Suspicion & Technological Explosion, Luo Ji's ultimate dead-man's switch at Ye Wenjie's grave, and the Swordholder standoff.

### Book 3: *Death's End*
- **Ep 1 (The Staircase & The Swordholder)**: Yun Tianming's brain in the Staircase Program, Cheng Xin inheriting the Swordholder mantle, the 10-minute collapse of deterrence, and Australia.
- **Ep 2 (The Fairy Tales & Bunker World)**: *Gravity* and *Blue Space* triggering the Dark Forest strike, Yun Tianming's three fairy tales (decoded), and Lightspeed vs. Bunker vs. Black Domain strategies.
- **Ep 3 (The Dual-Vector Foil & Returners)**: The 2D collapse of the Solar System, Halo City & curvature propulsion, DX3906, Pocket Universe 647, and the Returners' message.

---

## Timing & Pacing Rules (Strict 12-Minute Target)

- **Target Duration**: `12:00` per episode (`~1,680–1,850` spoken words at a natural 140–150 WPM storytelling pace, accounting for dramatic pauses).
- **Beat Structure**:
  1. **`00:00 – 00:50` | Cold Open Hook**: Drop the listener straight into a chilling, high-stakes moment or paradox from that episode (no generic "Welcome back to another episode" opener).
  2. **`00:50 – 02:00` | Context & Stakes**: Establish where we are in the timeline and what is at risk.
  3. **`02:00 – 09:30` | Escalating Narrative + Verified Science**: Alternate vivid scene storytelling (grounded in novel quotes/details) with accessible "Wait—is that real physics?" breaks from the Summary's Science Verification section.
  4. **`09:30 – 11:20` | Climax & Emotional Turn**: The episode's defining revelation or twist.
  5. **`11:20 – 12:00` | Cliffhanger & Outro**: Leave an unforgettable question hanging for the next episode.

---

## Dual-Format Output Specification

Always produce **both** formats (or the requested format) in separate, clearly labeled sections or files:

### 1. Video Podcast Script (`[EP X - VIDEO]`)
- Include timestamped segments (`[00:00]`, `[02:15]`, etc.).
- Include production cues in brackets:
  - `[VISUAL: ...]` — B-roll, 3D orbital/sophon diagrams, archival footage style, character cards
  - `[ON-SCREEN TEXT: ...]` — Key terms, dates, equations, or verbatim quotes
  - `[SFX / MUSIC: ...]` — Subtle tension beds, static clicks, silence drops
- Spoken lines must feel natural to deliver to a camera.

### 2. Voice-Only Podcast Script (`[EP X - AUDIO]`)
- **Zero visual references**: Never write "as you can see here," "look at this diagram," or rely on on-screen text.
- **Purely auditory scene-setting**: Translate visual metaphors into crisp spoken imagery and spatial sound cues (`[SFX: low Geiger-counter hum]`, `[PAUSE 1.5s]`).
- **Pronunciation & Cadence**: Use short, punchy sentences mixed with rhythmic, atmospheric passages; mark `[BEAT]` or `[SLOW]` where tension peaks.

---

## Writing Quality & Anti-AI-ism Pass

Before finalizing any script:
1. **Fact-Check**: Verify every character name, era name, technology term, and verbatim quote against the Full Novel Markdown and Summary file. Do not invent plot events.
2. **Natural Voice Pass**: Eliminate robotic AI phrasing (avoid "delve into," "tapestry," "testament to," "in today's world," "moreover," "unveil," and repetitive "Not X, but Y" templates). Read sentences aloud mentally for breath and rhythm.
3. **Word Count Check**: Report the exact spoken word count and estimated runtime (`words / 145 WPM`) at the top of each script.

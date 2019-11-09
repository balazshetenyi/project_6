# <<<<< Turn based board game with JavaScript and jQuery. >>>>>

__The Map:__

* Randomly generated at each start (empty and unavailable fields)
* 4 weapons randomly placed around
* 2 players randomly placed without touching each other


__Movements:__

For each turn, a player can move from one to three boxes (horizontally or vertically) before ending their turn. They obviously can not pass through obstacles directly.

If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.


__Fight:__

If players cross over adjacent squares (horizontally or vertically), a battle begins.

During combat, the game works is as follows:

* Each player attacks in turn
* The damage depends on the player's weapon
* The player can choose to attack or defend against the next shot
* If the player chooses to defend themselves, they sustain 50% less damage than normal
* As soon as the life points of a player (initially 100) falls to 0, they lose. A message appears and the game is over.


![picture](/image/project6-pic.jpg)

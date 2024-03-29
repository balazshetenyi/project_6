// Class lists
const fields = [
    "emptyField",
    "blankField"
]

const weapons = [
    "fist",
    "pawprints",
    "egg",
    "bracelet",
    "backpack",
    "stardust",
    "tornado",
    "smartphone",
    "compass"
]

const players = ["playerOne", "playerTwo"];

// Possible popup messages
const popupMessage = [
    "Where are you going?",
    "Do you think you can go through the wall?",
    "You ain't no superhero mate! :)",
    "Turn around mate!"
];
const attackedMessage = [
    "You've been attacked! What you gonna do now?",
    "Press 1 to defend or press 2 to fight back."
];


// Player's constructor
class Player {
    constructor(name, userName, health, activeWeapon, remainingSteps, isPlayerActive) {
        this.name = name;
        this.userName = userName;
        this.health = health;
        this.activeWeapon = activeWeapon;
        this.remainingSteps = remainingSteps;
        this.isPlayerActive = isPlayerActive;
    }
    weaponToDrop;
}

// Weapons class constructor
class Weapon {
    constructor(name, url, damagePoint, active) {
        this.name = name;
        this.url = url;
        this.damagePoint = damagePoint;
        this.active = active;
    }
}


// The Players
const allPlayers = {
    playerOne: new Player("playerOne", "Player 1", 100, "fist", 3, true),
    playerTwo: new Player("playerTwo", "Player 2", 100, "fist", 3, false)
}


// The weapons
const allWeapons = {
    fist: new Weapon("fist", "/image/fist.png", 10, true),
    pawprints: new Weapon("pawprints", "/image/pawprints.png", 20, false),
    stardust: new Weapon("stardust", "/image/stardust.png", 20, false),
    egg: new Weapon("egg", "/image/egg.png", 20, false),
    bracelet: new Weapon("bracelet", "/image/bracelet.png", 30, false),
    compass: new Weapon("compass", "/image/compass.png", 20, false),
    smartphone: new Weapon("smartphone", "/image/smartphone.png", 20, false),
    backpack: new Weapon("backpack", "/image/backpack.png", 30, false),
    tornado: new Weapon("tornado", "/image/tornado.png", 40, false)
}

// Set username
allPlayers.playerOne.userName = prompt("Enter username for Player 1!");
allPlayers.playerTwo.userName = prompt("Enter username for Player 2!");
if (allPlayers.playerOne.userName === null || allPlayers.playerOne.userName === "") {
    allPlayers.playerOne.userName = "Player 1";
} 
if (allPlayers.playerTwo.userName === null || allPlayers.playerTwo.userName === "") {
    allPlayers.playerTwo.userName = "Player 2";
}




// STEP 1 => THE MAP


// 2D array
let rows = 10;
let cols = 10;

const make2DArray = (cols, rows) => {
    var arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

// Set the map
let grid;

const setup = () => {
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = $("<div>").appendTo("#gameMap")
            .addClass("emptyField");
        }
    }
}
setup();

// console.log(grid);

// Rnadom number
const random = () => {
    return Math.floor(Math.random(rows) * cols);
}

// Random class
const randomClass = (array) => {
    let number = Math.floor(Math.random(array.length) * array.length);
    return array[number];
}

// Set blank fields
const setBlank = () => {
    for (let i = 0; i < (cols + rows); i++) {
        grid[random()][random()].removeClass("emptyField").addClass("blankField");
    }
}
setBlank();


// Set random weapons
const setWeapons = () => {
    let maxWeapons = 4;
    let weaponPlaced = 0;
    let weapon,
        field;
    while (maxWeapons > weaponPlaced) {
        weapon = randomClass(weapons);
        field = grid[random()][random()];
        if (weapon != "fist" && $(field).hasClass("emptyField")) {
            $(field).removeClass("emptyField").attr("id", "weapon").addClass(weapon);
            weaponPlaced += 1;
        } else if ($(field).hasClass("blankField")) {
            weaponPlaced += 0;
        } else {
            weaponPlaced += 0;
        }
    }
}
setWeapons();


// Set players
let maxPlayers = 2;
let playersPlaced = 0;
const setPlayers = () => {
    while (maxPlayers > playersPlaced) {
        let field = grid[random()][random()];
        if ($(field).hasClass("emptyField")) {
            $(field).removeClass("emptyField")
            .attr("id", players[playersPlaced]).addClass("fist");
            playersPlaced += 1;
        } else {
            // Do nothing...
            playersPlaced += 0;
        }
    }
}
setPlayers();


// Check if players touch =>
let playerOnePosition = $("#playerOne").index();
let playerTwoPosition = $("#playerTwo").index();

let horizontal = 1;
let vertical = 10;
if ((playerOnePosition - vertical) == playerTwoPosition ||
    (playerOnePosition + vertical) == playerTwoPosition ||
    (playerOnePosition - horizontal) == playerTwoPosition ||
    (playerOnePosition + horizontal) == playerTwoPosition) {
        $("#playerOne").removeAttr("id").removeAttr("class")
            .addClass("emptyField");
        $("#playerTwo").removeAttr("id").removeAttr("class")
            .addClass("emptyField");
        playersPlaced = 0;
    setPlayers();
}


// Set the active player =>
let activePlayer = allPlayers.playerOne.name;
let inactivePlayer = allPlayers.playerTwo.name;

const setActivePlayer = () => {
    if (allPlayers.playerOne.remainingSteps === 0) {
        activePlayer = allPlayers.playerTwo.name;
        inactivePlayer = allPlayers.playerOne.name;
        allPlayers.playerOne.isPlayerActive = false;
        allPlayers.playerTwo.isPlayerActive = true;
        allPlayers.playerOne.remainingSteps = 3;
    } else if (allPlayers.playerTwo.remainingSteps === 0) {
        activePlayer = allPlayers.playerOne.name;
        inactivePlayer = allPlayers.playerTwo.name;
        allPlayers.playerOne.isPlayerActive = true;
        allPlayers.playerTwo.isPlayerActive = false;
        allPlayers.playerTwo.remainingSteps = 3;
    } 
}
setActivePlayer();


// Get index position =>
let x = 0;
let y = 0;
const indexOfField = (fieldOf) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].attr("id") == fieldOf) {
                x = i;
                y = j;
            }
        }
    }
    
}

indexOfField(activePlayer);






// STEP 2 => MOVEMENTS =>



const pickUpTheWeapon = (direction) => {
    allPlayers[activePlayer].weaponToDrop = $(grid[x][y]).attr("class");
    $(direction).removeAttr("id").attr("id", activePlayer);
    $(grid[x][y]).removeAttr("id").removeAttr("class").addClass("emptyField");
    allPlayers[activePlayer].remainingSteps -= 1;
}

// Drop weapon in place
const dropWeapon = (direction) => {
    $(direction).removeClass("emptyField").attr("id", activePlayer).addClass(playersWeapon);
    $(grid[x][y]).removeAttr("id").removeAttr("class")
        .attr("id", "weapon").addClass(allPlayers[activePlayer].weaponToDrop);
    allPlayers[activePlayer].weaponToDrop = undefined;
    allPlayers[activePlayer].remainingSteps -= 1;
}

const move = (direction) => {
    player = grid[x][y];
    $(direction).removeClass("emptyField").attr("id", activePlayer).addClass(playersWeapon);
    $(player).removeAttr("id").removeClass(playersWeapon).addClass("emptyField");
    allPlayers[activePlayer].remainingSteps -= 1;
}

const setActiveWeapon = () => {
    allPlayers.playerOne.activeWeapon = $("#playerOne").attr("class");
    allPlayers.playerTwo.activeWeapon = $("#playerTwo").attr("class");
}

const defend = () => {
    allPlayers[inactivePlayer].health -= (allWeapons[playersWeapon].damagePoint) / 2;
    allPlayers[activePlayer].remainingSteps = 0;
}

const fight = () => {
    allPlayers[inactivePlayer].health -= (allWeapons[playersWeapon].damagePoint);
    allPlayers[activePlayer].remainingSteps = 0;

}

const message = (whatMessage) => {
    $(".message").append("<p>" + randomClass(whatMessage) + "</p>");
    setTimeout(function () {
        $(".message p").hide();
    }, 3000);
}


// Initialize active weapon =>
let player = grid[x][y];
let playersWeapon = $(player).attr("class");



$(document).keydown(function (e) {
    let key = e.keyCode;
    // Directions =>
    let left = grid[x][y-1];
    let right = grid[x][y+1];
    let up;
    let down;
    // Class of active weapon
    playersWeapon = $(grid[x][y]).attr("class");
    
    if (key === 37) {   // Moving left
        if ($(left).hasClass("emptyField")) {
            if (allPlayers[activePlayer].weaponToDrop != undefined) {
                // If there's weapon to drop
                dropWeapon(left);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            } else {
                move(left);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            }
        } else if (left == undefined || $(left).hasClass("blankField")) {
            message(popupMessage);
        } else if ($(left).attr("id") === "weapon") {
            // If there's weapon to pick up
            pickUpTheWeapon(left);
            setActivePlayer();
            showNextPlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
        
        
    } else if (key === 39) {    // Moving right
        if ($(right).hasClass("emptyField")) {
            if (allPlayers[activePlayer].weaponToDrop != undefined) {
                // If there's weapon to drop
                dropWeapon(right);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            } else {
                move(right);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            }
        } else if (right == undefined || $(right).hasClass("blankField")) {
            message(popupMessage);
        } else if ($(right).attr("id") == "weapon") {
            // If there's weapon to pick up
            pickUpTheWeapon(right);
            setActivePlayer();
            showNextPlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
    } else if (key === 38) {    // Moving up
        if (x > 0) {
            up = grid[x-1][y];
        } else {
            up = undefined;
        }
        if ($(up).hasClass("emptyField")) {
            if (allPlayers[activePlayer].weaponToDrop != undefined) {
                // If there's weapon to drop
                dropWeapon(up);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            } else {
                move(up);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            }
        } else if (up == undefined || $(up).hasClass("blankField")) {
            message(popupMessage);
        } else if ($(up).attr("id") == "weapon") {
            // If there's weapon to pick up
            pickUpTheWeapon(up);
            setActivePlayer();
            showNextPlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
        
    } else if (key === 40) {    // Moving down
        if (x < 9) {
            down = grid[x + 1][y];
        } else {
            down = undefined;
        }
        if ($(down).hasClass("emptyField")) {
            if (allPlayers[activePlayer].weaponToDrop != undefined) {
                // If there's weapon to drop
                dropWeapon(down);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            } else {
                move(down);
                setActivePlayer();
                showNextPlayer();
                indexOfField(activePlayer);
            }
        } else if (down == undefined || $(down).hasClass("blankField")) {
            message(popupMessage);
        } else if ($(down).attr("id") == "weapon") {
            // If there's weapon to pick up
            pickUpTheWeapon(down);
            setActivePlayer();
            showNextPlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
    }
    showRemainingSteps();
})




// STEP 3 => THE FIGHT =>


// Information boards =>
$(".playerOneSide .nameOfPlayerOne").append("<h2><span>" + allPlayers.playerOne.userName + "</span></h2>");
$(".playerTwoSide .nameOfPlayerTwo").append("<h2><span>" + allPlayers.playerTwo.userName + "</span></h2>");
$(".playerOneHealth").append("<h5>Health: <span>" + allPlayers.playerOne.health + "</span> % </h5>");
$(".playerTwoHealth").append("<h5>Health: <span>" + allPlayers.playerTwo.health + "</span> % </h5>");
$(".playerOneSide .activeWeaponOne").append("<h5>Your active weapon is: </h5>");
$(".playerOneSide .activeWeaponOne").append("<img src=" + allWeapons[allPlayers.playerOne.activeWeapon].url + ">");
$(".playerTwoSide .activeWeaponTwo").append("<h5>Your active weapon is: </h5>");
$(".playerTwoSide .activeWeaponTwo").append("<img src=" + allWeapons[allPlayers.playerTwo.activeWeapon].url + ">");
$(".playerOneSide .damagePointOne").append("<h5>Weapon has <span>" + allWeapons[allPlayers.playerOne.activeWeapon].damagePoint + "</span> damage point!</h5>");
$(".playerTwoSide .damagePointTwo").append("<h5>Weapon has <span>" + allWeapons[allPlayers.playerTwo.activeWeapon].damagePoint + "</span> damage point!</h5>");
$(".playerOneSide .turnOne").append("<h4>It's your turn!</h4>");
$(".playerTwoSide .turnTwo").append("<h4>It's your turn!</h4>");
$(".playerOneSide .remainingStepsOne").append("<h5>You've got <span>" + allPlayers.playerOne.remainingSteps + "</span> steps left!</h5>");
$(".playerTwoSide .remainingStepsTwo").append("<h5>You've got <span>" + allPlayers.playerTwo.remainingSteps + "</span> steps left!</h5>");
$(".controls").append("<p>To control: Use the arrow keys!</p><p>To fight: Use the Ctrl key!</p>");




// The fight =>


$(document).keydown(function(e) {
  let key = e.keyCode;
  // Check if players touch =>
  let playerOnePosition = $("#playerOne").index();
  let playerTwoPosition = $("#playerTwo").index();

  if (
    playerOnePosition - vertical == playerTwoPosition ||
    playerOnePosition + vertical == playerTwoPosition ||
    playerOnePosition - horizontal == playerTwoPosition ||
    playerOnePosition + horizontal == playerTwoPosition
  ) {
    // The fight begin =>
    if (key === 17) {   // Ctrl pressed
      $(".message").append(
        "<h3>" +
          attackedMessage[0] +
          "</h3>" +
          "<p>" +
          attackedMessage[1] +
          "</p>"
      );
    }
  }

  if (key == 49) {  // Press 1 to defend
    if (
      allPlayers[inactivePlayer].health > allWeapons[playersWeapon].damagePoint
    ) {
      // Defend
      defend();
      setActivePlayer();
      showNextPlayer();
      indexOfField(activePlayer);
    } else {
      allPlayers[inactivePlayer].health = 0; // => End of game <= //
    }
    $(".message *").hide();
  } else if (key == 50) {   // Press 2 to fight back
    if (
      allPlayers[inactivePlayer].health > allWeapons[playersWeapon].damagePoint
    ) {
      // Fight back
      fight();
      setActivePlayer();
      showNextPlayer();
      indexOfField(activePlayer);
    } else {
      allPlayers[inactivePlayer].health = 0; // => End of game <= //
      checkPlayersHealth();
    }
    $(".message *").hide();
  }
  showPlayersHealth();
  showRemainingSteps();
});

// Helper functions =>

const showPlayersHealth = () => {
    $(".playerOneHealth span").text(allPlayers.playerOne.health); 
    $(".playerTwoHealth span").text(allPlayers.playerTwo.health);
}

const showRemainingSteps = () => {
    $(".remainingStepsOne span").text(allPlayers.playerOne.remainingSteps);
    $(".remainingStepsTwo span").text(allPlayers.playerTwo.remainingSteps);
}

const showActiveWeapon = () => {
    $(".activeWeaponOne img").remove();
    $(".playerOneSide .activeWeaponOne").append("<img src=" + allWeapons[allPlayers.playerOne.activeWeapon].url + ">");
    $(".activeWeaponTwo img").remove();
    $(".playerTwoSide .activeWeaponTwo").append("<img src=" + allWeapons[allPlayers.playerTwo.activeWeapon].url + ">");
}

const showDamagePoint = () => {
    $(".damagePointOne span").text(allWeapons[allPlayers.playerOne.activeWeapon].damagePoint);
    $(".damagePointTwo span").text(allWeapons[allPlayers.playerTwo.activeWeapon].damagePoint);

}

const showNextPlayer = () => {
    if (allPlayers.playerOne.isPlayerActive) {
        $(".playerTwoSide h4").hide();
        $(".remainingStepsTwo").hide();
        $(".playerOneSide *").show();
    } else if (allPlayers.playerTwo.isPlayerActive) {
        $(".playerOneSide h4").hide();
        $(".remainingStepsOne").hide();  
        $(".playerTwoSide *").show();        
    }
}
showNextPlayer();

const checkPlayersHealth = () => {
    if (allPlayers[inactivePlayer].health === 0) {
      alert(allPlayers[activePlayer].userName + "  has won the game!");
    }
}


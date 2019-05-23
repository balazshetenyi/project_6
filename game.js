// STEP 1 => THE MAP


// Class lists
const fields = [
    "emptyField",
    "blankField"
]

const weapons = [
    "fist",
    "knife",
    "injection",
    "drill",
    "axe",
    "flashlight",
    "gun",
    "screwdriver",
    "wrench"
]

const players = ["playerOne", "playerTwo"];

// Possible popup messages
const popups = [];


// Player's constructor
class Player {
    constructor(name, health, remainingSteps, activeWeapon, isPlayerActive) {
        this.name = name;
        this.health = health;
        this.activeWeapon = activeWeapon;
        this.remainingSteps = remainingSteps;
        this.isPlayerActive = isPlayerActive;
    }
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
    playerOne: new Player("playerOne", 100, 3, "fist", true),
    playerTwo: new Player("playerTwo", 100, 3, "fist", false)
}


// The weapons
const allWeapons = {
    fist: new Weapon("fist", "/image/fist.png", 10, true),
    knife: new Weapon("knife", "/image/knife.png", 20, false),
    flashlight: new Weapon("flashlight", "/image/flashlight.png", 20, false),
    injection: new Weapon("injection", "/image/injection.png", 20, false),
    drill: new Weapon("drill", "/image/drill.png", 30, false),
    wrench: new Weapon("wrench", "/image/wrench.png", 20, false),
    screwdriver: new Weapon("screwdriver", "/image/screwdriver.png", 20, false),
    axe: new Weapon("axe", "/image/axe.png", 30, false),
    gun: new Weapon("gun", "/image/gun.png", 40, false)
}



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

console.log(grid);

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



// STEP 2 => MOVEMENTS





// Set the active player =>
let activePlayer = allPlayers.playerOne.name;
let inactivePlayer = allPlayers.playerTwo.name;
let steps = 0;
// const setActivePlayer = () => {
//     if (steps < 3) {
//         activePlayer = $("#playerOne").attr("id");
//         inactivePlayer = $("#playerTwo").attr("id");
//         // alert("It's you turn Player 1!");
//     } else if (steps >= 3 && steps < 5) {
//         activePlayer = $("#playerTwo").attr("id");
//         inactivePlayer = $("#playerOne").attr("id");
//         // alert("It's you turn Player 2!");
//     } else {
//         steps -= 6;
//     }
// }
// setActivePlayer();
const setActivePlayer = () => {
    if (allPlayers.playerOne.remainingSteps === 0) {
        activePlayer = allPlayers.playerTwo.name;
        inactivePlayer = allPlayers.playerOne.name;
        allPlayers.playerOne.isPlayerActive = false;
        allPlayers.playerTwo.isPlayerActive = true;
        allPlayers.playerOne.remainingSteps = 3;
        // alert("It's you turn Player 1!");
    } else if (allPlayers.playerTwo.remainingSteps === 0) {
        activePlayer = allPlayers.playerOne.name;
        inactivePlayer = allPlayers.playerTwo.name;
        allPlayers.playerOne.isPlayerActive = true;
        allPlayers.playerTwo.isPlayerActive = false;
        allPlayers.playerTwo.remainingSteps = 3;
        // alert("It's you turn Player 2!");
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
    let newWeapon = $(direction).attr("class");
    $(direction).removeAttr("id").attr("id", activePlayer);
    $(grid[x][y]).removeAttr("id").attr("id", "weapon").addClass(playersWeapon);
    steps += 1;
    allPlayers[activePlayer].remainingSteps -= 1;
}


const move = (direction) => {
    player = grid[x][y];
    $(direction).removeClass("emptyField").attr("id", activePlayer).addClass(playersWeapon);
    $(player).removeAttr("id").removeClass(playersWeapon).addClass("emptyField");
    steps += 1;
    allPlayers[activePlayer].remainingSteps -= 1;
}

const setActiveWeapon = () => {
    allPlayers.playerOne.activeWeapon = $("#playerOne").attr("class");
    allPlayers.playerTwo.activeWeapon = $("#playerTwo").attr("class");
}


const defend = () => {
    allPlayers[inactivePlayer].health -= (allWeapons[playersWeapon].damagePoint) / 2;
    steps += 1;
    allPlayers[activePlayer].remainingSteps = 0;
}

const fight = () => {
    allPlayers[inactivePlayer].health -= (allWeapons[playersWeapon].damagePoint);
    steps += 1;
    allPlayers[activePlayer].remainingSteps = 0;

    console.log(steps);
}
// Set remaining steps back to initial



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
    
    if (key === 37) {
        if ($(left).hasClass("emptyField")) {
            move(left);
            setActivePlayer();
            indexOfField(activePlayer);
        } else if (left == undefined) {
            setTimeout(function() {
                alert("Ther's no available field on your left!");
            },3000);
        } else if ($(left).hasClass("blankField")) {
            alert("Do you think you can go through the wall? You ain't no superhero mate! :)");
        } else if ($(left).attr("id") === "weapon") {
            pickUpTheWeapon(left);
            setActivePlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
        
        
    } else if (key === 39) {
        if ($(right).hasClass("emptyField")) {
            move(right);
            setActivePlayer();
            indexOfField(activePlayer);
        } else if (right == undefined) {
            alert("Ther's no available field on your left!");
        } else if ($(right).hasClass("blankField")) {
            alert("Do you think you can go through the wall? You ain't no superhero mate! :)");
        } else if ($(right).attr("id") == "weapon") {
            pickUpTheWeapon(right);
            setActivePlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
    } else if (key === 38) {
        if (x > 0) {
            up = grid[x-1][y];
        } else {
            up = undefined;
        }
        if ($(up).hasClass("emptyField")) {
            move(up);
            setActivePlayer();
            indexOfField(activePlayer);
        } else if (up == undefined) {
            alert("Turn around mate!");
        } else if ($(up).hasClass("blankField")) {
            alert("Do you think you can go through the wall? You ain't no superhero mate! :)");
        } else if ($(up).attr("id") == "weapon") {
            pickUpTheWeapon(up);
            setActivePlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
        
    } else if (key === 40) {
        if (x < 9) {
            down = grid[x + 1][y];
        } else {
            down = undefined;
        }
        if ($(down).hasClass("emptyField")) {
            move(down);
            setActivePlayer();
            indexOfField(activePlayer);
        } else if (down == undefined) {
            alert("Where are you going?");
        } else if ($(down).hasClass("blankField")) {
            alert("Do you think you can go through the wall? You ain't no superhero mate! :)");
        } else if ($(down).attr("id") == "weapon") {
            pickUpTheWeapon(down);
            setActivePlayer();
            indexOfField(activePlayer);
            setActiveWeapon();
            showActiveWeapon();
            showDamagePoint();
        }
    }
    showRemainingSteps();
})




// STEP 3 => THE FIGHT =>




$(".playerOneHealth").append("<h5>" + allPlayers.playerOne.name + "'s health is: <span>" + allPlayers.playerOne.health + "</span> % </h5>");
$(".playerTwoHealth").append("<h5>" + allPlayers.playerTwo.name + "'s health is: <span>" + allPlayers.playerTwo.health + "</span> % </h5>");
$(".playerOneSide .remainingStepsOne").append("<h5>Remaining steps: <span>" + allPlayers.playerOne.remainingSteps + "</span></h5>");
$(".playerTwoSide .remainingStepsTwo").append("<h5>Remaining steps: <span>" + allPlayers.playerTwo.remainingSteps + "</span></h5>");
$(".playerOneSide .activeWeaponOne").append("<h5>Your active weapon is: </h5>");
$(".playerOneSide .activeWeaponOne").append("<img src=" + allWeapons[allPlayers.playerOne.activeWeapon].url + ">");
$(".playerTwoSide .activeWeaponTwo").append("<h5>Your active weapon is: </h5>");
$(".playerTwoSide .activeWeaponTwo").append("<img src=" + allWeapons[allPlayers.playerTwo.activeWeapon].url + ">");
$(".playerOneSide .damagePointOne").append("<h5>Weapon has <span>" + allWeapons[allPlayers.playerOne.activeWeapon].damagePoint + "</span> damage point!</h5>");
$(".playerTwoSide .damagePointTwo").append("<h5>Weapon has <span>" + allWeapons[allPlayers.playerTwo.activeWeapon].damagePoint + "</span> damage point!</h5>");




// The fight =>
$(document).keydown(function (e) {
    let key = e.keyCode;
    // Check if players touch =>
    let playerOnePosition = $("#playerOne").index();
    let playerTwoPosition = $("#playerTwo").index();

    if ((playerOnePosition - vertical) == playerTwoPosition && key === 17 ||
        (playerOnePosition + vertical) == playerTwoPosition && key === 17 ||
        (playerOnePosition - horizontal) == playerTwoPosition && key === 17 ||
        (playerOnePosition + horizontal) == playerTwoPosition && key === 17) {
        // The fight begin =>
        let playersChoice = prompt("You've been attacked! What would you like to do now? \n Enter 1 to defend. \n Enter 2 to fight back.");
        if (playersChoice == 1) {
            if (allPlayers[inactivePlayer].health > allWeapons[playersWeapon].damagePoint) {
                defend();
                setActivePlayer();
                indexOfField(activePlayer);
                console.log(allPlayers[inactivePlayer].health);
            } else {
                allPlayers[inactivePlayer].health = 0; // => End of game <= //
                steps += 1;
                console.log(activePlayer + "  has won the game!");
            }
        } else if (playersChoice == 2) {
            if (allPlayers[inactivePlayer].health > allWeapons[playersWeapon].damagePoint) {
                fight();
                setActivePlayer();
                indexOfField(activePlayer);
                console.log(allPlayers[inactivePlayer].health);
            } else {
                allPlayers[inactivePlayer].health = 0; // => End of game <= //
                steps += 1;
                console.log(activePlayer + "  has won the game!");
            }
        }
        showPlayersHealth();
        showRemainingSteps();

    }
})
    

// Helper functions =>

const showPlayersHealth = () => {
    // Show health for player 1
    $(".playerOneHealth span").text(allPlayers.playerOne.health); 
    // Show health for player 2
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


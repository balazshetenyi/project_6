// STEP 1 => THE MAP


// Class lists
const fields = [
    "emptyField",
    "blankField"
];

const weapons = [
    "fist",
    "knife",
    "injection",
    "drill",
    "axe",
    "flashlight",
    "gun",
    "screwdriver"
];



const players = ["playerOne", "playerTwo"];

// Possible popup messages
const popups = [];


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
    while (maxWeapons > weaponPlaced) {
        let weapon = randomClass(weapons);
        let field = grid[random()][random()];
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
let activePlayer;
let inactivePlayer;
let steps = 0;
const setActivePlayer = () => {
    if (steps % 3 === 0) {
        activePlayer = $("#playerOne").attr("id");
        inactivePlayer = $("#playerTwo").attr("id");
        // alert("It's you turn Player 1!");
    } else {
        activePlayer = $("#playerTwo").attr("id");
        inactivePlayer = $("#playerOne").attr("id");
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
            }else{}
        }
    }
    
}

indexOfField(activePlayer);






// STEP 2 => MOVEMENTS =>



const pickUpTheWeapon = (direction) => {
    let newWeapon = $(direction).attr("class");
    let weaponOnPlayer = activeWeapon;
    $(direction).removeAttr("id").attr("id", activePlayer).addClass(newWeapon);
    $(grid[x][y]).removeAttr("id").attr("id", "weapon").addClass(weaponOnPlayer);
    steps += 1;
}


const move = (direction) => {
    let player = grid[x][y];
    $(direction).removeClass("emptyField").attr("id", activePlayer).addClass(activeWeapon);
    $(player).removeAttr("id").removeClass(activeWeapon).addClass("emptyField");
    steps += 1;
}

// Initialize active weapon =>
let player = grid[x][y];
let activeWeapon = $(player).attr("class");

$(document).keydown(function (e) {
    let key = e.keyCode;
    // Directions =>
    let left = grid[x][y-1];
    let right = grid[x][y+1];
    let up;
    let down;
    // Class of active weapon
    activeWeapon = $(grid[x][y]).attr("class");
    
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
            setActiveWeapon();
            indexOfField(activePlayer);
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
            setActiveWeapon();
            indexOfField(activePlayer);
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
            setActiveWeapon();
            indexOfField(activePlayer);
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
            setActiveWeapon();
            indexOfField(activePlayer);
        }
    }
})




// STEP 3 => THE FIGHT =>


// Player's constructor
class Player {
    constructor(name, health, active) {
        this.name = name;
        this.health = health;
        this.active = active;
    }
}

// Weapons class constructor
class Weapon {
    constructor(name, damagePoint, playersWeapon) {
        this.name = name;
        this.damagePoint = damagePoint;
        this.activeWeapon = playersWeapon;
    }
}


// The Players
const thePlayers = {
    playerOne: new Player("playerOne", 100, true),
    playerTwo: new Player("playerTwo", 100, false)
}


// The weapons
const allWeapons = {
    fist: new Weapon("fist", 10, true),
    knife: new Weapon("knife", 20, false),
    flashlight: new Weapon("flashlight", 20, false),
    injection: new Weapon("injection", 20, false),
    drill: new Weapon("drill", 30, false),
    wrench: new Weapon("wrench", 20, false),
    screwdriver: new Weapon("screwdriver", 20, false),
    axe: new Weapon("axe", 30, false),
    gun: new Weapon("gun", 40, false)
}


const setActiveWeapon = () => {
    allWeapons[activeWeapon].activeWeapon = true;
}

// console.log(allWeapons[activeWeapon].name);

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
            // The fight begin                
            let playersChoice = prompt("You've been attacked! What would you like to do now? \n Enter 1 to defend. \n Enter 2 to fight back.");
            if (playersChoice == 1) {
                if (thePlayers[inactivePlayer].health > allWeapons[activeWeapon].damagePoint) {
                    thePlayers[inactivePlayer].health -= (allWeapons[activeWeapon].damagePoint) / 2;
                    console.log(thePlayers[inactivePlayer].health);
                } else {
                    thePlayers[inactivePlayer].health = 0; // => End of game <= //
                    console.log(activePlayer + "  has won the game!");
                }
            } else if (playersChoice == 2) {
                if (thePlayers[inactivePlayer].health > allWeapons[activeWeapon].damagePoint) {
                    thePlayers[inactivePlayer].health -= allWeapons[activeWeapon].damagePoint;
                    console.log(thePlayers[inactivePlayer].health);
                } else {
                    thePlayers[inactivePlayer].health = 0; // => End of game <= //
                    console.log(activePlayer + "  has won the game!");
                }
            }
        }
})
    



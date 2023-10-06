var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);

function preload() {
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);

  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: "Loading...",
    style: {
      font: "20px monospace",
      fill: "#ffffff",
    },
  });
  loadingText.setOrigin(0.5, 0.5);

  var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: "0%",
    style: {
      font: "18px monospace",
      fill: "#ffffff",
    },
  });
  percentText.setOrigin(0.5, 0.5);

  var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: "",
    style: {
      font: "18px monospace",
      fill: "#ffffff",
    },
  });
  assetText.setOrigin(0.5, 0.5);

  // An array of image URLs to preload
  var imageUrls = ["abc.png"];
  for (var i = 0; i < 5000; i++) {
    imageUrls.push("abc.png");
  }

  this.load.on("progress", function (value) {
    percentText.setText(parseInt(value * 100) + "%");
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
  });

  this.load.on(
    "complete",
    function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();

      // Transition to the menu scene
      this.scene.start("menu");
    },
    this
  );

  // Load the images
  for (var j = 0; j < imageUrls.length; j++) {
    this.load.image("image" + j, imageUrls[j]);
  }
}

function create() {
  // Empty create function for the loading screen.
}

class GameScene extends Phaser.Scene {
  constructor() {
    super("game"); // Scene key for the game
  }

  preload() {
    // This code runs when the game scene starts
    this.load.on("fileloaderror", function (key, file) {
      console.error(`Error loading file: ${key}`);
      console.error(file);
    });

    // Load the image
    this.load.image("image", "abc.png");
  }

  create() {
    var image = this.add.image(400, 300, "image"); 
    // This code runs when the game scene starts
    var gameStartedText = this.add.text(400, 300, "Game Started", {
      font: "32px monospace",
      fill: "#ffffff",
    });
    gameStartedText.setOrigin(0.5);
  }
}

// Define the menu scene
class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    function addButtonWithPadding(scene, button, padding) {
      var buttonBorder = scene.add.graphics();
      buttonBorder.lineStyle(2, 0xffffff, 1);
      buttonBorder.strokeRect(
        button.x - button.width / 2 - padding,
        button.y - button.height / 2 - padding,
        button.width + padding * 2,
        button.height + padding * 2
      );
      return buttonBorder;
    }
    // Create the menu here
    var startButton = this.add.text(400, 200, "Start", {
      font: "32px monospace",
      fill: "#ffffff",
    });
    startButton.setOrigin(0.5);
    startButton.setInteractive();

    var startButtonBorder = addButtonWithPadding(this, startButton, 5);

    startButton.on(
      "pointerdown",
      function () {
        // Transition to the game scene when "Start" is clicked
        this.scene.start("game"); // Transition to the 'game' scene
      },
      this
    );

    var helpButton = this.add.text(400, 250, "Help", {
      font: "32px monospace",
      fill: "#ffffff",
    });
    helpButton.setOrigin(0.5);
    var helpButtonBorder = addButtonWithPadding(this, helpButton, 5);

    var settingsButton = this.add.text(400, 300, "Settings", {
      font: "32px monospace",
      fill: "#ffffff",
    });
    settingsButton.setOrigin(0.5);
    var settingsButtonBorder = addButtonWithPadding(this, settingsButton, 5);

    var quitButton = this.add.text(400, 350, "Quit", {
      font: "32px monospace",
      fill: "#ffffff",
    });
    quitButton.setOrigin(0.5);
    var quitButtonBorder = addButtonWithPadding(this, quitButton, 5);
    quitButton.setInteractive();
    quitButton.on(
      "pointerdown",
      function () {
        // Handle quitting the game here
        // For now, let's just exit the menu scene
        this.scene.stop("menu");
      },
      this
    );
  }
}

// Add the menu scene to the game
game.scene.add("menu", MenuScene);
game.scene.add("game", GameScene);

class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.on("fileloaderror", function (key, file) {
      console.error(`Error loading file: ${key}`);
      console.error(file);
    });

    this.load.image("image", "abc.png");
  }

  create() {
    var gameStartedText = this.add.text(400, 300, "Game Started", {
      font: "32px monospace",
      fill: "#ffffff",
    });
    // var image = this.add.image(400, 300, "image"); 
    gameStartedText.setOrigin(0.5);
  }
}

module.exports = GameScene;

// SaveLoadHelper.js

// Function to create a save button that can be added to any scene.
// It displays a "Save" button on the screen and saves the current game state when clicked.
window.createSaveButton = function (scene) {
  // Position the button at a convenient spot (e.g., top-left corner)
  let saveBtn = scene.add.text(10, 10, 'Save', {
    font: '18px Arial',
    fill: '#FFD700',
    backgroundColor: '#333333',
    padding: { x: 5, y: 5 }
  }).setInteractive();

  saveBtn.setScrollFactor?.(0); // Ensures it stays in place if using camera scrolling

  saveBtn.on('pointerdown', () => {
    // Gather game state info from the current scene.
    let saveData = {
      currentScene: scene.scene.key,
      storyPart: scene.part || 0,
      // You can add additional properties (like player position, score, etc.) here.
      // playerX: scene.player?.x || 0,
      // playerY: scene.player?.y || 0,
    };

    localStorage.setItem('gameSave', JSON.stringify(saveData));

    // Optionally, play a click sound to indicate saving action.
    if (scene.sound) {
      scene.sound.play?.('Click');
    }

    // Optional: Provide visual confirmation of saving
    let savedText = scene.add.text(80, 10, 'Saved!', {
      font: '18px Arial',
      fill: '#00FF00',
      backgroundColor: '#000',
      padding: { x: 4, y: 2 }
    });

    scene.time.delayedCall(1500, () => savedText.destroy());
  });

  // Optional: Store the reference for removing later
  scene.saveBtn = saveBtn;
};

// Function to load game state from localStorage.
// Returns the parsed save object or null if no valid save is found.
window.loadGame = function () {
  let saveData = localStorage.getItem('gameSave');
  if (saveData) {
    try {
      return JSON.parse(saveData);
    } catch (error) {
      console.error("Error parsing save data:", error);
      return null;
    }
  }
  return null;
};

// Optional helper function: reset save data (for debugging or restart)
window.clearGameSave = function () {
  localStorage.removeItem('gameSave');
};


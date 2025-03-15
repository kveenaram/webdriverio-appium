async function scrollDown() {
    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: 500, y: 1500 }, // Start higher
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 1000 }, // Hold press a bit longer
                { type: 'pointerMove', duration: 1500, x: 500, y: 200 }, // Move further down
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);
    await browser.pause(1000); // Allow time for the UI to settle
}

module.exports = { scrollDown };

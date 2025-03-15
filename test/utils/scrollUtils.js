async function scrollDown() {
    await browser.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: 500, y: 1000 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 700, x: 500, y: 300 },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);
}

module.exports = {
    scrollDown
};
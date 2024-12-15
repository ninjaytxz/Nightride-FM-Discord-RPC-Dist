function getSongDetails() {
    const artistElement = document.querySelector("#npArtist");
    const titleElement = document.querySelector("#npTitle");

    if (artistElement && titleElement) {
        const songTitle = titleElement.textContent.trim();
        const artistName = artistElement.textContent.replace(/-\s*$/, "").trim(); // Remove trailing dash
        return { songTitle, artistName };
    }
    return null;
}

let previousDetails = null;

function sendSongData() {
    const songDetails = getSongDetails();
    if (songDetails && JSON.stringify(songDetails) !== JSON.stringify(previousDetails)) {
        previousDetails = songDetails; // Avoid duplicate updates
        chrome.runtime.sendMessage({ type: "songUpdate", data: songDetails });
    }
}

// Send song data every 5 seconds
setInterval(sendSongData, 5000);

// Send initial song data immediately
sendSongData();

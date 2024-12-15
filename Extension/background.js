let ws = null;
let lastSongData = null;
let pollingInterval = null;

function connectWebSocket() {
    if (ws && ws.readyState === WebSocket.OPEN) return; // Prevent duplicate connections

    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
        console.log("WebSocket connection established.");
        if (lastSongData) {
            console.log("Resending last song data:", lastSongData);
            ws.send(JSON.stringify(lastSongData));
        }
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "requestSongData") {
            console.log("Server requested song data.");
            chrome.tabs.query({ url: "*://nightride.fm/*" }, (tabs) => {
                if (tabs.length > 0) {
                    fetchAndSendSongData(tabs[0].id); // Send song data if tab is open
                } else {
                    console.log("No Nightride.fm tabs open. Clearing Rich Presence.");
                    sendToServer({ songTitle: "", artistName: "" }); // Clear Rich Presence
                }
            });
        }
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(connectWebSocket, 5000); // Retry connection after 5 seconds
    };

    ws.onerror = (err) => {
        console.error("WebSocket error:", err);
    };
}

function fetchAndSendSongData(tabId) {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            func: () => {
                const artistElement = document.querySelector("#npArtist");
                const titleElement = document.querySelector("#npTitle");
                if (artistElement && titleElement) {
                    return {
                        songTitle: titleElement.textContent.trim(),
                        artistName: artistElement.textContent.replace(/-\s*$/, "").trim(),
                    };
                }
                return null;
            },
        },
        (results) => {
            if (results && results[0] && results[0].result) {
                const songData = results[0].result;

                if (JSON.stringify(songData) !== JSON.stringify(lastSongData)) {
                    lastSongData = songData; // Update the cache
                    sendToServer(songData); // Send the new data
                    console.log("Song data updated and sent:", songData);
                } else {
                    console.log("No change in song data. Skipping update.");
                }
            } else {
                console.log("No song data found on the tab.");
                sendToServer({ songTitle: "", artistName: "" }); // Clear Rich Presence if no data
            }
        }
    );
}

function sendToServer(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("Sending data to server:", data);
        ws.send(JSON.stringify(data));
    } else {
        console.error("WebSocket is not open. Data not sent.");
    }
}

function startPollingForSongChanges(tabId) {
    if (pollingInterval) clearInterval(pollingInterval);

    pollingInterval = setInterval(() => {
        console.log("Polling for song changes...");
        fetchAndSendSongData(tabId);
    }, 2000); // Poll every 2 seconds for faster updates
}

function stopPollingForSongChanges() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
}

// Monitor tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("nightride.fm") && changeInfo.status === "complete") {
        console.log("Nightride.fm tab updated or reopened:", tab);
        fetchAndSendSongData(tabId); // Immediate fetch
        startPollingForSongChanges(tabId); // Start polling for continuous updates
    }
});

// Monitor tab closures
chrome.tabs.onRemoved.addListener(() => {
    chrome.tabs.query({ url: "*://nightride.fm/*" }, (tabs) => {
        if (tabs.length === 0) {
            console.log("All Nightride.fm tabs closed. Clearing Rich Presence.");
            lastSongData = null; // Reset the cache
            stopPollingForSongChanges(); // Stop polling
            sendToServer({ songTitle: "", artistName: "" }); // Clear Rich Presence
        }
    });
});

// Initialize WebSocket connection
connectWebSocket();

const WebSocket = require("ws");
const { Client } = require("discord-rpc");
const { exec } = require("child_process");

const PORT = 8080;
let rpcClient = null;
let lastActivity = null;
let activeClient = null;
let isRpcConnected = false;

// Function to check if Discord is running
function isDiscordRunning() {
    const command = process.platform === "win32" ? "tasklist" : "ps aux";

    return new Promise((resolve) => {
        exec(command, (err, stdout) => {
            if (err) {
                console.error("Error checking Discord process:", err.message);
                return resolve(false);
            }
            resolve(stdout.toLowerCase().includes("discord"));
        });
    });
}

// Function to initialize a new Discord RPC client
function initializeRPC() {
    if (rpcClient) {
        rpcClient.destroy();
        console.log("Previous RPC client destroyed. Initializing a new session...");
    }

    rpcClient = new Client({ transport: "ipc" });

    rpcClient
        .login({ clientId: "1317193583714893944" })
        .then(() => {
            console.log("Connected to Discord RPC.");
            isRpcConnected = true;

            // Restore the last activity if available
            if (lastActivity) {
                rpcClient.setActivity(lastActivity).catch((err) => {
                    console.error("Failed to restore Rich Presence:", err.message);
                });
            }
        })
        .catch((err) => {
            console.error("Failed to connect to Discord RPC:", err.message);
            isRpcConnected = false;
        });

    rpcClient.on("disconnected", () => {
        console.log("Discord RPC disconnected. Resetting connection...");
        isRpcConnected = false;
    });
}

// Monitor Discord status and reconnect to RPC
async function monitorDiscordAndReconnect() {
    const discordRunning = await isDiscordRunning();

    if (discordRunning) {
        if (!isRpcConnected) {
            initializeRPC();
        }
    } else {
        isRpcConnected = false;
    }

    setTimeout(monitorDiscordAndReconnect, 10000); // Check every 10 seconds
}

// Handle WebSocket connections
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});

wss.on("connection", (ws) => {
    activeClient = ws;

    ws.send(JSON.stringify({ type: "requestSongData" }));

    ws.on("message", async (message) => {
        try {
            const data = JSON.parse(message);

            if (data.songTitle && data.artistName) {
                const activity = {
                    details: `🎶 Song: ${data.songTitle}`,
                    state: `🎤 By: ${data.artistName}`,
                    largeImageKey: "nrfm_rpc_asset",
                    largeImageText: "Nightride.fm",
                };

                lastActivity = activity;

                if (isRpcConnected) {
                    rpcClient.setActivity(activity).catch((err) => console.error("Error updating Rich Presence:", err));
                }
            }
        } catch (err) {
            console.error("Error processing WebSocket message:", err);
        }
    });

    ws.on("close", async () => {
        activeClient = null;

        if (isRpcConnected) {
            rpcClient.clearActivity().catch((err) => console.error("Failed to clear Rich Presence:", err));
        }

        lastActivity = null;
    });
});

// Start monitoring Discord and reconnecting if necessary
monitorDiscordAndReconnect();

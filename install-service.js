const { Service } = require("node-windows");
const path = require("path");

// Define the service
const svc = new Service({
    name: "Nightride FM RPC",
    description: "Discord Rich Presence for Nightride.fm",
    script: path.join(__dirname, "server.js"), // Path to your server.js
    nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

// Listen for the "install" event and start the service
svc.on("install", () => {
    console.log("Service installed successfully. Starting the service...");
    svc.start();
});

svc.on("alreadyinstalled", () => {
    console.log("Service is already installed.");
});

svc.on("start", () => {
    console.log("Service started successfully.");
});

svc.on("error", (err) => {
    console.error("Error occurred during service installation:", err);
});

// Attempt to install the service
try {
    console.log("Installing the service...");
    svc.install();
} catch (error) {
    console.error("Failed to install the service:", error.message);
}
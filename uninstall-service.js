const { Service } = require("node-windows");
const path = require("path");

// Define the service
const svc = new Service({
    name: "Nightride FM RPC", // Service name must match the installed service
    script: path.join(__dirname, "server.js"), // Same script used in installation
});

// Listen for the "uninstall" event
svc.on("uninstall", () => {
    console.log("Service uninstalled successfully.");
    if (!svc.exists) {
        console.log("Service no longer exists.");
    } else {
        console.error("Service still exists. Uninstallation may have failed.");
    }
});

svc.on("error", (err) => {
    console.error("Error during uninstallation:", err.message);
});

// Attempt to uninstall the service
if (svc.exists) {
    console.log("Uninstalling the service...");
    svc.uninstall();
} else {
    console.log("Service not found. Nothing to uninstall.");
}

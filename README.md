
# TabSync CLI

**TabSync CLI** lets you instantly share open browser tabs between your desktop and mobile — all over your local Wi-Fi, without the cloud.  
Run it as a simple CLI, scan a QR code, and you’re synced.

####  Install the extension, as the cli relies on Chrome/Edge [extension](https://github.com/jayantur13/tabsync-extension) to communicate data

---

## Quick Start

```bash
# Install globally (recommended)
npm install -g tabsync-cli

# Start the local server
tabsync
```
Once started, the CLI will:
- Detect your local IP address
- Launch a lightweight Express + WebSocket server
- Show a QR code — scan it on your mobile to open the TabSync page

---

## What It Does

- The server (server.js) keeps track of all connected devices and their open tabs.
- Each device (desktop or mobile) connects via WebSocket and automatically syncs tab URLs.
- When a device goes offline for more than 5 minutes, it’s cleaned up automatically and disappears from the screen (no refresh needed).
- You can also add URLs manually using the input box on the web page.

---

## CLI Options

```bash
tabsync [options]

Options:
  --no-qr        Skip showing the QR code
  --help         Show help info
```
Example:
```bash
tabsync --no-qr
```

---

## Web Interface

Open your browser at:
```bash
http://<your-local-ip>:3210
```
You’ll see:

- A list of devices connected to your TabSync session
- Their open tabs as clickable links
- A field to add new URLs to sync instantly

The UI updates in real time whenever devices connect, disconnect, or share new tabs.

---

## How It Works

- server.js → Express + WebSocket server handling connections and sync
- index.html → Frontend UI that receives live updates and renders devices/tabs
- CLI script → Spawns the server, detects IP, and shows QR code for easy connection

---

## Auto Cleanup

Inactive devices (no activity for 5 minutes) are automatically removed, and all clients update instantly — no refresh required.

## Stop the Server

Press Ctrl + C in the terminal to shut it down gracefully.

---

## Changelog

For all the important changelog vist [Changelog](https://github.com/jayantur13/tabsync-cli/blob/main/Changelog.md)

## Contributing

Contributions are always welcome!

See [Contributing](https://github.com/jayantur13/tabsync-cli/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [Code Of Conduct](https://github.com/jayantur13/tabsync-cli/blob/main/CODE_OF_CONDUCT.md).

## Support

Support the developers for this project to live long.For issues, open a new issue or use discussion.

## License

This project is licensed under the [MIT License](https://github.com/jayantur13/tabsync-cli/blob/main/LICENSE)
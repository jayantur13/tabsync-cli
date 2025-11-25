<p align="center">
  <img src="/assets/images/sync.png" width="80" alt="logo"/>
  <h2 align="center">TabSync CLI</h2>
  <p align="center">
  <b>TabSync CLI</b> lets you instantly share open browser tabs between your desktop and mobile - all over your local Wi-Fi, without the cloud.  
  Run it as a simple CLI, scan a QR code, and you’re synced.
  </p>
</p>

## Quick Note

Download extension and alternative of CLI (Windows,Linux)

<p>
 <a href="https://microsoftedge.microsoft.com/addons/detail/tabsync-local-browser-sync/clamejppcbpencfoggafhgamjjmihdhb" target="_blank"><img src="/assets/images/edge-store.png" width="236" height="62" alt="store-edge"/></a><br/>
<a href="https://github.com/jayantur13/tabsync-desktop/releases" target="_blank"><img src="/assets/images/github-release.png" width="236" height="62" alt="gh-repo-store"/></a>
</p>

> Sources [extension](https://github.com/jayantur13/tabsync-extension) and [tabsync-desktop](https://github.com/jayantur13/tabsync-desktop)

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
- Show a QR code - scan it on your mobile to open the TabSync page

---

## What It Does

- The server (server.js) keeps track of all connected devices and their open tabs.
- Each device (desktop or mobile) connects via WebSocket and automatically syncs tab URLs.
- When a device goes offline for more than 5 minutes, it’s cleaned up automatically and disappears from the screen (may require refresh).
- You can also add URLs manually using the input box on the web page.

---

## CLI Options

```bash
Usage: tabsync [options]

Options:
  --port <num>         Use a specific port instead of a random one
  --no-qr              Skip showing QR code
  --env <path>         Load environment variables from a custom file
  --version, --v       Show the current version
  --help               Show this help message

Examples:
  tabsync
  tabsync --port 3210
  tabsync --env .env
  tabsync --no-qr --port 8080
```

---

## Web Interface

Open your browser at:

```bash
http://<your-local-ip>:port
```

You’ll see:

- A list of devices connected to your TabSync session
- Their open tabs as clickable links
- A field to add new URLs to sync instantly

The UI updates in real time whenever devices connect, disconnect (may require refresh), or share new tabs.

---

## How It Works

- server.js -> Express + WebSocket server handling connections and sync
- index.html -> Frontend UI that receives live updates and renders devices/tabs
- CLI script -> Spawns the server, detects IP, and shows QR code for easy connection

---

## Auto Cleanup

Inactive devices (no activity for 5 minutes) are automatically removed, and all clients update instantly (may require refresh).

## Stop the Server

Press Ctrl + C in the terminal to shut it down gracefully.

---

## Changelog

What's fixed in v1.1.1:

- Use absolute static directory
- Detect HTML with no title (more rigid)
- Only treat HTTP failures as “Error”
- Above, fixed the port issue, now ports reflect immediately

> For all the important changelog vist [Changelog](https://github.com/jayantur13/tabsync-cli/blob/main/Changelog.md)

## Contributing

Contributions are always welcome!

See [Contributing](https://github.com/jayantur13/tabsync-cli/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [Code Of Conduct](https://github.com/jayantur13/tabsync-cli/blob/main/CODE_OF_CONDUCT.md).

## Support

Support the developers for this project to live long.For issues, open a new issue or use discussion.

## License

This project is licensed under the [MIT License](https://github.com/jayantur13/tabsync-cli/blob/main/LICENSE)

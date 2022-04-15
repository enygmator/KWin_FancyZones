

Installing script:
`kpackagetool5 --type=KWin/Script -i .` from the directory in which this readme is present

To update it, use: `kpackagetool5 --type=KWin/Script -u .`

To remove the script:
`kpackagetool5 --type=KWin/Script -r .`

> updating and reinstalling od the same thing. But they don't change the behavior of the already registered script. To do that, you'll need to `disable` and `enable` it.

TO enable it: `kwriteconfig5 --file kwinrc --group Plugins --key KWin_FancyZonesEnabled true && qdbus org.kde.KWin /KWin reconfigure`

To disable it: `kwriteconfig5 --file kwinrc --group Plugins --key KWin_FancyZonesEnabled false && qdbus org.kde.KWin /KWin reconfigure`

Global pre-installed list:
`kpackagetool5 --type=KWin/Script --list --global`

User downloaded list:
`kpackagetool5 --type=KWin/Script --list --global`



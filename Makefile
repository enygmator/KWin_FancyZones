.PHONY : update install remove enable disable

update : 
	@echo "Updating..."
	kpackagetool5 --type=KWin/Script -u .
	kwriteconfig5 --file kwinrc --group Plugins --key KWin_FancyZonesEnabled false
	qdbus org.kde.KWin /KWin reconfigure
	@#I have to sleep as it seems to take a while to take effect, otherwise, the enable and disable cycle doesn't seem to work
	sleep 1s
	kwriteconfig5 --file kwinrc --group Plugins --key KWin_FancyZonesEnabled true
	qdbus org.kde.KWin /KWin reconfigure
	@echo "Done."

install :
	kpackagetool5 --type=KWin/Script -i .

remove :
	kpackagetool5 --type=KWin/Script -r .

enable :
	kwriteconfig5 --file kwinrc --group Plugins --key KWin_FancyZonesEnabled true
	qdbus org.kde.KWin /KWin reconfigure

disable :
	kwriteconfig5 --file kwinrc --group Plugins --key KWin_FancyZonesEnabled false
	qdbus org.kde.KWin /KWin reconfigure
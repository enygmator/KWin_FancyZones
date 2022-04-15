const AREAS_AND_DIMS = [
	{
		id: "vertical_split",
		areas: [
			{
				id: "left",
				x: 0,
				y: 0,
				width: 0.5,
				height: 1,
			},
			{
				id: "right",
				x: 0.5,
				y: 0,
				width: 0.5,
				height: 1,
			}
		]
	},
	{
		id: "middle_left_right",
		areas: [
			{
				id: "middle",
				x: 0.20,
				y: 0,
				width: 0.60,
				height: 1,
			},
			{
				id: "left-float",
				x: 0,
				y: 0.25,
				width: 0.35,
				height: 0.50,
			},
			{
				id: "right-float",
				x: 0.65,
				y: 0.25,
				width: 0.35,
				height: 0.50,
			}
		]
	}
]

function setWindowsSizeAndPos(client, x, y, width, height) {
	if (!client.normalWindow && !client.utility) {
		return
	}

	var area = workspace.clientArea(KWin.PlacementArea, workspace.activeScreen, workspace.currentDesktop)
	var screenWidth = area.width
	var screenHeight = area.height
	var screenX = area.x
	var screenY = area.y

	var newX = screenX + x * screenWidth
	var newY = screenY + y * screenHeight
	var newWidth = width * screenWidth
	var newHeight = height * screenHeight
	
	print("KWin_FancyZones: setWindowsSizeAndPos: (x,y,w,h) : " + client.caption + " : " + newX + ", " + newY + ", " + newWidth + ", " + newHeight)

	client.geometry = {
		x: newX,
		y: newY,
		width: newWidth,
		height: newHeight
	}
}

registerUserActionsMenu(function(client) {

	menu = {
		title: "FancyZones Areas",
		text: "FancyZones Areas",
		items: []
	}

	for (var i = 0; i < AREAS_AND_DIMS.length; i++) {
		var area_config = AREAS_AND_DIMS[i]
		var area_menu = {
			title: area_config.id,
			text: area_config.id,
			items: []
		}
		for (var j = 0; j < area_config.areas.length; j++) {
			var area = area_config.areas[j]
			var area_menu_item = {
				title: area.id,
				text: area.id,
				triggered: (function(action) {

					var x = area.x
					var y = area.y
					var width = area.width
					var height = area.height

					//NOTE: This double-assignment is to make sure the closure captures the correct value of x,y,w,h BUT still uses the active client

					return function() {
						setWindowsSizeAndPos(client, x, y, width, height)
					}
				})()
			}
			area_menu.items.push(area_menu_item)
		}
		menu.items.push(area_menu)
	}

	return menu
})

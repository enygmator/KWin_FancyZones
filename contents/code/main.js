const AREAS_AND_DIMS = [
	{
		id: "middle_lr",
		areas: [
			{
				id: "left-float",
				x: 0,
				y: 0.246527778,
				width: 0.4453125,
				height: 0.571428571,
			},
			{
				id: "middle",
				x: 0.107421875,
				y: 0,
				width: 0.72265625,
				height: 1,
			},
			{
				id: "right-float",
				x: 0.5546875,
				y: 0.246527778,
				width: 0.4453125,
				height: 0.571428571,
			}
		]
	},
	{
		id: "academics",
		areas: [
			{
				id: "left",
				x: 0,
				y: 0,
				width: 0.6796875,
				height: 1,
			},
			{
				id: "right-lane",
				x: 0.6796875,
				y: 0,
				width: 0.3203125,
				height: 1,
			}
		]
	},
	{
		id: "redox",
		areas: [
			{
				id: "left",
				x: 0,
				y: 0,
				width: 0.62109375,
				height: 1,
			},
			{
				id: "right-up",
				x: 0.62109375,
				y: 0,
				width: 0.37890625,
				height: 0.419054441,
			},
			{
				id: "right-down",
				x: 0.62109375,
				y: 0.419054441,
				width: 0.37890625,
				height: 0.580945559,
			}
		]
	},	
	{
		id: "redox_eq",
		areas: [
			{
				id: "left",
				x: 0,
				y: 0,
				width: 0.62109375,
				height: 1,
			},
			{
				id: "right-up",
				x: 0.62109375,
				y: 0,
				width: 0.37890625,
				height: 0.508595989,
			},
			{
				id: "right-down",
				x: 0.62109375,
				y: 0.508595989,
				width: 0.37890625,
				height: 0.491404011,
			}
		]
	},
	{
		id: "horizontal_halves",
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
		id: "horizontal_triple",
		areas: [
			{
				id: "left",
				x: 0,
				y: 0,
				width: 0.33,
				height: 1,
			},
			{
				id: "middle",
				x: 0.33,
				y: 0,
				width: 0.34,
				height: 1,
			},
			{
				id: "right",
				x: 0.67,
				y: 0,
				width: 0.33,
				height: 1,
			}
		]
	},
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

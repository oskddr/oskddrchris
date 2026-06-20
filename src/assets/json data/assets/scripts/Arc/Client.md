local Arc = require($path)
local short = game.TextChatService.TextChannels.RBXSystem

Arc.GlobalMessage()

Arc.CustomBubbleChat({
		BackgroundColor3 = Color3.fromRGB(255, 20, 20),
		BackgroundTransparency = 0.5,
		TextColor3 = Color3.fromRGB(255, 0, 255),
		FontFace = 'BuilderSans',
		TextSize = 20,
		TailVisible = true,
	}, {
		Enabled = true,
		BubbleDuration = 6,
		MaxBubbles = 5,
		MaxDistance = 200,
	}
)

task.wait(1)

local Arcsys = Arc.SystemMessage('Hello, World!', 'System', {FontFace = 'Michroma', Color = "255, 0, 0"})
short:DisplaySystemMessage(Arcsys)

task.wait(1)

game:GetService('TextChatService').TextChannels.RBXSystem:DisplaySystemMessage(
	Arc.SystemMessage('Arc Init', 'CLIENT', {FontFace = 'Michroma', Color = "255, 0, 0"})
)
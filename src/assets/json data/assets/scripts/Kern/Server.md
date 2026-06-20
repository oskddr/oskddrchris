local RS:RunService = game:GetService('RunService');
local Kern = require(game.ReplicatedStorage.Shared.Kern);

local janitor:Kern.KernType = Kern.New({}, {
	label = 'Server',
	strict = true
})

local NewInstance:Folder = Instance.new('Folder', workspace)
NewInstance.Name = 'TempFolder'
janitor:Give(NewInstance)

janitor:Bind(RS.Heartbeat, function()
	print('Heartbeat')
end)

janitor:Defer(function()
	print('Cleaning Up')
end)

janitor:Add({
	Destroy = function()
		print('Custom Object Cleaned Via Add')
	end,
})

print(janitor)
print(janitor:__len()) -- print(#(janitor::any)) --

for idx, item in ipairs(janitor._bin or {}) do
	print(`iter -> {item}`)
end

local another = Kern.New()
print('Same Object?', (janitor::any) == janitor)
print('Different Object?', (janitor::any) == another)
print(tostring(janitor)..'Is Alive') -- print((janitor::any)..'Is Alive') --

janitor:Cleanup()
print(`After Janitor Cleanup, Count: {janitor:__len()}`)

local y:Folder = Instance.new('Folder', workspace)
y.Name = 'AnotherTemp'
janitor:Give(y)

janitor:Remove() -- (janitor::any)() --

janitor:Destroy()

print(`Removed: {janitor:IsRemoved()}`)
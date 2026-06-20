local RS:ReplicatedStorage = game:GetService('ReplicatedStorage');
local MS:MessagingService = game:GetService('MessagingService');
local DS:DataStoreService = game:GetService('DataStoreService');
local InitStore:DataStore = DS:GetDataStore('InitStore');
local Topic:string = 'Arc_Global';
_G.PublishTopic = Topic;

local ArcF:Folder = RS:FindFirstChild('ArcF')

if (not ArcF) then
	do
		local x:Folder = Instance.new('Folder', RS)
		x.Name = 'ArcF'; ArcF = x;
	end
end

local ArcRE:RemoteEvent = ArcF:FindFirstChild('ArcRE')

if (not ArcRE) then
	do
		local x:RemoteEvent = Instance.new('RemoteEvent', ArcF)
		x.Name = 'ArcRE'; ArcRE = x;
	end
end

MS:SubscribeAsync(Topic, function(msg)
	for _, p in ipairs(game.Players:GetPlayers()) do
		ArcRE:FireClient(p, msg.Data)
	end
end)

local s, a = pcall(function()
	return InitStore:GetAsync('Sent');
end)

if (not a) then
	MS:PublishAsync(Topic, {
		Text = 'Arc Init',
		Prefix = 'Global',
		Style = {FontFace = 'BuilderSans', Color = '255,0,0'}
	})
	
	pcall(function()
		InitStore:SetAsync('Sent', true)
	end)
end
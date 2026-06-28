import{d as De,r as c,o as Ge,w as $e,a as Ke,c as l,h as e,b as m,e as p,u as i,R as y,l as b,n as a,H as qe,F as g,i as k,g as xe,y as Se,m as C,q as oe,T as q,s as Ye,j as w,x as Ue,f as r,p as h,t as u,k as re,z as Pe,A as Ie,B as Qe,_ as Ze}from"./index-80oORBwX.js";import{_ as A}from"./Logo-BRVNEwZQ.js";import{S as Xe}from"./SmoothCursor-BcEd9yll.js";import{u as Je,m as et}from"./useAutoCloseMenu-0d8DWpzu.js";const tt=["data-ready"],nt=["aria-expanded"],ot=["data-open"],rt={class:"opensource-page"},lt={class:"opensource-assets"},at={class:"project-filter-panel","aria-label":"Filter open source projects"},it={class:"project-search","aria-label":"Search open source projects"},st={class:"project-filter-tabs",role:"tablist","aria-label":"Project type filters"},ct=["aria-selected","onClick"],ut=["id"],dt=["aria-label"],pt=["aria-selected","onClick"],mt=["aria-selected","onClick"],ht={class:"asset-preview"},ft=["src","alt"],vt={class:"asset-info"},yt={class:"asset-meta","aria-label":"Asset details"},bt={class:"terminal-topbar"},gt={class:"terminal-file"},Ct={class:"terminal-title"},xt=["aria-label"],St=["aria-selected","onClick"],Pt=["aria-selected","onClick"],It=["aria-label","onClick"],_t={key:0,viewBox:"0 0 24 24","aria-hidden":"true"},kt={key:1,viewBox:"0 0 24 24","aria-hidden":"true"},wt=["onClick"],At=["onClick"],Nt=["onClick"],Mt={class:"setup-tree__label setup-tree__label--folder"},zt={class:"setup-tree__file setup-tree__file--pop"},Tt={key:0,class:"setup-tree__file setup-tree__file--pop"},Rt={class:"setup-tree__note"},Bt={key:0,class:"project-empty"},Et=["onKeydown"],Lt={class:"search-card__input"},Ot=["onKeydown"],Ft={id:"SAthing"},Vt={key:0,id:"Pages"},Wt=["data-open","aria-expanded"],Ht=["onClick"],jt={class:"page-inner"},Dt={class:"page-icon","aria-hidden":"true"},Gt={key:0,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},$t={key:1,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Kt={key:2,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},qt={key:3,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Yt={key:4,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Ut={key:5,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Qt={key:6,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Zt={class:"page-name"},Xt={key:1,id:"Projects"},Jt=["data-open","aria-expanded"],en=["onClick"],tn={class:"page-inner"},nn={class:"page-name"},_e="zantixTheme",on=De({__name:"OpenSourcePage",setup(rn){const ke=Qe(),we=()=>{if(typeof window>"u")return null;const o=localStorage.getItem(_e);return o==="system"||o==="light"||o==="dark"?o:null},le=c(!1),x=c(!1),{closeMenu:S,keepMenuOpen:P,toggleMenu:ae}=Je(x),Ae=c(null),ie=c(null),N=c(!1),f=c(""),M=c(null),L=c(null),O=c(null),F=c(null),V=c(!0),W=c(!1),H=c(we()??"system"),z=c(null),Y=c(""),T=c("all"),U=c({}),Q=c({}),j=c({}),Z=[{slug:"home",label:"Home",href:"/"},{slug:"about",label:"About me",href:"/about"},{slug:"open-source",label:"Open Source",href:"/opensource"},{slug:"developers",label:"Works",href:"/Team"},{slug:"links",label:"Links",href:"/links"},{slug:"reviews",label:"Reviews",href:"/reviews/"},{slug:"credits",label:"Credits",href:"/credits/"}],Ne=["top-left","top-right","bottom-left","bottom-right"],Me=[{value:"all",label:"All",tone:"all"},{value:"server",label:"ServerScript",tone:"server"},{value:"local",label:"LocalScript",tone:"local"},{value:"module",label:"ModuleScript",tone:"module"}],R={dna:{service:"ServerScriptService",serviceKind:"serverService",folders:[],file:"DNA.luau",fileKind:"server"},imprint:{service:"ReplicatedStorage",serviceKind:"replicated",folders:[],file:"Imprint.luau",fileKind:"module"},orbitAura:{service:"StarterPlayer",serviceKind:"starterPlayer",folders:[{label:"StarterPlayerScripts"}],file:"OrbitAura.client.luau",fileKind:"local"},gravityField:{service:"StarterPlayer",serviceKind:"starterPlayer",folders:[{label:"StarterPlayerScripts"}],file:"GravityField.client.luau",fileKind:"local"},npcController:{service:"ReplicatedStorage",serviceKind:"replicated",folders:[],file:"NPCController.luau",fileKind:"module"}},ze=[{code:"ASSET-001",slug:"project-dna",title:"Double Helix DNA",fileName:"DNA.luau",description:"A math-driven Luau generator that uses sine, cosine, angle steps, and vector offsets to build a double helix DNA model in Roblox.",language:"Luau",scriptType:"server",scriptLabel:"Server Script",commentTag:"With comments",license:"MIT",image:A,theme:"theme-blue",delay:"0s",setupTree:R.dna,setup:`1. Create a Script in ServerScriptService.
2. Paste this code into the Script.
3. Press Play in Roblox Studio.
4. The DNA model generates in Workspace inside a folder named "dna helix".`,luau:`--!strict
-- helix settings
local origin:Vector3 = Vector3.new(0, 0, 0);
local helixRadius:number = 8;
local helixHeight:number = 80;
local turns:number = 6;
local partsPerTurn:number = 20;
local rungEvery:number = 2;

-- part settings
local strandSize:Vector3 = Vector3.new(1.5, 1.5, 1.5);
local material:Enum.Material = Enum.Material.Neon;

-- colors for strands and rungs
local strandAColor:Color3 = Color3.fromRGB(255, 80, 80);
local rungAColor:Color3 = Color3.fromRGB(255, 200, 80);
local strandBColor:Color3 = Color3.fromRGB(80, 140, 255);
local rungBColor:Color3 = Color3.fromRGB(80, 255, 160);

-- derived values
local totalSteps:number = turns * partsPerTurn;
local heightStep:number = helixHeight / totalSteps;
local angleStep:number = ((math.pi * 2) / partsPerTurn);

-- container so everything stays grouped
local folder:Folder = Instance.new('Folder', workspace);
folder.Name = 'dna helix';

-- creates a generic part with shared defaults returns the part
local function createPart(size:Vector3, color:Color3, shape:Enum.PartType?):Part
	local part = Instance.new('Part');
	part.Size = size; part.Color = color;
	part.Shape = shape or Enum.PartType.Ball;
	part.Material = material;
	part.Anchored = true; part.CanCollide = false;
	part.CastShadow = false;

	return part;
end

-- returns a position along the helix for a given angle plus height
local function getHelixPosition(angle:number, height:number):Vector3
	local x:number = (origin.X + helixRadius * math.cos(angle));
	local y:number = origin.Y + height;
	local z:number = (origin.Z + helixRadius * math.sin(angle));

	return Vector3.new(x, y, z);
end

-- builds the connecting rung between the two strands
local function createRung(posA:Vector3, posB:Vector3):()
	local offset:Vector3 = posB - posA;
    local distance:number = offset.Magnitude;
    if (distance == 0) then return; end;
	local direction:Vector3 = offset.Unit;

	-- split into two colored halves
	local halves:{{pos:Vector3, color:Color3}} = {
		{pos = posA + direction * (distance / 4), color = rungAColor};
		{pos = posB - direction * (distance / 4), color = rungBColor}
	};

	for _, data in ipairs(halves) do
		local rung:Part = createPart(Vector3.new(0.8, 0.8, distance / 2), data.color, Enum.PartType.Block);

		rung.CFrame = CFrame.lookAt(data.pos, data.pos + direction);
		rung.Parent = folder;
	end
end

-- places a single strand segment
local function createStrandPart(position:Vector3, color:Color3)
	local part:Part = createPart(strandSize, color, Enum.PartType.Ball);
	part.Position = position;
	part.Parent = folder;
end

-- main generation loop
for step = 0, totalSteps - 1 do
	local angle:number = step * angleStep;
	local height:number = step * heightStep;

	-- second strand is directly opposite (pi offset)
	local posA:Vector3 = getHelixPosition(angle, height);
	local posB:Vector3 = getHelixPosition(angle + math.pi, height);

	createStrandPart(posA, strandAColor); createStrandPart(posB, strandBColor);

	-- add rungs at intervals so it dont get too dense
	if (step % rungEvery == 0) then createRung(posA, posB); end;
end

-- debug
warn(\`DNA (Double Helix) Generated With {totalSteps} Parts Per Strand\`);`},{code:"ASSET-002",slug:"project-imprint",title:"Imprint Module",fileName:"Imprint.luau",description:"A strict Luau workspace snapshot module that clones, validates, stores, and reloads instance imprints with typed capture/load options.",language:"Luau",scriptType:"module",scriptLabel:"ModuleScript",commentTag:"Without comments",license:"MIT",image:A,theme:"theme-blue",delay:"0.08s",setupTree:R.imprint,setup:`1. Create a ModuleScript in ReplicatedStorage or ServerScriptService.
2. Name it "Imprint".
3. Paste this module code inside it.
4. Require it from another script and call Imprint.CaptureWorkspace() or create an Imprint.new() controller.`,luau:`local HTTPS = game:GetService('HttpService');
local WS:Workspace = workspace;

local Imprint = {};
Imprint.__index = Imprint;

type InstancePredicate = (x:Instance)->boolean;

export type ImprintEntry = {
	Id:number;
	Name:string;
	ClassName:string;
	Data:Instance
};

export type ImprintSkipRecord = {
	Name:string;
	ClassName:string;
	Reason:string
};

export type ImprintSnapshot = {
	SnapshotId:string;
	RootName:string;
	CapturedAt:number;
	Count:number;
	Entries:{ImprintEntry};
	Skipped:{ImprintSkipRecord}
};

export type ImprintCaptureOptions = {
	Root:Instance?;
	Include:InstancePredicate?;
	ForceArchivable:boolean?
};

export type ImprintLoadOptions = {
	Snapshot:ImprintSnapshot;
	Root:Instance?;
	Clear:boolean?;
	Include:InstancePredicate?;
	ClearPredicate:InstancePredicate?
};

type ImprintLocalLoadOptions = {
	Root:Instance?;
	Clear:boolean?;
	Include:InstancePredicate?;
	ClearPredicate:InstancePredicate?
};

export type ImprintOptions = {
	Root:Instance?;
	ForceArchivable:boolean?
};

export type ImprintController = {
	Capture:(self:ImprintController, x:ImprintCaptureOptions?)->ImprintSnapshot;
	Load:(self:ImprintController, x:ImprintLocalLoadOptions?)->{Instance};
	GetSnapshot:(self:ImprintController)->ImprintSnapshot?;
	SetSnapshot:(self:ImprintController, x:ImprintSnapshot)->();
	CloneCurrentSnapshot:(self:ImprintController)->ImprintSnapshot?;
	HasSnapshot:(self:ImprintController)->boolean;
	ClearSnapshot:(self:ImprintController)->();
	Destroy:(self:ImprintController)->()
};

type CloneResult = {
	Success:boolean;
	Clone:Instance?;
	Reason:string?
};

type ImprintInternal = ImprintController & {
	_root:Instance;
	_forceArchivable:boolean;
	_snapshot:ImprintSnapshot?;
	_destroyed:boolean;
	_assertAlive:(self:ImprintInternal)->()
};

local function now():number
	return time();
end;

local function _x1(x:Instance?):Instance
	if (x == nil) then
		return WS;
	end;

	assert(typeof(x) == 'Instance', 'Imprint Root Must Be An Instance Or Nil');
	return x;
end;

local function _x2(x:{ImprintSkipRecord}, z:Instance, y:string):()
	x[#x + 1] = {
		Name = z.Name;
		ClassName = z.ClassName;
		Reason = y
	};
end;

local function _x3(x:Instance, z:boolean):CloneResult
	local y:boolean = x.Archivable;
	local v:{any};

	assert(typeof(x) == 'Instance', 'Imprint Can Only Clone Instances');
	assert(type(z) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean');

	if (z and (x.Archivable ~= true)) then
		x.Archivable = true;
	end;

	v = table.pack(pcall(function():Instance
		local c:Instance = x:Clone();
		c.Parent = nil;
		return c;
	end));

	if (z and (x.Archivable ~= y)) then
		x.Archivable = y;
	end;

	if ((v[1] == true) and (typeof(v[2]) == 'Instance')) then
		return {
			Success = true;
			Clone = v[2];
			Reason = nil
		};
	end;

	local c:string = 'CloneFailed';

	if (type(v[2]) == 'string') then
		c = v[2];
	end;

	return {
		Success = false;
		Clone = nil;
		Reason = c
	};
end;

local function _x4(x:Instance, z:InstancePredicate?):boolean
	assert(typeof(x) == 'Instance', 'Imprint Predicate Received A Non Instance');

	if (z == nil) then
		return true;
	end;

	assert(type(z) == 'function', 'Imprint Predicate Must Be A Function Or Nil');
	return z(x) == true;
end;

local function _x5(x:Instance):boolean
	assert(typeof(x) == 'Instance', 'Imprint Clear Predicate Received A Non Instance');
	return ((not x:IsA('Terrain')) and (not x:IsA('Camera')));
end;

local function _x6(x:{ImprintSkipRecord}):{ImprintSkipRecord}
	local z:{ImprintSkipRecord} = {};
	local y:number = 1;
	local v:number = #x;
	local c:ImprintSkipRecord;

	while (y <= v) do
		c = x[y];

		z[y] = {
			Name = c.Name;
			ClassName = c.ClassName;
			Reason = c.Reason
		};

		y += 1;
	end;

	return z;
end;

local function _x7(x:ImprintSnapshot):()
	local z:number = 1;
	local y:number = 1;
	local v:ImprintEntry;
	local c:ImprintSkipRecord;

	assert(type(x) == 'table', 'Imprint Snapshot Must Be A Table');
	assert((type(x.SnapshotId) == 'string') and (x.SnapshotId ~= ''), 'Imprint SnapshotId Must Be A Non Empty String');
	assert((type(x.RootName) == 'string') and (x.RootName ~= ''), 'Imprint RootName Must Be A Non Empty String');
	assert(type(x.CapturedAt) == 'number', 'Imprint CapturedAt Must Be A Number');
	assert(type(x.Count) == 'number', 'Imprint Count Must Be A Number');
	assert(type(x.Entries) == 'table', 'Imprint Entries Must Be A Table');
	assert(type(x.Skipped) == 'table', 'Imprint Skipped Must Be A Table');
	assert(x.Count == #x.Entries, 'Imprint Snapshot Count Does Not Match Entry Count');

	while (z <= #x.Entries) do
		v = x.Entries[z];
		assert(type(v) == 'table', 'Imprint Snapshot Entry Must Be A Table');
		assert(type(v.Id) == 'number', 'Imprint Entry Id Must Be A Number');
		assert((type(v.Name) == 'string') and (v.Name ~= ''), 'Imprint Entry Name Must Be A Non Empty String');
		assert((type(v.ClassName) == 'string') and (v.ClassName ~= ''), 'Imprint Entry ClassName Must Be A Non Empty String');
		assert(typeof(v.Data) == 'Instance', 'Imprint Entry Data Must Be An Instance');
		z += 1;
	end;

	while (y <= #x.Skipped) do
		c = x.Skipped[y];
		assert(type(c) == 'table', 'Imprint Skip Record Must Be A Table');
		assert((type(c.Name) == 'string') and (c.Name ~= ''), 'Imprint Skip Record Name Must Be A Non Empty String');
		assert((type(c.ClassName) == 'string') and (c.ClassName ~= ''), 'Imprint Skip Record ClassName Must Be A Non Empty String');
		assert(type(c.Reason) == 'string', 'Imprint Skip Record Reason Must Be A String');
		y += 1;
	end;
end;

local function _x8(x:ImprintSnapshot):ImprintSnapshot
	_x7(x);

	local z:{ImprintEntry} = {};
	local y:{ImprintSkipRecord} = _x6(x.Skipped);
	local v:number = 1;
	local c:number = #x.Entries;
	local b:ImprintEntry;
	local n:CloneResult;
	local m:Instance;

	while (v <= c) do
		b = x.Entries[v];
		n = _x3(b.Data, true);
		assert((n.Success == true) and (n.Clone ~= nil), 'Imprint Could Not Clone Snapshot Entry: '..b.Name);
		m = n.Clone;

		z[v] = {
			Id = b.Id;
			Name = b.Name;
			ClassName = b.ClassName;
			Data = m
		};

		v += 1;
	end;

	return {
		SnapshotId = HTTPS:GenerateGUID(false);
		RootName = x.RootName;
		CapturedAt = x.CapturedAt;
		Count = x.Count;
		Entries = z;
		Skipped = y
	};
end;

local function _x9(x:ImprintCaptureOptions?):ImprintSnapshot
	local z:Instance = WS;
	local y:InstancePredicate? = nil;
	local v:boolean = true;
	local c:{Instance};
	local b:{ImprintEntry} = {};
	local n:{ImprintSkipRecord} = {};
	local m:number = 1;
	local a:number = 0;
	local q:Instance;
	local k:boolean;
	local r:CloneResult;
	local p:string;

	if (x ~= nil) then
		assert(type(x) == 'table', 'Imprint Capture Options Must Be A Table Or Nil');

		if (x.Root ~= nil) then
			z = _x1(x.Root);
		end;

		if (x.Include ~= nil) then
			assert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
			y = x.Include;
		end;

		if (x.ForceArchivable ~= nil) then
			assert(type(x.ForceArchivable) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean Or Nil');
			v = x.ForceArchivable;
		end;
	end;

	c = z:GetChildren();

	while (m <= #c) do
		q = c[m];
		k = _x4(q, y);

		if (k) then
			r = _x3(q, v);

			if ((r.Success == true) and (r.Clone ~= nil)) then
				a += 1;

				b[a] = {
					Id = a;
					Name = q.Name;
					ClassName = q.ClassName;
					Data = r.Clone
				};
			else
				p = 'CloneFailed';

				if (type(r.Reason) == 'string') then
					p = r.Reason;
				end;

				_x2(n, q, p);
			end;
		end;

		m += 1;
	end;

	return {
		SnapshotId = HTTPS:GenerateGUID(false);
		RootName = z.Name;
		CapturedAt = now();
		Count = a;
		Entries = b;
		Skipped = n
	};
end;

local function _x10(x:ImprintLoadOptions):{Instance}
	local z:Instance = WS;
	local y:boolean = false;
	local v:InstancePredicate? = nil;
	local c:InstancePredicate? = nil;
	local b:{Instance} = {};
	local n:{Instance};
	local m:number = 1;
	local a:number = 0;
	local q:Instance;
	local k:boolean;
	local r:CloneResult;
	local p:ImprintEntry;

	assert(type(x) == 'table', 'Imprint Load Options Must Be A Table');
	_x7(x.Snapshot);

	if (x.Root ~= nil) then
		z = _x1(x.Root);
	end;

	if (x.Clear ~= nil) then
		assert(type(x.Clear) == 'boolean', 'Imprint Clear Must Be A Boolean Or Nil');
		y = x.Clear;
	end;

	if (x.Include ~= nil) then
		assert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
		v = x.Include;
	end;

	if (x.ClearPredicate ~= nil) then
		assert(type(x.ClearPredicate) == 'function', 'Imprint ClearPredicate Must Be A Function Or Nil');
		c = x.ClearPredicate;
	end;

	if (y) then
		n = z:GetChildren();

		while (m <= #n) do
			q = n[m];

			if (c ~= nil) then
				k = _x4(q, c);
			else
				k = _x5(q);
			end;

			if (k) then
				q:Destroy();
			end;

			m += 1;
		end;
	end;

	m = 1;

	while (m <= #x.Snapshot.Entries) do
		p = x.Snapshot.Entries[m];

		if (_x4(p.Data, v)) then
			r = _x3(p.Data, true);

			if ((r.Success == true) and (r.Clone ~= nil)) then
				a += 1;
				r.Clone.Parent = z;
				b[a] = r.Clone;
			end;
		end;

		m += 1;
	end;

	return b;
end;

function Imprint:_assertAlive():()
	assert(not self._destroyed, 'Imprint Was Destroyed And Can No Longer Be Used');
end;

function Imprint.new(x:ImprintOptions?):ImprintController
	local z:Instance = WS;
	local y:boolean = true;
	local self:ImprintInternal;

	if (x ~= nil) then
		assert(type(x) == 'table', 'Imprint Options Must Be A Table Or Nil');

		if (x.Root ~= nil) then
			z = _x1(x.Root);
		end;

		if (x.ForceArchivable ~= nil) then
			assert(type(x.ForceArchivable) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean Or Nil');
			y = x.ForceArchivable;
		end;
	end;

	self = setmetatable({
		_root = z;
		_forceArchivable = y;
		_snapshot = nil;
		_destroyed = false
	}, Imprint)::any;

	return self;
end;

function Imprint.CaptureWorkspace(x:ImprintCaptureOptions?):ImprintSnapshot
	return _x9(x);
end;

function Imprint.LoadWorkspace(x:ImprintLoadOptions):{Instance}
	local z:boolean = true;

	assert(type(x) == 'table', 'Imprint Load Options Must Be A Table');

	if (x.Clear ~= nil) then
		assert(type(x.Clear) == 'boolean', 'Imprint Clear Must Be A Boolean Or Nil');
		z = x.Clear;
	end;

	return _x10({
		Snapshot = x.Snapshot;
		Root = x.Root;
		Clear = z;
		Include = x.Include;
		ClearPredicate = x.ClearPredicate
	});
end;

function Imprint.CloneSnapshot(x:ImprintSnapshot):ImprintSnapshot
	return _x8(x);
end;

function Imprint:Capture(x:ImprintCaptureOptions?):ImprintSnapshot
	self:_assertAlive();

	local z:Instance = self._root;
	local y:InstancePredicate? = nil;
	local v:boolean = self._forceArchivable;

	if (x ~= nil) then
		assert(type(x) == 'table', 'Imprint Capture Options Must Be A Table Or Nil');

		if (x.Root ~= nil) then
			z = _x1(x.Root);
		end;

		if (x.Include ~= nil) then
			assert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
			y = x.Include;
		end;

		if (x.ForceArchivable ~= nil) then
			assert(type(x.ForceArchivable) == 'boolean', 'Imprint ForceArchivable Must Be A Boolean Or Nil');
			v = x.ForceArchivable;
		end;
	end;

	self._snapshot = _x9({
		Root = z;
		Include = y;
		ForceArchivable = v
	});

	return self._snapshot;
end;

function Imprint:Load(x:ImprintLocalLoadOptions?):{Instance}
	self:_assertAlive();

	local z:ImprintSnapshot? = self._snapshot;
	local y:Instance = self._root;
	local v:boolean = false;
	local c:InstancePredicate? = nil;
	local b:InstancePredicate? = nil;
	local n:ImprintSnapshot;

	assert(z ~= nil, 'Imprint Does Not Have A Snapshot To Load');
	n = z;

	if (x ~= nil) then
		assert(type(x) == 'table', 'Imprint Load Options Must Be A Table Or Nil');

		if (x.Root ~= nil) then
			y = _x1(x.Root);
		end;

		if (x.Clear ~= nil) then
			assert(type(x.Clear) == 'boolean', 'Imprint Clear Must Be A Boolean Or Nil');
			v = x.Clear;
		end;

		if (x.Include ~= nil) then
			assert(type(x.Include) == 'function', 'Imprint Include Must Be A Function Or Nil');
			c = x.Include;
		end;

		if (x.ClearPredicate ~= nil) then
			assert(type(x.ClearPredicate) == 'function', 'Imprint ClearPredicate Must Be A Function Or Nil');
			b = x.ClearPredicate;
		end;
	end;

	return _x10({
		Snapshot = n;
		Root = y;
		Clear = v;
		Include = c;
		ClearPredicate = b
	});
end;

function Imprint:GetSnapshot():ImprintSnapshot?
	self:_assertAlive();
	return self._snapshot;
end;

function Imprint:SetSnapshot(x:ImprintSnapshot):()
	self:_assertAlive();
	_x7(x);
	self._snapshot = _x8(x);
end;

function Imprint:CloneCurrentSnapshot():ImprintSnapshot?
	self:_assertAlive();

	local z:ImprintSnapshot? = self._snapshot;

	if (z == nil) then
		return nil;
	end;

	return _x8(z);
end;

function Imprint:HasSnapshot():boolean
	self:_assertAlive();
	return self._snapshot ~= nil;
end;

function Imprint:ClearSnapshot():()
	self:_assertAlive();
	self._snapshot = nil;
end;

function Imprint:Destroy():()
	if (self._destroyed) then
		return;
	end;

	self._destroyed = true;
	self._snapshot = nil;
end;

return table.freeze(Imprint);`},{code:"ASSET-003",slug:"project-orbit-aura",title:"Dynamic Orbit Aura",fileName:"OrbitAura.client.luau",description:"A LocalScript that creates neon orbs around the player and animates position, color, size, and light with RenderStepped.",language:"Luau",scriptType:"local",scriptLabel:"LocalScript",commentTag:"With comments",license:"MIT",image:A,theme:"theme-blue",delay:"0.16s",setupTree:R.orbitAura,setup:`1. Create a LocalScript in StarterPlayerScripts.
2. Paste this code into the LocalScript.
3. Press Play.
4. The aura follows your character and animates every frame on the client.`,luau:`--!strict
local players = game:GetService('Players');
local runService = game:GetService('RunService');

local player:Player = players.LocalPlayer;
local character:Model = player.Character or player.CharacterAdded:Wait();
local root:BasePart = character:WaitForChild('HumanoidRootPart')::BasePart;

-- orbit settings
local orbCount:number = 10;
local orbitRadius:number = 6;
local orbitSpeed:number = 2.2;
local heightWave:number = 2;

-- visual settings
local baseSize:number = 1;
local sizePulse:number = 0.6;
local lightRange:number = 10;
local lightBrightness:number = 2;

-- container so everything stays grouped
local folder:Folder = Instance.new('Folder', workspace);
folder.Name = 'dynamic orbit aura';

local orbs:{Part} = {};

-- creates one glowing orb with a point light
local function createOrb(index:number):Part
    local orb:Part = Instance.new('Part');
    orb.Name = \`orb {index}\`; orb.Shape = Enum.PartType.Ball;
	orb.Material = Enum.Material.Neon;
	orb.Anchored = true; orb.CanCollide = false;
	orb.CastShadow = false;

	local light:PointLight = Instance.new('PointLight', orb);
	light.Brightness = lightBrightness;
	light.Range = lightRange;

	orb.Parent = folder;
	return orb;
end

-- updates one orb position, color, size, and light
local function updateOrb(orb:Part, index:number, time:number):()
	local offset:number = (index / orbCount);
    local angle:number = ((time * orbitSpeed) + (offset * math.pi * 2));
    local light:PointLight? = orb:FindFirstChildOfClass('PointLight');

	-- adds a wave so the orbs dont look flat
	local y:number = (math.sin((time * 3) + index) * heightWave);

	-- small radius pulse makes it feel more alive
	local radius:number = (orbitRadius + math.sin((time * 2) + index));

	local x:number = (math.cos(angle) * radius);
	local z:number = (math.sin(angle) * radius);

	orb.Position = root.Position + Vector3.new(x, y + 3, z);

	-- rainbow color cycle
	local hue:number = ((time * 0.15) + offset) % 1;
	local color:Color3 = Color3.fromHSV(hue, 1, 1);
	orb.Color = color;

	-- pulse the orb size
	local scale:number = (baseSize + math.sin((time * 4) + index) * sizePulse);
	orb.Size = Vector3.new(scale, scale, scale);

    if (light) then
		light.Color = color;
		light.Brightness = lightBrightness + math.sin((time * 6) + index);
	end;
end

-- creates all orbs once
for index = 1, orbCount do
	orbs[index] = createOrb(index);
end

-- main animation loop
runService.RenderStepped:Connect(function()
	local time:number = os.clock();

	for index, orb in ipairs(orbs) do
		updateOrb(orb, index, time);
	end;
end);

-- debug
warn(\`Dynamic Orbit Aura Generated With {orbCount} Orbs\`);`},{code:"ASSET-004",slug:"project-gravity-field",title:"Interactive Gravity Field",fileName:"GravityField.client.luau",description:"A LocalScript showcase that creates a mouse-reactive neon gravity field with orbiting fragments and click burst motion.",language:"Luau",scriptType:"local",scriptLabel:"LocalScript",commentTag:"With comments",license:"MIT",image:A,theme:"theme-blue",delay:"0.24s",setupTree:R.gravityField,setup:`1. Create a LocalScript in StarterPlayerScripts.
2. Paste this code into the LocalScript.
3. Press Play and move your mouse to pull the field.
4. Left click to trigger the expansion burst.`,luau:`--!strict
local players = game:GetService('Players');
local runService = game:GetService('RunService');
local userInputService = game:GetService('UserInputService');

local player:Player = players.LocalPlayer;
local mouse:Mouse = player:GetMouse();

local character:Model = player.Character or player.CharacterAdded:Wait();
local root:BasePart = character:WaitForChild('HumanoidRootPart')::BasePart;

-- gravity field settings
local fragmentCount:number = 36;
local baseOrbitRadius:number = 8;
local orbitSpeed:number = 1.35;
local verticalRange:number = 5;
local pullStrength:number = 1.8;

-- mouse control settings
local followSpeed:number = 0.12;
local mousePullDistance:number = 22;
local mousePullStrength:number = 0.35;
local clickBurstStrength:number = 5;
local clickBurstDecay:number = 3.5;

-- visual settings
local fragmentSize:Vector3 = Vector3.new(0.35, 0.35, 1.4);
local coreSize:Vector3 = Vector3.new(2.2, 2.2, 2.2);
local material:Enum.Material = Enum.Material.Neon;
local mainColor:Color3 = Color3.fromRGB(235, 235, 235);
local coreColor:Color3 = Color3.fromRGB(210, 210, 210);

-- container so everything stays grouped
local folder:Folder = Instance.new('Folder', workspace);
folder.Name = 'interactive gravity field showcase';

local fragments:{Part} = {};
local centerPosition:Vector3 = root.Position + Vector3.new(0, 3, 0);
local burst:number = 0;

-- creates a cleaner diamond style core instead of a ball
local function createCore():Part
	local core:Part = Instance.new('Part');
	core.Name = 'gravity diamond';
	core.Shape = Enum.PartType.Block;
	core.Material = material;
	core.Color = coreColor;
	core.Size = coreSize;
	core.Anchored = true; core.CanCollide = false;
	core.CastShadow = false;
	core.Transparency = 0.1;
	core.Parent = folder;

	return core;
end

-- creates one orbiting fragment
local function createFragment(index:number):Part
    local fragment:Part = Instance.new('Part', folder);
    fragment.Name = \`fragment {index}\`;
	fragment.Size = fragmentSize; fragment.Material = material;
	fragment.Color = mainColor;
	fragment.Anchored = true; fragment.CanCollide = false;
	fragment.CastShadow = false;

	return fragment;
end

local core:Part = createCore();

-- returns the point the mouse is aiming at
local function getMousePosition():Vector3
	local hit:CFrame = mouse.Hit;
	return hit.Position;
end

-- moves the gravity field between the player and mouse position
local function updateCenter():()
	local playerCenter:Vector3 = (root.Position + Vector3.new(0, 3, 0));
	local mousePosition:Vector3 = getMousePosition();

	local offset:Vector3 = mousePosition - playerCenter;
	local distance:number = math.min(offset.Magnitude, mousePullDistance);

	if (offset.Magnitude > 0) then
		local target:Vector3 = playerCenter + offset.Unit * distance * mousePullStrength;
		centerPosition = centerPosition:Lerp(target, followSpeed);
	else
		centerPosition = centerPosition:Lerp(playerCenter, followSpeed);
	end;
end

-- moves and rotates the middle diamond
local function updateCore(time:number):()
	local pulse:number = math.sin(time * 3) * 0.18;
	local size:Vector3 = coreSize + Vector3.new(pulse, pulse, pulse);

	core.Size = size;
	core.CFrame = (CFrame.new(centerPosition) * CFrame.Angles(time * 1.4, time * 1.9, time * 1.1));
	core.Transparency = (math.clamp(0.1 + math.sin(time * 4) * 0.05, 0.05, 0.18));
end

-- updates one fragment orbiting around the moving and tilted field
local function updateFragment(fragment:Part, index:number, time:number):()
	local offset:number = index / fragmentCount;
	local angle:number = (time * orbitSpeed) + (offset * math.pi * 2);

	local burstPush:number = burst * clickBurstStrength;
	local radius:number = baseOrbitRadius + burstPush + math.sin((time * pullStrength) + index) * 1.2;
	local height:number = math.sin((time * 1.6) + (offset * math.pi * 2)) * verticalRange;
	local localPosition:Vector3 = Vector3.new(math.cos(angle) * radius, height, math.sin(angle) * radius);
	-- tilts the whole orbit path on all axis
	local tilt:CFrame = CFrame.Angles(math.sin(time * 0.8) * 0.75, time * 0.35, math.cos(time * 0.7) * 0.75);

	local worldPosition:Vector3 = centerPosition + tilt:VectorToWorldSpace(localPosition);

	fragment.CFrame = CFrame.lookAt(worldPosition, centerPosition)
		* CFrame.Angles(
			time + index,
			time * 0.7,
			time * 1.2
		);

	fragment.Transparency = math.clamp(0.1 + math.sin(time * 2 + index) * 0.15, 0.05, 0.35);
end

-- creates all fragments once
for index = 1, fragmentCount do
	fragments[index] = createFragment(index);
end

-- left click creates a quick expansion burst
userInputService.InputBegan:Connect(function(input:InputObject, processed:boolean)
	if (processed) then return; end;

	if (input.UserInputType == Enum.UserInputType.MouseButton1) then
		burst = 1;
	end;
end);

-- main animation loop
runService.RenderStepped:Connect(function(deltaTime:number)
	local time:number = os.clock();

	burst = math.max(burst - deltaTime * clickBurstDecay, 0);

	updateCenter(); updateCore(time);

	for index, fragment in ipairs(fragments) do
		updateFragment(fragment, index, time);
	end;
end);

-- debug
warn(\`Interactive Gravity Field Generated With {fragmentCount} Fragments\`);`},{code:"ASSET-005",slug:"project-npc-controller",title:"NPC Path Controller",fileName:"NPCController.luau",description:"A strict ModuleScript controller for NPC patrol, chase, stuck recovery, and pathfinding state management.",language:"Luau",scriptType:"module",scriptLabel:"ModuleScript",commentTag:"Without comments",license:"MIT",image:A,theme:"theme-blue",delay:"0.32s",setupTree:R.npcController,setup:`1. Create a ModuleScript in ReplicatedStorage.
2. Name it "NPCController".
3. Paste this module code inside it.
4. Require it from server-side NPC scripts and register NPC models with Controller:Add(model, options).`,luau:`--!strict
local PFS:PathfindingService = game:GetService('PathfindingService');
local RS:RunService = game:GetService('RunService');

local Controller = {};
Controller.__index = Controller;

export type NPCState = ('idle' | 'patrol' | 'chase' | 'stuck' | 'dead');

export type NPCEntry = {
	Model:Model;
	Root:BasePart;
	Humanoid:Humanoid;
	Waypoints:{Vector3};
	WaypointIndex:number;
	State:NPCState;
	Target:BasePart?;
	Path:Path?;
	PathIndex:number;
	LastPosition:Vector3;
	LastMoveTime:number;
	StuckThreshold:number;
	ChaseRange:number;
	PatrolRange:number;
	Speed:number
};

export type ControllerOptions = {
	Waypoints:{Vector3}?;
	ChaseRange:number?;
	PatrolRange:number?;
	StuckThreshold:number?;
	Speed:number?
};

export type NPCController = {
	Add:(self:NPCController, x:Model, z:ControllerOptions?)->();
	Remove:(self:NPCController, x:Model)->();
	SetTarget:(self:NPCController, x:Model, z:BasePart?)->();
	SetState:(self:NPCController, x:Model, z:NPCState)->();
	GetState:(self:NPCController, x:Model)->NPCState?;
	GetAll:(self:NPCController)->{NPCEntry};
	Destroy:(self:NPCController)->()
};

type ControllerInternal = NPCController & {
	_npcs:{[Model]:NPCEntry};
	_connection:RBXScriptConnection?;
	_destroyed:boolean;
	_assertAlive:(self:ControllerInternal)->()
};

local function _x1(x:Model):(BasePart?, Humanoid?)
	local z:BasePart? = x:FindFirstChild('HumanoidRootPart')::BasePart?;
	local y:Humanoid? = x:FindFirstChildOfClass('Humanoid')::Humanoid?;
	return z, y;
end;

local function _x2(x:Vector3, z:Vector3):number
	return(Vector3.new(x.X, 0, x.Z) - Vector3.new(z.X, 0, z.Z)).Magnitude;
end;

local function _x3(x:NPCEntry):boolean
	return(x.Humanoid.Health > 0 and x.Root.Parent ~= nil and x.Model.Parent ~= nil);
end;

local function _x4(x:NPCEntry, z:Vector3):()
	local y:AgentParameters = {
		AgentRadius = 2.5; AgentHeight = 5;
		AgentCanJump = true; AgentCanClimb = true;
		WaypointSpacing = 3;
	}; local v:Path = PFS:CreatePath(y);

	local c:boolean, b:string = pcall(function():()
		v:ComputeAsync(x.Root.Position, z);
	end);

	if (not c) then x.State = 'stuck'; return; end;

	if (v.Status ~= Enum.PathStatus.Success) then
		x.State = 'stuck'; return;
	end;

	x.Path = v; x.PathIndex = 1;
	x.State = (x.Target ~= nil and 'chase' or 'patrol');
end;

local function _x5(x:NPCEntry):()
	local z:Path? = x.Path;
	if (z == nil) then return; end;

	local y:{PathWaypoint} = z:GetWaypoints();
	local v:number = x.PathIndex;

	if (v > #y) then
		x.Path = nil; x.PathIndex = 1;
		x.State = 'idle'; return;
	end;

	local c:PathWaypoint = y[v];

	if (c.Action == Enum.PathWaypointAction.Jump) then
		x.Humanoid.Jump = true;
	end;

	x.Humanoid:MoveTo(c.Position);
	x.PathIndex = (v + 1);
end;

local function _x6(x:NPCEntry):()
    local y:{Vector3} = x.Waypoints;
    
    if (#y == 0) then
		x.State = 'idle'; return;
	end;
    
	local z:number = x.WaypointIndex;
    local v:Vector3 = y[z];
	local c:number = _x2(x.Root.Position, v);

	if (c < 4) then
		local b:number = (z % #y) + 1;
		x.WaypointIndex = b;
		v = y[b];
	end;

	_x4(x, v);
end;

local function _x7(x:NPCEntry, z:number):()
	local y:Vector3 = x.Root.Position;
	local v:number = _x2(y, x.LastPosition);

	if (v < 1.2) then
		local c:number = z - x.LastMoveTime;
		if (c >= x.StuckThreshold) then
			x.State = 'stuck'; return;
		end;
	else x.LastPosition = y; x.LastMoveTime = z;
	end;
end;

local function _x8(x:NPCEntry):()
    local z:BasePart? = x.Target;
    
	if (z == nil or z.Parent == nil) then
		x.Target = nil; x.State = 'idle';
		return;
    end; local y:number = _x2(x.Root.Position, z.Position);
    
	if (y > x.ChaseRange * 1.4) then
		x.Target = nil; x.State = 'idle';
		return;
	end;

	_x4(x, z.Position);
end;

local function _x9(x:NPCEntry):()
	local z:number = x.WaypointIndex;
	local y:{Vector3} = x.Waypoints;
	if (#y == 0) then return; end;
    local v:number = (z % #y) + 1;
    
	x.WaypointIndex = v;
	_x4(x, y[v]);
	x.State = 'patrol';
end;

local function _x10(x:NPCEntry, z:number):()
	if (not _x3(x)) then
		x.State = 'dead'; return;
	end; _x7(x, z);

	local y:NPCState = x.State;
	if (y == 'dead') then return; end;

	if (y == 'idle') then
		if (#x.Waypoints > 0) then _x6(x);
		end; return;
	end;

	if (y == 'patrol') then
		if (x.Path ~= nil) then _x5(x);
		else _x6(x); end; return;
	end;

	if (y == 'chase') then
		if (x.Path ~= nil) then _x5(x);
		end; _x8(x); return;
	end;

	if (y == 'stuck') then _x9(x); return; end;
end;

function Controller:_assertAlive():()
	assert(not self._destroyed, 'NPCController Was Destroyed And Can No Longer Be Used');
end;

function Controller.new():NPCController
	local self:ControllerInternal;

	self = setmetatable({
		_npcs = {};
		_connection = nil;
		_destroyed = false;
	}, Controller) :: any;

	self._connection = RS.Heartbeat:Connect(function():()
		local z:number = os.clock();
		local y:{[Model]:NPCEntry} = self._npcs;

		for _, v:NPCEntry in pairs(y) do
			_x10(v, z);
		end;
	end);

	return self;
end;

function Controller:Add(x:Model, z:ControllerOptions?):()
	self:_assertAlive();
	local y:BasePart?, v:Humanoid? = _x1(x);

	assert(y ~= nil, 'NPCController Add: Model Missing HumanoidRootPart');
	assert(v ~= nil, 'NPCController Add: Model Missing Humanoid');

	local c:number = 3; local b:number = 24;
	local n:number = 40; local m:number = 4;
	local a:{Vector3} = {}; local q:number = 16;

	if (z ~= nil) then
		assert(type(z) == 'table', 'NPCController Add: Options Must Be A Table Or Nil');

		if (z.StuckThreshold ~= nil) then
			assert(type(z.StuckThreshold) == 'number', 'NPCController Add: StuckThreshold Must Be A Number');
			c = z.StuckThreshold;
		end;

		if (z.ChaseRange ~= nil) then
			assert(type(z.ChaseRange) == 'number', 'NPCController Add: ChaseRange Must Be A Number');
			b = z.ChaseRange;
		end;

		if (z.PatrolRange ~= nil) then
			assert(type(z.PatrolRange) == 'number', 'NPCController Add: PatrolRange Must Be A Number');
			n = z.PatrolRange;
		end;

		if (z.Speed ~= nil) then
			assert(type(z.Speed) == 'number', 'NPCController Add: Speed Must Be A Number');
			m = z.Speed;
		end;

		if (z.Waypoints ~= nil) then
			assert(type(z.Waypoints) == 'table', 'NPCController Add: Waypoints Must Be A Table');
			a = z.Waypoints;
		end;
	end;

	v.WalkSpeed = m;

	local k:NPCEntry = {
		Model = x; Root = y::BasePart; Humanoid = v::Humanoid;
		Waypoints = a; WaypointIndex = 1; State = 'idle';
		Target = nil; Path = nil; PathIndex = 1;
		LastPosition = y.Position::Vector3;
		LastMoveTime = os.clock();
		StuckThreshold = c; ChaseRange = b;
		PatrolRange = n; Speed = m
	};

	self._npcs[x] = k;
end;

function Controller:Remove(x:Model):()
	self:_assertAlive();
	assert(type(x) == 'userdata', 'NPCController Remove: Expected A Model');

	local z:NPCEntry? = self._npcs[x];
	if (z == nil) then return; end;

	if (z.Humanoid and z.Humanoid.Parent ~= nil) then
		z.Humanoid:MoveTo(z.Root.Position);
	end;

	self._npcs[x] = nil;
end;

function Controller:SetTarget(x:Model, z:BasePart?):()
	self:_assertAlive();

	local y:NPCEntry? = self._npcs[x];
	assert(y ~= nil, 'NPCController SetTarget: Model Not Registered');

	if (z ~= nil) then
		assert(typeof(z) == 'Instance', 'NPCController SetTarget: Target Must Be A BasePart Or Nil');
	end;

	y.Target = z;

	if (z ~= nil) then y.State = 'chase'; _x4(y, z.Position);
	else y.State = 'idle'; y.Path = nil; end;
end;

function Controller:SetState(x:Model, z:NPCState):()
	self:_assertAlive();
    local y:NPCEntry? = self._npcs[x];
    
	assert(y ~= nil, 'NPCController SetState: Model Not Registered');
	assert(z == 'idle' or z == 'patrol' or z == 'chase' or z == 'stuck' or z == 'dead', 'NPCController SetState: Invalid State');
	y.State = z;
end;

function Controller:GetState(x:Model):NPCState?
	self:_assertAlive();
    local z:NPCEntry? = self._npcs[x];
	if (z == nil) then return nil; end;

	return z.State;
end;

function Controller:GetAll():{NPCEntry}
	self:_assertAlive();

	local z:{NPCEntry} = {};
	local y:number = 1;

	for _, v:NPCEntry in pairs(self._npcs) do
		z[y] = v; y += 1;
	end;

	return z;
end;

function Controller:Destroy():()
	if (self._destroyed) then return; end;

	self._destroyed = true;

	if (self._connection ~= nil) then
		self._connection:Disconnect();
		self._connection = nil;
	end;

	self._npcs = {};
end;

return table.freeze(Controller);`}],se={"--bar-size":"2.5vw","--dot-size":"1.5px","--dot-gap":"14px","--dot-opacity":"0.42","--dot-color":"255, 255, 255","--line-end-mask":"12vh","--line-x-overflow":"8vw","--line-y-overflow-top":"14vh","--cross-left":"17.5%","--cross-top":"17.5%","--cross-span":"65%"},ce={server:0,local:1,module:2},ue=w(()=>[...ze].sort((o,t)=>{const n=ce[o.scriptType]-ce[t.scriptType];return n!==0?n:o.title.localeCompare(t.title)})),X=window.matchMedia("(prefers-color-scheme: dark)"),Te=()=>H.value==="system"?X.matches?"dark":"light":H.value,J=()=>{document.documentElement.setAttribute("data-theme",Te())},de=()=>{H.value==="system"&&J()};function D(){N.value=!0,M.value===null&&(M.value=document.documentElement.style.overflow||"",document.documentElement.style.overflow="hidden"),V.value=!0,W.value=!1,Ue(()=>{ie.value?.focus()})}function I(){N.value=!1,M.value!==null&&(document.documentElement.style.overflow=M.value,M.value=null),f.value=""}const Re=()=>{V.value=!V.value},Be=()=>{W.value=!W.value},pe=(o,t)=>{if(I(),x.value=!1,t.startsWith("#")){window.location.hash=t.startsWith("#")?t:`#${o}`;return}ke.push(t).catch(()=>{})},Ee=()=>{const o=G.value[0];if(o){pe(o.slug,o.href);return}const t=$.value[0];t&&me(t.slug)},me=o=>{I(),x.value=!1,window.history.replaceState(null,"",`#${o}`),he(o)},he=o=>{window.requestAnimationFrame(()=>{document.getElementById(o)?.scrollIntoView({behavior:"smooth",block:"center"})})},B=o=>U.value[o]??"preview",fe=(o,t)=>{U.value={...U.value,[o]:t}},v=o=>Q.value[o]??"code",ve=(o,t)=>{Q.value={...Q.value,[o]:t}},Le=o=>v(o.slug)==="setup"?o.setup:o.luau,ye=(o,t)=>`${o}:${t}`,_=(o,t)=>j.value[ye(o,t)]??!0,ee=(o,t)=>{const n=ye(o,t);j.value={...j.value,[n]:!(j.value[n]??!0)}},Oe=o=>{const t=window.matchMedia("(max-width: 760px)").matches?Math.round(window.innerHeight*.54):430;return Math.min(o.scrollHeight,t)},Fe=o=>{const t=o;t.style.height="0px",t.style.opacity="0",t.style.transform="translateY(10px)",t.style.overflow="hidden"},Ve=(o,t)=>{const n=o;window.requestAnimationFrame(()=>{n.style.transition="height 360ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 220ms ease, transform 300ms cubic-bezier(0.22, 0.8, 0.36, 1)",n.style.height=`${Oe(n)}px`,n.style.opacity="1",n.style.transform="translateY(0)"}),window.setTimeout(t,380)},We=o=>{const t=o;t.style.height=`${t.getBoundingClientRect().height}px`,t.style.opacity="1",t.style.transform="translateY(0)",t.style.overflow="hidden"},He=(o,t)=>{const n=o;window.requestAnimationFrame(()=>{n.style.transition="height 280ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 180ms ease, transform 240ms cubic-bezier(0.22, 0.8, 0.36, 1)",n.style.height="0px",n.style.opacity="0",n.style.transform="translateY(-8px)"}),window.setTimeout(t,300)},be=o=>{const t=o;t.style.height="",t.style.opacity="",t.style.transform="",t.style.overflow="",t.style.transition=""},je=async o=>{try{await navigator.clipboard.writeText(Le(o)),z.value=o.code,window.setTimeout(()=>{z.value===o.code&&(z.value=null)},1400)}catch{z.value=null}},G=w(()=>{const o=f.value.trim().toLowerCase();return!o||o===".all"?Z.filter(n=>!n.searchOnly):(o.replace(/[^a-z0-9]/g,""),["page","pages","site","navigation","nav"].some(n=>o&&(o.includes(n)||n.includes(o)))?Z.filter(n=>!n.searchOnly):Z.filter(n=>et(o,[n.label,n.slug,n.href,n.keywords])))}),$=w(()=>{const o=f.value.trim().toLowerCase(),t=ue.value;if(!o||o===".all")return t;const n=o.replace(/[^a-z0-9]/g,"");return["project","projects","open source","opensource","asset","assets","code"].some(d=>o&&(o.includes(d)||d.includes(o)))?t:t.filter(d=>[d.title,d.fileName,d.description,d.language,d.scriptLabel,d.commentTag,d.license].map(K=>K.toLowerCase()).some(K=>K.includes(o)||K.replace(/[^a-z0-9]/g,"").includes(n)))}),ge=w(()=>{const o=Y.value.trim().toLowerCase(),t=o.replace(/[^a-z0-9]/g,"");return ue.value.filter(n=>T.value==="all"||n.scriptType===T.value?o?[n.title,n.fileName,n.description,n.language,n.scriptLabel,n.commentTag,n.license].map(E=>E.toLowerCase()).some(E=>E.includes(o)||E.replace(/[^a-z0-9]/g,"").includes(t)):!0:!1)}),te=w(()=>V.value||f.value.trim()&&G.value.length>0),ne=w(()=>W.value||f.value.trim()&&$.value.length>0),Ce=o=>{if(o.key==="/"&&!o.metaKey&&!o.ctrlKey&&!o.altKey){const t=document.activeElement;if(t&&["INPUT","TEXTAREA"].includes(t.tagName))return;o.preventDefault(),D()}o.key==="Escape"&&N.value&&(o.preventDefault(),I())};return Ge(()=>{L.value=document.documentElement.style.overflowY||"",O.value=document.body.style.overflowY||"",F.value=document.body.style.background||"",document.documentElement.style.overflowY="auto",document.body.style.overflowY="auto",document.body.style.background="#000",J(),X.addEventListener("change",de),window.addEventListener("keydown",Ce),window.requestAnimationFrame(()=>{le.value=!0}),window.location.hash.startsWith("#project-")&&window.setTimeout(()=>{he(window.location.hash.slice(1))},280)}),$e(H,o=>{typeof window<"u"&&localStorage.setItem(_e,o),J()}),Ke(()=>{X.removeEventListener("change",de),window.removeEventListener("keydown",Ce),N.value&&I(),L.value!==null&&(document.documentElement.style.overflowY=L.value,L.value=null),O.value!==null&&(document.body.style.overflowY=O.value,O.value=null),F.value!==null&&(document.body.style.background=F.value,F.value=null)}),(o,t)=>(r(),l(g,null,[e("div",{id:"topbarMain","data-ready":le.value},[m(i(y),{class:"topbar-logo-link",to:"/","aria-label":"Home","data-cursor-hover":""},{default:p(()=>[...t[6]||(t[6]=[e("img",{class:"topbar-logo",src:A,alt:"Christopher Böhme"},null,-1)])]),_:1}),e("label",{class:"top-search","aria-label":"Search",onClick:b(D,["stop"])},[t[7]||(t[7]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("circle",{cx:"11",cy:"11",r:"6.5",stroke:"currentColor","stroke-width":"2",fill:"none"}),e("path",{d:"M16.5 16.5 L21 21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),e("input",{ref_key:"searchInput",ref:Ae,type:"search",placeholder:"Search",readonly:"",onFocus:b(D,["prevent"]),onMousedown:b(D,["prevent"])},null,544),t[8]||(t[8]=e("span",{class:"kbd-hint"},[e("span",{class:"kbd"},"/")],-1))]),e("button",{id:"hamburger",type:"button","aria-label":"Menu","aria-expanded":x.value,class:a({"is-open":x.value}),onClick:t[0]||(t[0]=b((...n)=>i(ae)&&i(ae)(...n),["stop"]))},[...t[9]||(t[9]=[e("span",{id:"bar1"},null,-1),e("span",{id:"bar2"},null,-1),e("span",{id:"bar3"},null,-1)])],10,nt),e("div",{id:"topbarMenu","data-open":x.value,onPointermove:t[1]||(t[1]=(...n)=>i(P)&&i(P)(...n)),onFocusin:t[2]||(t[2]=(...n)=>i(P)&&i(P)(...n)),onKeydown:t[3]||(t[3]=(...n)=>i(P)&&i(P)(...n))},[m(i(y),{to:"/about",role:"menuitem",onClick:i(S)},{default:p(()=>[...t[10]||(t[10]=[h("About me",-1)])]),_:1},8,["onClick"]),m(i(y),{to:"/Team",role:"menuitem",onClick:i(S)},{default:p(()=>[...t[11]||(t[11]=[h("Works",-1)])]),_:1},8,["onClick"]),m(i(y),{to:"/opensource",role:"menuitem",onClick:i(S)},{default:p(()=>[...t[12]||(t[12]=[h("Open Source",-1)])]),_:1},8,["onClick"]),m(i(y),{to:"/reviews/",role:"menuitem",onClick:i(S)},{default:p(()=>[...t[13]||(t[13]=[h("Reviews",-1)])]),_:1},8,["onClick"]),m(i(y),{to:"/links",role:"menuitem",onClick:i(S)},{default:p(()=>[...t[14]||(t[14]=[h("Links",-1)])]),_:1},8,["onClick"]),m(i(y),{to:"/credits/",role:"menuitem",onClick:i(S)},{default:p(()=>[...t[15]||(t[15]=[h("Credits",-1)])]),_:1},8,["onClick"])],40,ot)],8,tt),e("main",rt,[e("div",{id:"mainhero",style:se},[t[16]||(t[16]=qe('<section class="opensource-hero" aria-labelledby="opensourceTitle" data-v-51df2669><h1 id="opensourceTitle" data-v-51df2669><span class="orbitron-title" data-v-51df2669>Open Source</span><span class="allura-title" data-v-51df2669>Items</span></h1><p data-v-51df2669>Made all by chris</p></section><div id="linesY" data-v-51df2669><div data-v-51df2669></div><div data-v-51df2669></div></div><div id="linesX" data-v-51df2669><div data-v-51df2669></div><div data-v-51df2669></div></div>',3)),(r(),l(g,null,k(Ne,n=>e("div",{key:n,class:a(["crossover-dots",n]),"aria-hidden":"true"},null,2)),64))]),e("section",{class:"opensource-assets-section",style:se,"aria-label":"Open source asset samples"},[t[27]||(t[27]=e("div",{class:"section-linesY","aria-hidden":"true"},[e("div"),e("div")],-1)),e("div",lt,[e("div",at,[e("label",it,[t[17]||(t[17]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("circle",{cx:"11",cy:"11",r:"6.5",stroke:"currentColor","stroke-width":"2",fill:"none"}),e("path",{d:"M16.5 16.5 L21 21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),xe(e("input",{"onUpdate:modelValue":t[4]||(t[4]=n=>Y.value=n),type:"search",placeholder:"Search projects",autocomplete:"off"},null,512),[[Se,Y.value]])]),e("div",st,[(r(),l(g,null,k(Me,n=>e("button",{key:n.value,type:"button",class:a(["project-filter-tab",[`project-filter-tab--${n.tone}`,{active:T.value===n.value}]]),"aria-selected":T.value===n.value,role:"tab",onClick:s=>T.value=n.value},u(n.label),11,ct)),64))])]),(r(!0),l(g,null,k(ge.value,n=>(r(),l("article",{key:n.code,id:n.slug,class:a(["asset-sample",[`asset-kind-${n.scriptType}`,`mobile-view-${B(n.slug)}`]])},[e("div",{class:"asset-mobile-tabs",role:"tablist","aria-label":`${n.title} mobile view`},[e("button",{type:"button",class:a({active:B(n.slug)==="preview"}),"aria-selected":B(n.slug)==="preview",role:"tab",onClick:s=>fe(n.slug,"preview")}," Thumbnail ",10,pt),e("button",{type:"button",class:a({active:B(n.slug)==="code"}),"aria-selected":B(n.slug)==="code",role:"tab",onClick:s=>fe(n.slug,"code")}," Code ",10,mt)],8,dt),e("div",ht,[e("div",{class:a(["asset-picture",n.theme])},[e("img",{src:n.image,alt:`${n.title} preview`},null,8,ft)],2),e("div",vt,[e("h2",null,u(n.title),1),e("p",null,u(n.description),1),e("div",yt,[e("span",null,u(n.language),1),e("span",null,u(n.scriptLabel),1),e("span",null,u(n.commentTag),1),e("span",null,u(n.license),1)])])]),e("div",{class:"asset-terminal",style:re({"--terminal-delay":n.delay})},[e("div",bt,[e("div",gt,[t[18]||(t[18]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("path",{d:"M6 2h8l4 4v16H6V2Z",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linejoin":"round"}),e("path",{d:"M14 2v5h4",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linejoin":"round"})],-1)),e("span",Ct,u(n.fileName),1)]),e("div",{class:"terminal-switch",role:"tablist","aria-label":`${n.title} terminal content`},[e("button",{type:"button",class:a({active:v(n.slug)==="code"}),"aria-selected":v(n.slug)==="code",role:"tab",onClick:s=>ve(n.slug,"code")}," Code ",10,St),e("button",{type:"button",class:a({active:v(n.slug)==="setup"}),"aria-selected":v(n.slug)==="setup",role:"tab",onClick:s=>ve(n.slug,"setup")}," Setup ",10,Pt)],8,xt),e("button",{class:"copy-code",type:"button","aria-label":`Copy ${n.title} Luau code`,onClick:s=>je(n)},[z.value===n.code?(r(),l("svg",_t,[...t[19]||(t[19]=[e("path",{d:"M20 6 9 17l-5-5",fill:"none",stroke:"currentColor","stroke-width":"2.4","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):(r(),l("svg",kt,[...t[20]||(t[20]=[e("rect",{x:"8",y:"8",width:"11",height:"11",rx:"2",fill:"none",stroke:"currentColor","stroke-width":"1.9"},null,-1),e("path",{d:"M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1",fill:"none",stroke:"currentColor","stroke-width":"1.9","stroke-linecap":"round"},null,-1)])]))],8,It)]),e("div",{class:a(["terminal-body",`terminal-body--${v(n.slug)}`])},[m(q,{name:"terminal-swap",mode:"out-in",onBeforeEnter:Fe,onEnter:Ve,onAfterEnter:be,onBeforeLeave:We,onLeave:He,onAfterLeave:be},{default:p(()=>[v(n.slug)==="code"?(r(),l("pre",{key:`${n.slug}-code`},[e("code",null,u(n.luau),1)])):(r(),l("div",{key:`${n.slug}-setup`,class:"setup-tree"},[e("div",{class:a(["setup-tree__details setup-tree__details--game",{open:_(n.slug,"game")}])},[e("button",{type:"button",class:"setup-tree__summary",onClick:s=>ee(n.slug,"game")},[...t[21]||(t[21]=[e("span",{class:"setup-tree__chevron","aria-hidden":"true"},null,-1),e("span",{class:"setup-tree__icon setup-tree__icon--game","aria-hidden":"true"},null,-1),e("span",{class:"setup-tree__label setup-tree__label--game"},"Game",-1)])],8,wt),e("div",{class:a(["setup-tree__children",{open:_(n.slug,"game")}])},[e("div",{class:a(["setup-tree__details setup-tree__details--service",{open:_(n.slug,"service")}])},[e("button",{type:"button",class:"setup-tree__summary",onClick:s=>ee(n.slug,"service")},[t[22]||(t[22]=e("span",{class:"setup-tree__chevron","aria-hidden":"true"},null,-1)),e("span",{class:a(["setup-tree__icon",`setup-tree__icon--${n.setupTree.serviceKind}`]),"aria-hidden":"true"},null,2),e("span",{class:a(["setup-tree__label",`setup-tree__label--${n.setupTree.serviceKind}`])},u(n.setupTree.service),3)],8,At),e("div",{class:a(["setup-tree__children",{open:_(n.slug,"service")}])},[(r(!0),l(g,null,k(n.setupTree.folders,s=>(r(),l("div",{key:s.label,class:a(["setup-tree__details setup-tree__details--folder",{open:_(n.slug,s.label)}])},[e("button",{type:"button",class:"setup-tree__summary",onClick:d=>ee(n.slug,s.label)},[t[23]||(t[23]=e("span",{class:"setup-tree__chevron","aria-hidden":"true"},null,-1)),t[24]||(t[24]=e("span",{class:"setup-tree__icon setup-tree__icon--folder","aria-hidden":"true"},null,-1)),e("span",Mt,u(s.label),1)],8,Nt),e("div",{class:a(["setup-tree__children",{open:_(n.slug,s.label)}])},[e("div",zt,[t[25]||(t[25]=e("span",{class:"setup-tree__spacer","aria-hidden":"true"},null,-1)),e("span",{class:a(["setup-tree__icon",`setup-tree__icon--${n.setupTree.fileKind}`]),"aria-hidden":"true"},null,2),e("span",{class:a(["setup-tree__label",`setup-tree__label--${n.setupTree.fileKind}`])},u(n.setupTree.file),3)])],2)],2))),128)),n.setupTree.folders.length===0?(r(),l("div",Tt,[t[26]||(t[26]=e("span",{class:"setup-tree__spacer","aria-hidden":"true"},null,-1)),e("span",{class:a(["setup-tree__icon",`setup-tree__icon--${n.setupTree.fileKind}`]),"aria-hidden":"true"},null,2),e("span",{class:a(["setup-tree__label",`setup-tree__label--${n.setupTree.fileKind}`])},u(n.setupTree.file),3)])):C("",!0)],2)],2)],2)],2),e("p",Rt,u(n.setup),1)]))]),_:2},1024)],2)],4)],10,ut))),128)),ge.value.length===0?(r(),l("p",Bt,"No projects match this filter.")):C("",!0)])])]),(r(),oe(Ye,{to:"body"},[m(q,{name:"fade"},{default:p(()=>[N.value?(r(),l("div",{key:0,class:"search-modal",role:"dialog","aria-modal":"true",onClick:b(I,["self"])},[e("div",{class:"search-card blank-card",onKeydown:Pe(b(I,["prevent"]),["esc"])},[e("div",Lt,[t[28]||(t[28]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("circle",{cx:"11",cy:"11",r:"6.5",stroke:"currentColor","stroke-width":"2",fill:"none"}),e("path",{d:"M16.5 16.5 L21 21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),xe(e("input",{ref_key:"modalSearchInput",ref:ie,"onUpdate:modelValue":t[5]||(t[5]=n=>f.value=n),type:"search",placeholder:"Search","aria-label":"Search",autocomplete:"off",onKeydown:Pe(b(Ee,["prevent"]),["enter"])},null,40,Ot),[[Se,f.value]]),t[29]||(t[29]=e("span",{class:"kbd-hint modal-kbd"},[e("span",{class:"kbd"},"/")],-1))]),e("div",Ft,[G.value.length?(r(),l("div",Vt,[e("button",{class:"picker-head",type:"button","data-open":te.value,"aria-expanded":te.value,"aria-controls":"pageList",onClick:Re},[...t[30]||(t[30]=[e("svg",{class:"collapse-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M8.9 1.5 L17 12 L8.9 22.5",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1),e("span",{class:"flag header-flag","aria-hidden":"true"},[e("svg",{class:"pages-grid-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},[e("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"}),e("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"}),e("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"}),e("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"})])],-1),e("span",{class:"lang-title"},"Pages",-1)])],8,Wt),m(q,{name:"collapse"},{default:p(()=>[te.value?(r(),oe(Ie,{key:0,id:"pageList",class:"page-list",role:"listbox","aria-label":"Pages",name:"langitem",tag:"ul"},{default:p(()=>[(r(!0),l(g,null,k(G.value,(n,s)=>(r(),l("li",{key:n.slug,style:re({"--d":`${s*.03}s`})},[e("button",{type:"button",class:"page-option",role:"option",onClick:d=>pe(n.slug,n.href)},[e("span",jt,[e("span",Dt,[n.slug==="home"?(r(),l("svg",Gt,[...t[31]||(t[31]=[e("path",{d:"M3 10.5 12 3l9 7.5"},null,-1),e("path",{d:"M5.5 9V21h13V9"},null,-1)])])):n.slug==="open-source"?(r(),l("svg",$t,[...t[32]||(t[32]=[e("path",{d:"M3 7h18"},null,-1),e("path",{d:"M6 7l1-3h10l1 3"},null,-1),e("rect",{x:"5",y:"7",width:"14",height:"12",rx:"2"},null,-1),e("path",{d:"M9 11h6"},null,-1),e("path",{d:"M9 15h6"},null,-1)])])):n.slug==="developers"?(r(),l("svg",Kt,[...t[33]||(t[33]=[e("path",{d:"M4 21l4-4"},null,-1),e("path",{d:"M4 17l4 4"},null,-1),e("path",{d:"M15.5 3.5a2.12 2.12 0 0 1 3 3L11 14l-4 1 1-4 7.5-7.5Z"},null,-1)])])):n.slug==="links"?(r(),l("svg",qt,[...t[34]||(t[34]=[e("path",{d:"M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"},null,-1),e("path",{d:"M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 1 1-7-7L7 11"},null,-1)])])):n.slug==="reviews"?(r(),l("svg",Yt,[...t[35]||(t[35]=[e("path",{d:"M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"},null,-1),e("path",{d:"M8 9h.01M12 9h.01M16 9h.01"},null,-1)])])):n.slug.startsWith("social-")?(r(),l("svg",Ut,[...t[36]||(t[36]=[e("path",{d:"M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"},null,-1),e("path",{d:"M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"},null,-1)])])):(r(),l("svg",Qt,[...t[37]||(t[37]=[e("path",{d:"M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"},null,-1),e("path",{d:"M14 2v5h5"},null,-1),e("path",{d:"M9 13h6"},null,-1),e("path",{d:"M9 17h6"},null,-1)])]))]),e("span",Zt,u(n.label),1)])],8,Ht)],4))),128))]),_:1})):C("",!0)]),_:1})])):C("",!0),$.value.length?(r(),l("div",Xt,[e("button",{class:"picker-head",type:"button","data-open":ne.value,"aria-expanded":ne.value,"aria-controls":"projectList",onClick:Be},[...t[38]||(t[38]=[e("svg",{class:"collapse-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M8.9 1.5 L17 12 L8.9 22.5",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1),e("span",{class:"flag header-flag","aria-hidden":"true"},[e("span",{class:"theme-emoji"},"⌘")],-1),e("span",{class:"lang-title"},"Open Source Projects",-1)])],8,Jt),m(q,{name:"collapse"},{default:p(()=>[ne.value?(r(),oe(Ie,{key:0,id:"projectList",class:"page-list",role:"listbox","aria-label":"Open Source Projects",name:"langitem",tag:"ul"},{default:p(()=>[(r(!0),l(g,null,k($.value,(n,s)=>(r(),l("li",{key:n.slug,style:re({"--d":`${s*.03}s`})},[e("button",{type:"button",class:"page-option",role:"option",onClick:d=>me(n.slug)},[e("span",tn,[t[39]||(t[39]=e("span",{class:"page-icon","aria-hidden":"true"},[e("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M8 9 4 13l4 4"}),e("path",{d:"M16 9l4 4-4 4"}),e("path",{d:"M14 5 10 19"})])],-1)),e("span",nn,u(n.title),1)])],8,en)],4))),128))]),_:1})):C("",!0)]),_:1})])):C("",!0)]),t[40]||(t[40]=e("p",{class:"search-command-hint"},[h("Fun fact: type "),e("kbd",null,".all"),h(" to show everything")],-1))],40,Et)])):C("",!0)]),_:1})])),m(Xe)],64))}}),un=Ze(on,[["__scopeId","data-v-51df2669"]]);export{un as default};

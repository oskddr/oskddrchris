import{d as He,r as s,o as je,w as De,a as $e,c as l,h as e,l as v,n as a,b as m,e as p,u as T,R,H as Ge,F as y,i as S,g as be,A as ge,p as b,q as te,T as G,s as Ke,j as P,x as qe,f as r,m as g,t as c,k as ne,z as xe,B as Ce,y as Ye,_ as Ue}from"./index-B9S7B2o_.js";import{_ as I}from"./Logo-BRVNEwZQ.js";import{S as Ze}from"./SmoothCursor-Cn24AOA8.js";import{m as Qe}from"./searchMatch-B3LZc4es.js";const Xe=["data-ready"],Je=["aria-expanded"],et=["data-open"],tt={class:"opensource-page"},nt={class:"opensource-assets"},ot={class:"project-filter-panel","aria-label":"Filter open source projects"},rt={class:"project-search","aria-label":"Search open source projects"},lt={class:"project-filter-tabs",role:"tablist","aria-label":"Project type filters"},at=["aria-selected","onClick"],it=["id"],st=["aria-label"],ct=["aria-selected","onClick"],ut=["aria-selected","onClick"],dt={class:"asset-preview"},pt=["src","alt"],mt={class:"asset-info"},ht={class:"asset-meta","aria-label":"Asset details"},ft={class:"terminal-topbar"},vt={class:"terminal-file"},yt={class:"terminal-title"},bt=["aria-label"],gt=["aria-selected","onClick"],xt=["aria-selected","onClick"],Ct=["aria-label","onClick"],St={key:0,viewBox:"0 0 24 24","aria-hidden":"true"},Pt={key:1,viewBox:"0 0 24 24","aria-hidden":"true"},It=["onClick"],_t=["onClick"],kt=["onClick"],wt={class:"setup-tree__label setup-tree__label--folder"},At={class:"setup-tree__file setup-tree__file--pop"},Nt={key:0,class:"setup-tree__file setup-tree__file--pop"},zt={class:"setup-tree__note"},Mt={key:0,class:"project-empty"},Tt=["onKeydown"],Rt={class:"search-card__input"},Bt=["onKeydown"],Et={id:"SAthing"},Lt={key:0,id:"Pages"},Ot=["data-open","aria-expanded"],Ft=["onClick"],Vt={class:"page-inner"},Wt={class:"page-icon","aria-hidden":"true"},Ht={key:0,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},jt={key:1,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Dt={key:2,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},$t={key:3,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Gt={key:4,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Kt={key:5,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},qt={key:6,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Yt={class:"page-name"},Ut={key:1,id:"Projects"},Zt=["data-open","aria-expanded"],Qt=["onClick"],Xt={class:"page-inner"},Jt={class:"page-name"},Se="zantixTheme",en=He({__name:"OpenSourcePage",setup(tn){const Pe=Ye(),Ie=()=>{if(typeof window>"u")return null;const o=localStorage.getItem(Se);return o==="system"||o==="light"||o==="dark"?o:null},oe=s(!1),d=s(!1),_e=s(null),re=s(null),_=s(!1),h=s(""),k=s(null),B=s(null),E=s(null),L=s(null),O=s(!0),F=s(!1),V=s(Ie()??"system"),w=s(null),K=s(""),A=s("all"),q=s({}),Y=s({}),W=s({}),U=[{slug:"home",label:"Home",href:"/"},{slug:"open-source",label:"Open Source",href:"/opensource"},{slug:"developers",label:"Developers",href:"/Team"},{slug:"links",label:"Links",href:"/links"},{slug:"testimonials",label:"Testimonials",href:"/testimonials"}],ke=["top-left","top-right","bottom-left","bottom-right"],we=[{value:"all",label:"All",tone:"all"},{value:"server",label:"ServerScript",tone:"server"},{value:"local",label:"LocalScript",tone:"local"},{value:"module",label:"ModuleScript",tone:"module"}],N={dna:{service:"ServerScriptService",serviceKind:"serverService",folders:[],file:"DNA.luau",fileKind:"server"},imprint:{service:"ReplicatedStorage",serviceKind:"replicated",folders:[],file:"Imprint.luau",fileKind:"module"},orbitAura:{service:"StarterPlayer",serviceKind:"starterPlayer",folders:[{label:"StarterPlayerScripts"}],file:"OrbitAura.client.luau",fileKind:"local"},gravityField:{service:"StarterPlayer",serviceKind:"starterPlayer",folders:[{label:"StarterPlayerScripts"}],file:"GravityField.client.luau",fileKind:"local"},npcController:{service:"ReplicatedStorage",serviceKind:"replicated",folders:[],file:"NPCController.luau",fileKind:"module"}},Ae=[{code:"ASSET-001",slug:"project-dna",title:"Double Helix DNA",fileName:"DNA.luau",description:"A math-driven Luau generator that uses sine, cosine, angle steps, and vector offsets to build a double helix DNA model in Roblox.",language:"Luau",scriptType:"server",scriptLabel:"Server Script",commentTag:"With comments",license:"MIT",image:I,theme:"theme-blue",delay:"0s",setupTree:N.dna,setup:`1. Create a Script in ServerScriptService.
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
warn(\`DNA (Double Helix) Generated With {totalSteps} Parts Per Strand\`);`},{code:"ASSET-002",slug:"project-imprint",title:"Imprint Module",fileName:"Imprint.luau",description:"A strict Luau workspace snapshot module that clones, validates, stores, and reloads instance imprints with typed capture/load options.",language:"Luau",scriptType:"module",scriptLabel:"ModuleScript",commentTag:"Without comments",license:"MIT",image:I,theme:"theme-blue",delay:"0.08s",setupTree:N.imprint,setup:`1. Create a ModuleScript in ReplicatedStorage or ServerScriptService.
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

return table.freeze(Imprint);`},{code:"ASSET-003",slug:"project-orbit-aura",title:"Dynamic Orbit Aura",fileName:"OrbitAura.client.luau",description:"A LocalScript that creates neon orbs around the player and animates position, color, size, and light with RenderStepped.",language:"Luau",scriptType:"local",scriptLabel:"LocalScript",commentTag:"With comments",license:"MIT",image:I,theme:"theme-blue",delay:"0.16s",setupTree:N.orbitAura,setup:`1. Create a LocalScript in StarterPlayerScripts.
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
warn(\`Dynamic Orbit Aura Generated With {orbCount} Orbs\`);`},{code:"ASSET-004",slug:"project-gravity-field",title:"Interactive Gravity Field",fileName:"GravityField.client.luau",description:"A LocalScript showcase that creates a mouse-reactive neon gravity field with orbiting fragments and click burst motion.",language:"Luau",scriptType:"local",scriptLabel:"LocalScript",commentTag:"With comments",license:"MIT",image:I,theme:"theme-blue",delay:"0.24s",setupTree:N.gravityField,setup:`1. Create a LocalScript in StarterPlayerScripts.
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
warn(\`Interactive Gravity Field Generated With {fragmentCount} Fragments\`);`},{code:"ASSET-005",slug:"project-npc-controller",title:"NPC Path Controller",fileName:"NPCController.luau",description:"A strict ModuleScript controller for NPC patrol, chase, stuck recovery, and pathfinding state management.",language:"Luau",scriptType:"module",scriptLabel:"ModuleScript",commentTag:"Without comments",license:"MIT",image:I,theme:"theme-blue",delay:"0.32s",setupTree:N.npcController,setup:`1. Create a ModuleScript in ReplicatedStorage.
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

return table.freeze(Controller);`}],le={"--bar-size":"2.5vw","--dot-size":"1.5px","--dot-gap":"14px","--dot-opacity":"0.42","--dot-color":"255, 255, 255","--line-end-mask":"12vh","--line-x-overflow":"8vw","--line-y-overflow-top":"14vh","--cross-left":"17.5%","--cross-top":"17.5%","--cross-span":"65%"},ae={server:0,local:1,module:2},ie=P(()=>[...Ae].sort((o,t)=>{const n=ae[o.scriptType]-ae[t.scriptType];return n!==0?n:o.title.localeCompare(t.title)})),Z=window.matchMedia("(prefers-color-scheme: dark)"),Ne=()=>V.value==="system"?Z.matches?"dark":"light":V.value,Q=()=>{document.documentElement.setAttribute("data-theme",Ne())},se=()=>{V.value==="system"&&Q()};function H(){_.value=!0,k.value===null&&(k.value=document.documentElement.style.overflow||"",document.documentElement.style.overflow="hidden"),O.value=!0,F.value=!1,qe(()=>{re.value?.focus()})}function x(){_.value=!1,k.value!==null&&(document.documentElement.style.overflow=k.value,k.value=null),h.value=""}const ze=()=>{O.value=!O.value},Me=()=>{F.value=!F.value},ce=(o,t)=>{if(x(),d.value=!1,t.startsWith("#")){window.location.hash=t.startsWith("#")?t:`#${o}`;return}Pe.push(t).catch(()=>{})},Te=()=>{const o=j.value[0];if(o){ce(o.slug,o.href);return}const t=D.value[0];t&&ue(t.slug)},ue=o=>{x(),d.value=!1,window.history.replaceState(null,"",`#${o}`),de(o)},de=o=>{window.requestAnimationFrame(()=>{document.getElementById(o)?.scrollIntoView({behavior:"smooth",block:"center"})})},z=o=>q.value[o]??"preview",pe=(o,t)=>{q.value={...q.value,[o]:t}},f=o=>Y.value[o]??"code",me=(o,t)=>{Y.value={...Y.value,[o]:t}},Re=o=>f(o.slug)==="setup"?o.setup:o.luau,he=(o,t)=>`${o}:${t}`,C=(o,t)=>W.value[he(o,t)]??!0,X=(o,t)=>{const n=he(o,t);W.value={...W.value,[n]:!(W.value[n]??!0)}},Be=o=>{const t=window.matchMedia("(max-width: 760px)").matches?Math.round(window.innerHeight*.54):430;return Math.min(o.scrollHeight,t)},Ee=o=>{const t=o;t.style.height="0px",t.style.opacity="0",t.style.transform="translateY(10px)",t.style.overflow="hidden"},Le=(o,t)=>{const n=o;window.requestAnimationFrame(()=>{n.style.transition="height 360ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 220ms ease, transform 300ms cubic-bezier(0.22, 0.8, 0.36, 1)",n.style.height=`${Be(n)}px`,n.style.opacity="1",n.style.transform="translateY(0)"}),window.setTimeout(t,380)},Oe=o=>{const t=o;t.style.height=`${t.getBoundingClientRect().height}px`,t.style.opacity="1",t.style.transform="translateY(0)",t.style.overflow="hidden"},Fe=(o,t)=>{const n=o;window.requestAnimationFrame(()=>{n.style.transition="height 280ms cubic-bezier(0.22, 0.8, 0.36, 1), opacity 180ms ease, transform 240ms cubic-bezier(0.22, 0.8, 0.36, 1)",n.style.height="0px",n.style.opacity="0",n.style.transform="translateY(-8px)"}),window.setTimeout(t,300)},fe=o=>{const t=o;t.style.height="",t.style.opacity="",t.style.transform="",t.style.overflow="",t.style.transition=""},Ve=async o=>{try{await navigator.clipboard.writeText(Re(o)),w.value=o.code,window.setTimeout(()=>{w.value===o.code&&(w.value=null)},1400)}catch{w.value=null}},j=P(()=>{const o=h.value.trim().toLowerCase();return!o||o===".all"?U.filter(n=>!n.searchOnly):(o.replace(/[^a-z0-9]/g,""),["page","pages","site","navigation","nav"].some(n=>o&&(o.includes(n)||n.includes(o)))?U.filter(n=>!n.searchOnly):U.filter(n=>Qe(o,[n.label,n.slug,n.href,n.keywords])))}),D=P(()=>{const o=h.value.trim().toLowerCase(),t=ie.value;if(!o||o===".all")return t;const n=o.replace(/[^a-z0-9]/g,"");return["project","projects","open source","opensource","asset","assets","code"].some(u=>o&&(o.includes(u)||u.includes(o)))?t:t.filter(u=>[u.title,u.fileName,u.description,u.language,u.scriptLabel,u.commentTag,u.license].map($=>$.toLowerCase()).some($=>$.includes(o)||$.replace(/[^a-z0-9]/g,"").includes(n)))}),ve=P(()=>{const o=K.value.trim().toLowerCase(),t=o.replace(/[^a-z0-9]/g,"");return ie.value.filter(n=>A.value==="all"||n.scriptType===A.value?o?[n.title,n.fileName,n.description,n.language,n.scriptLabel,n.commentTag,n.license].map(M=>M.toLowerCase()).some(M=>M.includes(o)||M.replace(/[^a-z0-9]/g,"").includes(t)):!0:!1)}),J=P(()=>O.value||h.value.trim()&&j.value.length>0),ee=P(()=>F.value||h.value.trim()&&D.value.length>0),We=()=>{d.value=!d.value},ye=o=>{if(o.key==="/"&&!o.metaKey&&!o.ctrlKey&&!o.altKey){const t=document.activeElement;if(t&&["INPUT","TEXTAREA"].includes(t.tagName))return;o.preventDefault(),H()}o.key==="Escape"&&_.value&&(o.preventDefault(),x())};return je(()=>{B.value=document.documentElement.style.overflowY||"",E.value=document.body.style.overflowY||"",L.value=document.body.style.background||"",document.documentElement.style.overflowY="auto",document.body.style.overflowY="auto",document.body.style.background="#000",Q(),Z.addEventListener("change",se),window.addEventListener("keydown",ye),window.requestAnimationFrame(()=>{oe.value=!0}),window.location.hash.startsWith("#project-")&&window.setTimeout(()=>{de(window.location.hash.slice(1))},280)}),De(V,o=>{typeof window<"u"&&localStorage.setItem(Se,o),Q()}),$e(()=>{Z.removeEventListener("change",se),window.removeEventListener("keydown",ye),_.value&&x(),B.value!==null&&(document.documentElement.style.overflowY=B.value,B.value=null),E.value!==null&&(document.body.style.overflowY=E.value,E.value=null),L.value!==null&&(document.body.style.background=L.value,L.value=null)}),(o,t)=>(r(),l(y,null,[e("div",{id:"topbarMain","data-ready":oe.value},[t[16]||(t[16]=e("img",{class:"topbar-logo",src:I,alt:"Zantix"},null,-1)),e("label",{class:"top-search","aria-label":"Search",onClick:v(H,["stop"])},[t[8]||(t[8]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("circle",{cx:"11",cy:"11",r:"6.5",stroke:"currentColor","stroke-width":"2",fill:"none"}),e("path",{d:"M16.5 16.5 L21 21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),e("input",{ref_key:"searchInput",ref:_e,type:"search",placeholder:"Search",readonly:"",onFocus:v(H,["prevent"]),onMousedown:v(H,["prevent"])},null,544),t[9]||(t[9]=e("span",{class:"kbd-hint"},[e("span",{class:"kbd"},"/")],-1))]),e("button",{id:"hamburger",type:"button","aria-label":"Menu","aria-expanded":d.value,class:a({"is-open":d.value}),onClick:v(We,["stop"])},[...t[10]||(t[10]=[e("span",{id:"bar1"},null,-1),e("span",{id:"bar2"},null,-1),e("span",{id:"bar3"},null,-1)])],10,Je),e("div",{id:"topbarMenu","data-open":d.value},[m(T(R),{to:"/",role:"menuitem",onClick:t[0]||(t[0]=n=>d.value=!1)},{default:p(()=>[...t[11]||(t[11]=[g("About Zantix",-1)])]),_:1}),m(T(R),{to:"/opensource",role:"menuitem",onClick:t[1]||(t[1]=n=>d.value=!1)},{default:p(()=>[...t[12]||(t[12]=[g("Open Source",-1)])]),_:1}),m(T(R),{to:"/Team",role:"menuitem",onClick:t[2]||(t[2]=n=>d.value=!1)},{default:p(()=>[...t[13]||(t[13]=[g("Zantix Team",-1)])]),_:1}),m(T(R),{to:"/links",role:"menuitem",onClick:t[3]||(t[3]=n=>d.value=!1)},{default:p(()=>[...t[14]||(t[14]=[g("Links",-1)])]),_:1}),m(T(R),{to:"/testimonials",role:"menuitem",onClick:t[4]||(t[4]=n=>d.value=!1)},{default:p(()=>[...t[15]||(t[15]=[g("Testimonials",-1)])]),_:1}),e("a",{href:"#",role:"menuitem",onClick:t[5]||(t[5]=n=>d.value=!1)},"Zantix TOS")],8,et)],8,Xe),e("main",tt,[e("div",{id:"mainhero",style:le},[t[17]||(t[17]=Ge('<section class="opensource-hero" aria-labelledby="opensourceTitle" data-v-c4c5ffe3><h1 id="opensourceTitle" data-v-c4c5ffe3><span class="orbitron-title" data-v-c4c5ffe3>Open Source</span><span class="allura-title" data-v-c4c5ffe3>Items</span></h1><p data-v-c4c5ffe3>Made all by chris</p></section><div id="linesY" data-v-c4c5ffe3><div data-v-c4c5ffe3></div><div data-v-c4c5ffe3></div></div><div id="linesX" data-v-c4c5ffe3><div data-v-c4c5ffe3></div><div data-v-c4c5ffe3></div></div>',3)),(r(),l(y,null,S(ke,n=>e("div",{key:n,class:a(["crossover-dots",n]),"aria-hidden":"true"},null,2)),64))]),e("section",{class:"opensource-assets-section",style:le,"aria-label":"Open source asset samples"},[t[28]||(t[28]=e("div",{class:"section-linesY","aria-hidden":"true"},[e("div"),e("div")],-1)),e("div",nt,[e("div",ot,[e("label",rt,[t[18]||(t[18]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("circle",{cx:"11",cy:"11",r:"6.5",stroke:"currentColor","stroke-width":"2",fill:"none"}),e("path",{d:"M16.5 16.5 L21 21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),be(e("input",{"onUpdate:modelValue":t[6]||(t[6]=n=>K.value=n),type:"search",placeholder:"Search projects",autocomplete:"off"},null,512),[[ge,K.value]])]),e("div",lt,[(r(),l(y,null,S(we,n=>e("button",{key:n.value,type:"button",class:a(["project-filter-tab",[`project-filter-tab--${n.tone}`,{active:A.value===n.value}]]),"aria-selected":A.value===n.value,role:"tab",onClick:i=>A.value=n.value},c(n.label),11,at)),64))])]),(r(!0),l(y,null,S(ve.value,n=>(r(),l("article",{key:n.code,id:n.slug,class:a(["asset-sample",[`asset-kind-${n.scriptType}`,`mobile-view-${z(n.slug)}`]])},[e("div",{class:"asset-mobile-tabs",role:"tablist","aria-label":`${n.title} mobile view`},[e("button",{type:"button",class:a({active:z(n.slug)==="preview"}),"aria-selected":z(n.slug)==="preview",role:"tab",onClick:i=>pe(n.slug,"preview")}," Thumbnail ",10,ct),e("button",{type:"button",class:a({active:z(n.slug)==="code"}),"aria-selected":z(n.slug)==="code",role:"tab",onClick:i=>pe(n.slug,"code")}," Code ",10,ut)],8,st),e("div",dt,[e("div",{class:a(["asset-picture",n.theme])},[e("img",{src:n.image,alt:`${n.title} preview`},null,8,pt)],2),e("div",mt,[e("h2",null,c(n.title),1),e("p",null,c(n.description),1),e("div",ht,[e("span",null,c(n.language),1),e("span",null,c(n.scriptLabel),1),e("span",null,c(n.commentTag),1),e("span",null,c(n.license),1)])])]),e("div",{class:"asset-terminal",style:ne({"--terminal-delay":n.delay})},[e("div",ft,[e("div",vt,[t[19]||(t[19]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("path",{d:"M6 2h8l4 4v16H6V2Z",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linejoin":"round"}),e("path",{d:"M14 2v5h4",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linejoin":"round"})],-1)),e("span",yt,c(n.fileName),1)]),e("div",{class:"terminal-switch",role:"tablist","aria-label":`${n.title} terminal content`},[e("button",{type:"button",class:a({active:f(n.slug)==="code"}),"aria-selected":f(n.slug)==="code",role:"tab",onClick:i=>me(n.slug,"code")}," Code ",10,gt),e("button",{type:"button",class:a({active:f(n.slug)==="setup"}),"aria-selected":f(n.slug)==="setup",role:"tab",onClick:i=>me(n.slug,"setup")}," Setup ",10,xt)],8,bt),e("button",{class:"copy-code",type:"button","aria-label":`Copy ${n.title} Luau code`,onClick:i=>Ve(n)},[w.value===n.code?(r(),l("svg",St,[...t[20]||(t[20]=[e("path",{d:"M20 6 9 17l-5-5",fill:"none",stroke:"currentColor","stroke-width":"2.4","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):(r(),l("svg",Pt,[...t[21]||(t[21]=[e("rect",{x:"8",y:"8",width:"11",height:"11",rx:"2",fill:"none",stroke:"currentColor","stroke-width":"1.9"},null,-1),e("path",{d:"M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1",fill:"none",stroke:"currentColor","stroke-width":"1.9","stroke-linecap":"round"},null,-1)])]))],8,Ct)]),e("div",{class:a(["terminal-body",`terminal-body--${f(n.slug)}`])},[m(G,{name:"terminal-swap",mode:"out-in",onBeforeEnter:Ee,onEnter:Le,onAfterEnter:fe,onBeforeLeave:Oe,onLeave:Fe,onAfterLeave:fe},{default:p(()=>[f(n.slug)==="code"?(r(),l("pre",{key:`${n.slug}-code`},[e("code",null,c(n.luau),1)])):(r(),l("div",{key:`${n.slug}-setup`,class:"setup-tree"},[e("div",{class:a(["setup-tree__details setup-tree__details--game",{open:C(n.slug,"game")}])},[e("button",{type:"button",class:"setup-tree__summary",onClick:i=>X(n.slug,"game")},[...t[22]||(t[22]=[e("span",{class:"setup-tree__chevron","aria-hidden":"true"},null,-1),e("span",{class:"setup-tree__icon setup-tree__icon--game","aria-hidden":"true"},null,-1),e("span",{class:"setup-tree__label setup-tree__label--game"},"Game",-1)])],8,It),e("div",{class:a(["setup-tree__children",{open:C(n.slug,"game")}])},[e("div",{class:a(["setup-tree__details setup-tree__details--service",{open:C(n.slug,"service")}])},[e("button",{type:"button",class:"setup-tree__summary",onClick:i=>X(n.slug,"service")},[t[23]||(t[23]=e("span",{class:"setup-tree__chevron","aria-hidden":"true"},null,-1)),e("span",{class:a(["setup-tree__icon",`setup-tree__icon--${n.setupTree.serviceKind}`]),"aria-hidden":"true"},null,2),e("span",{class:a(["setup-tree__label",`setup-tree__label--${n.setupTree.serviceKind}`])},c(n.setupTree.service),3)],8,_t),e("div",{class:a(["setup-tree__children",{open:C(n.slug,"service")}])},[(r(!0),l(y,null,S(n.setupTree.folders,i=>(r(),l("div",{key:i.label,class:a(["setup-tree__details setup-tree__details--folder",{open:C(n.slug,i.label)}])},[e("button",{type:"button",class:"setup-tree__summary",onClick:u=>X(n.slug,i.label)},[t[24]||(t[24]=e("span",{class:"setup-tree__chevron","aria-hidden":"true"},null,-1)),t[25]||(t[25]=e("span",{class:"setup-tree__icon setup-tree__icon--folder","aria-hidden":"true"},null,-1)),e("span",wt,c(i.label),1)],8,kt),e("div",{class:a(["setup-tree__children",{open:C(n.slug,i.label)}])},[e("div",At,[t[26]||(t[26]=e("span",{class:"setup-tree__spacer","aria-hidden":"true"},null,-1)),e("span",{class:a(["setup-tree__icon",`setup-tree__icon--${n.setupTree.fileKind}`]),"aria-hidden":"true"},null,2),e("span",{class:a(["setup-tree__label",`setup-tree__label--${n.setupTree.fileKind}`])},c(n.setupTree.file),3)])],2)],2))),128)),n.setupTree.folders.length===0?(r(),l("div",Nt,[t[27]||(t[27]=e("span",{class:"setup-tree__spacer","aria-hidden":"true"},null,-1)),e("span",{class:a(["setup-tree__icon",`setup-tree__icon--${n.setupTree.fileKind}`]),"aria-hidden":"true"},null,2),e("span",{class:a(["setup-tree__label",`setup-tree__label--${n.setupTree.fileKind}`])},c(n.setupTree.file),3)])):b("",!0)],2)],2)],2)],2),e("p",zt,c(n.setup),1)]))]),_:2},1024)],2)],4)],10,it))),128)),ve.value.length===0?(r(),l("p",Mt,"No projects match this filter.")):b("",!0)])])]),(r(),te(Ke,{to:"body"},[m(G,{name:"fade"},{default:p(()=>[_.value?(r(),l("div",{key:0,class:"search-modal",role:"dialog","aria-modal":"true",onClick:v(x,["self"])},[e("div",{class:"search-card blank-card",onKeydown:xe(v(x,["prevent"]),["esc"])},[e("div",Rt,[t[29]||(t[29]=e("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[e("circle",{cx:"11",cy:"11",r:"6.5",stroke:"currentColor","stroke-width":"2",fill:"none"}),e("path",{d:"M16.5 16.5 L21 21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),be(e("input",{ref_key:"modalSearchInput",ref:re,"onUpdate:modelValue":t[7]||(t[7]=n=>h.value=n),type:"search",placeholder:"Search","aria-label":"Search",autocomplete:"off",onKeydown:xe(v(Te,["prevent"]),["enter"])},null,40,Bt),[[ge,h.value]]),t[30]||(t[30]=e("span",{class:"kbd-hint modal-kbd"},[e("span",{class:"kbd"},"/")],-1))]),e("div",Et,[j.value.length?(r(),l("div",Lt,[e("button",{class:"picker-head",type:"button","data-open":J.value,"aria-expanded":J.value,"aria-controls":"pageList",onClick:ze},[...t[31]||(t[31]=[e("svg",{class:"collapse-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M8.9 1.5 L17 12 L8.9 22.5",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1),e("span",{class:"flag header-flag","aria-hidden":"true"},[e("svg",{class:"pages-grid-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},[e("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"}),e("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"}),e("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"}),e("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.5",stroke:"currentColor","stroke-width":"1.8"})])],-1),e("span",{class:"lang-title"},"Pages",-1)])],8,Ot),m(G,{name:"collapse"},{default:p(()=>[J.value?(r(),te(Ce,{key:0,id:"pageList",class:"page-list",role:"listbox","aria-label":"Pages",name:"langitem",tag:"ul"},{default:p(()=>[(r(!0),l(y,null,S(j.value,(n,i)=>(r(),l("li",{key:n.slug,style:ne({"--d":`${i*.03}s`})},[e("button",{type:"button",class:"page-option",role:"option",onClick:u=>ce(n.slug,n.href)},[e("span",Vt,[e("span",Wt,[n.slug==="home"?(r(),l("svg",Ht,[...t[32]||(t[32]=[e("path",{d:"M3 10.5 12 3l9 7.5"},null,-1),e("path",{d:"M5.5 9V21h13V9"},null,-1)])])):n.slug==="open-source"?(r(),l("svg",jt,[...t[33]||(t[33]=[e("path",{d:"M3 7h18"},null,-1),e("path",{d:"M6 7l1-3h10l1 3"},null,-1),e("rect",{x:"5",y:"7",width:"14",height:"12",rx:"2"},null,-1),e("path",{d:"M9 11h6"},null,-1),e("path",{d:"M9 15h6"},null,-1)])])):n.slug==="developers"?(r(),l("svg",Dt,[...t[34]||(t[34]=[e("path",{d:"M4 21l4-4"},null,-1),e("path",{d:"M4 17l4 4"},null,-1),e("path",{d:"M15.5 3.5a2.12 2.12 0 0 1 3 3L11 14l-4 1 1-4 7.5-7.5Z"},null,-1)])])):n.slug==="links"?(r(),l("svg",$t,[...t[35]||(t[35]=[e("path",{d:"M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"},null,-1),e("path",{d:"M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 1 1-7-7L7 11"},null,-1)])])):n.slug==="testimonials"?(r(),l("svg",Gt,[...t[36]||(t[36]=[e("path",{d:"M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.25V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"},null,-1),e("path",{d:"M8 9h.01M12 9h.01M16 9h.01"},null,-1)])])):n.slug.startsWith("social-")?(r(),l("svg",Kt,[...t[37]||(t[37]=[e("path",{d:"M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13"},null,-1),e("path",{d:"M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11"},null,-1)])])):(r(),l("svg",qt,[...t[38]||(t[38]=[e("path",{d:"M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"},null,-1),e("path",{d:"M14 2v5h5"},null,-1),e("path",{d:"M9 13h6"},null,-1),e("path",{d:"M9 17h6"},null,-1)])]))]),e("span",Yt,c(n.label),1)])],8,Ft)],4))),128))]),_:1})):b("",!0)]),_:1})])):b("",!0),D.value.length?(r(),l("div",Ut,[e("button",{class:"picker-head",type:"button","data-open":ee.value,"aria-expanded":ee.value,"aria-controls":"projectList",onClick:Me},[...t[39]||(t[39]=[e("svg",{class:"collapse-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M8.9 1.5 L17 12 L8.9 22.5",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1),e("span",{class:"flag header-flag","aria-hidden":"true"},[e("span",{class:"theme-emoji"},"⌘")],-1),e("span",{class:"lang-title"},"Open Source Projects",-1)])],8,Zt),m(G,{name:"collapse"},{default:p(()=>[ee.value?(r(),te(Ce,{key:0,id:"projectList",class:"page-list",role:"listbox","aria-label":"Open Source Projects",name:"langitem",tag:"ul"},{default:p(()=>[(r(!0),l(y,null,S(D.value,(n,i)=>(r(),l("li",{key:n.slug,style:ne({"--d":`${i*.03}s`})},[e("button",{type:"button",class:"page-option",role:"option",onClick:u=>ue(n.slug)},[e("span",Xt,[t[40]||(t[40]=e("span",{class:"page-icon","aria-hidden":"true"},[e("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M8 9 4 13l4 4"}),e("path",{d:"M16 9l4 4-4 4"}),e("path",{d:"M14 5 10 19"})])],-1)),e("span",Jt,c(n.title),1)])],8,Qt)],4))),128))]),_:1})):b("",!0)]),_:1})])):b("",!0)]),t[41]||(t[41]=e("p",{class:"search-command-hint"},[g("Fun fact: type "),e("kbd",null,".all"),g(" to show everything")],-1))],40,Tt)])):b("",!0)]),_:1})])),m(Ze)],64))}}),an=Ue(en,[["__scopeId","data-v-c4c5ffe3"]]);export{an as default};

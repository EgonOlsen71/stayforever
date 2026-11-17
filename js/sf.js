var _self=self;
var instance=null;
var conInstance=null;
if (self) {
self.addEventListener('message', function(e) {
if (instance) {
instance.registerKey(e.data);
} else {
instance=new Compiled();
var mode=e.data;
if (mode && typeof mode=="object" && !Array.isArray(mode)) {
instance.disk.loadLocalFiles(mode.files);
mode=mode.mode;
}
if(mode=="run") {
instance.execute(true);
} else {
var comp=instance;
var cons=new CbmConsole();
conInstance=cons;
cons.inject(comp, e.data);
comp.execute(true);
}
}
}, false);
}
function executeAsync(srcFile, func, cons) {
var worker=new Worker(srcFile);
// Seed the worker's synchronous disk cache from the page's persistent storage.
var storageKey="basicv2:files:"+new URL(srcFile, location.href).pathname;
var savedFiles={};
try {
savedFiles=JSON.parse(localStorage.getItem(storageKey) || "{}");
if (!savedFiles || typeof savedFiles!="object" || Array.isArray(savedFiles)) {
savedFiles={};
}
} catch (e) {
console.warn("Browser storage unavailable; saved files will not survive a reload", e);
}
worker.addEventListener('message', function(e) {
if (e.data && e.data.type==="disk-save") {
savedFiles[e.data.name]=e.data.content;
try {
localStorage.setItem(storageKey, JSON.stringify(savedFiles));
} catch (err) {
console.warn("Unable to persist saved file "+e.data.name, err);
}
} else {
func(e);
}
}, false);
worker.postMessage({mode:cons ? "console" : "run", files:savedFiles});
return worker;
}
function CbmConsole() {
this.x=0;
this.y=0;
this.width=40;
this.height=25;
this.vidMem=new Array(1000);
this.colMem=new Array(1000);
this.memory=null;
this.bgColor=6;
this.fontColor=14;
this.map = {};
this.charset=null;
this.graphicsMode=true;
this.reverseMode=false;
this.compiledCode=null;
var _selfy=this;
this.getPokeValue = function(ch) {
if (Number.isInteger(ch)) {
ch=String.fromCharCode(ch);
}
return _selfy.charset.charCodeAt(_selfy.getConvertedChar(ch)+(_selfy.graphicsMode?0:256));
}
this.clearScreen = function() {
if (_selfy.compiledCode) {
_selfy.memory = _selfy.compiledCode.getMemory();
for (var i=0; i<_selfy.width*_selfy.height; i++) {
_selfy.memory[1024+i]=32;
_selfy.memory[55296+i]=_selfy.fontColor;
_selfy.x=0;
_selfy.y=0;
}
}
}
this.shiftRight = function(pos) {
var offset = pos;
var end = _selfy.y * _selfy.width + (((_selfy.y & 1) == 1) ? (_selfy.width-1) : (2*_selfy.width-1));
_selfy.memory = _selfy.compiledCode.getMemory();
if (_selfy.memory[1024+end] != 32) {
return;
}
for (var i = end; i > offset; i--) {
_selfy.memory[1024+i] = _selfy.memory[1024+i - 1];
_selfy.memory[55296+i] = _selfy.memory[55296+i - 1];
}
_selfy.memory[1024+offset]=_selfy.getPokeValue(32);
_selfy.memory[55296+offset]=_selfy.fontColor;
}
this.processControlCode = function(code, pos, withSpc) {
_selfy.memory = _selfy.compiledCode.getMemory();
var col=_selfy.memory[646];
if (withSpc && code==32) {
if (_selfy.reverseMode) {
_selfy.setAtCursor(pos);
} else {
_selfy.clearAtCursor(pos);
}
_selfy.x++;
}
else {
switch(code) {
case 147:
_selfy.clearScreen();
_selfy.x=0;
_selfy.y=0;
break;
case 19:
_selfy.x=0;
_selfy.y=0;
break;
case 29:
_selfy.x++;
break;
case 157:
_selfy.x--;
break;
case 17:
_selfy.y++;
break;
case 145:
_selfy.y--;
break;
case 144:
col = 0;
break;
case 5:
col = 1;
break;
case 28:
col = 2;
break;
case 159:
col = 3;
break;
case 156:
col = 4;
break;
case 30:
col = 5;
break;
case 31:
col = 6;
break;
case 158:
col = 7;
break;
case 129:
col = 8;
break;
case 149:
col = 9;
break;
case 150:
col = 10;
break;
case 151:
col = 11;
break;
case 152:
col = 12;
break;
case 153:
col = 13;
break;
case 154:
col = 14;
break;
case 155:
col = 15;
break;
case 18:
_selfy.reverseMode = true;
break;
case 146:
_selfy.reverseMode = false;
break;
case 20:
if (_selfy.x>0 || _selfy.y>0) {
if (_selfy.x==0) {
_selfy.y--;
_selfy.x=_selfy.width;
}
_selfy.x--;
var previous=_selfy.x+_selfy.width*_selfy.y;
_selfy.memory[1024+previous]=_selfy.getPokeValue(32);
_selfy.memory[55296+previous]=_selfy.fontColor;
}
break;
case 148:
_selfy.shiftRight(pos);
_selfy.clearAtCursor(pos);
break;
case 13:
_selfy.reverseMode = false;
_selfy.y++;
break;
case 14:
_selfy.graphicsMode=false;
break;
case 142:
_selfy.graphicsMode=true;
break;
default:
_selfy.memory[1024+pos]=_selfy.getPokeValue(String.fromCharCode(code));
_selfy.memory[55296+pos]=_selfy.fontColor;
_selfy.x++;
break;
}
}
if (col!=-1) {
_selfy.fontColor=col;
_selfy.compiledCode.getMemory()[646]=col;
}
}
this.clearAtCursor = function(pos) {
_selfy.memory = _selfy.compiledCode.getMemory();
_selfy.memory[1024+pos]=_selfy.getPokeValue(32);
_selfy.memory[55296+pos]=_selfy.fontColor;
_selfy.x++;
}
this.setAtCursor = function(pos) {
_selfy.memory = _selfy.compiledCode.getMemory();
_selfy.memory[1024+pos]=_selfy.getPokeValue(160);
_selfy.memory[55296+pos]=_selfy.fontColor;
_selfy.x++;
}
this.updateScreen = function() {
_selfy.memory=_selfy.compiledCode.getMemory();
if (_selfy.memory) {
_selfy.memory[211]=_selfy.x;
_selfy.memory[214]=_selfy.y;
_selfy.vidMem=_selfy.memory.slice(1024, 2024);
_selfy.colMem=_selfy.memory.slice(55296, 56296);
_selfy.bgColor=_selfy.memory[53281];
_self.postMessage([_selfy.vidMem, _selfy.colMem, _selfy.bgColor, _selfy.x, _selfy.y, _selfy.memory[646]]);
}
}
this.inject = function(compiledCode, conElem) {
compiledCode.consoleMode=true;
_selfy.memory = compiledCode.getMemory();
compiledCode.superOut=compiledCode.out;
_selfy.con=conElem;
_selfy.memory = compiledCode._memory;
_selfy.fillMap();
_selfy.charset=_selfy.createCharsetMapping();
_selfy.compiledCode=compiledCode;
var originalSyscall=compiledCode.SYSCALL;
compiledCode.SYSCALL=function(addr) {
if (addr==="$fff0();" || addr===65520) {
var memory=this.getMemory();
// PLOT reads column from Y (782) and row from X (781).
_selfy.x=Math.max(0,Math.min(_selfy.width-1, memory[782] || 0));
_selfy.y=Math.max(0,Math.min(_selfy.height-1, memory[781] || 0));
_selfy.updateScreen();
} else {
originalSyscall.call(this, addr);
}
};
compiledCode.out = function(val) {
_selfy.memory = compiledCode.getMemory();
if (val==null) {
return;
}
val=""+val;
for(var i=0; i<val.length; i++) {
var c=val.charAt(i);
var pos=_selfy.x+_selfy.width*_selfy.y;
var col=_selfy.compiledCode.getMemory()[646];
_selfy.fontColor=col;
if (c=='{') {
var end=val.indexOf('}', i);
if (end!=-1) {
var subs=val.substring(i,end+1);
i=end;
var code=_selfy.getCode(subs);
if (code!=-1) {
_selfy.processControlCode(code, pos, true);
}
continue;
}
}
if (c=='\t') {
// PRINT commas advance to the next ten-column print zone.
_selfy.x=(Math.floor(_selfy.x/10)+1)*10;
} else if (_selfy.isChar(c)) {
_selfy.processControlCode(c.charCodeAt(0), pos, false);
} else {
if (_selfy.isBreak(c)) {
_selfy.x=0;
_selfy.y++;
_selfy.reverseMode = false;
}
}
if (_selfy.x==_selfy.width) {
_selfy.x=0;
_selfy.y++;
}
if (_selfy.y>=_selfy.height) {
_selfy.y=_selfy.height-1;
for (var p=_selfy.width;p<_selfy.width*_selfy.height;p++) {
_selfy.memory[1024+p-_selfy.width]=_selfy.memory[1024+p];
_selfy.memory[55296+p-_selfy.width]=_selfy.memory[55296+p];
}
for (var p=_selfy.width*(_selfy.height-1);p<_selfy.width*_selfy.height;p++) {
_selfy.memory[1024+p]=32;
_selfy.memory[55296+p]=_selfy.fontColor;
}
}
}
_selfy.updateScreen();
};
compiledCode.get = function() {
var key=this.keyPressed;
if (!key) {
return ""
}
this.timeOut=20;
this.keyPressed=null;
this._memory[198]=0;
return this.convertKeyboard(key.substring(0,1));
};
}
this.isChar = function(c) {
return c!="\r" && c!="\n";
}
this.isBreak = function(c) {
return c=="\r" || c=="\n";
}
this.getConvertedChar = function(c) {
if (_selfy.compiledCode.flipCasing) {
// Flipped programs use the opposite font's letter cells.
if (c >= 'a' && c <= 'z') {
c = c.charCodeAt(0) - 32;
} else if (c >= 'A' && c <= 'Z') {
c = c.charCodeAt(0) - 64;
} else {
c = c.charCodeAt(0);
}
} else if (c >= 'a' && c <= 'z') {
c = c.charCodeAt(0) - 96;
} else {
c=c.charCodeAt(0);
}
c+=(_selfy.reverseMode?128:0);
return c;
}
this.setCharAt = function(str, index, replacement) {
return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}
this.createCharsetMapping = function() {
var sb="";
sb+="@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ !\"#$%&'()*+,-./0123456789:;<=>?`abcdefghijklmnopqrstuvwxyz{|}~";
sb+=" ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿";
sb+="ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
for (var i = 0; i < 32; i++) {
sb+=String.fromCharCode(i + 128);
}
sb+=String.fromCharCode(224);
for (var i = 0; i < 31; i++) {
sb+=String.fromCharCode(i + 256);
}
sb+="@";
for (var i = 0; i < 26; i++) {
sb+=String.fromCharCode(i + 287);
}
sb+="[\\]^_ !\"#$%&'()*+,-./0123456789:;<=>?`";
sb+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
sb+="{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿À";
for (var i = 0; i < 26; i++) {
sb+=String.fromCharCode(i + 313);
}
sb+="ÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
sb+=String.fromCharCode(128);
sb+="ÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚ";
for (var i = 27; i < 32; i++) {
sb+=String.fromCharCode(i + 128);
}
sb+=String.fromCharCode(224);
for (var i = 0; i < 31; i++) {
sb+=String.fromCharCode(i + 256);
}
_selfy.setCharAt(sb, 94 + 256, 'ą');
_selfy.setCharAt(sb,95 + 256, 'œ');
_selfy.setCharAt(sb,105 + 256, 'ŕ');
_selfy.setCharAt(sb,122 + 256, '');
_selfy.setCharAt(sb,94 + 128 + 256, '¦');
_selfy.setCharAt(sb,95 + 128 + 256, '');
_selfy.setCharAt(sb,105 + 128 + 256, 'ŕ');
_selfy.setCharAt(sb,122 + 128 + 256, '');
return sb;
}
this.getCode = function(placeHolder) {
placeHolder = placeHolder.replace("{", "").replace("}", "").toLowerCase().trim();
if (_selfy.map[placeHolder]) {
return _selfy.map[placeHolder];
}
return -1;
}
this.fillMap = function() {
_selfy.add(32, "space");
_selfy.add(144, "black", "blk", "ctrl-1");
_selfy.add(5, "white", "wht", "ctrl-2", "ctrl-e");
_selfy.add(28, "red", "ctrl-3", "ctrl-pound", "ctrl-£");
_selfy.add(159, "cyan", "cyn", "ctrl-4");
_selfy.add(156, "purple", "pur", "pink", "cm-3");
_selfy.add(30, "green", "grn", "ctrl-6", "ctrl-up arrow", "ctrl-↑");
_selfy.add(31, "blue", "blu", "ctrl-7", "ctrl-=");
_selfy.add(158, "yellow", "yel", "ctrl-8");
_selfy.add(129, "orange", "orng", "orn", "cm-1");
_selfy.add(149, "brown", "brn", "cm-2");
_selfy.add(150, "light red", "lred");
_selfy.add(151, "dark grey", "dark gray", "gry1", "cm-4");
_selfy.add(152, "grey", "gray", "gry2", "cm-5");
_selfy.add(153, "light green", "lgrn", "cm-6");
_selfy.add(154, "light blue", "lblu", "cm-7");
_selfy.add(155, "light grey", "light gray", "gry3", "cm-8");
_selfy.add(18, "reverse on", "rvon", "rvson", "ctrl-r", "ctrl-9");
_selfy.add(146, "reverse off", "rvof", "rvsoff", "ctrl-0");
_selfy.add(17, "cursor down", "down", "ctrl-q");
_selfy.add(145, "cursor up", "up", "shift-cursor down", "shift-down", "sh-cursor down", "sh-down");
_selfy.add(157, "cursor left", "left", "shift-cursor-right", "shift-right", "sh-cursor-right", "sh-right");
_selfy.add(29, "cursor right", "rght", "right", "ctrl-;");
_selfy.add(20, "del", "delete", "ctrl-t");
_selfy.add(14, "ctrl-n");
_selfy.add(13, "return", "ret", "ctrl-m");
_selfy.add(148, "insert", "inst", "shift-delete", "sh-delete", "shift-del", "sh-del");
_selfy.add(147, "clear", "clr", "shift-home", "sh-home", "clr/home");
_selfy.add(19, "home", "ctrl-s");
_selfy.add(133, "f1");
_selfy.add(134, "f3");
_selfy.add(135, "f5");
_selfy.add(136, "f7");
_selfy.add(8, "ctrl-h");
_selfy.add(9, "ctrl-i");
_selfy.add(14, "ctrl+n", "ctrl-n");
_selfy.add(142, "ctrl+/", "ctrl-/");
_selfy.add(165, "ctrl-g");
_selfy.add(137, "f2", "shift-f1", "sh-f1");
_selfy.add(138, "f4", "shift-f3", "sh-f3");
_selfy.add(139, "f6", "shift-f5", "sh-f5");
_selfy.add(140, "f8", "shift-f7", "sh-f7");
_selfy.add(92, "pound", "£");
_selfy.add(160, "shift-space", "sh-space");
_selfy.add(33, "shift-1", "sh-1");
_selfy.add(34, "shift-2", "sh-2");
_selfy.add(35, "shift-3", "sh-3");
_selfy.add(36, "shift-4", "sh-4");
_selfy.add(37, "shift-5", "sh-5");
_selfy.add(38, "shift-6", "sh-6");
_selfy.add(39, "shift-7", "sh-7");
_selfy.add(40, "shift-8", "sh-8");
_selfy.add(41, "shift-9", "sh-9");
_selfy.add(42, "*", "asterisk");
_selfy.add(43, "+", "plus");
_selfy.add(44, ",", "comma");
_selfy.add(45, "-", "minus");
_selfy.add(46, ".", "period");
_selfy.add(47, "/", "slash");
_selfy.add(58, ":", "colon");
_selfy.add(59, ";", "semicolon");
_selfy.add(60, "shift-comma", "shift-,", "sh-comma", "sh-,");
_selfy.add(61, "equal", "equals", "eq", "=");
_selfy.add(62, "shift-period", "shift-.", "sh-period", "sh-.");
_selfy.add(63, "shift-slash", "shift-/", "sh-slash", "sh-/");
_selfy.add(64, "@", "at");
_selfy.add(91, "shift-colon", "shift-:", "sh-colon", "sh-:");
_selfy.add(93, "shift-semicolon", "shift-;", "sh-semicolon", "sh-;");
_selfy.add(94, "↑", "^", "up arrow");
_selfy.add(95, "←", "left arrow");
_selfy.add(141, "shift-return", "sh-return", "shift-ret", "sh-ret");
_selfy.add(161, "cm-k");
_selfy.add(162, "cm-i");
_selfy.add(163, "cm-t");
_selfy.add(164, "cm-@", "cm-at");
_selfy.add(165, "cm-g");
_selfy.add(166, "cm-+", "cm-plus");
_selfy.add(167, "cm-m");
_selfy.add(168, "cm-£", "cm-pound");
_selfy.add(169, "shift-£", "shift-pound", "sh-£", "sh-pound");
_selfy.add(170, "cm-n");
_selfy.add(171, "cm-q");
_selfy.add(172, "cm-d");
_selfy.add(173, "cm-z");
_selfy.add(174, "cm-s");
_selfy.add(175, "cm-p");
_selfy.add(176, "cm-a");
_selfy.add(177, "cm-e");
_selfy.add(178, "cm-r");
_selfy.add(179, "cm-w");
_selfy.add(180, "cm-h");
_selfy.add(181, "cm-j");
_selfy.add(182, "cm-l");
_selfy.add(183, "cm-y");
_selfy.add(184, "cm-u");
_selfy.add(185, "cm-o");
_selfy.add(186, "shift-@", "shift-at", "sh-@", "sh-at");
_selfy.add(187, "cm-f");
_selfy.add(188, "cm-c");
_selfy.add(189, "cm-x");
_selfy.add(190, "cm-v");
_selfy.add(191, "cm-b");
_selfy.add(192, "shift-*", "shift-asterisk", "sh-*", "sh-asterisk");
_selfy.add(219, "shift-+", "shift-plus", "sh-+", "sh-plus");
_selfy.add(220, "cm--", "cm-minus");
_selfy.add(221, "shift--", "shift-minus", "sh--", "sh-minus");
_selfy.add(222, "shift-↑", "shift-up arrow", "sh-↑", "sh-up arrow");
_selfy.add(223, "cm-*", "cm-asterisk");
for (var i = 65; i < 91; i++) {
var c = String.fromCharCode(i - 65 + 97);
_selfy.add(i, "shift-" + c, "sh-" + c);
}
}
this.add = function() {
var code=arguments[0];
for (var i = 1; i < arguments.length; i++) {
var placy=arguments[i];
_selfy.map[placy]=code;
_selfy.map[placy.replace("ctrl", "ct")]=code;
_selfy.map[placy.replace("ctrl", "control")]=code;
_selfy.map[placy.replace("-", " ")]=code;
_selfy.map[placy.replace("ctrl", "ct").replace("-", " ")]=code;
_selfy.map[placy.replace("ctrl", "control").replace("-", " ")]=code;
}
}
_selfy.clearScreen();
}
function Compiled(output) {
this.outputter=function(txt) {console.log(txt);}
if (output) {this.outputter=output;}
this.flipCasing=true;
this.INIT = function() {
this.X_REG=0.0;
this.Y_REG=0.0;
this.C_REG=0.0;
this.D_REG=0.0;
this.E_REG=0.0;
this.F_REG=0.0;
this.A_REG=0;
this.B_REG=0;
this.G_REG=0;
this.CMD_NUM=0;
this.CHANNEL=0;
this.JUMP_TARGET="";
this.USR_PARAM=0;
this._line="";
this._stack=new Array();
this._forstack=new Array();
this._memory=new Array(65535);
this._zeroflag=0
this._timeOffset=0
this._time=0
this._inputQueue=new Array();
this.CONST_0="START.ROM";
this.CONST_1=0;
this.CONST_2=1;
this.CONST_3="dAS KLAPPT SO NICHT!";
this.CONST_4=3;
this.CONST_5="dAS BEWIRKT NICHTS MEHR!";
this.CONST_6=2;
this.CONST_7=-1.0;
this.CONST_8="dAS VERSTEHE ICH NICHT!";
this.CONST_9=39;
this.CONST_10="' KENNE ICH NICHT!";
this.CONST_11="";
this.CONST_12=15;
this.CONST_13="dAS WILL NIEMAND HABEN!";
this.CONST_14="dAS KANNST DU NICHT ";
this.CONST_15=33;
this.CONST_16=10;
this.CONST_17="dU HAST BEI DIR:";
this.CONST_18="NICHTS";
this.CONST_19="hIER IST NICHTS!";
this.CONST_20="dU KANNST ";
this.CONST_21=" NICHT NEHMEN!";
this.CONST_22=" GENOMMEN!";
this.CONST_23=8;
this.CONST_24=29;
this.CONST_25="HOC";
this.CONST_26="UP";
this.CONST_27="GEH ";
this.CONST_28="RUN";
this.CONST_29="DOW";
this.CONST_30="WES";
this.CONST_31="NOR";
this.CONST_32="OST";
this.CONST_33="SUE";
this.CONST_34="O";
this.CONST_35="W";
this.CONST_36="S";
this.CONST_37="N";
this.CONST_38="SW";
this.CONST_39="NW";
this.CONST_40="SO";
this.CONST_41="NO";
this.CONST_42="U";
this.CONST_43="D";
this.CONST_44="R";
this.CONST_45="H";
this.CONST_46="UNTEN";
this.CONST_47="RUNTER";
this.CONST_48="RAUF";
this.CONST_49="OBEN";
this.CONST_50="HOCH";
this.CONST_51="hIER IST KEIN pLATZ MEHR!";
this.CONST_52=9;
this.CONST_53=256;
this.CONST_54=" ABGELEGT!";
this.CONST_55=4;
this.CONST_56="***";
this.CONST_57=14;
this.CONST_58=112;
this.CONST_59=28;
this.CONST_60=255;
this.CONST_61="fEHLER: aRRAY VOLL!";
this.CONST_62=" ERHALTEN!";
this.CONST_63=5;
this.CONST_64=38;
this.CONST_65=304;
this.CONST_66=76;
this.CONST_67=".";
this.CONST_68=6;
this.CONST_69=7;
this.CONST_70="PORTAL";
this.CONST_71=".ROM";
this.CONST_72="mOEGLICHE bEFEHLE:";
this.CONST_73=", ";
this.CONST_74="?";
this.CONST_75="-1";
this.CONST_76="lADE dATEN...";
this.CONST_77="OPERATIONS.DEF";
this.CONST_78=46;
this.CONST_79=64;
this.CONST_80="OK";
this.CONST_81="X";
this.CONST_82="Q";
this.CONST_83="HELP";
this.CONST_84=" ";
this.CONST_85=128;
this.CONST_86=32;
this.CONST_87=57;
this.CONST_88=48;
this.CONST_89=90;
this.CONST_90=65;
this.CONST_91="E";
this.CONST_92="UND";
this.CONST_93="SI";
this.CONST_94="IH";
this.CONST_95="ES";
this.CONST_96=" IST HIER NICHT!";
this.CONST_97="wIRKLICH BEENDEN (J/N)?";
this.CONST_98="J";
this.CONST_99="bIS BALD!";
this.CONST_100="NORDO";
this.CONST_101="NORDW";
this.CONST_102="SUEDO";
this.CONST_103="SUEDW";
this.CONST_104="dA GEHT ES NICHT LANG!";
this.CONST_105=" xam / eGONoLSEN71";
this.CONST_106="bYTES FREI";
this.CONST_107="dU HAST NICHTS!";
this.CONST_108=" HAST DU NICHT!";
this.CONST_109=".BAK";
this.CONST_110="S:";
this.CONST_111="R:";
this.CONST_112="=";
this.CONST_113=12;
this.CONST_114="dU SIEHST NICHTS BESONDERES!";
this.CONST_115="bLAH BLAH BLAH!?";
this.CONST_116=13;
this.CONST_117=40;
this.CONST_118=",R";
this.CONST_119="lADE...";
this.CONST_120=",W";
this.CONST_121="sPEICHERE...";
this.CONST_122="io-eRROR: ";
this.CONST_123=191;
this.CONST_124="eINEN mOMENT...";
this.CONST_125=30;
this.CONST_126=60;
this.CONST_127="> ";
this.CONST_128=37;
this.CONST_129="ALLES";
this.CONST_130="SAVE.DAT";
this.CONST_131=49152;
this.CONST_132=";";
this.CONST_133=",";
this.CONST_134="lADE gEGENSTAENDE...";
this.CONST_135="ITEMS.DEF";
this.CONST_136="0";
this.CONST_137=53179;
this.CONST_138="lADE bEFEHLE...";
this.CONST_139="COMMANDS.DEF";
this.CONST_140="ENDID.DEF";
this.CONST_141="aUSGAENGE SIND: ";
this.CONST_142="dU SIEHST: ";
this.CONST_143=11;
this.CONST_144=55296;
this.CONST_145=55335;
this.CONST_146=1024;
this.CONST_147=1063;
this.CONST_148=160;
this.CONST_149=19;
this.CONST_150=18;
this.CONST_151=146;
this.CONST_152=147;
this._dataPtr=0;
this._datas=["N","S","W","O","NW","SW","NO","SO","H","R"];
this.VAR_DN_int=0;
this.VAR_ER=0.0;
this.VAR_CV_int_array=new Array();
this.VAR_T_int=0;
this.VAR_ID_int_array=new Array();
this.VAR_BA=0.0;
this.VAR_AD=0.0;
this.VAR_PP=0.0;
this.VAR_IC_int=0;
this.VAR_I=0.0;
this.VAR_UV_int_array=new Array();
this.VAR_IV_int_array=new Array();
this.VAR_TC_int=0;
this.VAR_RR_int=0;
this.VAR_IP_int_array=new Array();
this.VAR_RT_int=0;
this.VAR_MV_int_array=new Array();
this.VAR_RS_int_array=new Array();
this.VAR_RD_int=0;
this.VAR_RV_int_array=new Array();
this.VAR_P_int=0;
this.VAR_FF_int=0;
this.VAR_II=0.0;
this.VAR_C_int=0;
this.VAR_P=0.0;
this.VAR_XO_int=0;
this.VAR_OC_int=0;
this.VAR_OP_int_array=new Array();
this.VAR_OX_int=0;
this.VAR_T2_int=0;
this.VAR_UQ_int=0;
this.VAR_AC_int_array=new Array();
this.VAR_OG_int_array=new Array();
this.VAR_C2_int=0;
this.VAR_OD_int=0;
this.VAR_MX_int=0;
this.VAR_PO_int=0;
this.VAR_TB_int=0;
this.VAR_GC_int=0;
this.VAR_ST=0.0;
this.VAR_MO_int=0;
this.VAR_SF_int=0;
this.VAR_LR_int=0;
this.VAR_CC_int=0;
this.VAR_I_int=0;
this.VAR_PP_int=0;
this.VAR_CO_int=0;
this.VAR_MS_int=0;
this.VAR_TI_int=0;
this.VAR_DC_int=0;
this.VAR_SK_int=0;
this.VAR_J=0.0;
this.VAR_XC_int=0;
this.VAR_PL_int=0;
this.VAR_MI_int=0;
this.VAR_MR_int=0;
this.VAR_PY_int=0;
this.VAR_LI_int=0;
this.VAR_II_int=0;
this.VAR_J_int=0;
this.VAR_SD=0.0;
this.VAR_MD_int=0;
this.VAR_EL_int=0;
this.VAR_IL_int=0;
this.VAR_LK_int_array=new Array();
this.VAR_RN$="";
this.VAR_A$="";
this.VAR_CC$="";
this.VAR_TX$="";
this.VAR_TF$="";
this.VAR_B$="";
this.VAR_SX$="";
this.VAR_CB$="";
this.VAR_LC$="";
this.VAR_CT$="";
this.VAR_C$="";
this.VAR_AA$="";
this.VAR_LO$="";
this.VAR_AL$="";
this.VAR_FI$="";
this.VAR_RL$="";
this.VAR_ID$="";
this.VAR_A1$="";
this.VAR_A2$="";
this.VAR_CP$_array=new Array();
this.VAR_CV$_array=new Array();
this.VAR_IT$_array=new Array();
this.VAR_OP$_array=new Array();
this.VAR_OG$_array=new Array();
this.VAR_OD$_array=new Array();
this.VAR_LX$_array=new Array();
this.VAR_DR$_array=new Array();
this.VAR_CM$_array=new Array();
this.VAR_IL$_array=new Array();
this.VAR_XP$_array=new Array();
this.VAR_XX$_array=new Array();
this.VAR_RD$_array=new Array();
this.VAR_EX$_array=new Array();
this.VAR_XN$_array=new Array();
this.VAR_RI$_array=new Array();
}
//
this.PROGRAMSTART = function() {
this.START();
return 10;
} 
//
this.line_0 = function() {
return 10;
} 
//
this.line_10 = function() {
//
this.X_REG=Math.floor(this._memory[186]) & 255;
this.VAR_DN_int=this.X_REG;
this.VAR_DN_int=Math.floor(this.VAR_DN_int);
//
this.GOSUB("GOSUBCONT0");
return 63300;
} 
//
this.GOSUBCONT0 = function() {
//
this.GOSUB("GOSUBCONT1");
return 60000;
} 
//
this.GOSUBCONT1 = function() {
//
this.GOSUB("GOSUBCONT2");
return 61200;
} 
//
this.GOSUBCONT2 = function() {
//
this.GOSUB("GOSUBCONT3");
return 48000;
} 
//
this.GOSUBCONT3 = function() {
//
this.GOSUB("GOSUBCONT4");
return 61500;
} 
//
this.GOSUBCONT4 = function() {
return 20;
} 
//
this.line_20 = function() {
//
this.B_REG=this.CONST_0;
this.VAR_RN$=this.B_REG;
//
this.GOSUB("GOSUBCONT5");
return 63300;
} 
//
this.GOSUBCONT5 = function() {
return 30;
} 
//
this.line_30 = function() {
//
this.GOSUB("GOSUBCONT6");
return 40100;
} 
//
this.GOSUBCONT6 = function() {
return 40;
} 
//
this.line_40 = function() {
//
this.GOSUB("GOSUBCONT7");
return 50000;
} 
//
this.GOSUBCONT7 = function() {
//
this.GOSUB("GOSUBCONT8");
return 40000;
} 
//
this.GOSUBCONT8 = function() {
return 50;
} 
//
this.line_50 = function() {
//
this.GOSUB("GOSUBCONT9");
return 52000;
} 
//
this.GOSUBCONT9 = function() {
//
this.GOSUB("GOSUBCONT10");
return 40000;
} 
//
this.GOSUBCONT10 = function() {
return 60;
} 
//
this.line_60 = function() {
//
return 40;
} 
//
this.line_40000 = function() {
//
return 40010;
} 
//
this.line_40010 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_ER;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP0";}
return "SKIP0";
} 
//
this.NSKIP0 = function() {
return "RETURN";
//
return 40020;
} 
//
this.SKIP0 = function() {
return 40020;
} 
//
this.line_40020 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_ER;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP1";}
return "SKIP1";
} 
//
this.NSKIP1 = function() {
//
this.A_REG=this.CONST_3;
this.STROUT();
this.LINEBREAK();
//
return 40030;
} 
//
this.SKIP1 = function() {
return 40030;
} 
//
this.line_40030 = function() {
//
this.Y_REG=this.CONST_4;
this.X_REG=this.VAR_ER;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP2";}
return "SKIP2";
} 
//
this.NSKIP2 = function() {
//
this.A_REG=this.CONST_5;
this.STROUT();
this.LINEBREAK();
//
return 40040;
} 
//
this.SKIP2 = function() {
return 40040;
} 
//
this.line_40040 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_ER;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP3";}
return "SKIP3";
} 
//
this.NSKIP3 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_ER=this.Y_REG;
return "RETURN";
//
return 40050;
} 
//
this.SKIP3 = function() {
return 40050;
} 
//
this.line_40050 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_ER=this.Y_REG;
return 40060;
} 
//
this.line_40060 = function() {
//
this.X_REG=this.CONST_1;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP4";}
return "SKIP4";
} 
//
this.NSKIP4 = function() {
//
this.A_REG=this.CONST_8;
this.STROUT();
this.LINEBREAK();
return "RETURN";
//
return 40070;
} 
//
this.SKIP4 = function() {
return 40070;
} 
//
this.line_40070 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.CONST_9;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
//
this.X_REG=this.CONST_1;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CP$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.A_REG=this.CONST_10;
this.STROUT();
this.LINEBREAK();
//
return "RETURN";
} 
//
this.line_40100 = function() {
//
return 40110;
} 
//
this.line_40110 = function() {
//
this.GOSUB("GOSUBCONT11");
return 62000;
} 
//
this.GOSUBCONT11 = function() {
return 40120;
} 
//
this.line_40120 = function() {
//
this.GOSUB("GOSUBCONT12");
return 59500;
} 
//
this.GOSUBCONT12 = function() {
//
return "RETURN";
} 
//
this.line_40500 = function() {
//
return 40510;
} 
//
this.line_40510 = function() {
//
this.X_REG=this.VAR_T_int;
this.G_REG=this.VAR_ID_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_BA;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_AD=this.X_REG;
//
this.B_REG=this.CONST_11;
this.VAR_A$=this.B_REG;
return 40520;
} 
//
this.line_40520 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_PP=this.Y_REG;
//
this.Y_REG=this.VAR_AD;
this.X_REG=this._memory[Math.floor(this.Y_REG) & 65535];
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP0","VAR_PP");
return "FORLOOP0";
} 
//
this.FORLOOP0 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_PP;
this.X_REG=this.VAR_AD;
this.X_REG=this.X_REG+this.Y_REG;
this.Y_REG=this.X_REG;
this.X_REG=this._memory[Math.floor(this.Y_REG) & 65535];
this.Y_REG=this.X_REG;
// ignored: CHGCTX #1
this.CHR();
this.B_REG=this.A_REG;
this.A_REG=this.VAR_A$;
this.CONCAT();
this.VAR_A$=this.A_REG;
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 40530;
} 
//
this.line_40530 = function() {
//
this.GOSUB("GOSUBCONT13");
return 59100;
} 
//
this.GOSUBCONT13 = function() {
//
return "RETURN";
} 
//
this.line_40600 = function() {
//
return 40605;
} 
//
this.line_40605 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_ER=this.Y_REG;
//
this.Y_REG=this.CONST_12;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP5";}
return "SKIP5";
} 
//
this.NSKIP5 = function() {
//
this.A_REG=this.CONST_13;
this.STROUT();
this.LINEBREAK();
return "RETURN";
//
return 40610;
} 
//
this.SKIP5 = function() {
return 40610;
} 
//
this.line_40610 = function() {
//
this.A_REG=this.CONST_14;
this.STROUT();
//
this.X_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CV$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.COMPACTMAX();
this.Y_REG=this.CONST_15;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
this.LINEBREAK();
return 40620;
} 
//
this.line_40620 = function() {
//
return "RETURN";
} 
//
this.line_40650 = function() {
//
return 40660;
} 
//
this.line_40660 = function() {
//
this.LINEBREAK();
//
this.GOSUB("GOSUBCONT14");
return 62600;
} 
//
this.GOSUBCONT14 = function() {
//
return "RETURN";
} 
//
this.line_40700 = function() {
//
return 40710;
} 
//
this.line_40710 = function() {
//
this._memory[646]=Math.floor(this.CONST_16) & 255;
//
this.LINEBREAK();
//
this.A_REG=this.CONST_17;
this.STROUT();
this.LINEBREAK();
return 40715;
} 
//
this.line_40715 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP6";}
return "SKIP6";
} 
//
this.NSKIP6 = function() {
//
this.Y_REG=this.CONST_6;
// ignored: CHGCTX #1
this.TAB();
//
this.A_REG=this.CONST_18;
this.STROUT();
this.LINEBREAK();
return "RETURN";
//
return 40720;
} 
//
this.SKIP6 = function() {
return 40720;
} 
//
this.line_40720 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP1","VAR_I");
return 40730;
} 
//
this.FORLOOP1 = function() {
return 40730;
} 
//
this.line_40730 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP7";}
return "SKIP7";
} 
//
this.NSKIP7 = function() {
//
this.Y_REG=this.CONST_6;
// ignored: CHGCTX #1
this.TAB();
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
this.LINEBREAK();
//
return 40740;
} 
//
this.SKIP7 = function() {
return 40740;
} 
//
this.line_40740 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return "RETURN";
} 
//
this.line_40800 = function() {
//
return 40805;
} 
//
this.line_40805 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_TC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP8";}
return "SKIP8";
} 
//
this.NSKIP8 = function() {
//
this.A_REG=this.CONST_19;
this.STROUT();
this.LINEBREAK();
return "RETURN";
//
return 40810;
} 
//
this.SKIP8 = function() {
return 40810;
} 
//
this.line_40810 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP2","VAR_I");
return "FORLOOP2";
} 
//
this.FORLOOP2 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.GOSUB("GOSUBCONT15");
return 40900;
} 
//
this.GOSUBCONT15 = function() {
return 40820;
} 
//
this.line_40820 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP9";}
return "SKIP9";
} 
//
this.NSKIP9 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return 40830;
} 
//
this.SKIP9 = function() {
return 40830;
} 
//
this.line_40830 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 40840;
} 
//
this.line_40840 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RR_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP10";}
return "SKIP10";
} 
//
this.NSKIP10 = function() {
this.GOSUB("GOSUBCONT16");
return 40650;
} 
//
this.GOSUBCONT16 = function() {
//
return 40850;
} 
//
this.SKIP10 = function() {
return 40850;
} 
//
this.line_40850 = function() {
//
return "RETURN";
} 
//
this.line_40900 = function() {
//
return 40910;
} 
//
this.line_40910 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.X_REG=this.VAR_T_int;
this.G_REG=this.VAR_MV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_2;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP11";}
return "SKIP11";
} 
//
this.NSKIP11 = function() {
return 40930;
//
return 40920;
} 
//
this.SKIP11 = function() {
return 40920;
} 
//
this.line_40920 = function() {
//
this.A_REG=this.CONST_20;
this.STROUT();
//
this.X_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.A_REG=this.CONST_21;
this.STROUT();
this.LINEBREAK();
//
this.Y_REG=this.CONST_6;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return "RETURN";
} 
//
this.line_40930 = function() {
//
this.Y_REG=this.VAR_IC_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_T_int;
this.G_REG=this.VAR_IV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.X_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.A_REG=this.CONST_22;
this.STROUT();
this.LINEBREAK();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_IC_int=this.X_REG;
this.VAR_IC_int=Math.floor(this.VAR_IC_int);
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_1;
this.G_REG=this.VAR_RS_int_array;
this.ARRAYSTORE_INTEGER();
return 40940;
} 
//
this.line_40940 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_PP=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP3","VAR_PP");
return "FORLOOP3";
} 
//
this.FORLOOP3 = function() {
//
this.Y_REG=this.VAR_PP;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_RV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP12";}
return "SKIP12";
} 
//
this.NSKIP12 = function() {
//
this.Y_REG=this.VAR_PP;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
//
this.Y_REG=this.CONST_7;
this.G_REG=this.VAR_RV_int_array;
this.ARRAYSTORE_INTEGER();
//
return 40950;
} 
//
this.SKIP12 = function() {
return 40950;
} 
//
this.line_40950 = function() {
//
//
this.NEXT("VAR_PP");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return "RETURN";
} 
//
this.line_41000 = function() {
//
return 41005;
} 
//
this.line_41005 = function() {
//
this.B_REG=this.VAR_CC$;
this.LEN();
this.Y_REG=this.CONST_6;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP13";}
return "SKIP13";
} 
//
this.NSKIP13 = function() {
return "RETURN";
//
return 41010;
} 
//
this.SKIP13 = function() {
return 41010;
} 
//
this.line_41010 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.LEN();
this.Y_REG=this.CONST_2;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_CC$;
this.LEFT();
this.VAR_A$=this.A_REG;
return 41020;
} 
//
this.line_41020 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_4;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP14";}
return "SKIP14";
} 
//
this.NSKIP14 = function() {
return 41100;
//
return 41025;
} 
//
this.SKIP14 = function() {
return 41025;
} 
//
this.line_41025 = function() {
//
this.COMPACTMAX();
this.C_REG=this.CONST_4;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.LEFT();
this.VAR_A$=this.A_REG;
return 41030;
} 
//
this.line_41030 = function() {
//
this.GOSUB("GOSUBCONT17");
return 41200;
} 
//
this.GOSUBCONT17 = function() {
//
this.B_REG=this.CONST_25;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_26;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP15";}
return "SKIP15";
} 
//
this.NSKIP15 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41040;
} 
//
this.SKIP15 = function() {
return 41040;
} 
//
this.line_41040 = function() {
//
this.B_REG=this.CONST_28;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_29;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP16";}
return "SKIP16";
} 
//
this.NSKIP16 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41060;
} 
//
this.SKIP16 = function() {
return 41060;
} 
//
this.line_41060 = function() {
//
this.B_REG=this.CONST_30;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_31;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP17";}
return "SKIP17";
} 
//
this.NSKIP17 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41070;
} 
//
this.SKIP17 = function() {
return 41070;
} 
//
this.line_41070 = function() {
//
this.B_REG=this.CONST_32;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_33;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP18";}
return "SKIP18";
} 
//
this.NSKIP18 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41090;
} 
//
this.SKIP18 = function() {
return 41090;
} 
//
this.line_41090 = function() {
//
return "RETURN";
} 
//
this.line_41100 = function() {
//
this.B_REG=this.CONST_34;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_35;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_36;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_37;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP19";}
return "SKIP19";
} 
//
this.NSKIP19 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41110;
} 
//
this.SKIP19 = function() {
return 41110;
} 
//
this.line_41110 = function() {
//
this.B_REG=this.CONST_38;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_39;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_40;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_41;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP20";}
return "SKIP20";
} 
//
this.NSKIP20 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41120;
} 
//
this.SKIP20 = function() {
return 41120;
} 
//
this.line_41120 = function() {
//
this.B_REG=this.CONST_42;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_43;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_44;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_45;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP21";}
return "SKIP21";
} 
//
this.NSKIP21 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_CC$;
this.A_REG=this.CONST_27;
this.CONCAT();
this.VAR_CC$=this.A_REG;
return "RETURN";
//
return 41130;
} 
//
this.SKIP21 = function() {
return 41130;
} 
//
this.line_41130 = function() {
//
return "RETURN";
} 
//
this.line_41200 = function() {
//
return 41210;
} 
//
this.line_41210 = function() {
//
this.B_REG=this.CONST_46;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP22";}
return "SKIP22";
} 
//
this.NSKIP22 = function() {
//
this.B_REG=this.CONST_47;
this.VAR_A$=this.B_REG;
//
return 41220;
} 
//
this.SKIP22 = function() {
return 41220;
} 
//
this.line_41220 = function() {
//
this.B_REG=this.CONST_48;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_49;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP23";}
return "SKIP23";
} 
//
this.NSKIP23 = function() {
//
this.B_REG=this.CONST_50;
this.VAR_A$=this.B_REG;
//
return 41230;
} 
//
this.SKIP23 = function() {
return 41230;
} 
//
this.line_41230 = function() {
//
return "RETURN";
} 
//
this.line_41300 = function() {
//
return 41310;
} 
//
this.line_41310 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP4","VAR_I");
return "FORLOOP4";
} 
//
this.FORLOOP4 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_RV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_P_int=this.X_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
//
this.Y_REG=this.CONST_1;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
return 41320;
} 
//
this.line_41320 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_P_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP24";}
return "SKIP24";
} 
//
this.NSKIP24 = function() {
return 41360;
//
return 41325;
} 
//
this.SKIP24 = function() {
return 41325;
} 
//
this.line_41325 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP25";}
return "SKIP25";
} 
//
this.NSKIP25 = function() {
return 41350;
//
return 41330;
} 
//
this.SKIP25 = function() {
return 41330;
} 
//
this.line_41330 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP5","VAR_II");
return "FORLOOP5";
} 
//
this.FORLOOP5 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_P_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP26";}
return "SKIP26";
} 
//
this.NSKIP26 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.Y_REG=this.VAR_IC_int;
this.VAR_II=this.Y_REG;
//
return 41340;
} 
//
this.SKIP26 = function() {
return 41340;
} 
//
this.line_41340 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP27";}
return "SKIP27";
} 
//
this.NSKIP27 = function() {
return 41360;
//
return 41350;
} 
//
this.SKIP27 = function() {
return 41350;
} 
//
this.line_41350 = function() {
//
this.Y_REG=this.VAR_TC_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_P_int;
this.G_REG=this.VAR_IP_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_TC_int=this.X_REG;
this.VAR_TC_int=Math.floor(this.VAR_TC_int);
return 41360;
} 
//
this.line_41360 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return "RETURN";
} 
//
this.line_41400 = function() {
//
return 41410;
} 
//
this.line_41410 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_1;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP6","VAR_P");
return "FORLOOP6";
} 
//
this.FORLOOP6 = function() {
//
this.Y_REG=this.VAR_P;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_RV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP28";}
return "SKIP28";
} 
//
this.NSKIP28 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_C_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
return 41415;
} 
//
this.SKIP28 = function() {
return 41415;
} 
//
this.line_41415 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 41420;
} 
//
this.line_41420 = function() {
//
this.Y_REG=this.CONST_4;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP29";}
return "SKIP29";
} 
//
this.NSKIP29 = function() {
//
this.A_REG=this.CONST_51;
this.STROUT();
this.LINEBREAK();
//
this.Y_REG=this.CONST_6;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return "RETURN";
//
return 41430;
} 
//
this.SKIP29 = function() {
return 41430;
} 
//
this.line_41430 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP7","VAR_P");
return "FORLOOP7";
} 
//
this.FORLOOP7 = function() {
//
this.Y_REG=this.VAR_P;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_RV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP30";}
return "SKIP30";
} 
//
this.NSKIP30 = function() {
//
this.Y_REG=this.VAR_P;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
//
this.Y_REG=this.VAR_T_int;
this.G_REG=this.VAR_RV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_52;
this.VAR_P=this.Y_REG;
//
return 41440;
} 
//
this.SKIP30 = function() {
return 41440;
} 
//
this.line_41440 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP8","VAR_P");
return "FORLOOP8";
} 
//
this.FORLOOP8 = function() {
//
this.X_REG=this.VAR_P;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
return 41450;
} 
//
this.line_41450 = function() {
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP31";}
return "SKIP31";
} 
//
this.NSKIP31 = function() {
return 41500;
//
return 41460;
} 
//
this.SKIP31 = function() {
return 41460;
} 
//
this.line_41460 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this.X_REG;
this.X_REG=this.VAR_P;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP32";}
return "SKIP32";
} 
//
this.NSKIP32 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this.VAR_IC_int=this.X_REG;
this.VAR_IC_int=Math.floor(this.VAR_IC_int);
//
this.Y_REG=this.CONST_53;
this.VAR_P=this.Y_REG;
return 41500;
//
return 41470;
} 
//
this.SKIP32 = function() {
return 41470;
} 
//
this.line_41470 = function() {
//
this.Y_REG=this.VAR_P;
this.VAR_PP=this.Y_REG;
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP9","VAR_PP");
return "FORLOOP9";
} 
//
this.FORLOOP9 = function() {
//
this.Y_REG=this.VAR_PP;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PP;
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_IV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.VAR_PP;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PP;
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_UV_int_array;
this.ARRAYSTORE_INTEGER();
return 41480;
} 
//
this.line_41480 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this.VAR_IC_int=this.X_REG;
this.VAR_IC_int=Math.floor(this.VAR_IC_int);
//
this.Y_REG=this.CONST_53;
this.VAR_PP=this.Y_REG;
return 41500;
} 
//
this.line_41500 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 41510;
} 
//
this.line_41510 = function() {
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_2;
this.G_REG=this.VAR_RS_int_array;
this.ARRAYSTORE_INTEGER();
//
this.X_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.A_REG=this.CONST_54;
this.STROUT();
this.LINEBREAK();
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return "RETURN";
} 
//
this.line_42000 = function() {
//
return 42005;
} 
//
this.line_42005 = function() {
//
this.Y_REG=this.VAR_XO_int;
this.X_REG=this.VAR_OC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP33";}
return "SKIP33";
} 
//
this.NSKIP33 = function() {
return 42420;
//
return 42010;
} 
//
this.SKIP33 = function() {
return 42010;
} 
//
this.line_42010 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_16;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP10","VAR_I");
return 42015;
} 
//
this.FORLOOP10 = function() {
return 42015;
} 
//
this.line_42015 = function() {
//
this.GOSUB("GOSUBCONT18");
return 45200;
} 
//
this.GOSUBCONT18 = function() {
return 42020;
} 
//
this.line_42020 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.X_REG=this.X_REG*Math.pow(2,this.A_REG);
this.A_REG=this.CONST_2;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_OC_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.VAL();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OP_int_array;
this.ARRAYSTORE_INTEGER();
//
this.GOSUB("GOSUBCONT19");
return 61700;
} 
//
this.GOSUBCONT19 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 42040;
} 
//
this.line_42040 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_OX_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP11","VAR_I");
return "FORLOOP11";
} 
//
this.FORLOOP11 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.X_REG=this.X_REG*Math.pow(2,this.A_REG);
this.A_REG=this.CONST_2;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_OC_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.CONST_11;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OP$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
return 42050;
} 
//
this.line_42050 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_TX$=this.B_REG;
//
this.GOSUB("GOSUBCONT20");
return 61000;
} 
//
this.GOSUBCONT20 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.X_REG=this.X_REG*Math.pow(2,this.A_REG);
this.A_REG=this.CONST_2;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_OC_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.VAR_TX$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OP$_array;
this.ARRAYSTORE_STRING();
//
this.GOSUB("GOSUBCONT21");
return 61700;
} 
//
this.GOSUBCONT21 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_II;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_II=this.X_REG;
return 42055;
} 
//
this.line_42055 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OX_int;
this.X_REG=this.X_REG+this.Y_REG;
this.Y_REG=this.X_REG;
this.X_REG=this.VAR_II;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP34";}
return "SKIP34";
} 
//
this.NSKIP34 = function() {
return 42420;
//
return 42060;
} 
//
this.SKIP34 = function() {
return 42060;
} 
//
this.line_42060 = function() {
//
this.B_REG=this.CONST_56;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP35";}
return "SKIP35";
} 
//
this.NSKIP35 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_OC_int=this.X_REG;
this.VAR_OC_int=Math.floor(this.VAR_OC_int);
return "RETURN";
//
return 42070;
} 
//
this.SKIP35 = function() {
return 42070;
} 
//
this.line_42070 = function() {
//
return 42050;
} 
//
this.line_42200 = function() {
//
return 42210;
} 
//
this.line_42210 = function() {
//
this.Y_REG=this.CONST_57;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_P=this.X_REG;
//
this.Y_REG=this.CONST_58;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_PP=this.X_REG;
//
this.GOSUB("GOSUBCONT22");
return 42900;
} 
//
this.GOSUBCONT22 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP36";}
return "SKIP36";
} 
//
this.NSKIP36 = function() {
return "RETURN";
//
return 42220;
} 
//
this.SKIP36 = function() {
return 42220;
} 
//
this.line_42220 = function() {
//
this.Y_REG=this.CONST_59;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_UQ_int=this.X_REG;
this.VAR_UQ_int=Math.floor(this.VAR_UQ_int);
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_UQ_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP37";}
return "SKIP37";
} 
//
this.NSKIP37 = function() {
return 42270;
//
//
return 42230;
} 
//
this.SKIP37 = function() {
return 42230;
} 
//
this.line_42230 = function() {
//
this.GOSUB("GOSUBCONT23");
return 43000;
} 
//
this.GOSUBCONT23 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP38";}
return "SKIP38";
} 
//
this.NSKIP38 = function() {
return "RETURN";
//
return 42270;
} 
//
this.SKIP38 = function() {
return 42270;
} 
//
this.line_42270 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_OX_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP12","VAR_I");
return "FORLOOP12";
} 
//
this.FORLOOP12 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.X_REG=this.X_REG*Math.pow(2,this.A_REG);
this.A_REG=this.CONST_2;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_OP$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP39";}
return "SKIP39";
} 
//
this.NSKIP39 = function() {
//
this.Y_REG=this.VAR_OX_int;
this.VAR_I=this.Y_REG;
return 42290;
//
return 42280;
} 
//
this.SKIP39 = function() {
return 42280;
} 
//
this.line_42280 = function() {
//
this.GOSUB("GOSUBCONT24");
return 59100;
} 
//
this.GOSUBCONT24 = function() {
return 42290;
} 
//
this.line_42290 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_16;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP13","VAR_I");
return "FORLOOP13";
} 
//
this.FORLOOP13 = function() {
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.X_REG=this.X_REG*Math.pow(2,this.A_REG);
this.A_REG=this.CONST_2;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_AC_int_array;
this.ARRAYSTORE_INTEGER();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 42300;
} 
//
this.line_42300 = function() {
//
this.GOSUB("GOSUBCONT25");
return 43400;
} 
//
this.GOSUBCONT25 = function() {
return 42330;
} 
//
this.line_42330 = function() {
//
return "RETURN";
} 
//
this.line_42400 = function() {
//
return 42410;
} 
//
this.line_42410 = function() {
//
this.Y_REG=this.CONST_60;
this.X_REG=this.VAR_I;
this.X_REG=(this.X_REG>=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP40";}
return "SKIP40";
} 
//
this.NSKIP40 = function() {
return "RETURN";
//
return 42420;
} 
//
this.SKIP40 = function() {
return 42420;
} 
//
this.line_42420 = function() {
//
this.A_REG=this.CONST_61;
this.STROUT();
this.LINEBREAK();
//
return 49100;
} 
//
this.line_42500 = function() {
//
return 42510;
} 
//
this.line_42510 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP14","VAR_I");
return "FORLOOP14";
} 
//
this.FORLOOP14 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_RV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP41";}
return "SKIP41";
} 
//
this.NSKIP41 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
//
this.Y_REG=this.VAR_C_int;
this.G_REG=this.VAR_RV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_53;
this.VAR_I=this.Y_REG;
//
return 42520;
} 
//
this.SKIP41 = function() {
return 42520;
} 
//
this.line_42520 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.GOSUB("GOSUBCONT26");
return 42400;
} 
//
this.GOSUBCONT26 = function() {
return 42530;
} 
//
this.line_42530 = function() {
//
this.GOSUB("GOSUBCONT27");
return 62600;
} 
//
this.GOSUBCONT27 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return "RETURN";
} 
//
this.line_42600 = function() {
//
return 42605;
} 
//
this.line_42605 = function() {
//
this._memory[646]=Math.floor(this.CONST_16) & 255;
//
this.X_REG=this.VAR_C_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.A_REG=this.CONST_62;
this.STROUT();
this.LINEBREAK();
return 42610;
} 
//
this.line_42610 = function() {
//
this.GOSUB("GOSUBCONT28");
return 42650;
} 
//
this.GOSUBCONT28 = function() {
return 42615;
} 
//
this.line_42615 = function() {
//
this.X_REG=this.CONST_63;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP42";}
return "SKIP42";
} 
//
this.NSKIP42 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return "RETURN";
//
//
return 42620;
} 
//
this.SKIP42 = function() {
return 42620;
} 
//
this.line_42620 = function() {
//
this.GOSUB("GOSUBCONT29");
return 62600;
} 
//
this.GOSUBCONT29 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return "RETURN";
} 
//
this.line_42650 = function() {
//
return 42660;
} 
//
this.line_42660 = function() {
//
this.Y_REG=this.VAR_IC_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_C_int;
this.G_REG=this.VAR_IV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_IC_int=this.X_REG;
this.VAR_IC_int=Math.floor(this.VAR_IC_int);
//
this.Y_REG=this.VAR_C_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_1;
this.G_REG=this.VAR_RS_int_array;
this.ARRAYSTORE_INTEGER();
//
return "RETURN";
} 
//
this.line_42700 = function() {
//
return 42710;
} 
//
this.line_42710 = function() {
//
this.Y_REG=this.CONST_64;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OG_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_P=this.X_REG;
//
this.Y_REG=this.CONST_65;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OG_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_PP=this.X_REG;
//
this.GOSUB("GOSUBCONT30");
return 42900;
} 
//
this.GOSUBCONT30 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP43";}
return "SKIP43";
} 
//
this.NSKIP43 = function() {
return "RETURN";
//
return 42730;
} 
//
this.SKIP43 = function() {
return 42730;
} 
//
this.line_42730 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_66;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OG_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_UQ_int=this.X_REG;
this.VAR_UQ_int=Math.floor(this.VAR_UQ_int);
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_UQ_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP44";}
return "SKIP44";
} 
//
this.NSKIP44 = function() {
return 42780;
//
//
return 42740;
} 
//
this.SKIP44 = function() {
return 42740;
} 
//
this.line_42740 = function() {
//
this.GOSUB("GOSUBCONT31");
return 43000;
} 
//
this.GOSUBCONT31 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP45";}
return "SKIP45";
} 
//
this.NSKIP45 = function() {
return "RETURN";
//
return 42780;
} 
//
this.SKIP45 = function() {
return 42780;
} 
//
this.line_42780 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_63;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP15","VAR_I");
return "FORLOOP15";
} 
//
this.FORLOOP15 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_64;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_OG$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP46";}
return "SKIP46";
} 
//
this.NSKIP46 = function() {
//
this.Y_REG=this.CONST_63;
this.VAR_I=this.Y_REG;
return 42800;
//
return 42790;
} 
//
this.SKIP46 = function() {
return 42790;
} 
//
this.line_42790 = function() {
//
this.GOSUB("GOSUBCONT32");
return 59100;
} 
//
this.GOSUBCONT32 = function() {
return 42800;
} 
//
this.line_42800 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_16;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP16","VAR_I");
return "FORLOOP16";
} 
//
this.FORLOOP16 = function() {
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_64;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_T2_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_OG_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_AC_int_array;
this.ARRAYSTORE_INTEGER();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 42810;
} 
//
this.line_42810 = function() {
//
this.GOSUB("GOSUBCONT33");
return 43400;
} 
//
this.GOSUBCONT33 = function() {
return 42830;
} 
//
this.line_42830 = function() {
//
return "RETURN";
} 
//
this.line_42900 = function() {
//
return 42910;
} 
//
this.line_42910 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.X_REG=this.CONST_2;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.X_REG=this.CONST_6;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C2_int=this.X_REG;
this.VAR_C2_int=Math.floor(this.VAR_C2_int);
return 42920;
} 
//
this.line_42920 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_PP;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP47";}
return "SKIP47";
} 
//
this.NSKIP47 = function() {
return 42950;
//
return 42930;
} 
//
this.SKIP47 = function() {
return 42930;
} 
//
this.line_42930 = function() {
//
this.Y_REG=this.VAR_C_int;
this.X_REG=this.VAR_P;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP48";}
return "SKIP48";
} 
//
this.NSKIP48 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C2_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP49";}
return "SKIP49";
} 
//
this.NSKIP49 = function() {
this.GOSUB("GOSUBCONT34");
return 43500;
} 
//
this.GOSUBCONT34 = function() {
//
return "SKIP48";
} 
//
this.SKIP49 = function() {
//
return 42940;
} 
//
this.SKIP48 = function() {
return 42940;
} 
//
this.line_42940 = function() {
//
return "RETURN";
} 
//
this.line_42950 = function() {
//
this.Y_REG=this.VAR_C_int;
this.X_REG=this.VAR_PP;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_C2_int;
this.X_REG=this.VAR_P;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) & Math.floor(this.Y_REG);
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_C2_int;
this.X_REG=this.VAR_PP;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_C_int;
this.X_REG=this.VAR_P;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) & Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP50";}
return "SKIP50";
} 
//
this.NSKIP50 = function() {
this.GOSUB("GOSUBCONT35");
return 43500;
} 
//
this.GOSUBCONT35 = function() {
//
return 42960;
} 
//
this.SKIP50 = function() {
return 42960;
} 
//
this.line_42960 = function() {
//
return "RETURN";
} 
//
this.line_43000 = function() {
//
return 43010;
} 
//
this.line_43010 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.GOSUB("GOSUBCONT36");
return 43100;
} 
//
this.GOSUBCONT36 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_OD_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP51";}
return "SKIP51";
} 
//
this.NSKIP51 = function() {
return 43050;
//
return 43030;
} 
//
this.SKIP51 = function() {
return 43030;
} 
//
this.line_43030 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OD_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP17","VAR_I");
return "FORLOOP17";
} 
//
this.FORLOOP17 = function() {
//
this.B_REG=this.VAR_TF$;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_OD$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP52";}
return "SKIP52";
} 
//
this.NSKIP52 = function() {
//
this.Y_REG=this.CONST_4;
this.VAR_ER=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return "RETURN";
//
return 43040;
} 
//
this.SKIP52 = function() {
return 43040;
} 
//
this.line_43040 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 43050;
} 
//
this.line_43050 = function() {
//
this.GOSUB("GOSUBCONT37");
return 43150;
} 
//
this.GOSUBCONT37 = function() {
//
return "RETURN";
} 
//
this.line_43100 = function() {
//
return 43110;
} 
//
this.line_43110 = function() {
//
this.Y_REG=this.VAR_C_int;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_C2_int;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.VAR_P;
this.X_REG=this.VAR_I;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP53";}
return "SKIP53";
} 
//
this.NSKIP53 = function() {
//
this.Y_REG=this.VAR_I;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.VAR_C2_int;
this.VAR_I=this.Y_REG;
//
//
return 43120;
} 
//
this.SKIP53 = function() {
return 43120;
} 
//
this.line_43120 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_P;
// ignored: CHGCTX #1
this.STR();
this._stack.push(this.A_REG);
// ignored: CHGCTX #0
this.Y_REG=this.VAR_I;
// ignored: CHGCTX #1
this.STR();
this._stack.push(this.A_REG);
this.B_REG=this.CONST_67;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.Y_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.STR();
this.B_REG=this._stack.pop();
this.CONCAT();
this.B_REG=this._stack.pop();
this.CONCAT();
this.B_REG=this.CONST_67;
this.CONCAT();
this.B_REG=this._stack.pop();
this.CONCAT();
this.VAR_TF$=this.A_REG;
return 43125;
} 
//
this.line_43125 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_TF$;
this.LEN();
this.Y_REG=this.CONST_2;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_TF$;
this.RIGHT();
this.VAR_TF$=this.A_REG;
//
return "RETURN";
} 
//
this.line_43150 = function() {
//
return 43160;
} 
//
this.line_43160 = function() {
//
this.Y_REG=this.VAR_OD_int;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_TF$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OD$_array;
this.ARRAYSTORE_STRING();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OD_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_OD_int=this.X_REG;
this.VAR_OD_int=Math.floor(this.VAR_OD_int);
//
this.Y_REG=this.VAR_MX_int;
this.X_REG=this.VAR_OD_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP54";}
return "SKIP54";
} 
//
this.NSKIP54 = function() {
return 42420;
//
return 43165;
} 
//
this.SKIP54 = function() {
return 43165;
} 
//
this.line_43165 = function() {
//
this.Y_REG=this.CONST_16;
this.X_REG=this.VAR_PO_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_PO_int=this.X_REG;
this.VAR_PO_int=Math.floor(this.VAR_PO_int);
//
this.GOSUB("GOSUBCONT38");
return 63005;
} 
//
this.GOSUBCONT38 = function() {
//
this._memory[646]=Math.floor(this.CONST_4) & 255;
return 43170;
} 
//
this.line_43170 = function() {
//
return "RETURN";
} 
//
this.line_43200 = function() {
//
return 43210;
} 
//
this.line_43210 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP55";}
return "SKIP55";
} 
//
this.NSKIP55 = function() {
return "RETURN";
//
return 43220;
} 
//
this.SKIP55 = function() {
return 43220;
} 
//
this.line_43220 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP18","VAR_II");
return 43230;
} 
//
this.FORLOOP18 = function() {
return 43230;
} 
//
this.line_43230 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_C_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP56";}
return "SKIP56";
} 
//
this.NSKIP56 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP57";}
return "SKIP57";
} 
//
this.NSKIP57 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_2;
this.G_REG=this.VAR_UV_int_array;
this.ARRAYSTORE_INTEGER();
return "RETURN";
//
return "SKIP56";
} 
//
this.SKIP57 = function() {
//
return 43240;
} 
//
this.SKIP56 = function() {
return 43240;
} 
//
this.line_43240 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return "RETURN";
} 
//
this.line_43400 = function() {
//
return 43410;
} 
//
this.line_43410 = function() {
//
this.X_REG=this.CONST_52;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_RR_int=this.X_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.VAR_RR_int;
if ((this.Y_REG==this.CONST_1?0:1)==1) {
return "NSKIP58";}
return "SKIP58";
} 
//
this.NSKIP58 = function() {
this.GOSUB("GOSUBCONT39");
return 43800;
} 
//
this.GOSUBCONT39 = function() {
//
//
return 43420;
} 
//
this.SKIP58 = function() {
return 43430;
} 
//
this.line_43420 = function() {
//
return 43430;
} 
//
this.line_43430 = function() {
//
this.X_REG=this.CONST_4;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP59";}
return "SKIP59";
} 
//
this.NSKIP59 = function() {
this.GOSUB("GOSUBCONT40");
return 43200;
} 
//
this.GOSUBCONT40 = function() {
//
//
return 43435;
} 
//
this.SKIP59 = function() {
return 43435;
} 
//
this.line_43435 = function() {
//
this.X_REG=this.CONST_55;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP60";}
return "SKIP60";
} 
//
this.NSKIP60 = function() {
this.GOSUB("GOSUBCONT41");
return 43900;
} 
//
this.GOSUBCONT41 = function() {
//
//
return 43440;
} 
//
this.SKIP60 = function() {
return 43440;
} 
//
this.line_43440 = function() {
//
this.X_REG=this.CONST_63;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP61";}
return "SKIP61";
} 
//
this.NSKIP61 = function() {
this.GOSUB("GOSUBCONT42");
return 42500;
} 
//
this.GOSUBCONT42 = function() {
//
//
return 43450;
} 
//
this.SKIP61 = function() {
return 43450;
} 
//
this.line_43450 = function() {
//
this.X_REG=this.CONST_68;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP62";}
return "SKIP62";
} 
//
this.NSKIP62 = function() {
this.GOSUB("GOSUBCONT43");
return 42600;
} 
//
this.GOSUBCONT43 = function() {
//
//
return 43455;
} 
//
this.SKIP62 = function() {
return 43455;
} 
//
this.line_43455 = function() {
//
this.X_REG=this.CONST_69;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP63";}
return "SKIP63";
} 
//
this.NSKIP63 = function() {
this.GOSUB("GOSUBCONT44");
return 44000;
} 
//
this.GOSUBCONT44 = function() {
//
//
return 43460;
} 
//
this.SKIP63 = function() {
return 43460;
} 
//
this.line_43460 = function() {
//
this.X_REG=this.CONST_16;
this.G_REG=this.VAR_AC_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP64";}
return "SKIP64";
} 
//
this.NSKIP64 = function() {
this.GOSUB("GOSUBCONT45");
return 44200;
} 
//
this.GOSUBCONT45 = function() {
//
//
return 43490;
} 
//
this.SKIP64 = function() {
return 43490;
} 
//
this.line_43490 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
return "RETURN";
} 
//
this.line_43500 = function() {
//
return 43510;
} 
//
this.line_43510 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_PP;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP65";}
return "SKIP65";
} 
//
this.NSKIP65 = function() {
return 43530;
//
return 43520;
} 
//
this.SKIP65 = function() {
return 43520;
} 
//
this.line_43520 = function() {
//
this.Y_REG=this.VAR_C2_int;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.GOSUB("GOSUBCONT46");
return 43600;
} 
//
this.GOSUBCONT46 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP66";}
return "SKIP66";
} 
//
this.NSKIP66 = function() {
return "RETURN";
//
return 43530;
} 
//
this.SKIP66 = function() {
return 43530;
} 
//
this.line_43530 = function() {
//
this.Y_REG=this.VAR_C_int;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.GOSUB("GOSUBCONT47");
return 43600;
} 
//
this.GOSUBCONT47 = function() {
//
return "RETURN";
} 
//
this.line_43600 = function() {
//
return 43610;
} 
//
this.line_43610 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP67";}
return "SKIP67";
} 
//
this.NSKIP67 = function() {
return 43670;
//
return 43620;
} 
//
this.SKIP67 = function() {
return 43620;
} 
//
this.line_43620 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP19","VAR_I");
return 43630;
} 
//
this.FORLOOP19 = function() {
return 43630;
} 
//
this.line_43630 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_RR_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP68";}
return "SKIP68";
} 
//
this.NSKIP68 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP69";}
return "SKIP69";
} 
//
this.NSKIP69 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return "RETURN";
//
return "SKIP68";
} 
//
this.SKIP69 = function() {
//
return 43640;
} 
//
this.SKIP68 = function() {
return 43640;
} 
//
this.line_43640 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 43670;
} 
//
this.line_43670 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_TC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP70";}
return "SKIP70";
} 
//
this.NSKIP70 = function() {
return 43710;
//
return 43680;
} 
//
this.SKIP70 = function() {
return 43680;
} 
//
this.line_43680 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP20","VAR_I");
return 43690;
} 
//
this.FORLOOP20 = function() {
return 43690;
} 
//
this.line_43690 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_RR_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP71";}
return "SKIP71";
} 
//
this.NSKIP71 = function() {
//
this.X_REG=this.VAR_RR_int;
this.G_REG=this.VAR_MV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP72";}
return "SKIP72";
} 
//
this.NSKIP72 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return "RETURN";
//
return "SKIP71";
} 
//
this.SKIP72 = function() {
//
return 43700;
} 
//
this.SKIP71 = function() {
return 43700;
} 
//
this.line_43700 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 43710;
} 
//
this.line_43710 = function() {
//
this.GOSUB("GOSUBCONT48");
return 53450;
} 
//
this.GOSUBCONT48 = function() {
//
return "RETURN";
} 
//
this.line_43800 = function() {
//
return 43810;
} 
//
this.line_43810 = function() {
//
this.Y_REG=this.VAR_C_int;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.GOSUB("GOSUBCONT49");
return 43200;
} 
//
this.GOSUBCONT49 = function() {
//
this.Y_REG=this.VAR_C2_int;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT50");
return 43200;
} 
//
this.GOSUBCONT50 = function() {
//
this.Y_REG=this.VAR_RR_int;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
return "RETURN";
} 
//
this.line_43900 = function() {
//
return 43910;
} 
//
this.line_43910 = function() {
//
this.GOSUB("GOSUBCONT51");
return 42650;
} 
//
this.GOSUBCONT51 = function() {
//
return 43920;
} 
//
this.line_43920 = function() {
//
this.GOSUB("GOSUBCONT52");
return 43200;
} 
//
this.GOSUBCONT52 = function() {
//
return 43930;
} 
//
this.line_43930 = function() {
//
return "RETURN";
} 
//
this.line_44000 = function() {
//
return 44010;
} 
//
this.line_44010 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_4;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP21","VAR_I");
return "FORLOOP21";
} 
//
this.FORLOOP21 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_LX$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this.A_REG;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP73";}
return "SKIP73";
} 
//
this.NSKIP73 = function() {
return 44040;
//
return 44020;
} 
//
this.SKIP73 = function() {
return 44020;
} 
//
this.line_44020 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.X_REG=this.VAR_C_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_DR$_array;
this.ARRAYACCESS_STRING();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_LX$_array;
this.ARRAYSTORE_STRING();
return 44030;
} 
//
this.line_44030 = function() {
//
this.GOSUB("GOSUBCONT53");
return 62500;
} 
//
this.GOSUBCONT53 = function() {
//
this.Y_REG=this.CONST_53;
this.VAR_I=this.Y_REG;
return 44040;
} 
//
this.line_44040 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.GOSUB("GOSUBCONT54");
return 42400;
} 
//
this.GOSUBCONT54 = function() {
return 44060;
} 
//
this.line_44060 = function() {
//
return "RETURN";
} 
//
this.line_44200 = function() {
//
return 44210;
} 
//
this.line_44210 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_C_int;
// ignored: CHGCTX #1
this.STR();
this.VAR_A$=this.A_REG;
//
this.COMPACTMAX();
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_2;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.RIGHT();
this.B_REG=this.A_REG;
this.A_REG=this.CONST_70;
this.CONCAT();
this.B_REG=this.CONST_71;
this.CONCAT();
this.VAR_RN$=this.A_REG;
return 44220;
} 
//
this.line_44220 = function() {
//
this.LINEBREAK();
//
this.GOSUB("GOSUBCONT55");
return 40100;
} 
//
this.GOSUBCONT55 = function() {
//
return "RETURN";
} 
//
this.line_45000 = function() {
//
return 45010;
} 
//
this.line_45010 = function() {
//
this._memory[646]=Math.floor(this.CONST_16) & 255;
//
this.A_REG=this.CONST_72;
this.STROUT();
this.LINEBREAK();
//
this.LINEBREAK();
return 45020;
} 
//
this.line_45020 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_TB_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP22","VAR_I");
return "FORLOOP22";
} 
//
this.FORLOOP22 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_A$=this.B_REG;
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_55;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP23","VAR_II");
return "FORLOOP23";
} 
//
this.FORLOOP23 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CM$_array;
this.ARRAYACCESS_STRING();
this.VAR_B$=this.A_REG;
return 45030;
} 
//
this.line_45030 = function() {
//
this.B_REG=this.VAR_B$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP74";}
return "SKIP74";
} 
//
this.NSKIP74 = function() {
//
this.Y_REG=this.CONST_63;
this.VAR_II=this.Y_REG;
return 45060;
//
return 45040;
} 
//
this.SKIP74 = function() {
return 45040;
} 
//
this.line_45040 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_II;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP75";}
return "SKIP75";
} 
//
this.NSKIP75 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_73;
this.A_REG=this.VAR_A$;
this.CONCAT();
this.VAR_A$=this.A_REG;
//
return 45050;
} 
//
this.SKIP75 = function() {
return 45050;
} 
//
this.line_45050 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_B$;
this.A_REG=this.VAR_A$;
this.CONCAT();
this.VAR_A$=this.A_REG;
return 45060;
} 
//
this.line_45060 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.GOSUB("GOSUBCONT56");
return 59100;
} 
//
this.GOSUBCONT56 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return "RETURN";
} 
//
this.line_45100 = function() {
//
return 45110;
} 
//
this.line_45110 = function() {
//
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_DN_int;
this._stack.push(this.Y_REG);
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.B_REG=this.VAR_SX$;
this.G_REG=this.B_REG;
this.D_REG=this._stack.pop();
this.C_REG=this._stack.pop();
this.X_REG=this._stack.pop();
this.Y_REG=this.CONST_55;
this.OPEN();
//
return "RETURN";
} 
//
this.line_45200 = function() {
//
return 45210;
} 
//
this.line_45210 = function() {
//
this.B_REG=this.CONST_74;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP76";}
return "SKIP76";
} 
//
this.NSKIP76 = function() {
//
this.B_REG=this.CONST_75;
this.VAR_A$=this.B_REG;
//
return 45220;
} 
//
this.SKIP76 = function() {
return 45220;
} 
//
this.line_45220 = function() {
//
return "RETURN";
} 
//
this.line_48000 = function() {
//
return 48010;
} 
//
this.line_48010 = function() {
//
this.A_REG=this.CONST_76;
this.STROUT();
return 48015;
} 
//
this.line_48015 = function() {
//
this.B_REG=this.CONST_77;
this.VAR_SX$=this.B_REG;
//
this.GOSUB("GOSUBCONT57");
return 45100;
} 
//
this.GOSUBCONT57 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_GC_int=this.Y_REG;
this.VAR_GC_int=Math.floor(this.VAR_GC_int);
return 48020;
} 
//
this.line_48020 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_16;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP24","VAR_I");
return 48030;
} 
//
this.FORLOOP24 = function() {
return 48030;
} 
//
this.line_48030 = function() {
//
this.GOSUB("GOSUBCONT58");
return 61700;
} 
//
this.GOSUBCONT58 = function() {
//
this.GOSUB("GOSUBCONT59");
return 45200;
} 
//
this.GOSUBCONT59 = function() {
return 48040;
} 
//
this.line_48040 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_64;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_GC_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.VAL();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OG_int_array;
this.ARRAYSTORE_INTEGER();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 48050;
} 
//
this.line_48050 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_63;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP25","VAR_I");
return "FORLOOP25";
} 
//
this.FORLOOP25 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_64;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_GC_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.CONST_11;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OG$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
return 48060;
} 
//
this.line_48060 = function() {
//
this.GOSUB("GOSUBCONT60");
return 61700;
} 
//
this.GOSUBCONT60 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_TX$=this.B_REG;
//
this.COMPACTMAX();
this.Y_REG=this.CONST_78;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
return 48070;
} 
//
this.line_48070 = function() {
//
this.B_REG=this.CONST_56;
this.A_REG=this.VAR_TX$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP77";}
return "SKIP77";
} 
//
this.NSKIP77 = function() {
return 48090;
//
return 48080;
} 
//
this.SKIP77 = function() {
return 48080;
} 
//
this.line_48080 = function() {
//
this.GOSUB("GOSUBCONT61");
return 61000;
} 
//
this.GOSUBCONT61 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_64;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_GC_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.VAR_TX$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OG$_array;
this.ARRAYSTORE_STRING();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_II;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_II=this.X_REG;
//
return 48060;
} 
//
this.line_48090 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_GC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_GC_int=this.X_REG;
this.VAR_GC_int=Math.floor(this.VAR_GC_int);
//
this.Y_REG=this.CONST_79;
this.READSTATUS();
this.X_REG=this.tmpy;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP78";}
return "SKIP78";
} 
//
this.NSKIP78 = function() {
return 48020;
//
return 48100;
} 
//
this.SKIP78 = function() {
return 48100;
} 
//
this.line_48100 = function() {
//
this.A_REG=this.CONST_80;
this.STROUT();
this.LINEBREAK();
return 48105;
} 
//
this.line_48105 = function() {
//
this.Y_REG=this.VAR_MO_int;
this.X_REG=this.VAR_GC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP79";}
return "SKIP79";
} 
//
this.NSKIP79 = function() {
return 42420;
//
return 48110;
} 
//
this.SKIP79 = function() {
return 48110;
} 
//
this.line_48110 = function() {
//
this.X_REG=this.CONST_6;
this.CLOSE();
//
return "RETURN";
} 
//
this.line_49000 = function() {
//
return 49005;
} 
//
this.line_49005 = function() {
//
this.GETSTR();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.CONST_81;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_82;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP80";}
return "SKIP80";
} 
//
this.NSKIP80 = function() {
return 49100;
//
return 49010;
} 
//
this.SKIP80 = function() {
return 49010;
} 
//
this.line_49010 = function() {
//
return 49000;
} 
//
this.line_49100 = function() {
//
return 49110;
} 
//
this.line_49110 = function() {
//
this.END();
return;
} 
//
this.line_49900 = function() {
//
return 49910;
} 
//
this.line_49910 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP26","VAR_I");
return "FORLOOP26";
} 
//
this.FORLOOP26 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_7;
this.G_REG=this.VAR_CV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
//
this.A_REG=this.CONST_11;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_CP$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.VAR_SF_int=this.Y_REG;
this.VAR_SF_int=Math.floor(this.VAR_SF_int);
//
return "RETURN";
} 
//
this.line_50000 = function() {
//
return 50002;
} 
//
this.line_50002 = function() {
//
this.Y_REG=this.VAR_LR_int;
this.X_REG=this.VAR_RD_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP81";}
return "SKIP81";
} 
//
this.NSKIP81 = function() {
return 49000;
//
return 50005;
} 
//
this.SKIP81 = function() {
return 50005;
} 
//
this.line_50005 = function() {
//
this.GOSUB("GOSUBCONT62");
return 49900;
} 
//
this.GOSUBCONT62 = function() {
return 50010;
} 
//
this.line_50010 = function() {
//
this._memory[646]=Math.floor(this.CONST_63) & 255;
//
this.A_REG=this.VAR_CB$;
this.STROUT();
//
this.B_REG=this.CONST_11;
this.VAR_CC$=this.B_REG;
//
this._memory[646]=Math.floor(this.CONST_2) & 255;
return 50012;
} 
//
this.line_50012 = function() {
//
this.B_REG=this.VAR_LC$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP82";}
return "SKIP82";
} 
//
this.NSKIP82 = function() {
//
this.B_REG=this.VAR_LC$;
this.VAR_CC$=this.B_REG;
//
this.A_REG=this.VAR_LC$;
this.STROUT();
this.LINEBREAK();
return 50020;
//
return 50015;
} 
//
this.SKIP82 = function() {
return 50015;
} 
//
this.line_50015 = function() {
//
this.GOSUB("GOSUBCONT63");
return 63000;
} 
//
this.GOSUBCONT63 = function() {
//
this._memory[19]=Math.floor(this.CONST_2) & 255;
//
return "INPUT0";
} 
//
this.INPUT0 = function() {
this.CLEARQUEUE();
this.COMPACTMAX();
this.A_REG=this.CONST_11;
this.STROUT();
this.QMARKOUT1();
return "INPUTWAIT0";
} 
//
this.INPUTWAIT0 = function() {
this.INPUTSTR();
this.INPUTLENGTHCHECK();
if (this._zeroflag==0) {
return "EMPTYINPUTSKIP1";}
this.VAR_CC$=this.A_REG;
return "EMPTYINPUTSKIP1";
} 
//
this.EMPTYINPUTSKIP1 = function() {
this.QUEUESIZE();
if ((this.X_REG==this.CONST_1?0:1)==0) {
return "INPUTCHECK0";}
this.EXTRAIGNORED();
return "INPUTCHECK0";
} 
//
this.INPUTCHECK0 = function() {
//
this._memory[19]=Math.floor(this.CONST_1) & 255;
//
this.LINEBREAK();
return 50020;
} 
//
this.line_50020 = function() {
//
this._memory[646]=Math.floor(this.CONST_4) & 255;
//
this.B_REG=this.CONST_11;
this.VAR_CT$=this.B_REG;
//
this.B_REG=this.CONST_11;
this.VAR_LC$=this.B_REG;
//
this.B_REG=this.VAR_CC$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP83";}
return "SKIP83";
} 
//
this.NSKIP83 = function() {
//
this.B_REG=this.CONST_83;
this.VAR_CC$=this.B_REG;
//
return 50030;
} 
//
this.SKIP83 = function() {
return 50030;
} 
//
this.line_50030 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_ER=this.Y_REG;
//
this.B_REG=this.VAR_CC$;
this.VAR_TX$=this.B_REG;
//
this.GOSUB("GOSUBCONT64");
return 63100;
} 
//
this.GOSUBCONT64 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_84;
this.A_REG=this.VAR_TX$;
this.CONCAT();
this.VAR_CC$=this.A_REG;
//
return 50035;
} 
//
this.line_50035 = function() {
//
this.GOSUB("GOSUBCONT65");
return 41000;
} 
//
this.GOSUBCONT65 = function() {
return 50040;
} 
//
this.line_50040 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_CC_int=this.Y_REG;
this.VAR_CC_int=Math.floor(this.VAR_CC_int);
//
this.Y_REG=this.CONST_2;
this.VAR_I_int=this.Y_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
return 50042;
} 
//
this.line_50042 = function() {
//
this.COMPACTMAX();
this.C_REG=this.VAR_I_int;
this.D_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_CC$;
this.MID();
this.VAR_C$=this.A_REG;
//
this.B_REG=this.VAR_C$;
// ignored: CHGCTX #0
this.ASC();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
return 50045;
} 
//
this.line_50045 = function() {
//
this.Y_REG=this.CONST_85;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP84";}
return "SKIP84";
} 
//
this.NSKIP84 = function() {
//
this.Y_REG=this.CONST_86;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
//
return 50050;
} 
//
this.SKIP84 = function() {
return 50050;
} 
//
this.line_50050 = function() {
//
this.Y_REG=this.CONST_87;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_88;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP85";}
return "SKIP85";
} 
//
this.NSKIP85 = function() {
//
this.Y_REG=this.CONST_89;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_90;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP86";}
return "SKIP86";
} 
//
this.NSKIP86 = function() {
//
this.Y_REG=this.CONST_86;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP87";}
return "SKIP87";
} 
//
this.NSKIP87 = function() {
return 50100;
//
return "SKIP86";
} 
//
this.SKIP87 = function() {
//
return "SKIP85";
} 
//
this.SKIP86 = function() {
//
return 50060;
} 
//
this.SKIP85 = function() {
return 50060;
} 
//
this.line_50060 = function() {
//
this.Y_REG=this.CONST_86;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP88";}
return "SKIP88";
} 
//
this.NSKIP88 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_C$;
this.A_REG=this.VAR_CT$;
this.CONCAT();
this.VAR_CT$=this.A_REG;
return 50080;
//
return 50070;
} 
//
this.SKIP88 = function() {
return 50070;
} 
//
this.line_50070 = function() {
//
this.B_REG=this.VAR_CT$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP89";}
return "SKIP89";
} 
//
this.NSKIP89 = function() {
this.GOSUB("GOSUBCONT66");
return 50500;
} 
//
this.GOSUBCONT66 = function() {
//
return 50080;
} 
//
this.SKIP89 = function() {
return 50080;
} 
//
this.line_50080 = function() {
//
this.Y_REG=this.CONST_52;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP90";}
return "SKIP90";
} 
//
this.NSKIP90 = function() {
return 50110;
//
return 50100;
} 
//
this.SKIP90 = function() {
return 50100;
} 
//
this.line_50100 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_I_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_I_int=this.X_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
//
this.B_REG=this.VAR_CC$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.X_REG;
this.X_REG=this.VAR_I_int;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP91";}
return "SKIP91";
} 
//
this.NSKIP91 = function() {
return 50042;
//
return 50110;
} 
//
this.SKIP91 = function() {
return 50110;
} 
//
this.line_50110 = function() {
//
this.Y_REG=this.VAR_CC_int;
this.VAR_PP_int=this.Y_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.Y_REG=this.VAR_CC_int;
this.VAR_CO_int=this.Y_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.Y_REG=this.CONST_1;
this.VAR_CC_int=this.Y_REG;
this.VAR_CC_int=Math.floor(this.VAR_CC_int);
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PP_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP27","VAR_I");
return 50120;
} 
//
this.FORLOOP27 = function() {
return 50120;
} 
//
this.line_50120 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CP$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
//
this.Y_REG=this.CONST_7;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_4;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP92";}
return "SKIP92";
} 
//
this.NSKIP92 = function() {
return 50155;
//
return 50130;
} 
//
this.SKIP92 = function() {
return 50130;
} 
//
this.line_50130 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.VAR_TB_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP28","VAR_P");
return "FORLOOP28";
} 
//
this.FORLOOP28 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.VAR_MS_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP29","VAR_II");
return "FORLOOP29";
} 
//
this.FORLOOP29 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_P;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CM$_array;
this.ARRAYACCESS_STRING();
this.VAR_B$=this.A_REG;
return 50135;
} 
//
this.line_50135 = function() {
//
this.B_REG=this.VAR_B$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP93";}
return "SKIP93";
} 
//
this.NSKIP93 = function() {
//
this.Y_REG=this.CONST_53;
this.VAR_II=this.Y_REG;
return 50150;
//
return 50140;
} 
//
this.SKIP93 = function() {
return 50140;
} 
//
this.line_50140 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_B$;
this.LEFT();
this.B_REG=this.A_REG;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP94";}
return "SKIP94";
} 
//
this.NSKIP94 = function() {
//
this.Y_REG=this.VAR_P;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.CONST_53;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_53;
this.VAR_P=this.Y_REG;
//
return 50150;
} 
//
this.SKIP94 = function() {
return 50150;
} 
//
this.line_50150 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
//
this.NEXT("VAR_P");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 50155;
} 
//
this.line_50155 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP95";}
return "SKIP95";
} 
//
this.NSKIP95 = function() {
//
this.X_REG=this.CONST_1;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP96";}
return "SKIP96";
} 
//
this.NSKIP96 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_ER=this.Y_REG;
return "RETURN";
//
return "SKIP95";
} 
//
this.SKIP96 = function() {
//
return 50160;
} 
//
this.SKIP95 = function() {
return 50160;
} 
//
this.line_50160 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP97";}
return "SKIP97";
} 
//
this.NSKIP97 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_T_int;
this.G_REG=this.VAR_CV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_7;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return 50230;
//
return 50170;
} 
//
this.SKIP97 = function() {
return 50170;
} 
//
this.line_50170 = function() {
//
this.GOSUB("GOSUBCONT67");
return 50400;
} 
//
this.GOSUBCONT67 = function() {
return 50185;
} 
//
this.line_50185 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP98";}
return "SKIP98";
} 
//
this.NSKIP98 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_AA$=this.B_REG;
this.GOSUB("GOSUBCONT68");
return 50300;
} 
//
this.GOSUBCONT68 = function() {
this.GOSUB("GOSUBCONT69");
return 50400;
} 
//
this.GOSUBCONT69 = function() {
//
return 50186;
} 
//
this.SKIP98 = function() {
return 50186;
} 
//
this.line_50186 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP99";}
return "SKIP99";
} 
//
this.NSKIP99 = function() {
this.GOSUB("GOSUBCONT70");
return 50350;
} 
//
this.GOSUBCONT70 = function() {
this.GOSUB("GOSUBCONT71");
return 50400;
} 
//
this.GOSUBCONT71 = function() {
//
return 50188;
} 
//
this.SKIP99 = function() {
return 50188;
} 
//
this.line_50188 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP100";}
return "SKIP100";
} 
//
this.NSKIP100 = function() {
//
this.B_REG=this.VAR_AA$;
this.VAR_A$=this.B_REG;
this.GOSUB("GOSUBCONT72");
return 51000;
} 
//
this.GOSUBCONT72 = function() {
//
return 50190;
} 
//
this.SKIP100 = function() {
return 50190;
} 
//
this.line_50190 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP101";}
return "SKIP101";
} 
//
this.NSKIP101 = function() {
return 50230;
//
return 50200;
} 
//
this.SKIP101 = function() {
return 50200;
} 
//
this.line_50200 = function() {
//
this.X_REG=this.CONST_2;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP102";}
return "SKIP102";
} 
//
this.NSKIP102 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_T_int;
this.G_REG=this.VAR_CV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_7;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
return 50210;
} 
//
this.SKIP102 = function() {
return 50210;
} 
//
this.line_50210 = function() {
//
this.X_REG=this.CONST_6;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP103";}
return "SKIP103";
} 
//
this.NSKIP103 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_T_int;
this.G_REG=this.VAR_CV_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_7;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
return 50220;
} 
//
this.SKIP103 = function() {
return 50220;
} 
//
this.line_50220 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP104";}
return "SKIP104";
} 
//
this.NSKIP104 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_ER=this.Y_REG;
return "RETURN";
//
return 50230;
} 
//
this.SKIP104 = function() {
return 50230;
} 
//
this.line_50230 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return 50240;
} 
//
this.line_50240 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP30","VAR_I");
return "FORLOOP30";
} 
//
this.FORLOOP30 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_7;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP105";}
return "SKIP105";
} 
//
this.NSKIP105 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_CC_int=this.X_REG;
this.VAR_CC_int=Math.floor(this.VAR_CC_int);
return 50260;
//
return 50250;
} 
//
this.SKIP105 = function() {
return 50250;
} 
//
this.line_50250 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP106";}
return "SKIP106";
} 
//
this.NSKIP106 = function() {
//
this.Y_REG=this.CONST_6;
this.VAR_ER=this.Y_REG;
return "RETURN";
//
return 50260;
} 
//
this.SKIP106 = function() {
return 50260;
} 
//
this.line_50260 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 50270;
} 
//
this.line_50270 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_LO$=this.B_REG;
//
this.X_REG=this.CONST_2;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_I=this.X_REG;
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_I;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP107";}
return "SKIP107";
} 
//
this.NSKIP107 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.VAR_TX$=this.A_REG;
this.GOSUB("GOSUBCONT73");
return 63100;
} 
//
this.GOSUBCONT73 = function() {
//
this.B_REG=this.VAR_TX$;
this.VAR_LO$=this.B_REG;
//
return 50280;
} 
//
this.SKIP107 = function() {
return 50280;
} 
//
this.line_50280 = function() {
//
return "RETURN";
} 
//
this.line_50300 = function() {
//
return 50310;
} 
//
this.line_50310 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_37;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.C_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.RIGHT();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SNEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP108";}
return "SKIP108";
} 
//
this.NSKIP108 = function() {
return "RETURN";
//
return 50320;
} 
//
this.SKIP108 = function() {
return 50320;
} 
//
this.line_50320 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_2;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.LEFT();
this.VAR_A$=this.A_REG;
//
return "RETURN";
} 
//
this.line_50350 = function() {
//
return 50355;
} 
//
this.line_50355 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_6;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP109";}
return "SKIP109";
} 
//
this.NSKIP109 = function() {
return "RETURN";
//
return 50360;
} 
//
this.SKIP109 = function() {
return 50360;
} 
//
this.line_50360 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_91;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.C_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.RIGHT();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SNEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP110";}
return "SKIP110";
} 
//
this.NSKIP110 = function() {
return "RETURN";
//
return 50370;
} 
//
this.SKIP110 = function() {
return 50370;
} 
//
this.line_50370 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_2;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.LEFT();
this.VAR_A$=this.A_REG;
//
return "RETURN";
} 
//
this.line_50400 = function() {
//
return 50410;
} 
//
this.line_50410 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P_int=this.Y_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
return 50415;
} 
//
this.line_50415 = function() {
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.VAR_P_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IL$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP111";}
return "SKIP111";
} 
//
this.NSKIP111 = function() {
//
this.Y_REG=this.VAR_P_int;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return "RETURN";
//
return 50420;
} 
//
this.SKIP111 = function() {
return 50420;
} 
//
this.line_50420 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_P_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_P_int=this.X_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
//
this.Y_REG=this.VAR_TI_int;
this.X_REG=this.VAR_P_int;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP112";}
return "SKIP112";
} 
//
this.NSKIP112 = function() {
return 50415;
//
return 50430;
} 
//
this.SKIP112 = function() {
return 50430;
} 
//
this.line_50430 = function() {
//
return "RETURN";
} 
//
this.line_50500 = function() {
//
return 50505;
} 
//
this.line_50505 = function() {
//
this.GOSUB("GOSUBCONT74");
return 50600;
} 
//
this.GOSUBCONT74 = function() {
return 50510;
} 
//
this.line_50510 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_92;
this.A_REG=this.VAR_CT$;
// ignored: CHGCTX #0
this.SNEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP113";}
return "SKIP113";
} 
//
this.NSKIP113 = function() {
//
this.Y_REG=this.VAR_CC_int;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_CT$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_CP$_array;
this.ARRAYSTORE_STRING();
//
this.B_REG=this.CONST_11;
this.VAR_CT$=this.B_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_CC_int=this.X_REG;
this.VAR_CC_int=Math.floor(this.VAR_CC_int);
return "RETURN";
//
return 50520;
} 
//
this.SKIP113 = function() {
return 50520;
} 
//
this.line_50520 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_I_int;
this._stack.push(this.Y_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_CC$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_CC$;
this.RIGHT();
this.VAR_LC$=this.A_REG;
//
this.Y_REG=this.CONST_53;
this.VAR_I_int=this.Y_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
//
return "RETURN";
} 
//
this.line_50600 = function() {
//
return 50610;
} 
//
this.line_50610 = function() {
//
this.B_REG=this.VAR_CT$;
this.LEN();
this.Y_REG=this.CONST_4;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.B_REG=this.VAR_LO$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP114";}
return "SKIP114";
} 
//
this.NSKIP114 = function() {
return "RETURN";
//
return 50620;
} 
//
this.SKIP114 = function() {
return 50620;
} 
//
this.line_50620 = function() {
//
this.COMPACTMAX();
this.C_REG=this.CONST_6;
// ignored: CHGCTX #1
this.B_REG=this.VAR_CT$;
this.LEFT();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.CONST_93;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_94;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.CONST_95;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP115";}
return "SKIP115";
} 
//
this.NSKIP115 = function() {
//
this.B_REG=this.VAR_LO$;
this.VAR_CT$=this.B_REG;
//
return 50630;
} 
//
this.SKIP115 = function() {
return 50630;
} 
//
this.line_50630 = function() {
//
return "RETURN";
} 
//
this.line_51000 = function() {
//
return 51110;
} 
//
this.line_51110 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P_int=this.Y_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
return 51130;
} 
//
this.line_51130 = function() {
//
this.X_REG=this.VAR_P_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IL$_array;
this.ARRAYACCESS_STRING();
this.VAR_B$=this.A_REG;
//
this.GOSUB("GOSUBCONT75");
return 51920;
} 
//
this.GOSUBCONT75 = function() {
return 51140;
} 
//
this.line_51140 = function() {
//
this.Y_REG=this.CONST_7;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP116";}
return "SKIP116";
} 
//
this.NSKIP116 = function() {
return "RETURN";
//
return 51150;
} 
//
this.SKIP116 = function() {
return 51150;
} 
//
this.line_51150 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_P_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_P_int=this.X_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
//
this.Y_REG=this.VAR_TI_int;
this.X_REG=this.VAR_P_int;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP117";}
return "SKIP117";
} 
//
this.NSKIP117 = function() {
return 51130;
//
return 51160;
} 
//
this.SKIP117 = function() {
return 51160;
} 
//
this.line_51160 = function() {
//
return "RETURN";
} 
//
this.line_51920 = function() {
//
return 51925;
} 
//
this.line_51925 = function() {
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_B$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this._stack.pop();
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP118";}
return "SKIP118";
} 
//
this.NSKIP118 = function() {
return "RETURN";
//
return 51930;
} 
//
this.SKIP118 = function() {
return 51930;
} 
//
this.line_51930 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_DC_int=this.Y_REG;
this.VAR_DC_int=Math.floor(this.VAR_DC_int);
//
this.Y_REG=this.CONST_2;
this.VAR_PP_int=this.Y_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
return 51935;
} 
//
this.line_51935 = function() {
//
this.COMPACTMAX();
this.C_REG=this.VAR_PP_int;
this.D_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.MID();
this._stack.push(this.A_REG);
// ignored: CHGCTX #0
this.C_REG=this.VAR_PP_int;
// ignored: CHGCTX #1
this.B_REG=this.VAR_B$;
this.CHARAT();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP119";}
return "SKIP119";
} 
//
this.NSKIP119 = function() {
return 51970;
//
return 51940;
} 
//
this.SKIP119 = function() {
return 51940;
} 
//
this.line_51940 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_DC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_DC_int=this.X_REG;
this.VAR_DC_int=Math.floor(this.VAR_DC_int);
return 51945;
} 
//
this.line_51945 = function() {
//
this.B_REG=this.VAR_B$;
this.LEN();
this.Y_REG=this.CONST_55;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_DC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) & Math.floor(this.Y_REG);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_DC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP120";}
return "SKIP120";
} 
//
this.NSKIP120 = function() {
return "RETURN";
//
return 51970;
} 
//
this.SKIP120 = function() {
return 51970;
} 
//
this.line_51970 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PP_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_PP_int=this.X_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.B_REG=this.VAR_B$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.X_REG;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP121";}
return "SKIP121";
} 
//
this.NSKIP121 = function() {
return 51935;
//
return 51975;
} 
//
this.SKIP121 = function() {
return 51975;
} 
//
this.line_51975 = function() {
//
this.Y_REG=this.VAR_P_int;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
return "RETURN";
} 
//
this.line_52000 = function() {
//
return 52005;
} 
//
this.line_52005 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_1;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.Y_REG=this.CONST_1;
this.VAR_SK_int=this.Y_REG;
this.VAR_SK_int=Math.floor(this.VAR_SK_int);
return 52010;
} 
//
this.line_52010 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_ER;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP122";}
return "SKIP122";
} 
//
this.NSKIP122 = function() {
return "RETURN";
//
return 52012;
} 
//
this.SKIP122 = function() {
return 52012;
} 
//
this.line_52012 = function() {
//
this.X_REG=this.CONST_1;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_T_int;
this.X_REG=this.X_REG+this.Y_REG;
this.X_REG=Math.floor(this.X_REG);
return "ON0SUB0";
} 
//
this.ON0SUB0 = function() {
if ((this.X_REG==this.CONST_2?0:1)==1) {
return "AFTER0SUB0";}
return 52700;
} 
//
this.AFTER0SUB0 = function() {
return "ON0SUB1";
} 
//
this.ON0SUB1 = function() {
if ((this.X_REG==this.CONST_6?0:1)==1) {
return "AFTER0SUB1";}
return 52030;
} 
//
this.AFTER0SUB1 = function() {
return "ON0SUB2";
} 
//
this.ON0SUB2 = function() {
if ((this.X_REG==this.CONST_4?0:1)==1) {
return "AFTER0SUB2";}
return 52500;
} 
//
this.AFTER0SUB2 = function() {
return "ON0SUB3";
} 
//
this.ON0SUB3 = function() {
if ((this.X_REG==this.CONST_55?0:1)==1) {
return "AFTER0SUB3";}
return 52300;
} 
//
this.AFTER0SUB3 = function() {
return "ON0SUB4";
} 
//
this.ON0SUB4 = function() {
if ((this.X_REG==this.CONST_63?0:1)==1) {
return "AFTER0SUB4";}
return 52200;
} 
//
this.AFTER0SUB4 = function() {
return "ON0SUB5";
} 
//
this.ON0SUB5 = function() {
if ((this.X_REG==this.CONST_68?0:1)==1) {
return "AFTER0SUB5";}
return 52900;
} 
//
this.AFTER0SUB5 = function() {
return "ON0SUB6";
} 
//
this.ON0SUB6 = function() {
if ((this.X_REG==this.CONST_69?0:1)==1) {
return "AFTER0SUB6";}
return 53200;
} 
//
this.AFTER0SUB6 = function() {
return 52013;
} 
//
this.GSKIPON0 = function() {
return 52013;
} 
//
this.line_52013 = function() {
//
this.Y_REG=this.CONST_68;
this.X_REG=this.VAR_T_int;
this.X_REG=this.X_REG-this.Y_REG;
this.X_REG=Math.floor(this.X_REG);
return "ON1SUB0";
} 
//
this.ON1SUB0 = function() {
if ((this.X_REG==this.CONST_2?0:1)==1) {
return "AFTER1SUB0";}
return 53500;
} 
//
this.AFTER1SUB0 = function() {
return "ON1SUB1";
} 
//
this.ON1SUB1 = function() {
if ((this.X_REG==this.CONST_6?0:1)==1) {
return "AFTER1SUB1";}
return 53600;
} 
//
this.AFTER1SUB1 = function() {
return "ON1SUB2";
} 
//
this.ON1SUB2 = function() {
if ((this.X_REG==this.CONST_4?0:1)==1) {
return "AFTER1SUB2";}
return 53700;
} 
//
this.AFTER1SUB2 = function() {
return "ON1SUB3";
} 
//
this.ON1SUB3 = function() {
if ((this.X_REG==this.CONST_55?0:1)==1) {
return "AFTER1SUB3";}
return 53800;
} 
//
this.AFTER1SUB3 = function() {
return "ON1SUB4";
} 
//
this.ON1SUB4 = function() {
if ((this.X_REG==this.CONST_63?0:1)==1) {
return "AFTER1SUB4";}
return 53850;
} 
//
this.AFTER1SUB4 = function() {
return "ON1SUB5";
} 
//
this.ON1SUB5 = function() {
if ((this.X_REG==this.CONST_68?0:1)==1) {
return "AFTER1SUB5";}
return 53900;
} 
//
this.AFTER1SUB5 = function() {
return "ON1SUB6";
} 
//
this.ON1SUB6 = function() {
if ((this.X_REG==this.CONST_69?0:1)==1) {
return "AFTER1SUB6";}
return 54000;
} 
//
this.AFTER1SUB6 = function() {
return "ON1SUB7";
} 
//
this.ON1SUB7 = function() {
if ((this.X_REG==this.CONST_23?0:1)==1) {
return "AFTER1SUB7";}
return 53500;
} 
//
this.AFTER1SUB7 = function() {
return "ON1SUB8";
} 
//
this.ON1SUB8 = function() {
if ((this.X_REG==this.CONST_52?0:1)==1) {
return "AFTER1SUB8";}
return 53500;
} 
//
this.AFTER1SUB8 = function() {
return "ON1SUB9";
} 
//
this.ON1SUB9 = function() {
if ((this.X_REG==this.CONST_16?0:1)==1) {
return "AFTER1SUB9";}
return 45000;
} 
//
this.AFTER1SUB9 = function() {
return 52014;
} 
//
this.GSKIPON1 = function() {
return 52014;
} 
//
this.line_52014 = function() {
//
this.Y_REG=this.CONST_6;
this.VAR_ER=this.Y_REG;
//
return "RETURN";
} 
//
this.line_52022 = function() {
//
return 52030;
} 
//
this.line_52025 = function() {
//
return 52040;
} 
//
this.line_52030 = function() {
//
return 52040;
} 
//
this.line_52040 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CO_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP123";}
return "SKIP123";
} 
//
this.NSKIP123 = function() {
this.GOSUB("GOSUBCONT76");
return 59000;
} 
//
this.GOSUBCONT76 = function() {
return "RETURN";
//
return 52050;
} 
//
this.SKIP123 = function() {
return 52050;
} 
//
this.line_52050 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP124";}
return "SKIP124";
} 
//
this.NSKIP124 = function() {
return 52065;
//
return 52060;
} 
//
this.SKIP124 = function() {
return 52060;
} 
//
this.line_52060 = function() {
//
return 59150;
} 
//
this.line_52065 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_TC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP125";}
return "SKIP125";
} 
//
this.NSKIP125 = function() {
return 52085;
//
return 52066;
} 
//
this.SKIP125 = function() {
return 52066;
} 
//
this.line_52066 = function() {
//
this.GOSUB("GOSUBCONT77");
return 52150;
} 
//
this.GOSUBCONT77 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP126";}
return "SKIP126";
} 
//
this.NSKIP126 = function() {
return "RETURN";
//
return 52070;
} 
//
this.SKIP126 = function() {
return 52070;
} 
//
this.line_52070 = function() {
//
this.X_REG=this.CONST_2;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP31","VAR_I");
return "FORLOOP31";
} 
//
this.FORLOOP31 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_PP_int=this.X_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP127";}
return "SKIP127";
} 
//
this.NSKIP127 = function() {
this.GOSUB("GOSUBCONT78");
return 40500;
} 
//
this.GOSUBCONT78 = function() {
return "RETURN";
//
return 52080;
} 
//
this.SKIP127 = function() {
return 52080;
} 
//
this.line_52080 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 52085;
} 
//
this.line_52085 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP128";}
return "SKIP128";
} 
//
this.NSKIP128 = function() {
return 52110;
//
return 52090;
} 
//
this.SKIP128 = function() {
return 52090;
} 
//
this.line_52090 = function() {
//
this.X_REG=this.CONST_2;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP32","VAR_I");
return 52095;
} 
//
this.FORLOOP32 = function() {
return 52095;
} 
//
this.line_52095 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_PP_int=this.X_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP129";}
return "SKIP129";
} 
//
this.NSKIP129 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP130";}
return "SKIP130";
} 
//
this.NSKIP130 = function() {
this.GOSUB("GOSUBCONT79");
return 40500;
} 
//
this.GOSUBCONT79 = function() {
return "RETURN";
//
return "SKIP129";
} 
//
this.SKIP130 = function() {
//
return 52100;
} 
//
this.SKIP129 = function() {
return 52100;
} 
//
this.line_52100 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 52110;
} 
//
this.line_52110 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_96;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
this.CONCAT();
this.STROUT();
this.LINEBREAK();
//
this.Y_REG=this.CONST_2;
this.VAR_SK_int=this.Y_REG;
this.VAR_SK_int=Math.floor(this.VAR_SK_int);
//
return "RETURN";
} 
//
this.line_52150 = function() {
//
return 52155;
} 
//
this.line_52155 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_OC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP131";}
return "SKIP131";
} 
//
this.NSKIP131 = function() {
return "RETURN";
//
return 52160;
} 
//
this.SKIP131 = function() {
return 52160;
} 
//
this.line_52160 = function() {
//
this.X_REG=this.CONST_1;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_CO_int=this.X_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.Y_REG=this.CONST_1;
this.VAR_J=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP33","VAR_J");
return "FORLOOP33";
} 
//
this.FORLOOP33 = function() {
//
this.Y_REG=this.VAR_J;
this.X_REG=Math.floor(this.Y_REG);
this.G_REG=this.VAR_OP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return 52165;
} 
//
this.line_52165 = function() {
//
this.Y_REG=this.VAR_CO_int;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP132";}
return "SKIP132";
} 
//
this.NSKIP132 = function() {
//
this.Y_REG=this.VAR_J;
this.VAR_T2_int=this.Y_REG;
this.VAR_T2_int=Math.floor(this.VAR_T2_int);
this.GOSUB("GOSUBCONT80");
return 42200;
} 
//
this.GOSUBCONT80 = function() {
//
return 52170;
} 
//
this.SKIP132 = function() {
return 52170;
} 
//
this.line_52170 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP133";}
return "SKIP133";
} 
//
this.NSKIP133 = function() {
return "RETURN";
//
return 52175;
} 
//
this.SKIP133 = function() {
return 52175;
} 
//
this.line_52175 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return "RETURN";
} 
//
this.line_52200 = function() {
//
return 52204;
} 
//
this.line_52202 = function() {
//
return 52220;
} 
//
this.line_52204 = function() {
//
return 52220;
} 
//
this.line_52220 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CO_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP134";}
return "SKIP134";
} 
//
this.NSKIP134 = function() {
return 52280;
//
return 52230;
} 
//
this.SKIP134 = function() {
return 52230;
} 
//
this.line_52230 = function() {
//
this.LINEBREAK();
//
this.A_REG=this.CONST_97;
this.STROUT();
return 52240;
} 
//
this.line_52240 = function() {
//
this.GETSTR();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.CONST_11;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP135";}
return "SKIP135";
} 
//
this.NSKIP135 = function() {
return 52240;
//
return 52250;
} 
//
this.SKIP135 = function() {
return 52250;
} 
//
this.line_52250 = function() {
//
this.B_REG=this.CONST_98;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP136";}
return "SKIP136";
} 
//
this.NSKIP136 = function() {
this.LINEBREAK();
//
this.A_REG=this.CONST_99;
this.STROUT();
this.LINEBREAK();
return 49100;
//
return 52260;
} 
//
this.SKIP136 = function() {
return 52260;
} 
//
this.line_52260 = function() {
//
this.B_REG=this.CONST_37;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP137";}
return "SKIP137";
} 
//
this.NSKIP137 = function() {
return "RETURN";
//
return 52270;
} 
//
this.SKIP137 = function() {
return 52270;
} 
//
this.line_52270 = function() {
//
return 52230;
} 
//
this.line_52280 = function() {
//
return 59150;
} 
//
this.line_52300 = function() {
//
return 52304;
} 
//
this.line_52302 = function() {
//
return 52320;
} 
//
this.line_52304 = function() {
//
return 52320;
} 
//
this.line_52320 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CO_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP138";}
return "SKIP138";
} 
//
this.NSKIP138 = function() {
return 59150;
//
return 52330;
} 
//
this.SKIP138 = function() {
return 52330;
} 
//
this.line_52330 = function() {
//
this.GOSUB("GOSUBCONT81");
return 40700;
} 
//
this.GOSUBCONT81 = function() {
//
return "RETURN";
} 
//
this.line_52500 = function() {
//
return 52504;
} 
//
this.line_52502 = function() {
//
return 52510;
} 
//
this.line_52504 = function() {
//
return 52510;
} 
//
this.line_52510 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
return 52520;
} 
//
this.line_52520 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP139";}
return "SKIP139";
} 
//
this.NSKIP139 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CO_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP140";}
return "SKIP140";
} 
//
this.NSKIP140 = function() {
//
this.B_REG=this.VAR_AL$;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.CONST_2;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CP$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SEQ();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_AL$;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.CONST_1;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CP$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SEQ();
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP141";}
return "SKIP141";
} 
//
this.NSKIP141 = function() {
this.GOSUB("GOSUBCONT82");
return 40800;
} 
//
this.GOSUBCONT82 = function() {
return "RETURN";
//
return "SKIP140";
} 
//
this.SKIP141 = function() {
//
return "SKIP139";
} 
//
this.SKIP140 = function() {
//
return 52525;
} 
//
this.SKIP139 = function() {
return 52525;
} 
//
this.line_52525 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP142";}
return "SKIP142";
} 
//
this.NSKIP142 = function() {
return 59150;
//
return 52530;
} 
//
this.SKIP142 = function() {
return 52530;
} 
//
this.line_52530 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP34","VAR_I");
return "FORLOOP34";
} 
//
this.FORLOOP34 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return 52540;
} 
//
this.line_52540 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_TC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP143";}
return "SKIP143";
} 
//
this.NSKIP143 = function() {
return 52580;
//
return 52545;
} 
//
this.SKIP143 = function() {
return 52545;
} 
//
this.line_52545 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP35","VAR_II");
return "FORLOOP35";
} 
//
this.FORLOOP35 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_IP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_PP_int=this.X_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP144";}
return "SKIP144";
} 
//
this.NSKIP144 = function() {
this.GOSUB("GOSUBCONT83");
return 40900;
} 
//
this.GOSUBCONT83 = function() {
//
return 52550;
} 
//
this.SKIP144 = function() {
return 52550;
} 
//
this.line_52550 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP145";}
return "SKIP145";
} 
//
this.NSKIP145 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
return 52560;
} 
//
this.SKIP145 = function() {
return 52560;
} 
//
this.line_52560 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP146";}
return "SKIP146";
} 
//
this.NSKIP146 = function() {
//
this.Y_REG=this.VAR_RT_int;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_53;
this.VAR_II=this.Y_REG;
//
return 52570;
} 
//
this.SKIP146 = function() {
return 52570;
} 
//
this.line_52570 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 52580;
} 
//
this.line_52580 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RR_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP147";}
return "SKIP147";
} 
//
this.NSKIP147 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_96;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.VAR_T_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
this.CONCAT();
this.STROUT();
this.LINEBREAK();
//
return 52590;
} 
//
this.SKIP147 = function() {
return 52590;
} 
//
this.line_52590 = function() {
//
//
this.NEXT("VAR_I");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 52600;
} 
//
this.line_52600 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP148";}
return "SKIP148";
} 
//
this.NSKIP148 = function() {
this.GOSUB("GOSUBCONT84");
return 40650;
} 
//
this.GOSUBCONT84 = function() {
//
return 52610;
} 
//
this.SKIP148 = function() {
return 52610;
} 
//
this.line_52610 = function() {
//
return "RETURN";
} 
//
this.line_52700 = function() {
//
return 52704;
} 
//
this.line_52702 = function() {
//
return 52720;
} 
//
this.line_52704 = function() {
//
return 52720;
} 
//
this.line_52720 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CO_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP149";}
return "SKIP149";
} 
//
this.NSKIP149 = function() {
return 59150;
//
return 52740;
} 
//
this.SKIP149 = function() {
return 52740;
} 
//
this.line_52740 = function() {
//
this.X_REG=this.CONST_2;
// ignored: CHGCTX #1
this.G_REG=this.VAR_CP$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
//
this.GOSUB("GOSUBCONT85");
return 41200;
} 
//
this.GOSUBCONT85 = function() {
return 52745;
} 
//
this.line_52745 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_6;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP150";}
return "SKIP150";
} 
//
this.NSKIP150 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_69;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP151";}
return "SKIP151";
} 
//
this.NSKIP151 = function() {
//
this.COMPACTMAX();
this.C_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.LEFT();
this.VAR_A$=this.A_REG;
return 52800;
//
return "SKIP150";
} 
//
this.SKIP151 = function() {
//
return 52750;
} 
//
this.SKIP150 = function() {
return 52750;
} 
//
this.line_52750 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_68;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP152";}
return "SKIP152";
} 
//
this.NSKIP152 = function() {
//
this.COMPACTMAX();
this.C_REG=this.CONST_63;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.LEFT();
this.VAR_A$=this.A_REG;
//
return 52760;
} 
//
this.SKIP152 = function() {
return 52760;
} 
//
this.line_52760 = function() {
//
this.B_REG=this.CONST_100;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP153";}
return "SKIP153";
} 
//
this.NSKIP153 = function() {
//
this.B_REG=this.CONST_41;
this.VAR_A$=this.B_REG;
return 52800;
//
return 52770;
} 
//
this.SKIP153 = function() {
return 52770;
} 
//
this.line_52770 = function() {
//
this.B_REG=this.CONST_101;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP154";}
return "SKIP154";
} 
//
this.NSKIP154 = function() {
//
this.B_REG=this.CONST_39;
this.VAR_A$=this.B_REG;
return 52800;
//
return 52780;
} 
//
this.SKIP154 = function() {
return 52780;
} 
//
this.line_52780 = function() {
//
this.B_REG=this.CONST_102;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP155";}
return "SKIP155";
} 
//
this.NSKIP155 = function() {
//
this.B_REG=this.CONST_40;
this.VAR_A$=this.B_REG;
return 52800;
//
return 52790;
} 
//
this.SKIP155 = function() {
return 52790;
} 
//
this.line_52790 = function() {
//
this.B_REG=this.CONST_103;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP156";}
return "SKIP156";
} 
//
this.NSKIP156 = function() {
//
this.B_REG=this.CONST_38;
this.VAR_A$=this.B_REG;
//
return 52800;
} 
//
this.SKIP156 = function() {
return 52800;
} 
//
this.line_52800 = function() {
//
this.B_REG=this.CONST_42;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP157";}
return "SKIP157";
} 
//
this.NSKIP157 = function() {
//
this.B_REG=this.CONST_45;
this.VAR_A$=this.B_REG;
//
return 52810;
} 
//
this.SKIP157 = function() {
return 52810;
} 
//
this.line_52810 = function() {
//
this.B_REG=this.CONST_43;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP158";}
return "SKIP158";
} 
//
this.NSKIP158 = function() {
//
this.B_REG=this.CONST_44;
this.VAR_A$=this.B_REG;
//
return 52815;
} 
//
this.SKIP158 = function() {
return 52815;
} 
//
this.line_52815 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_XC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP159";}
return "SKIP159";
} 
//
this.NSKIP159 = function() {
return 52850;
//
return 52820;
} 
//
this.SKIP159 = function() {
return 52820;
} 
//
this.line_52820 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_XC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP36","VAR_I");
return "FORLOOP36";
} 
//
this.FORLOOP36 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_XP$_array;
this.ARRAYACCESS_STRING();
this.VAR_TX$=this.A_REG;
//
this.GOSUB("GOSUBCONT86");
return 63100;
} 
//
this.GOSUBCONT86 = function() {
//
this.B_REG=this.VAR_TX$;
this.VAR_B$=this.B_REG;
return 52830;
} 
//
this.line_52830 = function() {
//
this.B_REG=this.VAR_B$;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP160";}
return "SKIP160";
} 
//
this.NSKIP160 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_71;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_XX$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this._stack.pop();
this.CONCAT();
this.VAR_RN$=this.A_REG;
this.LINEBREAK();
this.GOSUB("GOSUBCONT87");
return 40100;
} 
//
this.GOSUBCONT87 = function() {
return "RETURN";
//
return 52840;
} 
//
this.SKIP160 = function() {
return 52840;
} 
//
this.line_52840 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 52850;
} 
//
this.line_52850 = function() {
//
this.A_REG=this.CONST_104;
this.STROUT();
this.LINEBREAK();
//
return "RETURN";
} 
//
this.line_52900 = function() {
//
return 52904;
} 
//
this.line_52902 = function() {
//
return 53100;
} 
//
this.line_52904 = function() {
//
return 53100;
} 
//
this.line_53100 = function() {
//
this.LINEBREAK();
//
this.A_REG=this.CONST_105;
this.STROUT();
this.LINEBREAK();
return 53120;
} 
//
this.line_53120 = function() {
//
this.Y_REG=this.CONST_1;
this.FRE();
this.INTOUT();
this.CRSRRIGHT();
//
this.A_REG=this.CONST_106;
this.STROUT();
this.LINEBREAK();
return 53140;
} 
//
this.line_53140 = function() {
//
return "RETURN";
} 
//
this.line_53200 = function() {
//
return 53204;
} 
//
this.line_53202 = function() {
//
return 53210;
} 
//
this.line_53204 = function() {
//
return 53210;
} 
//
this.line_53210 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP161";}
return "SKIP161";
} 
//
this.NSKIP161 = function() {
//
this.A_REG=this.CONST_107;
this.STROUT();
this.LINEBREAK();
return "RETURN";
//
return 53220;
} 
//
this.SKIP161 = function() {
return 53220;
} 
//
this.line_53220 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP162";}
return "SKIP162";
} 
//
this.NSKIP162 = function() {
return 59150;
//
return 53230;
} 
//
this.SKIP162 = function() {
return 53230;
} 
//
this.line_53230 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP37","VAR_I");
return "FORLOOP37";
} 
//
this.FORLOOP37 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return 53240;
} 
//
this.line_53240 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP38","VAR_II");
return "FORLOOP38";
} 
//
this.FORLOOP38 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_PP_int=this.X_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
return 53245;
} 
//
this.line_53245 = function() {
//
this.Y_REG=this.VAR_T_int;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP163";}
return "SKIP163";
} 
//
this.NSKIP163 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP164";}
return "SKIP164";
} 
//
this.NSKIP164 = function() {
this.GOSUB("GOSUBCONT88");
return 41400;
} 
//
this.GOSUBCONT88 = function() {
//
return "SKIP163";
} 
//
this.SKIP164 = function() {
//
return 53250;
} 
//
this.SKIP163 = function() {
return 53250;
} 
//
this.line_53250 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP165";}
return "SKIP165";
} 
//
this.NSKIP165 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
return 53260;
} 
//
this.SKIP165 = function() {
return 53260;
} 
//
this.line_53260 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP166";}
return "SKIP166";
} 
//
this.NSKIP166 = function() {
//
this.Y_REG=this.VAR_RT_int;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_53;
this.VAR_II=this.Y_REG;
//
return 53270;
} 
//
this.SKIP166 = function() {
return 53270;
} 
//
this.line_53270 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 53280;
} 
//
this.line_53280 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RR_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP167";}
return "SKIP167";
} 
//
this.NSKIP167 = function() {
//
this.Y_REG=this.VAR_T_int;
this.VAR_RR_int=this.Y_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
this.GOSUB("GOSUBCONT89");
return 53450;
} 
//
this.GOSUBCONT89 = function() {
//
return 53290;
} 
//
this.SKIP167 = function() {
return 53290;
} 
//
this.line_53290 = function() {
//
//
this.NEXT("VAR_I");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 53300;
} 
//
this.line_53300 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP168";}
return "SKIP168";
} 
//
this.NSKIP168 = function() {
this.GOSUB("GOSUBCONT90");
return 40650;
} 
//
this.GOSUBCONT90 = function() {
//
return 53310;
} 
//
this.SKIP168 = function() {
return 53310;
} 
//
this.line_53310 = function() {
//
return "RETURN";
} 
//
this.line_53450 = function() {
//
return 53455;
} 
//
this.line_53455 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_SF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP169";}
return "SKIP169";
} 
//
this.NSKIP169 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_SK_int=this.Y_REG;
this.VAR_SK_int=Math.floor(this.VAR_SK_int);
return "RETURN";
//
//
return 53460;
} 
//
this.SKIP169 = function() {
return 53460;
} 
//
this.line_53460 = function() {
//
this.X_REG=this.VAR_RR_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
this.A_REG=this.CONST_108;
this.STROUT();
this.LINEBREAK();
//
this.Y_REG=this.CONST_2;
this.VAR_SK_int=this.Y_REG;
this.VAR_SK_int=Math.floor(this.VAR_SK_int);
//
this.Y_REG=this.CONST_2;
this.VAR_SF_int=this.Y_REG;
this.VAR_SF_int=Math.floor(this.VAR_SF_int);
//
return "RETURN";
} 
//
this.line_53500 = function() {
//
return 53504;
} 
//
this.line_53502 = function() {
//
return 53510;
} 
//
this.line_53504 = function() {
//
return 53510;
} 
//
this.line_53510 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_12;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) & Math.floor(this.Y_REG);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP170";}
return "SKIP170";
} 
//
this.NSKIP170 = function() {
return 59150;
//
return 53520;
} 
//
this.SKIP170 = function() {
return 53520;
} 
//
this.line_53520 = function() {
//
this.Y_REG=this.VAR_T_int;
this.VAR_CO_int=this.Y_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.GOSUB("GOSUBCONT91");
return 58500;
} 
//
this.GOSUBCONT91 = function() {
//
return "RETURN";
} 
//
this.line_53600 = function() {
//
return 53604;
} 
//
this.line_53602 = function() {
//
return 53610;
} 
//
this.line_53604 = function() {
//
return 53610;
} 
//
this.line_53610 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_4;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP171";}
return "SKIP171";
} 
//
this.NSKIP171 = function() {
return 59150;
//
return 53620;
} 
//
this.SKIP171 = function() {
return 53620;
} 
//
this.line_53620 = function() {
//
this.Y_REG=this.CONST_23;
this.VAR_CO_int=this.Y_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.GOSUB("GOSUBCONT92");
return 58500;
} 
//
this.GOSUBCONT92 = function() {
//
return "RETURN";
} 
//
this.line_53700 = function() {
//
return 53704;
} 
//
this.line_53702 = function() {
//
return 53710;
} 
//
this.line_53704 = function() {
//
return 53710;
} 
//
this.line_53710 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
this._stack.push(this.X_REG);
this.Y_REG=this.CONST_4;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
this.Y_REG=this._stack.pop();
this.X_REG=Math.floor(this.X_REG) | Math.floor(this.Y_REG);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP172";}
return "SKIP172";
} 
//
this.NSKIP172 = function() {
return 59150;
//
return 53720;
} 
//
this.SKIP172 = function() {
return 53720;
} 
//
this.line_53720 = function() {
//
this.Y_REG=this.CONST_52;
this.VAR_CO_int=this.Y_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.GOSUB("GOSUBCONT93");
return 58500;
} 
//
this.GOSUBCONT93 = function() {
//
return "RETURN";
} 
//
this.line_53800 = function() {
//
return 53804;
} 
//
this.line_53802 = function() {
//
return 53810;
} 
//
this.line_53804 = function() {
//
return 53810;
} 
//
this.line_53810 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP173";}
return "SKIP173";
} 
//
this.NSKIP173 = function() {
return 59150;
//
return 53820;
} 
//
this.SKIP173 = function() {
return 53820;
} 
//
this.line_53820 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.GOSUB("GOSUBCONT94");
return 59200;
} 
//
this.GOSUBCONT94 = function() {
//
return "RETURN";
} 
//
this.line_53850 = function() {
//
return 53854;
} 
//
this.line_53852 = function() {
//
return 53860;
} 
//
this.line_53854 = function() {
//
return 53860;
} 
//
this.line_53860 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP174";}
return "SKIP174";
} 
//
this.NSKIP174 = function() {
return 59150;
//
return 53862;
} 
//
this.SKIP174 = function() {
return 53862;
} 
//
this.line_53862 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_109;
this.A_REG=this.VAR_FI$;
this.CONCAT();
this.VAR_A$=this.A_REG;
//
this.COMPACTMAX();
this.B_REG=this.VAR_A$;
this.A_REG=this.CONST_110;
this.CONCAT();
this.VAR_B$=this.A_REG;
//
this.GOSUB("GOSUBCONT95");
return 53880;
} 
//
this.GOSUBCONT95 = function() {
return 53865;
} 
//
this.line_53865 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_A$;
this.A_REG=this.CONST_111;
this.CONCAT();
this.B_REG=this.CONST_112;
this.CONCAT();
this.B_REG=this.VAR_FI$;
this.CONCAT();
this.VAR_B$=this.A_REG;
//
this.GOSUB("GOSUBCONT96");
return 53880;
} 
//
this.GOSUBCONT96 = function() {
return 53870;
} 
//
this.line_53870 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.GOSUB("GOSUBCONT97");
return 59200;
} 
//
this.GOSUBCONT97 = function() {
//
return "RETURN";
} 
//
this.line_53880 = function() {
//
return 53882;
} 
//
this.line_53882 = function() {
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_DN_int;
this._stack.push(this.Y_REG);
this.Y_REG=this.CONST_12;
this._stack.push(this.Y_REG);
this.B_REG=this.VAR_B$;
this.G_REG=this.B_REG;
this.D_REG=this._stack.pop();
this.C_REG=this._stack.pop();
this.X_REG=this._stack.pop();
this.Y_REG=this.CONST_55;
this.OPEN();
//
this.X_REG=this.CONST_2;
this.CLOSE();
//
return "RETURN";
} 
//
this.line_53900 = function() {
//
return 53904;
} 
//
this.line_53902 = function() {
//
return 53910;
} 
//
this.line_53904 = function() {
//
return 53910;
} 
//
this.line_53910 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP175";}
return "SKIP175";
} 
//
this.NSKIP175 = function() {
return 59150;
//
return 53920;
} 
//
this.SKIP175 = function() {
return 53920;
} 
//
this.line_53920 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_SK_int=this.Y_REG;
this.VAR_SK_int=Math.floor(this.VAR_SK_int);
//
this.Y_REG=this.CONST_113;
this.VAR_CO_int=this.Y_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.GOSUB("GOSUBCONT98");
return 58500;
} 
//
this.GOSUBCONT98 = function() {
return 53930;
} 
//
this.line_53930 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP176";}
return "SKIP176";
} 
//
this.NSKIP176 = function() {
return "RETURN";
//
return 53940;
} 
//
this.SKIP176 = function() {
return 53940;
} 
//
this.line_53940 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_SK_int=this.Y_REG;
this.VAR_SK_int=Math.floor(this.VAR_SK_int);
//
this.X_REG=this.CONST_2;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_RR_int=this.X_REG;
this.VAR_RR_int=Math.floor(this.VAR_RR_int);
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.GOSUB("GOSUBCONT99");
return 43600;
} 
//
this.GOSUBCONT99 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_SK_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP177";}
return "SKIP177";
} 
//
this.NSKIP177 = function() {
return "RETURN";
//
return 53950;
} 
//
this.SKIP177 = function() {
return 53950;
} 
//
this.line_53950 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP178";}
return "SKIP178";
} 
//
this.NSKIP178 = function() {
//
this.X_REG=this.CONST_1;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return 59150;
//
return 53960;
} 
//
this.SKIP178 = function() {
return 53960;
} 
//
this.line_53960 = function() {
//
this.A_REG=this.CONST_114;
this.STROUT();
this.LINEBREAK();
return 53970;
} 
//
this.line_53970 = function() {
//
return "RETURN";
} 
//
this.line_54000 = function() {
//
return 54004;
} 
//
this.line_54002 = function() {
//
return 54010;
} 
//
this.line_54004 = function() {
//
return 54010;
} 
//
this.line_54010 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP179";}
return "SKIP179";
} 
//
this.NSKIP179 = function() {
//
this.A_REG=this.CONST_115;
this.STROUT();
this.LINEBREAK();
return "RETURN";
//
return 54020;
} 
//
this.SKIP179 = function() {
return 54020;
} 
//
this.line_54020 = function() {
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_CC_int;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP180";}
return "SKIP180";
} 
//
this.NSKIP180 = function() {
return 59150;
//
return 54030;
} 
//
this.SKIP180 = function() {
return 54030;
} 
//
this.line_54030 = function() {
//
this.Y_REG=this.CONST_116;
this.VAR_CO_int=this.Y_REG;
this.VAR_CO_int=Math.floor(this.VAR_CO_int);
//
this.GOSUB("GOSUBCONT100");
return 58500;
} 
//
this.GOSUBCONT100 = function() {
//
return "RETURN";
} 
//
this.line_58500 = function() {
//
return 58510;
} 
//
this.line_58510 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_OC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP181";}
return "SKIP181";
} 
//
this.NSKIP181 = function() {
return 58700;
//
return 58520;
} 
//
this.SKIP181 = function() {
return 58520;
} 
//
this.line_58520 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_1;
this.VAR_J=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP39","VAR_J");
return "FORLOOP39";
} 
//
this.FORLOOP39 = function() {
//
this.Y_REG=this.VAR_J;
this.X_REG=Math.floor(this.Y_REG);
this.G_REG=this.VAR_OP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return 58530;
} 
//
this.line_58530 = function() {
//
this.Y_REG=this.VAR_CO_int;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP182";}
return "SKIP182";
} 
//
this.NSKIP182 = function() {
//
this.Y_REG=this.VAR_J;
this.VAR_T2_int=this.Y_REG;
this.VAR_T2_int=Math.floor(this.VAR_T2_int);
this.GOSUB("GOSUBCONT101");
return 42200;
} 
//
this.GOSUBCONT101 = function() {
//
return 58540;
} 
//
this.SKIP182 = function() {
return 58540;
} 
//
this.line_58540 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP183";}
return "SKIP183";
} 
//
this.NSKIP183 = function() {
return "RETURN";
//
return 58550;
} 
//
this.SKIP183 = function() {
return 58550;
} 
//
this.line_58550 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 58710;
} 
//
this.line_58700 = function() {
//
return 58710;
} 
//
this.line_58710 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_RT_int=this.Y_REG;
this.VAR_RT_int=Math.floor(this.VAR_RT_int);
//
this.Y_REG=this.CONST_1;
this.VAR_J=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_GC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP40","VAR_J");
return "FORLOOP40";
} 
//
this.FORLOOP40 = function() {
//
this.Y_REG=this.VAR_J;
this.X_REG=Math.floor(this.Y_REG);
this.G_REG=this.VAR_OG_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
return 58720;
} 
//
this.line_58720 = function() {
//
this.Y_REG=this.VAR_CO_int;
this.X_REG=this.VAR_T_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP184";}
return "SKIP184";
} 
//
this.NSKIP184 = function() {
//
this.Y_REG=this.VAR_J;
this.VAR_T2_int=this.Y_REG;
this.VAR_T2_int=Math.floor(this.VAR_T2_int);
this.GOSUB("GOSUBCONT102");
return 42700;
} 
//
this.GOSUBCONT102 = function() {
//
return 58730;
} 
//
this.SKIP184 = function() {
return 58730;
} 
//
this.line_58730 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_RT_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP185";}
return "SKIP185";
} 
//
this.NSKIP185 = function() {
return "RETURN";
//
return 58740;
} 
//
this.SKIP185 = function() {
return 58740;
} 
//
this.line_58740 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 58750;
} 
//
this.line_58750 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_SK_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP186";}
return "SKIP186";
} 
//
this.NSKIP186 = function() {
//
this.X_REG=this.CONST_1;
this.G_REG=this.VAR_CV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
this.GOSUB("GOSUBCONT103");
return 40600;
} 
//
this.GOSUBCONT103 = function() {
//
return 58760;
} 
//
this.SKIP186 = function() {
return 58760;
} 
//
this.line_58760 = function() {
//
return "RETURN";
} 
//
this.line_59000 = function() {
//
return 59010;
} 
//
this.line_59010 = function() {
//
this._memory[646]=Math.floor(this.CONST_12) & 255;
//
this.LINEBREAK();
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PL_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP41","VAR_I");
return "FORLOOP41";
} 
//
this.FORLOOP41 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_RD$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
return 59020;
} 
//
this.line_59020 = function() {
//
this.GOSUB("GOSUBCONT104");
return 59100;
} 
//
this.GOSUBCONT104 = function() {
return 59040;
} 
//
this.line_59040 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.GOSUB("GOSUBCONT105");
return 59500;
} 
//
this.GOSUBCONT105 = function() {
//
return "RETURN";
} 
//
this.line_59100 = function() {
//
return 59110;
} 
//
this.line_59110 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_117;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP187";}
return "SKIP187";
} 
//
this.NSKIP187 = function() {
//
this.A_REG=this.VAR_A$;
this.STROUT();
return "RETURN";
//
return 59120;
} 
//
this.SKIP187 = function() {
return 59120;
} 
//
this.line_59120 = function() {
//
this.A_REG=this.VAR_A$;
this.STROUT();
this.LINEBREAK();
//
return "RETURN";
} 
//
this.line_59150 = function() {
//
return 59160;
} 
//
this.line_59160 = function() {
//
this.GOSUB("GOSUBCONT106");
return 40600;
} 
//
this.GOSUBCONT106 = function() {
//
return "RETURN";
} 
//
this.line_59200 = function() {
//
return 59210;
} 
//
this.line_59210 = function() {
//
this.LINEBREAK();
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP188";}
return "SKIP188";
} 
//
this.NSKIP188 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_118;
this.A_REG=this.VAR_FI$;
this.CONCAT();
this.VAR_SX$=this.A_REG;
this.GOSUB("GOSUBCONT107");
return 45100;
} 
//
this.GOSUBCONT107 = function() {
//
this.A_REG=this.CONST_119;
this.STROUT();
//
return 59220;
} 
//
this.SKIP188 = function() {
return 59220;
} 
//
this.line_59220 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP189";}
return "SKIP189";
} 
//
this.NSKIP189 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_120;
this.A_REG=this.VAR_FI$;
this.CONCAT();
this.VAR_SX$=this.A_REG;
this.GOSUB("GOSUBCONT108");
return 45100;
} 
//
this.GOSUBCONT108 = function() {
//
this.A_REG=this.CONST_121;
this.STROUT();
//
return 59225;
} 
//
this.SKIP189 = function() {
return 59225;
} 
//
this.line_59225 = function() {
//
this.Y_REG=this.VAR_PO_int;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT109");
return 59900;
} 
//
this.GOSUBCONT109 = function() {
//
this.Y_REG=this.VAR_C_int;
this.VAR_PO_int=this.Y_REG;
this.VAR_PO_int=Math.floor(this.VAR_PO_int);
return 59230;
} 
//
this.line_59230 = function() {
//
this.Y_REG=this.VAR_IC_int;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT110");
return 59900;
} 
//
this.GOSUBCONT110 = function() {
//
this.Y_REG=this.VAR_C_int;
this.VAR_IC_int=this.Y_REG;
this.VAR_IC_int=Math.floor(this.VAR_IC_int);
return 59240;
} 
//
this.line_59240 = function() {
//
this.Y_REG=this.VAR_OD_int;
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT111");
return 59900;
} 
//
this.GOSUBCONT111 = function() {
//
this.Y_REG=this.VAR_C_int;
this.VAR_OD_int=this.Y_REG;
this.VAR_OD_int=Math.floor(this.VAR_OD_int);
return 59250;
} 
//
this.line_59250 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_MI_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP42","VAR_I");
return 59260;
} 
//
this.FORLOOP42 = function() {
return 59260;
} 
//
this.line_59260 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT112");
return 59900;
} 
//
this.GOSUBCONT112 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_C_int;
this.G_REG=this.VAR_IV_int_array;
this.ARRAYSTORE_INTEGER();
return 59270;
} 
//
this.line_59270 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_UV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT113");
return 59900;
} 
//
this.GOSUBCONT113 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_C_int;
this.G_REG=this.VAR_UV_int_array;
this.ARRAYSTORE_INTEGER();
return 59280;
} 
//
this.line_59280 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_RS_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT114");
return 59900;
} 
//
this.GOSUBCONT114 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_C_int;
this.G_REG=this.VAR_RS_int_array;
this.ARRAYSTORE_INTEGER();
return 59290;
} 
//
this.line_59290 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 59300;
} 
//
this.line_59300 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_MR_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP43","VAR_I");
return "FORLOOP43";
} 
//
this.FORLOOP43 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP44","VAR_II");
return 59310;
} 
//
this.FORLOOP44 = function() {
return 59310;
} 
//
this.line_59310 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this.G_REG=this.VAR_RV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.GOSUB("GOSUBCONT115");
return 59900;
} 
//
this.GOSUBCONT115 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
//
this.Y_REG=this.VAR_C_int;
this.G_REG=this.VAR_RV_int_array;
this.ARRAYSTORE_INTEGER();
return 59315;
} 
//
this.line_59315 = function() {
//
this.Y_REG=this.CONST_55;
this.X_REG=this.VAR_II;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP190";}
return "SKIP190";
} 
//
this.NSKIP190 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_LX$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
this.GOSUB("GOSUBCONT116");
return 59950;
} 
//
this.GOSUBCONT116 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.VAR_A$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_LX$_array;
this.ARRAYSTORE_STRING();
//
return 59320;
} 
//
this.SKIP190 = function() {
return 59320;
} 
//
this.line_59320 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
//
this.NEXT("VAR_I");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 59330;
} 
//
this.line_59330 = function() {
//
this.B_REG=this.VAR_RN$;
this.VAR_A$=this.B_REG;
//
this.GOSUB("GOSUBCONT117");
return 59950;
} 
//
this.GOSUBCONT117 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_RN$=this.B_REG;
return 59335;
} 
//
this.line_59335 = function() {
//
this.Y_REG=this.VAR_OD_int;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_MX_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP45","VAR_I");
return "FORLOOP45";
} 
//
this.FORLOOP45 = function() {
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
//
this.A_REG=this.CONST_11;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OD$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_OD_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP191";}
return "SKIP191";
} 
//
this.NSKIP191 = function() {
return 59370;
//
return 59340;
} 
//
this.SKIP191 = function() {
return 59340;
} 
//
this.line_59340 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_OD_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP46","VAR_I");
return 59350;
} 
//
this.FORLOOP46 = function() {
return 59350;
} 
//
this.line_59350 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_OD$_array;
this.ARRAYACCESS_STRING();
this.VAR_A$=this.A_REG;
//
this.GOSUB("GOSUBCONT118");
return 59950;
} 
//
this.GOSUBCONT118 = function() {
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_A$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OD$_array;
this.ARRAYSTORE_STRING();
return 59360;
} 
//
this.line_59360 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 59370;
} 
//
this.line_59370 = function() {
//
this.X_REG=this.CONST_6;
this.CLOSE();
//
this.A_REG=this.CONST_80;
this.STROUT();
this.LINEBREAK();
return 59380;
} 
//
this.line_59380 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP192";}
return "SKIP192";
} 
//
this.NSKIP192 = function() {
this.GOSUB("GOSUBCONT119");
return 63300;
} 
//
this.GOSUBCONT119 = function() {
this.GOSUB("GOSUBCONT120");
return 40100;
} 
//
this.GOSUBCONT120 = function() {
//
return 59390;
} 
//
this.SKIP192 = function() {
return 59390;
} 
//
this.line_59390 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_LC$=this.B_REG;
//
return "RETURN";
} 
//
this.line_59500 = function() {
//
return 59510;
} 
//
this.line_59510 = function() {
//
this.LINEBREAK();
//
this.GOSUB("GOSUBCONT121");
return 62600;
} 
//
this.GOSUBCONT121 = function() {
//
this.GOSUB("GOSUBCONT122");
return 62500;
} 
//
this.GOSUBCONT122 = function() {
//
return "RETURN";
} 
//
this.line_59800 = function() {
//
return 59810;
} 
//
this.line_59810 = function() {
//
this.LINEBREAK();
//
this.A_REG=this.CONST_122;
this.STROUT();
//
this.READSTATUS();
this.X_REG=this.tmpy;
this.REALOUT();
this.LINEBREAK();
//
return 49100;
} 
//
this.line_59850 = function() {
//
return 59855;
} 
//
this.line_59855 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_P;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_P=this.X_REG;
//
this.Y_REG=this.CONST_117;
this.X_REG=this.VAR_P;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP193";}
return "SKIP193";
} 
//
this.NSKIP193 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.CONST_78;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
return 59860;
} 
//
this.SKIP193 = function() {
return 59860;
} 
//
this.line_59860 = function() {
//
this.Y_REG=this.CONST_123;
this.READSTATUS();
this.X_REG=this.tmpy;
this.X_REG=Math.floor(this.X_REG) & Math.floor(this.Y_REG);
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP194";}
return "SKIP194";
} 
//
this.NSKIP194 = function() {
return 59800;
//
return 59870;
} 
//
this.SKIP194 = function() {
return 59870;
} 
//
this.line_59870 = function() {
//
return "RETURN";
} 
//
this.line_59900 = function() {
//
return 59910;
} 
//
this.line_59910 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP195";}
return "SKIP195";
} 
//
this.NSKIP195 = function() {
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.CLEARQUEUE();
this.COMPACTMAX();
this.C_REG=this._stack.pop();
this.INPUTNUMBERCHANNEL();
this.INPUTLENGTHCHECK();
if (this._zeroflag==0) {
return "EMPTYINPUTSKIP2";}
this.VAR_C_int=this.Y_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
return "EMPTYINPUTSKIP2";
} 
//
this.EMPTYINPUTSKIP2 = function() {
return 59925;
//
return 59920;
} 
//
this.SKIP195 = function() {
return 59920;
} 
//
this.line_59920 = function() {
//
this.LOCKCHANNEL();
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
//
this.X_REG=this.VAR_C_int;
this.C_REG=this._stack.pop();
this.INTOUTCHANNEL();
this.A_REG=this.CONST_84;
this.STROUTCHANNEL();
this.LINEBREAKCHANNEL();
this.UNLOCKCHANNEL();
return 59925;
} 
//
this.line_59925 = function() {
//
this.GOSUB("GOSUBCONT123");
return 59850;
} 
//
this.GOSUBCONT123 = function() {
return 59930;
} 
//
this.line_59930 = function() {
//
return "RETURN";
} 
//
this.line_59950 = function() {
//
return 59960;
} 
//
this.line_59960 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP196";}
return "SKIP196";
} 
//
this.NSKIP196 = function() {
this.GOSUB("GOSUBCONT124");
return 61700;
} 
//
this.GOSUBCONT124 = function() {
return 59980;
//
return 59965;
} 
//
this.SKIP196 = function() {
return 59965;
} 
//
this.line_59965 = function() {
//
this.B_REG=this.CONST_11;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP197";}
return "SKIP197";
} 
//
this.NSKIP197 = function() {
//
this.B_REG=this.CONST_74;
this.VAR_A$=this.B_REG;
//
return 59970;
} 
//
this.SKIP197 = function() {
return 59970;
} 
//
this.line_59970 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP198";}
return "SKIP198";
} 
//
this.NSKIP198 = function() {
this.LOCKCHANNEL();
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_A$;
this.C_REG=this._stack.pop();
this.STROUTCHANNEL();
this.LINEBREAKCHANNEL();
this.UNLOCKCHANNEL();
//
return 59980;
} 
//
this.SKIP198 = function() {
return 59980;
} 
//
this.line_59980 = function() {
//
this.GOSUB("GOSUBCONT125");
return 59850;
} 
//
this.GOSUBCONT125 = function() {
//
this.B_REG=this.CONST_74;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP199";}
return "SKIP199";
} 
//
this.NSKIP199 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_A$=this.B_REG;
//
return 59990;
} 
//
this.SKIP199 = function() {
return 59990;
} 
//
this.line_59990 = function() {
//
return "RETURN";
} 
//
this.line_60000 = function() {
//
return 60002;
} 
//
this.line_60002 = function() {
//
this.A_REG=this.CONST_124;
this.STROUT();
this.LINEBREAK();
return 60004;
} 
//
this.line_60004 = function() {
//
this.X_REG=Math.floor(this._memory[1]) & 255;
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
this.VAR_PY_int=this.X_REG;
this.VAR_PY_int=Math.floor(this.VAR_PY_int);
//
return 60005;
} 
//
this.line_60005 = function() {
//
this.Y_REG=this.CONST_125;
this.VAR_MX_int=this.Y_REG;
this.VAR_MX_int=Math.floor(this.VAR_MX_int);
//
this.Y_REG=this.CONST_59;
this.VAR_MR_int=this.Y_REG;
this.VAR_MR_int=Math.floor(this.VAR_MR_int);
//
this.Y_REG=this.CONST_126;
this.VAR_MI_int=this.Y_REG;
this.VAR_MI_int=Math.floor(this.VAR_MI_int);
//
//
this.Y_REG=this.CONST_116;
this.VAR_XO_int=this.Y_REG;
this.VAR_XO_int=Math.floor(this.VAR_XO_int);
//
this.COMPACTMAX();
this.B_REG=this.CONST_127;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.Y_REG=this.CONST_116;
// ignored: CHGCTX #1
this.CHR();
this.B_REG=this._stack.pop();
this.CONCAT();
this.VAR_CB$=this.A_REG;
//
this.Y_REG=this.CONST_1;
this.VAR_LR_int=this.Y_REG;
this.VAR_LR_int=Math.floor(this.VAR_LR_int);
//
this.Y_REG=this.CONST_128;
this.VAR_MO_int=this.Y_REG;
this.VAR_MO_int=Math.floor(this.VAR_MO_int);
//
this.Y_REG=this.CONST_68;
this.VAR_OX_int=this.Y_REG;
this.VAR_OX_int=Math.floor(this.VAR_OX_int);
return 60006;
} 
//
this.line_60006 = function() {
//
this.B_REG=this.CONST_129;
this.VAR_AL$=this.B_REG;
//
this.Y_REG=this.CONST_63;
this.VAR_MS_int=this.Y_REG;
this.VAR_MS_int=Math.floor(this.VAR_MS_int);
//
this.B_REG=this.CONST_130;
this.VAR_FI$=this.B_REG;
//
this.Y_REG=this.CONST_131;
this.VAR_BA=this.Y_REG;
//
this.Y_REG=this.VAR_BA;
this.VAR_AD=this.Y_REG;
return 60020;
} 
//
this.line_60010 = function() {
//
return 60030;
} 
//
this.line_60020 = function() {
//
return 60035;
} 
//
this.line_60030 = function() {
//
return 60040;
} 
//
this.line_60035 = function() {
//
return 60050;
} 
//
this.line_60040 = function() {
//
return 60055;
} 
//
this.line_60050 = function() {
//
return 60060;
} 
//
this.line_60055 = function() {
//
return 60070;
} 
//
this.line_60060 = function() {
//
return 60080;
} 
//
this.line_60070 = function() {
//
return 60090;
} 
//
this.line_60080 = function() {
//
return 60100;
} 
//
this.line_60090 = function() {
//
return 60110;
} 
//
this.line_60100 = function() {
//
return 60120;
} 
//
this.line_60110 = function() {
//
return 60130;
} 
//
this.line_60120 = function() {
//
return 60130;
} 
//
this.line_60130 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_MR_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP47","VAR_I");
return "FORLOOP47";
} 
//
this.FORLOOP47 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_23;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP48","VAR_P");
return "FORLOOP48";
} 
//
this.FORLOOP48 = function() {
//
this.Y_REG=this.VAR_P;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
//
this.Y_REG=this.CONST_7;
this.G_REG=this.VAR_RV_int_array;
this.ARRAYSTORE_INTEGER();
//
//
this.NEXT("VAR_P");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
//
this.NEXT("VAR_I");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return 60140;
} 
//
this.line_60140 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_52;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP49","VAR_I");
return "FORLOOP49";
} 
//
this.FORLOOP49 = function() {
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
this.READSTR();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_DR$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return 60160;
} 
//
this.line_60150 = function() {
//
return 60170;
} 
//
this.line_60160 = function() {
//
return 60180;
} 
//
this.line_60170 = function() {
//
return 60190;
} 
//
this.line_60180 = function() {
//
return 60190;
} 
//
this.line_60190 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_RL$=this.B_REG;
//
return 60200;
} 
//
this.line_60200 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_PO_int=this.Y_REG;
this.VAR_PO_int=Math.floor(this.VAR_PO_int);
//
return 60900;
} 
//
this.line_60900 = function() {
//
return "RETURN";
} 
//
this.line_61000 = function() {
//
return 61010;
} 
//
this.line_61010 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_SX$=this.B_REG;
//
this.Y_REG=this.CONST_2;
this.VAR_LI_int=this.Y_REG;
this.VAR_LI_int=Math.floor(this.VAR_LI_int);
//
this.Y_REG=this.CONST_2;
this.VAR_I_int=this.Y_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
return 61020;
} 
//
this.line_61020 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_132;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.C_REG=this.VAR_I_int;
// ignored: CHGCTX #1
this.B_REG=this.VAR_TX$;
this.CHARAT();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SNEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP200";}
return "SKIP200";
} 
//
this.NSKIP200 = function() {
return 61040;
//
return 61030;
} 
//
this.SKIP200 = function() {
return 61030;
} 
//
this.line_61030 = function() {
//
this.GOSUB("GOSUBCONT126");
return 61100;
} 
//
this.GOSUBCONT126 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_133;
this.A_REG=this.VAR_SX$;
this.CONCAT();
this.VAR_SX$=this.A_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_I_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_LI_int=this.X_REG;
this.VAR_LI_int=Math.floor(this.VAR_LI_int);
return 61040;
} 
//
this.line_61040 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_I_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_I_int=this.X_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
//
this.B_REG=this.VAR_TX$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.X_REG;
this.X_REG=this.VAR_I_int;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP201";}
return "SKIP201";
} 
//
this.NSKIP201 = function() {
return 61020;
//
return 61045;
} 
//
this.SKIP201 = function() {
return 61045;
} 
//
this.line_61045 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_LI_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP202";}
return "SKIP202";
} 
//
this.NSKIP202 = function() {
return "RETURN";
//
//
return 61050;
} 
//
this.SKIP202 = function() {
return 61050;
} 
//
this.line_61050 = function() {
//
this.GOSUB("GOSUBCONT127");
return 61100;
} 
//
this.GOSUBCONT127 = function() {
return 61060;
} 
//
this.line_61060 = function() {
//
this.B_REG=this.VAR_SX$;
this.VAR_TX$=this.B_REG;
//
return "RETURN";
} 
//
this.line_61100 = function() {
//
return 61110;
} 
//
this.line_61110 = function() {
//
this.COMPACTMAX();
this.C_REG=this.VAR_LI_int;
this._stack.push(this.C_REG);
this.Y_REG=this.VAR_LI_int;
this.X_REG=this.VAR_I_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_TX$;
this.D_REG=this._stack.pop();
this.C_REG=this._stack.pop();
this.MID();
this.B_REG=this.A_REG;
this.A_REG=this.VAR_SX$;
this.CONCAT();
this.VAR_SX$=this.A_REG;
//
return "RETURN";
} 
//
this.line_61200 = function() {
//
return 61205;
} 
//
this.line_61205 = function() {
//
this.A_REG=this.CONST_134;
this.STROUT();
return 61206;
} 
//
this.line_61206 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II_int=this.Y_REG;
this.VAR_II_int=Math.floor(this.VAR_II_int);
//
this.Y_REG=this.CONST_1;
this.VAR_J_int=this.Y_REG;
this.VAR_J_int=Math.floor(this.VAR_J_int);
return 61220;
} 
//
this.line_61220 = function() {
//
this.B_REG=this.CONST_135;
this.VAR_SX$=this.B_REG;
//
this.GOSUB("GOSUBCONT128");
return 45100;
} 
//
this.GOSUBCONT128 = function() {
return 61230;
} 
//
this.line_61230 = function() {
//
this.GOSUB("GOSUBCONT129");
return 61700;
} 
//
this.GOSUBCONT129 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_II_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_II_int=this.X_REG;
this.VAR_II_int=Math.floor(this.VAR_II_int);
return 61250;
} 
//
this.line_61250 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_ID$=this.B_REG;
//
this.Y_REG=this.CONST_2;
this.VAR_I_int=this.Y_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
return 61260;
} 
//
this.line_61260 = function() {
//
this.COMPACTMAX();
this.C_REG=this.VAR_I_int;
this.D_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.MID();
this.VAR_SX$=this.A_REG;
//
this.B_REG=this.CONST_132;
this.A_REG=this.VAR_SX$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP203";}
return "SKIP203";
} 
//
this.NSKIP203 = function() {
return 61280;
//
return 61270;
} 
//
this.SKIP203 = function() {
return 61270;
} 
//
this.line_61270 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_SX$;
this.A_REG=this.VAR_ID$;
this.CONCAT();
this.VAR_ID$=this.A_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_I_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_I_int=this.X_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.X_REG;
this.X_REG=this.VAR_I_int;
this.X_REG=(this.X_REG<=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP204";}
return "SKIP204";
} 
//
this.NSKIP204 = function() {
return 61260;
//
return 61280;
} 
//
this.SKIP204 = function() {
return 61280;
} 
//
this.line_61280 = function() {
//
this.B_REG=this.VAR_ID$;
// ignored: CHGCTX #0
this.VAL();
this.VAR_II_int=this.X_REG;
this.VAR_II_int=Math.floor(this.VAR_II_int);
//
this.COMPACTMAX();
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_I_int;
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
this.C_REG=this.CONST_2;
this._stack.push(this.C_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.D_REG=this._stack.pop();
this.C_REG=this._stack.pop();
this.MID();
this.VAR_TF$=this.A_REG;
//
this.Y_REG=this.VAR_II_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_2;
this.G_REG=this.VAR_MV_int_array;
this.ARRAYSTORE_INTEGER();
return 61290;
} 
//
this.line_61290 = function() {
//
this.B_REG=this.CONST_136;
this.A_REG=this.VAR_TF$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP205";}
return "SKIP205";
} 
//
this.NSKIP205 = function() {
//
this.Y_REG=this.VAR_II_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.CONST_1;
this.G_REG=this.VAR_MV_int_array;
this.ARRAYSTORE_INTEGER();
//
return 61300;
} 
//
this.SKIP205 = function() {
return 61300;
} 
//
this.line_61300 = function() {
//
this.Y_REG=this.VAR_II_int;
this._stack.push(this.Y_REG);
//
this.COMPACTMAX();
this.Y_REG=this.VAR_I_int;
this._stack.push(this.Y_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this.CONST_6;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.RIGHT();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_IT$_array;
this.ARRAYSTORE_STRING();
return 61302;
} 
//
this.line_61302 = function() {
//
this.X_REG=this.VAR_II_int;
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.VAR_TX$=this.A_REG;
//
this.GOSUB("GOSUBCONT130");
return 63100;
} 
//
this.GOSUBCONT130 = function() {
//
this.Y_REG=this.VAR_II_int;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_TX$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_IL$_array;
this.ARRAYSTORE_STRING();
//
this.COMPACTMAX();
this.Y_REG=this.CONST_78;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
return 61305;
} 
//
this.line_61305 = function() {
//
this.GOSUB("GOSUBCONT131");
return 61400;
} 
//
this.GOSUBCONT131 = function() {
return 61310;
} 
//
this.line_61310 = function() {
//
this.Y_REG=this.CONST_79;
this.READSTATUS();
this.X_REG=this.tmpy;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP206";}
return "SKIP206";
} 
//
this.NSKIP206 = function() {
return 61330;
//
return 61320;
} 
//
this.SKIP206 = function() {
return 61320;
} 
//
this.line_61320 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_J_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_J_int=this.X_REG;
this.VAR_J_int=Math.floor(this.VAR_J_int);
//
return 61230;
} 
//
this.line_61330 = function() {
//
this.A_REG=this.CONST_80;
this.STROUT();
this.LINEBREAK();
return 61340;
} 
//
this.line_61340 = function() {
//
this.Y_REG=this.VAR_J_int;
this.VAR_TI_int=this.Y_REG;
this.VAR_TI_int=Math.floor(this.VAR_TI_int);
//
this.X_REG=this.CONST_6;
this.CLOSE();
//
return "RETURN";
} 
//
this.line_61400 = function() {
//
return 61405;
} 
//
this.line_61405 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_T_int=this.Y_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.VAR_AD;
this.VAR_SD=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_AD;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_AD=this.X_REG;
return 61410;
} 
//
this.line_61410 = function() {
//
this.GOSUB("GOSUBCONT132");
return 61700;
} 
//
this.GOSUBCONT132 = function() {
//
this.B_REG=this.CONST_56;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP207";}
return "SKIP207";
} 
//
this.NSKIP207 = function() {
return 61460;
//
return 61415;
} 
//
this.SKIP207 = function() {
return 61415;
} 
//
this.line_61415 = function() {
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this.VAR_PP_int=this.X_REG;
this.VAR_PP_int=Math.floor(this.VAR_PP_int);
//
this.Y_REG=this.VAR_PP_int;
this.X_REG=this.VAR_T_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
this.Y_REG=this.CONST_117;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP208";}
return "SKIP208";
} 
//
this.NSKIP208 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_T_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_T_int=this.X_REG;
this.VAR_T_int=Math.floor(this.VAR_T_int);
//
return 61420;
} 
//
this.SKIP208 = function() {
return 61420;
} 
//
this.line_61420 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_TX$=this.B_REG;
//
this.GOSUB("GOSUBCONT133");
return 61000;
} 
//
this.GOSUBCONT133 = function() {
return 61430;
} 
//
this.line_61430 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.VAR_PP_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP50","VAR_P");
return "FORLOOP50";
} 
//
this.FORLOOP50 = function() {
//
this.COMPACTMAX();
this.C_REG=this.VAR_P;
this.D_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_TX$;
this.MID();
this.VAR_A$=this.A_REG;
return 61440;
} 
//
this.line_61440 = function() {
//
this.Y_REG=this.VAR_P;
this.X_REG=this.VAR_AD;
this.X_REG=this.X_REG+this.Y_REG;
this.Y_REG=this.CONST_2;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.ASC();
this.Y_REG=this._stack.pop();
this._memory[Math.floor(this.Y_REG)]=Math.floor(this.X_REG) & 255;
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_P;
this.X_REG=this.X_REG-this.Y_REG;
this.VAR_P=this.X_REG;
//
this.Y_REG=this.CONST_117;
this.X_REG=this.VAR_PP_int;
this.X_REG=(this.X_REG<this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP209";}
return "SKIP209";
} 
//
this.NSKIP209 = function() {
this.Y_REG=this.VAR_P;
this.X_REG=this.VAR_AD;
this.X_REG=this.X_REG+this.Y_REG;
this.Y_REG=this.X_REG;
this._memory[Math.floor(this.Y_REG)]=Math.floor(this.CONST_116) & 255;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_P;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_P=this.X_REG;
//
return 61450;
} 
//
this.SKIP209 = function() {
return 61450;
} 
//
this.line_61450 = function() {
//
this.Y_REG=this.VAR_P;
this.X_REG=this.VAR_AD;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_AD=this.X_REG;
//
this.Y_REG=this.CONST_137;
this.X_REG=this.VAR_AD;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP210";}
return "SKIP210";
} 
//
this.NSKIP210 = function() {
return 42420;
//
return 61455;
} 
//
this.SKIP210 = function() {
return 61455;
} 
//
this.line_61455 = function() {
//
return 61410;
} 
//
this.line_61460 = function() {
//
this.Y_REG=this.VAR_II_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.VAR_BA;
this.X_REG=this.VAR_SD;
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_ID_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_AD;
this.X_REG=this.X_REG-this.Y_REG;
this.VAR_AD=this.X_REG;
//
this.Y_REG=this.VAR_SD;
this._stack.push(this.Y_REG);
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_T_int;
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this._stack.pop();
this._memory[Math.floor(this.Y_REG)]=Math.floor(this.X_REG) & 255;
//
return "RETURN";
} 
//
this.line_61500 = function() {
//
return 61510;
} 
//
this.line_61510 = function() {
//
this.A_REG=this.CONST_138;
this.STROUT();
return 61520;
} 
//
this.line_61520 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P=this.Y_REG;
//
this.B_REG=this.CONST_139;
this.VAR_SX$=this.B_REG;
//
this.GOSUB("GOSUBCONT134");
return 45100;
} 
//
this.GOSUBCONT134 = function() {
return 61530;
} 
//
this.line_61530 = function() {
//
this.GOSUB("GOSUBCONT135");
return 61700;
} 
//
this.GOSUBCONT135 = function() {
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.VAL();
this.VAR_II=this.X_REG;
return 61540;
} 
//
this.line_61540 = function() {
//
this.GOSUB("GOSUBCONT136");
return 61700;
} 
//
this.GOSUBCONT136 = function() {
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.VAL();
this.VAR_PP=this.X_REG;
return 61545;
} 
//
this.line_61545 = function() {
//
this.GOSUB("GOSUBCONT137");
return 61700;
} 
//
this.GOSUBCONT137 = function() {
//
this.Y_REG=this.VAR_II;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_A$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_CV$_array;
this.ARRAYSTORE_STRING();
return 61550;
} 
//
this.line_61550 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PP;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP51","VAR_I");
return "FORLOOP51";
} 
//
this.FORLOOP51 = function() {
//
this.GOSUB("GOSUBCONT138");
return 61700;
} 
//
this.GOSUBCONT138 = function() {
return 61560;
} 
//
this.line_61560 = function() {
//
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.VAR_A$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_CM$_array;
this.ARRAYSTORE_STRING();
//
this.COMPACTMAX();
this.Y_REG=this.CONST_78;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
return 61570;
} 
//
this.line_61570 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_79;
this.READSTATUS();
this.X_REG=this.tmpy;
this.X_REG=(this.X_REG!=this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP211";}
return "SKIP211";
} 
//
this.NSKIP211 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_P;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_P=this.X_REG;
return 61530;
//
return 61580;
} 
//
this.SKIP211 = function() {
return 61580;
} 
//
this.line_61580 = function() {
//
this.A_REG=this.CONST_80;
this.STROUT();
this.LINEBREAK();
return 61590;
} 
//
this.line_61590 = function() {
//
this.Y_REG=this.VAR_P;
this.VAR_TB_int=this.Y_REG;
this.VAR_TB_int=Math.floor(this.VAR_TB_int);
//
this.X_REG=this.CONST_6;
this.CLOSE();
return 61600;
} 
//
this.line_61600 = function() {
//
this.B_REG=this.CONST_140;
this.VAR_SX$=this.B_REG;
//
this.GOSUB("GOSUBCONT139");
return 45100;
} 
//
this.GOSUBCONT139 = function() {
//
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.CLEARQUEUE();
this.COMPACTMAX();
this.C_REG=this._stack.pop();
this.INPUTNUMBERCHANNEL();
this.INPUTLENGTHCHECK();
if (this._zeroflag==0) {
return "EMPTYINPUTSKIP3";}
this.VAR_LR_int=this.Y_REG;
this.VAR_LR_int=Math.floor(this.VAR_LR_int);
return "EMPTYINPUTSKIP3";
} 
//
this.EMPTYINPUTSKIP3 = function() {
//
this.X_REG=this.CONST_6;
this.CLOSE();
//
return "RETURN";
} 
//
this.line_61700 = function() {
//
return 61710;
} 
//
this.line_61710 = function() {
//
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.CLEARQUEUE();
this.COMPACTMAX();
this.C_REG=this._stack.pop();
this.INPUTSTRCHANNEL();
this.INPUTLENGTHCHECK();
if (this._zeroflag==0) {
return "EMPTYINPUTSKIP4";}
this.VAR_A$=this.A_REG;
return "EMPTYINPUTSKIP4";
} 
//
this.EMPTYINPUTSKIP4 = function() {
//
return "RETURN";
} 
//
this.line_62000 = function() {
//
return 62005;
} 
//
this.line_62005 = function() {
//
this.GOSUB("GOSUBCONT140");
return 62100;
} 
//
this.GOSUBCONT140 = function() {
//
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.Y_REG=this.VAR_DN_int;
this._stack.push(this.Y_REG);
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.B_REG=this.VAR_RN$;
this.G_REG=this.B_REG;
this.D_REG=this._stack.pop();
this.C_REG=this._stack.pop();
this.X_REG=this._stack.pop();
this.Y_REG=this.CONST_55;
this.OPEN();
//
this.GOSUB("GOSUBCONT141");
return 61700;
} 
//
this.GOSUBCONT141 = function() {
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.VAL();
this.VAR_RD_int=this.X_REG;
this.VAR_RD_int=Math.floor(this.VAR_RD_int);
//
this._memory[646]=Math.floor(this.CONST_12) & 255;
return 62008;
} 
//
this.line_62008 = function() {
//
this.GOSUB("GOSUBCONT142");
return 61700;
} 
//
this.GOSUBCONT142 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_RL$=this.B_REG;
//
this.Y_REG=this.VAR_PY_int;
if ((this.Y_REG==this.CONST_1?0:1)==1) {
return "NSKIP212";}
return "SKIP212";
} 
//
this.NSKIP212 = function() {
this.GOSUB("GOSUBCONT143");
return 63005;
} 
//
this.GOSUBCONT143 = function() {
//
return 62010;
} 
//
this.SKIP212 = function() {
return 62010;
} 
//
this.line_62010 = function() {
//
this.Y_REG=this.CONST_6;
this._stack.push(this.Y_REG);
this.CLEARQUEUE();
this.COMPACTMAX();
this.C_REG=this._stack.pop();
this.INPUTSTRCHANNEL();
this.INPUTLENGTHCHECK();
if (this._zeroflag==0) {
return "EMPTYINPUTSKIP5";}
this.VAR_A$=this.A_REG;
return "EMPTYINPUTSKIP5";
} 
//
this.EMPTYINPUTSKIP5 = function() {
//
this.GOSUB("GOSUBCONT144");
return 59860;
} 
//
this.GOSUBCONT144 = function() {
//
return 62020;
} 
//
this.line_62020 = function() {
//
this.B_REG=this.CONST_56;
this.A_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP213";}
return "SKIP213";
} 
//
this.NSKIP213 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_MD_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_MD_int=this.X_REG;
this.VAR_MD_int=Math.floor(this.VAR_MD_int);
return 62050;
//
return 62030;
} 
//
this.SKIP213 = function() {
return 62030;
} 
//
this.line_62030 = function() {
//
this.B_REG=this.VAR_A$;
this.VAR_TX$=this.B_REG;
//
this.GOSUB("GOSUBCONT145");
return 61000;
} 
//
this.GOSUBCONT145 = function() {
//
this.B_REG=this.VAR_TX$;
this.VAR_A$=this.B_REG;
return 62040;
} 
//
this.line_62040 = function() {
//
this.Y_REG=this.VAR_MD_int;
this.Y_REG=Math.floor(this.Y_REG);
return "ON2SUB0";
} 
//
this.ON2SUB0 = function() {
if ((this.Y_REG==this.CONST_2?0:1)==1) {
return "ON2SUB1";}
this.GOSUB("GOSUBCONT146");
return 62200;
} 
//
this.GOSUBCONT146 = function() {
return "GSKIPON2";
} 
//
this.ON2SUB1 = function() {
if ((this.Y_REG==this.CONST_6?0:1)==1) {
return "ON2SUB2";}
this.GOSUB("GOSUBCONT147");
return 62300;
} 
//
this.GOSUBCONT147 = function() {
return "GSKIPON2";
} 
//
this.ON2SUB2 = function() {
if ((this.Y_REG==this.CONST_4?0:1)==1) {
return "ON2SUB3";}
this.GOSUB("GOSUBCONT148");
return 62400;
} 
//
this.GOSUBCONT148 = function() {
return "GSKIPON2";
} 
//
this.ON2SUB3 = function() {
if ((this.Y_REG==this.CONST_55?0:1)==1) {
return "GSKIPON2";}
this.GOSUB("GOSUBCONT149");
return 42000;
} 
//
this.GOSUBCONT149 = function() {
return 62050;
} 
//
this.GSKIPON2 = function() {
return 62050;
} 
//
this.line_62050 = function() {
//
this.Y_REG=this.CONST_79;
this.READSTATUS();
this.X_REG=this.tmpy;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP214";}
return "SKIP214";
} 
//
this.NSKIP214 = function() {
this.X_REG=this.CONST_6;
this.CLOSE();
return "RETURN";
//
return 62060;
} 
//
this.SKIP214 = function() {
return 62060;
} 
//
this.line_62060 = function() {
//
return 62010;
} 
//
this.line_62100 = function() {
//
return 62110;
} 
//
this.line_62110 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_MD_int=this.Y_REG;
this.VAR_MD_int=Math.floor(this.VAR_MD_int);
//
this.Y_REG=this.CONST_1;
this.VAR_PL_int=this.Y_REG;
this.VAR_PL_int=Math.floor(this.VAR_PL_int);
//
this.Y_REG=this.CONST_1;
this.VAR_EL_int=this.Y_REG;
this.VAR_EL_int=Math.floor(this.VAR_EL_int);
//
this.Y_REG=this.CONST_1;
this.VAR_IL_int=this.Y_REG;
this.VAR_IL_int=Math.floor(this.VAR_IL_int);
//
this.Y_REG=this.CONST_1;
this.VAR_OC_int=this.Y_REG;
this.VAR_OC_int=Math.floor(this.VAR_OC_int);
//
this.Y_REG=this.CONST_1;
this.VAR_XC_int=this.Y_REG;
this.VAR_XC_int=Math.floor(this.VAR_XC_int);
//
this.Y_REG=this.CONST_1;
this.VAR_TC_int=this.Y_REG;
this.VAR_TC_int=Math.floor(this.VAR_TC_int);
return 62120;
} 
//
this.line_62120 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PL_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP52","VAR_I");
return "FORLOOP52";
} 
//
this.FORLOOP52 = function() {
//
this.Y_REG=this.VAR_I;
this._stack.push(this.Y_REG);
//
this.A_REG=this.CONST_11;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_RD$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 62130;
} 
//
this.line_62130 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.VAR_XO_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP53","VAR_I");
return "FORLOOP53";
} 
//
this.FORLOOP53 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.VAR_OX_int;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP54","VAR_II");
return "FORLOOP54";
} 
//
this.FORLOOP54 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.A_REG=this.CONST_55;
this.Y_REG=this.X_REG;
this.X_REG=this.X_REG*Math.pow(2,this.A_REG);
this.A_REG=this.CONST_2;
this.Y_REG=this.Y_REG*Math.pow(2,this.A_REG);
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_I;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
//
this.A_REG=this.CONST_11;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_OP$_array;
this.ARRAYSTORE_STRING();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 62140;
} 
//
this.line_62140 = function() {
//
return "RETURN";
} 
//
this.line_62200 = function() {
//
return 62210;
} 
//
this.line_62210 = function() {
//
this.Y_REG=this.VAR_PL_int;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_A$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_RD$_array;
this.ARRAYSTORE_STRING();
return 62220;
} 
//
this.line_62220 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_117;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP215";}
return "SKIP215";
} 
//
this.NSKIP215 = function() {
//
this.A_REG=this.VAR_A$;
this.STROUT();
return 62240;
//
return 62230;
} 
//
this.SKIP215 = function() {
return 62230;
} 
//
this.line_62230 = function() {
//
this.A_REG=this.VAR_A$;
this.STROUT();
this.LINEBREAK();
return 62240;
} 
//
this.line_62240 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_PL_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_PL_int=this.X_REG;
this.VAR_PL_int=Math.floor(this.VAR_PL_int);
//
return "RETURN";
} 
//
this.line_62300 = function() {
//
return 62305;
} 
//
this.line_62305 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP216";}
return "SKIP216";
} 
//
this.NSKIP216 = function() {
return "RETURN";
//
return 62310;
} 
//
this.SKIP216 = function() {
return 62310;
} 
//
this.line_62310 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.VAR_I=this.Y_REG;
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP55","VAR_I");
return 62320;
} 
//
this.FORLOOP55 = function() {
return 62320;
} 
//
this.line_62320 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_133;
// ignored: CHGCTX #0
this._stack.push(this.B_REG);
this.C_REG=this.VAR_I;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.CHARAT();
this.B_REG=this._stack.pop();
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP217";}
return "SKIP217";
} 
//
this.NSKIP217 = function() {
//
this.Y_REG=this.VAR_I;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_53;
this.VAR_I=this.Y_REG;
//
return 62330;
} 
//
this.SKIP217 = function() {
return 62330;
} 
//
this.line_62330 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 62340;
} 
//
this.line_62340 = function() {
//
this.Y_REG=this.VAR_EL_int;
this._stack.push(this.Y_REG);
//
this.COMPACTMAX();
this.Y_REG=this.VAR_II;
this._stack.push(this.Y_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this.CONST_6;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.RIGHT();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_EX$_array;
this.ARRAYSTORE_STRING();
return 62350;
} 
//
this.line_62350 = function() {
//
this.Y_REG=this.VAR_EL_int;
this._stack.push(this.Y_REG);
//
this.COMPACTMAX();
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_II;
this.X_REG=this.X_REG-this.Y_REG;
this.C_REG=this.X_REG;
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.LEFT();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_XN$_array;
this.ARRAYSTORE_STRING();
return 62360;
} 
//
this.line_62360 = function() {
//
this.Y_REG=this.VAR_EL_int;
this._stack.push(this.Y_REG);
//
this.COMPACTMAX();
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_II;
this.X_REG=this.X_REG+this.Y_REG;
this._stack.push(this.X_REG);
this.C_REG=this.CONST_2;
this._stack.push(this.C_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_A$;
this.D_REG=this._stack.pop();
this.C_REG=this._stack.pop();
this.MID();
this.B_REG=this.A_REG;
// ignored: CHGCTX #0
this.VAL();
this.Y_REG=this.X_REG;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_LK_int_array;
this.ARRAYSTORE_INTEGER();
return 62370;
} 
//
this.line_62370 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_EL_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_EL_int=this.X_REG;
this.VAR_EL_int=Math.floor(this.VAR_EL_int);
//
return "RETURN";
} 
//
this.line_62400 = function() {
//
return 62405;
} 
//
this.line_62405 = function() {
//
this.B_REG=this.VAR_A$;
this.LEN();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP218";}
return "SKIP218";
} 
//
this.NSKIP218 = function() {
return "RETURN";
//
return 62410;
} 
//
this.SKIP218 = function() {
return 62410;
} 
//
this.line_62410 = function() {
//
this.Y_REG=this.VAR_IL_int;
this._stack.push(this.Y_REG);
//
this.A_REG=this.VAR_A$;
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_RI$_array;
this.ARRAYSTORE_STRING();
return 62420;
} 
//
this.line_62420 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IL_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_IL_int=this.X_REG;
this.VAR_IL_int=Math.floor(this.VAR_IL_int);
//
return "RETURN";
} 
//
this.line_62500 = function() {
//
return 62510;
} 
//
this.line_62510 = function() {
//
this.GOSUB("GOSUBCONT150");
return 62900;
} 
//
this.GOSUBCONT150 = function() {
return 62520;
} 
//
this.line_62520 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_XC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP219";}
return "SKIP219";
} 
//
this.NSKIP219 = function() {
return "RETURN";
//
return 62530;
} 
//
this.SKIP219 = function() {
return 62530;
} 
//
this.line_62530 = function() {
//
this._memory[646]=Math.floor(this.CONST_69) & 255;
//
this.A_REG=this.CONST_141;
this.STROUT();
return 62540;
} 
//
this.line_62540 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_XC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP56","VAR_I");
return 62550;
} 
//
this.FORLOOP56 = function() {
return 62550;
} 
//
this.line_62550 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_I;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP220";}
return "SKIP220";
} 
//
this.NSKIP220 = function() {
//
this.A_REG=this.CONST_73;
this.STROUT();
//
return 62560;
} 
//
this.SKIP220 = function() {
return 62560;
} 
//
this.line_62560 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_XP$_array;
this.ARRAYACCESS_STRING();
this.STROUT();
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.LINEBREAK();
//
return "RETURN";
} 
//
this.line_62600 = function() {
//
return 62610;
} 
//
this.line_62610 = function() {
//
this.GOSUB("GOSUBCONT151");
return 62750;
} 
//
this.GOSUBCONT151 = function() {
return 62660;
} 
//
this.line_62660 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_TC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP221";}
return "SKIP221";
} 
//
this.NSKIP221 = function() {
return "RETURN";
//
return 62670;
} 
//
this.SKIP221 = function() {
return 62670;
} 
//
this.line_62670 = function() {
//
this._memory[646]=Math.floor(this.CONST_57) & 255;
//
this.A_REG=this.CONST_142;
this.STROUT();
return 62680;
} 
//
this.line_62680 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_A$=this.B_REG;
//
this.Y_REG=this.CONST_143;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP57","VAR_I");
return "FORLOOP57";
} 
//
this.FORLOOP57 = function() {
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_IP_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
// ignored: CHGCTX #1
this.G_REG=this.VAR_IT$_array;
this.ARRAYACCESS_STRING();
this.VAR_B$=this.A_REG;
return 62690;
} 
//
this.line_62690 = function() {
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_I;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP222";}
return "SKIP222";
} 
//
this.NSKIP222 = function() {
//
this.COMPACTMAX();
this.B_REG=this.CONST_73;
this.A_REG=this.VAR_A$;
this.CONCAT();
this.VAR_A$=this.A_REG;
//
this.Y_REG=this.CONST_6;
this.X_REG=this.VAR_II;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_II=this.X_REG;
//
return 62700;
} 
//
this.SKIP222 = function() {
return 62700;
} 
//
this.line_62700 = function() {
//
this.B_REG=this.VAR_B$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.VAR_II;
this.X_REG=this.X_REG+this.Y_REG;
this.Y_REG=this.CONST_128;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP223";}
return "SKIP223";
} 
//
this.NSKIP223 = function() {
//
this.A_REG=this.VAR_A$;
this.STROUT();
this.LINEBREAK();
//
this.B_REG=this.CONST_11;
this.VAR_A$=this.B_REG;
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
return 62710;
} 
//
this.SKIP223 = function() {
return 62710;
} 
//
this.line_62710 = function() {
//
this.COMPACTMAX();
this.B_REG=this.VAR_B$;
this.A_REG=this.VAR_A$;
this.CONCAT();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.VAR_B$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.VAR_II;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_II=this.X_REG;
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 62720;
} 
//
this.line_62720 = function() {
//
this.A_REG=this.VAR_A$;
this.STROUT();
this.LINEBREAK();
//
return "RETURN";
} 
//
this.line_62750 = function() {
//
return 62752;
} 
//
this.line_62752 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_TC_int=this.Y_REG;
this.VAR_TC_int=Math.floor(this.VAR_TC_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IL_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP224";}
return "SKIP224";
} 
//
this.NSKIP224 = function() {
return 62795;
//
return 62755;
} 
//
this.SKIP224 = function() {
return 62755;
} 
//
this.line_62755 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IL_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP58","VAR_I");
return "FORLOOP58";
} 
//
this.FORLOOP58 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_RI$_array;
this.ARRAYACCESS_STRING();
this.B_REG=this.A_REG;
// ignored: CHGCTX #0
this.VAL();
this.VAR_P=this.X_REG;
//
this.Y_REG=this.CONST_1;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_IC_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP225";}
return "SKIP225";
} 
//
this.NSKIP225 = function() {
return 62775;
//
return 62760;
} 
//
this.SKIP225 = function() {
return 62760;
} 
//
this.line_62760 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_IC_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP59","VAR_II");
return "FORLOOP59";
} 
//
this.FORLOOP59 = function() {
//
this.X_REG=this.VAR_II;
this.G_REG=this.VAR_IV_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.VAR_P;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP226";}
return "SKIP226";
} 
//
this.NSKIP226 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_FF_int=this.Y_REG;
this.VAR_FF_int=Math.floor(this.VAR_FF_int);
//
this.Y_REG=this.VAR_IC_int;
this.VAR_II=this.Y_REG;
//
return 62770;
} 
//
this.SKIP226 = function() {
return 62770;
} 
//
this.line_62770 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_FF_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP227";}
return "SKIP227";
} 
//
this.NSKIP227 = function() {
return 62790;
//
return 62775;
} 
//
this.SKIP227 = function() {
return 62775;
} 
//
this.line_62775 = function() {
//
this.X_REG=this.VAR_P;
this.G_REG=this.VAR_RS_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_2;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP228";}
return "SKIP228";
} 
//
this.NSKIP228 = function() {
return 62790;
//
return 62780;
} 
//
this.SKIP228 = function() {
return 62780;
} 
//
this.line_62780 = function() {
//
this.Y_REG=this.VAR_TC_int;
this.X_REG=this.Y_REG;
this.Y_REG=this.VAR_P;
this.G_REG=this.VAR_IP_int_array;
this.ARRAYSTORE_INTEGER();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_TC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_TC_int=this.X_REG;
this.VAR_TC_int=Math.floor(this.VAR_TC_int);
return 62790;
} 
//
this.line_62790 = function() {
//
//
this.NEXT("VAR_I");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 62795;
} 
//
this.line_62795 = function() {
//
this.GOSUB("GOSUBCONT152");
return 41300;
} 
//
this.GOSUBCONT152 = function() {
//
return "RETURN";
} 
//
this.line_62900 = function() {
//
return 62905;
} 
//
this.line_62905 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_XC_int=this.Y_REG;
this.VAR_XC_int=Math.floor(this.VAR_XC_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_EL_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP229";}
return "SKIP229";
} 
//
this.NSKIP229 = function() {
return "RETURN";
//
return 62910;
} 
//
this.SKIP229 = function() {
return 62910;
} 
//
this.line_62910 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_I=this.Y_REG;
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_EL_int;
this.X_REG=this.X_REG-this.Y_REG;
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP60","VAR_I");
return "FORLOOP60";
} 
//
this.FORLOOP60 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_P_int=this.Y_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
//
this.X_REG=this.VAR_I;
this.G_REG=this.VAR_LK_int_array;
// ignored: CHGCTX #0
this.ARRAYACCESS_INTEGER();
this.Y_REG=this.CONST_1;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP230";}
return "SKIP230";
} 
//
this.NSKIP230 = function() {
return 62940;
//
return 62920;
} 
//
this.SKIP230 = function() {
return 62920;
} 
//
this.line_62920 = function() {
//
this.Y_REG=this.CONST_1;
this.VAR_P_int=this.Y_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
//
this.Y_REG=this.CONST_1;
this.VAR_II=this.Y_REG;
//
this.Y_REG=this.CONST_4;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP61","VAR_II");
return "FORLOOP61";
} 
//
this.FORLOOP61 = function() {
//
this.Y_REG=this.VAR_II;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this.CONST_24;
this.X_REG=this.X_REG*this.Y_REG;
this._stack.push(this.X_REG);
this.Y_REG=this.VAR_RD_int;
this.X_REG=Math.floor(this.Y_REG);
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG+this.Y_REG;
// ignored: CHGCTX #1
this.G_REG=this.VAR_LX$_array;
this.ARRAYACCESS_STRING();
this.VAR_TX$=this.A_REG;
//
this.GOSUB("GOSUBCONT153");
return 63100;
} 
//
this.GOSUBCONT153 = function() {
//
this.B_REG=this.VAR_TX$;
this.VAR_A1$=this.B_REG;
return 62925;
} 
//
this.line_62925 = function() {
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_EX$_array;
this.ARRAYACCESS_STRING();
this.VAR_TX$=this.A_REG;
//
this.GOSUB("GOSUBCONT154");
return 63100;
} 
//
this.GOSUBCONT154 = function() {
//
this.B_REG=this.VAR_TX$;
this.VAR_A2$=this.B_REG;
//
this.B_REG=this.VAR_A2$;
this.A_REG=this.VAR_A1$;
// ignored: CHGCTX #0
this.SEQ();
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP231";}
return "SKIP231";
} 
//
this.NSKIP231 = function() {
//
this.Y_REG=this.CONST_2;
this.VAR_P_int=this.Y_REG;
this.VAR_P_int=Math.floor(this.VAR_P_int);
//
this.Y_REG=this.CONST_55;
this.VAR_II=this.Y_REG;
//
return 62930;
} 
//
this.SKIP231 = function() {
return 62930;
} 
//
this.line_62930 = function() {
//
//
this.NEXT("VAR_II");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_P_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP232";}
return "SKIP232";
} 
//
this.NSKIP232 = function() {
return 62950;
//
return 62940;
} 
//
this.SKIP232 = function() {
return 62940;
} 
//
this.line_62940 = function() {
//
this.Y_REG=this.VAR_XC_int;
this._stack.push(this.Y_REG);
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_EX$_array;
this.ARRAYACCESS_STRING();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_XP$_array;
this.ARRAYSTORE_STRING();
//
this.Y_REG=this.VAR_XC_int;
this._stack.push(this.Y_REG);
//
this.X_REG=this.VAR_I;
// ignored: CHGCTX #1
this.G_REG=this.VAR_XN$_array;
this.ARRAYACCESS_STRING();
this.X_REG=this._stack.pop();
this.G_REG=this.VAR_XX$_array;
this.ARRAYSTORE_STRING();
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_XC_int;
this.X_REG=this.X_REG+this.Y_REG;
this.VAR_XC_int=this.X_REG;
this.VAR_XC_int=Math.floor(this.VAR_XC_int);
return 62950;
} 
//
this.line_62950 = function() {
//
//
this.NEXT("VAR_I");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
return "RETURN";
} 
//
this.line_63000 = function() {
//
return 63002;
} 
//
this.line_63002 = function() {
//
this.Y_REG=this.VAR_PY_int;
if ((this.Y_REG==this.CONST_1?0:1)==1) {
return "NSKIP233";}
return "SKIP233";
} 
//
this.NSKIP233 = function() {
return "RETURN";
//
return 63005;
} 
//
this.SKIP233 = function() {
return 63005;
} 
//
this.line_63005 = function() {
//
this.X_REG=Math.floor(this._memory[211]) & 255;
this.VAR_I_int=this.X_REG;
this.VAR_I_int=Math.floor(this.VAR_I_int);
//
this.X_REG=Math.floor(this._memory[214]) & 255;
this.VAR_II_int=this.X_REG;
this.VAR_II_int=Math.floor(this.VAR_II_int);
//
this._memory[646]=Math.floor(this.CONST_116) & 255;
return 63010;
} 
//
this.line_63010 = function() {
//
this.Y_REG=this.CONST_144;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_145;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP62","VAR_P");
return "FORLOOP62";
} 
//
this.FORLOOP62 = function() {
//
this.Y_REG=this.VAR_P;
this._memory[Math.floor(this.Y_REG)]=Math.floor(this.CONST_116) & 255;
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 63015;
} 
//
this.line_63015 = function() {
//
this.Y_REG=this.CONST_146;
this.VAR_P=this.Y_REG;
//
this.Y_REG=this.CONST_147;
this._stack.push(this.Y_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP63","VAR_P");
return "FORLOOP63";
} 
//
this.FORLOOP63 = function() {
//
this.Y_REG=this.VAR_P;
this._memory[Math.floor(this.Y_REG)]=Math.floor(this.CONST_148) & 255;
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
return 63030;
} 
//
this.line_63030 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.CONST_149;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
//
this.COMPACTMAX();
this.Y_REG=this.CONST_150;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
//
this.A_REG=this.VAR_RL$;
this.STROUT();
return 63035;
} 
//
this.line_63035 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_PO_int;
// ignored: CHGCTX #1
this.STR();
this.VAR_A$=this.A_REG;
//
this.B_REG=this.VAR_A$;
// ignored: CHGCTX #0
this.LEN();
this._stack.push(this.X_REG);
// ignored: CHGCTX #1
this.B_REG=this.VAR_RL$;
// ignored: CHGCTX #0
this.LEN();
this.Y_REG=this.X_REG;
this.X_REG=this.CONST_9;
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this._stack.pop();
this.X_REG=this.X_REG-this.Y_REG;
this.Y_REG=this.X_REG;
// ignored: CHGCTX #1
this.SPC();
//
this.A_REG=this.VAR_A$;
this.STROUT();
this.LINEBREAK();
return 63036;
} 
//
this.line_63036 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.CONST_151;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
this.LINEBREAK();
//
this._memory[646]=Math.floor(this.CONST_12) & 255;
return 63040;
} 
//
this.line_63040 = function() {
//
this.X_REG=this.VAR_II_int;
this._memory[781]=Math.floor(this.X_REG) & 255;
//
this.X_REG=this.VAR_I_int;
this._memory[782]=Math.floor(this.X_REG) & 255;
//
this._memory[783]=Math.floor(this.CONST_1) & 255;
//
this.SYSCALL("$fff0();")
//
return "RETURN";
} 
//
this.line_63100 = function() {
//
return 63105;
} 
//
this.line_63105 = function() {
//
this.B_REG=this.VAR_TX$;
// ignored: CHGCTX #0
this.LEN();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
this.Y_REG=this.CONST_1;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP234";}
return "SKIP234";
} 
//
this.NSKIP234 = function() {
return "RETURN";
//
return 63106;
} 
//
this.SKIP234 = function() {
return 63106;
} 
//
this.line_63106 = function() {
//
this.Y_REG=this.CONST_2;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG==this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP235";}
return "SKIP235";
} 
//
this.NSKIP235 = function() {
return 63180;
//
return 63110;
} 
//
this.SKIP235 = function() {
return 63110;
} 
//
this.line_63110 = function() {
//
this.B_REG=this.CONST_11;
this.VAR_SX$=this.B_REG;
//
this.Y_REG=this.CONST_2;
this.VAR_PP=this.Y_REG;
//
this.B_REG=this.VAR_TX$;
// ignored: CHGCTX #0
this.LEN();
this._stack.push(this.X_REG);
//
this.Y_REG=this.CONST_2;
this._stack.push(this.Y_REG);
//
this.INITFOR("FORLOOP64","VAR_PP");
return 63120;
} 
//
this.FORLOOP64 = function() {
return 63120;
} 
//
this.line_63120 = function() {
//
this.COMPACTMAX();
this.C_REG=this.VAR_PP;
this.D_REG=this.CONST_2;
// ignored: CHGCTX #1
this.B_REG=this.VAR_TX$;
this.MID();
this.B_REG=this.A_REG;
// ignored: CHGCTX #0
this.ASC();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
return 63130;
} 
//
this.line_63130 = function() {
//
this.GOSUB("GOSUBCONT155");
return 63250;
} 
//
this.GOSUBCONT155 = function() {
return 63150;
} 
//
this.line_63150 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_C_int;
// ignored: CHGCTX #1
this.CHR();
this.B_REG=this.A_REG;
this.A_REG=this.VAR_SX$;
this.CONCAT();
this.VAR_SX$=this.A_REG;
return 63160;
} 
//
this.line_63160 = function() {
//
//
this.NEXT("0");
if ((this.A_REG==this.CONST_1?0:1)==0) {
return "($JUMP)";}
//
this.B_REG=this.VAR_SX$;
this.VAR_TX$=this.B_REG;
//
return "RETURN";
} 
//
this.line_63180 = function() {
//
this.B_REG=this.VAR_TX$;
// ignored: CHGCTX #0
this.ASC();
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
return 63190;
} 
//
this.line_63190 = function() {
//
this.GOSUB("GOSUBCONT156");
return 63250;
} 
//
this.GOSUBCONT156 = function() {
return 63210;
} 
//
this.line_63210 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.VAR_C_int;
// ignored: CHGCTX #1
this.CHR();
this.VAR_TX$=this.A_REG;
//
return "RETURN";
} 
//
this.line_63250 = function() {
//
return 63260;
} 
//
this.line_63260 = function() {
//
this.Y_REG=this.CONST_123;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP236";}
return "SKIP236";
} 
//
this.NSKIP236 = function() {
//
this.Y_REG=this.CONST_85;
this.X_REG=this.VAR_C_int;
this.X_REG=this.X_REG-this.Y_REG;
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
return 63270;
} 
//
this.SKIP236 = function() {
return 63270;
} 
//
this.line_63270 = function() {
//
this.Y_REG=this.CONST_89;
this.X_REG=this.VAR_C_int;
this.X_REG=(this.X_REG>this.Y_REG?-1:0);
if ((this.X_REG==this.CONST_1?0:1)==1) {
return "NSKIP237";}
return "SKIP237";
} 
//
this.NSKIP237 = function() {
//
this.Y_REG=this.CONST_86;
this.X_REG=this.VAR_C_int;
this.X_REG=this.X_REG-this.Y_REG;
this.VAR_C_int=this.X_REG;
this.VAR_C_int=Math.floor(this.VAR_C_int);
//
return 63280;
} 
//
this.SKIP237 = function() {
return 63280;
} 
//
this.line_63280 = function() {
//
return "RETURN";
} 
//
this.line_63300 = function() {
//
return 63310;
} 
//
this.line_63310 = function() {
//
this.COMPACTMAX();
this.Y_REG=this.CONST_57;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
//
this.COMPACTMAX();
this.Y_REG=this.CONST_152;
// ignored: CHGCTX #1
this.CHR();
this.STROUT();
this.LINEBREAK();
//
this._memory[53280]=Math.floor(this.CONST_1) & 255;
//
this._memory[53281]=Math.floor(this.CONST_1) & 255;
//
this._memory[646]=Math.floor(this.CONST_12) & 255;
return 63320;
} 
//
this.line_63320 = function() {
//
return "RETURN";
} 
//
this.line_63400 = function() {
//
this.END();
return;
}
// *** SUBROUTINES ***
this.restart = false;
this.running = true;
this.keyPressed=null;
this.lineNumber = 0;
this.timeOut=0;
this.funcName = "PROGRAMSTART";
this.batchSize=500;
this.tmpy=0;
this.disk=new Disk(this);
this.consoleMode=false;
this._waitingForInput=false;
this._consoleInput="";
this._consoleInputReady=null;
this._inputWait={};
function File() {
this.name;
this.content=new Array();
}
function FilePointer() {
this.channel=0;
this.file=null;
this.position=0;
this.mode="r";
this.disk=null;
this.master=null;
this.write = function(text) {
if (this.mode!="w") {
this.disk.flagError();
return;
}
this.file.content.push.apply(this.file.content, String(text).split(''));
}
this.readString = function() {
return this.readLine().trimStart();
}
this.readLine = function() {
if (this.file.missing) {
this.disk.status=128;
return "";
}
var ret="";
var content=this.file.content;
for (var i=this.position; i<content.length; i++) {
var c=content[i];
this.position++;
c=this.master.convert(c);
if (c==',' || c==':' || c=='\n' || c=='\r') {
if (c=='\n' && i<content.length-1 && content [i+1]=='\r') {
this.position++;
}
if (c=='\r' && i<content.length-1 && content [i+1]=='\n') {
this.position++;
}
if (i==content.length-1) {
this.disk.flagError();
}
return ret;
}
ret=ret+c;
}
this.disk.flagError();
return ret;
}
}
function Disk(master) {
this.files=new Array();
this.openFiles=new Array();
this.status=0;
this.master=master;
this.storageKey = function() {
var script=typeof document!="undefined" && document.getElementById('_compiledCode');
return "basicv2:files:"+(script ? new URL(script.src, location.href).pathname : location.pathname);
}
this.loadLocalFiles = function(files) {
if (!files || typeof files!="object") {
return;
}
for (var name in files) {
if (Object.prototype.hasOwnProperty.call(files, name) && typeof files[name]=="string") {
var file=new File();
file.name=name.toLowerCase();
file.content=files[name].split('');
this.files.push(file);
}
}
}
this.init = function() {
this.status=0;
}
this.getStatus = function() {
return this.status;
}
this.flagError = function() {
this.status=64;
}
this.get = function(channel) {
for (var i=0; i<this.openFiles.length; i++) {
var file=this.openFiles[i];
if (file.channel==channel) {
return file;
}
}
console.log("Channel "+channel+" not open");
return null;
}
this.open = function(channel, device, subAddr, name) {
this.close(channel);
this.init();
// DOS command channels are not files to fetch from the server.
if (subAddr==15 || /^[a-z]:/i.test(name)) {
console.log("disk command ignored: "+name);
return;
}
name=name.toLowerCase();
var parts=name.split(",");
var type="s";
var mode="r";
if (parts.length>1) {
name=parts[0];
if (parts.length==2) {
mode=parts[1];
} else {
mode=parts[2];
type=parts[1];
}
if (mode.length>1) {
mode=mode.substring(0,1);
}
}
if (subAddr==0) {
mode="r";
}
if (subAddr==1) {
mode="w";
}
var found=null;
for (var i=0; i<this.files.length; i++) {
var file=this.files[i];
if (file.name==name) {
found=file;
break;
}
}
this.init();
if (!found) {
found=new File();
found.name=name;
if (mode=="r") {
var disk=this;
var xhr = new XMLHttpRequest();
console.log("grabbing file "+name);
xhr.open('GET', name, false);
xhr.overrideMimeType("text/plain; charset=x-user-defined");
xhr.onload = function() {
if (xhr.status === 200) {
found.content=xhr.responseText.split('');
//console.log("debug: "+xhr.responseText);
console.log("file "+name+" loaded from remote");
}
else {
console.log("file "+name+" not found");
found.missing=true;
// ST has no file-not-found bit; 128 is a non-EOF I/O error.
disk.status=128;
}
};
xhr.send();
}
if (!found.missing) {
this.files.push(found);
}
}
if (mode=="w") {
found.content=new Array();
console.log("emtpy file "+name+" created");
}
console.log("file "+name+" opened");
var pointer=new FilePointer();
pointer.file=found;
pointer.channel=channel;
pointer.position=0;
pointer.mode=mode;
pointer.disk=this;
pointer.master=this.master;
this.openFiles.push(pointer);
}
this.persist = function(file) {
var content=file.content.join('');
if (typeof importScripts=="function") {
self.postMessage({type:"disk-save", name:file.name, content:content});
} else if (typeof location!="undefined") {
try {
if (typeof localStorage=="undefined") {
return;
}
var key=this.storageKey();
var saved=JSON.parse(localStorage.getItem(key) || "{}");
if (!saved || typeof saved!="object" || Array.isArray(saved)) {
saved={};
}
saved[file.name]=content;
localStorage.setItem(key, JSON.stringify(saved));
} catch (e) {
console.warn("Unable to persist saved file "+file.name, e);
this.flagError();
}
}
}
this.close = function(channel) {
this.init();
for (var i=0; i<this.openFiles.length; i++) {
var file=this.openFiles[i];
if (file.channel==channel) {
if (file.mode=="w") {
this.persist(file.file);
}
console.log("closed channel "+channel+"/"+file.file.name);
this.openFiles.splice(i, 1);
break;
}
}
}
if (typeof importScripts!="function" && typeof location!="undefined") {
try {
if (typeof localStorage!="undefined") {
this.loadLocalFiles(JSON.parse(localStorage.getItem(this.storageKey()) || "{}"));
}
} catch (e) {
console.warn("Unable to load locally saved files", e);
}
}
}
this.getMemory = function() {
return this._memory;
}
this.registerKey= function(key) {
if (this.consoleMode && this._waitingForInput) {
if (!key[0]) {
return;
}
var pressed=key[1];
if (pressed=="Enter" || pressed=="Return" || pressed=="\r" || pressed=="\n") {
this._consoleInputReady=this._consoleInput;
this._consoleInput="";
this._waitingForInput=false;
this.keyPressed=null;
this._memory[198]=0;
this.out("\n");
var ctx=this;
self.setTimeout(function() {
ctx.executeThreaded();
}, 0);
} else if (pressed=="Backspace" || pressed=="Delete" || pressed=="\b") {
if (this._consoleInput.length>0) {
this._consoleInput=this._consoleInput.slice(0, -1);
this.out("\x14");
}
} else if (pressed && pressed.length==1) {
this._consoleInput+=pressed;
this.out(this.convertKeyboard(pressed));
}
return;
}
var k=key[1];
var ctx=this;
if (k.length>1) {
k=String.fromCharCode(key[2]);
}
if (key[0]) {
this.keyPressed=k;
this._memory[198]=1;
self.setTimeout(function() {
ctx.keyPressed=null;
ctx._memory[198]=0;
}, 200);
} else {
this.keyPressed=null;
this._memory[198]=0;
}
}
this.execute = function(threaded) {
if (!threaded) {
do  {
this.reinit();
while (this.running) {
this.executeLine(threaded);
}
} while(this.restart);
} else {
this.reinit();
this.executeThreaded();
}
}
this.executeThreaded = function() {
var cnt=0;
do {
do {
if (this.restart) {
this.reinit();
}
this.executeLine(true);
} while(this.running && !this._waitingForInput && cnt++<this.batchSize);
if (this.running && !this._waitingForInput) {
var ctx=this;
self.setTimeout(function() {
ctx.executeThreaded();
}, this.timeOut);
this.timeOut=0;
}
} while(this.restart);
}
this.reinit = function() {
this.lineNumber = 0;
this.funcName = "PROGRAMSTART";
this.restart=false;
this.running=true;
}
this.executeLine = function(threaded) {
var nextLine;
try {
nextLine = this[this.funcName]();
} catch (e) {
if (e !== this._inputWait) {
throw e;
}
this._waitingForInput=true;
return;
}
if (nextLine != null) {
this.lineNumber = nextLine;
if (this.lineNumber == "($JUMP)") {
this.lineNumber = this.JUMP_TARGET;
}
if (Number.isInteger(this.lineNumber)) {
this.funcName = "line_" + this.lineNumber;
} else {
this.funcName = this.lineNumber;
}
} else {
this.running = false;
}
if (threaded) {
_self.postMessage(this.funcName);
}
}
this.START = function() {
this.INIT();
if (!Array.prototype.fill) {
for (var i=0; i<this._memory.length; i++) {
this._memory[i]=0;
}
} else {
this._memory.fill(0);
}
this._memory[646]=14;
if (this.consoleMode) {
this._memory[1]=55;
}
}
this.RUN = function() {
this.running=false;
this.restart=true;
}
this.RESTARTPRG = function() {
// This is not correct behaviour as BASIC does it, because it doesn't preserve the variables, but...who cares?
this.running=false;
this.restart=true;
}
this.END = function() {
//
}
this.CLEARQUEUE = function() {
this._inputQueue=new Array();
}
this.QUEUESIZE = function() {
this.X_REG=this._inputQueue.length;
}
this.EXTRAIGNORED = function() {
out("?extra ignored!");
}
this.INPUTNUMBER = function() {
var inp=this.input();
if (this.isNumeric(inp)) {
this.Y_REG=parseFloat(inp);
this.X_REG=0;
} else {
if (inp.length==0) {
this.Y_REG=0;
this.X_REG=0;
} else {
this.X_REG=-1;
}
}
}
this.INPUTSTR = function() {
var inp=this.input();
this.A_REG=inp;
}
this.GETSTR = function() {
this.A_REG=this.get();
}
this.GETNUMBER = function() {
this.Y_REG=0;
var fk=this.get();
if (fk && this.isNumeric(fk)) {
this.Y_REG=parseFloat(fk);
} else {
out("?syntax error");
}
}
this.isNumeric = function(num) {
return !isNaN(parseFloat(num));
}
this.GOSUB = function(gosubCont) {
this._forstack.push(gosubCont);
this._forstack.push(0);
}
this.RETURN = function() {
var val = 0;
if (this._forstack.length == 0) {
throw "RETURN without GOSUB error!";
}
do {
val = this._forstack.pop();
if (val == 1) {
// skip FORs
this._forstack.pop();
this._forstack.pop();
this._forstack.pop();
this._forstack.pop();
}
} while (val != 0);
return this._forstack.pop();
}
this.adjustStack = function(variable) {
for (var i=this._forstack.length; i>0;) {
var type = this._forstack[i-1];
if (type==0) {
return;
}
var stvar = this._forstack[i-2];
var addr = this._forstack[i-3];
var end = this._forstack[i-4];
var step = this._forstack[i-5];
i-=5;
if (stvar==variable) {
this._forstack=this._forstack.slice(0,i);
return;
}
}
}
this.INITFOR = function(addr, variable) {
this.adjustStack(variable);
this._forstack.push(this._stack.pop()); // step
this._forstack.push(this._stack.pop()); // end
this._forstack.push(addr); // address
this._forstack.push(variable); // var ref
this._forstack.push(1); // type
}
this.NEXT = function(variable) {
var found = false;
do {
if (this._forstack.length == 0) {
throw "NEXT without FOR error!";
}
var type = this._forstack.pop();
if (type == 0) {
throw "NEXT without FOR error!";
}
var stvar = this._forstack.pop();
var addr = this._forstack.pop();
var end = this._forstack.pop();
var step = this._forstack.pop();
found = variable == "0" || variable == stvar;
} while (!found);
this[stvar] += step;
if ((step >= 0 && this[stvar] <= end) || (step < 0 && this[stvar] >= end)) {
// restore stack content if needed
this._forstack.push(step); // step
this._forstack.push(end); // end
this._forstack.push(addr); // address
this._forstack.push(stvar); // var ref
this._forstack.push(1); // type
this.A_REG = 0;
this.JUMP_TARGET = addr;
return;
}
this.A_REG = 1;
return;
}
this.ARRAYACCESS_REAL = function() {
this.X_REG = this.G_REG[Math.floor(this.X_REG)];
if (this.X_REG==null) {
this.X_REG=0;
}
}
this.ARRAYACCESS_INTEGER = function() {
this.X_REG = this.G_REG[Math.floor(this.X_REG)];
if (this.X_REG==null) {
this.X_REG=0;
}
this.X_REG=Math.floor(this.X_REG);
}
this.ARRAYACCESS_STRING = function() {
this.A_REG = this.G_REG[Math.floor(this.X_REG)];
if (this.A_REG==null) {
this.A_REG="";
}
}
this.ARRAYSTORE_REAL = function() {
this.G_REG[Math.floor(this.X_REG)] = this.Y_REG;
}
this.ARRAYSTORE_INTEGER = function() {
this.G_REG[Math.floor(this.X_REG)] = Math.floor(this.Y_REG);
}
this.ARRAYSTORE_STRING = function() {
this.G_REG[Math.floor(this.X_REG)] = this.A_REG;
}
this.STR = function() {
this.A_REG=(this.Y_REG>=0 ? " " : "")+this.Y_REG.toString(10);
}
this.VAL = function() {
this.X_REG=parseFloat((""+this.B_REG).replace(/ /g,""));
}
this.LEN = function() {
if (this.B_REG==null) {
this.B_REG="";
}
this.X_REG=this.B_REG.length;
}
this.CHR = function() {
this.A_REG=String.fromCharCode(Math.floor(this.Y_REG));
}
this.ASC = function() {
if (this.B_REG.length==0) {
this.X_REG=0;
return;
}
var cc=this.B_REG.charCodeAt(0);
//var c=this.B_REG.charAt(0);
//if (c>='a' && c<='z') {
//	cc-=32;
//}
this.X_REG=cc;
}
this.POS = function() {
this.X_REG=this._line.length;
}
this.TAB = function() {
var tb=Math.floor(this.Y_REG);
tb-=this._line.length;
for (var i=0;i<tb; i++) {
this._line+=" ";
}
}
this.SPC = function() {
var tb=Math.floor(this.Y_REG);
var spaces="";
for (var i=0;i<tb; i++) {
spaces+=" ";
}
if (spaces) {
this.out(spaces);
}
}
this.FRE = function() {
this.X_REG=65535;
}
this.CONCAT = function() {
this.A_REG=this.A_REG+this.B_REG;
}
this.CHARAT = function() {
this.D_REG=1;
return this.MID();
}
this.MID = function() {
if (this.C_REG>this.B_REG.length) {
this.A_REG="";
return;
}
var end=this.C_REG-1+this.D_REG;
if (this.D_REG===-1) {
end=this.B_REG.length;
}
this.A_REG=this.B_REG.substring(this.C_REG-1, end);
}
this.LEFT = function() {
if (this.C_REG>this.B_REG.length) {
this.A_REG=this.B_REG;
return;
}
if (this.C_REG===0) {
this.A_REG="";
return;
}
this.A_REG=this.B_REG.substring(0, this.C_REG);
}
this.RIGHT = function() {
if (this.C_REG>this.B_REG.length) {
this.A_REG=this.B_REG;
return;
}
if (this.C_REG===0) {
this.A_REG="";
return;
}
this.A_REG=this.B_REG.substring(this.B_REG.length-this.C_REG);
}
this.SEQ = function() {
this.X_REG=(this.A_REG===this.B_REG?-1:0);
}
this.SNEQ = function() {
this.X_REG=(this.A_REG===this.B_REG?0:-1);
}
this.SGT = function() {
this.X_REG=(this.A_REG>this.B_REG?-1:0);
}
this.SLT = function() {
this.X_REG=(this.A_REG<this.B_REG?-1:0);
}
this.SGTEQ = function() {
this.X_REG=(this.A_REG>=this.B_REG?-1:0);
}
this.SLTEQ = function() {
this.X_REG=(this.A_REG<=this.B_REG?-1:0);
}
this.COMPACT = function() {
// Nothing to do in this context
}
this.COMPACTMAX = function() {
// Nothing to do in this context
}
this.SYSTEMCALLDYN = function() {
// Nothing to do in this context
}
this.APPENDSYSCHAR = function() {
// Nothing to do in this context
}
this.INPUTLENGTHCHECK = function() {
this._zeroflag=1;
}
this.SETUPMULTIPARS = function() {
// Nothing to do in this context
}
this.COPYSTRINGPAR = function() {
// Nothing to do in this context
}
this.COPYREALPAR = function() {
// Nothing to do in this context
}
this.ADDCOLON = function() {
// Nothing to do in this context
}
this.PULLDOWNMULTIPARS = function() {
// Nothing to do in this context
}
this.STROUT = function() {
this.out(this.A_REG);
}
this.QMARKOUT1 = function() {
if (this._memory[19]!=1) {
this.out("?");
}
}
this.CRSRRIGHT = function() {
this.out(" ");
}
this.QMARKOUT2 = function() {
if (this._memory[19]!=1) {
this.out("??");
}
}
this.REALOUT = function() {
this.out(this.X_REG);
}
this.INTOUT = function() {
this.out(this.X_REG);
}
this.CHECKCMD = function() {
//
}
this.LINEBREAK = function() {
this.out("\n");
}
this.TABOUT = function() {
this.out("\t");
}
this.WRITETID = function(value) {
var d = new Date();
this._time = d.getTime();
this._timeOffset = parseInt(value.substring(0, 2), 10) * 1000 * 60 * 60
+ parseInt(value.substring(2, 4), 10) * 1000 * 60
+ parseInt(value.substring(4, 6), 10) * 1000;
}
this.READTI = function() {
var d = new Date();
var t=d.getTime();
t=Math.floor((t-this._time+this._timeOffset)/(1000.0/60.0));
//console.log("ti: "+t+"/"+this._time+"/"+this._timeOffset+"/"+(t-this._time+this._timeOffset));
this.tmpy=t;
}
this.READTID = function() {
var d = new Date();
var t=d.getTime();
t=(t-this._time+this._timeOffset);
var h=Math.floor(t/(1000 * 60 * 60));
var m=Math.floor((t-(h*(1000 * 60 * 60)))/(1000 * 60));
var s=Math.floor((t-(h*(1000 * 60 * 60))-m*(1000 * 60))/1000);
h=this.fill(h);
m=this.fill(m);
s=this.fill(s);
this.tmpy= h+m+s;
}
this.fill = function(num) {
num=num.toString(10);
if (num.length==1) {
num="0"+num;
}
return num;
}
this.READSTATUS = function() {
this.tmpy= this.disk.getStatus();
}
this.RESTORE = function() {
this._dataPtr=0;
}
this.READSTR = function() {
this.A_REG=this._datas[this._dataPtr++];
}
this.READNUMBER = function() {
var n=this._datas[this._dataPtr++];
if (n=="" || n==".") {
n=0;
}
this.Y_REG=n;
}
this.FINX = function() {
throw new Error("Fast inc optimization not supported for target JS!");
}
this.FDEX = function() {
throw new Error("Fast dec optimization not supported for target JS!");
}
this.FASTFOR = function() {
throw new Error("Fast for optimization not supported for target JS!");
}
this.OPEN = function() {
this.disk.open(this.X_REG, this.C_REG, this.D_REG, this.B_REG);
}
this.CLOSE = function() {
this.disk.close(this.X_REG);
}
this.CMD = function() {
console.log("[CMD not supported for JS, call ignored: "+this.X_REG+"]");
}
this.SYSCALL = function(addr) {
console.log("[SYS not supported for JS, call ignored: "+addr+"]");
}
this.STROUTCHANNEL = function() {
this.disk.get(this.C_REG).write(this.A_REG);
}
this.REALOUTCHANNEL = function() {
this.disk.get(this.C_REG).write(this.X_REG);
}
this.LINEBREAKCHANNEL = function() {
this.disk.get(this.C_REG).write("\n");
}
this.INTOUTCHANNEL = function() {
this.disk.get(this.C_REG).write(this.X_REG);
}
this.LOCKCHANNEL = function() {
// Nothing to do
}
this.UNLOCKCHANNEL = function() {
// Nothing to do
}
this.INPUTNUMBERCHANNEL = function() {
var fp=this.disk.get(this.C_REG);
if (fp.file.missing) {
this.Y_REG=0;
this.X_REG=0;
this.disk.status=128;
return;
}
var inp=fp.readString();
if (this.isNumeric(inp)) {
this.Y_REG=parseFloat(inp);
this.X_REG=0;
} else {
this.X_REG=-1;
}
}
this.INPUTSTRCHANNEL = function() {
var fp=this.disk.get(this.C_REG);
this.A_REG=fp.readString();
}
this.GETSTRCHANNEL = function() {
console.log("[GET# not supported for JS, call ignored]");
this.A_REG="";
}
this.GETNUMBERCHANNEL = function() {
console.log("[GET# not supported for JS, call ignored]");
this.X_REG=0;
}
this.TABOUTCHANNEL = function() {
console.log("[TAB not supported for JS in file mode, redirected to normal TAB]");
this.TAB();
}
this.SPCOUTCHANNEL = function() {
console.log("[SPC not supported for JS in file mode, redirected to normal SPC]");
this.SPC();
}
this.TABCHANNEL = function() {
console.log("[TAB not supported for JS in file mode, redirected to normal TAB]");
this.TAB();
}
this.SPCCHANNEL = function() {
console.log("[SPC not supported for JS in file mode, redirected to normal SPC]");
this.SPC();
}
this.LOAD = function() {
console.log("[LOAD not supported for JS in file mode, call ignored]");
}
this.SAVE = function() {
console.log("[SAVE not supported for JS in file mode, call ignored]");
}
this.VERIFY = function() {
console.log("[VERIFY not supported for JS in file mode, call ignored]");
}
this.REM = function() {
console.log("[inline assembly ignored]");
}
this.USR = function() {
var addr=this._memory[785] + 256*this._memory[786];
this.USR_PARAM=this.X_REG;
var callStr="$"+addr.toString(16);
console.log("[Calling user function named "+callStr+"]");
try {
this[callStr]();
} catch(e) {
console.log("[Function call failed]");
}
}
// Here start the input/output code, that might be adopted to fit ones needs...
this.convertKeyboard = function(text) {
if (!this.flipCasing) {
return text;
}
return text.replace(/[a-zA-Z]/g, function(c) {
return String.fromCharCode(c.charCodeAt(0) ^ 32);
});
}
this.input = function() {
if (this._inputQueue.length>0) {
return this._inputQueue.pop();
}
var inp;
if (this.consoleMode) {
if (this._consoleInputReady===null) {
throw this._inputWait;
}
inp=this.convertKeyboard(this._consoleInputReady);
this._consoleInputReady=null;
} else if (typeof prompt === 'function') {
inp=prompt(this._line);
this._line="";
} else {
console.log("INPUT skipped, no prompt function in this context...");
return "";
}
if (inp) {
var parts=inp.split(",");
parts.reverse();
this._inputQueue.push.apply(this._inputQueue, parts);
return this._inputQueue.pop();
}
return "";
}
// GET relies on INPUT here, because due to the single threaded nature of
// Javascript, the concept of a BASIC program constantly polling the keyboard
// doesn't really work in this context unless you stuff the compiled program
// into a web worker or something like that.
this.get = function() {
var key=this.input();
if (!key) {
return ""
}
return key.substring(0,1);
}
this.out = function(txt) {
if (txt.indexOf && txt.indexOf("\n") != -1) {
this._line += txt;
this.outputter(this._line);
this._line = "";
} else {
this._line += txt;
}
}
this.convert = function(c) {
return c;
}
}

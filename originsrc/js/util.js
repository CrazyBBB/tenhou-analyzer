///////////////////////////////////////////////////////////////////
// TENHOU.NET (C)C-EGG http://tenhou.net/
//-----------------------------------------------------------------
function int(v) {return Math.floor(v);}
function e(n)   {return document.getElementById(n);}
function eh(n,s){e(n).innerHTML=s;}
function en(e,t){return e.getElementsByTagName(t);}
function ei(n,t){return en(e(n),t);}
function fp(n)  {return n>0?"+"+n:n}
function ff(n,d,s){var a=String(n&&d?n/d:0).split(".");return a[0]+"."+((a[1]?a[1]:"")+"00000").slice(0,s);}
function to_safe_html(s){return s.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");}
function to_safe_dquote(s){return s.replace(/"/g,"\\\"");}
function keys(o){
	var i, a=[];
	for(i in o) a.push(i);
	return a;
}
function selo(a,v){var i;for(i=0;i<a.length;++i) if (a[i].value==v) a[i].selected=true;}
function JSONParse(s){
	if (document.documentMode == 8 || document.documentMode == 9){
		return JSON.parse(s);
	}else{
		return eval(s);
	}
}
//-----------------------------------------------------------------
function uiLoadInfo(){
	var info={};
	try{info=eval("({"+cache.get("!STATUS::SCRIPT_INFO")+"})");}catch(e){}
	if (!info) info={};
	if (info.un!=undefined) info.un=decodeURIComponent(info.un);
	return info;
}
function uiSaveInfo(key,val){
	var info=uiLoadInfo();
	info[key]=val;
	var s="";
	s+="ver:1";
	if (info.un  !=undefined) s+=",un:\"" +encodeURIComponent(info.un) +"\"";
	if (info.lb  !=undefined) s+=",lb:"  +int(info.lb  );
	if (info.pf  !=undefined) s+=",pf:"  +int(info.pf );
	if (info.taku!=undefined) s+=",taku:"+int(info.taku);
	cache.set("!STATUS::SCRIPT_INFO",s);
}
function uiUpdateSel(f,o){
	if (o) uiSaveInfo(o.id,f[o.id].value);
	if (!o || o.id=="pf"){
		if (f.taku){
			var pf=int(f.pf.value);
			var taku=f.taku.value;
			var s="<select id=taku onchange=\"uiUpdateSel(document."+f.name+",this);\">";
			switch(int(pf/100)){
			case 0:
				s+="<option value=0>----</option>";
				break;
			case 1:case 2: // 段位戦
				s+="<option value=0>全卓</option>";
				s+="<option value=1>一般</option>";
				s+="<option value=2>上級</option>";
				s+="<option value=3>特上</option>";
				s+="<option value=4>鳳凰</option>";
				break;
			case 3:case 4: // 雀荘戦
				s+="<option value=0>全卓</option>";
				s+="<option value=1>若葉</option>";
				s+="<option value=2>銀  </option>";
				s+="<option value=3>琥珀</option>";
				s+="<option value=4>孔雀</option>";
				break;
			}
			s+="</select>";
			f.taku.outerHTML=s;
			selo(f.taku.options,taku);
		}
	}
}
function uiCreate(f,opt){
	var s="";
	var i;
	if (1){
		var stat_player=cache.get("stat_player").split("\n");
		s+="<select id=un onchange=\"uiUpdateSel(document."+f.name+",this)\">";
		if (opt.all_player) s+="<option value=\"\">全プレーヤ</option>";
		for(i=0;i<stat_player.length;++i){
			var un=stat_player[i];
			s+="<option value=\""+to_safe_dquote(to_safe_html(un))+"\">"+to_safe_html(un)+"</option>";
		}
		s+="</select>";
	}
	if (opt.show_lobby){
		var lb2disp=function(n){return n?(n<10000?"L":"C") + ("000"+(n%10000)).slice(-4):"ランキング戦";}
		var stat_lobby =cache.get("stat_lobby").split("\n");
		s+="<select id=lb onchange=\"uiUpdateSel(document."+f.name+",this);\">";
		if (opt.all_lobby) s+="<option value=\"-1\">全ロビー</option>";
		for(i=0;i<stat_lobby.length;++i){
			var lobby=parseInt(stat_lobby[i]);
			s+="<option value=\""+lobby+"\">"+lb2disp(lobby)+"</option>";
		}
		s+="</select>";
	}
	if (1){
		s+="<select id=pf onchange=\"uiUpdateSel(document."+f.name+",this);\">";
		if (opt.rule_pf& 1)   s+="<option value=0>全ルール</option>";
		if (opt.rule_pf& 2) s+="<option value=100>段位戦 四人打ち</option>";
		if (opt.rule_pf& 4) s+="<option value=110>段位戦 四東</option>";
		if (opt.rule_pf& 8) s+="<option value=111>段位戦 四東 喰断ナシ</option>";
		if (opt.rule_pf& 8) s+="<option value=112>段位戦 四東 喰断アリ</option>";
		if (opt.rule_pf& 8) s+="<option value=113>段位戦 四東 喰アリ赤</option>";
		if (opt.rule_pf& 4) s+="<option value=120>段位戦 四南</option>";
		if (opt.rule_pf& 8) s+="<option value=121>段位戦 四南 喰断ナシ</option>";
		if (opt.rule_pf& 8) s+="<option value=122>段位戦 四南 喰断アリ</option>";
		if (opt.rule_pf& 8) s+="<option value=123>段位戦 四南 喰アリ赤</option>";
		if (opt.rule_pf& 2) s+="<option value=200>段位戦 三人打ち</option>";
		if (opt.rule_pf& 8) s+="<option value=213>段位戦 三東 喰アリ赤</option>";
		if (opt.rule_pf& 8) s+="<option value=223>段位戦 三南 喰アリ赤</option>";
		if (opt.rule_pf&16) s+="<option value=300>雀荘戦 四人打ち</option>";
		if (opt.rule_pf&32) s+="<option value=310>雀荘戦 四東</option>";
		if (opt.rule_pf&64) s+="<option value=311>雀荘戦 四東 喰赤祝０</option>";
		if (opt.rule_pf&64) s+="<option value=312>雀荘戦 四東 喰赤祝２</option>";
		if (opt.rule_pf&64) s+="<option value=313>雀荘戦 四東 喰赤祝５</option>";
		if (opt.rule_pf&32) s+="<option value=320>雀荘戦 四南</option>";
		if (opt.rule_pf&64) s+="<option value=321>雀荘戦 四南 喰赤祝０</option>";
		if (opt.rule_pf&64) s+="<option value=322>雀荘戦 四南 喰赤祝２</option>";
		if (opt.rule_pf&64) s+="<option value=323>雀荘戦 四南 喰赤祝５</option>";
		if (opt.rule_pf&16) s+="<option value=400>雀荘戦 三人打ち</option>";
		if (opt.rule_pf&64) s+="<option value=413>雀荘戦 三東 喰赤祝５</option>";
		if (opt.rule_pf&64) s+="<option value=423>雀荘戦 三南 喰赤祝５</option>";
		s+="</select>";
	}
	if (opt.use_taku){
		s+="<select id=taku></select>";
	}
	s+="<button onclick=\"return selchange(), false;\">表示</button>";
	f.innerHTML=s;

	var info=uiLoadInfo();
	if (f.un   && info.un  !=undefined) info.un=decodeURIComponent(info.un), selo(f.un.options,info.un);
	if (f.lb   && info.lb  !=undefined) selo(f.lb  .options,info.lb  );
//	if (f.pf   && info.pf  !=undefined) selo(f.pf  .options,info.pf  );
	if (f.pf   && info.pf  !=undefined){
		var pf=int(info.pf);
		switch(int(pf/100)){
		case 0:break;
		case 1:case 2:if (!(opt.rule_pf&(4|8))) pf=int(pf/100)*100;break;
		case 3:case 4:
			if (!(opt.rule_pf&(16|32))) switch(pf){
			case 300:
			case 310:pf=313;break;
			case 320:pf=313;break;
			case 400:
			case 410:pf=413;break;
			case 420:pf=423;break;
			}
		}
		selo(f.pf.options,pf);
	}
	uiUpdateSel(f);
	if (f.taku && info.taku!=undefined) selo(f.taku.options,info.taku);
}
function uiGetEnumParam(f){
	enumPlayer =(f.un?    f.un.value :"");
	enumLobbyID=(f.lb?int(f.lb.value):-1);
	var pf=int(f.pf.value);
	enumMatchMask=(pf?GT.NOAKA|GT.NOKUI|GT.NAN|GT.SANMA|GT.JANS|GT.CHIP|GT.TECH:0);
	enumMatch    =0;
	enumSkipMask =0;
	enumSkip     =0;
	if (pf) switch(pf){
	case 100:enumMatch=       0, enumMatchMask=       GT.SANMA|GT.JANS|GT.CHIP|GT.TECH;break; // 段位戦 四麻
	case 110:enumMatch=       0, enumMatchMask=GT.NAN|GT.SANMA|GT.JANS|GT.CHIP|GT.TECH;break; // 段位戦 四 東
	case 120:enumMatch=GT.NAN  , enumMatchMask=GT.NAN|GT.SANMA|GT.JANS|GT.CHIP|GT.TECH;break; // 段位戦 四 南
	case 200:enumMatch=GT.SANMA, enumMatchMask=       GT.SANMA|GT.JANS|GT.CHIP|GT.TECH;break; // 段位戦　三麻
	case 111:enumMatch=       GT.NOKUI|GT.NOAKA;break;
	case 112:enumMatch=                GT.NOAKA;break;
	case 113:enumMatch=                       0;break;
	case 121:enumMatch=GT.NAN|GT.NOKUI|GT.NOAKA;break;
	case 122:enumMatch=GT.NAN|         GT.NOAKA;break;
	case 123:enumMatch=GT.NAN                  ;break;
	case 213:enumMatch=       GT.SANMA         ;break; // 段位戦 三 東
	case 223:enumMatch=GT.NAN|GT.SANMA         ;break; // 段位戦 三 南
	case 300:enumSkipMask=GT.JANS|GT.CHIP|GT.TECH, enumSkip=0, enumMatch=       0, enumMatchMask=       GT.SANMA;break; // 雀荘戦 四麻
	case 310:enumSkipMask=GT.JANS|GT.CHIP|GT.TECH, enumSkip=0, enumMatch=       0, enumMatchMask=GT.NAN|GT.SANMA;break; // 雀荘戦 四 東
	case 320:enumSkipMask=GT.JANS|GT.CHIP|GT.TECH, enumSkip=0, enumMatch=GT.NAN  , enumMatchMask=GT.NAN|GT.SANMA;break; // 雀荘戦 四 南
	case 400:enumSkipMask=GT.JANS|GT.CHIP|GT.TECH, enumSkip=0, enumMatch=GT.SANMA, enumMatchMask=GT.NAN|GT.SANMA;break; // 雀荘戦 三麻
	case 311:enumMatch=                GT.JANS        ;break;
	case 312:enumMatch=                        GT.CHIP;break;
	case 313:enumMatch=                GT.JANS|GT.CHIP;break;
	case 321:enumMatch=GT.NAN         |GT.JANS        ;break;
	case 322:enumMatch=GT.NAN                 |GT.CHIP;break;
	case 323:enumMatch=GT.NAN         |GT.JANS|GT.CHIP;break;
	case 413:enumMatch=       GT.SANMA|GT.JANS|GT.CHIP;break; // 雀荘戦 三 東
	case 423:enumMatch=GT.NAN|GT.SANMA|GT.JANS|GT.CHIP;break; // 雀荘戦 三 南
	}
	var taku=(f.taku?int(f.taku.value):0);
	if (pf && taku){
		enumMatchMask|=GT.HIGH|GT.TOKU;
		switch(taku){
		case 1:enumMatch|=              0;break; // 一般/若葉
		case 2:enumMatch|=GT.HIGH        ;break; // 上級/銀
		case 3:enumMatch|=        GT.TOKU;break; // 特上/琥珀
		case 4:enumMatch|=GT.HIGH|GT.TOKU;break; // 鳳凰/孔雀
		}
	}
}

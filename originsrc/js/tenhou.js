///////////////////////////////////////////////////////////////////
// TENHOU
//-----------------------------------------------------------------
var GT={ // game type
	MULTI:0x0001, // 対人戦
	NOAKA:0x0002, // 赤ナシ
	NOKUI:0x0004, // 喰ナシ
	NAN  :0x0008, // 東南
	SANMA:0x0010, // サンマ
	TOKU :0x0020, // 特上
	SAKU :0x0040, // 速
	HIGH :0x0080, // 上級
	GRAY :0x0100, // 暗
	CHIP :0x0200, // 祝
	JANS :0x0400, // 雀荘
	TECH :0x0800, // 技能
	ISJANS:function(w){return ((w)&(this.CHIP|this.JANS))!=0;},
	ISTECH:function(w){return ( ((w)&this.TECH)!=0 );},					// 技能戦
	ISDAN :function(w){return ( !((w)&(this.CHIP|this.JANS|this.TECH)) );},	// 段位戦
	GETTAKU:function(w){return (w&0x0020)>>4 | (w&0x0080)>>7;}, // 0=一般 1=上級 2=特上 3=鳳凰 
	GETTAKU2:function(w){return ( this.GETTAKU(w) + (this.ISJANS(w)?4:0) + (this.ISTECH(w)?8:0) );},
	taku:function(w){return this.GETTAKU(w);}, // old
	toString:function(w){
		return (w&this.SANMA?"三":""  )+
		"般上特鳳若銀琥孔技－－－".substr(this.GETTAKU2(w),1)+
		(this.ISTECH(w)?"":w&this.NAN  ?"南":"東")+
		(this.ISJANS(w)?
			"喰赤"+
			(w&this.NAN  ?""  :"速")+
			(~w&this.CHIP?"祝０":w&this.JANS?"祝５":"祝２"):
			(w&this.NOKUI?""  :"喰")+
			(w&this.NOAKA?""  :"赤")+
			(w&this.SAKU ?"速":""  )+
			(w&this.GRAY ?"暗":""  )+
			(w&this.CHIP ?"祝":""  )
		);
	},
	toProfIndex:function(w){
		if (this.ISTECH(w)){
			return 1000+
				this.GETTAKU(w)*100;
		}else if (this.ISJANS(w)){
			return this.GETTAKU2(w)*100+
				(~w&this.CHIP?1:w&this.JANS?3:2)+
				( w&this.NAN  ?10:0)+
				( w&this.SANMA?20:0);
		}else{
			return (w&this.SANMA?3:4);
		}
	}
};

//-----------------------------------------------------------------
var DAN=[
	"新人","９級","８級","７級","６級","５級","４級","３級","２級","１級",
	"初段","二段","三段","四段","五段","六段","七段","八段","九段","十段",
	"天鳳","RESERVED..."
];

//-----------------------------------------------------------------
var NAKI={
	CHII  :0, // チー
	PON   :1, // ポン
	NUKI  :2, // 抜き
	ANKAN :4, // 暗カン
	MINKAN:5, // 明カン
	CHAKAN:6, // 加カン
	isKan:function(m){return m&4;}
};

//-----------------------------------------------------------------
var MANGAN=["","満貫","跳満","倍満","三倍満","役満"];

//-----------------------------------------------------------------
var RYUUKYOKU={
	yao9  :"九種九牌",
	reach4:"四家立直",
	ron3  :"三家和了",
	kan4  :"四槓散了",
	kaze4 :"四風連打",
	nm    :"流し満貫"
};

//-----------------------------------------------------------------
var YAKU=[
	//// 一飜
	"門前清自摸和","立直","一発","槍槓","嶺上開花",
	"海底摸月","河底撈魚","平和","断幺九","一盃口",
	"自風 東","自風 南","自風 西","自風 北",
	"場風 東","場風 南","場風 西","場風 北",
	"役牌 白","役牌 發","役牌 中",
	//// 二飜
	"両立直","七対子","混全帯幺九","一気通貫","三色同順",
	"三色同刻","三槓子","対々和","三暗刻","小三元","混老頭",
	//// 三飜
	"二盃口","純全帯幺九","混一色",
	//// 六飜
	"清一色",
	//// 満貫
	"人和",
	//// 役満
	"天和","地和","大三元","四暗刻","四暗刻単騎","字一色",
	"緑一色","清老頭","九蓮宝燈","純正九蓮宝燈","国士無双",
	"国士無双１３面","大四喜","小四喜","四槓子",
	//// 懸賞役
	"ドラ","裏ドラ","赤ドラ"
];

//-----------------------------------------------------------------
var KAZE=["東","南","西","北"];

//-----------------------------------------------------------------
var KYOKU=[
	"東1局","東2局","東3局","東4局",
	"南1局","南2局","南3局","南4局",
	"西1局","西2局","西3局","西4局",
	"北1局","北2局","北3局","北4局",
];

//-----------------------------------------------------------------
var SX={"67":"COM","77":"男","70":"女"};
//-----------------------------------------------------------------
function RatingConv(type,rate){
	var nProf=GT.toProfIndex(type);
	var s=undefined;
	if (nProf<400) switch(nProf){
	case  3:s="PF3";break;
	case  4:s="PF4";break;
	}else switch(nProf%100){
	case  1:s="PF01C";break;
	case  2:s="PF02C";break;
	case  3:s="PF03C";break;
	case 11:s="PF11C";break;
	case 12:s="PF12C";break;
	case 13:s="PF13C";break;
	case 23:s="PF23C";break;
	case 33:s="PF33C";break;
	}
	var scale=1.0;
	if (scaleRating[s]!=undefined) scale=scaleRating[s];
	return parseInt((rate-1500)*scale+1500);
}

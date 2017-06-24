var bs=location.pathname.split("/").pop().split("_").shift();
var a=[];
a.push("<a href=\""+bs+"_top.html\">TOP</a>");
if (bs>="ana2"){
a.push("<a href=\""+bs+"_detail.html\">詳細集計β</a>");
}
a.push("<a href=\""+bs+"_rate.html\">Rate遷移</a>");
a.push("<a href=\""+bs+"_jun.html\">順位遷移</a>");
a.push("<a href=\""+bs+"_agari.html\">和了集計</a>");
a.push("<a href=\""+bs+"_yaku.html\">役統計</a>");
a.push("<a href=\""+bs+"_list.html\">牌譜一覧</a>");
a.push("<a href=\""+bs+"_conv.html\">書式変換</a>");
document.write("<center>"+a.join(" | ")+"</center>");

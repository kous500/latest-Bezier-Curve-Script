importPackage(Packages.com.sk89q.worldedit.blocks);
importPackage(Packages.com.sk89q.worldedit.region);
importPackage(Packages.com.sk89q.worldedit.math);

/*BezierCurveScript(modified version)
Twitter:@Minecraft_City
Copyright　©2017 BezierCurveScriptU1.0　by Mckeee
*/

//パラメータの設定,parameter option
var fine = 1000;//細かさ,fineness
var reg = 100;//制御点の捜索範囲,search renge
var replID = "minecraft:glass";//制御点の置き換えブロック名,control point replace
//制御点ブロック名,control point name
var pos1ID = "minecraft:sponge";
var pos2ID = "minecraft:diamond_block";
var pos3ID = "minecraft:emerald_block";
var pos4ID = "minecraft:end_stone";

function vecToBlockvec(vec){
	return BlockVector3.at(Math.round(vec.getX()) , Math.round(vec.getY()) , Math.round(vec.getZ()));
}

function addVec(vec , x , y , z){
	return Vector3.at(vec.getX()+x , vec.getY()+y , vec.getZ()+z);
}

var sess = context.remember();
var session = context.getSession();
var region = session.getSelection(session.getSelectionWorld());
var origin = vecToBlockvec(player.getLocation());
var PlayerPos = player.getLocation();
var staPos = region.getPos1();
var endPos = region.getPos2();
var arg1 = argv[1];
var arg2 = argv[2];
var arg3 = argv[3];
var arg4 = argv[4];
var arg5 = argv[5];
var arg6 = argv[6];

//制御点の検索部
loop1:
for (var x = -reg; x <= reg; x++) {
    for (var y = -reg; y <= Math.round(reg/2); y++) {
        for (var z = -reg; z <= reg; z++) {
            var pt = origin.add(x , y , z);
            var id = sess.getBlock(pt);
			var pos1,pos2,pos3,pos4;
			
			if((id == pos1ID)&&(pos1 == null)) {
				pos1 = pt;
                player.print("found p1 at "+pos1);
			}
			else if((id == pos2ID)&&(pos2 == null)) {
				pos2 = pt;
                player.print("found p2 at "+pos2);
				
			}
			else if((id == pos3ID)&&(pos3 == null)) {
				pos3 = pt;
                player.print("found p3 at "+pos3);
				
			}
			else if((id == pos4ID)&&(pos4 == null)) {
				pos4 = pt;
                player.print("found p4 at "+pos4);
				
			}
			
			if((pos1 != null)&&(pos2 != null)&&(pos3 != null)&&(pos4 != null)){
			break loop1;
            }
        }
    }
}
if(((pos1 == null)||(pos2 == null)||(pos3 == null)||(pos4 == null))&&((arg3 != "line")&&(arg4 != "line")&&(arg5 != "line")&&(arg6 != "line"))){
	if(pos1 == null)player.print("\u00A7cError: cannot find p1");
	if(pos2 == null)player.print("\u00A7cError: cannot find p2");
	if(pos3 == null)player.print("\u00A7cError: cannot find p3");
	if(pos4 == null)player.print("\u00A7cError: cannot find p4");
}
else if(((pos1 == null)||(pos4 == null))&&((arg3 == "line")||(arg4 == "line")||(arg5 == "line")||(arg6 == "line"))){
	if(pos1 == null)player.print("\u00A7cError: cannot find p1");
	if(pos4 == null)player.print("\u00A7cError: cannot find p4");
}
else{

//制御点座標成分取得
var x1 = pos1.getX();
var y1 = pos1.getY();
var z1 = pos1.getZ();

if((arg3 != "line")&&(arg4 != "line")&&(arg5 != "line")&&(arg6 != "line")){
var x2 = pos2.getX();
var y2 = pos2.getY();
var z2 = pos2.getZ();

var x3 = pos3.getX();
var y3 = pos3.getY();
var z3 = pos3.getZ();
}

var x4 = pos4.getX();
var y4 = pos4.getY();
var z4 = pos4.getZ();

//ベジェ曲線上の移動点 パラメータ：ｔ
var xt,yt,zt,dxt,dyt,dzt,θ;
var posT = player.getLocation();

//ベジェ曲線代入部
function pos(t){
	xt = (1-t)*(1-t)*(1-t)*x1 + 3*(1-t)*(1-t)*t*x2 + 3*(1-t)*t*t*x3 + t*t*t*x4;
	yt = (1-t)*(1-t)*(1-t)*y1 + 3*(1-t)*(1-t)*t*y2 + 3*(1-t)*t*t*y3 + t*t*t*y4;
	zt = (1-t)*(1-t)*(1-t)*z1 + 3*(1-t)*(1-t)*t*z2 + 3*(1-t)*t*t*z3 + t*t*t*z4;
	dxt = 3*t*t*(-x1+3*x2-3*x3+x4) + 6*t*(x1-2*x2+x3) + 3*(-x1+x2);
  //dyt = 3*t*t*(-y1+3*y2-3*y3+y4) + 6*t*(y1-2*y2+y3) + 3*(-y1+y2);
	dzt = 3*t*t*(-z1+3*z2-3*z3+z4) + 6*t*(z1-2*z2+z3) + 3*(-z1+z2);
	θ　= Math.atan(dxt/dzt);
	
	if((arg3 == "line")||(arg4 == "line")||(arg5 == "line")||(arg6 == "line")){
		xt = (1-t)*x1 + t*x4;
		yt = (1-t)*y1 + t*y4;
		zt = (1-t)*z1 + t*z4;
		θ = Math.atan((x4 - x1)/(z4 - z1));
	}
	if((arg3 == "rtm")||(arg4 == "rtm")||(arg5 == "rtm")||(arg6 == "rtm")){
		yt = (1-t)*y1 + t*y4 - 0.3;
	}
}



if(arg1 == null)arg1 = 0;
else arg1 = Math.round(argv[1]);

if(arg2 == null)arg2 = 0;

var xt1 = x1,yt1 = y1,zt1 = z1;
var L1 = Math.ceil(arg2);
var idTnum;

//設置処理
function set(){
	s = 0;
	L = 0;
	while(s <= 1 ){
		pos(s);
		L = L + Math.sqrt((xt - xt1)*(xt - xt1) + (yt - yt1)*(yt - yt1) + (zt - zt1)*(zt - zt1));//通過距離近似計算
		xt1 = xt;
		yt1 = yt;
		zt1 = zt;
		
		if (L >= Math.ceil(L1)){
			posT = Vector3.at(xt , yt , zt);
			posT = addVec(posT , l*Math.cos(-θ) , m , l*Math.sin(-θ));
			
			if((arg3 == "air")||(arg4 == "air")||(arg5 == "air")){
				idTnum = sess.getBlock(vecToBlockvec(posT));
				if(idTnum == "minecraft:air")sess.setBlock(vecToBlockvec(posT) , idT);
			}
			else{
				sess.setBlock(vecToBlockvec(posT) , idT);
			}
			
			L1 = L1 + Math.ceil(arg1);
		}
		s = s + 1/fine;
	}
	xt1 = x1,yt1 = y1,zt1 = z1;
	L1 = Math.ceil(arg2);
}

//選択範囲関連
var posA = region.getCenter();
var posB = region.getCenter();
var width = region.getWidth();
var length = region.getLength();
var height = region.getHeight();

var idT;
var l = 0;
var m = 0;

//xz平面内の処理
function xz(){
	if (width >= length){
		while( l <= Math.floor(width/2) ){
			idT = sess.getBlock(vecToBlockvec(posA));
			set();
			posA = addVec(posA , 1 , 0 , 0);
			idT = sess.getBlock(vecToBlockvec(posB));
			l = -l;
			set();
			l = -l;
			posB = addVec(posB , -1 , 0 , 0);
			l = l + 1;
		}
	}else{
		while( l <= Math.floor(length/2) ){
			idT = sess.getBlock(vecToBlockvec(posA));
			set();
			posA = addVec(posA , 0 , 0 , -1);
		
			idT = sess.getBlock(vecToBlockvec(posB));
			l = -l;
			set();
			l = -l;
			posB = addVec(posB , 0 , 0 , 1);
			l = l + 1;
		}
	}
}

//yの処理
while (m <= height - 1){
	l = 0;
	posA = addVec(posA , 0 , m - Math.ceil(height / 2 -0.5) , 0);
	posB = addVec(posB , 0 , m - Math.ceil(height / 2 -0.5) , 0);
	xz();
	posA = region.getCenter();
	posB = region.getCenter();
	
	m = m + 1;
	
}

//初期化
m = 0;
l = 0;
posA = region.getCenter();
posA = addVec(posA , 0 , m - Math.ceil(height / 2 -0.5) , 0);

//中心を再設置
while (m <= height -1){
	L1 = arg2;
	if(arg1 == 0)arg1 = 1;//中心を太くしたい場合はこの行を消去
	idT = sess.getBlock(vecToBlockvec(posA));
	posA = addVec(posA , 0 , 1 , 0);
	set();
	m++;
}
//制御点の再設置
if((arg3 == "p")||(arg4 == "p")||(arg5 == "p")||(arg6 == "p")){
	sess.setBlock(pos1 , context.getBlock(pos1ID));
	if((arg3 != "line")&&(arg4 != "line")&&(arg5 != "line")&&(arg6 != "line")){
	sess.setBlock(pos2 , context.getBlock(pos2ID));
	sess.setBlock(pos3 , context.getBlock(pos3ID));
	}
	sess.setBlock(pos4 , context.getBlock(pos4ID));
}
//制御点の置き換え 不要な場合削除してください
else{
	sess.setBlock(pos1 , context.getBlock(replID));
	if((arg3 != "line")&&(arg4 != "line")&&(arg5 != "line")&&(arg6 != "line")){
	sess.setBlock(pos2 , context.getBlock(replID));
	sess.setBlock(pos3 , context.getBlock(replID));
	}
	sess.setBlock(pos4 , context.getBlock(replID));
}

player.print("succeeded!");
player.print("Curve length was "+ L +"m");

}
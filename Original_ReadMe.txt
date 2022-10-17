BezierCurveScript1.02

バージョン履歴
2017/09/26 1.00公開
2017/09/27 1.01誤字訂正
2017/10/01 1.02誤字訂正

本スクリプトはMinecraftのMOD/pluginであるWorldEdit上で動作するスクリプトです。
/////////////////////////////////////////////////
<利用規約>日本語話者は以下の規約に従ってください。
①免責
　本スクリプトを使用することによって発生したいかなる損害についても、製作者は責任を負いません。
ワールドデータの上書きを行いますのでバックアップをすることをおすすめします。

②転載
　改変のない状態での再配布は禁止します。改変を伴う再配布の際には、再配布である旨を明示してください。
動画、画像の公開、改造、再配布に許可は要しません。機能追加の要望は上記Twitterアカウント:@Minecraft_Cityにお申し出ください。

③クレジット
　Copyright　(c)2017 BezierCurveScript1.0　by Mckeee
本スクリプトを使用した動画、画像などにクレジットを記載する必要はありません。
<利用規約終わり>


<Rules>for English speaker
①　Please use at your own risk.
This script has possibility that damage your precious works
so I recommend you to save backup.

②　Do not distribute.
You can modify this script,but cannot distribute.
If you have good ideas to improve this script,
please let me know them at Twitter;@Minecraft_City

③　CREDIT
 Copyright　(c)2017 BezierCurveScript1.0　by Mckeee

<Rules end>
/////////////////////////////////////////////////

<導入>
①　Worldedit(http://wiki.sk89q.com/wiki/WorldEdit)を導入してください。
シングルの場合は
Forge版またはLiteLoader版を導入
その際、WorldEditCUI(http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1292886-worldeditcui)
も導入すると便利です。(LiteLoader必須)
導入詳細は紹介サイト等をご参照ください。

②　Configの設定変更
Worldedit導入後、起動するとconfig内に生成される
worldedit.propertiesを開き、
20行目の"scripting-timeout"の値を30000程度に変更してください。
初期設定のままですとタイムアウトとなって実行されません。
これでもタイムアウトとなった場合はより大きな値にしてください。単位はミリ秒です。

③ 導入
以下のディレクトリに本スクリプト(bc.js)およびRhino[(https://developer.mozilla.org/ja/docs/Rhino/Download_Rhino)
をダウンロードし、解凍したファイル内のjs.jar]を配置してください
Rhinoはスクリプトを動作させる上で必要だそうです。

・シングルForge
config/worldedit/craftscripts/bc.js
mods/WorldEdit/js.jar

・LiteLoader
liteconfig/common/WorldEdit/craftscripts/bc.js
mods/WorldEdit/js.jar

・Forge Server
config/worldedit/craftscripts/bc.js
mods/WorldEdit/js.jar

・CraftBukkit/Spigot
plugins/WorldEdit/craftscripts/bc.js
plugins/WorldEdit/js.jar

<使用方法>
 コマンド//wand　で斧を入手、
曲線に沿って設置したい平面を斧で左クリック、右クリックして設定してください。
範囲は点、線分、平面のいずれでも構いませんが、xy平面またはyz平面内(すなわち立面)で設定してください。
なお、曲線の幅を一定にするために、自動的にその左右１ブロックも利用して曲線が生成されます。
記憶の何処かに止めておいていただけると応用が効くかと思います。

　曲線のもととなる制御点を設置します。制御点は
pos1(始点)	pos2		pos3	　pos4（終点）の４点があり、それぞれ
ス（タート）ポンジ　ダイアモンドブロック　エメラルドブロック　"エンド"ブロック
を設置することで決定されます。（周囲でこれらを建材として利用している場合は、
誤作動を起こしますのでそれを置き換えるか、コードの該当部分のブロックIDを書き換えてください。）
始点、終点には選択領域の底面の中心が設置されます。

 ベジェ曲線はpos1(始点)、pos4(終点）を端点とし、
pos1とpos2を結んだ直線が始点での傾きに、
pos４とpos３を結んだ直線が終点での傾きになります。
その２点間の距離が長いほど曲線はその影響を受けます。

4点の中心付近で
コマンド/cs bc
を入力しますと曲線に沿って選択した領域が設置されます。お疲れ様でした。
なお、事故防止のため制御点は自動的にガラスに置き換えられます。
エラーが出る場合は制御点が遠すぎる可能性があります。制御点を近づけるか、
コード上の捜索範囲の値を大きくしてください。


<コマンドオプション>　省略可能です
/cs bc n m (p) (air) (rtm)


n:任意の自然数または0を入力
曲線の通過距離がnメートルを超えるごとに１度平面が設置されます。
（トンネルの光源など一定間隔で設置される装飾での使用を想定しています）
n = 0　のときデフォルト通り隙間なく設置されますが、
n = 1　のときには隙間が生まれますのでご注意ください。

m:任意の自然数または0を入力
曲線の通過距離の計算始点がmメートル先になります。
(曲線同士をつなげる際、装飾の距離がずれないようになります)

以下のオプションを使う場合、n,mは省略できません。また、順不同です。
p:制御点のブロックを再設置します。（装飾をする際に使用しますと便利です）
air:空気ブロックのみを上書きします。元あったブロックを壊しません。
line:直線上に平面を設置します。制御点はP1とP4の設置だけで十分です。
rtm:生成される曲線がRealTrainModのレールの仕様に近くなります。airと共に使用するとレールの\ｼｬﾘｯ/から防げます。

・既知の不具合
Spigot鯖で動作がうまくいかない場合があるようです。原因究明中です。
情報がございましたら下記Twitterアカウントまでお知らせください。

その他、不明な点がございましたら作者Twitter:@Minecraft_Cityにご質問ください。

動作確認に際しまして、あまなお氏(@amanao_)から多大なるご協力を賜りましたこと、
ここに感謝の意を表します。 

　以　上

<How to install>
① Install WorldEdit(http://wiki.sk89q.com/wiki/WorldEdit)
If you are SinglePlayer,I reccomend you to use LiteLoader version
because you can also use WorldEditCUI(http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1292886-worldeditcui).
After installing WorldEdit,start Minecraft and close　once.

② Change Config
Open the "worldedit.properties",at(config/)or at(liteconfig/common/WorldEdit/)
and change the number of "scripting-timeout" into 30000 or over.
If the number is too small,this script will fail to practice because of the timeout.

③　Install Script and Rhino
Put this script and Rhino
[(https://developer.mozilla.org/ja/docs/Rhino/Download_Rhino)Download Rhino,decompress,and extract "js.jar"]
 into the directry below.(Rhino is necessary to run javascript)

・Single Forge
config/worldedit/craftscripts/bc.js
mods/WorldEdit/js.jar

・LiteLoader
liteconfig/common/WorldEdit/craftscripts/bc.js
mods/WorldEdit/js.jar

・Forge Server
config/worldedit/craftscripts/bc.js
mods/WorldEdit/js.jar

・CraftBukkit/Spigot
plugins/WorldEdit/craftscripts/bc.js
plugins/WorldEdit/js.jar

<How to use>
Use command"//wand" to get a wand.
Make a plane region,which you want to set along the curve.(right-click and left-click)

Set control points;P1,P2,P3,P4.
P1 is SpongeBlock(s"tart"ponge).
P2 is DiamondBlock.
P3 is EmeraldBlock.
P4 is "End"Block.
If these blocks are around the place where you want to make a curve,
this script may cause a malfunction,
so plese remove them or modify this script.

[Bezier Curve feature]
Start from P1 and end at P4.
The line P1-P2 is the starting slope and the line P4-P3 is the end slope.
Please check wiki(https://en.wikipedia.org/wiki/B%C3%A9zier_curve).

Finally,use command "/cs bc",and you will be surprised at the beautiful curve.
When error have happened,you may be too far from the control points
and then you should approach them,or modify this script at #11.

<Command Option>You can omit this part.
/cs bc n m (p) (air) (line) (rtm)

n:Input a integral number or 0.
Set the plane every n meters the curve goes.

m:Input a integral number or 0.
Set the plane after m meters the curve goes.

	If you want to use (p) (air) (rtm) options,you cannot omit n and m.
These option is no particular order,and can be omitted.

p:The control point blocks will be set again.
air:The curve will be set only at AirBlocks.(Do not break terrain or buildings)
line:Set the plane on a straight line between P1-P4.You don't have to set P2 and P3 when you use this option.
rtm:The curve will fit with RealTrainMod rail.


Please check tutorial video.
If you have some question,please send it at @Minecraf_City

Have a nice minecraft life!
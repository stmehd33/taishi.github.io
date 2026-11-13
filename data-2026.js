window.YEARS=window.YEARS||{};
(function(){
/* ================= 年度データ（毎年ここだけ差し替える） =================
   EVENT : 開催情報・マップ画像サイズ・ホール割り・保存キー
   RAW   : ブース一覧  「番号|ブース名」を1行ずつ
   POS   : マップ画像上のブース番号の位置  "番号":[x,y]（map.jpg の元ピクセル）
   map.jpg : 会場マップ画像
   アプリ本体(index.html)は変更不要。 */
const EVENT={
  name:'FIELDSTYLE EXPO', year:2026, appName:'フィールドスタイル完全攻略ガイド',
  days:[{key:'prev',label:'前日',date:'2026-11-13',md:'11/13 金'},{key:'d1',label:'1日目',date:'2026-11-14',md:'11/14 土'},{key:'d2',label:'2日目',date:'2026-11-15',md:'11/15 日'}],
  venue:{name:'Aichi Sky Expo（愛知県国際展示場）', addr:'〒479-0881 愛知県常滑市セントレア5-10-1'},   /* ナビ用に1タップでコピーする住所 */
  place:'Aichi Sky Expo', dates:'2026.11.14 土 – 15 日', hours:'9:00–17:00',
  mapFile:'map.jpg', storageKey:'fieldstyle-expo-2026', idbName:'fs-expo-memo',
  mapW:2458, mapH:1560,
  /* イベントリスト。2026-11-08時点の公式サイト（スペシャルゲストとステージ／入場のご案内）より。変更の可能性あり */
  events:[
    {id:'s1',day:'d1',start:'11:00',title:'SPECIAL STAGE：山口トンボ／RYOJI（ケツメイシ）',place:'ホールE東側 特設ステージ',note:'MC 江崎ばもん。ステージ前方エリアは各回入れ替え制'},
    {id:'s2',day:'d1',start:'13:00',title:'SPECIAL STAGE：独ヲタ女子アッキー／たけだバーベキュー／くっきー！（野性爆弾）',place:'ホールE東側 特設ステージ',note:'MC 江崎ばもん。ステージ前方エリアは各回入れ替え制'},
    {id:'s3',day:'d1',start:'15:00',title:'SPECIAL STAGE：伊豆のぬし釣り',place:'ホールE東側 特設ステージ',note:'MC 江崎ばもん。ステージ前方エリアは各回入れ替え制'},
    {id:'p1',day:'d1',start:'13:30',title:'独ヲタ女子アッキー　フォトスポットでの撮影',place:'ハピキャンステーション',note:'報道記事の記載。場所は要確認'},
    {id:'s4',day:'d2',start:'11:00',title:'SPECIAL STAGE：トンりお夫妻／独ヲタ女子アッキー',place:'ホールE東側 特設ステージ',note:'MC 江崎ばもん。ステージ前方エリアは各回入れ替え制'},
    {id:'s5',day:'d2',start:'13:00',title:'SPECIAL STAGE：矢作兼（おぎやはぎ）／村田秀亮（とろサーモン）／鈴木拓（ドランクドラゴン）',place:'ホールE東側 特設ステージ',note:'MC 江崎ばもん。ステージ前方エリアは各回入れ替え制'},
    {id:'s6',day:'d2',start:'15:00',title:'SPECIAL STAGE：伊豆のぬし釣り',place:'ホールE東側 特設ステージ',note:'MC 江崎ばもん。ステージ前方エリアは各回入れ替え制'},
    {id:'p2',day:'d2',start:'11:30',title:'トンりお夫妻　フォトスポットでの撮影',place:'ハピキャンステーション',note:'報道記事の記載。場所は要確認'},
    {id:'w1',day:null,start:'',title:'パラコードのミサンガ作りワークショップ（整理券制・事前精算）',place:'ハピキャンステーション',note:'開始5分前に集合。日時は公式で確認'}
  ],
  /* 優先入場（主催者メール 2026-11 より）: 集合時間と、最初に行くブースによる集合エリアの違い */
  priority:{time:'7:30〜8:00',yellow:['M16 camping equipment','MASHUP SQUAD','北海道物産展'],
    yellowName:'黄色の【指定ブース】整列エリア',blueName:'水色の【優先入場】集合整列エリア',note:'整理番号が記載された紙チケットを必ず持参'},
  halls:['C','D','E','F'],                                   /* ホール表示順 */
  hallByDigit:{1:'C',2:'C',3:'D',4:'D',5:'E',6:'E',7:'F',8:'F'}, /* ブース番号の先頭1桁→ホール */
  alias:{'502':'501'},                                       /* 同じブースを複数番号で共有する場合 */
  split:{'111':['GOCAF','GROUSE','HELLOS','HIGHGRNDZ'],'115':['DAMNGOOD!!','leiri hygge store'],'116':['38explore','TOREOTTO'],'216':['CIFRA','GOOLD GOLF ROCKERS'],'237':['DO THE POGO','COTTONWOOD'],'332':['Brennholz','Urban Forest','J unique wood','Campers agit'],'422':['M.c.y wood','RAMBLE POINT'],'430':['FOLBOT','BYCRUISE','ROUGHGRID','WORTH'],'506':['UNBY GENERAL GOODS STORE','Minimal Works'],'529':['Hitotoki Works','Hitotoki Base'],'533':['INOUT','PINOWORKS','IKIKI','ATOM DESIGN','gram eight'],'620':['HURIT','adum DESIGN and CRAFT'],'646':['OIWAKEPARK(夜景キャンプ場)','キャンプ旅(SNS情報メディア)'],'711':['POMEL','POSH MADE'],'720':['オカミドリショウテン','suwaneru'],'729':['LOCKFIELD EQUIPMENT','OVER THE ROCK GEAR DEPT.'],'744':['TASK','lcs.rhaplus'],'802':['Mystify','Vanderlust','ふとんファクトリー'],'803':['SG BASE','CUSTOM LINE']}   /* かっこのない合同ブースを、ブランドに分ける */
};
const RAW = `101|M16 camping equipment（MMF／WOOD and WOOD／NORAs／NMM／neru design／asimocrafts／サンゾー工務店（別枠405）／38explore（別枠116）／OLDMOUNTAIN／BGO／INAVANCE／TheArth／Ballistics／H&O／GRINDLODGE／LOV／SENDAI SUBURB SHOP）
102|find.
103|MEISEI GREEN LAB.
104|フォレストホームサービス
105|BEOM I (ボムイ木工所)
106|FicxMoC
107|ガーデン分析マスター（野場電工株式会社）
108|C4
109|cacomoca
110|MINERBASE. ONE AND ONLY AREA（T.H.M／TATTAM／AND THROUGH DESIGN／STITCHYARD／THE TAGUCHI CULTURE CLUB／絶叫道場DOOR／UNDER THE SUN／LUMBER'S／LIFE IS GOOD WORK SHOP ほか）
111|GOCAF／GROUSE／HELLOS／HIGHGRNDZ
112|canowa
113|millio
114|PolariSign
115|DAMNGOOD!! / leiri hygge store
116|38explore / TOREOTTO
117|NODEL design
118|BAKKNEL OUTDOOR
119|AURORA×ASOMATOUS
120|THULE バッグ
121|UNDERFIELD
122|CAMP OOPARTS ほか（CAMP OOPARTS／MOJO CAMP／CALMA STORE／HEKA／THREE MASTERS／HIBROW）
123|岩橋建築
124|WAQ
125|ハルビアサウナディーラー 名古屋中央
126|siki
127|ぱんとん&sanpaddy
128|SOULABO
129|Infledge EYEWEAR
130|メディカル発想足袋シューズ"U×WALK"
131|Ashitabi
132|chord
133|KRIFF MAYER
134|FULL OF LOVE
135|Dr.shoe
136|HANTEN
137|出張植物屋『光堂』
138|窯元 荒神窯
139|(有)三浦園芸 HAOMIRU
140|ガレージプラス wood&works
141|KEN THE FLATTOP（Hi-Light）
142|CLUMSY MONSTER MAKER（Hi-Light）
143|GRIND PENCIL（Hi-Light）
144|Gg 66/99（Hi-Light）
145|DERRINGER custom signs（Hi-Light）
146|KRACKERJACK KUSTOMS（Hi-Light）
147|BUGGYBOY garage service（Hi-Light）
148|LITTLE CHOP DESIGN（Hi-Light）
149|UMEBOSHI RACING（Hi-Light）
150|TERACE（SWEET JUNGLE）
151|CARROLL THREAD WORKS_（SWEET JUNGLE）
152|遊べる花屋（SWEET JUNGLE）
153|Bristy（SWEET JUNGLE）
154|NIWANO8（SWEET JUNGLE）
155|Watercolors by aoyota（SWEET JUNGLE）
156|WILDFLOWERS（SWEET JUNGLE）
157|FATE8（SWEET JUNGLE）
158|BHMS GARDEN（SWEET JUNGLE）
159|K&D MARKET.（SWEET JUNGLE）
160|太田菜園（SWEET JUNGLE）
161|モネダフェリズ（SWEET JUNGLE）
162|inie japan（SWEET JUNGLE）
163|GOTOSABOTEN & Yeasters（SWEET JUNGLE）
164|RUSleatherworks（SWEET JUNGLE）
165|seashoreinc.（SWEET JUNGLE）
166|盆栽いくま（SWEET JUNGLE）
167|株式会社YARD（SWEET JUNGLE）
168|TRONCO（SWEET JUNGLE）
169|outdoorliving oLAND（SWEET JUNGLE）
170|peninsula growers（SWEET JUNGLE）
201|マウンテン アンド シー アウトレット
202|井口智明と愉快な仲間たち
203|いずまるちびぃ
204|9w.
205|rove troupe
206|WOOD LOVER'S（なかの材木）
207|Odam Style
208|THE CORE OF THINGS
209|オンウェー
210|Filomela
211|GRACE
212|GREBE WORKS
213|peir
214|ターフプロジェクト
215|SEIDO PRODUCTS
216|CIFRA & GOOLD GOLF ROCKERS
217|ROOT CO.
218|TOKKUN HAMBURGER ✖ SK OLDIES
219|chi-bee
220|SOLAIZ
221|FEELS
222|TAKAYUKI STYLE LAB
223|BAREFOO
224|株式会社コメ兵
225|PRAIRIE ACTIVE OUTDOOR GEAR
226|uriruka
227|Tabi shoes VALTAN
228|TAYLOR GUITARS
229|BLACK LEATHER WORKS
230|Eddie Bauer
231|RARTS
232|H.A.K.U MOUNTAIN SUPPLY
233|DANNER
234|kzmoutdoor
235|Hilander
236|コメキャン
237|DO THE POGO & COTTONWOOD
238|CRAFT-GEAR-SHOP-TAK@
239|DMO&日月鉄工所
240|NANTO
241|mind
242|自然結人-shizenyuito-
243|OMAME ZEROFIVE
244|Ri-ga.Camp!Shop × YEJIMA -Free works-
245|4N8 WORKS
246|ASAGARA WORKS
247|フジノハガネ
248|ラスファクトリ
249|802PRODUCTS
250|STICKY BBQ CLUB
251|ゴーキャンプウッドワークス 磯人 241.style.geers
252|Lugar
253|1050WORKS/ONE'S KOUBOU
254|nowomou
255|GGCrew
256|FieldSAHARA
257|SUNDISK
258|PRO TREK
259|C AND+S
301|木工・凛×志luxury×NCNL×TRICO
302|THREE(0229 , Fallworks , Wildingout)
303|ONESECOND
304|kinakoma.craft
305|BAKECO
306|たちごけラボ
307|Bokkol by YAMAKAS
308|shiromani
309|Ocean Liberty
310|桃山
311|Muthos Homura（ミュートス・ホムラ）
312|冪里Muse Voyager アウトドア給水システム
313|SOTORECIPE
314|i style
315|STOKED OUTDOOR（伊藤金属工業(株)）
316|山人 yamabito
317|Goodfor
318|37CAMP
319|チキューギ.
320|GOPAMIR
321|GOLDEN FOREST ほか（GOLDEN FOREST／PLANFORTY／CAMVIL／ARBOR OUTDOOR／HELSPORT／セミ印レザア）
322|BUNDOK
323|MK CAMP
324|BUENOFE
325|GRANDOOR
326|落基山Rockies
327|Mt.Paulownia
328|GOGlamping
329|THE MAGIC HOUR
330|CRACK FALL STORE
331|TANAKA OUTDOOR
332|Brennholz・Urban Forest・J unique wood・Campers agit
333|SOOMLOOM
334|THIRD Space
335|北海道物産展（TENt o TEN／campholic／WHAT WE WANT／JERRY'S OUTFITTERS／Markeys.outdoor supply／PASTIME FACTORY）
337|野良道具製作所
338|COLONISTA
339|ananasky
340|coody / W&W（coody／KingCamp／CYBERTAKE）
401|Goutoku Outdoor
402|ANOBA
403|UNIFLAME
404|OUTFIELD
405|サンゾー工務店
406|MEFNEG®
407|old sea
408|uchiko
409|DEVISE WORKS
410|Skywood
411|TANZO
412|5050WORKSHOP
413|fleamarket of aloha
414|備える！中日サバイバルキャンプ
415|Garagi sauna
416|（株）EX.あおば クオリティシリーズ
417|DAINAO GARAGE FACTORY
418|15's
419|サウニア/SAUNIA
420|HAKOBUNÉ
421|株式会社トーホー
422|M.c.y wood / RAMBLE POINT
423|OTEBO CRAFTS
424|Fast_style
425|GEAR MISSION(トヨトミ)
426|XWAG PRODUCTS
427|株式会社ジェネラルアメリカンホーム
428|LUGH 魔法瓶ブランケット
429|Samtopia
430|FOLBOT / BYCRUISE / ROUGHGRID / WORTH
431|どうだい？って金魚？～いいえ、鯛です～
501|ハピキャンステーション（ウェルシス／大井川流域in静岡／キッツマイクロフィルター／SHAKA／SOTO／WPL JAPAN／DVERG／日清オイリオ／PAPAMAMACAR'S／ピックルボール／防災教育推進協会）
503|HILLS FIELD
504|守谷刃物研究所
505|ちいさなセレクトナイフショップBARCO
506|UNBY GENERAL GOODS STORE / Minimal Works
507|STUDIOwad/BURGER&COLA
508|HEIMPLANET
509|LUCYWORKS
510|SURFACE
511|LALPHA
512|DJI｜SYSTEM5
513|CDC
514|AS9MO
515|NESTOUT
516|森林の仕事パーク
517|野営装備連合
518|OWL CAMP
519|CARGO CONTAINER
520|braaa
521|剣謙心
522|KTM CAMP
523|et.moku works
524|ENRICH
525|dot two.
526|TETSUZAN
527|Olebe〜leather item〜
528|M-FACTORY
529|Hitotoki Works・Hitotoki Base
530|NGL
531|xTool
532|Goal Zero
533|INOUT・PINOWORKS・IKIKI・ATOM DESIGN・gram eight
534|Insta360
535|Outisan
536|STEPPING STONES
537|monoso
538|MOOSE ROOM WORKS
539|tab.
540|ThousWinds
541|Mt.SUMI
542|八家
601|OUTDOOR CITY INABE
602|郡上市アウトドア事業者協議会
603|マリーナクラブ リブレ
604|YOU BOAT SERVICE × VERTECH
605|マリーナ河芸
606|OCEANS株式会社
607|マリンショップアルファ(にしうらシーサイドキャンプ場)
608|AFTCO
609|マリンライセンスロイヤル
610|ユニマットプレシャス
611|海は街より刺激的 Boatingの世界
612|特殊道具推進組合（CAMP GEEKS／Dapper Punch／OMA FACTORY／Aplysia CAMP／BELIER WORKS／Shim.Craft）
613|Curiace
614|KOVEA
615|TENTFACTORY
616|AMEOとハレロー（OLIVE）
617|Makuake
618|クラウドファンディング・ラウンジ in FIELDSTYLE
619|SilverAnt
620|HURIT＆adum DESIGN and CRAFT
621|TEAM ラジオと防災
622|STEALTH BASE x gonic529
623|GGUBUS
624|Rainbow Products Japan
625|SWANY
626|Vポイント ガラポン抽選
627|マルハチサイクル
628|Woodcraft Coccinelle
629|ヒノキのテーブルとアウトドアギアの9kei
630|株式会社カーター/株式会社グッズ
631|GOODCAMPER
632|HIGH&FIELDS
633|NORAHOLIC
634|DoMeGe
635|みえ熊野古道商工会
636|TRIO GROUP インフラフェス（DAM JAZZ／ROCK DAM × したば珈琲）
637|岐阜で始めよう！初めての「鮎」ルアー釣り場ガイド
638|岐阜県 観光案内
639|ぎふ森のある暮らし推進協議会
640|岐阜県キャンプ場連絡協議会
641|戸隠キャンプ場
642|びわ湖高島観光協会
643|かもしかキャンプグループ/Kamo,Re
644|サバイバルゲームフィールドCRA
645|日本で最も美しい村 中川村（観光協会／陣馬形山アルプスビューラウンジ／桑原キャンプ場）
646|OIWAKEPARK(夜景キャンプ場)／キャンプ旅(SNS情報メディア)
647|朝霧CampBaseそらいろ
648|長野県富士見町
649|伊勢熊野観光連絡協議会
650|静岡グルメ市
651|セイジ・オザワ 松本フェスティバル実行委員会
652|トラベル・アイ
653|RECAMP
654|とよたさんそんセンター
655|豊田市下山支所
656|A.F.C
657|K-BASE+
658|NANGA KUSATSU・ネッツトヨタびわこ
659|NATURE TONES
660|フレックスドリーム ほか（フレックスドリーム／クラフトプラス／ブッチ・ジャパン）
701|クラウドファンディングマルシェ CAMPFIREセレクション
702|MASHUP SQUAD（WANTKEY CAMP／LAVALAVA GEARCLUB／GAHGA／BLACK LABEL）
703|PLAY.
704|R-enterprise
705|Pajamamoon
706|Feelings
707|TNBworks
708|LOOPLE
709|NORTH MECCA
710|PTYGRACE OUTDOOR GEAR
711|POMEL / POSH MADE
712|多喜火鉈
713|FORESTABLE OUTDOOR
714|BENCHMADE
715|llama andRoma
716|関金物店
717|飛騨ガレージブランド連合
718|FEDECA
719|Three B Works
720|オカミドリショウテン／suwaneru
721|ヒミツキチガレージ
722|YAMON/合同会社前田彌門
723|WORK WHEELS JAPAN
724|SUNTREX
725|EAZY CAMPER イージーキャンパー
726|株式会社SUBARU
727|RALBUDDY
728|beautybeast×WANTKEY CAMP
729|LOCKFIELD EQUIPMENT＆OVER THE ROCK GEAR DEPT.
730|HASEGAWA CAMP
731|J-netレンタリース株式会社
732|ARCANEWARRIOR&AO WHEELS&NOVSIGHT
733|NOMAD BASE【車中泊フラットマット】
734|カズキオート×BUANJAPAN
735|ショウワガレージ A-x
736|STEALTH
737|Carstay 株式会社
738|Four Wheel Campers Japan
739|Dropracks Japan
740|ジムニーワールド名古屋×ウイングオート
741|RAYS/MID WHEELS
742|オートフラッグス
743|スズキ株式会社
744|TASK & lcs.rhaplus
745|林テレンプ株式会社
746|DAMD × Auto Motive Japan
801|株式会社Acalie
802|Mystify／Vanderlust／ふとんファクトリー
803|SG BASE／CUSTOM LINE
804|70th anniversary ㈱トヨタモータース KING OF RAPTOR
805|TUF
806|Cocopaver Japan
807|DallyFluffy
808|MOOQs element
809|シーサッカージャパン（WANDAY FUNDAY）
810|OSUWARI DOG by TOYPOY（WANDAY FUNDAY）
811|鹿肉工房（WANDAY FUNDAY）
812|人工芝のしばんちゅ【シバンチュドッグラン】（WANDAY FUNDAY）
813|東京メニックス（WANDAY FUNDAY）
814|天然鹿肉ペットフードGOOD MEAL ONE!（WANDAY FUNDAY）
815|リュックのDaisuki（WANDAY FUNDAY）
816|HARDW\`R DOG（WANDAY FUNDAY）
817|ROUTE3601（WANDAY FUNDAY）
818|コイヤーグラウンド®（WANDAY FUNDAY）
819|UNATO（WANDAY FUNDAY）
820|おやつ工房さっちゃん（WANDAY FUNDAY）
821|ホワイトハウスキャンパー
822|LUFT
823|JAF愛知支部
824|E-Mobility Shop Ri吉
825|NATAL DESIGN
826|Orange
827|株式会社DMD
828|株式会社 日本トリム
829|DUNLOP
830|GORDON MILLER
831|Japan Coffee Journey（全国のロースターのコーヒー体験ブース）
832|OUTDOORTHINGS（C&C.P.H.EQUIPEMENT／JRD by JARLD／SotoLabo／Cobmaster／DUCKROW DEPART／POTATOSALAD HOLIC／THE TRIPLE LEGS／BON ART STUDIO／NOWELL／レトロ・フラワー／BONBONERO）
833|Hotcamp
834|オープンハウス
835|UM
836|希望（のぞみ）食品株式会社
837|BlackishGear
838|MOG × CHIMERA BASE
839|KAEDE PRODUCTS
840|TRY Gear
841|&craft+
842|G.I.
843|hibi 10MINUTES AROMA
844|DIY Watch Club
845|SeaK Trade｜世界のコーヒー&アウトドアライフスタイル
846|DAVI
847|日本名門酒会（キャンプめし博覧会）
848|CircleCoffee（キャンプめし博覧会）
849|INIC coffee（キャンプめし博覧会）
850|ヴァルオージャパン株式会社（キャンプめし博覧会）
851|みんなみかん（キャンプめし博覧会）
852|Hot Sauce Bar（キャンプめし博覧会）
853|ノーコンブ ノーライフ ひだか（日高食品工業㈱）
854|Fujiyama Pepper（キャンプめし博覧会）
855|自家製スモーク工房CaCooo-カコ-（キャンプめし博覧会）
856|つくでヴィレッジ運営協議会（キャンプめし博覧会）
857|ミヨシ油脂（キャンプめし博覧会）
858|辻製油／うれし野ラボ（キャンプめし博覧会）
859|自然のはちみつ屋さんLa-La-Be（キャンプめし博覧会）
860|G飯の素（キャンプめし博覧会）
861|YODELL×ORELLS×腹ペコビバーク（キャンプめし博覧会）
862|KIRISHIMA No.8 by 霧島酒造（キャンプめし博覧会）
863|三陽物産株式会社（JP.CHENET）（キャンプめし博覧会）
864|林愉快研究所（キャンプめし博覧会）
865|みりん干し専門店中村海産（キャンプめし博覧会）
866|WBH 長期熟成 生ハム（キャンプめし博覧会）
867|燻製工房 源 gen（キャンプめし博覧会）
868|兼由 KANEYOSHI（キャンプめし博覧会）
869|本土最南端のスモーク工房 Tom's smoke（キャンプめし博覧会）
870|Manic Blend（キャンプめし博覧会）
871|OLIVINO/オリーブオイル（キャンプめし博覧会）
872|kaze labo（キャンプめし博覧会）
873|おうさまペッパー（キャンプめし博覧会）
874|OUTDOOR SOUPBASE"HINABE" アウトドア専用 火鍋スープの素（キャンプめし博覧会）
875|スタミナ❶番（キャンプめし博覧会）
876|SPICE KINGDOM（キャンプめし博覧会）
877|FATCAMP kitchen（キャンプめし博覧会）
878|田口塩鶏（キャンプめし博覧会）`;
const POS={"101":[94,463],"102":[44,678],"103":[44,701],"104":[44,724],"105":[99,678],"106":[99,701],"107":[99,724],"108":[134,678],"109":[134,711],"110":[91,842],"111":[330,344],"112":[210,446],"113":[210,469],"114":[210,528],"115":[257,492],"116":[245,600],"117":[222,658],"118":[269,658],"119":[210,742],"120":[210,800],"121":[210,824],"122":[255,774],"123":[222,898],"124":[268,898],"125":[246,952],"126":[210,1012],"127":[234,1012],"128":[258,1012],"129":[280,1012],"130":[222,1036],"131":[256,1036],"132":[280,1036],"133":[222,1094],"134":[268,1084],"135":[268,1107],"136":[202,1190],"137":[202,1226],"138":[202,1250],"139":[226,1190],"140":[226,1237],"141":[256,1174],"142":[258,1191],"143":[258,1207],"144":[258,1224],"145":[312,1174],"146":[312,1191],"147":[312,1207],"148":[312,1224],"149":[284,1257],"150":[44,974],"151":[43,997],"152":[44,1020],"153":[44,1057],"154":[44,1080],"155":[44,1103],"156":[44,1137],"157":[44,1187],"158":[44,1210],"159":[43,1233],"160":[131,974],"161":[106,1025],"162":[107,1048],"163":[130,1036],"164":[107,1100],"165":[107,1123],"166":[130,1111],"167":[107,1176],"168":[107,1199],"169":[130,1186],"170":[119,1250],"201":[520,324],"202":[521,368],"203":[587,322],"204":[586,368],"205":[352,458],"206":[397,458],"207":[364,518],"208":[364,541],"209":[411,528],"210":[364,600],"211":[410,600],"212":[364,658],"213":[412,658],"214":[352,730],"215":[376,730],"216":[364,754],"217":[412,742],"218":[364,802],"219":[364,824],"220":[411,812],"221":[364,872],"222":[411,872],"223":[364,895],"224":[412,895],"225":[350,944],"226":[374,944],"227":[411,944],"228":[350,966],"229":[374,966],"230":[411,966],"231":[364,1034],"232":[411,1024],"233":[386,1095],"234":[528,487],"235":[508,588],"236":[552,588],"237":[520,612],"238":[564,612],"239":[508,660],"240":[554,660],"241":[507,682],"242":[554,682],"243":[508,731],"244":[541,731],"245":[564,731],"246":[508,754],"247":[541,754],"248":[564,754],"249":[517,800],"250":[564,800],"251":[516,824],"252":[564,824],"253":[504,908],"254":[505,966],"255":[553,883],"256":[553,938],"257":[529,1024],"258":[529,1082],"259":[466,1215],"301":[684,446],"302":[735,446],"303":[672,470],"304":[696,470],"305":[720,470],"306":[672,518],"307":[696,518],"308":[731,518],"309":[672,540],"310":[696,540],"311":[730,540],"312":[684,588],"313":[732,588],"314":[684,610],"315":[732,611],"316":[684,658],"317":[732,658],"318":[684,682],"319":[732,682],"320":[700,790],"321":[710,998],"322":[826,459],"323":[873,470],"324":[850,530],"325":[814,600],"326":[814,636],"327":[814,668],"328":[863,636],"329":[814,740],"330":[814,802],"331":[813,824],"332":[863,729],"333":[863,786],"334":[850,895],"335":[849,966],"337":[814,1085],"338":[814,1107],"339":[861,1070],"340":[768,1212],"401":[966,471],"402":[1014,459],"403":[991,530],"404":[991,600],"405":[991,658],"406":[981,778],"407":[1026,740],"408":[1026,811],"409":[991,927],"410":[968,1049],"411":[1014,1037],"412":[992,1096],"413":[1132,502],"414":[1133,648],"415":[1098,740],"416":[1132,730],"417":[1132,754],"418":[1168,730],"419":[1168,754],"420":[1110,800],"421":[1156,800],"422":[1110,824],"423":[1157,824],"424":[1110,908],"425":[1157,882],"426":[1157,930],"427":[1110,1010],"428":[1110,1082],"429":[1157,1002],"430":[1157,1070],"431":[1074,1213],"501":[1529,344],"502":[1754,344],"503":[1312,494],"504":[1276,588],"505":[1300,588],"506":[1288,642],"507":[1336,612],"508":[1336,668],"509":[1276,730],"510":[1301,730],"511":[1288,752],"512":[1336,742],"513":[1288,802],"514":[1288,824],"515":[1336,814],"516":[1312,898],"517":[1288,954],"518":[1334,954],"519":[1312,1058],"520":[1418,459],"521":[1418,517],"522":[1466,486],"523":[1432,540],"524":[1477,540],"525":[1432,588],"526":[1478,588],"527":[1432,612],"528":[1466,611],"529":[1489,612],"530":[1454,671],"531":[1418,742],"532":[1418,813],"533":[1466,774],"534":[1443,873],"535":[1442,928],"536":[1489,882],"537":[1489,920],"538":[1489,952],"539":[1430,1024],"540":[1477,1036],"541":[1453,1096],"542":[1312,1211],"601":[1569,470],"602":[1619,459],"603":[1560,530],"604":[1608,530],"605":[1560,588],"606":[1584,588],"607":[1607,588],"608":[1631,588],"609":[1570,612],"610":[1618,612],"611":[1596,669],"612":[1584,774],"613":[1631,752],"614":[1631,814],"615":[1573,872],"616":[1619,872],"617":[1584,926],"618":[1630,906],"619":[1630,952],"620":[1572,1026],"621":[1618,1026],"622":[1572,1088],"623":[1619,1096],"624":[1715,446],"625":[1750,446],"626":[1774,446],"627":[1714,471],"628":[1750,470],"629":[1774,470],"630":[1714,529],"631":[1749,518],"632":[1774,518],"633":[1750,542],"634":[1774,542],"635":[1714,600],"636":[1763,600],"637":[1714,658],"638":[1763,658],"639":[1714,684],"640":[1750,684],"641":[1773,684],"642":[1714,730],"643":[1750,730],"644":[1774,730],"645":[1714,754],"646":[1750,754],"647":[1774,754],"648":[1703,802],"649":[1726,802],"650":[1750,802],"651":[1703,826],"652":[1726,826],"653":[1774,802],"654":[1750,826],"655":[1774,826],"656":[1738,916],"657":[1738,1026],"658":[1716,1082],"659":[1762,1082],"660":[1525,1212],"701":[1908,344],"702":[1919,494],"703":[1884,588],"704":[1907,588],"705":[1942,588],"706":[1894,612],"707":[1942,612],"708":[1896,659],"709":[1942,659],"710":[1896,682],"711":[1942,682],"712":[1896,730],"713":[1942,730],"714":[1896,753],"715":[1942,753],"716":[1884,801],"717":[1928,801],"718":[1918,824],"719":[1896,872],"720":[1896,894],"721":[1942,884],"722":[1896,942],"723":[1942,942],"724":[1896,966],"725":[1943,966],"726":[1918,1058],"727":[2037,458],"728":[2037,528],"729":[2084,484],"730":[2084,540],"731":[2036,599],"732":[2037,660],"733":[2084,588],"734":[2084,646],"735":[2037,742],"736":[2084,742],"737":[2025,813],"738":[2072,802],"739":[2037,882],"740":[2084,881],"741":[2036,942],"742":[2084,941],"743":[2060,1022],"744":[2037,1096],"745":[2084,1084],"746":[1983,1216],"801":[2130,344],"802":[2357,344],"803":[2179,469],"804":[2227,458],"805":[2179,530],"806":[2227,530],"807":[2179,588],"808":[2227,588],"809":[2178,612],"810":[2215,612],"811":[2238,612],"812":[2179,672],"813":[2215,660],"814":[2238,660],"815":[2215,683],"816":[2238,683],"817":[2202,742],"818":[2202,814],"819":[2238,872],"820":[2238,896],"821":[2190,918],"822":[2238,918],"823":[2238,942],"824":[2238,964],"825":[2167,1026],"826":[2214,1026],"827":[2179,1086],"828":[2226,1096],"829":[2220,1216],"830":[2354,1216],"831":[2328,458],"832":[2329,553],"833":[2317,636],"834":[2353,636],"835":[2317,660],"836":[2353,660],"837":[2317,708],"838":[2353,708],"839":[2403,446],"840":[2402,470],"841":[2402,494],"842":[2403,518],"843":[2402,565],"844":[2404,588],"845":[2402,612],"846":[2403,636],"847":[2317,731],"848":[2352,731],"849":[2317,790],"850":[2352,778],"851":[2352,801],"852":[2317,848],"853":[2352,849],"854":[2318,873],"855":[2352,873],"856":[2317,920],"857":[2352,920],"858":[2317,944],"859":[2352,944],"860":[2319,1002],"861":[2352,990],"862":[2329,1073],"863":[2403,684],"864":[2404,706],"865":[2403,730],"866":[2403,753],"867":[2403,794],"868":[2403,817],"869":[2403,840],"870":[2403,880],"871":[2402,903],"872":[2403,928],"873":[2403,966],"874":[2404,990],"875":[2403,1014],"876":[2403,1054],"877":[2403,1076],"878":[2403,1100]};
/* IG : ブースの公式Instagram  "番号":"https://www.instagram.com/アカウント名/"  または "@アカウント名"
        1つのブースに複数あるときは ["@a","@b"] のように並べる。ここに無いブースは検索ボタンだけ出る */
const IG={
  "101|サンゾー工務店":"@3zo.official",   /* M16内の別枠。「番号|ブランド名」で合同ブースの1ブランドに付ける */
  "405":"@3zo.official",   /* サンゾー工務店 */
  "115":"@damngood.garage"   /* DAMNGOOD!!（ユーザー提供のInstagram URL） */
};
/* ENTR : 入口・出口（現在地として選べる）  "ID":{name:表示名, pos:[x,y]}  pos は map.jpg の元ピクセル */
const ENTR={
  "E1":{name:"入場口（左）",pos:[920,1321]},
  "E2":{name:"入場口（右）",pos:[2133,1321]},
  "E3":{name:"メインエントランス",pos:[559,1432]},
  "E4":{name:"ペット同伴専用出入口",pos:[2237,1383]},
  "E5":{name:"南出入口",pos:[2237,1438]},
  "E6":{name:"屋外エリアへの出口",pos:[2427,1149]}
};
YEARS[EVENT.year]={EVENT,RAW,POS,IG,ENTR};
})();

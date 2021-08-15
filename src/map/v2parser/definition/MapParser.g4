parser grammar MapParser;
options {
    tokenVocab=MapLexer;
}

root: (statement STATE_END)* EOF;

statement:
    distanceStatement
    | varAssignStatement
    | INCLUDE includeStatement
    | CURVE curveStatement
    | GRADIENT gradientStatement
    | TRACK trackStatement
    | STRUCTURE structureStatement
    | REPEATER repeaterStatement
    | BACKGROUND backgroundStatement
    | STATION stationStatement
    | SECTION sectionStatement
    | SIGNAL signalStatement
    | BEACON beaconStatement
    | SPEEDLIMIT speedlimitStatement
    | PRETRAIN pretrainStatement
    | LIGHT lightStatement
    | FOG fogStatement
    | DRAWDISTANCE drawdistanceStatement
    | CABILLUMINANCE cabilluminanceStatement
    | IRREGULARITY irregularityStatement
    | ADHESION adhesionStatement
    | SOUND soundStatement
    | SOUND3D sound3dStatement
    | ROLLINGNOISE rollingnoiseStatement
    | FLANGENOISE flangenoiseStatement
    | JOINTNOISE jointnoiseStatement
    | TRAIN trainStatement
    | LEGACY legacyStatement;

// 距離程
distanceStatement:
    expr;

// 変数/数式
varAssignStatement:
    v=var EQUAL expr;

// インクルード構文
includeStatement:
    path=string;

// 平面曲線
curveStatement:
    DOT func=(SET_GAUGE | GAUGE) OPN_PAR value=nullableExpr CLS_PAR
    | DOT func=SET_CENTER OPN_PAR x=nullableExpr CLS_PAR
    | DOT func=SET_FUNCTION OPN_PAR id=nullableExpr CLS_PAR
    | DOT func=BEGIN_TRANSITION OPN_PAR CLS_PAR
    | DOT func=(BEGIN | BEGIN_CIRCULAR) OPN_PAR radius=nullableExpr (COMMA cant=nullableExpr)? CLS_PAR
    | DOT func=END OPN_PAR CLS_PAR
    | DOT func=INTERPOLATE OPN_PAR CLS_PAR
    | DOT func=INTERPOLATE OPN_PAR radiusE=expr CLS_PAR
    | DOT func=INTERPOLATE OPN_PAR radius=nullableExpr COMMA cant=nullableExpr CLS_PAR
    | DOT func=CHANGE OPN_PAR radius=nullableExpr CLS_PAR;

// 縦曲線
gradientStatement:
    DOT func=BEGIN_TRANSITION OPN_PAR CLS_PAR
    | DOT func=(BEGIN | BEGIN_CONST) OPN_PAR gradient=nullableExpr CLS_PAR
    | DOT func=END OPN_PAR CLS_PAR
    | DOT func=INTERPOLATE OPN_PAR gradient=nullableExpr CLS_PAR;

// 他軌道
trackStatement:
    OPN_BRA key=expr CLS_BRA DOT subelement=X_ELEMENT DOT func=INTERPOLATE OPN_PAR CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=X_ELEMENT DOT func=INTERPOLATE OPN_PAR xE=expr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=X_ELEMENT DOT func=INTERPOLATE OPN_PAR x=nullableExpr COMMA radius=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=Y_ELEMENT DOT func=INTERPOLATE OPN_PAR CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=Y_ELEMENT DOT func=INTERPOLATE OPN_PAR yE=expr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=Y_ELEMENT DOT func=INTERPOLATE OPN_PAR y=nullableExpr COMMA radius=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=POSITION OPN_PAR x=nullableExpr COMMA y=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=POSITION OPN_PAR x=nullableExpr COMMA y=nullableExpr COMMA radiusH=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=POSITION OPN_PAR x=nullableExpr COMMA y=nullableExpr COMMA radiusH=nullableExpr COMMA radiusV=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=SET_CENTER OPN_PAR x=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=SET_GAUGE OPN_PAR gauge=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=SET_FUNCTION OPN_PAR id=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=BEGIN_TRANSITION OPN_PAR CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=BEGIN OPN_PAR cant=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=END OPN_PAR CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT subelement=CANT_ELEMENT DOT func=INTERPOLATE OPN_PAR cantE=expr? CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=CANT_ELEMENT OPN_PAR cantE=expr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=GAUGE OPN_PAR gauge=nullableExpr CLS_PAR;

// ストラクチャ
structureStatement:
    DOT func=LOAD OPN_PAR path=string CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUT OPN_PAR trackkey=nullableExpr COMMA x=nullableExpr COMMA y=nullableExpr COMMA z=nullableExpr COMMA rx=nullableExpr COMMA ry=nullableExpr COMMA rz=nullableExpr COMMA tilt=nullableExpr COMMA span=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUT0 OPN_PAR trackkey=nullableExpr COMMA tilt=nullableExpr COMMA span=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUTBETWEEN OPN_PAR trackkey1=nullableExpr COMMA trackkey2=nullableExpr ( COMMA flag=nullableExpr)? CLS_PAR;

// 連続ストラクチャ
repeaterStatement:
    OPN_BRA key=expr CLS_BRA DOT func=BEGIN OPN_PAR trackkey=nullableExpr COMMA x=nullableExpr COMMA y=nullableExpr COMMA z=nullableExpr COMMA rx=nullableExpr COMMA ry=nullableExpr COMMA rz=nullableExpr COMMA tilt=nullableExpr COMMA span=nullableExpr COMMA interval=nullableExpr variadicKeyArguments+ CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=BEGIN0 OPN_PAR trackkey=nullableExpr COMMA tilt=nullableExpr COMMA span=nullableExpr COMMA interval=nullableExpr variadicKeyArguments+ CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=END OPN_PAR CLS_PAR;

// 背景
backgroundStatement:
    DOT func=CHANGE OPN_PAR structurekey=nullableExpr CLS_PAR;

// 停車場
stationStatement:
    DOT func=LOAD OPN_PAR path=string CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUT OPN_PAR door=nullableExpr COMMA margin1=nullableExpr COMMA margin2=nullableExpr CLS_PAR;

// 閉そく
sectionStatement:
    DOT func=(BEGIN | BEGIN_NEW) OPN_PAR nullableExpr variadicArguments* CLS_PAR
    | DOT func=SET_SPEEDLIMIT OPN_PAR nullableExpr variadicArguments* CLS_PAR;

// 信号機
signalStatement:
    DOT func=LOAD OPN_PAR path=string CLS_PAR
    | DOT func=SPEEDLIMIT OPN_PAR nullableExpr variadicArguments* CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUT OPN_PAR sectionArgs=nullableExpr COMMA trackkey=nullableExpr COMMA x=nullableExpr COMMA y=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUT OPN_PAR sectionArgs=nullableExpr COMMA trackkey=nullableExpr COMMA x=nullableExpr COMMA y=nullableExpr COMMA z=nullableExpr COMMA rx=nullableExpr COMMA ry=nullableExpr COMMA rz=nullableExpr COMMA tilt=nullableExpr COMMA span=nullableExpr CLS_PAR;

// 地上子
beaconStatement:
    DOT func=PUT OPN_PAR type=nullableExpr COMMA sectionArgs=nullableExpr COMMA sendData=nullableExpr CLS_PAR;

// 速度制限
speedlimitStatement:
    DOT func=BEGIN OPN_PAR v=nullableExpr CLS_PAR
    | DOT func=END OPN_PAR CLS_PAR;

// 先行列車
pretrainStatement:
    DOT func=PASS OPN_PAR nullableExpr CLS_PAR;

// 光源
lightStatement:
    DOT func=AMBIENT OPN_PAR red=nullableExpr COMMA green=nullableExpr COMMA blue=nullableExpr CLS_PAR
    | DOT func=DIFFUSE OPN_PAR red=nullableExpr COMMA green=nullableExpr COMMA blue=nullableExpr CLS_PAR
    | DOT func=DIRECTION OPN_PAR pitch=nullableExpr COMMA yaw=nullableExpr CLS_PAR;

// 霧効果
fogStatement:
    DOT func=INTERPOLATE OPN_PAR CLS_PAR
    | DOT func=INTERPOLATE OPN_PAR densityE=expr CLS_PAR
    | DOT func=(INTERPOLATE | SET) OPN_PAR density=nullableExpr COMMA red=nullableExpr COMMA green=nullableExpr COMMA blue=nullableExpr CLS_PAR;

// 風景描画距離
drawdistanceStatement:
    DOT func=CHANGE OPN_PAR value=nullableExpr CLS_PAR;

// 運転台の明るさ
cabilluminanceStatement:
    DOT func=(INTERPOLATE | SET) OPN_PAR value=expr? CLS_PAR;

// 軌道変位
irregularityStatement:
    DOT func=CHANGE OPN_PAR x=nullableExpr COMMA y=nullableExpr COMMA r=nullableExpr COMMA lx=nullableExpr COMMA ly=nullableExpr COMMA lr=nullableExpr CLS_PAR;

// 粘着特性
adhesionStatement:
    DOT func=CHANGE OPN_PAR a=nullableExpr CLS_PAR
    | DOT func=CHANGE OPN_PAR a=nullableExpr COMMA b=nullableExpr COMMA c=nullableExpr CLS_PAR;

// 音
soundStatement:
    DOT func=LOAD OPN_PAR path=string CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PLAY OPN_PAR CLS_PAR;

// 固定音源
sound3dStatement:
    DOT func=LOAD OPN_PAR path=string CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=PUT OPN_PAR x=nullableExpr COMMA y=nullableExpr CLS_PAR;

// 走行音
rollingnoiseStatement:
    DOT func=CHANGE OPN_PAR index=nullableExpr CLS_PAR;

// フランジきしり音
flangenoiseStatement:
    DOT func=CHANGE OPN_PAR index=nullableExpr CLS_PAR;

// 分岐器通過音
jointnoiseStatement:
    DOT func=PLAY OPN_PAR index=nullableExpr CLS_PAR;

// 他列車
trainStatement:
    DOT func=ADD OPN_PAR trainkey=nullableExpr COMMA path=expr COMMA trackkey=nullableExpr COMMA direction=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=LOAD OPN_PAR path=expr COMMA trackkey=nullableExpr COMMA direction=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=ENABLE OPN_PAR time=nullableExpr CLS_PAR
    | OPN_BRA key=expr CLS_BRA DOT func=STOP OPN_PAR decelerate=nullableExpr COMMA stoptime=nullableExpr COMMA accelerate=nullableExpr COMMA speed=nullableExpr CLS_PAR;

// レガシー関数
legacyStatement:
    DOT func=FOG OPN_PAR arg_start=nullableExpr COMMA arg_end=nullableExpr COMMA red=nullableExpr COMMA green=nullableExpr COMMA blue=nullableExpr CLS_PAR
    | DOT func=CURVE OPN_PAR radius=nullableExpr COMMA cant=nullableExpr CLS_PAR
    | DOT func=PITCH OPN_PAR rate=nullableExpr CLS_PAR
    | DOT func=TURN OPN_PAR slope=nullableExpr CLS_PAR;

nullableExpr:
    expr
    | nullSyntax=NULL
    | /* epsilon */;

// 可変長ストラクチャーキー引数
variadicKeyArguments:
    COMMA key=string;

// 可変長引数
variadicArguments:
    COMMA arg=nullableExpr;

expr:
    OPN_PAR expr CLS_PAR                             # parensExpr
    | op=(PLUS | MINUS) expr                         # unaryExpr
    | left=expr op=(MULT | DIV) right=expr           # infixExpr
    | left=expr op=(PLUS | MINUS | MOD) right=expr   # infixExpr
    | func=ABS OPN_PAR value=expr CLS_PAR            # absExpr
    | func=ATAN2 OPN_PAR y=expr COMMA x=expr CLS_PAR # atan2Expr
    | func=CEIL OPN_PAR value=expr CLS_PAR           # ceilExpr
    | func=COS OPN_PAR value=expr CLS_PAR            # cosExpr
    | func=EXP OPN_PAR value=expr CLS_PAR            # expExpr
    | func=FLOOR OPN_PAR value=expr CLS_PAR          # floorExpr
    | func=LOG OPN_PAR value=expr CLS_PAR            # logExpr
    | func=POW OPN_PAR x=expr COMMA y=expr CLS_PAR   # powExpr
    | func=RAND OPN_PAR value=expr? CLS_PAR          # randExpr
    | func=SIN OPN_PAR value=expr CLS_PAR            # sinExpr
    | func=SQRT OPN_PAR value=expr CLS_PAR           # sqrtExpr
    | v=var                                          # varExpr
    | num=NUM                                        # numberExpr
    | str=string                                     # stringExpr
    | dist=DISTANCE                                  # distanceExpr;

var
    returns[string | undefined varName]:
    VAR_START v=VAR { $varName =$v.text ;};

string
    returns[string | undefined value]:
    QUOTE v=string_text RQUOTE { $value =$v.text ;};

string_text:
    CHAR*;

error_tokens:
    ERROR_TOKEN*;

parser grammar MapParser;
options{
	tokenVocab=MapLexer;
}

root :
	statement* EOF
	;


statement :
	  expr STATE_END                                                                          #distanceStatement
	| VAR_START v=var EQUAL expr STATE_END                                                      #varAssignStatement
	| element DOT function OPN_PAR args CLS_PAR STATE_END                                     #normalStatement
	| element OPN_BRA expr CLS_BRA DOT function OPN_PAR args CLS_PAR STATE_END				        #keyStatement
	| element OPN_BRA expr CLS_BRA DOT subelement DOT function OPN_PAR args CLS_PAR STATE_END #keyWithSubelementStatement
	;

element :
	  CURVE
	| GRADIENT
	| TRACK
	| STRUCTURE
	| REPEATER
	| BACKGROUND
	| STATION
	| SECTION
	| SIGNAL
	| BEACON
	| SPEEDLIMIT
	| PRETRAIN
	| LIGHT
	| FOG
	| DRAWDISTANCE
	| CABILLUMINANCE
	| IRREGULARITY
	| ADHESION
	| SOUND
	| SOUND3D
	| ROLLINGNOISE
	| FLANGENOISE
	| JOINTNOISE
	| TRAIN
	| LEGACY
	;

subelement :
	  X_ELEMENT
	| Y_ELEMENT
	| CANT_ELEMENT
	;

function :
	  SET_GAUGE
	| GAUGE
	| SET_CENTER
	| SET
	| BEGIN_TRANSITION
	| BEGIN
	| BEGIN0
	| BEGIN_CIRCULAR
	| BEGIN_CONST
	| END
	| INTERPOLATE
	| CHANGE
	| POSITION
	| LOAD
	| PUT
	| PUT0
	| PUTBETWEEN
	| SET_SPEEDLIMIT
	| PASS
	| AMBIENT
	| DIFFUSE
	| DIRECTION
	| PLAY
	| ADD
	| ENABLE
	| STOP
	| PITCH
  | TURN
	;

args :
	nullableExpr (COMMA nullableExpr)*
	;

nullableExpr :
	  expr
	| nullSyntax=NULL
	| /* epsilon */
	;

expr :
	  OPN_PAR expr CLS_PAR							#parensExpr
	| op=(PLUS | MINUS) expr						#unaryExpr
	| left=expr op=(MULT | DIV) right=expr			#infixExpr
	| left=expr op=(PLUS | MINUS | MOD) right=expr	#infixExpr
	| func=ABS OPN_PAR value=expr CLS_PAR			#absExpr
	| func=ATAN2 OPN_PAR y=expr COMMA x=expr CLS_PAR		#atan2Expr
	| func=CEIL OPN_PAR value=expr CLS_PAR			#ceilExpr
	| func=COS OPN_PAR value=expr CLS_PAR			#cosExpr
	| func=EXP OPN_PAR value=expr CLS_PAR			#expExpr
	| func=FLOOR OPN_PAR value=expr CLS_PAR			#floorExpr
	| func=LOG OPN_PAR value=expr CLS_PAR			#logExpr
	| func=POW OPN_PAR x=expr COMMA y=expr CLS_PAR		#powExpr
	| func=RAND OPN_PAR value=expr? CLS_PAR			#randExpr
	| func=SIN OPN_PAR value=expr CLS_PAR			#sinExpr
	| func=SQRT OPN_PAR value=expr CLS_PAR			#sqrtExpr
	| v=var											#varExpr
	| num=NUM										#numberExpr
	| str=string									#stringExpr
	| dist=DISTANCE									#distanceExpr
	;

var returns [string | undefined varName]:
	VAR_START v=VAR { $varName = $v.text ;}
	;

string returns [string | undefined value]:
	QUOTE v=string_text RQUOTE { $value = $v.text ;}
	;

string_text :
	CHAR*
	;

error_tokens :
	ERROR_TOKEN*
	;

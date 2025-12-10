import math
import random
import time
import keyboard
import re
import os
_flipcasing=True
def INIT():
    global VAR_I
    global VAR_J
    global VAR_MD_int
    global VAR_P
    global VAR_LK_int_array
    global VAR_XC_int
    global CMD_NUM
    global VAR_LC_STRVAR
    global _zeroflag
    global VAR_TI_int
    global CONST_16
    global CONST_17
    global VAR_RN_STRVAR
    global CONST_14
    global CONST_15
    global CONST_12
    global CONST_13
    global CONST_10
    global CONST_11
    global VAR_IT_STRVAR_array
    global VAR_II
    global VAR_IL_STRVAR_array
    global VAR_UV_int_array
    global VAR_CB_STRVAR
    global VAR_T2_int
    global VAR_ER
    global VAR_PP_int
    global JUMP_TARGET
    global VAR_PY_int
    global VAR_RS_int_array
    global VAR_CV_STRVAR_array
    global VAR_EL_int
    global VAR_MI_int
    global VAR_MR_int
    global D_REG
    global VAR_LX_STRVAR_array
    global CONST_123
    global CONST_41
    global CONST_122
    global CONST_42
    global VAR_OP_int_array
    global CONST_125
    global VAR_GC_int
    global CONST_124
    global CONST_40
    global CONST_127
    global VAR_DC_int
    global CONST_126
    global CONST_129
    global VAR_LI_int
    global CONST_128
    global VAR_OP_STRVAR_array
    global CONST_49
    global VAR_PL_int
    global CONST_47
    global CONST_48
    global CONST_45
    global CONST_46
    global CONST_121
    global CONST_43
    global VAR_RR_int
    global CONST_120
    global CONST_44
    global CONST_119
    global _timeOffset
    global VAR_TF_STRVAR
    global CONST_112
    global CONST_52
    global CONST_111
    global CONST_53
    global CONST_114
    global CONST_50
    global CONST_113
    global CONST_51
    global CONST_116
    global CONST_115
    global G_REG
    global CONST_118
    global CONST_117
    global CONST_58
    global CONST_59
    global CONST_56
    global CONST_57
    global CONST_110
    global CONST_54
    global CONST_55
    global _stack
    global VAR_XN_STRVAR_array
    global VAR_EX_STRVAR_array
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_109
    global CONST_108
    global CONST_101
    global VAR_MV_int_array
    global CONST_100
    global CONST_20
    global CONST_103
    global CONST_102
    global CONST_105
    global CONST_104
    global CONST_107
    global VAR_TC_int
    global CONST_106
    global CONST_27
    global VAR_A_STRVAR
    global CONST_28
    global CONST_25
    global CONST_26
    global CONST_23
    global VAR_MX_int
    global CONST_24
    global _inputQueue
    global Y_REG
    global VAR_AL_STRVAR
    global CONST_21
    global CONST_22
    global _datas
    global CONST_18
    global CONST_19
    global VAR_PO_int
    global VAR_OG_STRVAR_array
    global CONST_30
    global CONST_31
    global VAR_TX_STRVAR
    global VAR_IC_int
    global CONST_38
    global CONST_39
    global C_REG
    global CONST_36
    global CONST_37
    global CONST_34
    global VAR_IP_int_array
    global CONST_35
    global CONST_32
    global VAR_C_int
    global CONST_33
    global VAR_C2_int
    global CONST_29
    global VAR_C_STRVAR
    global VAR_OX_int
    global VAR_CO_int
    global CONST_85
    global CONST_86
    global CONST_83
    global VAR_IV_int_array
    global CONST_84
    global CONST_81
    global CONST_82
    global CONST_80
    global VAR_RD_STRVAR_array
    global CONST_89
    global _dataPtr
    global CONST_87
    global CONST_88
    global VAR_PP
    global F_REG
    global VAR_UQ_int
    global _memory
    global CONST_96
    global CONST_97
    global CONST_94
    global CONST_95
    global VAR_ID_STRVAR
    global CONST_92
    global CONST_93
    global CONST_90
    global CONST_91
    global VAR_FF_int
    global VAR_J_int
    global VAR_SK_int
    global CONST_150
    global CONST_151
    global CONST_98
    global CONST_99
    global VAR_TB_int
    global VAR_LO_STRVAR
    global VAR_AD
    global CONST_145
    global CONST_63
    global CONST_144
    global CONST_64
    global CONST_147
    global CONST_61
    global VAR_CM_STRVAR_array
    global CONST_146
    global CONST_62
    global CONST_149
    global CONST_148
    global CONST_60
    global VAR_CT_STRVAR
    global CONST_69
    global CONST_141
    global CONST_67
    global CONST_140
    global CONST_68
    global CONST_143
    global CONST_65
    global CONST_142
    global CONST_66
    global _time
    global VAR_OD_STRVAR_array
    global VAR_CC_int
    global VAR_A2_STRVAR
    global VAR_AC_int_array
    global B_REG
    global VAR_ID_int_array
    global CONST_134
    global CONST_74
    global CONST_133
    global CONST_75
    global VAR_OC_int
    global CONST_136
    global CONST_72
    global CONST_135
    global CONST_73
    global CONST_138
    global CONST_70
    global CONST_137
    global CONST_71
    global VAR_SF_int
    global CONST_139
    global VAR_DN_int
    global CONST_130
    global CONST_78
    global CONST_79
    global CONST_132
    global CONST_76
    global CONST_131
    global CONST_77
    global X_REG
    global VAR_II_int
    global VAR_AA_STRVAR
    global VAR_A1_STRVAR
    global E_REG
    global VAR_RI_STRVAR_array
    global VAR_LR_int
    global VAR_SX_STRVAR
    global VAR_T_int
    global CONST_9
    global VAR_XX_STRVAR_array
    global VAR_RL_STRVAR
    global VAR_XP_STRVAR_array
    global VAR_I_int
    global VAR_OG_int_array
    global VAR_CC_STRVAR
    global VAR_XO_int
    global VAR_DR_STRVAR_array
    global CONST_7
    global VAR_P_int
    global CONST_8
    global VAR_IL_int
    global CONST_5
    global CONST_6
    global VAR_FI_STRVAR
    global CONST_3
    global CONST_4
    global VAR_BA
    global CONST_1
    global A_REG
    global VAR_CP_STRVAR_array
    global CONST_2
    global _line
    global CONST_0
    global VAR_MO_int
    global VAR_SD
    global VAR_RT_int
    global VAR_CV_int_array
    global _forstack
    global VAR_MS_int
    global USR_PARAM
    global VAR_B_STRVAR
    global VAR_ST
    global VAR_OD_int
    X_REG=0.0
    Y_REG=0.0
    C_REG=0.0
    D_REG=0.0
    E_REG=0.0
    F_REG=0.0
    A_REG=0
    B_REG=0
    G_REG=0
    CMD_NUM=0
    CHANNEL=0
    JUMP_TARGET=""
    USR_PARAM=0
    _line=""
    _stack=[]
    _forstack=[]
    _memory=[0] * 65535
    _zeroflag=0
    _timeOffset=0
    _time=0
    _inputQueue=[]
    CONST_0="START.ROM"
    CONST_1=0
    CONST_2=1
    CONST_3="dAS KLAPPT SO NICHT!"
    CONST_4=3
    CONST_5="dAS BEWIRKT NICHTS MEHR!"
    CONST_6=2
    CONST_7=-1.0
    CONST_8="dAS VERSTEHE ICH NICHT!"
    CONST_9=39
    CONST_10="' KENNE ICH NICHT!"
    CONST_11=""
    CONST_12=15
    CONST_13="dAS WILL NIEMAND HABEN!"
    CONST_14="dAS KANNST DU NICHT "
    CONST_15=33
    CONST_16=10
    CONST_17="dU HAST BEI DIR:"
    CONST_18="NICHTS"
    CONST_19="hIER IST NICHTS!"
    CONST_20="dU KANNST "
    CONST_21=" NICHT NEHMEN!"
    CONST_22=" GENOMMEN!"
    CONST_23=8
    CONST_24=29
    CONST_25="HOC"
    CONST_26="UP"
    CONST_27="GEH "
    CONST_28="RUN"
    CONST_29="DOW"
    CONST_30="WES"
    CONST_31="NOR"
    CONST_32="OST"
    CONST_33="SUE"
    CONST_34="O"
    CONST_35="W"
    CONST_36="S"
    CONST_37="N"
    CONST_38="SW"
    CONST_39="NW"
    CONST_40="SO"
    CONST_41="NO"
    CONST_42="U"
    CONST_43="D"
    CONST_44="R"
    CONST_45="H"
    CONST_46="UNTEN"
    CONST_47="RUNTER"
    CONST_48="RAUF"
    CONST_49="OBEN"
    CONST_50="HOCH"
    CONST_51="hIER IST KEIN pLATZ MEHR!"
    CONST_52=9
    CONST_53=256
    CONST_54=" ABGELEGT!"
    CONST_55=4
    CONST_56="***"
    CONST_57=14
    CONST_58=112
    CONST_59=28
    CONST_60=255
    CONST_61="fEHLER: aRRAY VOLL!"
    CONST_62=" ERHALTEN!"
    CONST_63=5
    CONST_64=38
    CONST_65=304
    CONST_66=76
    CONST_67="."
    CONST_68=6
    CONST_69=7
    CONST_70="PORTAL"
    CONST_71=".ROM"
    CONST_72="mOEGLICHE bEFEHLE:"
    CONST_73=", "
    CONST_74="?"
    CONST_75="-1"
    CONST_76="lADE dATEN..."
    CONST_77="OPERATIONS.DEF"
    CONST_78=46
    CONST_79=64
    CONST_80="OK"
    CONST_81="X"
    CONST_82="Q"
    CONST_83="HELP"
    CONST_84=" "
    CONST_85=128
    CONST_86=32
    CONST_87=57
    CONST_88=48
    CONST_89=90
    CONST_90=65
    CONST_91="E"
    CONST_92="UND"
    CONST_93="SI"
    CONST_94="IH"
    CONST_95="ES"
    CONST_96=" IST HIER NICHT!"
    CONST_97="wIRKLICH BEENDEN (J/N)?"
    CONST_98="J"
    CONST_99="bIS BALD!"
    CONST_100="NORDO"
    CONST_101="NORDW"
    CONST_102="SUEDO"
    CONST_103="SUEDW"
    CONST_104="dA GEHT ES NICHT LANG!"
    CONST_105=" xam / eGONoLSEN71"
    CONST_106="bYTES FREI"
    CONST_107="dU HAST NICHTS!"
    CONST_108=" HAST DU NICHT!"
    CONST_109=".BAK"
    CONST_110="S:"
    CONST_111="R:"
    CONST_112="="
    CONST_113=12
    CONST_114="dU SIEHST NICHTS BESONDERES!"
    CONST_115="bLAH BLAH BLAH!?"
    CONST_116=13
    CONST_117=40
    CONST_118=",R"
    CONST_119="lADE..."
    CONST_120=",W"
    CONST_121="sPEICHERE..."
    CONST_122="io-eRROR: "
    CONST_123=191
    CONST_124="eINEN mOMENT..."
    CONST_125=60
    CONST_126="> "
    CONST_127=37
    CONST_128="ALLES"
    CONST_129="SAVE.DAT"
    CONST_130=49152
    CONST_131=";"
    CONST_132=","
    CONST_133="lADE gEGENSTAENDE..."
    CONST_134="ITEMS.DEF"
    CONST_135="0"
    CONST_136=53179
    CONST_137="lADE bEFEHLE..."
    CONST_138="COMMANDS.DEF"
    CONST_139="ENDID.DEF"
    CONST_140="aUSGAENGE SIND: "
    CONST_141="dU SIEHST: "
    CONST_142=11
    CONST_143=55296
    CONST_144=55335
    CONST_145=1024
    CONST_146=1063
    CONST_147=160
    CONST_148=19
    CONST_149=18
    CONST_150=146
    CONST_151=147
    _dataPtr=0
    _datas=["N","S","W","O","NW","SW","NO","SO","H","R"]
    VAR_DN_int=0
    VAR_ER=0.0
    VAR_CV_int_array=[0]*9
    VAR_T_int=0
    VAR_ID_int_array=[0]*61
    VAR_BA=0.0
    VAR_AD=0.0
    VAR_PP=0.0
    VAR_IC_int=0
    VAR_I=0.0
    VAR_UV_int_array=[0]*61
    VAR_IV_int_array=[0]*61
    VAR_TC_int=0
    VAR_RR_int=0
    VAR_IP_int_array=[0]*21
    VAR_RT_int=0
    VAR_MV_int_array=[0]*61
    VAR_RS_int_array=[0]*61
    VAR_RD_int=0
    VAR_RV_int_array=[0]*261
    VAR_P_int=0
    VAR_FF_int=0
    VAR_II=0.0
    VAR_C_int=0
    VAR_P=0.0
    VAR_XO_int=0
    VAR_OC_int=0
    VAR_OP_int_array=[0]*154
    VAR_OX_int=0
    VAR_T2_int=0
    VAR_UQ_int=0
    VAR_AC_int_array=[0]*11
    VAR_OG_int_array=[0]*418
    VAR_C2_int=0
    VAR_OD_int=0
    VAR_MX_int=0
    VAR_PO_int=0
    VAR_TB_int=0
    VAR_GC_int=0
    VAR_ST=0.0
    VAR_MO_int=0
    VAR_SF_int=0
    VAR_LR_int=0
    VAR_CC_int=0
    VAR_I_int=0
    VAR_PP_int=0
    VAR_CO_int=0
    VAR_MS_int=0
    VAR_TI_int=0
    VAR_DC_int=0
    VAR_SK_int=0
    VAR_J=0.0
    VAR_XC_int=0
    VAR_PL_int=0
    VAR_MI_int=0
    VAR_MR_int=0
    VAR_PY_int=0
    VAR_LI_int=0
    VAR_II_int=0
    VAR_J_int=0
    VAR_SD=0.0
    VAR_MD_int=0
    VAR_EL_int=0
    VAR_IL_int=0
    VAR_LK_int_array=[0]*9
    VAR_RN_STRVAR=""
    VAR_A_STRVAR=""
    VAR_CC_STRVAR=""
    VAR_TX_STRVAR=""
    VAR_TF_STRVAR=""
    VAR_B_STRVAR=""
    VAR_SX_STRVAR=""
    VAR_CB_STRVAR=""
    VAR_LC_STRVAR=""
    VAR_CT_STRVAR=""
    VAR_C_STRVAR=""
    VAR_AA_STRVAR=""
    VAR_LO_STRVAR=""
    VAR_AL_STRVAR=""
    VAR_FI_STRVAR=""
    VAR_RL_STRVAR=""
    VAR_ID_STRVAR=""
    VAR_A1_STRVAR=""
    VAR_A2_STRVAR=""
    VAR_CP_STRVAR_array=[""]*9
    VAR_CV_STRVAR_array=[""]*17
    VAR_IT_STRVAR_array=[""]*61
    VAR_OP_STRVAR_array=[""]*98
    VAR_OG_STRVAR_array=[""]*228
    VAR_OD_STRVAR_array=[""]*30
    VAR_LX_STRVAR_array=[""]*116
    VAR_DR_STRVAR_array=[""]*10
    VAR_CM_STRVAR_array=[""]*102
    VAR_IL_STRVAR_array=[""]*61
    VAR_XP_STRVAR_array=[""]*9
    VAR_XX_STRVAR_array=[""]*9
    VAR_RD_STRVAR_array=[""]*25
    VAR_EX_STRVAR_array=[""]*9
    VAR_XN_STRVAR_array=[""]*9
    VAR_RI_STRVAR_array=[""]*9
def PROGRAMSTART():
    START()
    return 0
def line_0():
    return 10
def line_10():
    global _memory
    global VAR_DN_int
    global X_REG
    X_REG=int(_memory[186]) & 255;
    VAR_DN_int=X_REG
    VAR_DN_int=int(VAR_DN_int)
    GOSUB("GOSUBCONT0")
    return 63300
def GOSUBCONT0():
    GOSUB("GOSUBCONT1")
    return 60000
def GOSUBCONT1():
    GOSUB("GOSUBCONT2")
    return 61200
def GOSUBCONT2():
    GOSUB("GOSUBCONT3")
    return 48000
def GOSUBCONT3():
    GOSUB("GOSUBCONT4")
    return 61500
def GOSUBCONT4():
    return 20
def line_20():
    global VAR_RN_STRVAR
    global B_REG
    global CONST_0
    B_REG=CONST_0
    VAR_RN_STRVAR=B_REG
    GOSUB("GOSUBCONT5")
    return 63300
def GOSUBCONT5():
    return 30
def line_30():
    GOSUB("GOSUBCONT6")
    return 40100
def GOSUBCONT6():
    return 40
def line_40():
    GOSUB("GOSUBCONT7")
    return 50000
def GOSUBCONT7():
    GOSUB("GOSUBCONT8")
    return 40000
def GOSUBCONT8():
    return 50
def line_50():
    GOSUB("GOSUBCONT9")
    return 52000
def GOSUBCONT9():
    GOSUB("GOSUBCONT10")
    return 40000
def GOSUBCONT10():
    return 60
def line_60():
    return 40
def line_40000():
    return 40010
def line_40010():
    global _zeroflag
    global VAR_ER
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_ER
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP0"
    return "SKIP0"
def NSKIP0():
    return "RETURN"
    return "SKIP0"
def SKIP0():
    return 40020
def line_40020():
    global _zeroflag
    global VAR_ER
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_ER
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP1"
    return "SKIP1"
def NSKIP1():
    global CONST_3
    global A_REG
    A_REG=CONST_3
    STROUT()
    LINEBREAK()
    return "SKIP1"
def SKIP1():
    return 40030
def line_40030():
    global _zeroflag
    global VAR_ER
    global Y_REG
    global X_REG
    global CONST_4
    global CONST_1
    Y_REG=CONST_4
    X_REG=VAR_ER
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP2"
    return "SKIP2"
def NSKIP2():
    global CONST_5
    global A_REG
    A_REG=CONST_5
    STROUT()
    LINEBREAK()
    return "SKIP2"
def SKIP2():
    return 40040
def line_40040():
    global _zeroflag
    global VAR_ER
    global Y_REG
    global X_REG
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_ER
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP3"
    return "SKIP3"
def NSKIP3():
    global VAR_ER
    global Y_REG
    global CONST_1
    Y_REG=CONST_1
    VAR_ER=Y_REG
    return "RETURN"
    return "SKIP3"
def SKIP3():
    return 40050
def line_40050():
    global VAR_ER
    global Y_REG
    global CONST_1
    Y_REG=CONST_1
    VAR_ER=Y_REG
    return 40060
def line_40060():
    global _zeroflag
    global G_REG
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    global VAR_CV_int_array
    X_REG=CONST_1
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP4"
    return "SKIP4"
def NSKIP4():
    global CONST_8
    global A_REG
    A_REG=CONST_8
    STROUT()
    LINEBREAK()
    return "RETURN"
    return "SKIP4"
def SKIP4():
    return 40070
def line_40070():
    global CONST_10
    global G_REG
    global Y_REG
    global X_REG
    global CONST_9
    global A_REG
    global CONST_1
    global VAR_CP_STRVAR_array
    Y_REG=CONST_9
    CHR()
    STROUT()
    X_REG=CONST_1
    G_REG=VAR_CP_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    A_REG=CONST_10
    STROUT()
    LINEBREAK()
    return "RETURN"
def line_40100():
    return 40110
def line_40110():
    GOSUB("GOSUBCONT11")
    return 62000
def GOSUBCONT11():
    return 40120
def line_40120():
    GOSUB("GOSUBCONT12")
    return 59500
def GOSUBCONT12():
    return "RETURN"
def line_40500():
    return 40510
def line_40510():
    global CONST_11
    global G_REG
    global VAR_A_STRVAR
    global Y_REG
    global VAR_AD
    global B_REG
    global VAR_ID_int_array
    global X_REG
    global VAR_T_int
    global VAR_BA
    X_REG=VAR_T_int
    G_REG=VAR_ID_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_BA
    X_REG=X_REG+Y_REG
    VAR_AD=X_REG
    B_REG=CONST_11
    VAR_A_STRVAR=B_REG
    return 40520
def line_40520():
    global _stack
    global Y_REG
    global VAR_PP
    global _memory
    global VAR_AD
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_PP=Y_REG
    Y_REG=VAR_AD
    X_REG=_memory[int(Y_REG) & 65535];
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP0","VAR_PP")
    return "FORLOOP0"
def FORLOOP0():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global VAR_PP
    global _memory
    global VAR_AD
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    Y_REG=VAR_PP
    X_REG=VAR_AD
    X_REG=X_REG+Y_REG
    Y_REG=X_REG
    X_REG=_memory[int(Y_REG) & 65535];
    Y_REG=X_REG
    CHR()
    B_REG=A_REG
    A_REG=VAR_A_STRVAR
    CONCAT()
    VAR_A_STRVAR=A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 40530
def line_40530():
    GOSUB("GOSUBCONT13")
    return 59100
def GOSUBCONT13():
    return "RETURN"
def line_40600():
    return 40605
def line_40605():
    global _zeroflag
    global CONST_12
    global VAR_ER
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=CONST_1
    VAR_ER=Y_REG
    Y_REG=CONST_12
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP5"
    return "SKIP5"
def NSKIP5():
    global CONST_13
    global A_REG
    A_REG=CONST_13
    STROUT()
    LINEBREAK()
    return "RETURN"
    return "SKIP5"
def SKIP5():
    return 40610
def line_40610():
    global CONST_14
    global CONST_15
    global VAR_CV_STRVAR_array
    global G_REG
    global Y_REG
    global X_REG
    global VAR_T_int
    global A_REG
    A_REG=CONST_14
    STROUT()
    X_REG=VAR_T_int
    G_REG=VAR_CV_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    Y_REG=CONST_15
    CHR()
    STROUT()
    LINEBREAK()
    return 40620
def line_40620():
    return "RETURN"
def line_40650():
    return 40660
def line_40660():
    LINEBREAK()
    GOSUB("GOSUBCONT14")
    return 62600
def GOSUBCONT14():
    return "RETURN"
def line_40700():
    return 40710
def line_40710():
    global CONST_16
    global CONST_17
    global _memory
    global A_REG
    _memory[646]=int(CONST_16) & 255;
    LINEBREAK()
    A_REG=CONST_17
    STROUT()
    LINEBREAK()
    return 40715
def line_40715():
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP6"
    return "SKIP6"
def NSKIP6():
    global Y_REG
    global CONST_18
    global CONST_6
    global A_REG
    Y_REG=CONST_6
    TAB()
    A_REG=CONST_18
    STROUT()
    LINEBREAK()
    return "RETURN"
    return "SKIP6"
def SKIP6():
    return 40720
def line_40720():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP1","VAR_I")
    return "FORLOOP1"
def FORLOOP1():
    return 40730
def line_40730():
    global VAR_I
    global _zeroflag
    global VAR_UV_int_array
    global G_REG
    global Y_REG
    global X_REG
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP7"
    return "SKIP7"
def NSKIP7():
    global VAR_I
    global VAR_IT_STRVAR_array
    global G_REG
    global Y_REG
    global VAR_IV_int_array
    global X_REG
    global CONST_6
    Y_REG=CONST_6
    TAB()
    X_REG=VAR_I
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    LINEBREAK()
    return "SKIP7"
def SKIP7():
    return 40740
def line_40740():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return "RETURN"
def line_40800():
    return 40805
def line_40805():
    global _zeroflag
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_TC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP8"
    return "SKIP8"
def NSKIP8():
    global CONST_19
    global A_REG
    A_REG=CONST_19
    STROUT()
    LINEBREAK()
    return "RETURN"
    return "SKIP8"
def SKIP8():
    return 40810
def line_40810():
    global VAR_I
    global VAR_RR_int
    global _stack
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP2","VAR_I")
    return "FORLOOP2"
def FORLOOP2():
    global VAR_I
    global G_REG
    global VAR_IP_int_array
    global X_REG
    global VAR_T_int
    X_REG=VAR_I
    G_REG=VAR_IP_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    GOSUB("GOSUBCONT15")
    return 40900
def GOSUBCONT15():
    return 40820
def line_40820():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP9"
    return "SKIP9"
def NSKIP9():
    global VAR_RR_int
    global Y_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "SKIP9"
def SKIP9():
    return 40830
def line_40830():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 40840
def line_40840():
    global _zeroflag
    global VAR_RR_int
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_RR_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP10"
    return "SKIP10"
def NSKIP10():
    GOSUB("GOSUBCONT16")
    return 40650
def GOSUBCONT16():
    return "SKIP10"
def SKIP10():
    return 40850
def line_40850():
    return "RETURN"
def line_40900():
    return 40910
def line_40910():
    global _zeroflag
    global G_REG
    global VAR_MV_int_array
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    X_REG=VAR_T_int
    G_REG=VAR_MV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_2
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP11"
    return "SKIP11"
def NSKIP11():
    return 40930
    return "SKIP11"
def SKIP11():
    return 40920
def line_40920():
    global VAR_IT_STRVAR_array
    global G_REG
    global CONST_20
    global Y_REG
    global CONST_21
    global X_REG
    global VAR_T_int
    global CONST_6
    global A_REG
    global VAR_RT_int
    A_REG=CONST_20
    STROUT()
    X_REG=VAR_T_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    A_REG=CONST_21
    STROUT()
    LINEBREAK()
    Y_REG=CONST_6
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
def line_40930():
    global VAR_IT_STRVAR_array
    global VAR_RS_int_array
    global G_REG
    global _stack
    global Y_REG
    global CONST_22
    global VAR_IC_int
    global VAR_IV_int_array
    global X_REG
    global VAR_T_int
    global CONST_1
    global A_REG
    global CONST_2
    Y_REG=VAR_IC_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_T_int
    G_REG=VAR_IV_int_array
    ARRAYSTORE_INTEGER()
    X_REG=VAR_T_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    A_REG=CONST_22
    STROUT()
    LINEBREAK()
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG+Y_REG
    VAR_IC_int=X_REG
    VAR_IC_int=int(VAR_IC_int)
    Y_REG=VAR_T_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_1
    G_REG=VAR_RS_int_array
    ARRAYSTORE_INTEGER()
    return 40940
def line_40940():
    global _stack
    global CONST_23
    global Y_REG
    global VAR_PP
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_PP=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP3","VAR_PP")
    return "FORLOOP3"
def FORLOOP3():
    global _zeroflag
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global VAR_PP
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=VAR_PP
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_RV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP12"
    return "SKIP12"
def NSKIP12():
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global VAR_PP
    global X_REG
    global CONST_7
    Y_REG=VAR_PP
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    Y_REG=CONST_7
    G_REG=VAR_RV_int_array
    ARRAYSTORE_INTEGER()
    return "SKIP12"
def SKIP12():
    return 40950
def line_40950():
    global _zeroflag
    global Y_REG
    global CONST_1
    global A_REG
    global CONST_2
    global VAR_RT_int
    NEXT("VAR_PP")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
def line_41000():
    return 41005
def line_41005():
    global _zeroflag
    global Y_REG
    global B_REG
    global X_REG
    global VAR_CC_STRVAR
    global CONST_6
    global CONST_1
    B_REG=VAR_CC_STRVAR
    LEN()
    Y_REG=CONST_6
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP13"
    return "SKIP13"
def NSKIP13():
    return "RETURN"
    return "SKIP13"
def SKIP13():
    return 41010
def line_41010():
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global VAR_CC_STRVAR
    global A_REG
    global CONST_2
    B_REG=VAR_CC_STRVAR
    LEN()
    Y_REG=CONST_2
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_CC_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    return 41020
def line_41020():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_4
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_4
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP14"
    return "SKIP14"
def NSKIP14():
    return 41100
    return "SKIP14"
def SKIP14():
    return 41025
def line_41025():
    global VAR_A_STRVAR
    global C_REG
    global B_REG
    global CONST_4
    global A_REG
    C_REG=CONST_4
    B_REG=VAR_A_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    return 41030
def line_41030():
    GOSUB("GOSUBCONT17")
    return 41200
def GOSUBCONT17():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global CONST_25
    global CONST_26
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_25
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_26
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP15"
    return "SKIP15"
def NSKIP15():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP15"
def SKIP15():
    return 41040
def line_41040():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global CONST_28
    global Y_REG
    global CONST_29
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_28
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_29
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP16"
    return "SKIP16"
def NSKIP16():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP16"
def SKIP16():
    return 41060
def line_41060():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global CONST_30
    global CONST_31
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_30
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_31
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP17"
    return "SKIP17"
def NSKIP17():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP17"
def SKIP17():
    return 41070
def line_41070():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global CONST_32
    global CONST_33
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_32
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_33
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP18"
    return "SKIP18"
def NSKIP18():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP18"
def SKIP18():
    return 41090
def line_41090():
    return "RETURN"
def line_41100():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global CONST_36
    global CONST_37
    global CONST_34
    global CONST_35
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_34
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_35
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_36
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_37
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP19"
    return "SKIP19"
def NSKIP19():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP19"
def SKIP19():
    return 41110
def line_41110():
    global _zeroflag
    global CONST_41
    global CONST_40
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global CONST_38
    global CONST_39
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_38
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_39
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_40
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_41
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP20"
    return "SKIP20"
def NSKIP20():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP20"
def SKIP20():
    return 41120
def line_41120():
    global _zeroflag
    global CONST_42
    global CONST_45
    global CONST_43
    global CONST_44
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_42
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_43
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_44
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_45
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP21"
    return "SKIP21"
def NSKIP21():
    global CONST_27
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_CC_STRVAR
    A_REG=CONST_27
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return "RETURN"
    return "SKIP21"
def SKIP21():
    return 41130
def line_41130():
    return "RETURN"
def line_41200():
    return 41210
def line_41210():
    global _zeroflag
    global CONST_46
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_46
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP22"
    return "SKIP22"
def NSKIP22():
    global CONST_47
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_47
    VAR_A_STRVAR=B_REG
    return "SKIP22"
def SKIP22():
    return 41220
def line_41220():
    global _zeroflag
    global CONST_49
    global CONST_48
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_48
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_49
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP23"
    return "SKIP23"
def NSKIP23():
    global CONST_50
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_50
    VAR_A_STRVAR=B_REG
    return "SKIP23"
def SKIP23():
    return 41230
def line_41230():
    return "RETURN"
def line_41300():
    return 41310
def line_41310():
    global VAR_I
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP4","VAR_I")
    return "FORLOOP4"
def FORLOOP4():
    global VAR_I
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global VAR_FF_int
    global X_REG
    global VAR_P_int
    global CONST_1
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_RV_int_array
    ARRAYACCESS_INTEGER()
    VAR_P_int=X_REG
    VAR_P_int=int(VAR_P_int)
    Y_REG=CONST_1
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    return 41320
def line_41320():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_7
    global VAR_P_int
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_P_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP24"
    return "SKIP24"
def NSKIP24():
    return 41360
    return "SKIP24"
def SKIP24():
    return 41325
def line_41325():
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP25"
    return "SKIP25"
def NSKIP25():
    return 41350
    return "SKIP25"
def SKIP25():
    return 41330
def line_41330():
    global VAR_II
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP5","VAR_II")
    return "FORLOOP5"
def FORLOOP5():
    global _zeroflag
    global VAR_II
    global G_REG
    global Y_REG
    global VAR_IV_int_array
    global X_REG
    global VAR_P_int
    global CONST_1
    X_REG=VAR_II
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_P_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP26"
    return "SKIP26"
def NSKIP26():
    global VAR_II
    global Y_REG
    global VAR_IC_int
    global VAR_FF_int
    global CONST_2
    Y_REG=CONST_2
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    Y_REG=VAR_IC_int
    VAR_II=Y_REG
    return "SKIP26"
def SKIP26():
    return 41340
def line_41340():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_2
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP27"
    return "SKIP27"
def NSKIP27():
    return 41360
    return "SKIP27"
def SKIP27():
    return 41350
def line_41350():
    global G_REG
    global _stack
    global VAR_TC_int
    global Y_REG
    global VAR_IP_int_array
    global X_REG
    global VAR_P_int
    global CONST_2
    Y_REG=VAR_TC_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_P_int
    G_REG=VAR_IP_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG+Y_REG
    VAR_TC_int=X_REG
    VAR_TC_int=int(VAR_TC_int)
    return 41360
def line_41360():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return "RETURN"
def line_41400():
    return 41410
def line_41410():
    global VAR_P
    global _stack
    global CONST_23
    global Y_REG
    global VAR_C_int
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_1
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_1
    VAR_P=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP6","VAR_P")
    return "FORLOOP6"
def FORLOOP6():
    global VAR_P
    global _zeroflag
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    Y_REG=VAR_P
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_RV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP28"
    return "SKIP28"
def NSKIP28():
    global Y_REG
    global VAR_C_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_C_int
    X_REG=X_REG+Y_REG
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return "SKIP28"
def SKIP28():
    return 41415
def line_41415():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 41420
def line_41420():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global X_REG
    global CONST_4
    global CONST_1
    Y_REG=CONST_4
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP29"
    return "SKIP29"
def NSKIP29():
    global CONST_51
    global Y_REG
    global CONST_6
    global A_REG
    global VAR_RT_int
    A_REG=CONST_51
    STROUT()
    LINEBREAK()
    Y_REG=CONST_6
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
    return "SKIP29"
def SKIP29():
    return 41430
def line_41430():
    global VAR_P
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_P=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP7","VAR_P")
    return "FORLOOP7"
def FORLOOP7():
    global VAR_P
    global _zeroflag
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    Y_REG=VAR_P
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_RV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP30"
    return "SKIP30"
def NSKIP30():
    global VAR_P
    global CONST_52
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global X_REG
    global VAR_T_int
    Y_REG=VAR_P
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    Y_REG=VAR_T_int
    G_REG=VAR_RV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_52
    VAR_P=Y_REG
    return "SKIP30"
def SKIP30():
    return 41440
def line_41440():
    global VAR_P
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    VAR_P=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP8","VAR_P")
    return "FORLOOP8"
def FORLOOP8():
    global VAR_P
    global G_REG
    global VAR_C_int
    global VAR_IV_int_array
    global X_REG
    X_REG=VAR_P
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return 41450
def line_41450():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=VAR_T_int
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP31"
    return "SKIP31"
def NSKIP31():
    return 41500
    return "SKIP31"
def SKIP31():
    return 41460
def line_41460():
    global VAR_P
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    Y_REG=X_REG
    X_REG=VAR_P
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP32"
    return "SKIP32"
def NSKIP32():
    global VAR_P
    global CONST_53
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    VAR_IC_int=X_REG
    VAR_IC_int=int(VAR_IC_int)
    Y_REG=CONST_53
    VAR_P=Y_REG
    return 41500
    return "SKIP32"
def SKIP32():
    return 41470
def line_41470():
    global VAR_P
    global _stack
    global Y_REG
    global VAR_IC_int
    global VAR_PP
    global X_REG
    global CONST_6
    global CONST_2
    Y_REG=VAR_P
    VAR_PP=Y_REG
    Y_REG=CONST_6
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP9","VAR_PP")
    return "FORLOOP9"
def FORLOOP9():
    global VAR_UV_int_array
    global G_REG
    global _stack
    global Y_REG
    global VAR_IV_int_array
    global VAR_PP
    global X_REG
    global CONST_2
    Y_REG=VAR_PP
    _stack.append(Y_REG)
    Y_REG=CONST_2
    X_REG=VAR_PP
    X_REG=X_REG+Y_REG
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_IV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=VAR_PP
    _stack.append(Y_REG)
    Y_REG=CONST_2
    X_REG=VAR_PP
    X_REG=X_REG+Y_REG
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_UV_int_array
    ARRAYSTORE_INTEGER()
    return 41480
def line_41480():
    global _zeroflag
    global CONST_53
    global Y_REG
    global VAR_IC_int
    global VAR_PP
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    VAR_IC_int=X_REG
    VAR_IC_int=int(VAR_IC_int)
    Y_REG=CONST_53
    VAR_PP=Y_REG
    return 41500
def line_41500():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 41510
def line_41510():
    global VAR_IT_STRVAR_array
    global VAR_RS_int_array
    global G_REG
    global CONST_54
    global _stack
    global Y_REG
    global X_REG
    global VAR_T_int
    global A_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=VAR_T_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_2
    G_REG=VAR_RS_int_array
    ARRAYSTORE_INTEGER()
    X_REG=VAR_T_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    A_REG=CONST_54
    STROUT()
    LINEBREAK()
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
def line_42000():
    return 42005
def line_42005():
    global _zeroflag
    global Y_REG
    global VAR_OC_int
    global X_REG
    global VAR_XO_int
    global CONST_1
    Y_REG=VAR_XO_int
    X_REG=VAR_OC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP33"
    return "SKIP33"
def NSKIP33():
    return 42420
    return "SKIP33"
def SKIP33():
    return 42010
def line_42010():
    global VAR_I
    global CONST_16
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_16
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP10","VAR_I")
    return "FORLOOP10"
def FORLOOP10():
    return 42015
def line_42015():
    GOSUB("GOSUBCONT18")
    return 45200
def GOSUBCONT18():
    return 42020
def line_42020():
    global VAR_I
    global VAR_OP_int_array
    global G_REG
    global CONST_55
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global VAR_OC_int
    global X_REG
    global A_REG
    global CONST_2
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    X_REG=X_REG*pow(2,A_REG)
    A_REG=CONST_2
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_OC_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    B_REG=VAR_A_STRVAR
    VAL()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_OP_int_array
    ARRAYSTORE_INTEGER()
    GOSUB("GOSUBCONT19")
    return 61700
def GOSUBCONT19():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 42040
def line_42040():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_OX_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_OX_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP11","VAR_I")
    return "FORLOOP11"
def FORLOOP11():
    global VAR_I
    global _zeroflag
    global CONST_11
    global VAR_II
    global VAR_OP_STRVAR_array
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global VAR_OC_int
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    X_REG=X_REG*pow(2,A_REG)
    A_REG=CONST_2
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_OC_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=CONST_11
    X_REG=_stack.pop()
    G_REG=VAR_OP_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    VAR_II=Y_REG
    return 42050
def line_42050():
    global VAR_A_STRVAR
    global VAR_TX_STRVAR
    global B_REG
    B_REG=VAR_A_STRVAR
    VAR_TX_STRVAR=B_REG
    GOSUB("GOSUBCONT20")
    return 61000
def GOSUBCONT20():
    global VAR_II
    global VAR_OP_STRVAR_array
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global VAR_TX_STRVAR
    global VAR_OC_int
    global X_REG
    global A_REG
    global CONST_2
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    X_REG=X_REG*pow(2,A_REG)
    A_REG=CONST_2
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_OC_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=VAR_TX_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_OP_STRVAR_array
    ARRAYSTORE_STRING()
    GOSUB("GOSUBCONT21")
    return 61700
def GOSUBCONT21():
    global VAR_II
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_II
    X_REG=X_REG+Y_REG
    VAR_II=X_REG
    return 42055
def line_42055():
    global _zeroflag
    global VAR_II
    global Y_REG
    global VAR_OX_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_OX_int
    X_REG=X_REG+Y_REG
    Y_REG=X_REG
    X_REG=VAR_II
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP34"
    return "SKIP34"
def NSKIP34():
    return 42420
    return "SKIP34"
def SKIP34():
    return 42060
def line_42060():
    global _zeroflag
    global CONST_56
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_56
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP35"
    return "SKIP35"
def NSKIP35():
    global Y_REG
    global VAR_OC_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_OC_int
    X_REG=X_REG+Y_REG
    VAR_OC_int=X_REG
    VAR_OC_int=int(VAR_OC_int)
    return "RETURN"
    return "SKIP35"
def SKIP35():
    return 42070
def line_42070():
    return 42050
def line_42200():
    return 42210
def line_42210():
    global VAR_P
    global VAR_T2_int
    global VAR_OP_int_array
    global G_REG
    global CONST_58
    global CONST_57
    global _stack
    global Y_REG
    global VAR_PP
    global X_REG
    Y_REG=CONST_57
    _stack.append(Y_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OP_int_array
    ARRAYACCESS_INTEGER()
    VAR_P=X_REG
    Y_REG=CONST_58
    _stack.append(Y_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OP_int_array
    ARRAYACCESS_INTEGER()
    VAR_PP=X_REG
    GOSUB("GOSUBCONT22")
    return 42900
def GOSUBCONT22():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP36"
    return "SKIP36"
def NSKIP36():
    return "RETURN"
    return "SKIP36"
def SKIP36():
    return 42220
def line_42220():
    global _zeroflag
    global VAR_T2_int
    global VAR_OP_int_array
    global G_REG
    global CONST_59
    global _stack
    global Y_REG
    global VAR_UQ_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_59
    _stack.append(Y_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OP_int_array
    ARRAYACCESS_INTEGER()
    VAR_UQ_int=X_REG
    VAR_UQ_int=int(VAR_UQ_int)
    Y_REG=CONST_2
    X_REG=VAR_UQ_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP37"
    return "SKIP37"
def NSKIP37():
    return 42270
    return "SKIP37"
def SKIP37():
    return 42230
def line_42230():
    GOSUB("GOSUBCONT23")
    return 43000
def GOSUBCONT23():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP38"
    return "SKIP38"
def NSKIP38():
    return "RETURN"
    return "SKIP38"
def SKIP38():
    return 42270
def line_42270():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_OX_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_OX_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP12","VAR_I")
    return "FORLOOP12"
def FORLOOP12():
    global VAR_I
    global _zeroflag
    global VAR_T2_int
    global VAR_OP_STRVAR_array
    global G_REG
    global CONST_55
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    X_REG=X_REG*pow(2,A_REG)
    A_REG=CONST_2
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OP_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP39"
    return "SKIP39"
def NSKIP39():
    global VAR_I
    global Y_REG
    global VAR_OX_int
    Y_REG=VAR_OX_int
    VAR_I=Y_REG
    return 42290
    return "SKIP39"
def SKIP39():
    return 42280
def line_42280():
    GOSUB("GOSUBCONT24")
    return 59100
def GOSUBCONT24():
    return 42290
def line_42290():
    global VAR_I
    global _zeroflag
    global CONST_16
    global _stack
    global Y_REG
    global CONST_1
    global A_REG
    global CONST_2
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_16
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP13","VAR_I")
    return "FORLOOP13"
def FORLOOP13():
    global VAR_I
    global _zeroflag
    global VAR_T2_int
    global VAR_OP_int_array
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global VAR_AC_int_array
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    Y_REG=VAR_I
    _stack.append(Y_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    X_REG=X_REG*pow(2,A_REG)
    A_REG=CONST_2
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OP_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_AC_int_array
    ARRAYSTORE_INTEGER()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 42300
def line_42300():
    GOSUB("GOSUBCONT25")
    return 43400
def GOSUBCONT25():
    return 42330
def line_42330():
    return "RETURN"
def line_42400():
    return 42410
def line_42410():
    global VAR_I
    global _zeroflag
    global Y_REG
    global CONST_60
    global X_REG
    global CONST_1
    Y_REG=CONST_60
    X_REG=VAR_I
    X_REG= (-1 if X_REG>=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP40"
    return "SKIP40"
def NSKIP40():
    return "RETURN"
    return "SKIP40"
def SKIP40():
    return 42420
def line_42420():
    global CONST_61
    global A_REG
    A_REG=CONST_61
    STROUT()
    LINEBREAK()
    return 49100
def line_42500():
    return 42510
def line_42510():
    global VAR_I
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP14","VAR_I")
    return "FORLOOP14"
def FORLOOP14():
    global VAR_I
    global _zeroflag
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_RV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP41"
    return "SKIP41"
def NSKIP41():
    global VAR_I
    global CONST_53
    global G_REG
    global _stack
    global VAR_RV_int_array
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global VAR_C_int
    global X_REG
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    Y_REG=VAR_C_int
    G_REG=VAR_RV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_53
    VAR_I=Y_REG
    return "SKIP41"
def SKIP41():
    return 42520
def line_42520():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    GOSUB("GOSUBCONT26")
    return 42400
def GOSUBCONT26():
    return 42530
def line_42530():
    GOSUB("GOSUBCONT27")
    return 62600
def GOSUBCONT27():
    global Y_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
def line_42600():
    return 42605
def line_42605():
    global CONST_16
    global VAR_IT_STRVAR_array
    global G_REG
    global VAR_C_int
    global _memory
    global CONST_62
    global X_REG
    global A_REG
    _memory[646]=int(CONST_16) & 255;
    X_REG=VAR_C_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    A_REG=CONST_62
    STROUT()
    LINEBREAK()
    return 42610
def line_42610():
    GOSUB("GOSUBCONT28")
    return 42650
def GOSUBCONT28():
    return 42615
def line_42615():
    global _zeroflag
    global G_REG
    global Y_REG
    global CONST_63
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_1
    X_REG=CONST_63
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP42"
    return "SKIP42"
def NSKIP42():
    global Y_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
    return "SKIP42"
def SKIP42():
    return 42620
def line_42620():
    GOSUB("GOSUBCONT29")
    return 62600
def GOSUBCONT29():
    global Y_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
def line_42650():
    return 42660
def line_42660():
    global VAR_RS_int_array
    global G_REG
    global _stack
    global Y_REG
    global VAR_IC_int
    global VAR_C_int
    global VAR_IV_int_array
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=VAR_IC_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_C_int
    G_REG=VAR_IV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG+Y_REG
    VAR_IC_int=X_REG
    VAR_IC_int=int(VAR_IC_int)
    Y_REG=VAR_C_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_1
    G_REG=VAR_RS_int_array
    ARRAYSTORE_INTEGER()
    return "RETURN"
def line_42700():
    return 42710
def line_42710():
    global VAR_P
    global VAR_T2_int
    global G_REG
    global _stack
    global Y_REG
    global VAR_PP
    global CONST_64
    global CONST_65
    global X_REG
    global VAR_OG_int_array
    Y_REG=CONST_64
    _stack.append(Y_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OG_int_array
    ARRAYACCESS_INTEGER()
    VAR_P=X_REG
    Y_REG=CONST_65
    _stack.append(Y_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OG_int_array
    ARRAYACCESS_INTEGER()
    VAR_PP=X_REG
    GOSUB("GOSUBCONT30")
    return 42900
def GOSUBCONT30():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP43"
    return "SKIP43"
def NSKIP43():
    return "RETURN"
    return "SKIP43"
def SKIP43():
    return 42730
def line_42730():
    global _zeroflag
    global VAR_T2_int
    global G_REG
    global _stack
    global Y_REG
    global VAR_UQ_int
    global CONST_66
    global X_REG
    global VAR_OG_int_array
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_66
    _stack.append(Y_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OG_int_array
    ARRAYACCESS_INTEGER()
    VAR_UQ_int=X_REG
    VAR_UQ_int=int(VAR_UQ_int)
    Y_REG=CONST_2
    X_REG=VAR_UQ_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP44"
    return "SKIP44"
def NSKIP44():
    return 42780
    return "SKIP44"
def SKIP44():
    return 42740
def line_42740():
    GOSUB("GOSUBCONT31")
    return 43000
def GOSUBCONT31():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP45"
    return "SKIP45"
def NSKIP45():
    return "RETURN"
    return "SKIP45"
def SKIP45():
    return 42780
def line_42780():
    global VAR_I
    global _stack
    global Y_REG
    global CONST_63
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_63
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP15","VAR_I")
    return "FORLOOP15"
def FORLOOP15():
    global VAR_I
    global _zeroflag
    global VAR_T2_int
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global VAR_OG_STRVAR_array
    global CONST_64
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_64
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OG_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP46"
    return "SKIP46"
def NSKIP46():
    global VAR_I
    global Y_REG
    global CONST_63
    Y_REG=CONST_63
    VAR_I=Y_REG
    return 42800
    return "SKIP46"
def SKIP46():
    return 42790
def line_42790():
    GOSUB("GOSUBCONT32")
    return 59100
def GOSUBCONT32():
    return 42800
def line_42800():
    global VAR_I
    global _zeroflag
    global CONST_16
    global _stack
    global Y_REG
    global CONST_1
    global A_REG
    global CONST_2
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_16
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP16","VAR_I")
    return "FORLOOP16"
def FORLOOP16():
    global VAR_I
    global _zeroflag
    global VAR_T2_int
    global G_REG
    global _stack
    global Y_REG
    global CONST_64
    global VAR_AC_int_array
    global X_REG
    global VAR_OG_int_array
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_64
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_T2_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_OG_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_AC_int_array
    ARRAYSTORE_INTEGER()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 42810
def line_42810():
    GOSUB("GOSUBCONT33")
    return 43400
def GOSUBCONT33():
    return 42830
def line_42830():
    return "RETURN"
def line_42900():
    return 42910
def line_42910():
    global G_REG
    global Y_REG
    global VAR_C_int
    global VAR_C2_int
    global X_REG
    global CONST_6
    global CONST_1
    global CONST_2
    global VAR_RT_int
    global VAR_CV_int_array
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    X_REG=CONST_2
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    X_REG=CONST_6
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_C2_int=X_REG
    VAR_C2_int=int(VAR_C2_int)
    return 42920
def line_42920():
    global _zeroflag
    global Y_REG
    global VAR_PP
    global X_REG
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_PP
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP47"
    return "SKIP47"
def NSKIP47():
    return 42950
    return "SKIP47"
def SKIP47():
    return 42930
def line_42930():
    global VAR_P
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global X_REG
    global CONST_1
    Y_REG=VAR_C_int
    X_REG=VAR_P
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP48"
    return "SKIP48"
def NSKIP48():
    global _zeroflag
    global Y_REG
    global VAR_C2_int
    global X_REG
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_C2_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP49"
    return "SKIP49"
def NSKIP49():
    GOSUB("GOSUBCONT34")
    return 43500
def GOSUBCONT34():
    return "SKIP49"
def SKIP49():
    return "SKIP48"
def SKIP48():
    return 42940
def line_42940():
    return "RETURN"
def line_42950():
    global VAR_P
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_C_int
    global VAR_C2_int
    global VAR_PP
    global X_REG
    global CONST_1
    Y_REG=VAR_C_int
    X_REG=VAR_PP
    X_REG= (-1 if X_REG==Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=VAR_C2_int
    X_REG=VAR_P
    X_REG= (-1 if X_REG==Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) & int(Y_REG)
    _stack.append(X_REG)
    Y_REG=VAR_C2_int
    X_REG=VAR_PP
    X_REG= (-1 if X_REG==Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=VAR_C_int
    X_REG=VAR_P
    X_REG= (-1 if X_REG==Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) & int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP50"
    return "SKIP50"
def NSKIP50():
    GOSUB("GOSUBCONT35")
    return 43500
def GOSUBCONT35():
    return "SKIP50"
def SKIP50():
    return 42960
def line_42960():
    return "RETURN"
def line_43000():
    return 43010
def line_43010():
    global Y_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    GOSUB("GOSUBCONT36")
    return 43100
def GOSUBCONT36():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_OD_int
    Y_REG=CONST_1
    X_REG=VAR_OD_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP51"
    return "SKIP51"
def NSKIP51():
    return 43050
    return "SKIP51"
def SKIP51():
    return 43030
def line_43030():
    global VAR_I
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_OD_int
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_OD_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP17","VAR_I")
    return "FORLOOP17"
def FORLOOP17():
    global VAR_I
    global _zeroflag
    global VAR_TF_STRVAR
    global G_REG
    global _stack
    global VAR_OD_STRVAR_array
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_TF_STRVAR
    _stack.append(B_REG)
    X_REG=VAR_I
    G_REG=VAR_OD_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP52"
    return "SKIP52"
def NSKIP52():
    global VAR_ER
    global Y_REG
    global CONST_4
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_4
    VAR_ER=Y_REG
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
    return "SKIP52"
def SKIP52():
    return 43040
def line_43040():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 43050
def line_43050():
    GOSUB("GOSUBCONT37")
    return 43150
def GOSUBCONT37():
    return "RETURN"
def line_43100():
    return 43110
def line_43110():
    global VAR_I
    global VAR_P
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global VAR_C2_int
    global X_REG
    global CONST_1
    Y_REG=VAR_C_int
    VAR_I=Y_REG
    Y_REG=VAR_C2_int
    VAR_P=Y_REG
    Y_REG=VAR_P
    X_REG=VAR_I
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP53"
    return "SKIP53"
def NSKIP53():
    global VAR_I
    global VAR_P
    global Y_REG
    global VAR_C2_int
    Y_REG=VAR_I
    VAR_P=Y_REG
    Y_REG=VAR_C2_int
    VAR_I=Y_REG
    return "SKIP53"
def SKIP53():
    return 43120
def line_43120():
    global VAR_I
    global VAR_P
    global VAR_TF_STRVAR
    global _stack
    global Y_REG
    global CONST_67
    global B_REG
    global VAR_T_int
    global A_REG
    Y_REG=VAR_P
    STR()
    _stack.append(A_REG)
    Y_REG=VAR_I
    STR()
    _stack.append(A_REG)
    B_REG=CONST_67
    _stack.append(B_REG)
    Y_REG=VAR_T_int
    STR()
    B_REG=_stack.pop()
    CONCAT()
    B_REG=_stack.pop()
    CONCAT()
    B_REG=CONST_67
    CONCAT()
    B_REG=_stack.pop()
    CONCAT()
    VAR_TF_STRVAR=A_REG
    return 43125
def line_43125():
    global VAR_TF_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global A_REG
    global CONST_2
    B_REG=VAR_TF_STRVAR
    LEN()
    Y_REG=CONST_2
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_TF_STRVAR
    RIGHT()
    VAR_TF_STRVAR=A_REG
    return "RETURN"
def line_43150():
    return 43160
def line_43160():
    global _zeroflag
    global VAR_TF_STRVAR
    global G_REG
    global _stack
    global VAR_MX_int
    global Y_REG
    global VAR_OD_STRVAR_array
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    global VAR_OD_int
    Y_REG=VAR_OD_int
    _stack.append(Y_REG)
    A_REG=VAR_TF_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_OD_STRVAR_array
    ARRAYSTORE_STRING()
    Y_REG=CONST_2
    X_REG=VAR_OD_int
    X_REG=X_REG+Y_REG
    VAR_OD_int=X_REG
    VAR_OD_int=int(VAR_OD_int)
    Y_REG=VAR_MX_int
    X_REG=VAR_OD_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP54"
    return "SKIP54"
def NSKIP54():
    return 42420
    return "SKIP54"
def SKIP54():
    return 43165
def line_43165():
    global CONST_16
    global Y_REG
    global VAR_PO_int
    global X_REG
    Y_REG=CONST_16
    X_REG=VAR_PO_int
    X_REG=X_REG+Y_REG
    VAR_PO_int=X_REG
    VAR_PO_int=int(VAR_PO_int)
    GOSUB("GOSUBCONT38")
    return 63005
def GOSUBCONT38():
    global _memory
    global CONST_4
    _memory[646]=int(CONST_4) & 255;
    return 43170
def line_43170():
    return "RETURN"
def line_43200():
    return 43210
def line_43210():
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP55"
    return "SKIP55"
def NSKIP55():
    return "RETURN"
    return "SKIP55"
def SKIP55():
    return 43220
def line_43220():
    global VAR_II
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP18","VAR_II")
    return "FORLOOP18"
def FORLOOP18():
    return 43230
def line_43230():
    global _zeroflag
    global VAR_II
    global G_REG
    global Y_REG
    global VAR_C_int
    global VAR_IV_int_array
    global X_REG
    global CONST_1
    X_REG=VAR_II
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_C_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP56"
    return "SKIP56"
def NSKIP56():
    global _zeroflag
    global VAR_II
    global VAR_UV_int_array
    global G_REG
    global Y_REG
    global X_REG
    global CONST_1
    X_REG=VAR_II
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP57"
    return "SKIP57"
def NSKIP57():
    global VAR_II
    global VAR_UV_int_array
    global G_REG
    global _stack
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=VAR_II
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_2
    G_REG=VAR_UV_int_array
    ARRAYSTORE_INTEGER()
    return "RETURN"
    return "SKIP57"
def SKIP57():
    return "SKIP56"
def SKIP56():
    return 43240
def line_43240():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return "RETURN"
def line_43400():
    return 43410
def line_43410():
    global _zeroflag
    global VAR_RR_int
    global CONST_52
    global G_REG
    global Y_REG
    global VAR_AC_int_array
    global X_REG
    global CONST_1
    X_REG=CONST_52
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_RR_int=X_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=VAR_RR_int
    _zeroflag=(0 if Y_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP58"
    return "SKIP58"
def NSKIP58():
    GOSUB("GOSUBCONT39")
    return 43800
def GOSUBCONT39():
    return "SKIP58"
def SKIP58():
    return 43420
def line_43420():
    return 43430
def line_43430():
    global _zeroflag
    global G_REG
    global Y_REG
    global VAR_C_int
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_4
    global CONST_1
    X_REG=CONST_4
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_7
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP59"
    return "SKIP59"
def NSKIP59():
    GOSUB("GOSUBCONT40")
    return 43200
def GOSUBCONT40():
    return "SKIP59"
def SKIP59():
    return 43435
def line_43435():
    global _zeroflag
    global G_REG
    global CONST_55
    global Y_REG
    global VAR_C_int
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_1
    X_REG=CONST_55
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_7
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP60"
    return "SKIP60"
def NSKIP60():
    GOSUB("GOSUBCONT41")
    return 43900
def GOSUBCONT41():
    return "SKIP60"
def SKIP60():
    return 43440
def line_43440():
    global _zeroflag
    global G_REG
    global Y_REG
    global VAR_C_int
    global CONST_63
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_1
    X_REG=CONST_63
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_7
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP61"
    return "SKIP61"
def NSKIP61():
    GOSUB("GOSUBCONT42")
    return 42500
def GOSUBCONT42():
    return "SKIP61"
def SKIP61():
    return 43450
def line_43450():
    global _zeroflag
    global G_REG
    global Y_REG
    global VAR_C_int
    global CONST_68
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_1
    X_REG=CONST_68
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_7
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP62"
    return "SKIP62"
def NSKIP62():
    GOSUB("GOSUBCONT43")
    return 42600
def GOSUBCONT43():
    return "SKIP62"
def SKIP62():
    return 43455
def line_43455():
    global _zeroflag
    global G_REG
    global Y_REG
    global VAR_C_int
    global CONST_69
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_1
    X_REG=CONST_69
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_7
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP63"
    return "SKIP63"
def NSKIP63():
    GOSUB("GOSUBCONT44")
    return 44000
def GOSUBCONT44():
    return "SKIP63"
def SKIP63():
    return 43460
def line_43460():
    global _zeroflag
    global CONST_16
    global G_REG
    global Y_REG
    global VAR_C_int
    global VAR_AC_int_array
    global X_REG
    global CONST_7
    global CONST_1
    X_REG=CONST_16
    G_REG=VAR_AC_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_7
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP64"
    return "SKIP64"
def NSKIP64():
    GOSUB("GOSUBCONT45")
    return 44200
def GOSUBCONT45():
    return "SKIP64"
def SKIP64():
    return 43490
def line_43490():
    global Y_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
def line_43500():
    return 43510
def line_43510():
    global _zeroflag
    global Y_REG
    global VAR_PP
    global X_REG
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_PP
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP65"
    return "SKIP65"
def NSKIP65():
    return 43530
    return "SKIP65"
def SKIP65():
    return 43520
def line_43520():
    global VAR_RR_int
    global Y_REG
    global VAR_C2_int
    Y_REG=VAR_C2_int
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    GOSUB("GOSUBCONT46")
    return 43600
def GOSUBCONT46():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP66"
    return "SKIP66"
def NSKIP66():
    return "RETURN"
    return "SKIP66"
def SKIP66():
    return 43530
def line_43530():
    global VAR_RR_int
    global Y_REG
    global VAR_C_int
    Y_REG=VAR_C_int
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    GOSUB("GOSUBCONT47")
    return 43600
def GOSUBCONT47():
    return "RETURN"
def line_43600():
    return 43610
def line_43610():
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP67"
    return "SKIP67"
def NSKIP67():
    return 43670
    return "SKIP67"
def SKIP67():
    return 43620
def line_43620():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP19","VAR_I")
    return "FORLOOP19"
def FORLOOP19():
    return 43630
def line_43630():
    global VAR_I
    global _zeroflag
    global VAR_RR_int
    global G_REG
    global Y_REG
    global VAR_IV_int_array
    global X_REG
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_RR_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP68"
    return "SKIP68"
def NSKIP68():
    global VAR_I
    global _zeroflag
    global VAR_UV_int_array
    global G_REG
    global Y_REG
    global X_REG
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP69"
    return "SKIP69"
def NSKIP69():
    global Y_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
    return "SKIP69"
def SKIP69():
    return "SKIP68"
def SKIP68():
    return 43640
def line_43640():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 43670
def line_43670():
    global _zeroflag
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_TC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP70"
    return "SKIP70"
def NSKIP70():
    return 43710
    return "SKIP70"
def SKIP70():
    return 43680
def line_43680():
    global VAR_I
    global _stack
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP20","VAR_I")
    return "FORLOOP20"
def FORLOOP20():
    return 43690
def line_43690():
    global VAR_I
    global _zeroflag
    global VAR_RR_int
    global G_REG
    global Y_REG
    global VAR_IP_int_array
    global X_REG
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_IP_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_RR_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP71"
    return "SKIP71"
def NSKIP71():
    global _zeroflag
    global VAR_RR_int
    global G_REG
    global VAR_MV_int_array
    global Y_REG
    global X_REG
    global CONST_1
    X_REG=VAR_RR_int
    G_REG=VAR_MV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP72"
    return "SKIP72"
def NSKIP72():
    global Y_REG
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return "RETURN"
    return "SKIP72"
def SKIP72():
    return "SKIP71"
def SKIP71():
    return 43700
def line_43700():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 43710
def line_43710():
    GOSUB("GOSUBCONT48")
    return 53450
def GOSUBCONT48():
    return "RETURN"
def line_43800():
    return 43810
def line_43810():
    global VAR_RR_int
    global Y_REG
    global VAR_C_int
    Y_REG=VAR_C_int
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    GOSUB("GOSUBCONT49")
    return 43200
def GOSUBCONT49():
    global Y_REG
    global VAR_C_int
    global VAR_C2_int
    Y_REG=VAR_C2_int
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT50")
    return 43200
def GOSUBCONT50():
    global VAR_RR_int
    global Y_REG
    global VAR_C_int
    Y_REG=VAR_RR_int
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    return "RETURN"
def line_43900():
    return 43910
def line_43910():
    GOSUB("GOSUBCONT51")
    return 42650
def GOSUBCONT51():
    return 43920
def line_43920():
    GOSUB("GOSUBCONT52")
    return 43200
def GOSUBCONT52():
    return 43930
def line_43930():
    return "RETURN"
def line_44000():
    return 44010
def line_44010():
    global VAR_I
    global _stack
    global Y_REG
    global CONST_4
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_4
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP21","VAR_I")
    return "FORLOOP21"
def FORLOOP21():
    global VAR_I
    global _zeroflag
    global VAR_LX_STRVAR_array
    global G_REG
    global _stack
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_LX_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=A_REG
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP73"
    return "SKIP73"
def NSKIP73():
    return 44040
    return "SKIP73"
def SKIP73():
    return 44020
def line_44020():
    global VAR_I
    global VAR_LX_STRVAR_array
    global G_REG
    global _stack
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global VAR_C_int
    global X_REG
    global VAR_DR_STRVAR_array
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    X_REG=VAR_C_int
    G_REG=VAR_DR_STRVAR_array
    ARRAYACCESS_STRING()
    X_REG=_stack.pop()
    G_REG=VAR_LX_STRVAR_array
    ARRAYSTORE_STRING()
    return 44030
def line_44030():
    GOSUB("GOSUBCONT53")
    return 62500
def GOSUBCONT53():
    global VAR_I
    global CONST_53
    global Y_REG
    Y_REG=CONST_53
    VAR_I=Y_REG
    return 44040
def line_44040():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    GOSUB("GOSUBCONT54")
    return 42400
def GOSUBCONT54():
    return 44060
def line_44060():
    return "RETURN"
def line_44200():
    return 44210
def line_44210():
    global VAR_RN_STRVAR
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global VAR_C_int
    global B_REG
    global CONST_70
    global CONST_71
    global X_REG
    global A_REG
    global CONST_2
    Y_REG=VAR_C_int
    STR()
    VAR_A_STRVAR=A_REG
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_2
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_A_STRVAR
    RIGHT()
    B_REG=A_REG
    A_REG=CONST_70
    CONCAT()
    B_REG=CONST_71
    CONCAT()
    VAR_RN_STRVAR=A_REG
    return 44220
def line_44220():
    LINEBREAK()
    GOSUB("GOSUBCONT55")
    return 40100
def GOSUBCONT55():
    return "RETURN"
def line_45000():
    return 45010
def line_45010():
    global CONST_16
    global _memory
    global CONST_72
    global A_REG
    _memory[646]=int(CONST_16) & 255;
    A_REG=CONST_72
    STROUT()
    LINEBREAK()
    LINEBREAK()
    return 45020
def line_45020():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_TB_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_TB_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP22","VAR_I")
    return "FORLOOP22"
def FORLOOP22():
    global CONST_11
    global VAR_II
    global CONST_55
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global CONST_1
    global CONST_2
    B_REG=CONST_11
    VAR_A_STRVAR=B_REG
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_55
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP23","VAR_II")
    return "FORLOOP23"
def FORLOOP23():
    global VAR_I
    global VAR_II
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global VAR_CM_STRVAR_array
    global X_REG
    global A_REG
    global VAR_B_STRVAR
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_CM_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_B_STRVAR=A_REG
    return 45030
def line_45030():
    global _zeroflag
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP74"
    return "SKIP74"
def NSKIP74():
    global VAR_II
    global Y_REG
    global CONST_63
    Y_REG=CONST_63
    VAR_II=Y_REG
    return 45060
    return "SKIP74"
def SKIP74():
    return 45040
def line_45040():
    global _zeroflag
    global VAR_II
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_II
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP75"
    return "SKIP75"
def NSKIP75():
    global VAR_A_STRVAR
    global B_REG
    global CONST_73
    global A_REG
    B_REG=CONST_73
    A_REG=VAR_A_STRVAR
    CONCAT()
    VAR_A_STRVAR=A_REG
    return "SKIP75"
def SKIP75():
    return 45050
def line_45050():
    global VAR_A_STRVAR
    global B_REG
    global A_REG
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    A_REG=VAR_A_STRVAR
    CONCAT()
    VAR_A_STRVAR=A_REG
    return 45060
def line_45060():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    GOSUB("GOSUBCONT56")
    return 59100
def GOSUBCONT56():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return "RETURN"
def line_45100():
    return 45110
def line_45110():
    global D_REG
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global C_REG
    global B_REG
    global VAR_DN_int
    global X_REG
    global VAR_SX_STRVAR
    global CONST_6
    Y_REG=CONST_6
    _stack.append(Y_REG)
    Y_REG=VAR_DN_int
    _stack.append(Y_REG)
    Y_REG=CONST_6
    _stack.append(Y_REG)
    B_REG=VAR_SX_STRVAR
    G_REG=B_REG
    D_REG=_stack.pop()
    C_REG=_stack.pop()
    X_REG=_stack.pop()
    Y_REG=CONST_55
    OPEN()
    return "RETURN"
def line_45200():
    return 45210
def line_45210():
    global _zeroflag
    global VAR_A_STRVAR
    global B_REG
    global CONST_74
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_74
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP76"
    return "SKIP76"
def NSKIP76():
    global VAR_A_STRVAR
    global B_REG
    global CONST_75
    B_REG=CONST_75
    VAR_A_STRVAR=B_REG
    return "SKIP76"
def SKIP76():
    return 45220
def line_45220():
    return "RETURN"
def line_48000():
    return 48010
def line_48010():
    global CONST_76
    global A_REG
    A_REG=CONST_76
    STROUT()
    return 48015
def line_48015():
    global B_REG
    global CONST_77
    global VAR_SX_STRVAR
    B_REG=CONST_77
    VAR_SX_STRVAR=B_REG
    GOSUB("GOSUBCONT57")
    return 45100
def GOSUBCONT57():
    global VAR_GC_int
    global Y_REG
    global CONST_1
    Y_REG=CONST_1
    VAR_GC_int=Y_REG
    VAR_GC_int=int(VAR_GC_int)
    return 48020
def line_48020():
    global VAR_I
    global CONST_16
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_16
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP24","VAR_I")
    return "FORLOOP24"
def FORLOOP24():
    return 48030
def line_48030():
    GOSUB("GOSUBCONT58")
    return 61700
def GOSUBCONT58():
    GOSUB("GOSUBCONT59")
    return 45200
def GOSUBCONT59():
    return 48040
def line_48040():
    global VAR_I
    global _zeroflag
    global VAR_GC_int
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global CONST_64
    global B_REG
    global X_REG
    global VAR_OG_int_array
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_64
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_GC_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    B_REG=VAR_A_STRVAR
    VAL()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_OG_int_array
    ARRAYSTORE_INTEGER()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 48050
def line_48050():
    global VAR_I
    global _stack
    global Y_REG
    global CONST_63
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_63
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP25","VAR_I")
    return "FORLOOP25"
def FORLOOP25():
    global VAR_I
    global _zeroflag
    global CONST_11
    global VAR_II
    global VAR_GC_int
    global G_REG
    global _stack
    global Y_REG
    global VAR_OG_STRVAR_array
    global CONST_64
    global X_REG
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=CONST_64
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_GC_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=CONST_11
    X_REG=_stack.pop()
    G_REG=VAR_OG_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    VAR_II=Y_REG
    return 48060
def line_48060():
    GOSUB("GOSUBCONT60")
    return 61700
def GOSUBCONT60():
    global VAR_A_STRVAR
    global Y_REG
    global VAR_TX_STRVAR
    global B_REG
    global CONST_78
    B_REG=VAR_A_STRVAR
    VAR_TX_STRVAR=B_REG
    Y_REG=CONST_78
    CHR()
    STROUT()
    return 48070
def line_48070():
    global _zeroflag
    global CONST_56
    global VAR_TX_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_56
    A_REG=VAR_TX_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP77"
    return "SKIP77"
def NSKIP77():
    return 48090
    return "SKIP77"
def SKIP77():
    return 48080
def line_48080():
    GOSUB("GOSUBCONT61")
    return 61000
def GOSUBCONT61():
    global VAR_II
    global VAR_GC_int
    global G_REG
    global _stack
    global Y_REG
    global VAR_OG_STRVAR_array
    global VAR_TX_STRVAR
    global CONST_64
    global X_REG
    global A_REG
    global CONST_2
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=CONST_64
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_GC_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=VAR_TX_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_OG_STRVAR_array
    ARRAYSTORE_STRING()
    Y_REG=CONST_2
    X_REG=VAR_II
    X_REG=X_REG+Y_REG
    VAR_II=X_REG
    return 48060
def line_48090():
    global _zeroflag
    global VAR_GC_int
    global Y_REG
    global CONST_79
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_GC_int
    X_REG=X_REG+Y_REG
    VAR_GC_int=X_REG
    VAR_GC_int=int(VAR_GC_int)
    Y_REG=CONST_79
    READSTATUS()
    X_REG=tmpy
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP78"
    return "SKIP78"
def NSKIP78():
    return 48020
    return "SKIP78"
def SKIP78():
    return 48100
def line_48100():
    global CONST_80
    global A_REG
    A_REG=CONST_80
    STROUT()
    LINEBREAK()
    return 48105
def line_48105():
    global _zeroflag
    global VAR_GC_int
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_MO_int
    Y_REG=VAR_MO_int
    X_REG=VAR_GC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP79"
    return "SKIP79"
def NSKIP79():
    return 42420
    return "SKIP79"
def SKIP79():
    return 48110
def line_48110():
    global X_REG
    global CONST_6
    X_REG=CONST_6
    CLOSE()
    return "RETURN"
def line_49000():
    return 49005
def line_49005():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global CONST_81
    global CONST_82
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    GETSTR()
    VAR_A_STRVAR=A_REG
    B_REG=CONST_81
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_82
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP80"
    return "SKIP80"
def NSKIP80():
    return 49100
    return "SKIP80"
def SKIP80():
    return 49010
def line_49010():
    return 49000
def line_49100():
    return 49110
def line_49110():
    END()
    return
def line_49900():
    return 49910
def line_49910():
    global VAR_I
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP26","VAR_I")
    return "FORLOOP26"
def FORLOOP26():
    global VAR_I
    global _zeroflag
    global CONST_11
    global G_REG
    global _stack
    global Y_REG
    global VAR_SF_int
    global X_REG
    global CONST_7
    global CONST_1
    global A_REG
    global VAR_CP_STRVAR_array
    global VAR_CV_int_array
    Y_REG=VAR_I
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_7
    G_REG=VAR_CV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=VAR_I
    _stack.append(Y_REG)
    A_REG=CONST_11
    X_REG=_stack.pop()
    G_REG=VAR_CP_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    VAR_SF_int=Y_REG
    VAR_SF_int=int(VAR_SF_int)
    return "RETURN"
def line_50000():
    return 50002
def line_50002():
    global _zeroflag
    global VAR_RD_int
    global Y_REG
    global X_REG
    global VAR_LR_int
    global CONST_1
    Y_REG=VAR_LR_int
    X_REG=VAR_RD_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP81"
    return "SKIP81"
def NSKIP81():
    return 49000
    return "SKIP81"
def SKIP81():
    return 50005
def line_50005():
    GOSUB("GOSUBCONT62")
    return 49900
def GOSUBCONT62():
    return 50010
def line_50010():
    global CONST_11
    global VAR_CB_STRVAR
    global _memory
    global CONST_63
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    global CONST_2
    _memory[646]=int(CONST_63) & 255;
    A_REG=VAR_CB_STRVAR
    STROUT()
    B_REG=CONST_11
    VAR_CC_STRVAR=B_REG
    _memory[646]=int(CONST_2) & 255;
    return 50012
def line_50012():
    global VAR_LC_STRVAR
    global _zeroflag
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_LC_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP82"
    return "SKIP82"
def NSKIP82():
    global VAR_LC_STRVAR
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=VAR_LC_STRVAR
    VAR_CC_STRVAR=B_REG
    A_REG=VAR_LC_STRVAR
    STROUT()
    LINEBREAK()
    return 50020
    return "SKIP82"
def SKIP82():
    return 50015
def line_50015():
    GOSUB("GOSUBCONT63")
    return 63000
def GOSUBCONT63():
    global _memory
    global CONST_2
    _memory[19]=int(CONST_2) & 255;
    return "INPUT0"
def INPUT0():
    global _zeroflag
    global CONST_11
    global VAR_CC_STRVAR
    global A_REG
    CLEARQUEUE()
    A_REG=CONST_11
    STROUT()
    QMARKOUT1()
    INPUTSTR()
    INPUTLENGTHCHECK()
    if _zeroflag==0:
        return "EMPTYINPUTSKIP1"
    VAR_CC_STRVAR=A_REG
    return "EMPTYINPUTSKIP1"
def EMPTYINPUTSKIP1():
    global _zeroflag
    global X_REG
    global CONST_1
    QUEUESIZE()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "INPUTCHECK0"
    EXTRAIGNORED()
    return "INPUTCHECK0"
def INPUTCHECK0():
    global _memory
    global CONST_1
    _memory[19]=int(CONST_1) & 255;
    LINEBREAK()
    return 50020
def line_50020():
    global VAR_LC_STRVAR
    global _zeroflag
    global CONST_11
    global Y_REG
    global _memory
    global VAR_CT_STRVAR
    global B_REG
    global X_REG
    global VAR_CC_STRVAR
    global CONST_4
    global CONST_1
    _memory[646]=int(CONST_4) & 255;
    B_REG=CONST_11
    VAR_CT_STRVAR=B_REG
    B_REG=CONST_11
    VAR_LC_STRVAR=B_REG
    B_REG=VAR_CC_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP83"
    return "SKIP83"
def NSKIP83():
    global CONST_83
    global B_REG
    global VAR_CC_STRVAR
    B_REG=CONST_83
    VAR_CC_STRVAR=B_REG
    return "SKIP83"
def SKIP83():
    return 50030
def line_50030():
    global VAR_ER
    global Y_REG
    global VAR_TX_STRVAR
    global B_REG
    global VAR_CC_STRVAR
    global CONST_1
    Y_REG=CONST_1
    VAR_ER=Y_REG
    B_REG=VAR_CC_STRVAR
    VAR_TX_STRVAR=B_REG
    GOSUB("GOSUBCONT64")
    return 63100
def GOSUBCONT64():
    global VAR_TX_STRVAR
    global CONST_84
    global B_REG
    global VAR_CC_STRVAR
    global A_REG
    B_REG=CONST_84
    A_REG=VAR_TX_STRVAR
    CONCAT()
    VAR_CC_STRVAR=A_REG
    return 50035
def line_50035():
    GOSUB("GOSUBCONT65")
    return 41000
def GOSUBCONT65():
    return 50040
def line_50040():
    global Y_REG
    global VAR_CC_int
    global VAR_I_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_CC_int=Y_REG
    VAR_CC_int=int(VAR_CC_int)
    Y_REG=CONST_2
    VAR_I_int=Y_REG
    VAR_I_int=int(VAR_I_int)
    return 50042
def line_50042():
    global D_REG
    global C_REG
    global VAR_C_int
    global VAR_C_STRVAR
    global B_REG
    global X_REG
    global VAR_I_int
    global VAR_CC_STRVAR
    global A_REG
    global CONST_2
    C_REG=VAR_I_int
    D_REG=CONST_2
    B_REG=VAR_CC_STRVAR
    MID()
    VAR_C_STRVAR=A_REG
    B_REG=VAR_C_STRVAR
    ASC()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return 50045
def line_50045():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global CONST_85
    global X_REG
    global CONST_1
    Y_REG=CONST_85
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP84"
    return "SKIP84"
def NSKIP84():
    global Y_REG
    global VAR_C_int
    global CONST_86
    Y_REG=CONST_86
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    return "SKIP84"
def SKIP84():
    return 50050
def line_50050():
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_C_int
    global CONST_87
    global CONST_88
    global X_REG
    global CONST_1
    Y_REG=CONST_87
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_88
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP85"
    return "SKIP85"
def NSKIP85():
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_C_int
    global CONST_89
    global CONST_90
    global X_REG
    global CONST_1
    Y_REG=CONST_89
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_90
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP86"
    return "SKIP86"
def NSKIP86():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global CONST_86
    global X_REG
    global CONST_1
    Y_REG=CONST_86
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP87"
    return "SKIP87"
def NSKIP87():
    return 50100
    return "SKIP87"
def SKIP87():
    return "SKIP86"
def SKIP86():
    return "SKIP85"
def SKIP85():
    return 50060
def line_50060():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global CONST_86
    global X_REG
    global CONST_1
    Y_REG=CONST_86
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP88"
    return "SKIP88"
def NSKIP88():
    global VAR_C_STRVAR
    global VAR_CT_STRVAR
    global B_REG
    global A_REG
    B_REG=VAR_C_STRVAR
    A_REG=VAR_CT_STRVAR
    CONCAT()
    VAR_CT_STRVAR=A_REG
    return 50080
    return "SKIP88"
def SKIP88():
    return 50070
def line_50070():
    global _zeroflag
    global Y_REG
    global VAR_CT_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_CT_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP89"
    return "SKIP89"
def NSKIP89():
    GOSUB("GOSUBCONT66")
    return 50500
def GOSUBCONT66():
    return "SKIP89"
def SKIP89():
    return 50080
def line_50080():
    global _zeroflag
    global CONST_52
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_52
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP90"
    return "SKIP90"
def NSKIP90():
    return 50110
    return "SKIP90"
def SKIP90():
    return 50100
def line_50100():
    global _zeroflag
    global Y_REG
    global B_REG
    global X_REG
    global VAR_I_int
    global VAR_CC_STRVAR
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_I_int
    X_REG=X_REG+Y_REG
    VAR_I_int=X_REG
    VAR_I_int=int(VAR_I_int)
    B_REG=VAR_CC_STRVAR
    LEN()
    Y_REG=X_REG
    X_REG=VAR_I_int
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP91"
    return "SKIP91"
def NSKIP91():
    return 50042
    return "SKIP91"
def SKIP91():
    return 50110
def line_50110():
    global VAR_I
    global VAR_PP_int
    global _stack
    global Y_REG
    global VAR_CO_int
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=VAR_CC_int
    VAR_PP_int=Y_REG
    VAR_PP_int=int(VAR_PP_int)
    Y_REG=VAR_CC_int
    VAR_CO_int=Y_REG
    VAR_CO_int=int(VAR_CO_int)
    Y_REG=CONST_1
    VAR_CC_int=Y_REG
    VAR_CC_int=int(VAR_CC_int)
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_PP_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP27","VAR_I")
    return "FORLOOP27"
def FORLOOP27():
    return 50120
def line_50120():
    global VAR_I
    global _zeroflag
    global G_REG
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_4
    global CONST_1
    global A_REG
    global VAR_CP_STRVAR_array
    X_REG=VAR_I
    G_REG=VAR_CP_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    Y_REG=CONST_7
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_4
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP92"
    return "SKIP92"
def NSKIP92():
    return 50155
    return "SKIP92"
def SKIP92():
    return 50130
def line_50130():
    global VAR_P
    global _stack
    global Y_REG
    global VAR_TB_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_P=Y_REG
    Y_REG=VAR_TB_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP28","VAR_P")
    return "FORLOOP28"
def FORLOOP28():
    global VAR_II
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    global VAR_MS_int
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=VAR_MS_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP29","VAR_II")
    return "FORLOOP29"
def FORLOOP29():
    global VAR_P
    global VAR_II
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global VAR_CM_STRVAR_array
    global X_REG
    global A_REG
    global VAR_B_STRVAR
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_P
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_CM_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_B_STRVAR=A_REG
    return 50135
def line_50135():
    global _zeroflag
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP93"
    return "SKIP93"
def NSKIP93():
    global VAR_II
    global CONST_53
    global Y_REG
    Y_REG=CONST_53
    VAR_II=Y_REG
    return 50150
    return "SKIP93"
def SKIP93():
    return 50140
def line_50140():
    global _zeroflag
    global VAR_A_STRVAR
    global C_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    global VAR_B_STRVAR
    B_REG=VAR_A_STRVAR
    LEN()
    C_REG=X_REG
    B_REG=VAR_B_STRVAR
    LEFT()
    B_REG=A_REG
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP94"
    return "SKIP94"
def NSKIP94():
    global VAR_P
    global VAR_II
    global CONST_53
    global Y_REG
    global VAR_T_int
    Y_REG=VAR_P
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=CONST_53
    VAR_II=Y_REG
    Y_REG=CONST_53
    VAR_P=Y_REG
    return "SKIP94"
def SKIP94():
    return 50150
def line_50150():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    NEXT("VAR_P")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 50155
def line_50155():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP95"
    return "SKIP95"
def NSKIP95():
    global _zeroflag
    global G_REG
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    global VAR_CV_int_array
    X_REG=CONST_1
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP96"
    return "SKIP96"
def NSKIP96():
    global VAR_ER
    global Y_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_ER=Y_REG
    return "RETURN"
    return "SKIP96"
def SKIP96():
    return "SKIP95"
def SKIP95():
    return 50160
def line_50160():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP97"
    return "SKIP97"
def NSKIP97():
    global G_REG
    global _stack
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    global VAR_CV_int_array
    Y_REG=CONST_1
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_T_int
    G_REG=VAR_CV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_7
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    return 50230
    return "SKIP97"
def SKIP97():
    return 50170
def line_50170():
    GOSUB("GOSUBCONT67")
    return 50400
def GOSUBCONT67():
    return 50185
def line_50185():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP98"
    return "SKIP98"
def NSKIP98():
    global VAR_A_STRVAR
    global B_REG
    global VAR_AA_STRVAR
    B_REG=VAR_A_STRVAR
    VAR_AA_STRVAR=B_REG
    GOSUB("GOSUBCONT68")
    return 50300
def GOSUBCONT68():
    GOSUB("GOSUBCONT69")
    return 50400
def GOSUBCONT69():
    return "SKIP98"
def SKIP98():
    return 50186
def line_50186():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP99"
    return "SKIP99"
def NSKIP99():
    GOSUB("GOSUBCONT70")
    return 50350
def GOSUBCONT70():
    GOSUB("GOSUBCONT71")
    return 50400
def GOSUBCONT71():
    return "SKIP99"
def SKIP99():
    return 50188
def line_50188():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP100"
    return "SKIP100"
def NSKIP100():
    global VAR_A_STRVAR
    global B_REG
    global VAR_AA_STRVAR
    B_REG=VAR_AA_STRVAR
    VAR_A_STRVAR=B_REG
    GOSUB("GOSUBCONT72")
    return 51000
def GOSUBCONT72():
    return "SKIP100"
def SKIP100():
    return 50190
def line_50190():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP101"
    return "SKIP101"
def NSKIP101():
    return 50230
    return "SKIP101"
def SKIP101():
    return 50200
def line_50200():
    global _zeroflag
    global G_REG
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    global CONST_2
    global VAR_CV_int_array
    X_REG=CONST_2
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP102"
    return "SKIP102"
def NSKIP102():
    global G_REG
    global _stack
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_2
    global VAR_CV_int_array
    Y_REG=CONST_2
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_T_int
    G_REG=VAR_CV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_7
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    return "SKIP102"
def SKIP102():
    return 50210
def line_50210():
    global _zeroflag
    global G_REG
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_6
    global CONST_1
    global VAR_CV_int_array
    X_REG=CONST_6
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP103"
    return "SKIP103"
def NSKIP103():
    global G_REG
    global _stack
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_6
    global VAR_CV_int_array
    Y_REG=CONST_6
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_T_int
    G_REG=VAR_CV_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_7
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    return "SKIP103"
def SKIP103():
    return 50220
def line_50220():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP104"
    return "SKIP104"
def NSKIP104():
    global VAR_ER
    global Y_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_ER=Y_REG
    return "RETURN"
    return "SKIP104"
def SKIP104():
    return 50230
def line_50230():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 50240
def line_50240():
    global VAR_I
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP30","VAR_I")
    return "FORLOOP30"
def FORLOOP30():
    global VAR_I
    global _zeroflag
    global G_REG
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    global VAR_CV_int_array
    X_REG=VAR_I
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_7
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP105"
    return "SKIP105"
def NSKIP105():
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG=X_REG+Y_REG
    VAR_CC_int=X_REG
    VAR_CC_int=int(VAR_CC_int)
    return 50260
    return "SKIP105"
def SKIP105():
    return 50250
def line_50250():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP106"
    return "SKIP106"
def NSKIP106():
    global VAR_ER
    global Y_REG
    global CONST_6
    Y_REG=CONST_6
    VAR_ER=Y_REG
    return "RETURN"
    return "SKIP106"
def SKIP106():
    return 50260
def line_50260():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 50270
def line_50270():
    global VAR_I
    global _zeroflag
    global CONST_11
    global G_REG
    global Y_REG
    global VAR_LO_STRVAR
    global B_REG
    global X_REG
    global CONST_7
    global CONST_1
    global CONST_2
    global VAR_CV_int_array
    B_REG=CONST_11
    VAR_LO_STRVAR=B_REG
    X_REG=CONST_2
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_I=X_REG
    Y_REG=CONST_7
    X_REG=VAR_I
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP107"
    return "SKIP107"
def NSKIP107():
    global VAR_I
    global VAR_IT_STRVAR_array
    global G_REG
    global VAR_TX_STRVAR
    global X_REG
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_TX_STRVAR=A_REG
    GOSUB("GOSUBCONT73")
    return 63100
def GOSUBCONT73():
    global VAR_TX_STRVAR
    global VAR_LO_STRVAR
    global B_REG
    B_REG=VAR_TX_STRVAR
    VAR_LO_STRVAR=B_REG
    return "SKIP107"
def SKIP107():
    return 50280
def line_50280():
    return "RETURN"
def line_50300():
    return 50310
def line_50310():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global C_REG
    global CONST_37
    global B_REG
    global X_REG
    global CONST_1
    global CONST_2
    B_REG=CONST_37
    _stack.append(B_REG)
    C_REG=CONST_2
    B_REG=VAR_A_STRVAR
    RIGHT()
    B_REG=_stack.pop()
    SNEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP108"
    return "SKIP108"
def NSKIP108():
    return "RETURN"
    return "SKIP108"
def SKIP108():
    return 50320
def line_50320():
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global A_REG
    global CONST_2
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_2
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_A_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    return "RETURN"
def line_50350():
    return 50355
def line_50355():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_6
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_6
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP109"
    return "SKIP109"
def NSKIP109():
    return "RETURN"
    return "SKIP109"
def SKIP109():
    return 50360
def line_50360():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global C_REG
    global CONST_91
    global B_REG
    global X_REG
    global CONST_1
    global CONST_2
    B_REG=CONST_91
    _stack.append(B_REG)
    C_REG=CONST_2
    B_REG=VAR_A_STRVAR
    RIGHT()
    B_REG=_stack.pop()
    SNEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP110"
    return "SKIP110"
def NSKIP110():
    return "RETURN"
    return "SKIP110"
def SKIP110():
    return 50370
def line_50370():
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global A_REG
    global CONST_2
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_2
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_A_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    return "RETURN"
def line_50400():
    return 50410
def line_50410():
    global Y_REG
    global VAR_P_int
    global CONST_1
    Y_REG=CONST_1
    VAR_P_int=Y_REG
    VAR_P_int=int(VAR_P_int)
    return 50415
def line_50415():
    global _zeroflag
    global VAR_IL_STRVAR_array
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global VAR_P_int
    global CONST_1
    B_REG=VAR_A_STRVAR
    _stack.append(B_REG)
    X_REG=VAR_P_int
    G_REG=VAR_IL_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP111"
    return "SKIP111"
def NSKIP111():
    global Y_REG
    global VAR_T_int
    global VAR_P_int
    Y_REG=VAR_P_int
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    return "RETURN"
    return "SKIP111"
def SKIP111():
    return 50420
def line_50420():
    global _zeroflag
    global VAR_TI_int
    global Y_REG
    global X_REG
    global VAR_P_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_P_int
    X_REG=X_REG+Y_REG
    VAR_P_int=X_REG
    VAR_P_int=int(VAR_P_int)
    Y_REG=VAR_TI_int
    X_REG=VAR_P_int
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP112"
    return "SKIP112"
def NSKIP112():
    return 50415
    return "SKIP112"
def SKIP112():
    return 50430
def line_50430():
    return "RETURN"
def line_50500():
    return 50505
def line_50505():
    GOSUB("GOSUBCONT74")
    return 50600
def GOSUBCONT74():
    return 50510
def line_50510():
    global _zeroflag
    global _stack
    global Y_REG
    global CONST_92
    global VAR_CT_STRVAR
    global VAR_CC_int
    global B_REG
    global X_REG
    global A_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _stack.append(X_REG)
    B_REG=CONST_92
    A_REG=VAR_CT_STRVAR
    SNEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP113"
    return "SKIP113"
def NSKIP113():
    global CONST_11
    global G_REG
    global _stack
    global Y_REG
    global VAR_CT_STRVAR
    global VAR_CC_int
    global B_REG
    global X_REG
    global A_REG
    global CONST_2
    global VAR_CP_STRVAR_array
    Y_REG=VAR_CC_int
    _stack.append(Y_REG)
    A_REG=VAR_CT_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_CP_STRVAR_array
    ARRAYSTORE_STRING()
    B_REG=CONST_11
    VAR_CT_STRVAR=B_REG
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG=X_REG+Y_REG
    VAR_CC_int=X_REG
    VAR_CC_int=int(VAR_CC_int)
    return "RETURN"
    return "SKIP113"
def SKIP113():
    return 50520
def line_50520():
    global VAR_LC_STRVAR
    global CONST_53
    global _stack
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global VAR_I_int
    global VAR_CC_STRVAR
    global A_REG
    Y_REG=VAR_I_int
    _stack.append(Y_REG)
    B_REG=VAR_CC_STRVAR
    LEN()
    Y_REG=_stack.pop()
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_CC_STRVAR
    RIGHT()
    VAR_LC_STRVAR=A_REG
    Y_REG=CONST_53
    VAR_I_int=Y_REG
    VAR_I_int=int(VAR_I_int)
    return "RETURN"
def line_50600():
    return 50610
def line_50610():
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_LO_STRVAR
    global VAR_CT_STRVAR
    global B_REG
    global X_REG
    global CONST_4
    global CONST_1
    B_REG=VAR_CT_STRVAR
    LEN()
    Y_REG=CONST_4
    X_REG= (-1 if X_REG>Y_REG else 0)
    _stack.append(X_REG)
    B_REG=VAR_LO_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP114"
    return "SKIP114"
def NSKIP114():
    return "RETURN"
    return "SKIP114"
def SKIP114():
    return 50620
def line_50620():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global CONST_94
    global CONST_95
    global CONST_93
    global VAR_CT_STRVAR
    global B_REG
    global X_REG
    global CONST_6
    global CONST_1
    global A_REG
    C_REG=CONST_6
    B_REG=VAR_CT_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    B_REG=CONST_93
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_94
    A_REG=VAR_A_STRVAR
    SEQ()
    _stack.append(X_REG)
    B_REG=CONST_95
    A_REG=VAR_A_STRVAR
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP115"
    return "SKIP115"
def NSKIP115():
    global VAR_LO_STRVAR
    global VAR_CT_STRVAR
    global B_REG
    B_REG=VAR_LO_STRVAR
    VAR_CT_STRVAR=B_REG
    return "SKIP115"
def SKIP115():
    return 50630
def line_50630():
    return "RETURN"
def line_51000():
    return 51110
def line_51110():
    global Y_REG
    global VAR_P_int
    global CONST_1
    Y_REG=CONST_1
    VAR_P_int=Y_REG
    VAR_P_int=int(VAR_P_int)
    return 51130
def line_51130():
    global VAR_IL_STRVAR_array
    global G_REG
    global X_REG
    global VAR_P_int
    global A_REG
    global VAR_B_STRVAR
    X_REG=VAR_P_int
    G_REG=VAR_IL_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_B_STRVAR=A_REG
    GOSUB("GOSUBCONT75")
    return 51920
def GOSUBCONT75():
    return 51140
def line_51140():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_7
    global CONST_1
    Y_REG=CONST_7
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP116"
    return "SKIP116"
def NSKIP116():
    return "RETURN"
    return "SKIP116"
def SKIP116():
    return 51150
def line_51150():
    global _zeroflag
    global VAR_TI_int
    global Y_REG
    global X_REG
    global VAR_P_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_P_int
    X_REG=X_REG+Y_REG
    VAR_P_int=X_REG
    VAR_P_int=int(VAR_P_int)
    Y_REG=VAR_TI_int
    X_REG=VAR_P_int
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP117"
    return "SKIP117"
def NSKIP117():
    return 51130
    return "SKIP117"
def SKIP117():
    return 51160
def line_51160():
    return "RETURN"
def line_51920():
    return 51925
def line_51925():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global VAR_B_STRVAR
    B_REG=VAR_A_STRVAR
    LEN()
    _stack.append(X_REG)
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=_stack.pop()
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP118"
    return "SKIP118"
def NSKIP118():
    return "RETURN"
    return "SKIP118"
def SKIP118():
    return 51930
def line_51930():
    global VAR_PP_int
    global VAR_DC_int
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_DC_int=Y_REG
    VAR_DC_int=int(VAR_DC_int)
    Y_REG=CONST_2
    VAR_PP_int=Y_REG
    VAR_PP_int=int(VAR_PP_int)
    return 51935
def line_51935():
    global _zeroflag
    global VAR_PP_int
    global D_REG
    global _stack
    global VAR_A_STRVAR
    global C_REG
    global B_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_B_STRVAR
    C_REG=VAR_PP_int
    D_REG=CONST_2
    B_REG=VAR_A_STRVAR
    MID()
    _stack.append(A_REG)
    C_REG=VAR_PP_int
    B_REG=VAR_B_STRVAR
    CHARAT()
    B_REG=_stack.pop()
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP119"
    return "SKIP119"
def NSKIP119():
    return 51970
    return "SKIP119"
def SKIP119():
    return 51940
def line_51940():
    global VAR_DC_int
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_DC_int
    X_REG=X_REG+Y_REG
    VAR_DC_int=X_REG
    VAR_DC_int=int(VAR_DC_int)
    return 51945
def line_51945():
    global _zeroflag
    global VAR_DC_int
    global _stack
    global Y_REG
    global B_REG
    global X_REG
    global CONST_6
    global CONST_4
    global CONST_1
    global CONST_2
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=CONST_4
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_2
    X_REG=VAR_DC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) & int(Y_REG)
    _stack.append(X_REG)
    Y_REG=CONST_6
    X_REG=VAR_DC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP120"
    return "SKIP120"
def NSKIP120():
    return "RETURN"
    return "SKIP120"
def SKIP120():
    return 51970
def line_51970():
    global _zeroflag
    global VAR_PP_int
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_B_STRVAR
    Y_REG=CONST_2
    X_REG=VAR_PP_int
    X_REG=X_REG+Y_REG
    VAR_PP_int=X_REG
    VAR_PP_int=int(VAR_PP_int)
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=X_REG
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP121"
    return "SKIP121"
def NSKIP121():
    return 51935
    return "SKIP121"
def SKIP121():
    return 51975
def line_51975():
    global Y_REG
    global VAR_T_int
    global VAR_P_int
    Y_REG=VAR_P_int
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    return "RETURN"
def line_52000():
    return 52005
def line_52005():
    global VAR_RR_int
    global Y_REG
    global VAR_FF_int
    global VAR_SK_int
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_1
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    Y_REG=CONST_1
    VAR_SK_int=Y_REG
    VAR_SK_int=int(VAR_SK_int)
    return 52010
def line_52010():
    global _zeroflag
    global VAR_ER
    global _stack
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_1
    X_REG=VAR_ER
    X_REG= (-1 if X_REG!=Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP122"
    return "SKIP122"
def NSKIP122():
    return "RETURN"
    return "SKIP122"
def SKIP122():
    return 52012
def line_52012():
    global G_REG
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    global CONST_2
    global VAR_CV_int_array
    X_REG=CONST_1
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=CONST_2
    X_REG=VAR_T_int
    X_REG=X_REG+Y_REG
    X_REG=int(X_REG)
    return "ON0SUB0"
def ON0SUB0():
    global _zeroflag
    global X_REG
    global CONST_2
    _zeroflag=(0 if X_REG==CONST_2 else 1)
    if _zeroflag==1:
        return "AFTER0SUB0"
    return 52700
def AFTER0SUB0():
    return "ON0SUB1"
def ON0SUB1():
    global _zeroflag
    global X_REG
    global CONST_6
    _zeroflag=(0 if X_REG==CONST_6 else 1)
    if _zeroflag==1:
        return "AFTER0SUB1"
    return 52030
def AFTER0SUB1():
    return "ON0SUB2"
def ON0SUB2():
    global _zeroflag
    global X_REG
    global CONST_4
    _zeroflag=(0 if X_REG==CONST_4 else 1)
    if _zeroflag==1:
        return "AFTER0SUB2"
    return 52500
def AFTER0SUB2():
    return "ON0SUB3"
def ON0SUB3():
    global _zeroflag
    global CONST_55
    global X_REG
    _zeroflag=(0 if X_REG==CONST_55 else 1)
    if _zeroflag==1:
        return "AFTER0SUB3"
    return 52300
def AFTER0SUB3():
    return "ON0SUB4"
def ON0SUB4():
    global _zeroflag
    global CONST_63
    global X_REG
    _zeroflag=(0 if X_REG==CONST_63 else 1)
    if _zeroflag==1:
        return "AFTER0SUB4"
    return 52200
def AFTER0SUB4():
    return "ON0SUB5"
def ON0SUB5():
    global _zeroflag
    global CONST_68
    global X_REG
    _zeroflag=(0 if X_REG==CONST_68 else 1)
    if _zeroflag==1:
        return "AFTER0SUB5"
    return 52900
def AFTER0SUB5():
    return "ON0SUB6"
def ON0SUB6():
    global _zeroflag
    global CONST_69
    global X_REG
    _zeroflag=(0 if X_REG==CONST_69 else 1)
    if _zeroflag==1:
        return "AFTER0SUB6"
    return 53200
def AFTER0SUB6():
    return "GSKIPON0"
def GSKIPON0():
    return 52013
def line_52013():
    global Y_REG
    global CONST_68
    global X_REG
    global VAR_T_int
    Y_REG=CONST_68
    X_REG=VAR_T_int
    X_REG=X_REG-Y_REG
    X_REG=int(X_REG)
    return "ON1SUB0"
def ON1SUB0():
    global _zeroflag
    global X_REG
    global CONST_2
    _zeroflag=(0 if X_REG==CONST_2 else 1)
    if _zeroflag==1:
        return "AFTER1SUB0"
    return 53500
def AFTER1SUB0():
    return "ON1SUB1"
def ON1SUB1():
    global _zeroflag
    global X_REG
    global CONST_6
    _zeroflag=(0 if X_REG==CONST_6 else 1)
    if _zeroflag==1:
        return "AFTER1SUB1"
    return 53600
def AFTER1SUB1():
    return "ON1SUB2"
def ON1SUB2():
    global _zeroflag
    global X_REG
    global CONST_4
    _zeroflag=(0 if X_REG==CONST_4 else 1)
    if _zeroflag==1:
        return "AFTER1SUB2"
    return 53700
def AFTER1SUB2():
    return "ON1SUB3"
def ON1SUB3():
    global _zeroflag
    global CONST_55
    global X_REG
    _zeroflag=(0 if X_REG==CONST_55 else 1)
    if _zeroflag==1:
        return "AFTER1SUB3"
    return 53800
def AFTER1SUB3():
    return "ON1SUB4"
def ON1SUB4():
    global _zeroflag
    global CONST_63
    global X_REG
    _zeroflag=(0 if X_REG==CONST_63 else 1)
    if _zeroflag==1:
        return "AFTER1SUB4"
    return 53850
def AFTER1SUB4():
    return "ON1SUB5"
def ON1SUB5():
    global _zeroflag
    global CONST_68
    global X_REG
    _zeroflag=(0 if X_REG==CONST_68 else 1)
    if _zeroflag==1:
        return "AFTER1SUB5"
    return 53900
def AFTER1SUB5():
    return "ON1SUB6"
def ON1SUB6():
    global _zeroflag
    global CONST_69
    global X_REG
    _zeroflag=(0 if X_REG==CONST_69 else 1)
    if _zeroflag==1:
        return "AFTER1SUB6"
    return 54000
def AFTER1SUB6():
    return "ON1SUB7"
def ON1SUB7():
    global _zeroflag
    global CONST_23
    global X_REG
    _zeroflag=(0 if X_REG==CONST_23 else 1)
    if _zeroflag==1:
        return "AFTER1SUB7"
    return 53500
def AFTER1SUB7():
    return "ON1SUB8"
def ON1SUB8():
    global _zeroflag
    global CONST_52
    global X_REG
    _zeroflag=(0 if X_REG==CONST_52 else 1)
    if _zeroflag==1:
        return "AFTER1SUB8"
    return 53500
def AFTER1SUB8():
    return "ON1SUB9"
def ON1SUB9():
    global _zeroflag
    global CONST_16
    global X_REG
    _zeroflag=(0 if X_REG==CONST_16 else 1)
    if _zeroflag==1:
        return "AFTER1SUB9"
    return 45000
def AFTER1SUB9():
    return "GSKIPON1"
def GSKIPON1():
    return 52014
def line_52014():
    global VAR_ER
    global Y_REG
    global CONST_6
    Y_REG=CONST_6
    VAR_ER=Y_REG
    return "RETURN"
def line_52022():
    return 52025
def line_52025():
    return 52030
def line_52030():
    return 52040
def line_52040():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CO_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP123"
    return "SKIP123"
def NSKIP123():
    GOSUB("GOSUBCONT76")
    return 59000
def GOSUBCONT76():
    return "RETURN"
    return "SKIP123"
def SKIP123():
    return 52050
def line_52050():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP124"
    return "SKIP124"
def NSKIP124():
    return 52065
    return "SKIP124"
def SKIP124():
    return 52060
def line_52060():
    return 59150
def line_52065():
    global _zeroflag
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_TC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP125"
    return "SKIP125"
def NSKIP125():
    return 52085
    return "SKIP125"
def SKIP125():
    return 52066
def line_52066():
    GOSUB("GOSUBCONT77")
    return 52150
def GOSUBCONT77():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP126"
    return "SKIP126"
def NSKIP126():
    return "RETURN"
    return "SKIP126"
def SKIP126():
    return 52070
def line_52070():
    global VAR_I
    global G_REG
    global _stack
    global VAR_TC_int
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    global CONST_2
    global VAR_CV_int_array
    X_REG=CONST_2
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP31","VAR_I")
    return "FORLOOP31"
def FORLOOP31():
    global VAR_I
    global _zeroflag
    global VAR_PP_int
    global G_REG
    global Y_REG
    global VAR_IP_int_array
    global X_REG
    global VAR_T_int
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_IP_int_array
    ARRAYACCESS_INTEGER()
    VAR_PP_int=X_REG
    VAR_PP_int=int(VAR_PP_int)
    Y_REG=VAR_T_int
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP127"
    return "SKIP127"
def NSKIP127():
    GOSUB("GOSUBCONT78")
    return 40500
def GOSUBCONT78():
    return "RETURN"
    return "SKIP127"
def SKIP127():
    return 52080
def line_52080():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 52085
def line_52085():
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP128"
    return "SKIP128"
def NSKIP128():
    return 52110
    return "SKIP128"
def SKIP128():
    return 52090
def line_52090():
    global VAR_I
    global G_REG
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global VAR_T_int
    global CONST_1
    global CONST_2
    global VAR_CV_int_array
    X_REG=CONST_2
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP32","VAR_I")
    return "FORLOOP32"
def FORLOOP32():
    return 52095
def line_52095():
    global VAR_I
    global _zeroflag
    global VAR_PP_int
    global G_REG
    global Y_REG
    global VAR_IV_int_array
    global X_REG
    global VAR_T_int
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    VAR_PP_int=X_REG
    VAR_PP_int=int(VAR_PP_int)
    Y_REG=VAR_T_int
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP129"
    return "SKIP129"
def NSKIP129():
    global VAR_I
    global _zeroflag
    global VAR_UV_int_array
    global G_REG
    global Y_REG
    global X_REG
    global CONST_1
    X_REG=VAR_I
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP130"
    return "SKIP130"
def NSKIP130():
    GOSUB("GOSUBCONT79")
    return 40500
def GOSUBCONT79():
    return "RETURN"
    return "SKIP130"
def SKIP130():
    return "SKIP129"
def SKIP129():
    return 52100
def line_52100():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 52110
def line_52110():
    global VAR_IT_STRVAR_array
    global G_REG
    global _stack
    global Y_REG
    global CONST_96
    global VAR_SK_int
    global B_REG
    global X_REG
    global VAR_T_int
    global CONST_2
    B_REG=CONST_96
    _stack.append(B_REG)
    X_REG=VAR_T_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    CONCAT()
    STROUT()
    LINEBREAK()
    Y_REG=CONST_2
    VAR_SK_int=Y_REG
    VAR_SK_int=int(VAR_SK_int)
    return "RETURN"
def line_52150():
    return 52155
def line_52155():
    global _zeroflag
    global Y_REG
    global VAR_OC_int
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_1
    X_REG=VAR_OC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP131"
    return "SKIP131"
def NSKIP131():
    return "RETURN"
    return "SKIP131"
def SKIP131():
    return 52160
def line_52160():
    global VAR_J
    global G_REG
    global _stack
    global Y_REG
    global VAR_CO_int
    global VAR_OC_int
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_CV_int_array
    X_REG=CONST_1
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_CO_int=X_REG
    VAR_CO_int=int(VAR_CO_int)
    Y_REG=CONST_1
    VAR_J=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_OC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP33","VAR_J")
    return "FORLOOP33"
def FORLOOP33():
    global VAR_J
    global VAR_OP_int_array
    global G_REG
    global Y_REG
    global X_REG
    global VAR_T_int
    Y_REG=VAR_J
    X_REG=int(Y_REG)
    G_REG=VAR_OP_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    return 52165
def line_52165():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=VAR_CO_int
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP132"
    return "SKIP132"
def NSKIP132():
    global VAR_J
    global VAR_T2_int
    global Y_REG
    Y_REG=VAR_J
    VAR_T2_int=Y_REG
    VAR_T2_int=int(VAR_T2_int)
    GOSUB("GOSUBCONT80")
    return 42200
def GOSUBCONT80():
    return "SKIP132"
def SKIP132():
    return 52170
def line_52170():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP133"
    return "SKIP133"
def NSKIP133():
    return "RETURN"
    return "SKIP133"
def SKIP133():
    return 52175
def line_52175():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return "RETURN"
def line_52200():
    return 52202
def line_52202():
    return 52204
def line_52204():
    return 52220
def line_52220():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CO_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP134"
    return "SKIP134"
def NSKIP134():
    return 52280
    return "SKIP134"
def SKIP134():
    return 52230
def line_52230():
    global CONST_97
    global A_REG
    LINEBREAK()
    A_REG=CONST_97
    STROUT()
    return 52240
def line_52240():
    global _zeroflag
    global CONST_11
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    GETSTR()
    VAR_A_STRVAR=A_REG
    B_REG=CONST_11
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP135"
    return "SKIP135"
def NSKIP135():
    return 52240
    return "SKIP135"
def SKIP135():
    return 52250
def line_52250():
    global _zeroflag
    global VAR_A_STRVAR
    global CONST_98
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_98
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP136"
    return "SKIP136"
def NSKIP136():
    global CONST_99
    global A_REG
    LINEBREAK()
    A_REG=CONST_99
    STROUT()
    LINEBREAK()
    return 49100
    return "SKIP136"
def SKIP136():
    return 52260
def line_52260():
    global _zeroflag
    global VAR_A_STRVAR
    global CONST_37
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_37
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP137"
    return "SKIP137"
def NSKIP137():
    return "RETURN"
    return "SKIP137"
def SKIP137():
    return 52270
def line_52270():
    return 52230
def line_52280():
    return 59150
def line_52300():
    return 52302
def line_52302():
    return 52304
def line_52304():
    return 52320
def line_52320():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CO_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP138"
    return "SKIP138"
def NSKIP138():
    return 59150
    return "SKIP138"
def SKIP138():
    return 52330
def line_52330():
    GOSUB("GOSUBCONT81")
    return 40700
def GOSUBCONT81():
    return "RETURN"
def line_52500():
    return 52502
def line_52502():
    return 52504
def line_52504():
    return 52510
def line_52510():
    global Y_REG
    global VAR_FF_int
    global CONST_1
    Y_REG=CONST_1
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    return 52520
def line_52520():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP139"
    return "SKIP139"
def NSKIP139():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CO_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP140"
    return "SKIP140"
def NSKIP140():
    global _zeroflag
    global G_REG
    global _stack
    global Y_REG
    global VAR_AL_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global VAR_CP_STRVAR_array
    global CONST_2
    B_REG=VAR_AL_STRVAR
    _stack.append(B_REG)
    X_REG=CONST_2
    G_REG=VAR_CP_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    SEQ()
    _stack.append(X_REG)
    B_REG=VAR_AL_STRVAR
    _stack.append(B_REG)
    X_REG=CONST_1
    G_REG=VAR_CP_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    SEQ()
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP141"
    return "SKIP141"
def NSKIP141():
    GOSUB("GOSUBCONT82")
    return 40800
def GOSUBCONT82():
    return "RETURN"
    return "SKIP141"
def SKIP141():
    return "SKIP140"
def SKIP140():
    return "SKIP139"
def SKIP139():
    return 52525
def line_52525():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP142"
    return "SKIP142"
def NSKIP142():
    return 59150
    return "SKIP142"
def SKIP142():
    return 52530
def line_52530():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP34","VAR_I")
    return "FORLOOP34"
def FORLOOP34():
    global VAR_I
    global G_REG
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    global VAR_RT_int
    global VAR_CV_int_array
    X_REG=VAR_I
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return 52540
def line_52540():
    global _zeroflag
    global VAR_RR_int
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    X_REG=VAR_TC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP143"
    return "SKIP143"
def NSKIP143():
    return 52580
    return "SKIP143"
def SKIP143():
    return 52545
def line_52545():
    global VAR_II
    global _stack
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP35","VAR_II")
    return "FORLOOP35"
def FORLOOP35():
    global _zeroflag
    global VAR_II
    global VAR_PP_int
    global G_REG
    global Y_REG
    global VAR_IP_int_array
    global X_REG
    global VAR_T_int
    global CONST_1
    X_REG=VAR_II
    G_REG=VAR_IP_int_array
    ARRAYACCESS_INTEGER()
    VAR_PP_int=X_REG
    VAR_PP_int=int(VAR_PP_int)
    Y_REG=VAR_T_int
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP144"
    return "SKIP144"
def NSKIP144():
    GOSUB("GOSUBCONT83")
    return 40900
def GOSUBCONT83():
    return "SKIP144"
def SKIP144():
    return 52550
def line_52550():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP145"
    return "SKIP145"
def NSKIP145():
    global Y_REG
    global VAR_FF_int
    global CONST_2
    Y_REG=CONST_2
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    return "SKIP145"
def SKIP145():
    return 52560
def line_52560():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP146"
    return "SKIP146"
def NSKIP146():
    global VAR_II
    global VAR_RR_int
    global CONST_53
    global Y_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=VAR_RT_int
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_53
    VAR_II=Y_REG
    return "SKIP146"
def SKIP146():
    return 52570
def line_52570():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 52580
def line_52580():
    global _zeroflag
    global VAR_RR_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_RR_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP147"
    return "SKIP147"
def NSKIP147():
    global VAR_IT_STRVAR_array
    global G_REG
    global _stack
    global CONST_96
    global B_REG
    global X_REG
    global VAR_T_int
    B_REG=CONST_96
    _stack.append(B_REG)
    X_REG=VAR_T_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    CONCAT()
    STROUT()
    LINEBREAK()
    return "SKIP147"
def SKIP147():
    return 52590
def line_52590():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_I")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 52600
def line_52600():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP148"
    return "SKIP148"
def NSKIP148():
    GOSUB("GOSUBCONT84")
    return 40650
def GOSUBCONT84():
    return "SKIP148"
def SKIP148():
    return 52610
def line_52610():
    return "RETURN"
def line_52700():
    return 52702
def line_52702():
    return 52704
def line_52704():
    return 52720
def line_52720():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CO_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP149"
    return "SKIP149"
def NSKIP149():
    return 59150
    return "SKIP149"
def SKIP149():
    return 52740
def line_52740():
    global G_REG
    global VAR_A_STRVAR
    global X_REG
    global A_REG
    global VAR_CP_STRVAR_array
    global CONST_2
    X_REG=CONST_2
    G_REG=VAR_CP_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    GOSUB("GOSUBCONT85")
    return 41200
def GOSUBCONT85():
    return 52745
def line_52745():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_6
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_6
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP150"
    return "SKIP150"
def NSKIP150():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global CONST_69
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_69
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP151"
    return "SKIP151"
def NSKIP151():
    global VAR_A_STRVAR
    global C_REG
    global B_REG
    global A_REG
    global CONST_2
    C_REG=CONST_2
    B_REG=VAR_A_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    return 52800
    return "SKIP151"
def SKIP151():
    return "SKIP150"
def SKIP150():
    return 52750
def line_52750():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global CONST_68
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_68
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP152"
    return "SKIP152"
def NSKIP152():
    global VAR_A_STRVAR
    global C_REG
    global CONST_63
    global B_REG
    global A_REG
    C_REG=CONST_63
    B_REG=VAR_A_STRVAR
    LEFT()
    VAR_A_STRVAR=A_REG
    return "SKIP152"
def SKIP152():
    return 52760
def line_52760():
    global _zeroflag
    global CONST_100
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_100
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP153"
    return "SKIP153"
def NSKIP153():
    global CONST_41
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_41
    VAR_A_STRVAR=B_REG
    return 52800
    return "SKIP153"
def SKIP153():
    return 52770
def line_52770():
    global _zeroflag
    global CONST_101
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_101
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP154"
    return "SKIP154"
def NSKIP154():
    global VAR_A_STRVAR
    global CONST_39
    global B_REG
    B_REG=CONST_39
    VAR_A_STRVAR=B_REG
    return 52800
    return "SKIP154"
def SKIP154():
    return 52780
def line_52780():
    global _zeroflag
    global CONST_102
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_102
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP155"
    return "SKIP155"
def NSKIP155():
    global CONST_40
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_40
    VAR_A_STRVAR=B_REG
    return 52800
    return "SKIP155"
def SKIP155():
    return 52790
def line_52790():
    global _zeroflag
    global CONST_103
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_103
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP156"
    return "SKIP156"
def NSKIP156():
    global VAR_A_STRVAR
    global CONST_38
    global B_REG
    B_REG=CONST_38
    VAR_A_STRVAR=B_REG
    return "SKIP156"
def SKIP156():
    return 52800
def line_52800():
    global _zeroflag
    global CONST_42
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_42
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP157"
    return "SKIP157"
def NSKIP157():
    global CONST_45
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_45
    VAR_A_STRVAR=B_REG
    return "SKIP157"
def SKIP157():
    return 52810
def line_52810():
    global _zeroflag
    global CONST_43
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_43
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP158"
    return "SKIP158"
def NSKIP158():
    global CONST_44
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_44
    VAR_A_STRVAR=B_REG
    return "SKIP158"
def SKIP158():
    return 52815
def line_52815():
    global VAR_XC_int
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_XC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP159"
    return "SKIP159"
def NSKIP159():
    return 52850
    return "SKIP159"
def SKIP159():
    return 52820
def line_52820():
    global VAR_I
    global VAR_XC_int
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_XC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP36","VAR_I")
    return "FORLOOP36"
def FORLOOP36():
    global VAR_I
    global G_REG
    global VAR_TX_STRVAR
    global X_REG
    global VAR_XP_STRVAR_array
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_XP_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_TX_STRVAR=A_REG
    GOSUB("GOSUBCONT86")
    return 63100
def GOSUBCONT86():
    global VAR_TX_STRVAR
    global B_REG
    global VAR_B_STRVAR
    B_REG=VAR_TX_STRVAR
    VAR_B_STRVAR=B_REG
    return 52830
def line_52830():
    global _zeroflag
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP160"
    return "SKIP160"
def NSKIP160():
    global VAR_I
    global VAR_RN_STRVAR
    global G_REG
    global _stack
    global B_REG
    global CONST_71
    global X_REG
    global VAR_XX_STRVAR_array
    global A_REG
    B_REG=CONST_71
    _stack.append(B_REG)
    X_REG=VAR_I
    G_REG=VAR_XX_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=_stack.pop()
    CONCAT()
    VAR_RN_STRVAR=A_REG
    LINEBREAK()
    GOSUB("GOSUBCONT87")
    return 40100
def GOSUBCONT87():
    return "RETURN"
    return "SKIP160"
def SKIP160():
    return 52840
def line_52840():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 52850
def line_52850():
    global CONST_104
    global A_REG
    A_REG=CONST_104
    STROUT()
    LINEBREAK()
    return "RETURN"
def line_52900():
    return 52902
def line_52902():
    return 52904
def line_52904():
    return 53100
def line_53100():
    global CONST_105
    global A_REG
    LINEBREAK()
    A_REG=CONST_105
    STROUT()
    LINEBREAK()
    return 53120
def line_53120():
    global CONST_106
    global A_REG
    FRE()
    INTOUT()
    CRSRRIGHT()
    A_REG=CONST_106
    STROUT()
    LINEBREAK()
    return 53140
def line_53140():
    return "RETURN"
def line_53200():
    return 53202
def line_53202():
    return 53204
def line_53204():
    return 53210
def line_53210():
    global _zeroflag
    global Y_REG
    global VAR_IC_int
    global VAR_FF_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP161"
    return "SKIP161"
def NSKIP161():
    global CONST_107
    global A_REG
    A_REG=CONST_107
    STROUT()
    LINEBREAK()
    return "RETURN"
    return "SKIP161"
def SKIP161():
    return 53220
def line_53220():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP162"
    return "SKIP162"
def NSKIP162():
    return 59150
    return "SKIP162"
def SKIP162():
    return 53230
def line_53230():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP37","VAR_I")
    return "FORLOOP37"
def FORLOOP37():
    global VAR_I
    global G_REG
    global X_REG
    global VAR_T_int
    global VAR_CV_int_array
    X_REG=VAR_I
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    return 53240
def line_53240():
    global VAR_II
    global VAR_RR_int
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP38","VAR_II")
    return "FORLOOP38"
def FORLOOP38():
    global VAR_II
    global VAR_PP_int
    global G_REG
    global Y_REG
    global VAR_IV_int_array
    global X_REG
    global CONST_1
    global VAR_RT_int
    X_REG=VAR_II
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    VAR_PP_int=X_REG
    VAR_PP_int=int(VAR_PP_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    return 53245
def line_53245():
    global _zeroflag
    global VAR_PP_int
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=VAR_T_int
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP163"
    return "SKIP163"
def NSKIP163():
    global _zeroflag
    global VAR_II
    global VAR_UV_int_array
    global G_REG
    global Y_REG
    global X_REG
    global CONST_1
    X_REG=VAR_II
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP164"
    return "SKIP164"
def NSKIP164():
    GOSUB("GOSUBCONT88")
    return 41400
def GOSUBCONT88():
    return "SKIP164"
def SKIP164():
    return "SKIP163"
def SKIP163():
    return 53250
def line_53250():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP165"
    return "SKIP165"
def NSKIP165():
    global Y_REG
    global VAR_FF_int
    global CONST_2
    Y_REG=CONST_2
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    return "SKIP165"
def SKIP165():
    return 53260
def line_53260():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP166"
    return "SKIP166"
def NSKIP166():
    global VAR_II
    global VAR_RR_int
    global CONST_53
    global Y_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=VAR_RT_int
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_53
    VAR_II=Y_REG
    return "SKIP166"
def SKIP166():
    return 53270
def line_53270():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 53280
def line_53280():
    global _zeroflag
    global VAR_RR_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_RR_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP167"
    return "SKIP167"
def NSKIP167():
    global VAR_RR_int
    global Y_REG
    global VAR_T_int
    Y_REG=VAR_T_int
    VAR_RR_int=Y_REG
    VAR_RR_int=int(VAR_RR_int)
    GOSUB("GOSUBCONT89")
    return 53450
def GOSUBCONT89():
    return "SKIP167"
def SKIP167():
    return 53290
def line_53290():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_I")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 53300
def line_53300():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP168"
    return "SKIP168"
def NSKIP168():
    GOSUB("GOSUBCONT90")
    return 40650
def GOSUBCONT90():
    return "SKIP168"
def SKIP168():
    return 53310
def line_53310():
    return "RETURN"
def line_53450():
    return 53455
def line_53455():
    global _zeroflag
    global Y_REG
    global VAR_SF_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_SF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP169"
    return "SKIP169"
def NSKIP169():
    global Y_REG
    global VAR_SK_int
    global CONST_2
    Y_REG=CONST_2
    VAR_SK_int=Y_REG
    VAR_SK_int=int(VAR_SK_int)
    return "RETURN"
    return "SKIP169"
def SKIP169():
    return 53460
def line_53460():
    global VAR_IT_STRVAR_array
    global VAR_RR_int
    global G_REG
    global CONST_108
    global Y_REG
    global VAR_SK_int
    global VAR_SF_int
    global X_REG
    global A_REG
    global CONST_2
    X_REG=VAR_RR_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    A_REG=CONST_108
    STROUT()
    LINEBREAK()
    Y_REG=CONST_2
    VAR_SK_int=Y_REG
    VAR_SK_int=int(VAR_SK_int)
    Y_REG=CONST_2
    VAR_SF_int=Y_REG
    VAR_SF_int=int(VAR_SF_int)
    return "RETURN"
def line_53500():
    return 53502
def line_53502():
    return 53504
def line_53504():
    return 53510
def line_53510():
    global _zeroflag
    global CONST_12
    global _stack
    global Y_REG
    global VAR_CC_int
    global X_REG
    global VAR_T_int
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_12
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) & int(Y_REG)
    _stack.append(X_REG)
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP170"
    return "SKIP170"
def NSKIP170():
    return 59150
    return "SKIP170"
def SKIP170():
    return 53520
def line_53520():
    global Y_REG
    global VAR_CO_int
    global VAR_T_int
    Y_REG=VAR_T_int
    VAR_CO_int=Y_REG
    VAR_CO_int=int(VAR_CO_int)
    GOSUB("GOSUBCONT91")
    return 58500
def GOSUBCONT91():
    return "RETURN"
def line_53600():
    return 53602
def line_53602():
    return 53604
def line_53604():
    return 53610
def line_53610():
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_6
    global CONST_4
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_4
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP171"
    return "SKIP171"
def NSKIP171():
    return 59150
    return "SKIP171"
def SKIP171():
    return 53620
def line_53620():
    global CONST_23
    global Y_REG
    global VAR_CO_int
    Y_REG=CONST_23
    VAR_CO_int=Y_REG
    VAR_CO_int=int(VAR_CO_int)
    GOSUB("GOSUBCONT92")
    return 58500
def GOSUBCONT92():
    return "RETURN"
def line_53700():
    return 53702
def line_53702():
    return 53704
def line_53704():
    return 53710
def line_53710():
    global _zeroflag
    global _stack
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_6
    global CONST_4
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    _stack.append(X_REG)
    Y_REG=CONST_4
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    Y_REG=_stack.pop()
    X_REG=int(X_REG) or int(Y_REG)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP172"
    return "SKIP172"
def NSKIP172():
    return 59150
    return "SKIP172"
def SKIP172():
    return 53720
def line_53720():
    global CONST_52
    global Y_REG
    global VAR_CO_int
    Y_REG=CONST_52
    VAR_CO_int=Y_REG
    VAR_CO_int=int(VAR_CO_int)
    GOSUB("GOSUBCONT93")
    return 58500
def GOSUBCONT93():
    return "RETURN"
def line_53800():
    return 53802
def line_53802():
    return 53804
def line_53804():
    return 53810
def line_53810():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP173"
    return "SKIP173"
def NSKIP173():
    return 59150
    return "SKIP173"
def SKIP173():
    return 53820
def line_53820():
    global Y_REG
    global VAR_FF_int
    global CONST_1
    Y_REG=CONST_1
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    GOSUB("GOSUBCONT94")
    return 59200
def GOSUBCONT94():
    return "RETURN"
def line_53850():
    return 53852
def line_53852():
    return 53854
def line_53854():
    return 53860
def line_53860():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP174"
    return "SKIP174"
def NSKIP174():
    return 59150
    return "SKIP174"
def SKIP174():
    return 53862
def line_53862():
    global CONST_110
    global CONST_109
    global VAR_A_STRVAR
    global B_REG
    global VAR_FI_STRVAR
    global A_REG
    global VAR_B_STRVAR
    B_REG=CONST_109
    A_REG=VAR_FI_STRVAR
    CONCAT()
    VAR_A_STRVAR=A_REG
    B_REG=VAR_A_STRVAR
    A_REG=CONST_110
    CONCAT()
    VAR_B_STRVAR=A_REG
    GOSUB("GOSUBCONT95")
    return 53880
def GOSUBCONT95():
    return 53865
def line_53865():
    global CONST_112
    global CONST_111
    global VAR_A_STRVAR
    global B_REG
    global VAR_FI_STRVAR
    global A_REG
    global VAR_B_STRVAR
    B_REG=VAR_A_STRVAR
    A_REG=CONST_111
    CONCAT()
    B_REG=CONST_112
    CONCAT()
    B_REG=VAR_FI_STRVAR
    CONCAT()
    VAR_B_STRVAR=A_REG
    GOSUB("GOSUBCONT96")
    return 53880
def GOSUBCONT96():
    return 53870
def line_53870():
    global Y_REG
    global VAR_FF_int
    global CONST_2
    Y_REG=CONST_2
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    GOSUB("GOSUBCONT97")
    return 59200
def GOSUBCONT97():
    return "RETURN"
def line_53880():
    return 53882
def line_53882():
    global CONST_12
    global D_REG
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global C_REG
    global B_REG
    global VAR_DN_int
    global X_REG
    global CONST_2
    global VAR_B_STRVAR
    Y_REG=CONST_2
    _stack.append(Y_REG)
    Y_REG=VAR_DN_int
    _stack.append(Y_REG)
    Y_REG=CONST_12
    _stack.append(Y_REG)
    B_REG=VAR_B_STRVAR
    G_REG=B_REG
    D_REG=_stack.pop()
    C_REG=_stack.pop()
    X_REG=_stack.pop()
    Y_REG=CONST_55
    OPEN()
    X_REG=CONST_2
    CLOSE()
    return "RETURN"
def line_53900():
    return 53902
def line_53902():
    return 53904
def line_53904():
    return 53910
def line_53910():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP175"
    return "SKIP175"
def NSKIP175():
    return 59150
    return "SKIP175"
def SKIP175():
    return 53920
def line_53920():
    global CONST_113
    global Y_REG
    global VAR_CO_int
    global VAR_SK_int
    global CONST_2
    Y_REG=CONST_2
    VAR_SK_int=Y_REG
    VAR_SK_int=int(VAR_SK_int)
    Y_REG=CONST_113
    VAR_CO_int=Y_REG
    VAR_CO_int=int(VAR_CO_int)
    GOSUB("GOSUBCONT98")
    return 58500
def GOSUBCONT98():
    return 53930
def line_53930():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP176"
    return "SKIP176"
def NSKIP176():
    return "RETURN"
    return "SKIP176"
def SKIP176():
    return 53940
def line_53940():
    global VAR_RR_int
    global G_REG
    global Y_REG
    global VAR_SK_int
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    global VAR_CV_int_array
    Y_REG=CONST_1
    VAR_SK_int=Y_REG
    VAR_SK_int=int(VAR_SK_int)
    X_REG=CONST_2
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_RR_int=X_REG
    VAR_RR_int=int(VAR_RR_int)
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    GOSUB("GOSUBCONT99")
    return 43600
def GOSUBCONT99():
    global _zeroflag
    global Y_REG
    global VAR_SK_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_SK_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP177"
    return "SKIP177"
def NSKIP177():
    return "RETURN"
    return "SKIP177"
def SKIP177():
    return 53950
def line_53950():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global VAR_RT_int
    Y_REG=CONST_1
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP178"
    return "SKIP178"
def NSKIP178():
    global G_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    global VAR_CV_int_array
    X_REG=CONST_1
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    return 59150
    return "SKIP178"
def SKIP178():
    return 53960
def line_53960():
    global CONST_114
    global A_REG
    A_REG=CONST_114
    STROUT()
    LINEBREAK()
    return 53970
def line_53970():
    return "RETURN"
def line_54000():
    return 54002
def line_54002():
    return 54004
def line_54004():
    return 54010
def line_54010():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP179"
    return "SKIP179"
def NSKIP179():
    global CONST_115
    global A_REG
    A_REG=CONST_115
    STROUT()
    LINEBREAK()
    return "RETURN"
    return "SKIP179"
def SKIP179():
    return 54020
def line_54020():
    global _zeroflag
    global Y_REG
    global VAR_CC_int
    global X_REG
    global CONST_6
    global CONST_1
    Y_REG=CONST_6
    X_REG=VAR_CC_int
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP180"
    return "SKIP180"
def NSKIP180():
    return 59150
    return "SKIP180"
def SKIP180():
    return 54030
def line_54030():
    global CONST_116
    global Y_REG
    global VAR_CO_int
    Y_REG=CONST_116
    VAR_CO_int=Y_REG
    VAR_CO_int=int(VAR_CO_int)
    GOSUB("GOSUBCONT100")
    return 58500
def GOSUBCONT100():
    return "RETURN"
def line_58500():
    return 58510
def line_58510():
    global _zeroflag
    global Y_REG
    global VAR_OC_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_OC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP181"
    return "SKIP181"
def NSKIP181():
    return 58700
    return "SKIP181"
def SKIP181():
    return 58520
def line_58520():
    global VAR_J
    global _stack
    global Y_REG
    global VAR_OC_int
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_1
    VAR_J=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_OC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP39","VAR_J")
    return "FORLOOP39"
def FORLOOP39():
    global VAR_J
    global VAR_OP_int_array
    global G_REG
    global Y_REG
    global X_REG
    global VAR_T_int
    Y_REG=VAR_J
    X_REG=int(Y_REG)
    G_REG=VAR_OP_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    return 58530
def line_58530():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=VAR_CO_int
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP182"
    return "SKIP182"
def NSKIP182():
    global VAR_J
    global VAR_T2_int
    global Y_REG
    Y_REG=VAR_J
    VAR_T2_int=Y_REG
    VAR_T2_int=int(VAR_T2_int)
    GOSUB("GOSUBCONT101")
    return 42200
def GOSUBCONT101():
    return "SKIP182"
def SKIP182():
    return 58540
def line_58540():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP183"
    return "SKIP183"
def NSKIP183():
    return "RETURN"
    return "SKIP183"
def SKIP183():
    return 58550
def line_58550():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 58700
def line_58700():
    return 58710
def line_58710():
    global VAR_J
    global VAR_GC_int
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_1
    VAR_RT_int=Y_REG
    VAR_RT_int=int(VAR_RT_int)
    Y_REG=CONST_1
    VAR_J=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_GC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP40","VAR_J")
    return "FORLOOP40"
def FORLOOP40():
    global VAR_J
    global G_REG
    global Y_REG
    global X_REG
    global VAR_T_int
    global VAR_OG_int_array
    Y_REG=VAR_J
    X_REG=int(Y_REG)
    G_REG=VAR_OG_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    return 58720
def line_58720():
    global _zeroflag
    global Y_REG
    global VAR_CO_int
    global X_REG
    global VAR_T_int
    global CONST_1
    Y_REG=VAR_CO_int
    X_REG=VAR_T_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP184"
    return "SKIP184"
def NSKIP184():
    global VAR_J
    global VAR_T2_int
    global Y_REG
    Y_REG=VAR_J
    VAR_T2_int=Y_REG
    VAR_T2_int=int(VAR_T2_int)
    GOSUB("GOSUBCONT102")
    return 42700
def GOSUBCONT102():
    return "SKIP184"
def SKIP184():
    return 58730
def line_58730():
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_RT_int
    Y_REG=CONST_2
    X_REG=VAR_RT_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP185"
    return "SKIP185"
def NSKIP185():
    return "RETURN"
    return "SKIP185"
def SKIP185():
    return 58740
def line_58740():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 58750
def line_58750():
    global _zeroflag
    global Y_REG
    global VAR_SK_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_SK_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP186"
    return "SKIP186"
def NSKIP186():
    global G_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    global VAR_CV_int_array
    X_REG=CONST_1
    G_REG=VAR_CV_int_array
    ARRAYACCESS_INTEGER()
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    GOSUB("GOSUBCONT103")
    return 40600
def GOSUBCONT103():
    return "SKIP186"
def SKIP186():
    return 58760
def line_58760():
    return "RETURN"
def line_59000():
    return 59010
def line_59010():
    global VAR_I
    global CONST_12
    global VAR_PL_int
    global _stack
    global Y_REG
    global _memory
    global X_REG
    global CONST_1
    global CONST_2
    _memory[646]=int(CONST_12) & 255;
    LINEBREAK()
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_PL_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP41","VAR_I")
    return "FORLOOP41"
def FORLOOP41():
    global VAR_I
    global G_REG
    global VAR_A_STRVAR
    global VAR_RD_STRVAR_array
    global X_REG
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_RD_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    return 59020
def line_59020():
    GOSUB("GOSUBCONT104")
    return 59100
def GOSUBCONT104():
    return 59040
def line_59040():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    GOSUB("GOSUBCONT105")
    return 59500
def GOSUBCONT105():
    return "RETURN"
def line_59100():
    return 59110
def line_59110():
    global _zeroflag
    global CONST_117
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_117
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP187"
    return "SKIP187"
def NSKIP187():
    global VAR_A_STRVAR
    global A_REG
    A_REG=VAR_A_STRVAR
    STROUT()
    return "RETURN"
    return "SKIP187"
def SKIP187():
    return 59120
def line_59120():
    global VAR_A_STRVAR
    global A_REG
    A_REG=VAR_A_STRVAR
    STROUT()
    LINEBREAK()
    return "RETURN"
def line_59150():
    return 59160
def line_59160():
    GOSUB("GOSUBCONT106")
    return 40600
def GOSUBCONT106():
    return "RETURN"
def line_59200():
    return 59210
def line_59210():
    global VAR_P
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    LINEBREAK()
    Y_REG=CONST_1
    VAR_P=Y_REG
    Y_REG=CONST_1
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP188"
    return "SKIP188"
def NSKIP188():
    global CONST_118
    global B_REG
    global VAR_SX_STRVAR
    global VAR_FI_STRVAR
    global A_REG
    B_REG=CONST_118
    A_REG=VAR_FI_STRVAR
    CONCAT()
    VAR_SX_STRVAR=A_REG
    GOSUB("GOSUBCONT107")
    return 45100
def GOSUBCONT107():
    global CONST_119
    global A_REG
    A_REG=CONST_119
    STROUT()
    return "SKIP188"
def SKIP188():
    return 59220
def line_59220():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP189"
    return "SKIP189"
def NSKIP189():
    global CONST_120
    global B_REG
    global VAR_SX_STRVAR
    global VAR_FI_STRVAR
    global A_REG
    B_REG=CONST_120
    A_REG=VAR_FI_STRVAR
    CONCAT()
    VAR_SX_STRVAR=A_REG
    GOSUB("GOSUBCONT108")
    return 45100
def GOSUBCONT108():
    global CONST_121
    global A_REG
    A_REG=CONST_121
    STROUT()
    return "SKIP189"
def SKIP189():
    return 59225
def line_59225():
    global Y_REG
    global VAR_PO_int
    global VAR_C_int
    Y_REG=VAR_PO_int
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT109")
    return 59900
def GOSUBCONT109():
    global Y_REG
    global VAR_PO_int
    global VAR_C_int
    Y_REG=VAR_C_int
    VAR_PO_int=Y_REG
    VAR_PO_int=int(VAR_PO_int)
    return 59230
def line_59230():
    global Y_REG
    global VAR_IC_int
    global VAR_C_int
    Y_REG=VAR_IC_int
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT110")
    return 59900
def GOSUBCONT110():
    global Y_REG
    global VAR_IC_int
    global VAR_C_int
    Y_REG=VAR_C_int
    VAR_IC_int=Y_REG
    VAR_IC_int=int(VAR_IC_int)
    return 59240
def line_59240():
    global Y_REG
    global VAR_C_int
    global VAR_OD_int
    Y_REG=VAR_OD_int
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT111")
    return 59900
def GOSUBCONT111():
    global Y_REG
    global VAR_C_int
    global VAR_OD_int
    Y_REG=VAR_C_int
    VAR_OD_int=Y_REG
    VAR_OD_int=int(VAR_OD_int)
    return 59250
def line_59250():
    global VAR_I
    global VAR_MI_int
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_MI_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP42","VAR_I")
    return "FORLOOP42"
def FORLOOP42():
    return 59260
def line_59260():
    global VAR_I
    global G_REG
    global VAR_C_int
    global VAR_IV_int_array
    global X_REG
    X_REG=VAR_I
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT112")
    return 59900
def GOSUBCONT112():
    global VAR_I
    global G_REG
    global _stack
    global Y_REG
    global VAR_C_int
    global VAR_IV_int_array
    global X_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_C_int
    G_REG=VAR_IV_int_array
    ARRAYSTORE_INTEGER()
    return 59270
def line_59270():
    global VAR_I
    global VAR_UV_int_array
    global G_REG
    global VAR_C_int
    global X_REG
    X_REG=VAR_I
    G_REG=VAR_UV_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT113")
    return 59900
def GOSUBCONT113():
    global VAR_I
    global VAR_UV_int_array
    global G_REG
    global _stack
    global Y_REG
    global VAR_C_int
    global X_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_C_int
    G_REG=VAR_UV_int_array
    ARRAYSTORE_INTEGER()
    return 59280
def line_59280():
    global VAR_I
    global VAR_RS_int_array
    global G_REG
    global VAR_C_int
    global X_REG
    X_REG=VAR_I
    G_REG=VAR_RS_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT114")
    return 59900
def GOSUBCONT114():
    global VAR_I
    global VAR_RS_int_array
    global G_REG
    global _stack
    global Y_REG
    global VAR_C_int
    global X_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_C_int
    G_REG=VAR_RS_int_array
    ARRAYSTORE_INTEGER()
    return 59290
def line_59290():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 59300
def line_59300():
    global VAR_I
    global VAR_MR_int
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_MR_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP43","VAR_I")
    return "FORLOOP43"
def FORLOOP43():
    global VAR_II
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP44","VAR_II")
    return "FORLOOP44"
def FORLOOP44():
    return 59310
def line_59310():
    global VAR_I
    global VAR_II
    global G_REG
    global _stack
    global VAR_RV_int_array
    global CONST_24
    global Y_REG
    global VAR_C_int
    global X_REG
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_RV_int_array
    ARRAYACCESS_INTEGER()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    GOSUB("GOSUBCONT115")
    return 59900
def GOSUBCONT115():
    global VAR_I
    global VAR_II
    global G_REG
    global _stack
    global VAR_RV_int_array
    global CONST_24
    global Y_REG
    global VAR_C_int
    global X_REG
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    Y_REG=VAR_C_int
    G_REG=VAR_RV_int_array
    ARRAYSTORE_INTEGER()
    return 59315
def line_59315():
    global _zeroflag
    global VAR_II
    global CONST_55
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_55
    X_REG=VAR_II
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP190"
    return "SKIP190"
def NSKIP190():
    global VAR_I
    global VAR_II
    global VAR_LX_STRVAR_array
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global CONST_24
    global Y_REG
    global X_REG
    global A_REG
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_LX_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    GOSUB("GOSUBCONT116")
    return 59950
def GOSUBCONT116():
    global VAR_I
    global VAR_II
    global VAR_LX_STRVAR_array
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global CONST_24
    global Y_REG
    global X_REG
    global A_REG
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=VAR_A_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_LX_STRVAR_array
    ARRAYSTORE_STRING()
    return "SKIP190"
def SKIP190():
    return 59320
def line_59320():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    NEXT("VAR_I")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 59330
def line_59330():
    global VAR_RN_STRVAR
    global VAR_A_STRVAR
    global B_REG
    B_REG=VAR_RN_STRVAR
    VAR_A_STRVAR=B_REG
    GOSUB("GOSUBCONT117")
    return 59950
def GOSUBCONT117():
    global VAR_RN_STRVAR
    global VAR_A_STRVAR
    global B_REG
    B_REG=VAR_A_STRVAR
    VAR_RN_STRVAR=B_REG
    return 59335
def line_59335():
    global VAR_I
    global _stack
    global VAR_MX_int
    global Y_REG
    global CONST_2
    global VAR_OD_int
    Y_REG=VAR_OD_int
    VAR_I=Y_REG
    Y_REG=VAR_MX_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP45","VAR_I")
    return "FORLOOP45"
def FORLOOP45():
    global VAR_I
    global _zeroflag
    global CONST_11
    global G_REG
    global _stack
    global Y_REG
    global VAR_OD_STRVAR_array
    global X_REG
    global CONST_1
    global A_REG
    global VAR_OD_int
    Y_REG=VAR_I
    _stack.append(Y_REG)
    A_REG=CONST_11
    X_REG=_stack.pop()
    G_REG=VAR_OD_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    X_REG=VAR_OD_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP191"
    return "SKIP191"
def NSKIP191():
    return 59370
    return "SKIP191"
def SKIP191():
    return 59340
def line_59340():
    global VAR_I
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    global VAR_OD_int
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_OD_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP46","VAR_I")
    return "FORLOOP46"
def FORLOOP46():
    return 59350
def line_59350():
    global VAR_I
    global G_REG
    global VAR_A_STRVAR
    global VAR_OD_STRVAR_array
    global X_REG
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_OD_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_A_STRVAR=A_REG
    GOSUB("GOSUBCONT118")
    return 59950
def GOSUBCONT118():
    global VAR_I
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global VAR_OD_STRVAR_array
    global X_REG
    global A_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    A_REG=VAR_A_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_OD_STRVAR_array
    ARRAYSTORE_STRING()
    return 59360
def line_59360():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 59370
def line_59370():
    global CONST_80
    global X_REG
    global CONST_6
    global A_REG
    X_REG=CONST_6
    CLOSE()
    A_REG=CONST_80
    STROUT()
    LINEBREAK()
    return 59380
def line_59380():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP192"
    return "SKIP192"
def NSKIP192():
    GOSUB("GOSUBCONT119")
    return 63300
def GOSUBCONT119():
    GOSUB("GOSUBCONT120")
    return 40100
def GOSUBCONT120():
    return "SKIP192"
def SKIP192():
    return 59390
def line_59390():
    global VAR_LC_STRVAR
    global CONST_11
    global B_REG
    B_REG=CONST_11
    VAR_LC_STRVAR=B_REG
    return "RETURN"
def line_59500():
    return 59510
def line_59510():
    LINEBREAK()
    GOSUB("GOSUBCONT121")
    return 62600
def GOSUBCONT121():
    GOSUB("GOSUBCONT122")
    return 62500
def GOSUBCONT122():
    return "RETURN"
def line_59800():
    return 59810
def line_59810():
    global CONST_122
    global X_REG
    global A_REG
    LINEBREAK()
    A_REG=CONST_122
    STROUT()
    READSTATUS()
    X_REG=tmpy
    REALOUT()
    LINEBREAK()
    return 49100
def line_59850():
    return 59855
def line_59855():
    global VAR_P
    global _zeroflag
    global CONST_117
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_P
    X_REG=X_REG+Y_REG
    VAR_P=X_REG
    Y_REG=CONST_117
    X_REG=VAR_P
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP193"
    return "SKIP193"
def NSKIP193():
    global VAR_P
    global Y_REG
    global CONST_78
    global CONST_1
    Y_REG=CONST_78
    CHR()
    STROUT()
    Y_REG=CONST_1
    VAR_P=Y_REG
    return "SKIP193"
def SKIP193():
    return 59860
def line_59860():
    global _zeroflag
    global CONST_123
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_123
    READSTATUS()
    X_REG=tmpy
    X_REG=int(X_REG) & int(Y_REG)
    Y_REG=CONST_1
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP194"
    return "SKIP194"
def NSKIP194():
    return 59800
    return "SKIP194"
def SKIP194():
    return 59870
def line_59870():
    return "RETURN"
def line_59900():
    return 59910
def line_59910():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP195"
    return "SKIP195"
def NSKIP195():
    global _zeroflag
    global _stack
    global Y_REG
    global C_REG
    global VAR_C_int
    global CONST_6
    Y_REG=CONST_6
    _stack.append(Y_REG)
    CLEARQUEUE()
    C_REG=_stack.pop()
    INPUTNUMBERCHANNEL()
    INPUTLENGTHCHECK()
    if _zeroflag==0:
        return "EMPTYINPUTSKIP2"
    VAR_C_int=Y_REG
    VAR_C_int=int(VAR_C_int)
    return "EMPTYINPUTSKIP2"
def EMPTYINPUTSKIP2():
    return 59925
    return "SKIP195"
def SKIP195():
    return 59920
def line_59920():
    global _stack
    global Y_REG
    global C_REG
    global VAR_C_int
    global CONST_84
    global X_REG
    global CONST_6
    global A_REG
    LOCKCHANNEL()
    Y_REG=CONST_6
    _stack.append(Y_REG)
    X_REG=VAR_C_int
    C_REG=_stack.pop()
    INTOUTCHANNEL()
    A_REG=CONST_84
    STROUTCHANNEL()
    LINEBREAKCHANNEL()
    UNLOCKCHANNEL()
    return 59925
def line_59925():
    GOSUB("GOSUBCONT123")
    return 59850
def GOSUBCONT123():
    return 59930
def line_59930():
    return "RETURN"
def line_59950():
    return 59960
def line_59960():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP196"
    return "SKIP196"
def NSKIP196():
    GOSUB("GOSUBCONT124")
    return 61700
def GOSUBCONT124():
    return 59980
    return "SKIP196"
def SKIP196():
    return 59965
def line_59965():
    global _zeroflag
    global CONST_11
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_11
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP197"
    return "SKIP197"
def NSKIP197():
    global VAR_A_STRVAR
    global B_REG
    global CONST_74
    B_REG=CONST_74
    VAR_A_STRVAR=B_REG
    return "SKIP197"
def SKIP197():
    return 59970
def line_59970():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP198"
    return "SKIP198"
def NSKIP198():
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global CONST_6
    global A_REG
    LOCKCHANNEL()
    Y_REG=CONST_6
    _stack.append(Y_REG)
    A_REG=VAR_A_STRVAR
    C_REG=_stack.pop()
    STROUTCHANNEL()
    LINEBREAKCHANNEL()
    UNLOCKCHANNEL()
    return "SKIP198"
def SKIP198():
    return 59980
def line_59980():
    GOSUB("GOSUBCONT125")
    return 59850
def GOSUBCONT125():
    global _zeroflag
    global VAR_A_STRVAR
    global B_REG
    global CONST_74
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_74
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP199"
    return "SKIP199"
def NSKIP199():
    global CONST_11
    global VAR_A_STRVAR
    global B_REG
    B_REG=CONST_11
    VAR_A_STRVAR=B_REG
    return "SKIP199"
def SKIP199():
    return 59990
def line_59990():
    return "RETURN"
def line_60000():
    return 60002
def line_60002():
    global CONST_124
    global A_REG
    A_REG=CONST_124
    STROUT()
    LINEBREAK()
    return 60004
def line_60004():
    global VAR_PY_int
    global Y_REG
    global _memory
    global X_REG
    global CONST_1
    X_REG=int(_memory[1]) & 255;
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    VAR_PY_int=X_REG
    VAR_PY_int=int(VAR_PY_int)
    return 60005
def line_60005():
    global VAR_CB_STRVAR
    global VAR_MI_int
    global VAR_MR_int
    global CONST_125
    global CONST_127
    global CONST_126
    global CONST_116
    global CONST_59
    global _stack
    global VAR_MX_int
    global CONST_24
    global Y_REG
    global VAR_OX_int
    global CONST_68
    global B_REG
    global VAR_LR_int
    global VAR_XO_int
    global CONST_1
    global A_REG
    global VAR_MO_int
    Y_REG=CONST_24
    VAR_MX_int=Y_REG
    VAR_MX_int=int(VAR_MX_int)
    Y_REG=CONST_59
    VAR_MR_int=Y_REG
    VAR_MR_int=int(VAR_MR_int)
    Y_REG=CONST_125
    VAR_MI_int=Y_REG
    VAR_MI_int=int(VAR_MI_int)
    Y_REG=CONST_116
    VAR_XO_int=Y_REG
    VAR_XO_int=int(VAR_XO_int)
    B_REG=CONST_126
    _stack.append(B_REG)
    Y_REG=CONST_116
    CHR()
    B_REG=_stack.pop()
    CONCAT()
    VAR_CB_STRVAR=A_REG
    Y_REG=CONST_1
    VAR_LR_int=Y_REG
    VAR_LR_int=int(VAR_LR_int)
    Y_REG=CONST_127
    VAR_MO_int=Y_REG
    VAR_MO_int=int(VAR_MO_int)
    Y_REG=CONST_68
    VAR_OX_int=Y_REG
    VAR_OX_int=int(VAR_OX_int)
    return 60006
def line_60006():
    global CONST_129
    global CONST_128
    global Y_REG
    global VAR_AL_STRVAR
    global VAR_AD
    global CONST_63
    global B_REG
    global CONST_130
    global VAR_FI_STRVAR
    global VAR_BA
    global VAR_MS_int
    B_REG=CONST_128
    VAR_AL_STRVAR=B_REG
    Y_REG=CONST_63
    VAR_MS_int=Y_REG
    VAR_MS_int=int(VAR_MS_int)
    B_REG=CONST_129
    VAR_FI_STRVAR=B_REG
    Y_REG=CONST_130
    VAR_BA=Y_REG
    Y_REG=VAR_BA
    VAR_AD=Y_REG
    return 60010
def line_60010():
    return 60020
def line_60020():
    return 60030
def line_60030():
    return 60035
def line_60035():
    return 60040
def line_60040():
    return 60050
def line_60050():
    return 60055
def line_60055():
    return 60060
def line_60060():
    return 60070
def line_60070():
    return 60080
def line_60080():
    return 60090
def line_60090():
    return 60100
def line_60100():
    return 60110
def line_60110():
    return 60120
def line_60120():
    return 60130
def line_60130():
    global VAR_I
    global VAR_MR_int
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_MR_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP47","VAR_I")
    return "FORLOOP47"
def FORLOOP47():
    global VAR_P
    global _stack
    global CONST_23
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_P=Y_REG
    Y_REG=CONST_23
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP48","VAR_P")
    return "FORLOOP48"
def FORLOOP48():
    global VAR_I
    global VAR_P
    global _zeroflag
    global G_REG
    global _stack
    global VAR_RV_int_array
    global CONST_24
    global Y_REG
    global X_REG
    global CONST_7
    global CONST_1
    global A_REG
    Y_REG=VAR_P
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    Y_REG=CONST_7
    G_REG=VAR_RV_int_array
    ARRAYSTORE_INTEGER()
    NEXT("VAR_P")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    NEXT("VAR_I")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 60140
def line_60140():
    global VAR_I
    global CONST_52
    global _stack
    global Y_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_52
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP49","VAR_I")
    return "FORLOOP49"
def FORLOOP49():
    global VAR_I
    global _zeroflag
    global G_REG
    global _stack
    global Y_REG
    global X_REG
    global VAR_DR_STRVAR_array
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    READSTR()
    X_REG=_stack.pop()
    G_REG=VAR_DR_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 60150
def line_60150():
    return 60160
def line_60160():
    return 60170
def line_60170():
    return 60180
def line_60180():
    return 60190
def line_60190():
    global CONST_11
    global B_REG
    global VAR_RL_STRVAR
    B_REG=CONST_11
    VAR_RL_STRVAR=B_REG
    return 60200
def line_60200():
    global Y_REG
    global VAR_PO_int
    global CONST_1
    Y_REG=CONST_1
    VAR_PO_int=Y_REG
    VAR_PO_int=int(VAR_PO_int)
    return 60900
def line_60900():
    return "RETURN"
def line_61000():
    return 61010
def line_61010():
    global CONST_11
    global VAR_LI_int
    global Y_REG
    global B_REG
    global VAR_SX_STRVAR
    global VAR_I_int
    global CONST_2
    B_REG=CONST_11
    VAR_SX_STRVAR=B_REG
    Y_REG=CONST_2
    VAR_LI_int=Y_REG
    VAR_LI_int=int(VAR_LI_int)
    Y_REG=CONST_2
    VAR_I_int=Y_REG
    VAR_I_int=int(VAR_I_int)
    return 61020
def line_61020():
    global _zeroflag
    global _stack
    global VAR_TX_STRVAR
    global C_REG
    global B_REG
    global CONST_131
    global X_REG
    global VAR_I_int
    global CONST_1
    B_REG=CONST_131
    _stack.append(B_REG)
    C_REG=VAR_I_int
    B_REG=VAR_TX_STRVAR
    CHARAT()
    B_REG=_stack.pop()
    SNEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP200"
    return "SKIP200"
def NSKIP200():
    return 61040
    return "SKIP200"
def SKIP200():
    return 61030
def line_61030():
    GOSUB("GOSUBCONT126")
    return 61100
def GOSUBCONT126():
    global VAR_LI_int
    global Y_REG
    global B_REG
    global CONST_132
    global X_REG
    global VAR_SX_STRVAR
    global VAR_I_int
    global A_REG
    global CONST_2
    B_REG=CONST_132
    A_REG=VAR_SX_STRVAR
    CONCAT()
    VAR_SX_STRVAR=A_REG
    Y_REG=CONST_2
    X_REG=VAR_I_int
    X_REG=X_REG+Y_REG
    VAR_LI_int=X_REG
    VAR_LI_int=int(VAR_LI_int)
    return 61040
def line_61040():
    global _zeroflag
    global Y_REG
    global VAR_TX_STRVAR
    global B_REG
    global X_REG
    global VAR_I_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_I_int
    X_REG=X_REG+Y_REG
    VAR_I_int=X_REG
    VAR_I_int=int(VAR_I_int)
    B_REG=VAR_TX_STRVAR
    LEN()
    Y_REG=X_REG
    X_REG=VAR_I_int
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP201"
    return "SKIP201"
def NSKIP201():
    return 61020
    return "SKIP201"
def SKIP201():
    return 61045
def line_61045():
    global _zeroflag
    global VAR_LI_int
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_LI_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP202"
    return "SKIP202"
def NSKIP202():
    return "RETURN"
    return "SKIP202"
def SKIP202():
    return 61050
def line_61050():
    GOSUB("GOSUBCONT127")
    return 61100
def GOSUBCONT127():
    return 61060
def line_61060():
    global VAR_TX_STRVAR
    global B_REG
    global VAR_SX_STRVAR
    B_REG=VAR_SX_STRVAR
    VAR_TX_STRVAR=B_REG
    return "RETURN"
def line_61100():
    return 61110
def line_61110():
    global D_REG
    global VAR_LI_int
    global _stack
    global Y_REG
    global VAR_TX_STRVAR
    global C_REG
    global B_REG
    global X_REG
    global VAR_SX_STRVAR
    global VAR_I_int
    global A_REG
    C_REG=VAR_LI_int
    _stack.append(C_REG)
    Y_REG=VAR_LI_int
    X_REG=VAR_I_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    B_REG=VAR_TX_STRVAR
    D_REG=_stack.pop()
    C_REG=_stack.pop()
    MID()
    B_REG=A_REG
    A_REG=VAR_SX_STRVAR
    CONCAT()
    VAR_SX_STRVAR=A_REG
    return "RETURN"
def line_61200():
    return 61205
def line_61205():
    global CONST_133
    global A_REG
    A_REG=CONST_133
    STROUT()
    return 61206
def line_61206():
    global Y_REG
    global VAR_J_int
    global VAR_II_int
    global CONST_1
    Y_REG=CONST_1
    VAR_II_int=Y_REG
    VAR_II_int=int(VAR_II_int)
    Y_REG=CONST_1
    VAR_J_int=Y_REG
    VAR_J_int=int(VAR_J_int)
    return 61220
def line_61220():
    global B_REG
    global CONST_134
    global VAR_SX_STRVAR
    B_REG=CONST_134
    VAR_SX_STRVAR=B_REG
    GOSUB("GOSUBCONT128")
    return 45100
def GOSUBCONT128():
    return 61230
def line_61230():
    GOSUB("GOSUBCONT129")
    return 61700
def GOSUBCONT129():
    global Y_REG
    global X_REG
    global VAR_II_int
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_II_int
    X_REG=X_REG+Y_REG
    VAR_II_int=X_REG
    VAR_II_int=int(VAR_II_int)
    return 61250
def line_61250():
    global CONST_11
    global Y_REG
    global VAR_ID_STRVAR
    global B_REG
    global VAR_I_int
    global CONST_2
    B_REG=CONST_11
    VAR_ID_STRVAR=B_REG
    Y_REG=CONST_2
    VAR_I_int=Y_REG
    VAR_I_int=int(VAR_I_int)
    return 61260
def line_61260():
    global _zeroflag
    global D_REG
    global VAR_A_STRVAR
    global C_REG
    global B_REG
    global CONST_131
    global X_REG
    global VAR_SX_STRVAR
    global VAR_I_int
    global CONST_1
    global A_REG
    global CONST_2
    C_REG=VAR_I_int
    D_REG=CONST_2
    B_REG=VAR_A_STRVAR
    MID()
    VAR_SX_STRVAR=A_REG
    B_REG=CONST_131
    A_REG=VAR_SX_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP203"
    return "SKIP203"
def NSKIP203():
    return 61280
    return "SKIP203"
def SKIP203():
    return 61270
def line_61270():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global VAR_ID_STRVAR
    global B_REG
    global X_REG
    global VAR_SX_STRVAR
    global VAR_I_int
    global CONST_1
    global A_REG
    global CONST_2
    B_REG=VAR_SX_STRVAR
    A_REG=VAR_ID_STRVAR
    CONCAT()
    VAR_ID_STRVAR=A_REG
    Y_REG=CONST_2
    X_REG=VAR_I_int
    X_REG=X_REG+Y_REG
    VAR_I_int=X_REG
    VAR_I_int=int(VAR_I_int)
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=X_REG
    X_REG=VAR_I_int
    X_REG= (-1 if X_REG<=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP204"
    return "SKIP204"
def NSKIP204():
    return 61260
    return "SKIP204"
def SKIP204():
    return 61280
def line_61280():
    global D_REG
    global VAR_TF_STRVAR
    global G_REG
    global _stack
    global VAR_MV_int_array
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global VAR_ID_STRVAR
    global B_REG
    global X_REG
    global VAR_II_int
    global VAR_I_int
    global A_REG
    global CONST_2
    B_REG=VAR_ID_STRVAR
    VAL()
    VAR_II_int=X_REG
    VAR_II_int=int(VAR_II_int)
    Y_REG=CONST_2
    X_REG=VAR_I_int
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    C_REG=CONST_2
    _stack.append(C_REG)
    B_REG=VAR_A_STRVAR
    D_REG=_stack.pop()
    C_REG=_stack.pop()
    MID()
    VAR_TF_STRVAR=A_REG
    Y_REG=VAR_II_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_2
    G_REG=VAR_MV_int_array
    ARRAYSTORE_INTEGER()
    return 61290
def line_61290():
    global _zeroflag
    global VAR_TF_STRVAR
    global B_REG
    global CONST_135
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_135
    A_REG=VAR_TF_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP205"
    return "SKIP205"
def NSKIP205():
    global G_REG
    global _stack
    global VAR_MV_int_array
    global Y_REG
    global X_REG
    global VAR_II_int
    global CONST_1
    Y_REG=VAR_II_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=CONST_1
    G_REG=VAR_MV_int_array
    ARRAYSTORE_INTEGER()
    return "SKIP205"
def SKIP205():
    return 61300
def line_61300():
    global VAR_IT_STRVAR_array
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global VAR_II_int
    global VAR_I_int
    global CONST_6
    Y_REG=VAR_II_int
    _stack.append(Y_REG)
    Y_REG=VAR_I_int
    _stack.append(Y_REG)
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=_stack.pop()
    X_REG=X_REG-Y_REG
    Y_REG=CONST_6
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_A_STRVAR
    RIGHT()
    X_REG=_stack.pop()
    G_REG=VAR_IT_STRVAR_array
    ARRAYSTORE_STRING()
    return 61302
def line_61302():
    global VAR_IT_STRVAR_array
    global G_REG
    global VAR_TX_STRVAR
    global X_REG
    global VAR_II_int
    global A_REG
    X_REG=VAR_II_int
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_TX_STRVAR=A_REG
    GOSUB("GOSUBCONT130")
    return 63100
def GOSUBCONT130():
    global VAR_IL_STRVAR_array
    global G_REG
    global _stack
    global Y_REG
    global VAR_TX_STRVAR
    global CONST_78
    global X_REG
    global VAR_II_int
    global A_REG
    Y_REG=VAR_II_int
    _stack.append(Y_REG)
    A_REG=VAR_TX_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_IL_STRVAR_array
    ARRAYSTORE_STRING()
    Y_REG=CONST_78
    CHR()
    STROUT()
    return 61305
def line_61305():
    GOSUB("GOSUBCONT131")
    return 61400
def GOSUBCONT131():
    return 61310
def line_61310():
    global _zeroflag
    global Y_REG
    global CONST_79
    global X_REG
    global CONST_1
    Y_REG=CONST_79
    READSTATUS()
    X_REG=tmpy
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP206"
    return "SKIP206"
def NSKIP206():
    return 61330
    return "SKIP206"
def SKIP206():
    return 61320
def line_61320():
    global Y_REG
    global VAR_J_int
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_J_int
    X_REG=X_REG+Y_REG
    VAR_J_int=X_REG
    VAR_J_int=int(VAR_J_int)
    return 61230
def line_61330():
    global CONST_80
    global A_REG
    A_REG=CONST_80
    STROUT()
    LINEBREAK()
    return 61340
def line_61340():
    global VAR_TI_int
    global Y_REG
    global VAR_J_int
    global X_REG
    global CONST_6
    Y_REG=VAR_J_int
    VAR_TI_int=Y_REG
    VAR_TI_int=int(VAR_TI_int)
    X_REG=CONST_6
    CLOSE()
    return "RETURN"
def line_61400():
    return 61405
def line_61405():
    global Y_REG
    global VAR_AD
    global X_REG
    global VAR_T_int
    global CONST_1
    global CONST_2
    global VAR_SD
    Y_REG=CONST_1
    VAR_T_int=Y_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=VAR_AD
    VAR_SD=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_AD
    X_REG=X_REG+Y_REG
    VAR_AD=X_REG
    return 61410
def line_61410():
    GOSUB("GOSUBCONT132")
    return 61700
def GOSUBCONT132():
    global _zeroflag
    global CONST_56
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_56
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP207"
    return "SKIP207"
def NSKIP207():
    return 61460
    return "SKIP207"
def SKIP207():
    return 61415
def line_61415():
    global _zeroflag
    global VAR_PP_int
    global CONST_117
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global VAR_T_int
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    VAR_PP_int=X_REG
    VAR_PP_int=int(VAR_PP_int)
    Y_REG=VAR_PP_int
    X_REG=VAR_T_int
    X_REG=X_REG+Y_REG
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    Y_REG=CONST_117
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP208"
    return "SKIP208"
def NSKIP208():
    global Y_REG
    global X_REG
    global VAR_T_int
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_T_int
    X_REG=X_REG+Y_REG
    VAR_T_int=X_REG
    VAR_T_int=int(VAR_T_int)
    return "SKIP208"
def SKIP208():
    return 61420
def line_61420():
    global VAR_A_STRVAR
    global VAR_TX_STRVAR
    global B_REG
    B_REG=VAR_A_STRVAR
    VAR_TX_STRVAR=B_REG
    GOSUB("GOSUBCONT133")
    return 61000
def GOSUBCONT133():
    return 61430
def line_61430():
    global VAR_P
    global VAR_PP_int
    global _stack
    global Y_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_P=Y_REG
    Y_REG=VAR_PP_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP50","VAR_P")
    return "FORLOOP50"
def FORLOOP50():
    global VAR_P
    global D_REG
    global VAR_A_STRVAR
    global VAR_TX_STRVAR
    global C_REG
    global B_REG
    global A_REG
    global CONST_2
    C_REG=VAR_P
    D_REG=CONST_2
    B_REG=VAR_TX_STRVAR
    MID()
    VAR_A_STRVAR=A_REG
    return 61440
def line_61440():
    global VAR_P
    global _zeroflag
    global VAR_PP_int
    global CONST_117
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global _memory
    global VAR_AD
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    Y_REG=VAR_P
    X_REG=VAR_AD
    X_REG=X_REG+Y_REG
    Y_REG=CONST_2
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    B_REG=VAR_A_STRVAR
    ASC()
    Y_REG=_stack.pop()
    _memory[int(Y_REG)]=int(X_REG) & 255
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_2
    X_REG=VAR_P
    X_REG=X_REG-Y_REG
    VAR_P=X_REG
    Y_REG=CONST_117
    X_REG=VAR_PP_int
    X_REG= (-1 if X_REG<Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP209"
    return "SKIP209"
def NSKIP209():
    global VAR_P
    global CONST_116
    global Y_REG
    global _memory
    global VAR_AD
    global X_REG
    global CONST_2
    Y_REG=VAR_P
    X_REG=VAR_AD
    X_REG=X_REG+Y_REG
    Y_REG=X_REG
    _memory[int(Y_REG)]=int(CONST_116) & 255
    Y_REG=CONST_2
    X_REG=VAR_P
    X_REG=X_REG+Y_REG
    VAR_P=X_REG
    return "SKIP209"
def SKIP209():
    return 61450
def line_61450():
    global VAR_P
    global _zeroflag
    global Y_REG
    global VAR_AD
    global CONST_136
    global X_REG
    global CONST_1
    Y_REG=VAR_P
    X_REG=VAR_AD
    X_REG=X_REG+Y_REG
    VAR_AD=X_REG
    Y_REG=CONST_136
    X_REG=VAR_AD
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP210"
    return "SKIP210"
def NSKIP210():
    return 42420
    return "SKIP210"
def SKIP210():
    return 61455
def line_61455():
    return 61410
def line_61460():
    global G_REG
    global _stack
    global Y_REG
    global _memory
    global VAR_AD
    global VAR_ID_int_array
    global X_REG
    global VAR_II_int
    global VAR_T_int
    global VAR_BA
    global CONST_2
    global VAR_SD
    Y_REG=VAR_II_int
    _stack.append(Y_REG)
    Y_REG=VAR_BA
    X_REG=VAR_SD
    X_REG=X_REG-Y_REG
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_ID_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_2
    X_REG=VAR_AD
    X_REG=X_REG-Y_REG
    VAR_AD=X_REG
    Y_REG=VAR_SD
    _stack.append(Y_REG)
    Y_REG=CONST_2
    X_REG=VAR_T_int
    X_REG=X_REG-Y_REG
    Y_REG=_stack.pop()
    _memory[int(Y_REG)]=int(X_REG) & 255
    return "RETURN"
def line_61500():
    return 61510
def line_61510():
    global CONST_137
    global A_REG
    A_REG=CONST_137
    STROUT()
    return 61520
def line_61520():
    global VAR_P
    global Y_REG
    global B_REG
    global CONST_138
    global VAR_SX_STRVAR
    global CONST_1
    Y_REG=CONST_1
    VAR_P=Y_REG
    B_REG=CONST_138
    VAR_SX_STRVAR=B_REG
    GOSUB("GOSUBCONT134")
    return 45100
def GOSUBCONT134():
    return 61530
def line_61530():
    GOSUB("GOSUBCONT135")
    return 61700
def GOSUBCONT135():
    global VAR_II
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    B_REG=VAR_A_STRVAR
    VAL()
    VAR_II=X_REG
    return 61540
def line_61540():
    GOSUB("GOSUBCONT136")
    return 61700
def GOSUBCONT136():
    global VAR_A_STRVAR
    global VAR_PP
    global B_REG
    global X_REG
    B_REG=VAR_A_STRVAR
    VAL()
    VAR_PP=X_REG
    return 61545
def line_61545():
    GOSUB("GOSUBCONT137")
    return 61700
def GOSUBCONT137():
    global VAR_II
    global VAR_CV_STRVAR_array
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global X_REG
    global A_REG
    Y_REG=VAR_II
    _stack.append(Y_REG)
    A_REG=VAR_A_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_CV_STRVAR_array
    ARRAYSTORE_STRING()
    return 61550
def line_61550():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_PP
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_PP
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP51","VAR_I")
    return "FORLOOP51"
def FORLOOP51():
    GOSUB("GOSUBCONT138")
    return 61700
def GOSUBCONT138():
    return 61560
def line_61560():
    global VAR_I
    global VAR_II
    global G_REG
    global CONST_55
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global VAR_CM_STRVAR_array
    global CONST_78
    global X_REG
    global A_REG
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=VAR_A_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_CM_STRVAR_array
    ARRAYSTORE_STRING()
    Y_REG=CONST_78
    CHR()
    STROUT()
    return 61570
def line_61570():
    global _zeroflag
    global Y_REG
    global CONST_79
    global X_REG
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_79
    READSTATUS()
    X_REG=tmpy
    X_REG= (-1 if X_REG!=Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP211"
    return "SKIP211"
def NSKIP211():
    global VAR_P
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_P
    X_REG=X_REG+Y_REG
    VAR_P=X_REG
    return 61530
    return "SKIP211"
def SKIP211():
    return 61580
def line_61580():
    global CONST_80
    global A_REG
    A_REG=CONST_80
    STROUT()
    LINEBREAK()
    return 61590
def line_61590():
    global VAR_P
    global Y_REG
    global VAR_TB_int
    global X_REG
    global CONST_6
    Y_REG=VAR_P
    VAR_TB_int=Y_REG
    VAR_TB_int=int(VAR_TB_int)
    X_REG=CONST_6
    CLOSE()
    return 61600
def line_61600():
    global B_REG
    global CONST_139
    global VAR_SX_STRVAR
    B_REG=CONST_139
    VAR_SX_STRVAR=B_REG
    GOSUB("GOSUBCONT139")
    return 45100
def GOSUBCONT139():
    global _zeroflag
    global _stack
    global Y_REG
    global C_REG
    global VAR_LR_int
    global CONST_6
    Y_REG=CONST_6
    _stack.append(Y_REG)
    CLEARQUEUE()
    C_REG=_stack.pop()
    INPUTNUMBERCHANNEL()
    INPUTLENGTHCHECK()
    if _zeroflag==0:
        return "EMPTYINPUTSKIP3"
    VAR_LR_int=Y_REG
    VAR_LR_int=int(VAR_LR_int)
    return "EMPTYINPUTSKIP3"
def EMPTYINPUTSKIP3():
    global X_REG
    global CONST_6
    X_REG=CONST_6
    CLOSE()
    return "RETURN"
def line_61700():
    return 61710
def line_61710():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global CONST_6
    global A_REG
    Y_REG=CONST_6
    _stack.append(Y_REG)
    CLEARQUEUE()
    C_REG=_stack.pop()
    INPUTSTRCHANNEL()
    INPUTLENGTHCHECK()
    if _zeroflag==0:
        return "EMPTYINPUTSKIP4"
    VAR_A_STRVAR=A_REG
    return "EMPTYINPUTSKIP4"
def EMPTYINPUTSKIP4():
    return "RETURN"
def line_62000():
    return 62005
def line_62005():
    GOSUB("GOSUBCONT140")
    return 62100
def GOSUBCONT140():
    global VAR_RN_STRVAR
    global D_REG
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global C_REG
    global B_REG
    global VAR_DN_int
    global X_REG
    global CONST_6
    Y_REG=CONST_6
    _stack.append(Y_REG)
    Y_REG=VAR_DN_int
    _stack.append(Y_REG)
    Y_REG=CONST_6
    _stack.append(Y_REG)
    B_REG=VAR_RN_STRVAR
    G_REG=B_REG
    D_REG=_stack.pop()
    C_REG=_stack.pop()
    X_REG=_stack.pop()
    Y_REG=CONST_55
    OPEN()
    GOSUB("GOSUBCONT141")
    return 61700
def GOSUBCONT141():
    global CONST_12
    global VAR_RD_int
    global VAR_A_STRVAR
    global _memory
    global B_REG
    global X_REG
    B_REG=VAR_A_STRVAR
    VAL()
    VAR_RD_int=X_REG
    VAR_RD_int=int(VAR_RD_int)
    _memory[646]=int(CONST_12) & 255;
    return 62008
def line_62008():
    GOSUB("GOSUBCONT142")
    return 61700
def GOSUBCONT142():
    global _zeroflag
    global VAR_PY_int
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global VAR_RL_STRVAR
    global CONST_1
    B_REG=VAR_A_STRVAR
    VAR_RL_STRVAR=B_REG
    Y_REG=VAR_PY_int
    _zeroflag=(0 if Y_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP212"
    return "SKIP212"
def NSKIP212():
    GOSUB("GOSUBCONT143")
    return 63005
def GOSUBCONT143():
    return "SKIP212"
def SKIP212():
    return 62010
def line_62010():
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global CONST_6
    global A_REG
    Y_REG=CONST_6
    _stack.append(Y_REG)
    CLEARQUEUE()
    C_REG=_stack.pop()
    INPUTSTRCHANNEL()
    INPUTLENGTHCHECK()
    if _zeroflag==0:
        return "EMPTYINPUTSKIP5"
    VAR_A_STRVAR=A_REG
    return "EMPTYINPUTSKIP5"
def EMPTYINPUTSKIP5():
    GOSUB("GOSUBCONT144")
    return 59860
def GOSUBCONT144():
    return 62020
def line_62020():
    global _zeroflag
    global CONST_56
    global VAR_A_STRVAR
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    B_REG=CONST_56
    A_REG=VAR_A_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP213"
    return "SKIP213"
def NSKIP213():
    global VAR_MD_int
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_MD_int
    X_REG=X_REG+Y_REG
    VAR_MD_int=X_REG
    VAR_MD_int=int(VAR_MD_int)
    return 62050
    return "SKIP213"
def SKIP213():
    return 62030
def line_62030():
    global VAR_A_STRVAR
    global VAR_TX_STRVAR
    global B_REG
    B_REG=VAR_A_STRVAR
    VAR_TX_STRVAR=B_REG
    GOSUB("GOSUBCONT145")
    return 61000
def GOSUBCONT145():
    global VAR_A_STRVAR
    global VAR_TX_STRVAR
    global B_REG
    B_REG=VAR_TX_STRVAR
    VAR_A_STRVAR=B_REG
    return 62040
def line_62040():
    global VAR_MD_int
    global Y_REG
    Y_REG=VAR_MD_int
    Y_REG=int(Y_REG)
    return "ON2SUB0"
def ON2SUB0():
    global _zeroflag
    global Y_REG
    global CONST_2
    _zeroflag=(0 if Y_REG==CONST_2 else 1)
    if _zeroflag==1:
        return "ON2SUB1"
    GOSUB("GOSUBCONT146")
    return 62200
def GOSUBCONT146():
    return "GSKIPON2"
def ON2SUB1():
    global _zeroflag
    global Y_REG
    global CONST_6
    _zeroflag=(0 if Y_REG==CONST_6 else 1)
    if _zeroflag==1:
        return "ON2SUB2"
    GOSUB("GOSUBCONT147")
    return 62300
def GOSUBCONT147():
    return "GSKIPON2"
def ON2SUB2():
    global _zeroflag
    global Y_REG
    global CONST_4
    _zeroflag=(0 if Y_REG==CONST_4 else 1)
    if _zeroflag==1:
        return "ON2SUB3"
    GOSUB("GOSUBCONT148")
    return 62400
def GOSUBCONT148():
    return "GSKIPON2"
def ON2SUB3():
    global _zeroflag
    global CONST_55
    global Y_REG
    _zeroflag=(0 if Y_REG==CONST_55 else 1)
    if _zeroflag==1:
        return "GSKIPON2"
    GOSUB("GOSUBCONT149")
    return 42000
def GOSUBCONT149():
    return "GSKIPON2"
def GSKIPON2():
    return 62050
def line_62050():
    global _zeroflag
    global Y_REG
    global CONST_79
    global X_REG
    global CONST_1
    Y_REG=CONST_79
    READSTATUS()
    X_REG=tmpy
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP214"
    return "SKIP214"
def NSKIP214():
    global X_REG
    global CONST_6
    X_REG=CONST_6
    CLOSE()
    return "RETURN"
    return "SKIP214"
def SKIP214():
    return 62060
def line_62060():
    return 62010
def line_62100():
    return 62110
def line_62110():
    global VAR_MD_int
    global VAR_XC_int
    global VAR_EL_int
    global VAR_PL_int
    global VAR_TC_int
    global Y_REG
    global VAR_OC_int
    global VAR_IL_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    VAR_MD_int=Y_REG
    VAR_MD_int=int(VAR_MD_int)
    Y_REG=CONST_1
    VAR_PL_int=Y_REG
    VAR_PL_int=int(VAR_PL_int)
    Y_REG=CONST_1
    VAR_EL_int=Y_REG
    VAR_EL_int=int(VAR_EL_int)
    Y_REG=CONST_1
    VAR_IL_int=Y_REG
    VAR_IL_int=int(VAR_IL_int)
    Y_REG=CONST_1
    VAR_OC_int=Y_REG
    VAR_OC_int=int(VAR_OC_int)
    Y_REG=CONST_1
    VAR_XC_int=Y_REG
    VAR_XC_int=int(VAR_XC_int)
    Y_REG=CONST_1
    VAR_TC_int=Y_REG
    VAR_TC_int=int(VAR_TC_int)
    return 62120
def line_62120():
    global VAR_I
    global VAR_PL_int
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_PL_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP52","VAR_I")
    return "FORLOOP52"
def FORLOOP52():
    global VAR_I
    global _zeroflag
    global CONST_11
    global G_REG
    global _stack
    global Y_REG
    global VAR_RD_STRVAR_array
    global X_REG
    global CONST_1
    global A_REG
    Y_REG=VAR_I
    _stack.append(Y_REG)
    A_REG=CONST_11
    X_REG=_stack.pop()
    G_REG=VAR_RD_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 62130
def line_62130():
    global VAR_I
    global _stack
    global Y_REG
    global VAR_XO_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=VAR_XO_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP53","VAR_I")
    return "FORLOOP53"
def FORLOOP53():
    global VAR_II
    global _stack
    global Y_REG
    global VAR_OX_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=VAR_OX_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP54","VAR_II")
    return "FORLOOP54"
def FORLOOP54():
    global VAR_I
    global _zeroflag
    global CONST_11
    global VAR_II
    global VAR_OP_STRVAR_array
    global G_REG
    global CONST_55
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    A_REG=CONST_55
    Y_REG=X_REG
    X_REG=X_REG*pow(2,A_REG)
    A_REG=CONST_2
    Y_REG=Y_REG*pow(2,A_REG)
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_I
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    A_REG=CONST_11
    X_REG=_stack.pop()
    G_REG=VAR_OP_STRVAR_array
    ARRAYSTORE_STRING()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 62140
def line_62140():
    return "RETURN"
def line_62200():
    return 62210
def line_62210():
    global VAR_PL_int
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global VAR_RD_STRVAR_array
    global X_REG
    global A_REG
    Y_REG=VAR_PL_int
    _stack.append(Y_REG)
    A_REG=VAR_A_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_RD_STRVAR_array
    ARRAYSTORE_STRING()
    return 62220
def line_62220():
    global _zeroflag
    global CONST_117
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_117
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP215"
    return "SKIP215"
def NSKIP215():
    global VAR_A_STRVAR
    global A_REG
    A_REG=VAR_A_STRVAR
    STROUT()
    return 62240
    return "SKIP215"
def SKIP215():
    return 62230
def line_62230():
    global VAR_A_STRVAR
    global A_REG
    A_REG=VAR_A_STRVAR
    STROUT()
    LINEBREAK()
    return 62240
def line_62240():
    global VAR_PL_int
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_PL_int
    X_REG=X_REG+Y_REG
    VAR_PL_int=X_REG
    VAR_PL_int=int(VAR_PL_int)
    return "RETURN"
def line_62300():
    return 62305
def line_62305():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP216"
    return "SKIP216"
def NSKIP216():
    return "RETURN"
    return "SKIP216"
def SKIP216():
    return 62310
def line_62310():
    global VAR_I
    global VAR_II
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global CONST_2
    Y_REG=CONST_2
    VAR_II=Y_REG
    Y_REG=CONST_2
    VAR_I=Y_REG
    B_REG=VAR_A_STRVAR
    LEN()
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP55","VAR_I")
    return "FORLOOP55"
def FORLOOP55():
    return 62320
def line_62320():
    global VAR_I
    global _zeroflag
    global _stack
    global VAR_A_STRVAR
    global C_REG
    global B_REG
    global CONST_132
    global X_REG
    global CONST_1
    B_REG=CONST_132
    _stack.append(B_REG)
    C_REG=VAR_I
    B_REG=VAR_A_STRVAR
    CHARAT()
    B_REG=_stack.pop()
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP217"
    return "SKIP217"
def NSKIP217():
    global VAR_I
    global VAR_II
    global CONST_53
    global Y_REG
    Y_REG=VAR_I
    VAR_II=Y_REG
    Y_REG=CONST_53
    VAR_I=Y_REG
    return "SKIP217"
def SKIP217():
    return 62330
def line_62330():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 62340
def line_62340():
    global VAR_II
    global VAR_EL_int
    global G_REG
    global _stack
    global VAR_EX_STRVAR_array
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global CONST_6
    Y_REG=VAR_EL_int
    _stack.append(Y_REG)
    Y_REG=VAR_II
    _stack.append(Y_REG)
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=_stack.pop()
    X_REG=X_REG-Y_REG
    Y_REG=CONST_6
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_A_STRVAR
    RIGHT()
    X_REG=_stack.pop()
    G_REG=VAR_EX_STRVAR_array
    ARRAYSTORE_STRING()
    return 62350
def line_62350():
    global VAR_II
    global VAR_EL_int
    global G_REG
    global _stack
    global VAR_XN_STRVAR_array
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global CONST_2
    Y_REG=VAR_EL_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    X_REG=VAR_II
    X_REG=X_REG-Y_REG
    C_REG=X_REG
    B_REG=VAR_A_STRVAR
    LEFT()
    X_REG=_stack.pop()
    G_REG=VAR_XN_STRVAR_array
    ARRAYSTORE_STRING()
    return 62360
def line_62360():
    global VAR_LK_int_array
    global VAR_II
    global VAR_EL_int
    global D_REG
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global C_REG
    global B_REG
    global X_REG
    global A_REG
    global CONST_2
    Y_REG=VAR_EL_int
    _stack.append(Y_REG)
    Y_REG=CONST_2
    X_REG=VAR_II
    X_REG=X_REG+Y_REG
    _stack.append(X_REG)
    C_REG=CONST_2
    _stack.append(C_REG)
    B_REG=VAR_A_STRVAR
    D_REG=_stack.pop()
    C_REG=_stack.pop()
    MID()
    B_REG=A_REG
    VAL()
    Y_REG=X_REG
    X_REG=_stack.pop()
    G_REG=VAR_LK_int_array
    ARRAYSTORE_INTEGER()
    return 62370
def line_62370():
    global VAR_EL_int
    global Y_REG
    global X_REG
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_EL_int
    X_REG=X_REG+Y_REG
    VAR_EL_int=X_REG
    VAR_EL_int=int(VAR_EL_int)
    return "RETURN"
def line_62400():
    return 62405
def line_62405():
    global _zeroflag
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_A_STRVAR
    LEN()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP218"
    return "SKIP218"
def NSKIP218():
    return "RETURN"
    return "SKIP218"
def SKIP218():
    return 62410
def line_62410():
    global G_REG
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global X_REG
    global VAR_RI_STRVAR_array
    global VAR_IL_int
    global A_REG
    Y_REG=VAR_IL_int
    _stack.append(Y_REG)
    A_REG=VAR_A_STRVAR
    X_REG=_stack.pop()
    G_REG=VAR_RI_STRVAR_array
    ARRAYSTORE_STRING()
    return 62420
def line_62420():
    global Y_REG
    global X_REG
    global VAR_IL_int
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_IL_int
    X_REG=X_REG+Y_REG
    VAR_IL_int=X_REG
    VAR_IL_int=int(VAR_IL_int)
    return "RETURN"
def line_62500():
    return 62510
def line_62510():
    GOSUB("GOSUBCONT150")
    return 62900
def GOSUBCONT150():
    return 62520
def line_62520():
    global VAR_XC_int
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_XC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP219"
    return "SKIP219"
def NSKIP219():
    return "RETURN"
    return "SKIP219"
def SKIP219():
    return 62530
def line_62530():
    global _memory
    global CONST_69
    global CONST_140
    global A_REG
    _memory[646]=int(CONST_69) & 255;
    A_REG=CONST_140
    STROUT()
    return 62540
def line_62540():
    global VAR_I
    global VAR_XC_int
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_XC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP56","VAR_I")
    return "FORLOOP56"
def FORLOOP56():
    return 62550
def line_62550():
    global VAR_I
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_I
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP220"
    return "SKIP220"
def NSKIP220():
    global CONST_73
    global A_REG
    A_REG=CONST_73
    STROUT()
    return "SKIP220"
def SKIP220():
    return 62560
def line_62560():
    global VAR_I
    global _zeroflag
    global G_REG
    global X_REG
    global VAR_XP_STRVAR_array
    global CONST_1
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_XP_STRVAR_array
    ARRAYACCESS_STRING()
    STROUT()
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    LINEBREAK()
    return "RETURN"
def line_62600():
    return 62610
def line_62610():
    GOSUB("GOSUBCONT151")
    return 62750
def GOSUBCONT151():
    return 62660
def line_62660():
    global _zeroflag
    global VAR_TC_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_TC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP221"
    return "SKIP221"
def NSKIP221():
    return "RETURN"
    return "SKIP221"
def SKIP221():
    return 62670
def line_62670():
    global CONST_57
    global _memory
    global CONST_141
    global A_REG
    _memory[646]=int(CONST_57) & 255;
    A_REG=CONST_141
    STROUT()
    return 62680
def line_62680():
    global VAR_I
    global CONST_11
    global VAR_II
    global _stack
    global VAR_TC_int
    global VAR_A_STRVAR
    global Y_REG
    global CONST_142
    global B_REG
    global X_REG
    global CONST_1
    global CONST_2
    B_REG=CONST_11
    VAR_A_STRVAR=B_REG
    Y_REG=CONST_142
    VAR_II=Y_REG
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP57","VAR_I")
    return "FORLOOP57"
def FORLOOP57():
    global VAR_I
    global VAR_IT_STRVAR_array
    global G_REG
    global VAR_IP_int_array
    global X_REG
    global A_REG
    global VAR_B_STRVAR
    X_REG=VAR_I
    G_REG=VAR_IP_int_array
    ARRAYACCESS_INTEGER()
    G_REG=VAR_IT_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_B_STRVAR=A_REG
    return 62690
def line_62690():
    global VAR_I
    global _zeroflag
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    X_REG=VAR_I
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP222"
    return "SKIP222"
def NSKIP222():
    global VAR_II
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global CONST_73
    global X_REG
    global CONST_6
    global A_REG
    B_REG=CONST_73
    A_REG=VAR_A_STRVAR
    CONCAT()
    VAR_A_STRVAR=A_REG
    Y_REG=CONST_6
    X_REG=VAR_II
    X_REG=X_REG+Y_REG
    VAR_II=X_REG
    return "SKIP222"
def SKIP222():
    return 62700
def line_62700():
    global _zeroflag
    global VAR_II
    global CONST_127
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=VAR_II
    X_REG=X_REG+Y_REG
    Y_REG=CONST_127
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP223"
    return "SKIP223"
def NSKIP223():
    global CONST_11
    global VAR_II
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global CONST_1
    global A_REG
    A_REG=VAR_A_STRVAR
    STROUT()
    LINEBREAK()
    B_REG=CONST_11
    VAR_A_STRVAR=B_REG
    Y_REG=CONST_1
    VAR_II=Y_REG
    return "SKIP223"
def SKIP223():
    return 62710
def line_62710():
    global _zeroflag
    global VAR_II
    global VAR_A_STRVAR
    global Y_REG
    global B_REG
    global X_REG
    global CONST_1
    global A_REG
    global VAR_B_STRVAR
    B_REG=VAR_B_STRVAR
    A_REG=VAR_A_STRVAR
    CONCAT()
    VAR_A_STRVAR=A_REG
    B_REG=VAR_B_STRVAR
    LEN()
    Y_REG=VAR_II
    X_REG=X_REG+Y_REG
    VAR_II=X_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 62720
def line_62720():
    global VAR_A_STRVAR
    global A_REG
    A_REG=VAR_A_STRVAR
    STROUT()
    LINEBREAK()
    return "RETURN"
def line_62750():
    return 62752
def line_62752():
    global _zeroflag
    global VAR_TC_int
    global Y_REG
    global X_REG
    global VAR_IL_int
    global CONST_1
    Y_REG=CONST_1
    VAR_TC_int=Y_REG
    VAR_TC_int=int(VAR_TC_int)
    Y_REG=CONST_1
    X_REG=VAR_IL_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP224"
    return "SKIP224"
def NSKIP224():
    return 62795
    return "SKIP224"
def SKIP224():
    return 62755
def line_62755():
    global VAR_I
    global _stack
    global Y_REG
    global X_REG
    global VAR_IL_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IL_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP58","VAR_I")
    return "FORLOOP58"
def FORLOOP58():
    global VAR_I
    global VAR_P
    global _zeroflag
    global G_REG
    global Y_REG
    global VAR_IC_int
    global VAR_FF_int
    global B_REG
    global X_REG
    global VAR_RI_STRVAR_array
    global CONST_1
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_RI_STRVAR_array
    ARRAYACCESS_STRING()
    B_REG=A_REG
    VAL()
    VAR_P=X_REG
    Y_REG=CONST_1
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    Y_REG=CONST_1
    X_REG=VAR_IC_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP225"
    return "SKIP225"
def NSKIP225():
    return 62775
    return "SKIP225"
def SKIP225():
    return 62760
def line_62760():
    global VAR_II
    global _stack
    global Y_REG
    global VAR_IC_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_IC_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP59","VAR_II")
    return "FORLOOP59"
def FORLOOP59():
    global VAR_P
    global _zeroflag
    global VAR_II
    global G_REG
    global Y_REG
    global VAR_IV_int_array
    global X_REG
    global CONST_1
    X_REG=VAR_II
    G_REG=VAR_IV_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=VAR_P
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP226"
    return "SKIP226"
def NSKIP226():
    global VAR_II
    global Y_REG
    global VAR_IC_int
    global VAR_FF_int
    global CONST_2
    Y_REG=CONST_2
    VAR_FF_int=Y_REG
    VAR_FF_int=int(VAR_FF_int)
    Y_REG=VAR_IC_int
    VAR_II=Y_REG
    return "SKIP226"
def SKIP226():
    return 62770
def line_62770():
    global _zeroflag
    global Y_REG
    global VAR_FF_int
    global X_REG
    global CONST_1
    global A_REG
    global CONST_2
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_2
    X_REG=VAR_FF_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP227"
    return "SKIP227"
def NSKIP227():
    return 62790
    return "SKIP227"
def SKIP227():
    return 62775
def line_62775():
    global VAR_P
    global _zeroflag
    global VAR_RS_int_array
    global G_REG
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    X_REG=VAR_P
    G_REG=VAR_RS_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_2
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP228"
    return "SKIP228"
def NSKIP228():
    return 62790
    return "SKIP228"
def SKIP228():
    return 62780
def line_62780():
    global VAR_P
    global G_REG
    global _stack
    global VAR_TC_int
    global Y_REG
    global VAR_IP_int_array
    global X_REG
    global CONST_2
    Y_REG=VAR_TC_int
    _stack.append(Y_REG)
    X_REG=_stack.pop()
    Y_REG=VAR_P
    G_REG=VAR_IP_int_array
    ARRAYSTORE_INTEGER()
    Y_REG=CONST_2
    X_REG=VAR_TC_int
    X_REG=X_REG+Y_REG
    VAR_TC_int=X_REG
    VAR_TC_int=int(VAR_TC_int)
    return 62790
def line_62790():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_I")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 62795
def line_62795():
    GOSUB("GOSUBCONT152")
    return 41300
def GOSUBCONT152():
    return "RETURN"
def line_62900():
    return 62905
def line_62905():
    global VAR_XC_int
    global _zeroflag
    global VAR_EL_int
    global Y_REG
    global X_REG
    global CONST_1
    Y_REG=CONST_1
    VAR_XC_int=Y_REG
    VAR_XC_int=int(VAR_XC_int)
    Y_REG=CONST_1
    X_REG=VAR_EL_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP229"
    return "SKIP229"
def NSKIP229():
    return "RETURN"
    return "SKIP229"
def SKIP229():
    return 62910
def line_62910():
    global VAR_I
    global VAR_EL_int
    global _stack
    global Y_REG
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_I=Y_REG
    Y_REG=CONST_2
    X_REG=VAR_EL_int
    X_REG=X_REG-Y_REG
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP60","VAR_I")
    return "FORLOOP60"
def FORLOOP60():
    global VAR_I
    global VAR_LK_int_array
    global _zeroflag
    global G_REG
    global Y_REG
    global X_REG
    global VAR_P_int
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    VAR_P_int=Y_REG
    VAR_P_int=int(VAR_P_int)
    X_REG=VAR_I
    G_REG=VAR_LK_int_array
    ARRAYACCESS_INTEGER()
    Y_REG=CONST_1
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP230"
    return "SKIP230"
def NSKIP230():
    return 62940
    return "SKIP230"
def SKIP230():
    return 62920
def line_62920():
    global VAR_II
    global _stack
    global Y_REG
    global VAR_P_int
    global CONST_4
    global CONST_1
    global CONST_2
    Y_REG=CONST_1
    VAR_P_int=Y_REG
    VAR_P_int=int(VAR_P_int)
    Y_REG=CONST_1
    VAR_II=Y_REG
    Y_REG=CONST_4
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP61","VAR_II")
    return "FORLOOP61"
def FORLOOP61():
    global VAR_II
    global VAR_LX_STRVAR_array
    global G_REG
    global _stack
    global VAR_RD_int
    global CONST_24
    global Y_REG
    global VAR_TX_STRVAR
    global X_REG
    global A_REG
    Y_REG=VAR_II
    X_REG=int(Y_REG)
    Y_REG=CONST_24
    X_REG=X_REG*Y_REG
    _stack.append(X_REG)
    Y_REG=VAR_RD_int
    X_REG=int(Y_REG)
    Y_REG=_stack.pop()
    X_REG=X_REG+Y_REG
    G_REG=VAR_LX_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_TX_STRVAR=A_REG
    GOSUB("GOSUBCONT153")
    return 63100
def GOSUBCONT153():
    global VAR_TX_STRVAR
    global B_REG
    global VAR_A1_STRVAR
    B_REG=VAR_TX_STRVAR
    VAR_A1_STRVAR=B_REG
    return 62925
def line_62925():
    global VAR_I
    global G_REG
    global VAR_EX_STRVAR_array
    global VAR_TX_STRVAR
    global X_REG
    global A_REG
    X_REG=VAR_I
    G_REG=VAR_EX_STRVAR_array
    ARRAYACCESS_STRING()
    VAR_TX_STRVAR=A_REG
    GOSUB("GOSUBCONT154")
    return 63100
def GOSUBCONT154():
    global _zeroflag
    global VAR_TX_STRVAR
    global VAR_A2_STRVAR
    global B_REG
    global X_REG
    global VAR_A1_STRVAR
    global CONST_1
    global A_REG
    B_REG=VAR_TX_STRVAR
    VAR_A2_STRVAR=B_REG
    B_REG=VAR_A2_STRVAR
    A_REG=VAR_A1_STRVAR
    SEQ()
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP231"
    return "SKIP231"
def NSKIP231():
    global VAR_II
    global CONST_55
    global Y_REG
    global VAR_P_int
    global CONST_2
    Y_REG=CONST_2
    VAR_P_int=Y_REG
    VAR_P_int=int(VAR_P_int)
    Y_REG=CONST_55
    VAR_II=Y_REG
    return "SKIP231"
def SKIP231():
    return 62930
def line_62930():
    global _zeroflag
    global Y_REG
    global X_REG
    global VAR_P_int
    global CONST_1
    global A_REG
    NEXT("VAR_II")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    Y_REG=CONST_1
    X_REG=VAR_P_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP232"
    return "SKIP232"
def NSKIP232():
    return 62950
    return "SKIP232"
def SKIP232():
    return 62940
def line_62940():
    global VAR_I
    global VAR_XC_int
    global G_REG
    global _stack
    global VAR_XN_STRVAR_array
    global VAR_EX_STRVAR_array
    global Y_REG
    global X_REG
    global VAR_XX_STRVAR_array
    global VAR_XP_STRVAR_array
    global CONST_2
    Y_REG=VAR_XC_int
    _stack.append(Y_REG)
    X_REG=VAR_I
    G_REG=VAR_EX_STRVAR_array
    ARRAYACCESS_STRING()
    X_REG=_stack.pop()
    G_REG=VAR_XP_STRVAR_array
    ARRAYSTORE_STRING()
    Y_REG=VAR_XC_int
    _stack.append(Y_REG)
    X_REG=VAR_I
    G_REG=VAR_XN_STRVAR_array
    ARRAYACCESS_STRING()
    X_REG=_stack.pop()
    G_REG=VAR_XX_STRVAR_array
    ARRAYSTORE_STRING()
    Y_REG=CONST_2
    X_REG=VAR_XC_int
    X_REG=X_REG+Y_REG
    VAR_XC_int=X_REG
    VAR_XC_int=int(VAR_XC_int)
    return 62950
def line_62950():
    global _zeroflag
    global CONST_1
    global A_REG
    NEXT("VAR_I")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return "RETURN"
def line_63000():
    return 63002
def line_63002():
    global _zeroflag
    global VAR_PY_int
    global Y_REG
    global CONST_1
    Y_REG=VAR_PY_int
    _zeroflag=(0 if Y_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP233"
    return "SKIP233"
def NSKIP233():
    return "RETURN"
    return "SKIP233"
def SKIP233():
    return 63005
def line_63005():
    global CONST_116
    global _memory
    global X_REG
    global VAR_II_int
    global VAR_I_int
    X_REG=int(_memory[211]) & 255;
    VAR_I_int=X_REG
    VAR_I_int=int(VAR_I_int)
    X_REG=int(_memory[214]) & 255;
    VAR_II_int=X_REG
    VAR_II_int=int(VAR_II_int)
    _memory[646]=int(CONST_116) & 255;
    return 63010
def line_63010():
    global VAR_P
    global _stack
    global Y_REG
    global CONST_144
    global CONST_143
    global CONST_2
    Y_REG=CONST_143
    VAR_P=Y_REG
    Y_REG=CONST_144
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP62","VAR_P")
    return "FORLOOP62"
def FORLOOP62():
    global VAR_P
    global _zeroflag
    global CONST_116
    global Y_REG
    global _memory
    global CONST_1
    global A_REG
    Y_REG=VAR_P
    _memory[int(Y_REG)]=int(CONST_116) & 255
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 63015
def line_63015():
    global VAR_P
    global _stack
    global Y_REG
    global CONST_145
    global CONST_146
    global CONST_2
    Y_REG=CONST_145
    VAR_P=Y_REG
    Y_REG=CONST_146
    _stack.append(Y_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP63","VAR_P")
    return "FORLOOP63"
def FORLOOP63():
    global VAR_P
    global _zeroflag
    global Y_REG
    global _memory
    global CONST_147
    global CONST_1
    global A_REG
    Y_REG=VAR_P
    _memory[int(Y_REG)]=int(CONST_147) & 255
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    return 63030
def line_63030():
    global Y_REG
    global CONST_149
    global CONST_148
    global VAR_RL_STRVAR
    global A_REG
    Y_REG=CONST_148
    CHR()
    STROUT()
    Y_REG=CONST_149
    CHR()
    STROUT()
    A_REG=VAR_RL_STRVAR
    STROUT()
    return 63035
def line_63035():
    global _stack
    global VAR_A_STRVAR
    global Y_REG
    global VAR_PO_int
    global B_REG
    global X_REG
    global CONST_9
    global VAR_RL_STRVAR
    global A_REG
    Y_REG=VAR_PO_int
    STR()
    VAR_A_STRVAR=A_REG
    B_REG=VAR_A_STRVAR
    LEN()
    _stack.append(X_REG)
    B_REG=VAR_RL_STRVAR
    LEN()
    Y_REG=X_REG
    X_REG=CONST_9
    X_REG=X_REG-Y_REG
    Y_REG=_stack.pop()
    X_REG=X_REG-Y_REG
    Y_REG=X_REG
    SPC()
    A_REG=VAR_A_STRVAR
    STROUT()
    LINEBREAK()
    return 63036
def line_63036():
    global CONST_12
    global Y_REG
    global _memory
    global CONST_150
    Y_REG=CONST_150
    CHR()
    STROUT()
    LINEBREAK()
    _memory[646]=int(CONST_12) & 255;
    return 63040
def line_63040():
    global _memory
    global X_REG
    global VAR_II_int
    global VAR_I_int
    global CONST_1
    X_REG=VAR_II_int
    _memory[781]=int(X_REG) & 255;
    X_REG=VAR_I_int
    _memory[782]=int(X_REG) & 255;
    _memory[783]=int(CONST_1) & 255;
    SYSCALL("$fff0()")
    return "RETURN"
def line_63100():
    return 63105
def line_63105():
    global _zeroflag
    global Y_REG
    global VAR_TX_STRVAR
    global VAR_C_int
    global B_REG
    global X_REG
    global CONST_1
    B_REG=VAR_TX_STRVAR
    LEN()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    Y_REG=CONST_1
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP234"
    return "SKIP234"
def NSKIP234():
    return "RETURN"
    return "SKIP234"
def SKIP234():
    return 63106
def line_63106():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global X_REG
    global CONST_1
    global CONST_2
    Y_REG=CONST_2
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG==Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP235"
    return "SKIP235"
def NSKIP235():
    return 63180
    return "SKIP235"
def SKIP235():
    return 63110
def line_63110():
    global CONST_11
    global _stack
    global Y_REG
    global VAR_TX_STRVAR
    global VAR_PP
    global B_REG
    global VAR_SX_STRVAR
    global CONST_2
    B_REG=CONST_11
    VAR_SX_STRVAR=B_REG
    Y_REG=CONST_2
    VAR_PP=Y_REG
    B_REG=VAR_TX_STRVAR
    LEN()
    _stack.append(X_REG)
    Y_REG=CONST_2
    _stack.append(Y_REG)
    INITFOR("FORLOOP64","VAR_PP")
    return "FORLOOP64"
def FORLOOP64():
    return 63120
def line_63120():
    global D_REG
    global VAR_TX_STRVAR
    global C_REG
    global VAR_C_int
    global VAR_PP
    global B_REG
    global X_REG
    global A_REG
    global CONST_2
    C_REG=VAR_PP
    D_REG=CONST_2
    B_REG=VAR_TX_STRVAR
    MID()
    B_REG=A_REG
    ASC()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return 63130
def line_63130():
    GOSUB("GOSUBCONT155")
    return 63250
def GOSUBCONT155():
    return 63150
def line_63150():
    global Y_REG
    global VAR_C_int
    global B_REG
    global VAR_SX_STRVAR
    global A_REG
    Y_REG=VAR_C_int
    CHR()
    B_REG=A_REG
    A_REG=VAR_SX_STRVAR
    CONCAT()
    VAR_SX_STRVAR=A_REG
    return 63160
def line_63160():
    global _zeroflag
    global VAR_TX_STRVAR
    global B_REG
    global VAR_SX_STRVAR
    global CONST_1
    global A_REG
    NEXT("0")
    _zeroflag=(0 if A_REG==CONST_1 else 1)
    if _zeroflag==0:
        return "($JUMP)"
    B_REG=VAR_SX_STRVAR
    VAR_TX_STRVAR=B_REG
    return "RETURN"
def line_63180():
    global VAR_TX_STRVAR
    global VAR_C_int
    global B_REG
    global X_REG
    B_REG=VAR_TX_STRVAR
    ASC()
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return 63190
def line_63190():
    GOSUB("GOSUBCONT156")
    return 63250
def GOSUBCONT156():
    return 63210
def line_63210():
    global Y_REG
    global VAR_TX_STRVAR
    global VAR_C_int
    global A_REG
    Y_REG=VAR_C_int
    CHR()
    VAR_TX_STRVAR=A_REG
    return "RETURN"
def line_63250():
    return 63260
def line_63260():
    global _zeroflag
    global CONST_123
    global Y_REG
    global VAR_C_int
    global X_REG
    global CONST_1
    Y_REG=CONST_123
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP236"
    return "SKIP236"
def NSKIP236():
    global Y_REG
    global VAR_C_int
    global CONST_85
    global X_REG
    Y_REG=CONST_85
    X_REG=VAR_C_int
    X_REG=X_REG-Y_REG
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return "SKIP236"
def SKIP236():
    return 63270
def line_63270():
    global _zeroflag
    global Y_REG
    global VAR_C_int
    global CONST_89
    global X_REG
    global CONST_1
    Y_REG=CONST_89
    X_REG=VAR_C_int
    X_REG= (-1 if X_REG>Y_REG else 0)
    _zeroflag=(0 if X_REG==CONST_1 else 1)
    if _zeroflag==1:
        return "NSKIP237"
    return "SKIP237"
def NSKIP237():
    global Y_REG
    global VAR_C_int
    global CONST_86
    global X_REG
    Y_REG=CONST_86
    X_REG=VAR_C_int
    X_REG=X_REG-Y_REG
    VAR_C_int=X_REG
    VAR_C_int=int(VAR_C_int)
    return "SKIP237"
def SKIP237():
    return 63280
def line_63280():
    return "RETURN"
def line_63300():
    return 63310
def line_63310():
    global CONST_12
    global CONST_57
    global Y_REG
    global _memory
    global CONST_151
    global CONST_1
    Y_REG=CONST_57
    CHR()
    STROUT()
    Y_REG=CONST_151
    CHR()
    STROUT()
    LINEBREAK()
    _memory[53280]=int(CONST_1) & 255;
    _memory[53281]=int(CONST_1) & 255;
    _memory[646]=int(CONST_12) & 255;
    return 63320
def line_63320():
    return "RETURN"
def line_63400():
    END()
    return
# *** SUBROUTINES ***
restart = False
running = True
keyPressed = None
lineNumber = 0
timeOut=0
funcName = "PROGRAMSTART"
tymp=0
status=0
maxRowLength=40
_files = dict()
_fileTypes = dict()
_colormap={
    0: 30,   
    1: 37,   
    2: 31,   
    3: 36,   
    4: 35,   
    5: 32,   
    6: 34,   
    7: 33,  
    8: 33,  
    9: 33,   
    10: 95, 
    11: 90, 
    12: 90, 
    13: 92, 
    14: 94,  
    15: 37
}

def screenout(txt):
    global maxRowLength
    lines = txt.split("\n")
    for line in lines:
        if len(line)>maxRowLength+1:
            for i in range(0, len(line), maxRowLength):
                print(convertStringForOutput(cleanBrackets(line[i:i+maxRowLength]), True))
        else:
            print(convertStringForOutput(cleanBrackets(line), True))

def getMemory():
    global _memory
    return _memory
    
def signum(value):
    if value < 0:
        return -1
    if value > 0:
        return 1
    return 0
    
def isNumber(var):
    if isinstance(var, (int, float)):
        return True
    if len(var)==0:
        return False
    try:
        val = float(var)
        return True
    except ValueError:
        return False


def registerKey():
    global keyPressed
    global _memory
    k = keyboard.read_key()
    keyPressed=k
    _memory[198]=1

def execute():
    global running
    global restart
    while True:
        reinit()
        while running:
            executeLine()
        if not restart:
            break

def reinit():
    global running
    global restart
    global lineNumer
    global funcName
    lineNumber = 0
    funcName = "PROGRAMSTART"
    restart=False
    running=True

def executeLine():
    global JUMP_TARGET
    global lineNumber
    global running
    global funcName
    nextLine = globals()[funcName]()
    if nextLine != None:
        lineNumber = nextLine
        if lineNumber == "($JUMP)":
            lineNumber = JUMP_TARGET
        if isNumber(lineNumber):
            funcName = "line_" + str(lineNumber)
        else:
            funcName = lineNumber
    else:
        running = False

def START():
    global _memory
    INIT()
    _memory[646]=14

def RUN():
    global running
    global restart
    running=False
    restart=True

def RESTARTPRG():
    global running
    global restart
    running=False
    restart=True

def END():
    global _line
    if len(_line)>0:
        screenout(_line)

def CLEARQUEUE():
    global _inputQueue
    _inputQueue=[]

def QUEUESIZE():
    global _inputQueue
    global X_REG
    X_REG=len(_inputQueue)

def EXTRAIGNORED():
    out("?extra ignored!")

def INPUTNUMBER():
    global Y_REG
    global X_REG
    inp=input()
    if isNumber(inp):
        Y_REG=float(inp)
        X_REG=0
    else:
        X_REG=-1

def INPUTSTR():
    global A_REG
    A_REG=input()

def GETSTR():
    global A_REG
    A_REG=get()

def GETNUMBER():
    global Y_REG
    fk=get()
    if isNumber(fk):
        Y_REG=float(fk)
    else:
        out("?syntax error")


def isNaN(number):
    return math.isnan(number)

def isNumeric(number):
    return isNumber(number)

def parseFloat(number):
    return float(number)

def GOSUB(gosubCont):
    global _forstack
    _forstack.append(gosubCont)
    _forstack.append(0)

def pop(arr):
    return arr.pop()
    
def throw(txt):
    raise Exception(txt)

def RETURN():
    global _forstack
    val = 0
    if len(_forstack)==0:
        throw("RETURN without GOSUB error!")
    while True:
        val = _forstack.pop()
        if val == 1:
            _forstack.pop()
            _forstack.pop()
            _forstack.pop()
            _forstack.pop()
        if val==0:
            break
    val = _forstack.pop()
    return val

def adjustStack(variable):
    global _forstack
    i=len(_forstack)
    while i>0:
        type=_forstack[i-1]
        if type == 0:
            return
        vary = _forstack[i-2]
        addr = _forstack[i-3]
        end = _forstack[i-4]
        step = _forstack[i-5]
        i=i-5
        if vary == variable:
            _forstack=_forstack[0:i]
            return

def INITFOR(addr, variable):
    global _stack
    global _forstack
    adjustStack(variable)
    _forstack.append(_stack.pop())
    _forstack.append(_stack.pop())
    _forstack.append(addr)
    _forstack.append(variable)
    _forstack.append(1)

def NEXT(variable):
    global JUMP_TARGET
    global A_REG
    global _forstack
    found = False
    while True:
        if len(_forstack)==0:
            throw("NEXT without FOR error!")
        type=_forstack.pop()
        if type==0:
            throw("NEXT without FOR error!")
        stvar=_forstack.pop()
        addr=_forstack.pop()
        end=_forstack.pop()
        step=_forstack.pop()
        found = (variable == "0" or variable == stvar)
        if found:
            break
    globals()[stvar]+=step
    vv = globals()[stvar]    
    if (step >= 0 and vv <= end) or (step < 0 and vv >= end):
        _forstack.append(step)
        _forstack.append(end)
        _forstack.append(addr)
        _forstack.append(stvar)
        _forstack.append(1)
        A_REG = 0
        JUMP_TARGET = addr
        return
    A_REG = 1


def ARRAYACCESS_REAL():
    global G_REG
    global X_REG
    X_REG = G_REG[int(X_REG)]
    if X_REG == None:
        X_REG = 0

def ARRAYACCESS_INTEGER():
    global G_REG
    global X_REG
    X_REG = G_REG[int(X_REG)]
    if X_REG == None:
        X_REG = 0
    X_REG=int(X_REG)

def ARRAYACCESS_STRING():
    global G_REG
    global X_REG
    global A_REG
    A_REG = str(G_REG[int(X_REG)])
    if A_REG == None:
        A_REG = ""

def ARRAYSTORE_REAL():
    global G_REG
    global Y_REG
    global X_REG
    G_REG[int(X_REG)] = Y_REG

def ARRAYSTORE_INTEGER():
    global G_REG
    global Y_REG
    global X_REG
    G_REG[int(X_REG)] = int(Y_REG)

def ARRAYSTORE_STRING():
    global G_REG
    global X_REG
    global A_REG
    G_REG[int(X_REG)] = A_REG

def STR():
    global Y_REG
    global A_REG
    A_REG=str(Y_REG)
    if A_REG.endswith(".0"):
        A_REG=A_REG.replace(".0", "")
    if Y_REG>=0:
        A_REG=" "+A_REG

def VAL():
    global B_REG
    global X_REG
    if B_REG==None:
        X_REG=0
        return
    nums = B_REG.replace(" ","")
    num = ""
    for char in nums:
        if char not in "0123456789.-+":
            break
        num+=char
    try:
        X_REG=float(num)
    except:
        X_REG=0

def LEN():
    global B_REG
    global X_REG
    if B_REG == None:
        X_REG = 0
        return
    X_REG=len(B_REG)

def CHR():
    global Y_REG
    global A_REG
    A_REG=chr(int(Y_REG))


def ASC():
    global B_REG
    global X_REG
    if B_REG == None or len(B_REG)==0:
        X_REG=0
        return
    X_REG=ord(B_REG[0])

def POS():
    global X_REG
    global _line
    X_REG=len(_line)

def TAB():
    global Y_REG
    global _line
    tb=int(Y_REG)
    tb-=len(_line)
    for i in range(0,tb):
        _line+=" "

def SPC():
    global Y_REG
    global _line
    tb=int(Y_REG)
    for i in range(0,tb):
        _line+=" "

def FRE():
    global X_REG
    X_REG=65535

def CONCAT():
    global B_REG
    global A_REG
    A_REG=A_REG+B_REG

def CHARAT():
    global D_REG
    D_REG=1
    MID()

def MID():
    global D_REG
    global C_REG
    global B_REG
    global A_REG
    if B_REG == None or C_REG > len(B_REG):
        A_REG=""
        return
    end=C_REG-1 + D_REG
    if D_REG==-1:
        end=len(B_REG)
    A_REG=B_REG[C_REG-1:end]

def LEFT():
    global C_REG
    global B_REG
    global A_REG
    if C_REG > len(B_REG):
        A_REG=B_REG
        return
    if C_REG==0:
        A_REG=""
        return
    A_REG=B_REG[:C_REG]

def RIGHT():
    global C_REG
    global B_REG
    global A_REG
    if C_REG > len(B_REG):
        A_REG=B_REG
        return
    if C_REG==0:
        A_REG=""
        return
    A_REG=B_REG[len(B_REG)-C_REG:]

def SEQ():
    global B_REG
    global X_REG
    global A_REG
    if A_REG == B_REG:
        X_REG=-1
    else: 
        X_REG=0

def SNEQ():
    global B_REG
    global X_REG
    global A_REG
    if A_REG == B_REG:
        X_REG=0
    else: 
        X_REG=-1

def SGT():
    global B_REG
    global X_REG
    global A_REG
    if A_REG > B_REG:
        X_REG=-1
    else: 
        X_REG=0

def SLT():
    global B_REG
    global X_REG
    global A_REG
    if A_REG < B_REG:
        X_REG=-1
    else: 
        X_REG=0

def SGTEQ():
    global B_REG
    global X_REG
    global A_REG
    if A_REG >= B_REG:
        X_REG=-1
    else: 
        X_REG=0

def SLTEQ():
    global B_REG
    global X_REG
    global A_REG
    if A_REG <= B_REG:
        X_REG=-1
    else: 
        X_REG=0

def COMPACT():
    pass

def COMPACTMAX():
    pass

def SYSTEMCALLDYN():
    pass

def APPENDSYSCHAR():
    pass

def INPUTLENGTHCHECK():
    global _zeroflag
    global A_REG
    if A_REG==None or len(A_REG)==0:
        _zeroflag=0
    else:
        _zeroflag = 1

def SETUPMULTIPARS():
    pass

def COPYSTRINGPAR():
    pass

def COPYREALPAR():
    pass

def ADDCOLON():
    pass

def PULLDOWNMULTIPARS():
    pass

def STROUT():
    global A_REG
    out(A_REG)

def QMARKOUT1():
    global _memory
    if _memory[19]!=1:
        out("?")

def CRSRRIGHT():
    out(" ")

def QMARKOUT2():
    out("??")

def REALOUT():
    global X_REG
    out(X_REG)

def INTOUT():
    global X_REG
    out(X_REG)

def CHECKCMD():
    pass

def LINEBREAK():
    out("\n")

def TABOUT():
    out("\t")

def millis():
    return int(time.perf_counter() * 1000)

def WRITETID(value):
    global _timeOffset
    global _time
    _time = millis()
    _timeOffset = int(value[0:2])* 1000 * 60 * 60 + int(value[2:4]) * 1000 * 60 + int(value[4:6]) * 1000

def READTI():
    global _timeOffset
    global _time
    global tmpy
    t=millis()
    t=int((t-_time+_timeOffset)/(1000.0/60.0))
    tmpy=t

def READTID():
    global _timeOffset
    global _time
    global tmpy
    t=millis()
    t=t-_time+_timeOffset
    h=int(t/(1000 * 60 * 60))
    m=int(((t-(h*(1000 * 60 * 60)))/(1000 * 60)))
    s=int((t-(h*(1000 * 60 * 60))-m*(1000 * 60))/1000)
    h=fill(h)
    m=fill(m)
    s=fill(s)
    tmpy= h+m+s

def fill(num):
    num=str(num)
    if len(num)==1:
        num="0"+num
    return num

def READSTATUS():
    global status
    global tmpy
    tmpy=status

def RESTORE():
    global _dataPtr
    _dataPtr=0

def READSTR():
    global _datas
    global _dataPtr
    global A_REG
    A_REG=_datas[_dataPtr]
    _dataPtr+=1

def READNUMBER():
    global Y_REG
    global _datas
    global _dataPtr
    num=_datas[_dataPtr]
    _dataPtr+=1
    
    if isinstance(num, str) and (num == "." or len(num) == 0):
        num=0
    Y_REG=num

def FINX():
    throw("Fast inc optimization not supported for target PY!")

def FDEX():
    throw("Fast dec optimization not supported for target PY!")

def FASTFOR():
    throw("Fast for optimization not supported for target PY!")

def OPEN():
    global _files
    global D_REG
    global G_REG
    global Y_REG
    global C_REG
    global X_REG
    global _fileTypes
    count = int(Y_REG)
    parts = G_REG.split(",") if (count>3 or G_REG.endsWith("r") or G_REG.endsWith("w")) else []
    mode = "r"
    fileName = parts[0] if len(parts)>0 else ""
    secAddr = int(D_REG)
    device = int(C_REG)
    number = int(X_REG)
    if any(p.lower() == "r" for p in parts):
        mode = "r"
    else:
        if any(p.lower() == "w" for p in parts):
            mode = "w"
    if count>2:
        if secAddr==0:
            mode = "r"
        else:
            if secAddr==1:
                mode = "w"
        
    fileName = fileName.split(":")[-1]
        
    key = getFileKey(number)
    _fileTypes[key]="s"
    if mode=="r":
        _fileTypes[key]="p"
    if "s" in parts:
        _fileTypes[key]="s"
    if "p" in parts:
        _fileTypes[key]="p"
        
    if secAddr==15:
        diskOperation(fileName)
        _files[key]="command channel"
        return
    
    fileHandle = _files.get(key)
    if fileHandle != None:
        throw("File already open error!")
    if mode=="r":
        if not os.path.exists(fileName):
            fileName = convertStringForOutput(fileName) # try flipped
    fileHandle = open(fileName, mode+"b")
    _files[key]=fileHandle

def CLOSE():
    global _files
    global X_REG
    key = getFileKey(X_REG)
    fileHandle = _files.get(key)
    if fileHandle == None:
        throw("File not open error: "+key)
    if fileHandle!="command channel":
        fileHandle.close()
    _files.pop(key)

def CMD():
    out("[CMD not supported for PY, call ignored!]")

def diskOperation(fileName):
    pass

def readChar(fileHandle, mode="s"):
    global status
    status = 0
    char = fileHandle.read(1)
    if not char:
        status = 64
        return ""
    chs = fileHandle.read(1)
    if not chs or len(chs) == 0:
        status = 64
    fileHandle.seek(-1, 1)
    if mode=="s":
        char = char.decode("ascii")
        if ord(char)==10:
            char = chr(13)
        return convertChar(char)
    return char[0].to_bytes(1, byteorder='big').decode('latin-1')

def REM():
    out("[inline assembly ignored!]")

def LOCKCHANNEL():
    pass

def UNLOCKCHANNEL():
    pass

def writeStringIntoFile(fileHandle, txt):
    fileHandle.write(txt.replace("\n","\r").encode('ascii'))

def STROUTCHANNEL():
    global _files
    global C_REG
    global A_REG
    fileHandle = openFile(C_REG)
    writeStringIntoFile(fileHandle, convertString(A_REG)) 

def REALOUTCHANNEL():
    global _files
    global C_REG
    global X_REG
    fileHandle = openFile(C_REG)
    writeStringIntoFile(fileHandle, str(X_REG)) 

def LINEBREAKCHANNEL():
    global A_REG
    A_REG="\n"
    STROUTCHANNEL()

def INTOUTCHANNEL():
    global _files
    global C_REG
    global X_REG
    fileHandle = openFile(C_REG)
    writeStringIntoFile(fileHandle, str(X_REG)) 

def INPUTNUMBERCHANNEL():
    global Y_REG
    global X_REG
    global A_REG
    INPUTSTRCHANNEL()
    X_REG=0
    Y_REG=0
    if A_REG=="ok":
        X_REG=0
        Y_REG=0
        return
    if not isNumeric(A_REG):
        X_REG=-1
        return
    if A_REG!="":
        Y_REG=float(A_REG)
        X_REG=0

def openFile(number):
    key = getFileKey(number)
    fileHandle = _files.get(key)
    if fileHandle == None:
        throw("File not open error: "+key)
    return fileHandle

def getFileKey(number):
    return "file"+str(int(number))

def INPUTSTRCHANNEL():
    global _files
    global status
    global C_REG
    global _fileTypes
    global A_REG
    fileHandle = openFile(C_REG)
    key = getFileKey(C_REG)
    if fileHandle=="command channel":
        A_REG="ok"
        return
    A_REG=""
    stops = "\n\r:,"
    while True:
        char = readChar(fileHandle, _fileTypes.get(key))
        if char=="" or char in stops:
            A_REG = A_REG.lstrip()
            return
        A_REG+=char
        if status==64:
            A_REG = A_REG.lstrip()
            return

def GETSTRCHANNEL():
    global _files
    global C_REG
    global _fileTypes
    global A_REG
    fileHandle = openFile(C_REG)
    key = getFileKey(C_REG)
    A_REG = readChar(fileHandle, _fileTypes.get(key))

def GETNUMBERCHANNEL():
    global X_REG
    out("[GET# not supported for PY, call ignored]")
    X_REG=0

def TABOUTCHANNEL():
    out("[TAB not supported for PY in file mode, redirected to normal TAB]")
    TAB()

def SPCOUTCHANNEL():
    out("[SPC not supported for PY in file mode, redirected to normal SPC]")
    SPC()

def TABCHANNEL():
    out("[TAB not supported for PY in file mode, redirected to normal TAB]")
    TAB()

def SPCCHANNEL():
    out("[SPC not supported for PY in file mode, redirected to normal SPC]")
    SPC()

def LOAD():
    out("[LOAD not supported for PY in file mode, call ignored]")

def SAVE():
    out("[SAVE not supported for PY in file mode, call ignored]")

def VERIFY():
    out("[VERIFY not supported for PY in file mode, call ignored]")

def USR():
    global X_REG
    global _memory 
    global USR_PARAM
    addr=_memory[785] + 256*_memory[786]
    USR_PARAM=X_REG
    callStr="$"+hex(addr)
    out("[Calling user function named "+callStr+"]")
    globals()[callStr]()

def SYSCALL(addr):
    pass

def input():
    global _inputQueue
    global _line
    if len(_inputQueue)>0:
        return _inputQueue.pop()
        
    inp=__builtins__.input(_line+" ")
    _line=""
    if inp == None or len(inp)==0:
        return ""
    parts=inp.split(",")
    
    _inputQueue.extend(parts)
    ret = _inputQueue.pop()
    return ret

def get():
    flushOut()
    key = ""
    event = keyboard.read_event(True)
    if event.event_type == keyboard.KEY_UP:
        key = event.name
    return convertCharForOutput(key) if key else key

def flushOut():
    global _line
    if len(_line)>0:
        screenout(_line)
        _line = ""

def cleanBrackets(txt):
    pattern = r'\{.*?\}'
    return re.sub(pattern, '', txt)

def out(txt):
    global _line
    if isinstance(txt, str):
        txt = txt.replace(chr(13), "\n")
    if isinstance(txt, str) and (txt.endswith("\n") or len(txt)==maxRowLength):
        _line += txt[0:len(txt)-1]
        if len(txt)==maxRowLength and not txt.endswith("\n"):
            _line = txt
        screenout(_line)
        _line = ""

    else:
        org=txt
        txt = str(txt)
        if isinstance(org, (float, int)) and org>=0:
            txt=" "+txt
        if txt.endswith(".0"):
            txt=txt.replace(".0", "")
        _line += cleanBrackets(txt)
        #print(_line)

def convertString(txt):
    return txt
    res = []
    for char in txt:
        res.append(convertChar(char))
    return "".join(res)

def convertChar(char):
        return char
        # disabled for now...
        charlow = char.lower()
        if charlow in "abcdefghijklmnopqrstuvwxyz":
            if char.islower():
                return char.upper()
            else:
                return char.lower()
        else:
            return char
            
def convertStringForOutput(txt, addColor=False):
    global _memory
    if not _flipcasing:
        return txt
    res = []
    for char in txt:
        res.append(convertCharForOutput(char))
    txt = "".join(res)
    if addColor:
        txt = f"\033[{_colormap[_memory[646] & 15]}m{txt}\033[0m"
    return txt

def convertCharForOutput(char):
        if not _flipcasing:
            return char
        charlow = char.lower()
        if charlow in "abcdefghijklmnopqrstuvwxyz":
            if char.islower():
                return char.upper()
            else:
                return char.lower()
        else:
            return char


execute()

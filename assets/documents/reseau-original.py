#=============================================================================================================================
#APPRENTISSSAGE DE L ALPHABET X16
#=============================================================================================================================
#Importations des bibliothèques 
from tkinter import * #Création d'une interface
from random import *
import matplotlib.pyplot as plt
from copy import deepcopy
import numpy as np
#=====================
# Lettres prédéfinis
#=====================
#Alphabet défini sous forme de matrice 16*16
alphabet = [   
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False]#A
],     [
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False]#B
],    [
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False]#C
],  [
    [False, False, True, True,True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False]#D
],    [
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False]#E
],     [
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False]#F
] ,    [
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, False, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, False, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, True, True, False, False, False]#G
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False]#H
],    [
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False]#I
],     [
    [False, False, False, False, False, False, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, False, False, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, False, False, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, False, False, False, False, False, False, False]#J
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False]#K
],     [
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False]#L
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False]#M
],     [
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False]#N
],     [
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False]#O
],     [
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False]#P
],     [
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, False, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, False, True, True, True, False, False, False]#Q
],     [
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False]#R
],    [
    [False, False, False, False, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, False, False, False, False, False]#S
],     [
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False]#T
],     [
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False]#U
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, True, True, True, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, True, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, True, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, True, True, True, True, False, False, False, False, False, False, False]#V
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, True, True, True, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False]#W
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, True, True, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False]#X
],     [
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False]#Y
],     [
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, False, False, True, True, True, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, False, False, True, True, True, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, False, False, True, True, True, False, False, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, False, False, False, False, False, False, False, False],
    [False, False, False, False, True, True, True, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, False, False, False, False, False, False, False, False, False, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False],
    [False, False, True, True, True, True, True, True, True, True, True, True, True, False, False, False]#Z
]

#=================================
#Paramètre du réseau de neurones
#=================================
N = 16 # Taille de la matrice (5*5) 
N_cell = N*N # Nombre total de cellules
ep=0.15 # Facteur d'ajustement pour modifier les valeurs TRUE et FALSE et donc poids des connexions
eta_min=0.015 
ep = max(ep, eta_min)
nb=10 # Initialisation du nombre d'erreur pour l'apprentissage
lettre_final =[] # Liste pour stocker la lettre reconnue
max_iterations=100
Solution = 0
k = 2 # Nombre de folds pour la validation croisée
alpha=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

#==========================================
# Initialisation des paramètres du réseaux 
#==========================================
etats2 = [ False for _ in range(N_cell) ]# états des cellules du réseau (booléens)
seuils2 = [ 0.0 for _ in range(N_cell) ]# seuils des cellules du réseau (réels)
poids2 = [ [ 0.5 for _ in range(N_cell)] for _ in range(N_cell) ]# poids des connexions du réseau (réels)
for i in range (N_cell): # Mettre les 0 en diagonale car une cellule ne pas pas s'influencer
    poids2[i][i]=0

#Parametre et initialisation de l'alphabet
alphabet = list(alphabet) if isinstance(alphabet, tuple) else (alphabet)#Mettre alphabet sous liste 
fold_taille = len(alphabet) // k  # Défnir la taille d'un fold


#===================================================================================
#APPRENTISSAGE DU RESEAU DE NEURONES
#===================================================================================
while Solution<4 :
    erreur_evolution = [] #compter le nombre d'erreur
    for fold in range(k):  # Boucle sur les k folds
        print(f"Fold {fold+1}/{k}")
        
        # Séparation des données d'entrainement et de test
        test_set = alphabet[fold * fold_taille:(fold + 1) * fold_taille]
        train_set = alphabet[:fold * fold_taille] + alphabet[(fold + 1) * fold_taille:]
        nb = 0
        iteration = 0
        stagnation_counter = 0
        stagnation_counter2 = 0
        dropout = 0.3   
        prev_nb = 100
        nbnew=0
        while nbnew < 10 and iteration < max_iterations:  # Boucle d'entraînement
            iteration += 1
            # Ajustement dynamique des hyperparamètres
            if nb < 20 and stagnation_counter > 1 and ep > 0.12: 
                ep = 0.10
            if iteration > 30 and nb < 20 and ep < 0.05:
                dropout = 0.35
            if nb > 10:
                stagnation_counter += 1 + stagnation_counter2
                stagnation_counter2 = 0
                if nb < prev_nb - 10:
                    stagnation_counter = 0
                elif stagnation_counter > 2:
                    ep *= 0.97
                    stagnation_counter = 0
            elif nb!=0:
                stagnation_counter2 += 1
                stagnation_counter = 0
                if nb < prev_nb - 2:
                    stagnation_counter2 = 0
                elif stagnation_counter2 > 3:
                    ep *= 0.95
                    stagnation_counter2 = 0
    
            print(f"Fold {fold+1}, Itération {iteration}: erreurs={nb}, ep={ep}, dropout={dropout}")
    
            prev_nb = nb
            nb = 0  # Réinitialisation du nombre d'erreurs
            shuffle(train_set)
    
            # Phase d'apprentissage
            for l in range(len(train_set)):  
                etats2 = train_set[l][0] + train_set[l][1] + train_set[l][2] + train_set[l][3] + train_set[l][4] + train_set[l][5] + train_set[l][6] + train_set[l][7] + train_set[l][8] + train_set[l][9] + train_set[l][10] + train_set[l][11] + train_set[l][12] + train_set[l][13] + train_set[l][14] + train_set[l][15]
                
                if random() < dropout:  
                    for i in range(len(etats2)): # Désactivation aléatoire des neurones
                        if etats2[i] == False : 
                            etats2[i] = True 
                        else : 
                            etats2[i] =False
                    
                for cellule in range (N_cell): # Parcourir toutes les cellules d'une lettre
                    somme = 0 #initialisation de la somme des entrées pondérées pour la cellule
                    for i in range (N_cell): 
                        somme+= poids2[cellule][i]*etats2[i]#Calculer le poids de la cullule
                    somme -= seuils2[cellule] #soustraction du seuil.
    
                    if (somme > 0) != etats2[cellule]:  # Si erreur détectée
                        nb += 1
                        n = etats2.count(True) - etats2[cellule]  
                        delta = (somme + ep) / (n + 1) if somme > 0 else (somme - ep) / (n + 1)
    
                        # Mise à jour des poids
                        for i in range(N_cell):
                            if etats2[i] and i != cellule:
                                poids2[cellule][i] = 0.99 * poids2[cellule][i] - delta
                                poids2[i][cellule] = 0.99 * poids2[i][cellule] - delta
                        
                        seuils2[cellule] += delta  # Mise à jour des seuils
            erreur_evolution.append(nb)
            if nb == 0:
                nbnew += 1
            else:
                nbnew = 0
    
        # Phase de test
        test_errors = 0
        for l in range(len(test_set)):  
            etats2 = test_set[l][0] + test_set[l][1] + test_set[l][2] + test_set[l][3] + test_set[l][4] + test_set[l][5] + test_set[l][6] + test_set[l][7] + test_set[l][8] + test_set[l][9] + test_set[l][10] + test_set[l][11] + test_set[l][12] + test_set[l][13] + test_set[l][14] + test_set[l][15]
    
            for cellule in range(N_cell):  
                somme = sum(poids2[cellule][i] * etats2[i] for i in range(N_cell)) - seuils2[cellule]
                if (somme > 0) != etats2[cellule]:  
                    test_errors += 1
        
        if test_errors==0:
            Solution+=1
        
     
    print("Validation croisée terminée.")
 
#===========================================
# STOCKER LES SEUILS ET LES POIDS
#===========================================

#===========================================
# sauvegarder 
#===========================================
np.save("seuils2.npy",seuils2)  
np.save("poids.npy",poids2)      


#===========================================
# telecharger et convertir en liste 
#===========================================
poids3=np.load("poids.npy")
seuils3=np.load("seuils2.npy")

poids = poids3.tolist()
seuils=seuils3.tolist()


#==================================================================================
# RECONNAISSANCE DE LA LETTRE PROPOSEE
#==================================================================================
nombre_de_modification=[0,1,3,5,10,20,40,60] #,4,5,10,15,20]
résultats= []
for modifications in nombre_de_modification : #faire autant de modification qu'on veut 
    #INITIALISATION PARAMETRE
    taux_erreur = [ ]
    etats_precedents = {}
    reconnue = 0
    alphabet2=deepcopy(alphabet)
    for l in range (26): #faire toutes les lettres
        nbe=0#initialisation nbe
        nb3=10 #itialisation du nombre d'erreur 
        iteration=0#compter le nombre d iteration
        nouvelle_alphabet = alphabet2[l][0] + alphabet2[l][1]+ alphabet2[l][2]+alphabet2[l][3]+alphabet2[l][4]+alphabet2[l][5]+alphabet2[l][6]+alphabet2[l][7]+alphabet2[l][8]+alphabet2[l][9]+alphabet2[l][10]+alphabet2[l][11]+alphabet2[l][12]+alphabet2[l][13]+alphabet2[l][14]+alphabet2[l][15]
        alphabet_propre=nouvelle_alphabet.copy()
        mémoire =[alphabet]#Itialisation d'une sorte de mémoire qui permet de revenir en arriere 
        for i in range (modifications) : #faire des modifications
                cellules_true = [idx for idx, val in enumerate(nouvelle_alphabet) if val] #compter le nombre de TRUE
                cellule_base = choice(cellules_true)  # Prendre un True
                cellule_a_modifier = cellule_base + choice([-1, 1])  # Modifier un voisin
                cellule_a_modifier = max(0, min(len(nouvelle_alphabet) - 1, cellule_a_modifier))  # Éviter les dépassements
                nouvelle_alphabet[cellule_a_modifier] = not nouvelle_alphabet[cellule_a_modifier] #Changer l'etat de la cellule
        while nb3!=0 and iteration <300 : #reconnaissance       
            nb3=0
            copie_avant=nouvelle_alphabet.copy()#copier nouvelle_alphabet
            mémoire.append(nouvelle_alphabet.copy()) #garder l'etat en mémoire
            etat_tuple = tuple(nouvelle_alphabet)
            if etat_tuple in etats_precedents and nouvelle_alphabet!=alphabet_propre: #si etat etait deja present et que la lettre n'est pas la bonne retournée à l'etat de base 
                etats_precedents[etat_tuple] += 1
            else:
                etats_precedents[etat_tuple] = 1
            # Si un cycle est détecté plus de 2 fois, réinitialiser les changements executé
            if etats_precedents[etat_tuple] > 1:
                nouvelle_alphabet=alphabet_propre.copy()
                for i in range (modifications) : #faire des modifications
                    cellules_true = [idx for idx, val in enumerate(nouvelle_alphabet) if val] #compter le nombre de valeur true 
                    cellule_base = choice(cellules_true)  # Prendre un des True
                    cellule_a_modifier = cellule_base + choice([-1, 1])  # Modifier un voisin
                    cellule_a_modifier = max(0, min(len(nouvelle_alphabet) - 1, cellule_a_modifier))  # Éviter les dépassements
                    nouvelle_alphabet[cellule_a_modifier] = not nouvelle_alphabet[cellule_a_modifier] #modifier un voisin 
            for cellule in range (N_cell) :
                somme = 0                     
                for x in range (N_cell): #Calcul somme de la cellule
                        somme+= poids[cellule][x]*nouvelle_alphabet[x]
                somme -= seuils[cellule] 
                if somme>0 : #Changer la cellule de valeur selon la somme total de la cellule
                    nouvelle_alphabet[cellule] = True 
                else : 
                    nouvelle_alphabet[cellule]= False
            iteration+=1
            if nouvelle_alphabet != copie_avant and nouvelle_alphabet!=alphabet_propre:    #si correspond pas augmentation nombre d'erreur  
               nb3 += 1 
               nbe +=1
               if iteration>1 : 
                   nouvelle_alphabet=mémoire[iteration-1]
            if nouvelle_alphabet==alphabet_propre : #Si la lettre correspond à l'alphabet stopper reconnaissance
                reconnue+=1
                break
       
        taux_erreur.append(nbe)   
    #graphique du nombre d'erreur par lettre.
    plt.bar(alpha, taux_erreur,  color='b')#marker='o', linestyle='-',
    plt.xlabel("Lettres")
    plt.ylabel("Nombre d'erreur")
    plt.title("taux d erreur par lettre pour les differentes modifications")
    plt.grid()
    plt.show()
    
    résultats.append(reconnue)

for i,modif in enumerate(nombre_de_modification):#permet d'ecrire les résultats sous forme écrite
    print (f"Nombre de modifications : {modif} -> Lettres reconnues : {résultats[i]}")
#===============================================================
# Graphique du nombre de lettre reconnue par modification 
#===============================================================
plt.plot(nombre_de_modification, résultats,marker='o', linestyle='-', color='r')
plt.xlabel("Nombre de modifications")
plt.ylabel("Nombre de lettres reconnues")
plt.title("Reconnaissance des lettres après modifications")
plt.grid()
plt.show()

#===========================================================================================================================
#INTERFACE HM POUR RECONNAITRE N'IMPORTE QUELLE LETTRE PRESENTEE
#===========================================================================================================================

#=========================================
# Initialisation de l'interface Tkinter
#=========================================

test = Tk()
test.title("Reconnaissance de lettres")# Titre 
test.attributes('-fullscreen',True)# Pleine ecran

#Création du cadre principal
frame_principal = Frame(test)
frame_principal.pack(side="top", fill="both", expand=True, padx=100, pady=100)

# Creation des tableaux pour les lettres
canvas = Canvas(frame_principal, width=200, height=200) #Zone de dessin
canvas.pack(side='left',fill='both',expand=True,padx=20,pady=20)

canvas_resultat = Canvas(frame_principal, width=200, height=200) #Zone : résultat reconnaissance
canvas_resultat.pack(side="right", fill="both", expand=True,padx=20, pady=20)

#==================================================================================
# FONCTIONS POUR DESSINER SUR LE CADRE LES LETTRES 
#=================================================================================="

#==================================================================================
# Fonction pour dessiner sur la grille en alternant entre noir et blanc
#==================================================================================

def dessiner(i, j):
    couleur_actuel = canvas.itemcget(cell[i][j], 'fill') #remplire la case d'une couleur
    if couleur_actuel == 'White': #Alterner les couleurs selon la couleur initiale
        Nouvel_couleur='Black'
    else :
        Nouvel_couleur ='White'
    canvas.itemconfig(cell[i][j], fill=Nouvel_couleur)# Change couleur de la cellule

# Fonction pour récupérer le dessin sous forme de matrice de booléens donc TRUE et FALSE

def matrice():
    dessin = []#stocker le dessin
    for i in range(16):
        for j in range(16):
            color = canvas.itemcget(cell[i][j], 'fill')#recuperer couleur de chaque cellule
            dessin.append(True if color == 'Black' else False) #sI noire = false; si blanc = True
    recognize_letter(dessin)# lancer reconnaissance de la lettre
    return (dessin)

#=========================================
#CREATION DES GRILLES
#=========================================

#=========================================
# Création de la grille pour dessiner
#=========================================
cell = []
for i in range(16):
    ligne = []
    for j in range(16):
        rect = canvas.create_rectangle(j*50, i*50, (j+1)*50, (i+1)*50, fill='White', outline='Black')#dessiner chaque cellule
        canvas.tag_bind(rect, '<Button-1>', lambda event, i=i, j=j: dessiner(i, j)) #lier clic à la fonction dessiner
        ligne.append(rect)
    cell.append(ligne)


#=========================================
#creation de la grille pour afficher le resultat
#=========================================
cell_resultat = []
for i in range(16):
    ligne = []
    for j in range(16):
        rect = canvas_resultat.create_rectangle(j*50, i*50, (j+1)*50, (i+1)*50, fill='White', outline='Black')
        ligne.append(rect)
    cell_resultat.append(ligne)
    

#==================================================================================
# RECONNAISSANCE DE LA LETTRE 
#==================================================================================

#=========================================
#Fonction de base de reconaissance
#=========================================
def recognize_letter(dessin): #Fonction reconnaissance de la lettre identique au dessus
    nb2= 10
    while nb2!=0 :
        nb2=0
        dessin_copy = dessin.copy()
        for cellule in range (N_cell):
            somme = 0
            for y in range (N_cell):
                somme+= poids[cellule][y]*dessin[y]
            somme -= seuils[cellule]
            if somme>0 :
                dessin[cellule] = True
            else : 
                dessin[cellule]= False
        if dessin != dessin_copy:
          nb2 += 1 
    dessiner_resultat(dessin)

#=========================================
# Fonction pour afficher le résultat sur la grille 
#=========================================
def dessiner_resultat(dessin):
    for i in range (16):
        for j in range (16):
            if dessin [i * 16 + j]:
                couleur ='Black'
            else : 
                couleur = 'White'
            canvas_resultat.itemconfig(cell_resultat[i][j], fill=couleur)

#=========================================
# Fonction pour initialiser une lettre 
#=========================================
def initialiser_lettre_aleatoire():
    lettre_aleatoirebis = choice(alphabet)
    lettre_aleatoire=[cell for row in lettre_aleatoirebis for cell in row]# alphabet = liste des lettres stockées sous forme de matrices 16x16
    
    for i in range(16):
        for j in range(16):
            if lettre_aleatoire[i * 16 + j]:  # Noir si True, blanc sinon
                couleur = 'Black'
            else:
                couleur = 'White'
            canvas.itemconfig(cell[i][j], fill=couleur)
            
            
#==================================================================================
#BOUTONS UTILE DANS L INTERFACE
#==================================================================================

#=========================================
# Bouton pour initialiser une lettre 
#=========================================
bouton_initialiser = Button(test, text="Lettre Aléatoire", command=initialiser_lettre_aleatoire)
bouton_initialiser.pack()

#=========================================
# Bouton pour lancer la reconnaissance
#=========================================
bouton =Button(test, text="Reconnaître", command=matrice)
bouton.pack()

#=========================================
# Lancement de l'interface graphique
#=========================================
test.mainloop()
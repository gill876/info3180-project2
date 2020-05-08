from flask import Flask, request, redirect
import requests
from flask_wtf.csrf import CSRFProtect
import os
from flask_sqlalchemy import SQLAlchemy
import hashlib

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Fd?d8+T_9LjRGyyM-7&hTwejt!+tDTayFgEnqu?wWAcd-7+RL5sFkveTx8ExSbaUP2#3f'
app.config['UPLOAD_FOLDER'] = './app/static/uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/project2_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SALT'] = 'r?fPfnryZfJ=M*aQxz$h2_F#!X@YR9nEB&f^SU3qRkVTt3WeP528BRYGthRZ7@8hT4Wqh'
db = SQLAlchemy(app)

csrf = CSRFProtect(app)

from app import views, models

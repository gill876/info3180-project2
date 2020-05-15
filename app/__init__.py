from flask import Flask, request, redirect
import requests
from flask_wtf.csrf import CSRFProtect
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Fd?d8+T_9LjRGyyM-7&hTwejt!+tDTayFgEnqu?wWAcd-7+RL5sFkveTx8ExSbaUP2#3f'
app.config['UPLOAD_FOLDER'] = './app/static/uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/project2_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SALT'] = 'r?fPfnryZfJ=M*aQxz$h2_F#!X@YR9nEB&f^SU3qRkVTt3WeP528BRYGthRZ7@8hT4Wqh'

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

csrf = CSRFProtect(app)
csrf.init_app(app)

app.config.from_object(__name__)

from app import views, models, forms

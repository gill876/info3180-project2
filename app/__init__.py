import requests
from flask import Flask, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_wtf.csrf import CSRFProtect
import os
from dotenv import load_dotenv
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = '?.jDTL_ge}PeG{v>e7cXeG+64(eLc$D2c53Ku)w'
app.config['UPLOAD_FOLDER'] = './app/static/uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


csrf = CSRFProtect(app)

from app import views, models
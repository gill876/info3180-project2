from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, TextAreaField, PasswordField, IntegerField
from wtforms.validators import DataRequired, Email

class UserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    biography = TextAreaField('biography', validators=[DataRequired()])
    profile_photo = FileField('profile_photo', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'jpeg', 'Images only!'])
    ])

class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])

class PostForm(FlaskForm):
    photo = FileField('photo', validators=[FileRequired(), FileAllowed(['jpg', 'png', 'jpeg', 'Images only!'])])
    caption = TextAreaField('caption', validators=[DataRequired()])

class LikeForm(FlaskForm):
    userid = IntegerField('userid', validators=[DataRequired()])

class FollowForm(FlaskForm):
    following = IntegerField('following', validators=[DataRequired()])
from . import db
import datetime

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(256))
    firstname = db.Column(db.String(80))
    lastname = db.Column(db.String(80))
    email = db.Column(db.String(100))
    location = db.Column(db.String(150))
    biography = db.Column(db.String(500))
    profile_photo = db.Column(db.String(250))
    joined_on = db.Column(db.DateTime, default=datetime.date.today())

    def __init__(self, username, password, firstname, lastname, email, location, biography, profile_photo):
        self.username = username
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.location = location
        self.biography = biography
        self.profile_photo = profile_photo
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)

class Posts(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    photo = db.Column(db.String(250), unique=True)
    caption = db.Column(db.String(300))
    created_on = db.Column(db.DateTime, default=datetime.date.today())

    def __init__(self, user_id, photo, caption):
        self.user_id = user_id
        self.photo = photo
        self.caption = caption
    
    def __repr__(self):
        return '<Post %r>' % (self.id)

class Likes(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)

    def __init__(self, user_id, post_id):
        self.user_id = user_id
        self.post_id = post_id

    def __repr__(self):
        return '<Like %r>' % (self.id)

class Follows(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)

    def __init__(self, user_id, follower_id):
        self.user_id = user_id
        self.follower_id = follower_id
    
    def __repr__(self):
        return '<User %r Follower %r>' % (self.user_id, self.follower_id)
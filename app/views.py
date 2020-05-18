"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app, login_manager
from flask import render_template, request, jsonify, session, g
from flask_login import login_user, logout_user, current_user, login_required
from .forms import UserForm, LoginForm, PostForm
from app.models import Users, Posts, Likes, Follows
from . import db
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
import os
import uuid
import hashlib

# Using JWT
import jwt
from flask import _request_ctx_stack
from functools import wraps
import base64

# Create a JWT @requires_auth decorator
# This decorator can be used to denote that a specific route should check
# for a valid JWT token before displaying the contents of that route.
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None)
    if not auth:
      return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
    elif len(parts) == 1:
      return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
    elif len(parts) > 2:
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

    token = parts[1]
    try:
         payload = jwt.decode(token, app.config['SALT'])

    except jwt.ExpiredSignature:
        return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
    except jwt.DecodeError:
        return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

    g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated


###
# Routing for your application.
###

@app.route('/api/users/register', methods=['POST'])
def register():
    user = UserForm()
    message = [{"errors": "critical error"}]
    if request.method == 'POST':
        user.username.data = request.form['username']
        user.password.data = request.form['password']
        user.firstname.data = request.form['firstname']
        user.lastname.data = request.form['lastname']
        user.email.data = request.form['email']
        user.location.data = request.form['location']
        user.biography.data = request.form['biography']
        user.profile_photo.data = request.files['photo']
        message = [{"errors": form_errors(user)}]
        if user.validate_on_submit():
            username = user.username.data
            password = user.password.data
            firstname = user.firstname.data
            lastname = user.lastname.data
            email = user.email.data
            location = user.location.data
            biography = user.biography.data
            profile_photo = user.profile_photo.data

            filename = genUniqueFileName(profile_photo.filename)
            #(hashlib.sha256(password.encode()).hexdigest())
            userDB = Users(username, password, firstname, lastname, email, location, biography, filename)
            db.session.add(userDB)
            db.session.commit()
            profile_photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            message = [{"message": "Successful Registered!"}]

    message = jsonify(message=message)
    return message

@app.route('/api/auth/login', methods=['POST'])
def login():
    form = LoginForm()
    message = [{"errors": "Invalid request"}]
    if request.method == "POST":
        form.username.data = request.form['username']
        form.password.data = request.form['password']
        message = [{"errors": form_errors(form)}]

        if form.validate_on_submit():
            username = form.username.data
            password = form.password.data
            user = Users.query.filter_by(username=username).first()

            if user is not None and check_password_hash(user.password, password):

                #login_user(user)
                #session['user_id'] = user.id
                #session['user_name'] = user.username

                payload = {'id': user.id, 'username': user.username}
                token = jwt.encode(payload, app.config['SALT'], algorithm='HS256').decode('utf-8')

                return jsonify(data={'token': token}, message="Token Generated and User Logged In")
            else:
                message = [{"errors": "Failed to Log In"}]
    message = jsonify(message=message)
    return message

#@login_required
@app.route('/api/auth/logout', methods=['GET'])
@requires_auth
def logout():
    #logout_user()
    #complete
    #session['user_id'] = None
    user = g.current_user
    return jsonify(data={"user": user}, message="Logged Out")

@app.route('/api/users/<userid>/posts', methods=['POST', 'GET'])
@requires_auth
def userPosts(userid):
    post = PostForm()
    message = [{"errors": "Invalid request"}]
    if request.method == "POST":
        post.caption.data = request.form['caption']
        post.photo.data = request.files['photo']
        message = [{"errors": form_errors(post)}]
        if post.validate_on_submit():
            caption = post.caption.data
            photo = post.photo.data

            filename = genUniqueFileName(photo.filename)

            postDB = Posts(userid, filename, caption)
            db.session.add(postDB)
            db.session.commit()
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            message = [{"message": "Successful Posted!"}]
        
    if request.method == "GET":
        posts = Posts.query.filter_by(user_id=userid).all()
        posts = [p.photo for p in posts]
        user = Users.query.filter_by(id=userid).first()
        fullname = user.lastname + " " + user.firstname
        profile_img = user.profile_photo
        #print(posts)
        return jsonify(posts=posts,profile_img=profile_img,fullname=fullname)

    message = jsonify(message=message)
    return message

@app.route('/api/users/<userid>/follow', methods=['POST'])
def follow(userid):
    pass

@app.route('/api/posts', methods=['GET'])
def posts():
    pass

@app.route('/api/posts/<postid>/like', methods=['POST'])
def like():
    pass

@app.route('/api/secure', methods=['GET'])
@requires_auth
def api_secure():
    # This data was retrieved from the payload of the JSON Web Token
    # take a look at the requires_auth decorator code to see how we decoded
    # the information from the JWT.
    user = g.current_user
    return jsonify(data={"user": user}, message="Success")

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))


# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###

def genUniqueFileName(old_filename):
    filename = str(uuid.uuid4())
    ext = old_filename.split(".")
    ext = ext[1]
    new_filename = filename + "." + ext
    new_filename = new_filename.replace('-', '_')
    return new_filename

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")

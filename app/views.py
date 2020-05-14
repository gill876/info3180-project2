"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app
from flask import render_template, request, jsonify
from .forms import UserForm
from app.models import Users
from . import db
from werkzeug.utils import secure_filename
import os
import uuid
import hashlib

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

            userDB = Users(username, (hashlib.sha256(password.encode()).hexdigest()), firstname, lastname, email, location, biography, filename)
            db.session.add(userDB)
            db.session.commit()
            profile_photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            message = [{"message": "Successful Registered!"}]

    message = jsonify(message=message)
    return message

@app.route('/api/auth/login', methods=['POST'])
def login():
    pass

@app.route('/api/auth/logout', methods=['GET'])
def logout():
    pass

@app.route('/api/users/<userid>/posts', methods=['POST', 'GET'])
def userPosts(userid):
    pass

@app.route('/api/users/<userid>/follow', methods=['POST'])
def follow(userid):
    pass

@app.route('/api/posts', methods=['GET'])
def posts():
    pass

@app.route('/api/posts/<postid>/like', methods=['POST'])
def like():
    pass





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

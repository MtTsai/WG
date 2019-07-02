#!/usr/bin/env python3

from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/")
def root_page():
    return "Yo man"

@app.route("/hello")
def hello():
    return render_template('hello.html', name="MT/JH")

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        return 'post', 200
        # f = request.files['the_file']
        # f.save('/var/www/uploads/' + secure_filename(f.filename))
    elif request.method == 'GET':
        return 'get', 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7899, debug=True)

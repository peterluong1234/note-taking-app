from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import logging
import sqlite3

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

logger = logging.getLogger(__name__)

con = sqlite3.connect("app.db")
cur = con.cursor()

create_users_table = '''
CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL
)
'''

create_notes_table = '''
CREATE TABLE IF NOT EXISTS Notes (
    NoteID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    Title TEXT NOT NULL,
    Text TEXT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
)
'''

cur.execute(create_users_table)
cur.execute(create_notes_table)

con.commit()
con.close()

app = Flask(__name__, static_folder='../react-frontend/build', static_url_path='/')
CORS(app)

@app.route("/")
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/login", methods=['POST', 'GET'])
def login():
    error = None
    data = request.json

    if data is not None:
        logger.info(f"Received data: {data}")
        return jsonify({"message": "Data logged successfully!"}), 200
    else:
        logger.error("No data received")
    # if request.method == 'POST':
    #     if valid_login(request.form['username'],
    #                    request.form['password']):
    #         return log_the_user_in(request.form['username'])
    #     else:
    #         error = 'Invalid username/password'

@app.route("/signup", methods=["POST"])
def signup():
    error = None
    data = request.json

    if data is not None:
        logger.info(f"Received data: {data}")
        return jsonify({"message": "Data logged successfully!"}), 200
    else:
        logger.error("No data received")

if __name__ == '__main__':
    app.run()
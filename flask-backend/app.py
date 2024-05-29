from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import logging
import sqlite3

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='../react-frontend/build', static_url_path='/')
CORS(app)

def get_db_connection():
    con = sqlite3.connect("app.db")
    con.row_factory = sqlite3.Row
    return con

def init_db():
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
    con = get_db_connection()
    cur = con.cursor()
    cur.execute(create_users_table)
    cur.execute(create_notes_table)

    con.commit()
    con.close()

@app.route("/")
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/login", methods=['POST'])
def login():
    error = None
    login_data = request.get_json()

    email = login_data.get('email')
    password = login_data.get('password')

    if email is not None:
        logger.info(f"Received data: {email}")
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
    json_data = request.get_json()

    email = json_data.get('email')
    password = json_data.get('password')

    if not email or not password:
        logger.error("Missing email or password")
        return jsonify({"error": "Missing email or password"}), 400

    con = get_db_connection()
    cur = con.cursor()
    cur.execute('INSERT INTO Users (email, password) VALUES (?, ?)', (email, password))
    con.commit()
    con.close()

    return jsonify({"message": "Useradded successfully"}), 201

@app.route("/notes", methods=["POST"])
def addNote():
    json_data = request.get_json()

    userID = json_data.get('userId')
    title = json_data.get('title')
    text = json_data.get('text')

    if not userID or not title or not text:
        logger.error("Missing title or text")
        return jsonify({"error": "Missing title or text"}), 400
    
    # if userID is not None and title is not None:
    #     logger.info(f"Received data: {userID}")
    #     return jsonify({"message": "Data logged successfully!"}), 200
    # else:
    #     logger.error("No data received")

    con = get_db_connection()
    cur = con.cursor()
    cur.execute('INSERT into Notes (UserID, Title, Text) VALUES (?, ? ,?)', (userID, title, text))
    cur.execute('SELECT * FROM Notes where userID = ?', (userID))
    notes = cur.fetchall()
    con.commit()
    con.close()

    for note in notes:
        print(f"{note['NoteId']}: {note['Text']}")
    return jsonify({"message": "Data logged successfully!"}), 200

if __name__ == '__main__':
    init_db()
    app.run()
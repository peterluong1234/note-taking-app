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
    # 1. Get data
    json_data = request.get_json()

    # 2. Set data
    userID = json_data.get('userId')
    title = json_data.get('title')
    text = json_data.get('text')

    # 3. error check
    if not all([userID, title, text]):
        logger.error("Missing title or text")
        return jsonify({"error": "Missing title or text"}), 400

    # 4. connect to database and make query
    with get_db_connection() as con:
        cur = con.cursor()
        try:
            # Insert new note
            cur.execute('INSERT INTO Notes (UserID, Title, Text) VALUES (?, ?, ?)', (userID, title, text))
            con.commit()

            # Retrieve newly inserted note ID
            note_id = cur.lastrowid

            # Select all notes by userID
            cur.execute('SELECT * FROM Notes WHERE UserID = ?', (userID,))
            notes = cur.fetchall()

            # Return response with success message and notes data
            return jsonify({"message": "Note added successfully!", "note_id": note_id, "notes": notes}), 200
        except Exception as e:
            logger.error(f"Failed to add note: {str(e)}")
            return jsonify({"error": "Failed to add note"}), 500

if __name__ == '__main__':
    init_db()
    app.run()
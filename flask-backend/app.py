from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

# Step 3: Create a logger
logger = logging.getLogger(__name__)

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



if __name__ == '__main__':
    app.run()
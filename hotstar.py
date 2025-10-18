from flask import Flask, request, jsonify
import boto3
import pymysql
import bcrypt
from flask_cors import CORS

app = Flask(__name__)
# Allow only your frontend CloudFront domain
CORS(app, resources={r"/api/*": {"origins": "https://rittik.shop"}})

# RDS endpoint
RDS_ENDPOINT = "hotstar.cglkquyukn4p.us-east-1.rds.amazonaws.com"
DB_NAME = "hotstar"

# AWS Secrets Manager
SECRET_ARN = "arn:aws:secretsmanager:us-east-1:301678011164:secret:rds!db-515dba7b-90e8-4fcf-a56e-240084384555-hq1JbK"
REGION_NAME = "us-east-1"

def get_db_connection():
    client = boto3.client('secretsmanager', region_name=REGION_NAME)
    secret = client.get_secret_value(SecretId=SECRET_ARN)
    import json
    secret_dict = json.loads(secret['SecretString'])

    username = secret_dict['username']
    password = secret_dict['password']

    connection = pymysql.connect(
        host=RDS_ENDPOINT,
        user=username,
        password=password,
        db=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
           )
    return connection

# --------------------------
# Signup
# --------------------------
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({"error": "Missing fields"}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_pw.decode('utf-8'))
        )
        conn.commit()
    except pymysql.err.IntegrityError:
        return jsonify({"error": "User already exists"}), 400
    finally:
        cursor.close()
        conn.close()
    return jsonify({"message": "User registered successfully"})
# --------------------------
# Login
# --------------------------
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Missing fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Login successful", "username": user['username']})
    return jsonify({"error": "Invalid credentials"}), 401


# --------------------------
# Fetch all users
# --------------------------
@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email, created_at FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)


if __name__ == "__main__":
    # Run on all interfaces, port 5000
    app.run(host='0.0.0.0', port=5000)
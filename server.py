# server.py
import subprocess
from flask import Flask, jsonify, request
from flask_cors import CORS

from karteikarten_erstellen import neukarteikarte

app = Flask(__name__)
CORS(app)

@app.post("/button-click")
def anlegen():
    
    neuekarteikarte = neukarteikarte()

    return jsonify({"html": neuekarteikarte})
    

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
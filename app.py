from flask import Flask, request, jsonify
from flask_cors import CORS
import chromadb

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize ChromaDB client and load persisted data

# client = chromadb.PersistentClient(path="./saved_data")
client = chromadb.PersistentClient(path="./sentiment")

# collection = client.get_collection(name="last_attempt")
collection = client.get_collection(name="sentimentAnalyser")

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query_text = data.get('query_text')
    n_results = data.get('n_results')

    results = collection.query(
        query_texts=query_text,
        n_results= int(n_results),
    )
    print(results)
    return jsonify(results)  # Ensure the correct format



from flask import Flask, render_template, request, redirect, url_for
import requests
import os
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Get backend URL from environment variable or use default for local development
BACKEND_URL = os.environ.get('BACKEND_URL', 'http://localhost:8080')

@app.route('/')
def index():
    """Render the home page"""
    return render_template('index.html')

@app.route('/items')
def items():
    """Render the items page"""
    try:
        # Get items from Java backend
        response = requests.get(f"{BACKEND_URL}/api/items")
        if response.status_code == 200:
            items = response.json()
            return render_template('items.html', items=items)
        else:
            return render_template('items.html', error=f"Error: {response.status_code}")
    except Exception as e:
        return render_template('items.html', error=f"Error: {str(e)}")

@app.route('/items/add', methods=['POST'])
def add_item():
    """Add a new item"""
    try:
        name = request.form.get('name')
        description = request.form.get('description')
        
        # Send data to Java backend
        response = requests.post(
            f"{BACKEND_URL}/api/items",
            json={"name": name, "description": description}
        )
        
        if response.status_code == 201:
            return redirect(url_for('items'))
        else:
            return render_template('items.html', error=f"Error adding item: {response.status_code}")
    except Exception as e:
        return render_template('items.html', error=f"Error: {str(e)}")

@app.route('/health')
def health():
    """Health check endpoint for Kubernetes"""
    return {"status": "healthy"}, 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
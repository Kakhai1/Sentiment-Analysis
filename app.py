# 1. import Flask
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS


# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
CORS(app)

# 3. Define what to do when a user hits the index route
@app.route("/", methods=["POST"])
def home():
    print("Server received request for 'Home' page...")
    text = jsonify("Welcome to my Home page!")
    return text


# 4. Define what to do when a user hits the /about route
@app.route('/process_text', methods=['POST'])
def process_text():
    user_input = request.form.get('user_text')
    # Do something with user_input, e.g., process or display it
    return f"You entered: {user_input}"


if __name__ == "__main__":
    app.run(debug=True)


from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import requests
from bs4 import BeautifulSoup
import re
import pandas as pd

app = Flask(__name__)
CORS(app)

tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')

output_mapping = {
    1: "Terrible",
    2: "Bad",
    3: "Neutral",
    4: "Good",
    5: "Amazing"
 }


@app.route("/", methods=["POST"])
def home():
    user_input1 = request.json.get('text1')
    user_input2 = request.json.get('text2')
    response_text = f"{user_input1} {user_input2}"
    print("response recieved")

    processed_text = response_text.replace(' ', '-').lower()
    base_url = f'https://www.yelp.com/biz/{processed_text}'

    reviews = []
    reviews_found = False

    while True:
        r = requests.get(base_url)
        soup = BeautifulSoup(r.text, 'html.parser')
        regex = re.compile('.*comment.*')
        results = soup.find_all('p', class_=regex)
        if results:  
                reviews_found = True
                reviews = [result.text for result in results]
            
       
        next_button = soup.find('a', class_='next')
        if not next_button:
            break

        next_button = soup.find('a', class_='next-link')  
        next_url = next_button['href']  

        
        full_next_url = f'https://www.yelp.com{next_url}'
    print("reviews found")


    df = pd.DataFrame({'Review': reviews})

    if not reviews_found:
        df['Output'] = "Error:1 No Reviews Found."
    else:
        df['Output'] = df['Review'].apply(predict_sentiment)
    
    print("dataframe found")

    print(df.to_string(index=False))
    print(df.to_dict(orient='records'))

    return jsonify(response = base_url, dataframe=df.to_dict(orient='records'))



def predict_sentiment(review):
       
        encoded_text = tokenizer(review, padding=True, truncation=True, return_tensors="pt")

        result = model(**encoded_text)
        model_output = int(torch.argmax(result.logits)) + 1
        return model_output

if __name__ == "__main__":
    app.run(debug=True)
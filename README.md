# True Sentiment of Food Reviews

## Overview

Welcome to "True Sentiment of Food Reviews"! This project focuses on providing a more objective assessment of restaurant reviews by leveraging machine learning and sentiment analysis. The system communicates with a Python Flask environment, utilizing web scraping to fetch data from Yelp.com. The gathered information is then processed using a BERT machine learning model, and the sentiments, along with the reviews, are returned as a response to the website. The results are displayed alongside informative Highcharts bar and gauge charts.

## Features

- **Web Scraping:** The Python Flask environment communicates with the Yelp.com website to fetch restaurant reviews. Due to restricted API access, web scraping is employed to acquire the necessary data.

- **BERT Machine Learning Model:** The extracted reviews undergo tokenization and are processed through a BERT machine learning model. This advanced transformer model provides more objective sentiment analysis.

- **Responsive Website:** The website receives user input for the restaurant name and suburb, initiates the data scraping and sentiment analysis process, and displays the results in an easy-to-understand format.

- **Highcharts Visualizations:** The sentiment analysis results are presented alongside insightful Highcharts bar and gauge charts, enhancing the user experience.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/true-sentiment-reviews.git
    ```

2. Run the Flask application:

    ```bash
    python app.py
    ```

3. Access the website:

    Open your web browser and go to `http://{your ip}:5500/index.html`.

## Usage

1. Enter the restaurant name and suburb in the provided input fields on the website.

2. Click the "Submit" button to initiate the sentiment analysis process.

3. Explore the sentiment results displayed alongside Highcharts bar and gauge charts.

## Future Development

This project opens up exciting possibilities for future enhancements and applications, including but not limited to:

- Auto-complete inputs and access to a broader range of reviews with increased API access or integration with different review platforms.

- Extension of sentiment analysis to diverse applications beyond food reviews, such as assessing social media posts for real-time adjustments to engagement strategies.

- Implementation within organizations to support multi-step approval processes for marketing strategies and proactive sentiment analysis to prevent PR blunders.

## Contributors

- [Khai Tran](https://github.com/KaKhai1)
- [Eric Tran](https://github.com/Nisloen)

## Special Thanks
- Special thanks to the edX data analysis course for inspiring this project
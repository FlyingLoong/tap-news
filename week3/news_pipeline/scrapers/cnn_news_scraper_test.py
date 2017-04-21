import cnn_news_scraper as scraper

EXPECTED_STRING = "The official said the US has also seen an extraordinary number of Chinese military aircraft being brought up to full readiness through intensified maintenance"
CNN_NEWS_URL = "http://www.cnn.com/2017/04/20/politics/us-north-korea-china/index.html"

def test_basic():
    news = scraper.extract_news(CNN_NEWS_URL)
    assert EXPECTED_STRING in news
    print "test_basic passed"

if __name__ == "__main__":
    test_basic()
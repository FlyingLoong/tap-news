# -*- coding: utf-8 -*-

import hashlib
import os
import redis
import sys

import datetime

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import news_api_client
from cloudAMQP_client import CloudAMQPClient

REDIS_HOST = "localhost"
REDIS_PORT = 6379

NEWS_TIMEOUT_IN_SECOND = 24*3600
SLEEP_TIME_IN_SECOND = 10

SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://igrgexoq:MMr4djANAluco69csmD5RZwdJfbjTeap@sidewinder.rmq.cloudamqp.com/igrgexoq"
SCRAPE_NEWS_TASK_QUEUE_NAME = "tap-news-scrape-task-queue"

NEWS_SOURCE = [
    'bbc-news',
    'bbc-sport',
    'bloomberg',
    'cnn',
    'entertainment-weekly',
    'espn',
    'ign',
    'techcrunch',
    'the-new-york-times',
    'the-wall-street-journal',
    'the-washington-post'
]

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQPClient = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)

while True:
    news_list = news_api_client.getNewsFromSource(NEWS_SOURCE)

    num_of_new_news = 0

    for news in news_list:
        news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

        if redis_client.get(news_digest) is None:
            num_of_new_news = num_of_new_news + 1
            news['digest'] = news_digest

            if news['publishAt'] is None:
                news['publishAt'] = datetime.datetime.utcnow.strftime('%Y-%M-%DT%H:%M:%SZ')

                redis_client.set(news_digest, news)
                redis_client.expire(news_digest, NEWS_TIMEOUT_IN_SECOND)

                cloudAMQPClient.send(news)
    print "Fetched %d new news" % (num_of_new_news)

    cloudAMQPClient.sleep(SLEEP_TIME_IN_SECOND)

#-*- Coding: utf-8 -*-
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client
from cloudAMQP_client import CloudAMQPClient

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://wklvgkmz:BPp9vVZy6AG6X1FEL2yDTDfE4UogGsgV@sidewinder.rmq.cloudamqp.com/wklvgkmz"
DEDUPE_NEWS_TASK_QUEUE_NAME = "tap-news-dedupe-news-task-queue"

SLEEP_TIME_IN_SECOND = 1

NEWS_TABLE_NAME = "news"

SAME_NEWS_SIMILARITY_THRESHHOLD = 0.8

cloudAMQP_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)

def handleMessage(msg):
    if msg is not None or not isinstance(msg, dict):
        return

    task = msg
    text = str(task['text'])
    if text is None:
        return

    # Get all recent news
    

while True:
    if cloudAMQP_client is not None:
        msg = cloudAMQP_client.getMessage()

        if msg is not None:
            # Parse the message
            try:
                handleMessage(msg)
            except Exception as e:
                print e
                pass

        cloudAMQP_client.sleep(SLEEP_TIME_IN_SECOND)
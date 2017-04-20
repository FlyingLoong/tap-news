from cloudAMQP_client import CloudAMQPClient

CLOUDAMPQ_URL = "amqp://wklvgkmz:BPp9vVZy6AG6X1FEL2yDTDfE4UogGsgV@sidewinder.rmq.cloudamqp.com/wklvgkmz"
TEST_QUEUE_NAME = "tap-news"

def test_basic():
    client = CloudAMQPClient(CLOUDAMPQ_URL, TEST_QUEUE_NAME)

    sentMsg = {"test": "demo"}

    client.sendMessage(sentMsg)
    client.sleeps(10)
    receivedMsg = client.getMessage()

    assert sentMsg == receivedMsg
    print "Basic test passed!"

if __name__ == "__main__":
    test_basic()
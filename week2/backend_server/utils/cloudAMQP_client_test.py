from cloudAMQP_client import CloudAMQPClient

CLOUDAMPQ_URL = "amqp://wklvgkmz:BPp9vVZy6AG6X1FEL2yDTDfE4UogGsgV@sidewinder.rmq.cloudamqp.com/wklvgkmz"
TEST_QUEUE_NAME = "test"

def test_basic():
    client = CloudAMQPClient(CLOUDAMPQ_URL, TEST_QUEUE_NAME)

    sentMsg = {"test": "demo"}

    client.sendMessage(sentMsg)
    client.sleep(10)
    receivedMsg = client.getMessage()

    assert sentMsg == receivedMsg
    print "Basic test passed!"

if __name__ == "__main__":
    test_basic()
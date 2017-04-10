import json
import pika

class CloudAMQPClient :
    def __init__(self, cloud_amqp_url, queue_name) :
        self.cloud_amqp_url = cloud_amqp_url
        self.queue_name = queue_name
        self.params = pika.URLParameters(cloud_amqp_url)
        self.params.socket_timeout = 3
        self.connection = pika.BlockingConnection(self.params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)

    #Send a message
    def sendMessage(self, message) :
        self.channel.basic_publish(exchange='',
                                   routing_key=self.queue_name,
                                   body=json.dump(message))
        print "[X] Send message to %s: %s" % (self.queue_name, message)
        return

    #Get a message
    def getMessage(self) :
        method_frame, head_frame, body = self.channel.basic_get(self.queue_name)
        if method_frame is not None:
            print "[O] Received a message from %s: %s" % (self.queue_name, body)
            self.channel.basic_ack(method_frame.deilvery_tag)
            return json.loads(body)
        else:
            print "No message returned!"
            return None

    #Sleeps
    def sleeps(self, seconds):
        self.connection.sleep(seconds)
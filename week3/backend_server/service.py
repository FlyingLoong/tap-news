"""Here is the service to pull news from MongoDB"""
import os
import sys
import json
import pyjsonrpc

from bson.json_util import dumps

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'));

import mongodb_client

SERVER_HOST = 'localhost'
SERVER_PORT = 4040

class RequestHander(pyjsonrpc.HttpRequestHandler):
    """Test method"""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print "add is called with %d and %d" % (a, b)
        return a + b

    @pyjsonrpc.rpcmethod
    def getNews(self):
        db = mongodb_client.get_db();
        news = list(db['news'].find())
        return json.loads(dumps(news))

HTTP_SERVER = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHander
)

print "Starting HTTP server on %s: %d" % (SERVER_HOST, SERVER_PORT)

HTTP_SERVER.serve_forever()
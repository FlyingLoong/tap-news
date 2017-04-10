"""Here is the service to pull news from MongoDB"""

import pyjsonrpc

SERVER_HOST = 'localhost'
SERVER_PORT = 4040

class RequestHander(pyjsonrpc.HttpRequestHandler):
    """Test method"""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print "add is called with %d and %d" % (a, b)
        return a + b

HTTP_SERVER = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHander
)

print "Starting HTTP server on %s: %d" % (SERVER_HOST, SERVER_PORT)

HTTP_SERVER.serve_forever()
import json

from channels.generic.websocket import AsyncWebsocketConsumer

class BidConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.auction_id = self.scope['url_route']['kwargs']['product_id']
        self.auction_group_name = f'auction_{self.auction_id}'

        await self.channel_layer.group_add(self.auction_group_name, self.channel_name)

        await self.accept()
        
    async def disconnect(self, code):

        await self.channel_layer.group_discard(self.auction_group_name, self.channel_name)
        
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(self.auction_group_name, {'type': 'auction_message', 'message': message})

    async def auction_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({'message': message}))

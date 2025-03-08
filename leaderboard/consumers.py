import json
import redis
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

r = redis.Redis(host="127.0.0.1", port=6379, db=0, decode_responses=True)


class LeaderboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.group_name = "leaderboard_group"

        # Join the group
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        # Send the current leaderboard on connection
        await self.send_leaderboard()

    async def disconnect(self, close_code):
        # Leave the group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            username = data["user"]
            score = int(data["score"])

            # Update score in Redis (overwrite the score)
            current_score = r.zscore("leaderboard", username) or 0
            r.zadd("leaderboard", {username: current_score + score})

            # Broadcast updated leaderboard to all clients
            await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "broadcast_leaderboard"
                }
            )

        except Exception as e:
            await self.send(text_data=json.dumps({"error": str(e)}))

    async def broadcast_leaderboard(self, event):
        """ Send updated leaderboard to all connected clients """
        await self.send_leaderboard()

    async def send_leaderboard(self):
        """ Fetch leaderboard from Redis and send to client """
        scores = r.zrevrange("leaderboard", 0, 9, withscores=True)
        formatted_scores = [
            {"user": user, "score": int(score)} for user, score in scores
        ]
        await self.send(text_data=json.dumps({"leaderboard": formatted_scores}))

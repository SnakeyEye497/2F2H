from celery import shared_task
from leaderboard.models import LeaderboardBackup
import redis

@shared_task
def backup_leaderboard_to_postgres():
    r = redis.Redis(host="127.0.0.1", port=6379, db=0, decode_responses=True)
    scores = r.zrevrange("leaderboard", 0, -1, withscores=True)

    for username, score in scores:
        LeaderboardBackup.objects.update_or_create(
            user=username, defaults={"score": int(score)}
        )

    return f"Backed up {len(scores)} records to PostgreSQL."

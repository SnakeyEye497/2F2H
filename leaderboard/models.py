from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class LeaderboardBackup(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user}: {self.score}"

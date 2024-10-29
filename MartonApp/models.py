from django.db import models

class pre_matches(models.Model):
    bookmaker = models.CharField(max_length=500)
    teams = models.CharField(max_length=500)
    date = models.DateField()
    time = models.CharField(max_length=500)
    region = models.CharField(max_length=500)
    sport = models.TextField(max_length=500)
    odds = models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
        return self.bookmaker+'-'+self.teams
    

class live_matches(models.Model):
    bookmaker = models.CharField(max_length=500)
    teams = models.CharField(max_length=500)
    date = models.DateField()
    time = models.CharField(max_length=500)
    region = models.CharField(max_length=500)
    sport = models.TextField(max_length=500)
    odds = models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
        return self.bookmaker+'-'+self.teams
    
class pinnacle_matches(models.Model):
    team = models.CharField(max_length=500)
    sport = models.TextField(max_length=500)
    odds = models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
        return self.team+'-'+self.sport
    
    


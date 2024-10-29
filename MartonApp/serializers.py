from rest_framework import serializers
from . import models

class PreMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.pre_matches
        fields = '__all__'

class LiveMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.live_matches
        fields = '__all__'

class PrinnacleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.pinnacle_matches
        fields = '__all__'
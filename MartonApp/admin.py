from django.contrib import admin
from django.contrib.admin.sites import site
from . import models

class pre_matches_admin(admin.ModelAdmin):
    list_display = ('bookmaker','teams','date','time','region','sport','odds')

class live_matches_admin(admin.ModelAdmin):
    list_display = ('bookmaker','teams','date','time','region','sport','odds')

class pinnacle_admin(admin.ModelAdmin):
    list_display = ('team','odds','sport')


admin.site.register(models.pre_matches,pre_matches_admin)
admin.site.register(models.live_matches,live_matches_admin)
admin.site.register(models.pinnacle_matches,pinnacle_admin)
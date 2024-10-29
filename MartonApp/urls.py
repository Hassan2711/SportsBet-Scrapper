# from django.urls import path
# from . import views

# urlpatterns = [
#     path('pre-matches/', views.PreMatchesViewSet.as_view()),
#     path('live-matches/', views.LiveMatchesViewSet.as_view()),
#     path('pre-matches-ev/',views.PreMatchesEVViewSet.as_view()),
#     path('live-matches-ev/',views.LiveMatchesEVViewSet.as_view()),
#     path('pre-matches/football', views.PreMatchesFBViewSet.as_view()),
#     path('pre-matches/baseball', views.PreMatchesBBViewSet.as_view()),
#     path('pre-matches/hockey', views.PreMatchesHockeyViewSet.as_view()),
#     path('pre-matches/soccer', views.PreMatchesSoccerViewSet.as_view()),
#     path('live-matches/football', views.LiveMatchesFBViewSet.as_view()),
#     path('live-matches/baseball', views.LiveMatchesBBViewSet.as_view()),
#     path('live-matches/hockey', views.LiveMatchesHockeyViewSet.as_view()),
#     path('live-matches/soccer', views.LiveMatchesSoccerViewSet.as_view()),
#     path('pre-matches-ev/football',views.PreMatchesEVFBViewSet.as_view()),
#     path('pre-matches-ev/baseball',views.PreMatchesEVBBViewSet.as_view()),
#     path('pre-matches-ev/hockey',views.PreMatchesEVHockeyiewSet.as_view()),
#     path('pre-matches-ev/soccer',views.PreMatchesEVSocceriewSet.as_view()),
#     path('live-matches-ev/football',views.LiveMatchesEVFBViewSet.as_view()),
#     path('live-matches-ev/baseball',views.LiveMatchesEVBBViewSet.as_view()),
#     path('live-matches-ev/hockey',views.LiveMatchesEVHockeyViewSet.as_view()),
#     path('live-matches-ev/soccer',views.LiveMatchesEVSoccerViewSet.as_view()),
#     path('pre-matches-bookmakers',views.PreMatchesBookmakers.as_view()),
#     path('live-matches-bookmakers',views.LiveMatchesBookmakers.as_view())
# ]

# MartonApp/urls.py
from django.urls import path
from . import views  # Ensure you are importing the views

urlpatterns = [
    # Example route for the OddsScraperView which was created earlier
    path('pre-matches/', views.OddsScraperView.as_view(),{'game': 'soccer', "live" : "no"}),
    path('pre-matches/soccer', views.OddsScraperView.as_view(), {'game': 'soccer', "live" : "no"}),
    path('pre-matches/football', views.OddsScraperView.as_view(), {'game': 'football', "live" : "no"}),
    path('pre-matches/baseball', views.OddsScraperView.as_view(), {'game': 'baseball', "live" : "no"}),
    path('pre-matches/hockey', views.OddsScraperView.as_view(), {'game': 'hockey', "live" : "no"}),

    path('live-matches/', views.OddsScraperView.as_view(), {'game': 'soccer', "live" : "yes"}),
    path('live-matches/soccer', views.OddsScraperView.as_view(), {'game': 'soccer', "live" : "yes"}),
    path('live-matches/football', views.OddsScraperView.as_view(), {'game': 'football', "live" : "yes"}),
    path('live-matches/baseball', views.OddsScraperView.as_view(), {'game': 'baseball', "live" : "yes"}),
    path('live-matches/hockey', views.OddsScraperView.as_view(), {'game': 'hockey', "live" : "yes"}),


    
    # Fix the following based on your actual views
    # Ensure PreMatchesViewSet exists in views.py, or comment this out if it doesn't
    # path('pre-matches/', views.PreMatchesViewSet.as_view(), name='pre-matches'),
]

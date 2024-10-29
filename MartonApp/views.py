# views.py
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# Import scrapers
from .scrapers.ps3838_scraper import scrap_ps3838_data
from .scrapers.vave_scraper import scrap_vave_data
# Import other scrapers in a similar manner

class OddsScraperView(APIView):
    """
    This view will scrape odds from various bookmakers, calculate arbitrage,
    Positive EV betting, and suggest optimal bet sizes using Kelly criterion.
    """
    
    def get(self, request, *args, **kwargs):
        game = kwargs.get('game', None)
        live = kwargs.get('live', None)

        ps3838_data = scrap_ps3838_data(game = game, live = live)
        vave_data = scrap_vave_data(game = game, live = live)


        # Combine all data into one dictionary
        all_data = {
            "ps3838": ps3838_data,
            "vave": vave_data,
            # Add other scrapers' data here...
        }

        return Response(all_data)

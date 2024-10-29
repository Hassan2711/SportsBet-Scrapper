from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .scrapers.ps3838_scraper import scrap_ps3838_data
from .scrapers.vave_scraper import scrap_vave_data
from .scrapers.cloudbet_scraper import scrap_cloudbet_data

class OddsScraperView(APIView):
    """
    This view will scrape odds from various bookmakers, calculate arbitrage,
    Positive EV betting, and suggest optimal bet sizes using Kelly criterion.
    """
    
    def get(self, request, *args, **kwargs):
        game = kwargs.get('game', None)
        live = kwargs.get('live', None)

        # Initialize data dictionary
        all_data = {}

        # Add error handling for each scraper
        try:
            ps3838_data = scrap_ps3838_data(game=game, live=live)
            all_data["ps3838"] = ps3838_data
        except Exception as e:
            all_data["ps3838"] = {"error": str(e)}

        try:
            vave_data = scrap_vave_data(game=game, live=live)
            all_data["vave"] = vave_data
        except Exception as e:
            all_data["vave"] = {"error": str(e)}

        try:
            cloudbet_data = scrap_cloudbet_data(game=game, live=live)
            all_data["cloudbet"] = cloudbet_data
        except Exception as e:
            all_data["cloudbet"] = {"error": str(e)}

        return Response(all_data)

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException, TimeoutException,NoSuchFrameException
import time

# Function to calculate arbitrage opportunity
def calculate_arbitrage(home_odds, away_odds, draw_odds=None):
    if draw_odds:  # For 3-way markets
        arbitrage_chance = (1 / home_odds) + (1 / away_odds) + (1 / draw_odds)
    else:  # For 2-way markets
        arbitrage_chance = (1 / home_odds) + (1 / away_odds)
    
    if arbitrage_chance < 1:
        return arbitrage_chance, 100 * (1 - arbitrage_chance)  # Opportunity exists, % profit
    return None, None

# Function to calculate expected value (EV)
def calculate_positive_ev(bookmaker_odds, true_odds):
    return ((true_odds - bookmaker_odds) / bookmaker_odds) * 100

# Kelly criterion to calculate optimal bet size
def kelly_criterion(ev, win_prob, bankroll, multiplier=1):
    b = win_prob - 1
    p = ev / 100
    q = 1 - p
    bet_fraction = (b * p - q) / b
    return bankroll * bet_fraction * multiplier  # Optimal bet size based on bankroll
# Function to calculate implied probability
def implied_probability(odds):
    return 1 / odds

# Function to calculate true odds
def calculate_true_odds(home_odds, draw_odds=None, away_odds=None):
    # Calculate implied probabilities for each outcome
    implied_home = implied_probability(home_odds)
    implied_away = implied_probability(away_odds) if away_odds else 0

    if draw_odds is not None:
        implied_draw = implied_probability(draw_odds)
        total_implied_probability = implied_home + implied_draw + implied_away
        true_draw_prob = implied_draw / total_implied_probability
        true_draw_odds = 1 / true_draw_prob
    else:
        implied_draw = 0
        total_implied_probability = implied_home + implied_away
        true_draw_odds = None  # No true draw odds for 2-way markets

    # Calculate true probabilities by removing the margin
    true_home_prob = implied_home / total_implied_probability
    true_away_prob = implied_away / total_implied_probability if away_odds else None

    # Convert true probabilities back to true odds
    true_home_odds = 1 / true_home_prob
    true_away_odds = 1 / true_away_prob if true_away_prob else None
    
    return true_home_odds, true_draw_odds, true_away_odds


def load_url(driver, url):
    try:
        driver.get(url)
        driver.implicitly_wait(10)
        print('loaded')
        return True
    except Exception as e:
        print(e)

        return False
    
def scrape_vave(game=None, live=None, context=None):
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode (without opening a browser window)
    chrome_options.add_argument("--start-maximized")  # Maximizes the browser window
    
    # Initialize the driver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    if game == "soccer":
        game = "football"
    elif game == "football":
        game = "american-football"
    elif game == "hockey":
        game = "ice-hockey"
    print(game)
    print(context)
    driver.get(f"https://vave.com/{context}/{game}")
    
    time.sleep(5)
    events = []

    try:
        WebDriverWait(driver, 60).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "events-table-module_table__y-Izw")))
        containers = driver.find_elements(By.CLASS_NAME, "events-table-module_table__y-Izw")
        for container in containers:
            league_name = container.find_element(By.XPATH, './/div[1]//div//a').text
            print(league_name)
            matches = container.find_elements(By.CLASS_NAME, "events-table-module_rowWrapper__brOLD")
            for match in matches:
                team_name = match.find_element(By.XPATH, ".//div[@data-test = 'teamSeoTitles']")
                home_team = team_name.find_element(By.XPATH, ".//div[1]//div//span").text
                away_team = team_name.find_element(By.XPATH, ".//div[2]//div//span").text
                if live == "yes":
                    match_time = "Live"
                else:
                    match_time = match.find_element(By.XPATH, ".//span[@data-test = 'eventTime']").text
                    # Attempt to get `eventDate`, if it exists
                try:
                    if live == "no":
                        match_date = match.find_element(By.XPATH, ".//span[@data-test = 'eventDate']").text
                    else:
                        match_date = "Today"
                except NoSuchElementException:
                    print("eventDate not found for this game, skipping.")
                    continue  # Skip to the next game if `eventDate` is missing
                # Attempt to retrieve odds
                odds = match.find_element(By.XPATH, ".//div[@class = 'events-table-module_marketsList__OUI3A']//div[1]") 
                try:              
                    if game == "american-football" or game == "baseball":
                        home_odds = float(odds.find_element(By.XPATH, ".//div[1]//div[@data-test = 'outcome']//span").text)
                        draw_odds = None
                        away_odds = float(odds.find_element(By.XPATH, ".//div[2]//div[@data-test = 'outcome']//span").text)
                    else:
                        home_odds = float(odds.find_element(By.XPATH, ".//div[1]//div[@data-test = 'outcome']//span").text)
                        draw_odds = float(odds.find_element(By.XPATH, ".//div[2]//div[@data-test = 'outcome']//span").text)
                        away_odds = float(odds.find_element(By.XPATH, ".//div[3]//div[@data-test = 'outcome']//span").text)
                except NoSuchElementException:
                    print("skipped")
                    continue
                if home_odds and away_odds:
                    true_home_odds, true_draw_odds, true_away_odds = calculate_true_odds(home_odds, draw_odds, away_odds)
                    arb_chance, arb_profit = calculate_arbitrage(home_odds, away_odds, draw_odds)
                    positive_ev = calculate_positive_ev(home_odds, true_home_odds)


            
                events.append({
                                "league_name": league_name,
                                "time": match_time,
                                "date" if live == "no" else "score": match_date,
                                "home_team": home_team,
                                "home_odds": home_odds if home_odds else "",
                                "draw": "Draw",
                                "draw_odds": draw_odds if draw_odds else "",
                                "away_team": away_team,
                                "away_odds": away_odds if away_odds else "",
                                "true_home_odds": true_home_odds if true_home_odds else "",
                                "true_draw_odds": true_draw_odds if true_draw_odds else "",
                                "true_away_odds": true_away_odds if true_away_odds else "", 
                                "arb_chance": arb_chance if arb_chance else "",
                                "arb_profit": arb_profit if arb_profit else "",
                                "positive_ev": positive_ev if positive_ev else ""
                            })

    except Exception as e:
        print(f"General error: {e}")
    finally:
      driver.quit()
    return events


def scrap_vave_data(game = "soccer", live = "no"):
    print(f"Game type: {game}")
    events = []
    if live == "yes":
        context = "live"
    else:
        context = "prematch"
    events.extend(scrape_vave(game=game, live = live, context = context))
    # if live == "no":
    #     events.extend(scrape_heybets(context="early"))

    return events

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
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException
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
    
def scrape_ps3838(game=None,live=None,context=None):
    print(f"Scraping context: {game}")
    # Initialize the Selenium WebDriver
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode (without opening a browser window)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    # Navigate to the PS3838 sports page
    url = f"https://www.ps3838.com/en/sports/{game}"
    load_url(driver, url)
    driver.implicitly_wait(15)
    
    # Wait for page load
    WebDriverWait(driver, 60).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "odds-container-nolive")))
    events = []

    if context == "early":
        try:
            early_tab = driver.find_element(By.XPATH, "//div[contains(@class, 'SportMenuItemTabComponent')]//div[2]")
            early_tab.click()
            print("Clicked on the 'Early' tab.")
            
            # Custom loop to wait for the Early page to load
            max_wait_time = 20  # Maximum wait time in seconds
            start_time = time.time()
            page_loaded = False
            
            while time.time() - start_time < max_wait_time:
                time.sleep(1)  # Wait 1 second between checks
                try:
                    # Check if a unique element on the "Early" page is present
                    if driver.find_elements(By.CLASS_NAME, "league"):
                        page_loaded = True
                        print("Early page loaded.")
                        break
                except Exception as e:
                    print(f"Waiting for the Early page to load: {e}")

            if not page_loaded:
                print("Early page did not load within the timeout period.")
                
        except NoSuchElementException:
            print("Early tab not found.")
        except Exception as e:
            print(f"Error clicking Early tab: {e}")
    


    try:
        if live == "no":
            containers = driver.find_elements(By.CLASS_NAME, "odds-container-nolive")
        if live == "yes":
            containers = driver.find_elements(By.CLASS_NAME, "odds-container-live")
        for section in containers:
            # Loop through leagues
            leagues = section.find_elements(By.CLASS_NAME, "league")
            for i in range(len(leagues)):
                # Re-locate leagues in each iteration
                leagues = section.find_elements(By.CLASS_NAME, "league")
                league = leagues[i]
                
                try:
                    league_name = league.find_element(By.XPATH, "./span[normalize-space()]").text
                    print(f"Processing league: {league_name}")
                    league_id = league.get_attribute("id")
                    
                    # Locate the sibling div with tables
                    sibling_div = section.find_element(By.XPATH, f".//div[@id='{league_id}']/following-sibling::div")
                    tables = sibling_div.find_elements(By.TAG_NAME, "table")
                    
                    # Process each table within the sibling div
                    for table in tables:
                        try:
                            home_team = table.find_element(By.XPATH, ".//tr[2]//td[3]//div//span[1]").text
                            print(home_team)
                            away_team = table.find_element(By.XPATH, ".//tr[2]//td[3]//div//span[2]").text
                            print(f"Away Team: {away_team}")
                            odds = table.find_element(By.XPATH, ".//tr[2]//td[4]")
                            if odds.find_elements(By.TAG_NAME, "a"):
                                home_odds = float(table.find_element(By.XPATH, ".//tr[2]//td[4]//a[1]//span").text)
                                print(home_odds)
                                away_odds = float(table.find_element(By.XPATH, ".//tr[2]//td[4]//a[2]//span").text)
                                print(away_odds)
                                if game == "soccer":
                                    draw_odds = float(table.find_element(By.XPATH, ".//tr[2]//td[4]//a[3]//span").text)
                                    print(draw_odds)
                                else:
                                    draw_odds = None
                            
                            match_time = table.find_element(By.XPATH, ".//tr[1]//td[2]//span[2]").text
                            if match_time == "LIVE":
                                match_time = table.find_element(By.XPATH, ".//tr[1]//td[2]//span[1]").text
                                match_date = "TODAY"
                            else:
                                match_time = table.find_element(By.XPATH, ".//tr[1]//td[2]//span[2]").text
                                match_date = table.find_element(By.XPATH, ".//tr[1]//td[2]//span[1]").text
                            
                            
                            if home_odds and away_odds:
                                true_home_odds, true_draw_odds, true_away_odds = calculate_true_odds(home_odds, draw_odds, away_odds)
                                arb_chance, arb_profit = calculate_arbitrage(home_odds, away_odds, draw_odds)
                                positive_ev = calculate_positive_ev(home_odds, true_home_odds)
                            
                            else:
                                continue


                            
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
                        except NoSuchElementException:
                            print("Element not found.")
                        except StaleElementReferenceException:
                            print("Table element became stale.")
                except Exception as e:
                    print(f"Error processing league {league_name}: {e}")
                    continue  # Skip to the next league if there is an error
                
                # Optional: Wait or scroll to ensure all elements are loaded
                time.sleep(1)
                    
    except Exception as e:
        print(f"General error: {e}")
    finally:
        driver.quit()
        
    return events

def scrap_ps3838_data(game = "soccer", live = "no"):
    print(f"Game type: {game}")
    events = []
    events.extend(scrape_ps3838(game=game, live = live))
    if live == "no":
        events.extend(scrape_ps3838(game=game, live = live, context="early"))

    return events

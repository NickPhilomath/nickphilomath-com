import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

TAKEN = "Занят"
DOMAIN = "google"

url = f"https://eskiz.uz/whois?domain=" + DOMAIN

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")

driver = webdriver.Chrome(options=chrome_options)  # options=chrome_options
driver.get(url)

elem_taken = driver.find_element(By.ID, "busy-domain-block")
elem_html_taken = elem_taken.get_attribute("innerHTML")
print("****")
if TAKEN in elem_html_taken:
    print("taken")
    days_class = elem_taken.find_element(
        By.CLASS_NAME, "domain-busy-term"
    ).get_attribute("innerHTML")
    days = days_class.split("<b>")[1].split("</b>")[0]

    print(days)

    driver.close()

else:
    print("not taken!")

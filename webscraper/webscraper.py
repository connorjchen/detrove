from selenium import webdriver
import pandas as pd
import time

driver = webdriver.Safari()

stockx_sneakers = [
    'nike-dunk-low-retro-white-black-2021',
    'nike-dunk-low-setsubun-2022',
    'air-jordan-1-retro-high-og-skyline',
    'air-jordan-3-retro-white-cement-reimagined',
    'nike-dunk-low-grey-fog',
    'air-jordan-4-retro-sb-pine-green',
    'nike-dunk-low-industrial-blue-sashiko',
    'new-balance-550-white-green',
    'nike-dunk-low-light-orewood-brown-sashiko',
    'nike-air-force-1-low-sp-ambush-black',
    'air-jordan-11-retro-low-cement-grey',
    'nike-air-force-1-low-supreme-box-logo-white',
    'air-jordan-1-retro-high-og-lucky-green',
    'air-jordan-5-retro-unc-university-blue',
    'air-jordan-4-retro-a-ma-maniere-violet-ore',
    'air-jordan-1-retro-high-unc-leather',
    'adidas-yeezy-wave-runner-700-solid-grey',
    'air-jordan-1-retro-high-og-chicago-reimagined-lost-and-found',
    'air-jordan-3-retro-fire-red-2022',
    'air-jordan-5-retro-off-white-sail',
    'air-jordan-11-retro-concord-2018',
]

df = pd.DataFrame({'sneaker': [], 'size9': [], 'size10': [], 'size11': []})

for sneaker in stockx_sneakers:
    try:
        driver.get('https://stockx.com/' + sneaker)
        time.sleep(3) # let the page load
        # maybe build in time to confirm captcha

        driver.find_element("xpath", "//*[@id='menu-button-pdp-size-selector']").click()
        size9 = driver.find_element("xpath", "//dt[text()='US M 9']/following-sibling::dd").text
        size10 = driver.find_element("xpath", "//dt[text()='US M 10']/following-sibling::dd").text
        size11 = driver.find_element("xpath", "//dt[text()='US M 11']/following-sibling::dd").text
        df = pd.concat([df, pd.DataFrame([{'sneaker': sneaker, 'size9': size9, 'size10': size10, 'size11': size11}])], ignore_index=True)
    except:
        print('Error with ' + sneaker)

# save to csv but dont overwrite existing file
df.to_csv('stockx_sneakers.csv', index=False)

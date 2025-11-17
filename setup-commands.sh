# Create the main project directory
mkdir crypto-trading-app
cd crypto-trading-app

# Create the styles directory
mkdir styles

# Create the components directory
mkdir components

# Create the utils directory
mkdir utils

# Create all the necessary files
touch index.html
touch styles/main.css
touch styles/chart.css
touch utils/web3.js
touch utils/priceService.js
touch components/Header.js
touch components/Balance.js
touch components/CryptoList.js
touch components/TradingChart.js
touch components/TradingForm.js
touch app.js

# Verify the structure (optional)
tree .

# The final structure should look like this:
# crypto-trading-app/
# ├── index.html
# ├── app.js
# ├── components/
# │   ├── Header.js
# │   ├── Balance.js
# │   ├── CryptoList.js
# │   ├── TradingChart.js
# │   └── TradingForm.js
# ├── styles/
# │   ├── main.css
# │   └── chart.css
# └── utils/
#     ├── web3.js
#     └── priceService.js

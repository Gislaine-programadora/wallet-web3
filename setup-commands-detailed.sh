# 1. Create main project directory
mkdir open-crypto
cd open-crypto

# 2. Create directories
mkdir components
mkdir styles
mkdir utils

# 3. Create files in root directory
touch index.html
touch app.js

# 4. Create files in components directory
cd components
touch Header.js
touch LoginModal.js
touch Dashboard.js
touch TradingPanel.js
touch OrderBook.js
touch WithdrawModal.js
cd ..

# 5. Create files in styles directory
cd styles
touch main.css
cd ..

# 6. Create files in utils directory
cd utils
touch marketData.js
touch database.js
cd ..

# Final structure:
# open-crypto/
# ├── index.html
# ├── app.js
# ├── components/
# │   ├── Header.js
# │   ├── LoginModal.js
# │   ├── Dashboard.js
# │   ├── TradingPanel.js
# │   ├── OrderBook.js
# │   └── WithdrawModal.js
# ├── styles/
# │   └── main.css
# └── utils/
#     ├── marketData.js
#     └── database.js

# Alternative commands (if you prefer one line per action):
# mkdir open-crypto
# cd open-crypto
# mkdir components
# mkdir styles
# mkdir utils
# touch index.html
# touch app.js
# touch components/Header.js
# touch components/LoginModal.js
# touch components/Dashboard.js
# touch components/TradingPanel.js
# touch components/OrderBook.js
# touch components/WithdrawModal.js
# touch styles/main.css
# touch utils/marketData.js
# touch utils/database.js
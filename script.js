
    function playSound(soundFile) {
        var audio = document.getElementById('sleep-audio');
        audio.src = soundFile;
        audio.play();
    }

    
    
    // List of motivational quotes
    const quotes = [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Success is not how high you have climbed, but how you make a positive difference. – Roy T. Bennett",
        "You miss 100% of the shots you don’t take. – Wayne Gretzky",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Success doesn’t just find you. You have to go out and get it.",
        "Dream it. Wish it. Do it.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "It always seems impossible until it’s done. – Nelson Mandela",
        "The best way to predict the future is to create it.",
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "You miss 100% of the shots you don't take.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Don't watch the clock; do what it does. Keep going.",
        "It always seems impossible until it's done.",
        "Keep your face always toward the sunshine—and shadows will fall behind you."
    ];

    // Function to display a random quote each day
    function displayDailyQuote() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        // Use the day of the year to select a quote, so it changes daily
        const quoteOfTheDay = quotes[dayOfYear % quotes.length];
        document.getElementById('quote-display').textContent = quoteOfTheDay;
    }

    // Call the function to display the daily quote
    displayDailyQuote();
    
    // List of daily prayers
    const prayers = [
        "Heavenly Father, I thank You for this new day.",
        "Lord, grant me the wisdom to face this day with faith and courage.",
        "Dear God, help me walk in Your light and live a life that reflects Your love.",
        "God, give me the strength to face any challenges today and trust in Your will.",
        "Lord, guide me in all that I do today and help me spread kindness to others.",
        "Heavenly Father, bless me with peace and protect me throughout the day.",
        "God, may I be a reflection of Your grace and compassion in all my actions."
    ];

    // Function to get a random prayer
    function getRandomPrayer() {
        const today = new Date().getDate(); // Get the current day of the month
        const randomIndex = today % prayers.length; // Change the prayer daily
        return prayers[randomIndex];
    }

    // Display the prayer when the page loads
    document.getElementById('prayer-display').textContent = getRandomPrayer();

    
    // List of food items with nutritional values
    const foodDatabase = {
        "Apple": { calories: 95, fat: 0.3, protein: 0.5 },
        "Banana": { calories: 105, fat: 0.4, protein: 1.3 },
        "Bread": { calories: 79, fat: 1, protein: 3 },
        "Rice": { calories: 206, fat: 0.4, protein: 4.3 },
        "Chicken": { calories: 165, fat: 3.6, protein: 31 },
        "Milk": { calories: 103, fat: 2.4, protein: 8 },
        "Egg": { calories: 78, fat: 5, protein: 6 }
    };

    // Function to analyze food and display the nutritional info
    document.getElementById('food-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        const foodInput = document.getElementById('food-input').value.trim();
        const foodInfo = document.getElementById('food-info');
        
        if (foodDatabase[foodInput]) {
            const food = foodDatabase[foodInput];
            foodInfo.textContent = `Calories: ${food.calories}, Fat: ${food.fat}g, Protein: ${food.protein}g`;
        } else {
            foodInfo.textContent = "Food item not found in the database.";
        }
    });

    
    // Function to save journal entry
    document.getElementById('save-journal').addEventListener('click', function() {
        const entry = document.getElementById('journal-entry').value;
        if (entry.trim()) {
            const date = new Date().toLocaleString();
            const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            journalEntries.push({ date, entry });
            localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
            displayJournalEntries();
            document.getElementById('journal-entry').value = ''; // Clear text area
        }
    });

    // Function to display journal entries
    function displayJournalEntries() {
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        const entryList = document.getElementById('entry-list');
        entryList.innerHTML = ''; // Clear the list
        journalEntries.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = `${entry.date} - ${entry.entry}`;
            entryList.appendChild(listItem);
        });
    }

    // Load and display saved entries on page load
    document.addEventListener('DOMContentLoaded', displayJournalEntries);

    
    // Initialize water intake
    let totalWaterIntake = 0;
    const dailyGoal = 2000; // 2000 ml (equivalent to 8 glasses)

    // Function to add water intake
    document.getElementById('add-water').addEventListener('click', function() {
        const waterInput = document.getElementById('water-input').value;
        const waterAmount = parseInt(waterInput);

        if (!isNaN(waterAmount) && waterAmount > 0) {
            totalWaterIntake += waterAmount;

            // Update UI
            document.getElementById('water-intake').textContent = totalWaterIntake;
            document.getElementById('water-progress').value = totalWaterIntake;

            // Display hydration message
            const hydrationMessage = document.getElementById('hydration-message');
            if (totalWaterIntake >= dailyGoal) {
                hydrationMessage.textContent = "Congratulations! You've reached your hydration goal for the day!";
                hydrationMessage.style.color = "green";
            } else {
                hydrationMessage.textContent = `Keep going! You need ${dailyGoal - totalWaterIntake} ml more to reach your goal.`;
                hydrationMessage.style.color = "blue";
            }
        }

        // Clear input
        document.getElementById('water-input').value = '';
    });

    // Initialize hydration level
    let hydrationLevel = 100;
    let hydrationInterval;

    // Function to deplete hydration over time
    function startDehydration() {
        hydrationInterval = setInterval(function() {
            hydrationLevel -= 1;
            if (hydrationLevel <= 0) {
                hydrationLevel = 0;
                clearInterval(hydrationInterval);
                document.getElementById('game-status').textContent = "Game Over! The Dehydration Monster defeated you!";
                document.getElementById('game-status').style.color = "red";
            }
            updateHydrationLevel();
        }, 1000); // Deplete 1% every second
    }

    // Function to update hydration level in the UI
    function updateHydrationLevel() {
        document.getElementById('hydration-level').textContent = hydrationLevel;
        document.getElementById('hydration-progress-game').value = hydrationLevel;
    }

    // Event listener for drinking water buttons
    const drinkButtons = document.querySelectorAll('.drink-water');
    drinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const waterAmount = parseInt(this.getAttribute('data-water'));
            hydrationLevel += waterAmount;
            if (hydrationLevel > 100) hydrationLevel = 100; // Max hydration level is 100%

            updateHydrationLevel();

            if (hydrationLevel >= 100) {
                clearInterval(hydrationInterval);
                document.getElementById('game-status').textContent = "You won! You've defeated the Dehydration Monster!";
                document.getElementById('game-status').style.color = "green";
            } else {
                document.getElementById('game-status').textContent = "Keep drinking water to stay hydrated!";
                document.getElementById('game-status').style.color = "blue";
            }
        });
    });

    // Start the dehydration process
    startDehydration();

    
    // Medicine Reminder Form
    const reminderForm = document.getElementById('medicine-reminder-form');
    const reminderList = document.getElementById('reminder-list');
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    // Function to Add Reminder
    reminderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const medicineName = document.getElementById('medicine-name').value;
        const reminderTime = document.getElementById('reminder-time').value;

        const newReminder = {
            name: medicineName,
            time: reminderTime
        };

        reminders.push(newReminder);
        localStorage.setItem('reminders', JSON.stringify(reminders));

        displayReminders();
        reminderForm.reset();
    });

    // Function to Display Reminders
    function displayReminders() {
        reminderList.innerHTML = '';
        reminders.forEach((reminder, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${reminder.name} at ${reminder.time}`;
            reminderList.appendChild(listItem);
        });
    }

    // Function to Check Reminders
    function checkReminders() {
        const currentTime = new Date().toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });

        reminders.forEach(reminder => {
            if (reminder.time === currentTime) {
                alert(`Time to take your medicine: ${reminder.name}`);
            }
        });
    }

    // Check reminders every minute
    setInterval(checkReminders, 60000); // 60,000 ms = 1 minute

    // Display reminders when page loads
    displayReminders();


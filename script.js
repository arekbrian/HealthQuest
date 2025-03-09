
    function playSound(soundFile) {
        var audio = document.getElementById('sleep-audio');
        audio.src = soundFile;
        audio.play();
    }



    document.getElementById('reminder-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const medicineName = document.getElementById('medicine-name').value;
        const reminderTime = document.getElementById('reminder-time').value;
        const reminderStatus = document.getElementById('reminder-status');

        reminderStatus.textContent = `Reminder set for ${medicineName} at ${reminderTime}.`;

        // Function to check if it's time for the reminder
        function checkReminder() {
            const currentTime = new Date();
            const currentHours = String(currentTime.getHours()).padStart(2, '0');
            const currentMinutes = String(currentTime.getMinutes()).padStart(2, '0');
            const currentFormattedTime = `${currentHours}:${currentMinutes}`;

            if (currentFormattedTime === reminderTime) {
                alert(`It's time to take your medicine: ${medicineName}`);
                reminderStatus.textContent = ''; // Reset the reminder status after alert
                clearInterval(reminderInterval); // Stop checking after the reminder is triggered
            }
        }

        // Set interval to check the time every minute
        const reminderInterval = setInterval(checkReminder, 60000);
    });

    
    // List of motivational quotes
    const quotes = [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Success is not how high you have climbed, but how you make a positive difference. – Roy T. Bennett",
        "You miss 100% of the shots you don’t take. – Wayne Gretzky",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Success doesn’t just find you. You have to go out and get it.",
        "Dream it. Wish it. Do it.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "It always seems impossible until it’s done. – Nelson Mandela"
    ];

    // Function to get a random quote
    function getRandomQuote() {
        const today = new Date().getDate(); // Get the current day of the month
        const randomIndex = today % quotes.length; // Change the quote daily
        return quotes[randomIndex];
    }

    // Display the quote when the page loads
    document.getElementById('quote-display').textContent = getRandomQuote();



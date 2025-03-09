
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


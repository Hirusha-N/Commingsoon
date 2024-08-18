// Set the countdown end time to 30 days from the current date
const calculateEndDate = () => {
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30);
    return endDate.getTime();
};

// Check if the end time is stored in localStorage
let endTime = localStorage.getItem('countdownEndTime');
if (!endTime) {
    // If not, calculate it and store it in localStorage
    endTime = calculateEndDate();
    localStorage.setItem('countdownEndTime', endTime);
} else {
    endTime = parseInt(endTime, 10);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.container').innerHTML = "<h1>We're Here!</h1><p>The portfolio is now live. Thanks for waiting!</p>";
        localStorage.removeItem('countdownEndTime'); // Clean up after expiration
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

// Update countdown every second
const interval = setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();

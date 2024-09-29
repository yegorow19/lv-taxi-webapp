document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();

    if (!from || !to) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    const data = {from: from, to: to};
    tg.sendData(JSON.stringify(data));
    tg.close();
});

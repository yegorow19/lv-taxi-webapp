document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram ? window.Telegram.WebApp : null;

    if (tg) {
        tg.expand(); // Разворачиваем приложение на весь экран
        tg.ready();

        // Проверяем наличие данных пользователя
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            document.getElementById('username').innerText = tg.initDataUnsafe.user.first_name;
        } else {
            document.getElementById('username').innerText = 'Гость';
        }

        // Обработчик отправки формы
        document.getElementById('booking-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const from = document.getElementById('from').value.trim();
            const to = document.getElementById('to').value.trim();
            // Если вы используете дополнительные поля, добавьте их здесь
            /*
            const datetime = document.getElementById('datetime').value;
            const carType = document.getElementById('car_type').value;

            if (!from || !to || !datetime || !carType) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            const data = {
                from: from,
                to: to,
                datetime: datetime,
                car_type: carType
            };
            */
            // Если вы используете только поля from и to:
            if (!from || !to) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            const data = { from: from, to: to };

            try {
                tg.sendData(JSON.stringify(data));
                
                // Отображаем сообщение об успешной отправке
                const successMessage = document.createElement('p');
                successMessage.innerText = 'Ваш заказ отправлен! Спасибо за использование LVTAXI.';
                successMessage.style.color = 'green';
                successMessage.classList.add('mt-3'); // Добавляем отступ сверху
                document.querySelector('.container').appendChild(successMessage);

                // Закрываем приложение через несколько секунд
                setTimeout(function() {
                    tg.close();
                }, 3000);
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
                alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
            }
        });
    } else {
        alert('Пожалуйста, откройте это приложение внутри Telegram.');
        // Вы можете скрыть форму или перенаправить пользователя
    }
});

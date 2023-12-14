// Código para fazer chamadas à API do Coinbase
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(error => {
            console.error('Erro ao registrar Service Worker:', error);
        });
}

if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Permissão para notificações concedida');
        }
    });
}

function fetchBitcoinPrice() {
  fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
      .then(response => response.json())
      .then(data => {
          const price = data.data.amount;
          showNotification('Preço do Bitcoin', `Preço atual: ${price}`);
      })
      .catch(error => {
          console.error('Erro ao obter o preço do Bitcoin:', error);
      });
}

// Código para exibir notificações
function showNotification(title, content) {
  if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: content });
  }
}

// Chamada inicial e agendamento para atualizar a cada 10 minutos
fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 10 * 60 * 1000); // Atualiza a cada 10 minutos

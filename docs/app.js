const ws = new WebSocket("ws://localhost:5000");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    document.getElementById("price").innerText = data.c;
};

async function loadPrice() {
    const symbol = document.getElementById("symbol").value;

    const res = await fetch(`/api/market/${symbol}`);
    const data = await res.json();

    document.getElementById("price").innerText = data.price;
}

async function buy() {
    await fetch('/api/trade/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: "AAPL", quantity: 1, price: 100 })
    });
}

async function sell() {
    await fetch('/api/trade/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: "AAPL", quantity: 1, price: 100 })
    });
}
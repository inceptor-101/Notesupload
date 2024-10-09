var query = "selling fast buy or get lost";
fetch('http://127.0.0.1:5000/query', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query_text: query,
        n_results: 5,
    }),
})
.then(response => response.json())
.then(data => console.log(data));

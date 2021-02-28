(function() {
    let promise = window.fetch('/.netlify/functions/server/questions');
    promise.then(response => response.json())
    .then(data => console.log(data));    
})()


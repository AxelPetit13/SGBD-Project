const data = (buffer) =>
  fetch("http://localhost:1234/api/players")
    .then(response => response.json())
    .then(json => buffer = json)




export default data;
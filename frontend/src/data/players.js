
const data = async (_then) => {
  fetch("http://localhost:1234/api/players").then(res => res.json()).then(json => _then(json));

}

export default data;
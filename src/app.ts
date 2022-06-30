

window.addEventListener('load', () => {
  console.log("Let's start")
  const contentDiv = document.getElementById('content') as HTMLElement;

  const baseUrl = 'https://pokeapi.co/api/v2/';
  const path = 'pokemon?limit=10&offset=0';

  fetch(baseUrl + path)
    .then(response => response.json())
    .then(data => {
      console.log(data.results[0].name);
      fetch(data.results[0].url)
        .then(response => response.json())
        .then(data => console.log(data));
      // data.results.forEach((item: { name: string | null; }) => {
      //   const div = document.createElement('div');
      //   div.textContent = item.name;
      //   contentDiv.append(div);
      // });
    })
    .catch(error => console.log(error));
});

function fetch1() {

}

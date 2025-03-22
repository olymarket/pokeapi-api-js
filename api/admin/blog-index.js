document.addEventListener("DOMContentLoaded", () => {
    pokeloading();

    document.getElementById("pokeprev").addEventListener("click", pokeprev);
    document.getElementById("pokenext").addEventListener("click", pokenext);
});

let   offset = 0;
const limit  = 10;

function pokeloading(){
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    fetch(url)
    .then(response => response.json())
    .then (data =>{
        const list_post = document.getElementById('list_post').querySelector('tbody');
        list_post.innerHTML = '';
        data.results.forEach(post => {
            const id = post.url.split('/').slice(-2, -1)[0];
    
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td># ${id}</td>
                <td>${post.name}</td>
                <td>${post.url}</td>
            `;
            list_post.appendChild(tr);
        });
    })
    .catch(error =>{
        console.log('Error fetch:', error);
    });
}

function pokeprev(){
    if(offset > 0){
        offset -= limit;
        pokeloading();
    }
}

function pokenext(){
    offset += limit;
    pokeloading();
}
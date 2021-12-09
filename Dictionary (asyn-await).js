console.log("Welcome to WOW Dictionary JavaScript");

// code goes here
const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (wordInput.length != 0) {

        document.getElementById('resultContainer').style.display = 'none';
        console.log("Dictionary JavaScript");
        let wordInput = document.getElementById('wordInput').value.toLowerCase();

        async function toFetch() {
            const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + wordInput);
            return response.json();
        }
        toFetch().then(
            function (data) {
                let wordsObj = data;
                let resultContainer = document.getElementById('resultContainer');
                let searchContainer = document.getElementById('searchContainer');

                if (wordsObj[0].word) {
                    searchContainer.style.top = "100px";
                    searchContainer.style.transition = ".7s";
                    resultContainer.style.display = 'block';
                }

                let results = document.getElementById('results');
                let html = `<h2 class="my-1">Definition of ${wordsObj[0].word} :</h2>
                                <p class="my-2" style="font-size:18px;">${wordsObj[0].meanings[0].definitions[0].definition}.</p>
                                <pre></pre>
                                <h3 class="my-1">Examples : </h3>
                                <ol style="font-size:18px;">
                                    <li>${wordsObj[0].meanings[0].definitions[0].example}</li>
                                </ol>`
                results.innerHTML = html;
            }).catch(function (error) {
                let resultContainer = document.getElementById('resultContainer');
                resultContainer.style.display = 'none';
                if (error.name == 'TypeError') {

                    searchContainer.style.top = "50%";
                    searchContainer.style.transition = ".3s ease-out";

                    let alert = document.getElementById('alert');
                    alertHtml = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Not found : </strong>Entered word is not valid.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
                    alert.innerHTML = alertHtml;

                    setTimeout(() => {
                        alert.innerHTML = "";
                    }, 4000);
                }
            })
        form.reset();
    }
});
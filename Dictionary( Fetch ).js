console.log("Welcome to WOW Dictionary JavaScript");

// code goes here
const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (wordInput.length != 0) {

        document.getElementById('resultContainer').style.display = 'none';
        console.log("Dictionary JavaScript");
        let wordInput = document.getElementById('wordInput').value.toLowerCase();

        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + wordInput).then(
            (response) => response.json()
        ).then((data) => {
            let wordsObj = data;
            let resultContainer = document.getElementById('resultContainer');
            let searchContainer = document.getElementById('searchContainer');

            if (wordsObj[0].word) {
                searchContainer.style.top = "100px";
                searchContainer.style.transition = ".7s";
                resultContainer.style.display = 'block';
            }

            document.getElementById('word').innerHTML = `${wordsObj[0].word}`
            document.getElementById('pronun').innerHTML = `[ ${wordsObj[0].phonetics[0].text} ]`
            document.getElementById('origin').innerHTML += `${wordsObj[0].origin}`

            document.getElementById('pos1').innerHTML = `As ${wordsObj[0].meanings[0].partOfSpeech} : `
            document.getElementById('def1').innerHTML = `${wordsObj[0].meanings[0].definitions[0].definition}`
            document.getElementById('ex1').innerHTML += `${wordsObj[0].meanings[0].definitions[0].example}`

            if (wordsObj[0].meanings.length > 1) {
                document.getElementById('pos2').innerHTML = `As ${wordsObj[0].meanings[1].partOfSpeech} : `
                document.getElementById('def2').innerHTML = `${wordsObj[0].meanings[1].definitions[0].definition}`
                document.getElementById('ex2').innerHTML += `${wordsObj[0].meanings[1].definitions[0].example}`
            }

            if (wordsObj[0].meanings.length > 2) {
                document.getElementById('pos3').innerHTML = `As ${wordsObj[0].meanings[2].partOfSpeech} : `
                document.getElementById('def3').innerHTML = `${wordsObj[0].meanings[2].definitions[0].definition}`
                document.getElementById('ex3').innerHTML += `${wordsObj[0].meanings[2].definitions[0].example}`
            }

            let wordSound = new Audio(wordsObj[0].phonetics[0].audio);
            document.getElementById('audioImg').addEventListener('click', ()=> wordSound.play())
        }).catch(function (error) {

            let resultContainer = document.getElementById('resultContainer');
            resultContainer.style.display = 'none';
            if (error) {

                searchContainer.style.top = "50%";
                searchContainer.style.transition = ".3s ease-out";

                let alert = document.getElementById('alert');
                alertHtml = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>${error.name} : </strong>${error.message}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
                alert.innerHTML = alertHtml;

                // setTimeout(() => {
                //     alert.innerHTML = "";
                // }, 4000);
            }
        })
        form.reset();
    }

});
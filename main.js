const nav = document.querySelector('.header_nav');
const magnifyingGlass = nav.querySelector('.magnifying');
const nav_p = document.querySelector('.nav_p');
const navButton = document.querySelector('.nav_button');
const searchWord = document.querySelector('.searchWord');
const mainSearchSection = document.querySelector('.main_searchSection');
const mainResultSection = document.querySelector('.main_resultSection');
const inputValue = document.getElementById('searchInput');
const Sample = document.getElementById('sample');
const isNoun = document.getElementById('isNoun');
const wordExample = document.getElementById('wordExample');
const resultAnswer = document.querySelector('.result_answer');
const resultExample = document.querySelector('.result_example');
const paragraph = document.querySelector('.errorStyles');
const Sound = document.getElementById('sound');
const footer = document.querySelector('.footer');
const content = footer.querySelector('.datetime');

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const today = new Date();
const newYear = today.getFullYear();
content.textContent = newYear;

navButton.addEventListener('click', ()=>{

        magnifyingGlass.classList.toggle('transRemove');
        navButton.classList.toggle('closeBtn');
        nav_p.textContent = "close";
        mainSearchSection.classList.remove('hide');
        mainSearchSection.classList.add('show');
        mainSearchSection.classList.remove('borderBottom');
        mainResultSection.classList.remove('borderTop');

        if(!navButton.classList.contains('closeBtn')){
                inputValue.value= '';
                nav_p.textContent = '';
                nav_p.textContent = "search word";
                mainSearchSection.classList.add('hide');
                mainSearchSection.classList.remove('show');
                mainResultSection.classList.remove('showY');
                mainResultSection.classList.add('hideY');
        } 
    
});

const fetchData = async () => {
        const word = inputValue.value.trim();

        if (word === "") {
                alert('Please Enter A Word!');
        return;
        }

        const dictionaryWord = `${url}${word}`;

        try {
        const response = await fetch(dictionaryWord);
        const data = await response.json();

        if(response.ok){
        console.log(data);
        console.log('Ok');

        Sample.textContent = `${data[0].word}`;
        isNoun.textContent = `${data[0].meanings[0].partOfSpeech}`;
        wordExample.textContent = `${data[0].phonetic}`;
        resultAnswer.textContent = `${data[0].meanings[0].definitions[0].definition}`;
        resultExample.textContent = `${data[0].meanings[0].definitions[0].example}`;

        const validAudio = data[0].phonetics.find(p=>p.audio);

        if(validAudio && validAudio.audio) {
                Sound.setAttribute('src', validAudio.audio);
        } else {
                Sound.removeAttribute('src');
        }

        }
        else {
               console.error('API ERROR:', data);
                mainResultSection.style.height = '10vh';
                mainResultSection.innerHTML = `<p class="errorStyles">Word Not found!.Refresh the Page.</p>` 
        }        

        } 
        catch(err) {
                console.error("Fetch failed:", err);
                mainResultSection.style.height = '10vh';
                mainResultSection.innerHTML = `<p class="errorStyles">Wrong API!.Refresh the Page.</p>` 
        }
}

function playSound(){
        Sound.play();
}


searchWord.addEventListener('click', ()=>{
        mainResultSection.classList.remove('hideY');
        mainResultSection.classList.add('showY');
        mainSearchSection.classList.add('borderBottom');
        mainResultSection.classList.add('borderTop');
        fetchData();
});

inputValue.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter'){
                fetchData();
        }
});
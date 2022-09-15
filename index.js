//index.js

function parseText(text){
    //Parse the data
    const JSONparse = JSON.parse(text)
    //Keep only the results and remove not wanted information
    const pokeInfo = JSONparse.results
    //print the name of the first POKEMON
    console.log(pokeInfo[0].name)
    return pokeInfo
}

function getPoke() {
    //Collect POKEMON with the link
    return fetch("https://pokeapi.co/api/v2/pokemon/?&limit=1154")
    .then(response => response.text())
    .then(parseText)
    .catch(console.log)
}

//Await allows to wait until the function has finished executed
const mypoke = await getPoke()
console.log(mypoke[0])

//---------------------------------------

function numberOfVowel(word){
    //g : global, i : ignore the casse
    var nbVowel = word.match(/[aeiou]/gi);
    return nbVowel === null ? 0 : nbVowel.length;
}

function numberOfVowelForEachPoke(pokeList){
    const pokeAndVowel = []
    pokeList.forEach(element => {
        let onePoke = [element.name , numberOfVowel(element.name)]
        pokeAndVowel.push(onePoke)
    })
    console.log(pokeAndVowel)
}

// The number of vowel for each POKE
console.log("The number of vowel for each POKE")
numberOfVowelForEachPoke(mypoke)
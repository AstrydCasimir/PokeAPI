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

//---------------------------------------

function parseUrl(urlText){
    //Parse the data
    const JSONparse = JSON.parse(urlText)
    //Keep only the results and remove not wanted information
    const pokeInfo = JSONparse.types
    const types = []
    pokeInfo.forEach(poke => {
        types.push(poke.type)
    })
    //console.log(types)
    return types
}

async function getUrlPoke(PokeList){
    const allPokeUrl = []
    PokeList.forEach(poke => {
        allPokeUrl.push(poke.url)
      })
    Promise.all(allPokeUrl.map(url =>
        fetch(url)
        .then(response => response.text())
        .then(parseUrl)
        .catch(console.log)
    ))
    .then(data => {
        //console.log(data)
        getTypeOccurence(data)
        return data
    })
}

function getTypeOccurence(typePokeList){
    //use reduce
    var concatTypeList = typePokeList.reduce(function(a, b) {
        return a.concat(b);
    });
    let PokeOccuTypes = concatTypeList.reduce(function (acc, obj) {
        var cle = obj["name"];
        if(!acc[cle]){
          acc[cle] = [];
        }
        acc[cle].push(obj["url"]);
        return acc;
      }, {});
    console.log(PokeOccuTypes)
}

console.log("The types")
let allTypes = await getUrlPoke(mypoke)
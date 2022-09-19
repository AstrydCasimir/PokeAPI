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

async function getPoke() {
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
    /*
    const pokeAndVowel = []
    pokeList.forEach(element => {
        let onePoke = [element.name , numberOfVowel(element.name)]
        pokeAndVowel.push(onePoke)
    })
    */
    let pokeWithPoke = pokeList.map(item => {
        return [item.name, numberOfVowel(item.name)]
    })
    console.log(pokeWithPoke)
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
        //return data
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
    console.log("The types")
    console.log(PokeOccuTypes)
}


await getUrlPoke(mypoke)

//---------------------------------------

function parseUrl10Poke(urlText){
    //Parse the data
    const JSONparse = JSON.parse(urlText)
    //Keep only the results and remove not wanted information
    const pokeStats = JSONparse.stats
    const pokeType = JSONparse.types
    const types = []
    pokeType.forEach(poke => {
        types.push(poke.type.name)
    })
    const myInfo =[
        pokeStats[1].base_stat,
        pokeStats[2].base_stat,
        pokeType
    ]
    return myInfo
}

function listOf10Poke(mypoke){
    const poke10 = mypoke.slice(0,10)
    //console.log(poke10)
    Promise.all(poke10.map(poke =>
        fetch(poke.url)
        .then(response => response.text())
        .then(parseUrl10Poke)
        .catch(console.log)
    ))
    .then(data => {
        //console.log(data)
        //console.log(poke10)
        let my10PokeInfo = []
        for (let i=0; i<10; i++){
            my10PokeInfo.push({
                Name : poke10[i].name ,
                Attack : data[i][0] ,
                Defense : data[i][1],
                Type : data[i][2] 
            })
        }
        console.log("My 10 Poke Info")
        console.log(my10PokeInfo)

    })
}

listOf10Poke(mypoke)
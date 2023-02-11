document.querySelector('#process').addEventListener('click',()=>{
    process(document.querySelector('#expression').value, document.querySelector('#tautologia-select').value)
})

function process(expressao, regra){
    switch(regra){
        case 'com':
            document.querySelector('#result').innerHTML = comutatividade(expressao)
            break
    }
}

function comutatividade(expressao){
    let expressaoTemp
    let operadorTemp

    if(expressao.includes('v')){
       expressaoTemp = expressao.split('v')
       operadorTemp = 'v'
    }else if(expressao.includes('^')){
        expressaoTemp = expressao.split('^')
        operadorTemp = '^'
    }

    return(`${expressaoTemp[1]} ${operadorTemp} ${expressaoTemp[0]}`)

}




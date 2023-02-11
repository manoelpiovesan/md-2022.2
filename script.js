document.querySelector('#process').addEventListener('click',()=>{
    process(document.querySelector('#expression').value, document.querySelector('#tautologia-select').value)
})

function process(expressao, regra){
    switch(regra){
        case 'com':
            document.querySelector('#result').innerHTML = comutatividade(expressao)
            break
        case 'dis':
            document.querySelector('#result').innerHTML = distibutividade(expressao)
            break
        case 'dm':
            document.querySelector('#result').innerHTML = deMorgan(expressao)
            break
        case 'dd':
            document.querySelector('#result').innerHTML = duplaNegacao(expressao)
        break
        case 'ass':
            document.querySelector('#result').innerHTML = associatividade(expressao)
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
    }else{
        return "A expressão fornecida não pode ser aplicada com a regra atual";
    }

    return(`${expressaoTemp[1]} ${operadorTemp} ${expressaoTemp[0]}`)

}

function distibutividade(expressao) {
    if (expressao.includes(" v ") && expressao.includes(" ^ ")) {
      let [A, B] = expressao.split(" v ");
      let [C, D] = B.split(" ^ ");
  
      // Aplique a distribuição: A v (C ^ D) = (A v C) ^ (A v D)
      return `(${A} v ${C}) ^ (${A} v ${D})`;
    }else{
        return "A expressão fornecida não pode ser aplicada com a regra atual";
    }
  }


  function deMorgan(expression) {
    // Verifique se a expressão começa com "not (A v B)" ou "not (A ^ B)"
    if (expression.startsWith("not (") && expression.endsWith(")")) {
      let expressaoNegada = expression.slice(4, -1);
      let [A, B] = expressaoNegada.split(/ v | \^ /);
  
      // Aplique a regra de De Morgan: not (A v B) = not A ^ not B
      // ou not (A ^ B) = not A v not B
      if (expressaoNegada.includes(" v ")) {
        return `not ${A} ^ not ${B}`;
      } else if (expressaoNegada.includes(" ^ ")) {
        return `not ${A} v not ${B}`;
      }
    }
  
    return "A expressão fornecida não pode ser aplicada com a regra de De Morgan";
  }

  function duplaNegacao(expression){
    // Verifique se a expressão começa com "not not"
    if (expression.startsWith("not not")) {
        let negatedExpression = expression.replace("not not", "");
        return negatedExpression;
    }
    return "A expressão fornecida não pode ser aplicada com a regra atual";
  }

  function associatividade(expression) {
    // Verifique se a expressão contém uma conjunção (A ^ B ^ C)
    if (expression.includes(" ^ ")) {
      // Separe A, B e C da conjunção
      let [A, B, C] = expression.split(" ^ ");
  
      // Aplique a associatividade: (A ^ B) ^ C = A ^ (B ^ C)
      return `${A} ^ (${B} ^ ${C})`;
    }
  
    // Verifique se a expressão contém uma junção (A v B v C)
    if (expression.includes(" v ")) {
      // Separe A, B e C da junção
      let [A, B, C] = expression.split(" v ");
  
      // Aplique a associatividade: (A v B) v C = A v (B v C)
      return `${A} v (${B} v ${C})`;
    }
  
    return "A expressão fornecida não pode ser aplicada com a regra atual";
  }

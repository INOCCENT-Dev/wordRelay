window.onload = function(){
  let req = new XMLHttpRequest();

  let text = document.getElementById('text'); // 플레이어 입력 칸
  let input = document.getElementById('input'); // 플레이어 입력 버튼

  let root = document.getElementById('root'); // 기본 div
  let result = document.createElement('div'); // 결과 표시 div
  result.className = 'result';

  root.appendChild(result);

  let wordDB; // 단어 db
  let usedWord = []; // 사용한 단어

  let playerWord; // 플레이어 입력
  let computerWord = ''; // 컴퓨터 입력

  req.onreadystatechange = function(){
    if(req.status == 200 && req.readyState ==4){
      let content =  req.responseText;
      wordDB = content.split('\r\n');
      wordDB = wordDB.filter(word => word.length > 1);
    }
  };

  input.onclick = function(){
    playerWord = text.value;
    result.innerHTML += ('<p class = "player" >플레이어 : ' + playerWord +'</p>');

    if(playerTurn(playerWord,computerWord,wordDB,usedWord)){
      computerWord = computerTurn(playerWord,wordDB,usedWord);
      result.innerHTML += ('<p class = "computer" >컴퓨터 : ' + computerWord)  +'</p>';
    }else result.innerHTML = '컴퓨터 승리';
  };

  req.open('GET','./Words.txt');
  req.send(null);
};

function computerTurn(word,list,used){
  let result = [];
  let last = word[word.length - 1];

  list.forEach(temp => {
    if(temp[0] == last && isNew(temp,used)) result.push(temp);
  });

  if(result.length > 0){
    let word = selectAsRandom(result);
    removeUsed(used,word);
    return word;
  }else return '플레이어 승리'; 
}

function playerTurn(word,com,list,used){
  let result = false;

  list.forEach(temp => {
    if(word == temp){
      if(word[0] == com[com.length - 1] || com == '')
        if(isNew(word,used)) result = true;
    }
  });

  removeUsed(used,word);
  return result;
}

function selectAsRandom(list){
  return list[Math.floor(Math.random() * list.length)];
}

function removeUsed(list,used){
  list.push(used);
}

function isNew(word,used){
  let result = true;

  used.forEach(temp => {if(temp == word) result = false});
  return result;
}
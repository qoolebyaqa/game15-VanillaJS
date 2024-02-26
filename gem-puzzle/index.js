
const flags = {
    'width': innerWidth,
    'pause': false,
    'save': false,
}

function toCreateElems() {
    const wrapper = document.createElement('div');
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    const ulButtons = document.createElement('ul');
    const divAboveField = document.createElement('div');
    const divMoves = document.createElement('div');
    const divMovesCounter = document.createElement('div');
    const divTime = document.createElement('div');
    const divTimeCounter = document.createElement('div');
    const divGameBody = document.createElement('div');
    const divUnderField = document.createElement('div');
    const divCurrentSize = document.createElement('div');
    const divCurrentSizeValue = document.createElement('div');
    const divSizesContainer = document.createElement('div');
    const divOtherSizes = document.createElement('div');
    const ulSizeLinks = document.createElement('ul');

    const audioClick = document.createElement('audio');
    audioClick.classList.add('audioClick');
    audioClick.src = '../gem-puzzle/assets/audio/click.mp3';
    document.body.append(audioClick);
    const audioClick1 = document.createElement('audio');
    audioClick1.classList.add('audioClick1');
    audioClick1.src = '../gem-puzzle/assets/audio/winner.mp3';
    document.body.append(audioClick1);

    const popupBody = document.createElement('div');
    popupBody.classList.add('popupBody');
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popupWrapper');
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popupContainer');
    const popupForm = document.createElement('form');
    popupForm.classList.add('popupForm');
    const popupFormLabel = document.createElement('label');
    popupFormLabel.classList.add('popupFormLabel');
    const popupInput = document.createElement('input');
    popupInput.classList.add('popupInput');
    const popupButton = document.createElement('input');
    popupButton.classList.add('popupButton');
    const popupResult = document.createElement('div');
    popupResult.classList.add('popupResult');
    const popupTitle = document.createElement('h2');
    popupTitle.classList.add('popupTitle');
    popupTitle.innerHTML = 'The best players';
    popupResult.append(popupTitle);
    if (localStorage.results) {
        const arrRs = JSON.parse(localStorage.getItem('results'));
        for (let i = 0; i< 10; i++) {
            const popupResultItem = document.createElement('p');            
            popupResultItem.classList.add('popupResultItem');
            popupResultItem.innerHTML = arrRs[i];
            popupResult.append(popupResultItem);
        }
    }
    else {
        for (let i = 0; i< 10; i++) {
            const popupResultItem = document.createElement('p');
            popupResultItem.classList.add('popupResultItem');
            popupResultItem.innerHTML = '----------------';
            popupResult.append(popupResultItem);
        }
    }
    
    
    popupInput.type = 'text';
    popupInput.placeholder = 'Insert your name';
    popupButton.type = 'button';
    popupButton.value = 'Done';
    popupFormLabel.innerHTML = 'You won! Let me remember you.'
    popupForm.append(popupFormLabel, popupInput, popupButton);
    popupContainer.append(popupForm, popupResult);
    popupWrapper.append(popupContainer);
    popupBody.append(popupWrapper);
    document.body.append(popupBody);

        
    wrapper.classList.add('__wrapper');
    header.classList.add('__header');
    nav.classList.add('__nav');
    ulButtons.classList.add('__ulButtons');
    divAboveField.classList.add('__divAboveField');
    divMoves.classList.add('__divMoves');
    divMovesCounter.classList.add('__divMovesCounter');
    divTime.classList.add('__divTime');
    divTimeCounter.classList.add('__divTimeCounter');
    divGameBody.classList.add('__divGameBody');
    divUnderField.classList.add('__divUnderField')
    divCurrentSize.classList.add('__divCurrentSize');
    divCurrentSizeValue.classList.add('__divCurrentSizeValue');
    divSizesContainer.classList.add('__divSizesContainer')
    divOtherSizes.classList.add('__divOtherSizes');
    ulSizeLinks.classList.add('__ulSizeLinks');
    for (let i = 0; i < 4; i++) {            
        const li = document.createElement('li');        
        li.classList.add('__li');
        ulButtons.append(li);
    }
    for (let i = 0; i < 6; i++) {
        const liSizeItem = document.createElement('li');
        const SizeButton = document.createElement('button');      
        liSizeItem.classList.add('__liSizeItem');
        SizeButton.classList.add('__SizeButton');
        liSizeItem.append(SizeButton);
        ulSizeLinks.append(liSizeItem);
        ulSizeLinks.children[i].children[0].innerHTML = `${i+3}x${i+3}`;
    }
    

    wrapper.append(header, divAboveField, divGameBody, divUnderField, divSizesContainer);
    header.append(nav);
    nav.append(ulButtons);
    divAboveField.append(divMoves, divMovesCounter, divTime, divTimeCounter);
    divUnderField.append(divCurrentSize, divCurrentSizeValue);
    divSizesContainer.append(divOtherSizes, ulSizeLinks)

    document.body.append(wrapper);
    ulButtons.children[0].textContent = 'Shuffle and start';
    ulButtons.childNodes[1].textContent = 'Stop';
    ulButtons.childNodes[2].textContent = 'Save';
    ulButtons.childNodes[3].textContent = 'Results';
    divMoves.innerHTML = 'Moves: ';
    divMovesCounter.innerHTML = '0';
    divTime.innerHTML = 'Time';
    divTimeCounter.innerHTML = '00:00'
    divCurrentSize.innerHTML = 'Frame size: ';
    divCurrentSizeValue.innerHTML = '4x4';
    divOtherSizes.innerHTML = 'Other sizes: ';
    return divGameBody;
}


function randomGenerate(obj, quantity = 16) {
    const gameBody = document.querySelector('.__divGameBody');
    gameBody.innerHTML = '';    
    if (localStorage.saver) {
        document.querySelector('.__ulButtons').children[2].classList.add('__save_active');
        const arrSaved = JSON.parse(localStorage.getItem('saver'));
        document.querySelector('.__divMovesCounter').innerHTML = JSON.parse(localStorage.getItem('moves'));
        document.querySelector('.__divTimeCounter').innerHTML = JSON.parse(localStorage.getItem('time'));               
        for (let i = 0; i < arrSaved.length; i++) {        
            const divGameCell = document.createElement('div');
            divGameCell.classList.add('__divGameCell');        
            if (flags.width > 410) {
                divGameCell.style.width = `${100/Math.pow(arrSaved.length, 0.5)-1}%`;
            }
            else {
                divGameCell.style.width = `${100/Math.pow(arrSaved.length, 0.5)-2}%`;
            }
            divGameCell.innerHTML = arrSaved[i];        
            gameBody.append(divGameCell);
        }
    }
    else {
        flags.quantity = quantity;
        document.querySelector('.__divMovesCounter').innerHTML = '0';
        document.querySelector('.__divTimeCounter').innerHTML = '00:00';
        for (let i = 0; i < quantity; i++) {        
            const divGameCell = document.createElement('div');
            divGameCell.classList.add('__divGameCell');        
            if (flags.width > 410) {
                divGameCell.style.width = `${100/Math.pow(quantity, 0.5)-1}%`
            }
            else {
                divGameCell.style.width = `${100/Math.pow(quantity, 0.5)-2}%`
            }        
            gameBody.append(divGameCell);
        }
        const resultArr = [];
        while (resultArr.length < obj.children.length-1) {
            let randomValue = Math.ceil(Math.random()*(obj.children.length-1));
            if (!resultArr.includes(randomValue)) {
                resultArr.push(randomValue);
            }
        }
        let randomNBSP = Math.ceil(Math.random()*(obj.children.length+1));
        let e = Math.ceil(randomNBSP/Math.pow(quantity, 0.5));
        while ((hasSolution(resultArr)+e)%2 !== 0) {
            randomNBSP = Math.ceil(Math.random()*(obj.children.length+1));
            e = Math.ceil(Math.ceil(Math.random()*(obj.children.length+1))/Math.pow(quantity, 0.5));
        }
        resultArr.splice(randomNBSP, 0, '&nbsp');
        flags.nbsp = randomNBSP;

        resultArr.forEach((value, index) => {
            obj.children[index].innerHTML = `${value}`;
        })
    }   
        
    gameBody.addEventListener('mousemove', gameProcess);
    
    return obj;
   
}
function hasSolution (array) {
    let forsum = [];
    for (let i = 0; i < array.length; i++) {
        const rightpartArr = array.slice(i+1);
        let n = 0;
        for (let j = 0; j < rightpartArr.length; j++) {
            if (rightpartArr[j] < array[i]) {
                n++;
            }
        }
        forsum.push(n);
    }    
    return forsum.reduce(function (sum, current) {
        return sum + current;
    }, 0);
}

function sizesListeners () {
    const gameSizes = document.querySelector('.__ulSizeLinks');
    const gameBody = document.querySelector('.__divGameBody');

    for (let i = 0; i < gameSizes.children.length; i++) {
        let rangeMatrix = Math.pow(gameSizes.children[i].children[0].innerHTML.slice(0, 1), 2);
        gameSizes.children[i].children[0].addEventListener('click', () => {
            localStorage.removeItem('saver');
            localStorage.removeItem('moves');
            localStorage.removeItem('time');
            flags.save = false;
            document.querySelector('.__ulButtons').children[2].classList.remove('__save_active');
            randomGenerate(gameBody, rangeMatrix);
            document.querySelector('.__divCurrentSizeValue').innerHTML = `${Math.pow(rangeMatrix, 0.5)}x${Math.pow(rangeMatrix, 0.5)}`;
        });        
    }
    return Math.pow(gameBody.children.length, 0.5);
}

function navListeners () {
    const ulBody = document.querySelector('.__ulButtons');
    const gameBody = document.querySelector('.__divGameBody');
    
    ulBody.children[0].addEventListener('click', () => {
        const current = Math.pow(document.querySelector('.__divCurrentSizeValue').innerHTML.slice(0,1), 2);
        localStorage.removeItem('saver');
        localStorage.removeItem('moves');
        localStorage.removeItem('time');
        flags.save = false;
        document.querySelector('.__ulButtons').children[2].classList.remove('__save_active');
        randomGenerate(gameBody, current);
    })
    ulBody.children[3].addEventListener('click', () => {
        document.querySelector('.popupBody').classList.add('popupBody_active');
        document.querySelector('.popupForm').classList.add('none'); 

        document.querySelector('.popupBody').addEventListener('click', (e) => {
            if (e.target === document.querySelector('.popupWrapper')) {
                document.querySelector('.popupBody').classList.remove('popupBody_active');
            }
        })
    })

    
    return;
}
function findspace() {
    for (let i = 0; i < document.querySelector('.__divGameBody').children.length; i++) {
        if (document.querySelector('.__divGameBody').children[i].innerHTML === '&nbsp;') {
            return i+1;
        }
    }
}


function gameProcess () {
    const gameBody = document.querySelector('.__divGameBody').children;
    const rangMatrix = Math.pow(gameBody.length, 0.5);    
    let indexofNbsp = findspace();
    
    const right = function() {
        gameBody[indexofNbsp].classList.add('transition__right'); 
        gameBody[indexofNbsp-1].classList.add('transition__left');
    }
    const left = function() {
        gameBody[indexofNbsp-2].classList.add('transition__left');
        gameBody[indexofNbsp-1].classList.add('transition__right');
    }
    const topp = function() {
        gameBody[indexofNbsp-1-rangMatrix].classList.add('transition__top');
        gameBody[indexofNbsp-1].classList.add('transition__bottom');
    }
    const bottom = function() {
        gameBody[indexofNbsp-1+rangMatrix].classList.add('transition__bottom');
        gameBody[indexofNbsp-1].classList.add('transition__top');
    }

    if (gameBody[indexofNbsp] !== undefined) {
        gameBody[indexofNbsp].addEventListener('click', right);        
    }
    if ( gameBody[indexofNbsp-2] !== undefined) {
        gameBody[indexofNbsp-2].addEventListener('click', left);
    }       
    if (gameBody[indexofNbsp-1+rangMatrix] !== undefined) {
        gameBody[indexofNbsp-1+rangMatrix].addEventListener('click', bottom);
    }
    if (gameBody[indexofNbsp-1-rangMatrix] !== undefined) {
        gameBody[indexofNbsp-1-rangMatrix].addEventListener('click', topp);
    }
    if (indexofNbsp%rangMatrix === 0) {
        if (gameBody[indexofNbsp]!== undefined) {
            gameBody[indexofNbsp].removeEventListener('click', right);
        }
    }
    if (indexofNbsp%rangMatrix === 1) {
        if (gameBody[indexofNbsp-2] !== undefined) {
            gameBody[indexofNbsp-2].removeEventListener('click', left);
        }
    }
    document.querySelector('.__divGameBody').addEventListener('animationend', (e) => {
        const arrSwap = [];

        for (let i = 0; i < gameBody.length; i++) {
            if (gameBody[i].matches('.transition__right') || gameBody[i].matches('.transition__left') || gameBody[i].matches('.transition__top')|| gameBody[i].matches('.transition__bottom')) {
                arrSwap.push(i);                
                if (arrSwap.length === 2) {
                    document.querySelector('.__divMovesCounter').innerHTML++;
                    let contentY = gameBody[arrSwap[0]].innerHTML;
                    let contentX = gameBody[arrSwap[1]].innerHTML;
                    gameBody[arrSwap[0]] = '';
                    gameBody[arrSwap[1]] = '';
                    gameBody[arrSwap[0]].innerHTML = contentX;
                    gameBody[arrSwap[1]].innerHTML = contentY;
                    
                    checkWin();
                    document.querySelector('.audioClick').play();
                }
                gameBody[i].classList.remove('transition__right');
                gameBody[i].classList.remove('transition__left');
                gameBody[i].classList.remove('transition__top');
                gameBody[i].classList.remove('transition__bottom'); 
            }
            gameBody[i].removeEventListener('click', right);
            gameBody[i].removeEventListener('click', left);
            gameBody[i].removeEventListener('click', topp);
            gameBody[i].removeEventListener('click', bottom);
        }
    });
}

function checkWin () {
    const arrBody = Array.from(document.querySelector('.__divGameBody').children);
    const arrResult = arrBody.reduce(function (sum, current) {
        return sum + current.innerHTML;
    }, '');

    if (arrResult === '12345678&nbsp;' || arrResult === '123456789101112131415&nbsp;' || arrResult === '123456789101112131415161718192021222324&nbsp;' || arrResult === '1234567891011121314151617181920212223242526272829303132333435&nbsp;' || arrResult === '123456789101112131415161718192021222324252627282930313233343536373839404142434445464748&nbsp;' || arrResult === '123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263&nbsp;') {
        const moves = document.querySelector('.__divMovesCounter').innerHTML;
        const timeout = document.querySelector('.__divTimeCounter').innerHTML;
        alert(`Hooray! You solved the puzzle in ${timeout} and ${moves} moves!`);
        document.querySelector('.popupBody').classList.add('popupBody_active');        
        document.querySelector('.popupForm').classList.remove('none');
        document.querySelector('.popupButton').addEventListener('click', addTolist);        
    }
    function addTolist () {
        const list = document.querySelector('.popupResult').children;
        const inputName = document.querySelector('.popupInput').value;
        const moves = document.querySelector('.__divMovesCounter').innerHTML;
        const timeout = document.querySelector('.__divTimeCounter').innerHTML;
        document.querySelector('.popupForm').classList.add('none');
        document.querySelector('.popupButton').remove('click', addTolist);
        
        for (let i = 1; i<11; i++) {
            if (list[i].innerHTML === '----------------') {
                list[i].innerHTML = '';
                list[i].innerHTML = `${inputName} --- ${timeout} --- ${moves}`;
                break;               
            }
            else if (list[i].innerHTML.slice(list[i].innerHTML.lastIndexOf('-')+1) > moves*1) {
                const newResult = document.createElement('p');
                newResult.classList.add('popupResultItem');
                newResult.innerHTML = `${inputName} --- ${timeout} --- ${moves}`;
                
                list[i].before(newResult);
                document.querySelector('.popupResult').lastChild.remove;
                i++;
                break;                
            }
            else if (list[i].innerHTML.slice(list[i].innerHTML.lastIndexOf('-')+1) == moves*1) {
                list[i].innerHTML = '';
                list[i].innerHTML = `${inputName} --- ${timeout} --- ${moves}`;
                break;
            }   
        }
         
        const arrResults = [];
        for (let obj of list) {
            arrResults.push(obj.innerHTML);
        }
        arrResults.shift();
        localStorage.setItem('results', JSON.stringify(arrResults));

        document.querySelector('.popupBody').addEventListener('click', (e) => {
            if (e.target === document.querySelector('.popupWrapper')) {
                document.querySelector('.popupBody').classList.remove('popupBody_active');
            }
        });
        
        randomGenerate(document.querySelector('.__divGameBody'));
    }
}

function saver() {
    document.querySelector('.__ulButtons').children[2].addEventListener('click', saveonclick);
    function saveonclick () {
        flags.save = true;
        document.querySelector('.__ulButtons').children[2].classList.add('__save_active');
        const currentPosition = [];
        const currentT = document.querySelector('.__divTimeCounter').innerHTML;
        const currentMoves = document.querySelector('.__divMovesCounter').innerHTML;
        for (let i of document.querySelector('.__divGameBody').children) {
            currentPosition.push(i.innerHTML);
        }
        localStorage.setItem('saver', JSON.stringify(currentPosition));
        localStorage.setItem('time', JSON.stringify(currentT));
        localStorage.setItem('moves', JSON.stringify(currentMoves));
    };
}

function timer () {
    const watcher = document.querySelector('.__divTimeCounter');
    let seconds = 0;
    let timer;
    
    const start = () => {
        clearInterval(timer);
        timer = setInterval(() => {
            seconds+=1000;
            let date = new Date(seconds);
            watcher.innerHTML = 
                ('0' + date.getUTCMinutes()).slice(-2) + ':'+ ('0' + date.getUTCSeconds()).slice(-2);
        }, 1000);
    }

    const stopTime = () => {
        clearInterval(timer);
        seconds = 0;
        watcher.innerHTML = '00:00';
    };

    const pauseTime = () => {
        clearInterval(timer);
    }

    start();

    document.addEventListener('click', (e) => {
        const elem = e.target;
        if (elem.innerHTML === 'Stop') {
            alert('Game is on pause!');
        };
        if(elem.innerHTML === 'Shuffle and start') {
            stopTime();
            start();
        }
        if (elem.matches('.__SizeButton')) {
            stopTime();
            start();
        }
        if (elem.matches('.popupWrapper')){
            start();
        } 
        if (document.querySelector('.popupBody').matches('.popupBody_active')){
            pauseTime();
        }
        if (elem === document.querySelector('.popupButton')) {
            stopTime();
        }
    })
}



randomGenerate(toCreateElems());
sizesListeners();
navListeners();
saver();        
timer();



//var cbxTypeSelect = document.getElementById("cbxTypeSelect");
//cbxTypeSelect.addEventListener("change", showTypeControls);

//var btnAddControls = document.getElementById("btnAddControls");
//btnAddControls.addEventListener("click", createNewControls);

function showTypeControls() {
    var typeIndex = document.getElementById("cbxTypeSelect").selectedIndex;
    var tdParts = document.getElementById("tdForParts");

    switch (typeIndex) {
        case 0: postControl(tdParts); break;
        case 1: phoneControl(tdParts); break;
        case 2: exponentialNotationControl(tdParts); break;
        case 3: numbersControl(tdParts); break;
    }

}

function phoneControl(tdParts) {
    tdParts.style.visibility = "hidden";

}
function postControl(tdParts) {
    tdParts.style.visibility = "visible";
}
function exponentialNotationControl(tdParts) {
    tdParts.style.visibility = "hidden";
}
function numbersControl(tdParts) {
    tdParts.style.visibility = "hidden";
}

function createNewControls() {
    var typeIndex = document.getElementById("cbxTypeSelect").selectedIndex;
    if (typeIndex == 0 && checkNumberParts()) {
        createElementsWithDiv();
    }
    else if (typeIndex != 0) {
        createElementsWithDiv();
    }
    else {
    }

}
function checkNumberParts() {
    var valuePartsCounter = document.getElementById('txtPartsCounter').value;
    var isNumber = /^\d+$/.test(valuePartsCounter);
    if (isNumber && valuePartsCounter > 2) {
        return true;
    }
    else {
        alert('Количество частей должно быть числом, больше 2!');
        return false;
    }
}


function createElementsWithDiv() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute("class", "form-group");
    document.body.appendChild(newDiv);
    createLabelType(newDiv);
    createInputTypeText(newDiv);
    createButtonOk(newDiv);
    createLabelResult(newDiv);
    createButtonDelete(newDiv);
}
function createLabelType(newDiv) {
    var lblType = document.createElement('label');
    var typeIndex = document.getElementById("cbxTypeSelect").selectedIndex;
    var typeMessage = document.getElementById("cbxTypeSelect").options[typeIndex].text;
    lblType.innerText = typeMessage;
    newDiv.appendChild(lblType);
}
function createInputTypeText(newDiv) {
    var newInput = document.createElement('input');
    var valueMask = document.getElementById('txtMask').value;
    newInput.placeholder = valueMask;
    newDiv.appendChild(newInput);
    //  newInput.addEventListener("keypress", function () { maskTypeFilter(newInput) });// Метод точной маски.
}
function createButtonOk(newDiv) {
    var newButtonOk = document.createElement('button');
    newButtonOk.innerText = "OK";
    newDiv.appendChild(newButtonOk);
    newButtonOk.setAttribute("class", "btn btn-primary");
    newButtonOk.addEventListener("click", function () { getResult(newDiv) });
}
function createLabelResult(newDiv) {
    var newResult = document.createElement('label');
    newResult.className = "lblResult";
    newResult.innerText = "Результат:";
    newResult.setAttribute("class", "bg-success");
    newDiv.appendChild(newResult);
}
function createButtonDelete(newDiv) {
    var newButtonDelete = document.createElement('button');
    newButtonDelete.innerText = "X";
    newDiv.appendChild(newButtonDelete);
    newButtonDelete.setAttribute("class", "btn btn-danger");
    newButtonDelete.addEventListener("click", function () { deleteDiv(newDiv) });
}
function isTextSuitableMask(text, mask) {
    var masText = text.split(' ');
    if (masText.length - 1 == mask.length) {
        return true;
    }
    return false;
}

function deleteDiv(newDiv) {
    document.body.removeChild(newDiv);
}

/*
Правила пользования. Каждый пробел введенный в тип, будет заменяться на его аналог идущий в маске. 
Например + - заменит первый пробел на '+' второй на ' ' и третий на '-'. 
*/

function getResult(newDiv) {
    var resultLabel = newDiv.getElementsByTagName("label")[1];
    var inputTextType = newDiv.getElementsByTagName("input")[0].value;
    var mask = newDiv.getElementsByTagName("input")[0].placeholder;
    var splitString = inputTextType.split(' ');
    if (isTextSuitableMask(inputTextType, mask)) {
        var result = "";
        // result = inputTextType;//для replace метода
        for (var i = 0; i < mask.length; i++) {
            splitString[i] = splitString[i] + mask[i];
            //  var result = result.replace(" ", mask[i]);//Нет возможности вставить пробел поэтому использован метод split
        }
        for (var i = 0; i < splitString.length; i++) {
            result += splitString[i];
        }
        resultLabel.innerText = result;
    }

    else {
        resultLabel.innerText = "Ошибка, в маске " + mask.length + " символов, значит в поле должно быть столько же пробелов!";
    }
}


/*
Метод для точной маски, в котором приходилось любой символ, который не известен, заменять на  символ(_). 
Метод был не гибким, так как нужно было, знать количество символов введенных пользователем.
*/
function maskTypeFilter(newInput) {
    var code = event.keyCode;
    var mask = newInput.placeholder;
    var text = String.fromCharCode(code);

    if (text == mask[newInput.value.length] || mask[newInput.value.length] == '_') {
        if (mask.length == newInput.value.length) {
            alert('Ввод завершен!!!');
        }
    }
    else {
        alert('Вводите по маске!');
        event.returnValue = false;
        return false;

    }
}

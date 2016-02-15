

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
    newInput.addEventListener("keypress", function () { maskTypeFilter(newInput) });
}
function createButtonOk(newDiv) {
    var newButtonOk = document.createElement('button');
    newButtonOk.innerText = "OK";
    newDiv.appendChild(newButtonOk);

}
function createLabelResult(newDiv) {
    var newResult = document.createElement('label');
    newResult.innerText = "Результат:";
    newDiv.appendChild(newResult);
}
function createButtonDelete(newDiv) {
    var newButtonDelete = document.createElement('button');
    newButtonDelete.innerText = "X";
    newDiv.appendChild(newButtonDelete);
    newButtonDelete.addEventListener("click", function () { deleteDiv(newDiv) });
}
function deleteDiv(newDiv) {
    document.body.removeChild(newDiv);

}
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






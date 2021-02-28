/**
* @Params type: {String} iconName - A helper method to create symbols similar to icon using css. As of now 2 icons are created.
* More icons to be added.
* @return type { Node } arrowNode - Returns the left and right pointer long arrow icon[created with css].
*/

function createIcon(iconName) {

    if(iconName == 'left-arrow') {
      return createLeftArrowIcon();
    }
  
    if(iconName == 'right-arrow') {
      return createRightArrowIcon();
    }
  }
  
  function createLeftArrowIcon(iconName) {
    var arrowNode = document.createElement('div');
    arrowNode.setAttribute('class', "arrow");
    var lineNode = document.createElement('div');
    lineNode.setAttribute('class', "line");
    var pointNode = document.createElement('div');
    pointNode.setAttribute('class', "point-left");
    arrowNode.appendChild(lineNode);
    arrowNode.appendChild(pointNode);
    return arrowNode;
  }
  
  function createRightArrowIcon(iconName) {
    var arrowNode = document.createElement('div');
    arrowNode.setAttribute('class', "arrow");
    var lineNode = document.createElement('div');
    lineNode.setAttribute('class', "line");
    var pointNode = document.createElement('div');
    pointNode.setAttribute('class', "point-right");
    arrowNode.appendChild(lineNode);
    arrowNode.appendChild(pointNode);
    return arrowNode;
  }

/**
* @Params type: {string} text - label of the html button.
* @Params type: {object} attrs - other attributes like class and data-* attributes are passed as object and set to button for iterating through the attrs.
* @Params type: {string - 'Left' || 'Right'} iconPosition - placing the icon to the left or right of the button text.
* @Params type: {string} iconName - name of the icon to be rendered with button component (Need to be implemented).
* @params type { function } cb - A call back method for on change event handler.
* @returns type { Node } buttonElement - Returns the created button component.
* More events will be handled later.
*/

function createActionButton(text, attrs, iconPosition, cb, iconName) {
    var buttonElement = document.createElement('button');
    for(var key in attrs) {
      buttonElement.setAttribute(key, attrs[key]);
    }
  
    var buttonText = document.createElement('span');
    buttonText.textContent = text || 'Click Me';
    buttonElement.appendChild(buttonText);
    
    if(iconPosition == 'left') {
      buttonElement.classList.add('with-left-icon');
      buttonElement.appendChild(createIcon('left-arrow'));
    }
  
    if(iconPosition == 'right') {
      buttonElement.classList.add('with-right-icon');
      buttonElement.appendChild(createIcon('right-arrow'));
    }
  
  
    buttonElement.addEventListener('click', cb);
  
    return buttonElement;
}

const ButtonComponent = {
    createActionButton: createActionButton
};

/**
* @Params type: {string} text - label next to radio button.
* @Params type: {string} name - name of the input radio button.
* @Params type: {string} value - Value of the input radio button.
* @Params type: {boolean} checked - checked state of the radio button.
* @params type { function } cb - A call back method for on change event handler.
* @returns type { Node } labelElement - Returns the created radio button component.
* More events will be handled later.
*/

function createRadioButton(text, name, value, checked, cb) {
    var labelElement = document.createElement('label');
    labelElement.setAttribute('class', 'radio-button');
    var spanElem = document.createElement('span');
    spanElem.innerText = text;
  
    var inputElement = document.createElement("input");
    inputElement.setAttribute('type', "radio");
    inputElement.setAttribute('name', 'test');
    inputElement.setAttribute('value', value);
    inputElement.addEventListener('change', cb);
  
    if(checked) {
      inputElement.setAttribute('checked', false);
    }
  
    labelElement.appendChild(inputElement);
    labelElement.appendChild(spanElem);
  
    return labelElement;
}

const RadioButtonComponent = {
    createRadioButton: createRadioButton
};

/**
* Descriptions : As of now text area is the only output of this. Later it will be configured for HTML <input /> tag as well.
* @Params type: {string} inputValue - Value of the text box.
* @params type { function } cb - A call back method for on focusout event handler.
* @returns type { Node } wrapper - Returns the created text area component with its wrapper element.
* More events will be handled later.
*/

function createInput(inputValue, cb) {
    var wrapper = document.createElement('div');
  
    var labelElement = document.createElement('h2');
    var textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'text-area');
    textArea.setAttribute('placeholder', 'Add your comments here');
    textArea.value = inputValue;
    
    textArea.addEventListener("focusout", cb);
  
    wrapper.appendChild(labelElement);
    wrapper.appendChild(textArea);
  
    return wrapper;
}

const TextInputComponent = {
    createInput: createInput
};

/**
* Description : This chip component is a customized radio button element.
* @Params type: {string} text - label of the chip component.
* @Params type: {string} name - name of the chip component.
* @Params type: {string} value - Value of the chip component.
* @Params type: {boolean} checked - checked state of the chip component.
* @params type { function } cb - A call back method for on change event handler.
* @returns type { Node } labelElement - Returns the created chip component.
* More events will be handled later.
*/

function createChip(text, name, value, checked, cb) {
    var labelElement = document.createElement('label');
    labelElement.setAttribute('class', 'selection');
    var spanElem = document.createElement('span');
    spanElem.innerText = text;
  
    var inputElement = document.createElement("input");
    inputElement.setAttribute('type', "radio");
    inputElement.setAttribute('name', 'test');
    inputElement.setAttribute('value', value);
  
    if(checked) {
      inputElement.setAttribute('checked', false);
    }
  
    inputElement.addEventListener('change', cb);
  
    labelElement.appendChild(inputElement);
    labelElement.appendChild(spanElem);
  
    return labelElement;
  }

const ChipComponent = {
    createChip: createChip
};

let selectedAnswers = {};


/**
  * @Params type: {object} formItem : Each Question Object and it's options.
  * @params type: {Node} node : HTML element to which the dynamically created UI components has to be rendered(appended);
*/
function renderRadioButton(formItem, node) {
  if(formItem.options) {
    formItem.options.forEach((option) => {

      if(JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`))) {
        if(option.text === JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`)).text) {
          option.checked = true;
        } else {
          option.checked = false;
        }
      }

      var radioButton = RadioButtonComponent.createRadioButton(option.text, formItem['qus-id'], option.points, option.checked, function() {
        formItem.selectedOption = option;

        selectedAnswers[`${formItem['qus-id']}`] = option;
        
        sessionStorage.setItem(`${formItem['qus-id']}`, JSON.stringify(option));
      });

      node.appendChild(radioButton);

    });
  }
}

/**
  * @Params type: {object} formItem : Each Question Object and it's options.
  * @params type: {Node} node : HTML element to which the dynamically created UI components has to be rendered(appended);
*/
function renderSelectionChip(formItem, node) {
  formItem.options.forEach((option) => {
    if(JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`))) {
      if(option.text === JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`)).text) {
        option.checked = true;
      } else {
        option.checked = false;
      }
    }
    var chip = ChipComponent.createChip(option.text, formItem['qus-id'], option.points, option.checked, function() {
      formItem.selectedOption = option;

      selectedAnswers[`${formItem['qus-id']}`] = option;

      sessionStorage.setItem(`${formItem['qus-id']}`, JSON.stringify(option));
    });
    node.appendChild(chip);
  });

}

/**
  * @Params type: {object} formItem : Each Question Object and it's options.
  * @params type: {Node} node : HTML element to which the dynamically created UI components has to be rendered(appended);
*/
function renderTextInput(formItem, node) {
  let savedValue = sessionStorage.getItem(`${formItem['qus-id']}`);
  let inputValue = savedValue || 'default';
  var textInputElement = TextInputComponent.createInput(inputValue, (e) => {

    selectedAnswers[`${formItem['qus-id']}`] = e.target.value;

    sessionStorage.setItem(`${formItem['qus-id']}`, e.target.value);
  });

  node.appendChild(textInputElement);
}

/**
  * @Params type: {object} formItem : Based on the formItem(question) type - the rendering functions of UI components will be invoked.
*/

function getInputElement(formItem) {
    var node = document.createElement('div');
  
    switch (formItem.type) {
      case 'boolean':
          renderRadioButton(formItem, node);
        break;
      case 'rating':
          node.setAttribute('class', 'chip-container');
          renderSelectionChip(formItem, node);
        break;
      case 'text':
          renderTextInput(formItem, node); 
        break;
        // console.log('default');
    }
    return node;
}

/**
  * Accepts the prev active form and the next active form ids and switch the form in UI.
  * @Params type: {Number} activeFormId
  * @Params type: {Number} prevId
*/

function setFormActive(activeFormId, prevId) {
  var selector = `[data-form-index="${activeFormId}"]`;
  var prevSel = `[data-form-index="${prevId}"]`;
  var ele = document.querySelectorAll(selector)[0];
  var prev = document.querySelectorAll(prevSel)[0];

  prev.classList.add('form-inactive');
  ele.classList.add('form-active');
  ele.classList.add('form-active-animate');
  setTimeout(()=> {
    prev.classList.remove('form-active');
    prev.classList.remove('form-inactive');
    ele.classList.remove('form-active-animate');

    sessionStorage.setItem('activeFormId', activeFormId);
  }, 800);
}

/**
* @Description: This function checks if the answer object has atleast 1 value and submits it to the endpoint
* endpoint - "/answers"
*/

function submitFeedback() {
  sessionStorage.clear();
  sessionStorage.setItem('activeFormId', "0");


  if(Object.keys(selectedAnswers).length > 0) {
    let submitFeedbackPromise = fetch("/.netlify/functions/server/answers", {  
      method: "POST",
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        answers: selectedAnswers
      })
    });
    submitFeedbackPromise.then(response => response.json()).then(json => console.log(json));  
  }
  
}

/**
* @Params type: {Array} formItem - Each form item is an object to with questions and its type.
* @return null
*/
function createForms(formItem, array) {
  
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    form.setAttribute('data-form-id', formItem['qus-id']);   
    form.setAttribute('data-form-index', formItem['qus-index']);   
  
    if(formItem['qus-index'] === activeFormId) {
      form.classList.add('form-active');
    }
  
    var optionsElement = getInputElement(formItem);
  
    var questionElement = document.createElement('p');
    questionElement.setAttribute('class', 'question-description');
    questionElement.textContent = `${formItem['qus-index']}. ${formItem.question}`;
  
    var btnAttrs = {
      "class": 'form__btn',
      "data-form-id": formItem['qus-id'],
      "data-form-index": formItem['qus-index'],
    };
  
    function prevClick(e) {
      e.preventDefault();
      activeFormId = parseInt(e.target.getAttribute('data-form-index')) - 1;
  
      if(activeFormId < 0 ) ; else {
        setFormActive(activeFormId, e.target.getAttribute('data-form-index'));
      }
    }
  
    function nextClick(e) {
      e.preventDefault();
      activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  
      if(activeFormId > array.length) {
        submitFeedback();        
        document.getElementById('base-form').classList.add('form-active');
      } else {
        setFormActive(activeFormId, e.target.getAttribute('data-form-index'));
      }
    }
    
    var b1 = ButtonComponent.createActionButton('Previous', btnAttrs, "left", prevClick);
    b1.classList.add('outline');
    b1.classList.add('prev-btn');
  
    let lastPage = (formItem['qus-index'] === array.length);
  
    var b2 = ButtonComponent.createActionButton(lastPage ? 'Submit' : 'Next', btnAttrs, "right", nextClick);
    b2.classList.add('solid');
    b2.classList.add('next-btn');
  
    var formHeader = document.createElement('div');
    var formFooter = document.createElement('div');
  

    formHeader.setAttribute('class', 'form--header-container');
    formFooter.setAttribute('class', 'form--footer-container');
  
    var heading = document.createElement('h1');
    heading.setAttribute('class', 'form--header-title');
    heading.textContent = 'Fresh Fruits';
    formHeader.appendChild(heading);
  
  
    formFooter.appendChild(b1);
    formFooter.appendChild(b2);
  
    form.appendChild(formHeader);
    form.appendChild(questionElement);
    form.appendChild(optionsElement);
    form.appendChild(formFooter);
  
    var main = document.getElementsByTagName('main')[0];
    var endPage = document.getElementById('base-form');
    main.insertBefore(form, endPage);
}
  
const FormBuilderComponent = {
    createForms: createForms,
    setPage: setFormActive
};

let promise = window.fetch('/.netlify/functions/server/questions');
promise.then(response => response.json())
      .then(data => {
        prepareQuestionnaire(data);
      });

window.activeFormId = JSON.parse(sessionStorage.getItem('activeFormId')) || 0;

if(!activeFormId) {
  document.getElementById('index-form').classList.add('form-active');
}

window.goToFeedBackQuestions = function(e) {
  e.preventDefault();
  activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  FormBuilderComponent.setPage(1, 0);
};


/**
  * @Params type: {array} questions : Questions received from API.
  * @Description : Iterated the questions and create sepearate form for each questions;
*/

function prepareQuestionnaire(questions) {
  questions.forEach((item, index, array) => {
    item['qus-id'] = index;
    item['qus-index'] = index + 1;
    FormBuilderComponent.createForms(item, array);
  });
}

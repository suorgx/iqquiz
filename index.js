// константы для DOM-элементов
const startButton = document.querySelectorAll('.start-js') // кнопка старта теста
const content = document.querySelector('.content-js') // стартовый лендинг
const scene = document.querySelector('.scene-js') // сцена теста
const bar = document.querySelector('.bar-js') // бар
const barProgress = document.querySelector('.color-js') // заполнение бара
const menu = document.querySelector('.menu-js') // кнопка меню
const overlay = document.querySelector('.overlay-js') // выпадающее меню
const closeButton = document.querySelector('.close-js') // закрыть оверлей
const info = document.querySelector('.info-js') // текст в шапке

const arrayQuiz = [ // массив данных
    [  
        'укажите ваш возраст', // вопрос
        [
            ['До 18', 20], // первое значение ответа, результат айкью за ответ
            ['От 18 до 28', 21], // второй значение ответа, результат айкью за ответ
            ['От 18 до 35', 22],
            ['От 36', 23],
        ],
        'вопросы' // тип вопроса
    ],
    [  
        'Какое определение, по-Вашему, больше подходит к этому геометрическому изображению',
        [
            ['Ответ 2', 20],
            ['Ответ 3', 21],
            ['Ответ 4', 22],
        ],
        'картинка',
        'brain.png' // картинка если есть. можно добавлять для типов вопроса 'картина' и 'фигуры'
    ],
    // [  
    //     'Выберите правильную фигуру из четырёх пронумерованных',
    //     [
    //         ['1', 20],
    //         ['2', 21],
    //         ['3', 22],
    //         ['4', 22],
    //     ],
    //     'фигуры',
    //     'brain.png'
    // ],
    // [  
    //     'Выберите цвет, который сейчас наиболее Вам приятен', 
    //     [
    //         ['red', 20], 
    //         ['green', 21],
    //         ['gray', 22],
    //         ['blue', 22],
    //         ['black', 21],
    //         ['green', 21],
    //         ['gray', 22],
    //         ['blue', 22],
    //         ['black', 21],
    //     ],
    //     'цвета'
    // ],
    // [  
    //     'Выберите лишнее',
    //     [
    //         ['Дом', 10],
    //         ['Шалаш', 11],
    //         ['Бунгало', 12],
    //         ['Скамейка', 22],
    //         ['Хижина', 11],
    //     ],
    //     'вопросы'
    // ],
    // [  
    //     'Продолжите числовой ряд \n 18  20  24  32',
    //     [
    //         ['62', 20],
    //         ['48', 31],
    //         ['74', 22],
    //         ['57', 20],
    //         ['60', 21],
    //         ['77', 22],
    //     ],
    //     'вопросы'
    // ],
    // [  
    //     'Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен', 
    //     [
    //         ['red', 20], 
    //         ['green', 21],
    //         ['gray', 22],
    //         ['blue', 22],
    //         ['black', 21],
    //         ['green', 21],
    //         ['gray', 22],
    //         ['blue', 22],
    //         ['black', 21],
    //     ],
    //     'цвета'
    // ],
]

// каунтеры
let counter = 0 // счетчик слайдов
let result = 0 // счетчик icq
let step = 0 // шаг прогресс бар

// переменные для временных DOM-элементов
let pick, pickQuestion, pickAnswer, label, input, next, nextButton, imgInfo

const creatingQuestion = (percent, question, answers) => { // создание блоков c вопросами
    scene.innerHTML = '' // очищаем сцену перед каждым слайдом

    if (bar.style.display !== 'flex') { // выводим бар, если его нет
        bar.style.display = 'flex'
    }

    barProgress.style.width = percent // меняем прогресс бара через аргумент

    if (imgInfo === undefined) { // создаем картинку с информацией в шапке, если ее нет
        imgInfo = document.createElement('img')
        imgInfo.src = 'img/brain.png'
        info.appendChild(imgInfo)
        info.append('Тест на определение IQ')
    }

    pick = document.createElement('div') // блок с ответами
    pick.classList.add('pick')
    pickQuestion = document.createElement('div')
    pickQuestion.classList.add('pick__question')
    pickQuestion.innerText = question + ':' // вопрос передается через аргумент
    pickAnswer = document.createElement('div') 
    scene.appendChild(pick)

    // TODO: объединить некоторые методы в этих проверках в одну функцию
    // в зависимости от типа вопроса, делаем разную структуру
    if (arrayQuiz[counter][2] === 'фигуры') { //проверка через значение массива
        for (let i = 0; i < answers.length; i++) {
            creatingInput()

            pickAnswer.classList.add('pick__answers_figure')
            label.style.width = `${100/(answers.length+1)}%`
            input.setAttribute('value', 'answer_' + i)
            input.id = 'answer_' + i

            if (arrayQuiz[counter][3] !== undefined) { //проверка на наличие картинки
                pickQuestion.innerHTML = question + '<br><img src="img/' + arrayQuiz[counter][3] + '">'
            }
            label.innerText = answers[i][0]
            label.insertBefore(input, label.firstChild)
            pickAnswer.appendChild(label)
        }
    } else if (arrayQuiz[counter][2] === 'цвета') {
        for (let i = 0; i < answers.length; i++) { 
            creatingInput()

            pickAnswer.classList.add('pick__answers_color')
            label.classList.add('pick__answer_color')
            label.style.backgroundColor = answers[i][0];
            input.setAttribute('value', 'answer_' + i)
            input.id = 'answer_' + i
            label.insertBefore(input, label.firstChild)
            pickAnswer.appendChild(label)
        }
    } else if (arrayQuiz[counter][2] === 'картинка') {
        for (let i = 0; i < answers.length; i++) { 
            creatingInput()

            pickAnswer.classList.add('pick__answers')
            input.setAttribute('value', 'answer_' + i)
            input.id = 'answer_' + i

            if (arrayQuiz[counter][3] !== undefined) { //проверка на наличие картинки
                pickQuestion.innerHTML = question + '<br><img src="img/' + arrayQuiz[counter][3] + '">'
            }
            label.innerText = answers[i][0]
            label.insertBefore(input, label.firstChild)
            pickAnswer.appendChild(label)
        }
    } else {
        for (let i = 0; i < answers.length; i++) {
            creatingInput()
            
            pickAnswer.classList.add('pick__answers')
            input.setAttribute('value', 'answer_' + i)
            input.id = 'answer_' + i
            label.innerText = answers[i][0]
            label.insertBefore(input, label.firstChild)
            pickAnswer.appendChild(label)
        }
    }

    next = document.createElement('div') // блок с кнопкой
    next.classList.add('next')
    nextButton = document.createElement('div') // кнопка "далее"
    nextButton.classList.add('next__button', 'button')
    nextButton.innerText = 'Далее'

    scene.appendChild(next)
    next.appendChild(nextButton)  

    nextButton.addEventListener('click', () => { nextSlide(answers) }) // переключение слайда
}

const creatingInput = () => { // создание инпутов и лейблов в каждом слайде
    label = document.createElement('label')
    label.classList.add('pick__answer')
    input = document.createElement('input')
    input.setAttribute('type', 'radio')
    input.setAttribute('name', 'radio')
    pick.appendChild(pickQuestion)
    pick.appendChild(pickAnswer)
    label.insertBefore(input, label.firstChild)
    pickAnswer.appendChild(label)
}

const nextSlide = (answers) => { // следующий слайд
    let allInputs = document.querySelectorAll('input') //выбор всех инпутов

    let isChecked = false
    for(let i = 0; i < allInputs.length; i++) { // проверка выбора инпута
        if (allInputs[i].type === "radio" && allInputs[i].checked) {
            isChecked = true
            counter = counter + 1
            result = result + answers[i][1]
            step = step + (100 / arrayQuiz.length) // прогресс бар

            if (arrayQuiz.length === counter) { // окончание квиза
                finishQuiz()
            } else {
                creatingQuestion(`${step}%`, arrayQuiz[counter][0], arrayQuiz[counter][1])
            } 
        }
    }

    if (isChecked !== true) {
        alert('Выберете один из предложенных вариантов')
    }
}

const finishQuiz = () => { // конец квиза
    pick.innerHTML = 'Обработка Результатов' + '<div class="pick__rotate"></div>' + '<div class="pick__download">Определение стиля мышления.</div>'
    next.style.display = 'none'
    barProgress.style.width = '100%'
    let interval = setInterval(function() { // добавление точки через интервал
        document.querySelector('.pick__download').append('.')
    }, 400); // скорость добавления точки
                
    setTimeout(function() {
        clearInterval(interval);
        lastSlide()

    }, 3000); //время через сколько включается последний слайд
}

const lastSlide = () => { // последний слайд
    bar.style.display = 'none'
    pick.innerHTML = '' // очищаем сцену

    let lastTitle = document.createElement('div') // заголовок
    lastTitle.classList.add('last__title')
    lastTitle.innerText = 'Ваш результат рассчитан:'

    let lastDiscribe = document.createElement('div') // описание
    lastDiscribe.classList.add('last__discribe')
    lastDiscribe.innerText = 'вы относитесь к 3% респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону!'

    let lastSubtitle = document.createElement('div') // подзаголовок
    lastSubtitle.classList.add('last__subtitle')
    lastSubtitle.innerText = 'Скорее получите свой результат!'

    let lastAgenda = document.createElement('div') // соглашение
    lastAgenda.classList.add('last__agenda')
    lastAgenda.innerText = 'В целях защиты персональных данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона'

    let lastRecord = document.createElement('div') // текст с таймером
    lastRecord.classList.add('last__subtitle')
    lastRecord.innerText = 'Звоните скорее, запись доступна всего '

    let timer = document.createElement('div') // таймер
    timer.classList.add('last__subtitle')
    timer.innerText = '10:00'

    pick.appendChild(lastTitle)
    pick.appendChild(lastDiscribe)
    pick.appendChild(lastSubtitle)
    pick.appendChild(lastAgenda)
    pick.appendChild(lastRecord)
    pick.appendChild(timer)

    // let lastCallButton = '<div class="last__call">позвонить и прослушать результат </div>'

    let second = 15

    let timerSecond = setInterval(function() { 
        console.log(second)
        timer.innerText = second
        second = second - 1

        if (second < 0) {
            clearInterval(timerSecond); 
            console.log('end')
        }
    }, 1000);

    // pick.innerHTML = `Тест окончен. Ваш результат ${result}`
    info.innerText = 'Готово!'
}

const visibleOverlay = () => { // видимость оверлей меню
    if (overlay.classList.contains('overlay__visible') === false) {
        overlay.classList.add('overlay__visible');
    } else {
        overlay.classList.remove('overlay__visible');
    }
}

const startQuiz = () => { // старт квиза
    content.remove() // удаляем стартовый лендинг
    if (overlay.classList.contains('overlay__visible') === true) {
        visibleOverlay()
    }
    counter = 0; result = 0; step = 0 // обнуляем счетчики, нужно чтобы запустить тест заново на последних слайдах
    creatingQuestion(0, arrayQuiz[counter][0], arrayQuiz[counter][1]) // создаем первый вопрос
}

for (let i = 0; i < startButton.length; i++) {
    startButton[i].addEventListener('click', startQuiz)
}

menu.addEventListener('click', visibleOverlay)

closeButton.addEventListener('click', visibleOverlay)
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
        'Укажите ваш пол', // вопрос на первом слайде
        [
            ['Мужчина', 20], // первое значение - вариант ответа, второе значение - результат айкью за этот ответ
            ['Женщина', 20],
        ],
        'вопросы' // тип вопроса
    ],
    [  
        'Укажите ваш возраст',
        [
            ['До 18', 20],
            ['От 18 до 28', 21],
            ['От 18 до 35', 22],
            ['От 36', 23],
        ],
        'вопросы' 
    ],
    [  
        'Выберите лишнее',
        [
            ['Дом', 10],
            ['Шалаш', 11],
            ['Бунгало', 12],
            ['Скамейка', 22],
            ['Хижина', 11],
        ],
        'вопросы' 
    ],
    [  
        'Продолжите числовой ряд \n 18  20  24  32',
        [
            ['62', 20],
            ['48', 31],
            ['74', 22],
            ['57', 20],
            ['60', 21],
            ['77', 22],
        ],
        'вопросы'
    ],
    [  
        'Выберите цвет, который сейчас наиболее Вам приятен', 
        [
            ['#A8A8A8', 20], 
            ['#0000A9', 21],
            ['#00A701', 22],
            ['#F60100', 22],
            ['#FDFF19', 21],
            ['#A95403', 21],
            ['#000000', 22],
            ['#850068', 22],
            ['#46B3AC', 21],
        ],
        'цвета'
    ],
    [  
        'Отдохните пару секунд, еще раз выберите цвет, который сейчас наиболее Вам приятен', 
        [
            ['#A8A8A8', 20], 
            ['#46B2AC', 21],
            ['#A95403', 22],
            ['#00A701', 22],
            ['#000000', 21],
            ['#F60100', 21],
            ['#850068', 22],
            ['#FDFF19', 22],
            ['#0000A9', 21],
        ],
        'цвета' // тип вопроса
    ],
    [  
        'Какой из городов лишний?',
        [
            ['Вашингтон', 20],
            ['Лондон', 31],
            ['Париж', 21],
            ['Нью-Йорк', 32],
            ['Москва', 20],
            ['Оттава', 22],
        ],
        'вопросы'
    ],
    [  
        'Выберите правильную фигуру из четырёх пронумерованных',
        [
            ['1', 20],
            ['2', 21],
            ['3', 32],
            ['4', 22],
        ],
        'фигуры',
        'figure.png' // картинка если есть. можно добавлять для типов вопроса 'картина' и 'фигуры'
    ],
    [  
        'Вам привычнее и важнее:',
        [
            ['Наслаждаться каждой минутой проведенного времени', 20],
            ['Быть устремленными мыслями в будущее', 31],
            ['Учитывать в ежедневной практике прошлый опыт', 21],
        ],
        'вопросы'
    ],
    [  
        'Какое определение, по-Вашему, больше подходит к этому геометрическому изображению',
        [
            ['Оно остроконечное', 20],
            ['Оно устойчиво', 21],
            ['Оно-находится в состоянии равновесия', 22],
        ],
        'картинка',
        'figure2.png' // картинка если есть. можно добавлять для типов вопроса 'картина' и 'фигуры'
    ],
    [  
        'Вставьте подходящее число', 
        [
            ['34', 20], 
            ['36', 21],
            ['53', 22],
            ['44', 22],
            ['66', 21],
            ['42', 21],
        ],
        'фигуры',
        'figure3.png' 
    ],
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
    if (arrayQuiz[counter][2] === 'фигуры') { // проверка через значение массива
        for (let i = 0; i < answers.length; i++) {
            creatingInput()

            pickAnswer.classList.add('pick__answers_figure')
            label.style.width = `${100/(answers.length+1)}%`
            input.setAttribute('value', 'answer_' + i)
            input.id = 'answer_' + i

            if (arrayQuiz[counter][3] !== undefined) { // проверка на наличие картинки
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
    let allInputs = document.querySelectorAll('input') // выбор всех инпутов

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
    pick.style.height = 'max-content' // 
    let interval = setInterval(function() { // добавление точки через интервал
        document.querySelector('.pick__download').append('.')
    }, 400); // скорость добавления точки
                
    setTimeout(function() {
        clearInterval(interval);
        lastSlide()

    }, 3000); // время через сколько включается последний слайд
}

const lastSlide = () => { // последний слайд
    // pick.innerHTML = `Тест окончен. Ваш результат ${result}`

    bar.style.display = 'none' // убираем бар
    info.innerText = 'Готово!' // меняем шапку
    pick.innerHTML = '' // очищаем сцену

    let lastTitle = document.createElement('div') // заголовок
    lastTitle.classList.add('last__title')
    lastTitle.innerText = 'Ваш результат рассчитан:'

    let lastDiscribe = document.createElement('div') // описание
    lastDiscribe.classList.add('last__discribe')
    lastDiscribe.innerHTML = '<span>вы относитесь к 3%</span> респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону!'

    let lastSubtitle = document.createElement('div') // подзаголовок
    lastSubtitle.classList.add('last__subtitle')
    lastSubtitle.innerText = 'Скорее получите свой результат!'

    let lastAgenda = document.createElement('div') // соглашение
    lastAgenda.classList.add('last__agenda')
    lastAgenda.innerText = 'В целях защиты персональных данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона'

    let lastRecord = document.createElement('div') // текст с таймером
    lastRecord.classList.add('last__record')
    lastRecord.innerText = 'Звоните скорее, запись доступна всего '

    let timer = document.createElement('span') // таймер
    timer.innerText = '10:00'

    let text = document.createElement('span')
    text.innerText = ' минут'

    let lastCallButton = document.createElement('div') // текст с таймером
    lastCallButton.classList.add('last__call')
    lastCallButton.innerText = 'позвонить и прослушать результат '

    let lastFooter = document.createElement('div') // текст внизу блока
    lastFooter.classList.add('last__footer')
    lastFooter.innerText = 'TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI, '

    let forLightning = document.createElement('div') // молния
    forLightning.classList.add('for__lightning')

    let forLightningLeft = document.createElement('div') // молния
    forLightningLeft.classList.add('for__lightning_left')

    pick.appendChild(lastTitle)
    pick.appendChild(lastDiscribe)
    pick.appendChild(lastSubtitle)
    pick.appendChild(lastAgenda)
    lastRecord.appendChild(timer)
    lastRecord.appendChild(text)
    pick.appendChild(lastRecord)
    pick.appendChild(lastCallButton)
    pick.appendChild(lastFooter)
    pick.appendChild(forLightningLeft)
    pick.appendChild(forLightning)

    let second = 59 // количество секунд
    let minuts = 9 // количество минут
    let timerCountdown = setInterval(function() { // функция отсчета секунд
        if (second < 10) {
            timer.innerText = `${minuts}:0${second}`
        } else {
            timer.innerText = `${minuts}:${second}`
        }
        second = second - 1
        if (second < 0) {
            minuts = minuts - 1
            second = 59 // возвращаем значение секунд
        }
        if (minuts < 0) {
            clearInterval(timerCountdown);
            lastRecord.innerHTML = 'Запись больше не доступна' 
            lastCallButton.remove()
        }
    }, 1000)

    lastCallButton.addEventListener('click', function(){ // функция на кнопку "позвонить"
        
        pick.innerHTML = '' // очищаем слайд
        pick.style.height = '90vh'

        let dataResult, dataNameResult, keyReplace;
        fetch('https://swapi.dev/api/people/1/') // ссылка на json
        .then(function(response) {
            response.json().then(function(json) { // из jsona в объект
                for (key in json) { // перебор данных в объекте
                    if (typeof json[key] === 'string') { // выводим данные если это не ссылка или другой массив/объект
                        if (json[key].substring(0, 5) !== 'https') {
                            keyReplace = key.replace(/\_/, ' ') // замена '_' на пробелы
                            dataResult = document.createElement('div')
                            dataResult.classList.add('pick__result')
                            dataNameResult = document.createElement('span')
                            dataResult.appendChild(dataNameResult)
                            dataNameResult.append( `${keyReplace}` )
                            dataResult.append( ` - ${json[key]}` )
                            pick.appendChild(dataResult)
                        }
                    }
                }
            })
        })
    })

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


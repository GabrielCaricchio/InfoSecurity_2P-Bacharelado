const questions = [
    {
        question: " O que é phishing?",
        answers: [
            {id: 1, text: "Uma técnica de segurança para proteger dados", correct: false},
            {id: 2, text: "Um método de ataque para enganar usuários e roubar informações", correct: true},
            {id: 3, text: "Um software antivírus", correct: false},
            {id: 4, text: "Um protocolo de rede seguro", correct: false}
        ]
    },
    {
        question: " Qual dessas senhas é a mais segura?",
        answers: [
            {id: 1, text: "senha123", correct: false},
            {id: 2, text: "Qwerty!", correct: false},
            {id: 3, text: "P@ssw0rd", correct: false},
            {id: 4, text: "8&dF#2kL!mN", correct: true}
        ]
    },
    {
        question: " O que é autenticação de dois fatores (2FA)?",
        answers: [
            {id: 1, text: "Um método de criptografia", correct: false},
            {id: 2, text: "Um processo que requer dois métodos de verificação para acessar uma conta", correct: true},
            {id: 3, text: "Um tipo de firewall", correct: false},
            {id: 4, text: "Um software de backup", correct: false}
        ]
    },
    {
        question: " O que é um antivírus?",
        answers: [
            {id: 1, text: "Um programa que protege contra malware e vírus", correct: true},
            {id: 2, text: "Um tipo de firewall", correct: false},
            {id: 3, text: "Um protocolo de rede", correct: false},
            {id: 4, text: "Um software de edição de fotos", correct: false}
        ]
    },
    {
        question: " O que é um firewall?",
        answers: [
            {id: 1, text: "Um software de edição de vídeos", correct: false},
            {id: 2, text: "Um dispositivo ou software que monitora e controla o tráfego de rede", correct: true},
            {id: 3, text: "Um tipo de malware", correct: false},
            {id: 4, text: "Um protocolo de comunicação", correct: false}
        ]
    },
    {
        question: " O que significa a sigla VPN?",
        answers: [
            {id: 1, text: "Virtual Private Network", correct: true},
            {id: 2, text: "Verified Public Network", correct: false},
            {id: 3, text: "Virtual Public Network", correct: false},
            {id: 4, text: "Verified Private Network", correct: false}
        ]
    },
    {
        question: " O que é ransomware?",
        answers: [
            {id: 1, text: "Um tipo de software de segurança", correct: false},
            {id: 2, text: "Um ataque que bloqueia o acesso a dados até que um resgate seja pago", correct: true},
            {id: 3, text: "Um protocolo de rede seguro", correct: false},
            {id: 4, text: "Um tipo de firewall", correct: false}
        ]
    }
]

const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('answers-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Avançar';
    showQuestion();
}

function resetState() {
    nextButton.style.display = 'none';
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answersButtons.appendChild(button);
    })
}

function selectAnswer(e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.find(ans => ans.correct == true);

    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answersButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você pontuou ${score} de ${questions.length}!`;
    nextButton.innerHTML = 'Reiniciar Quiz';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();
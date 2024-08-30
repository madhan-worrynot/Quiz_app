const quizData = [
    { question: "What is the capital of France?", a: "Berlin", b: "Madrid", c: "Paris", d: "Lisbon", correct: "c" },
    { question: "Which language is used for web development?", a: "Python", b: "JavaScript", c: "Java", d: "C++", correct: "b" },
    { question: "Who is the President of the United States (2024)?", a: "Donald Trump", b: "Barack Obama", c: "Joe Biden", d: "Kamala Harris", correct: "c" },
    { question: "What does CSS stand for?", a: "Colorful Style Sheets", b: "Creative Style Sheets", c: "Cascading Style Sheets", d: "Computer Style Sheets", correct: "c" },
    { question: "What year was JavaScript created?", a: "1995", b: "1994", c: "1993", d: "1996", correct: "a" },
    { question: "Which company developed the React framework?", a: "Google", b: "Facebook", c: "Twitter", d: "Microsoft", correct: "b" },
    { question: "Which of these is a backend language?", a: "HTML", b: "CSS", c: "Node.js", d: "React", correct: "c" },
    { question: "Which HTML tag is used for the largest heading?", a: "<h6>", b: "<h1>", c: "<heading>", d: "<head>", correct: "b" },
    { question: "Which company owns GitHub?", a: "Apple", b: "Google", c: "Amazon", d: "Microsoft", correct: "d" },
    { question: "Which HTML element is used to define a hyperlink?", a: "<link>", b: "<href>", c: "<a>", d: "<hyperlink>", correct: "c" }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const playAgainBtn = document.getElementById('play-again');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showFinalScore();
        }
    }
});

function showFinalScore() {
    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
        <button id="play-again">Play Again</button>
    `;
    const playAgainBtn = document.getElementById('play-again');
    playAgainBtn.addEventListener('click', () => {
        currentQuiz = 0;
        score = 0;
        loadQuiz();
        quiz.innerHTML = `
            <div id="quiz-header">
                <h2 id="question">Question Text</h2>
                <ul id="quiz-options">
                    <li><input type="radio" name="answer" class="answer" id="a"><label for="a" id="a_text">Option A</label></li>
                    <li><input type="radio" name="answer" class="answer" id="b"><label for="b" id="b_text">Option B</label></li>
                    <li><input type="radio" name="answer" class="answer" id="c"><label for="c" id="c_text">Option C</label></li>
                    <li><input type="radio" name="answer" class="answer" id="d"><label for="d" id="d_text">Option D</label></li>
                </ul>
            </div>
            <button id="submit">Submit</button>
        `;
        document.getElementById('submit').addEventListener('click', submitBtn.click);
        loadQuiz();
    });
}

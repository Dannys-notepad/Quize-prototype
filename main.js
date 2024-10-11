const quizData = [
	{
		question: 'What is the product of 3 and 4',
		options:[12, 18, 14],
		ans: 0
	},
	{
		question: 'What is the product of 8 and 2',
		options:[21, 18, 16],
		ans: 2
	},
	{
		question: 'What is the sum of 15 and 9',
		options:[25, 24, 28],
		ans: 1
	}
]


let Quize = localStorage.getItem('Quize') ? JSON.parse(localStorage.getItem('Quize')) : [];

const signIn = document.querySelector('.signin')
const userInfo = document.querySelector('.user-info')
const startArea = document.querySelector('.start-area')
const quizArea = document.querySelector('.quiz-area')

function checkStorage(){
		if(Quize.length !== 0){
			let info = ''
			let score
			for(const quiz of Quize){
				score = quiz.score
				info += `
					<div class="quiz-block">
						<p class="username">Hey ${quiz.name}</p>
						<div  class="info">
							<p class="info user-score">Score: ${quiz.score}</p>
						</div>
					<div/>
				`
			}
			userInfo.innerHTML += info
			startArea.innerHTML = `
				<div class="quiz-block">
					<p>Start quiz</p>
					<div class="buttons">
						<button class="btn2 start-btn" onclick="displayQuiz()">Start</button>
					</div>
				<div/>
			`
		}else{
			signIn.innerHTML = `
				<form class="quiz-block">
					<p>Enter your name and ID</p>
					<div class="buttons">
						<input type="text" class="name" required>
						<button class="btn2 start" onclick="register()">Start</button>
					</div>
				<form/>

			`
		}
}

function register() {
	let name = document.querySelector('.name').value
	if(name === null || name === ''){
		alert('Name can not be blank')
		return false
	}	
	let user = {
		name,
		score: 0,
	}

	Quize.push(user)
	localStorage.setItem('Quize', JSON.stringify(Quize))
	//signIn.remove()
}

let currentQuestion = score = count = 0

function displayQuiz(){
	startArea.remove()
	quizArea.style.display = 'block'
	const questionEle = document.querySelector('.question')
	const options = document.querySelector('.buttons')
	
	options.innerHTML = ''
	
	questionEle.textContent = quizData[currentQuestion].question

	quizData[currentQuestion].options.forEach((option, index) => {
		const optionElement = document.createElement('button')
		optionElement.classList = `btn${++count}`
		optionElement.textContent = option
		optionElement.addEventListener('click', () => {
			checkIndex(index)
		})
		options.appendChild(optionElement)
	})

	//displayNext()
}

function checkIndex(selectedAnswer){
	const correctAnswer = quizData[currentQuestion].ans

	if(selectedAnswer === correctAnswer){
		score++
	}
	displayNext()
}

function displayNext(){
	currentQuestion++, count = 0
	document.querySelector('.next-buttons').innerHTML = ''
	
	if(currentQuestion >= quizData.length){
		Quize[0].score = score
		
	  localStorage.setItem('Quize', JSON.stringify(Quize))
		alert(`Congrats you've finished the quiz and your score is ${score}`)
		document.querySelector('.next-area').innerHTML = ''
	}else{
		quizArea.style.display = 'none'
		document.querySelector('.next-area').style.display = 'block'
		
		const nextQuestionElement = document.querySelector('.next-question')
		const nextOptionsElement = document.querySelector('.next-buttons')
		
		nextQuestionElement.textContent = quizData[currentQuestion].question
		
		quizData[currentQuestion].options.forEach((option, index) => {
			const optionElement = document.createElement('button')
			optionElement.classList = `btn${++count} ans${count}`
			optionElement.textContent = option
			optionElement.addEventListener('click', () => {
			checkIndex(index)
			})
			nextOptionsElement.appendChild(optionElement)
			
		})
		
	}
}



checkStorage()		
document.addEventListener('DOMContentLoaded', () => {
    // Questions data
    const questions = [
        {
            question: "Are you a man or a woman?",
            options: ["Man", "Woman"]
        },
        {
            question: "Have you been on more than 2 diets in the last 12 months?",
            options: ["Yes", "No"]
        },
        {
            question: "What is your weight loss goal?",
            options: ["Lose 1-20 pounds for good", "Lose 21-50 pounds for good", "Lose over 50 pounds for good"]
        },
        {
            question: "Are you interested in melting up to 2½ lbs of stubborn belly fat every 48 hours?",
            options: ["Yes", "No"]
        },
        {
            question: "This free video tutorial contains a brand new easy method for losing weight fast and keeping it off. Do you promise to watch the full video?",
            options: ["Yes", "No"]
        }
    ];

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;
    
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressFill = document.getElementById('progress-fill');
    const mainContent = document.getElementById('main-content');
    const resultsModal = document.getElementById('results-modal');
    const modalCloseBtn = document.querySelector('.modal-close');

    // Function to update the progress bar
    function updateProgressBar() {
        const progress = (currentQuestionIndex / totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
    }

    // Function to show a question
    function showQuestion() {
        if (currentQuestionIndex >= totalQuestions) {
            showResults();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(optionText => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'quiz-option';
            optionInput.value = optionText;
            
            const optionLabel = document.createElement('label');
            optionLabel.classList.add('option-text');
            optionLabel.textContent = optionText;
            optionLabel.htmlFor = `option-${optionText.replace(/\s/g, '-')}`;

            optionDiv.appendChild(optionInput);
            optionDiv.appendChild(optionLabel);
            
            // Add event listener to handle option clicks
            optionDiv.addEventListener('click', () => {
                const selectedOption = document.querySelector('.option.selected');
                if (selectedOption) {
                    selectedOption.classList.remove('selected');
                    selectedOption.querySelector('input[type="radio"]').checked = false;
                }
                optionDiv.classList.add('selected');
                optionInput.checked = true;
                // Automatically move to the next question after a brief delay
                setTimeout(() => {
                    currentQuestionIndex++;
                    updateProgressBar();
                    showQuestion();
                }, 500); // 500ms delay
            });

            optionsContainer.appendChild(optionDiv);
        });

        updateProgressBar();
    }

    // Function to show the results modal
    function showResults() {
        mainContent.classList.add('hidden');
        resultsModal.style.display = 'flex';
    }
    
    // Event listener for closing the modal
    modalCloseBtn.addEventListener('click', () => {
        resultsModal.style.display = 'none';
        // You can reset the quiz here if needed
        currentQuestionIndex = 0;
        mainContent.classList.remove('hidden');
        showQuestion();
    });

    // Initial setup
    showQuestion();
});

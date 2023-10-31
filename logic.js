document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("questionnaire-form");
    const resultDiv = document.getElementById("result");
    const printButton = document.getElementById("printButton");
    const submitButton = document.getElementById("submitButton")
    const questions = document.querySelectorAll('.question');
    const postText = document.getElementById('PostText');
    const scrollbuttons = document.getElementsByClassName('scroll-buttons')
    console.log("Question Length: ", questions.length)
    let currentQuestionIndex = 0;
    
//! N/A Checkbox logic
// Add event listeners to the "Not Available" checkboxes


//*###########################*//
//! Animation Logic //
 //*###########################*//
// Function to reveal the next question with fade-in/fade-out animation
function revealNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        // Fade out the current question
        questions[currentQuestionIndex].classList.add('fade-out');

        // Delay the animation for a smoother effect
        setTimeout(() => {
            // Hide the current question after fading out
            questions[currentQuestionIndex].classList.remove('fade-out');
            questions[currentQuestionIndex].classList.add('hidden');
            questions[currentQuestionIndex].classList.remove('fade-in');

            // Move to the next question
            currentQuestionIndex++;
            //! Progress bar
            const progress = (currentQuestionIndex / (questions.length)) * 100;
            const progressBar = document.querySelector('.progress-bar .progress');
            progressBar.style.width = `${progress}%`;
            // Reveal the next question with fade-in animation
            questions[currentQuestionIndex].classList.remove('hidden');
            questions[currentQuestionIndex].classList.add('fade-in');

            // Scroll to the next question
            setTimeout(() => {
                questions[currentQuestionIndex].scrollIntoView({ behavior: "smooth" });
            }, 100); // Adjust the delay if needed

            // Update radioInputs to target radio inputs of the current question
            radioInputs = questions[currentQuestionIndex].querySelectorAll('input[type="radio"]');
            // Attach click event listeners to new radio inputs
            radioInputs.forEach(input => {
                input.addEventListener('change', revealNextQuestion);
            });
        }, 300); // Adjust the delay for fade-out if needed
    }
}
let submitbuffer = 0
function revealAllQuestions() {
    questions.forEach((question) => {
        question.classList.remove('hidden');
        question.classList.add('fade-in');
        question.style.backgroundImage = 'none';
    });
    postText.style.display = 'block';
    if (submitbuffer === 0) { 
        submitButton.style.display = 'block';
        submitbuffer = 1;
        console.log("submit state", submitbuffer)
    }

    // Scroll to the bottom
    setTimeout(() => {
        const questionnaireSection = document.querySelector(".contents");
        if (questionnaireSection) {
            questionnaireSection.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, 100); // Adjust the delay if needed
    const poggg = document.getElementById('poggg');
    poggg.style.display = 'none';
    for (let i = 0; i < scrollbuttons.length; i++) {
        scrollbuttons[i].style.display = 'flex';
    }
}

let questionrevealcount = 0
// Attach click event listeners to radio inputs to reveal the first question
let radioInputs = questions[currentQuestionIndex].querySelectorAll('input[type="radio"]');
radioInputs.forEach(input => {
    input.addEventListener('change', revealNextQuestion);
    questionrevealcount ++;
});
// Attach click event listeners to radio inputs to reveal all questions when any radio input in Question 8 is selected
let radioInputsQuestion8 = questions[7].querySelectorAll('input[type="radio"]');
radioInputsQuestion8.forEach(input => {
    input.addEventListener('change', revealAllQuestions);
});

// Initially display the first question
questions[currentQuestionIndex].classList.add('question-animate-in');
// End of question navigation code

//*###########################*//
//!Submit Button Logic
//*###########################*//


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;

        const notAvailableEmail = notAvailableEmailCheckbox.checked;
        const notAvailablePhone = notAvailablePhoneCheckbox.checked;
    
        if (!notAvailableEmail) {
            const email = document.getElementById("email").value;
            // Validate email format
            if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
        }
    
        if (!notAvailablePhone) {
            const phonenum = document.getElementById("phonenum").value;
            if (phonenum.length < 7 || phonenum.length > 12) {
                alert("Please enter a valid phone number.");
                return;
            }
        }

        // Collect answers and their values
        const answers = [];
        const questions = document.querySelectorAll(".question");
        questions.forEach((question, index) => {
            const selectedAnswer = question.querySelector('input[name="q' + (index + 1) + '"]:checked');
            if (selectedAnswer) {
                answers.push({
                    question: "Question " + (index + 1),
                    answer: selectedAnswer.value,
                    value: parseInt(selectedAnswer.value) || 0,
                });
            }
        });
        console.log("Answers: ",answers)

        // Calculate total score
        let totalScore = 0;
        let consolelogcounter = 0
        answers.forEach(answer => {
            totalScore += answer.value;
            consolelogcounter += 1
        });
        console.log("Total Score:", totalScore)

        // Display total score and show the result div
        const resultHTML = `<h2>Total Risk Assessment Score: ${totalScore}</h2>
                            <h4>Risk Profile:<br> <span id="risk-profile-placeholder">{profile}</span></h4>
                            <p>We have received your submission. Please print this page and bring it with you to your meeting, Thank you!</p>`;
        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = "block"; 
        submitButton.style.display="none";
        printButton.style.display = "block"; 

        // You can determine the risk profile based on the total score and set it dynamically
        let riskProfile = "";
        if (totalScore <= 11) {
            riskProfile = "You are a conservative investor. Risk must be very low and you are prepared to accept lower returns to limit the risk to your capital. The negative impact of tax and inflation will not concern you, provided your initial investment is significantly risk free. Your time frame is very short term, less than 3 years. You aim for 100% income and no growth from your portfolio";
        } else if (totalScore >= 12 && totalScore <= 17) {
            riskProfile = "You are a cautious investor seeking better than basic returns, but risk must be low. Typically you would seek to protect the wealth which you have accumulated, you may be prepared to consider less aggressive growth investments. Your time frame is approximately 3 years. You aim for 80% income and 20% growth from your portfolio.";
        } else if (totalScore >= 18 && totalScore <= 23) {
            riskProfile = "You are a defensive seeking better than basic returns from a balanced portfolio. You may be prepared to consider moderate growth investments and a strategy to cope with tax and inflation. Your time frame is 3 to 5 years. You aim for 60% income and 40% growth from your portfolio.";
        } else if (totalScore >= 24 && totalScore <= 29) {
            riskProfile = "You are a prudent investor who wants a balanced portfolio to work towards medium to long term financial goals. You require an investment strategy which will cope with the effects of tax and inflation. Calculated risks will be acceptable to you to achieve greater returns. Your time frame is approximately 5 years. You aim for 40% income and 60% growth from your portfolio.";
        } else if (totalScore >= 30 && totalScore <= 34) {
            riskProfile = "You are an assertive investor, probably earning sufficient income to invest most funds for capital growth. You require a balanced portfolio, but more aggressive investments may be included. Your investment strategy must cope with tax and inflation. While prepared to accept higher volatility, your primary concern is to accumulate assets over the long term. Your time frame is 7 years. You aim for 20% income and 80% growth from your portfolio.";
        } else if (totalScore >= 35) {
            riskProfile = "You are an aggressive investor prepared to compromise portfolio balance to pursue potentially greater long term returns. Your investment choices are diverse, but carry with them a higher level of volatility and risk. Security of capital is secondary to the potential for wealth accumulation. Your time frame is very long term, 10 years or greater. You aim for 100% growth from your portfolio.";
        }
        
        // Update the risk profile placeholder text
        const riskProfilePlaceholder = document.getElementById("risk-profile-placeholder");
        if (riskProfilePlaceholder) {
            riskProfilePlaceholder.textContent = riskProfile;
        }
    });
    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    // Print button
    printButton.addEventListener("click", function () {
        window.print();
    });

    //! Scroll to top/bottom Logic
    const scrollToTopButton = document.getElementById("scrollToTopButton");
    const scrollToBottomButton = document.getElementById("scrollToBottomButton");

    scrollToTopButton.addEventListener("click", function () {
        // Scroll to the top of the page with a smooth transition
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    scrollToBottomButton.addEventListener("click", function () {
        // Scroll to the bottom of the questionnaire section with a smooth transition
        const questionnaireSection = document.querySelector(".contents");
        if (questionnaireSection) {
            questionnaireSection.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    });

    
});

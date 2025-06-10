document.addEventListener("DOMContentLoaded", function() {

    // Career Quiz Logic 
    const quizBtn = document.getElementById('quiz-btn');
    if (quizBtn) {
        quizBtn.addEventListener('click', showQuizResult);
    }

    // Goal Tracker Logic 
    const addGoalBtn = document.getElementById('add-goal-btn');
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', addGoal);
        // Also allow adding goal by pressing Enter
        const goalInput = document.getElementById('goal-input');
        goalInput.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                addGoal();
            }
        });
    }

});

// Function to handle the Quiz result 
function showQuizResult() {
    const quizForm = document.getElementById('career-quiz');
    const resultContainer = document.getElementById('result-container');

    const answers = {
        q1: quizForm.q1.value,
        q2: quizForm.q2.value,
        q3: quizForm.q3.value,
    };

    // Check if all questions are answered
    if (!answers.q1 || !answers.q2 || !answers.q3) {
        alert("Please answer all questions before submitting!");
        return;
    }

    // Simple scoring logic
    const scores = {
        tech: 0,
        creative: 0,
        social: 0,
    };

    for (const question in answers) {
        scores[answers[question]]++;
    }

    // Determine the highest score
    let maxScore = 0;
    let resultCategory = '';
    for (const category in scores) {
        if (scores[category] > maxScore) {
            maxScore = scores[category];
            resultCategory = category;
        }
    }

    // Career path data
    const careerPaths = {
        tech: {
            title: "The Tech Innovator",
            description: "You have a logical mind and enjoy solving complex problems. A career in technology, engineering, or data science would be a great fit for you.",
            careers: ["Software Developer", "Data Analyst", "Cybersecurity Expert", "AI/ML Engineer"],
            roadmap: [
                "Master fundamentals in Math and Logic.",
                "Learn a programming language like Python or JavaScript.",
                "Build personal projects to create a portfolio.",
                "Participate in hackathons and coding competitions.",
                "Explore online courses on platforms like Coursera or freeCodeCamp."
            ]
        },
        creative: {
            title: "The Creative Visionary",
            description: "You have a great imagination and a passion for expression. A career in design, arts, or content creation would allow you to flourish.",
            careers: ["Graphic Designer", "Content Writer", "UX/UI Designer", "Filmmaker"],
            roadmap: [
                "Develop a strong portfolio of your creative work.",
                "Learn industry-standard tools (e.g., Adobe Creative Suite, Figma).",
                "Study the principles of design, storytelling, and communication.",
                "Collaborate with others on creative projects.",
                "Follow blogs and artists in your field for inspiration."
            ]
        },
        social: {
            title: "The Social Connector",
            description: "You are empathetic and excel at communication and collaboration. A career in management, education, or social services would suit your skills.",
            careers: ["Project Manager", "Teacher/Educator", "Marketing Specialist", "Human Resources Manager"],
            roadmap: [
                "Develop strong public speaking and presentation skills.",
                "Take on leadership roles in school clubs or projects.",
                "Volunteer for causes you care about.",
                "Study psychology and communication to understand people better.",
                "Network with professionals in your fields of interest."
            ]
        }
    };
    
    // Display the result
    const result = careerPaths[resultCategory];
    resultContainer.innerHTML = `
        <h2>Your Recommended Path: ${result.title}</h2>
        <p>${result.description}</p>
        <h3>Potential Career Options:</h3>
        <ul>
            ${result.careers.map(career => `<li>${career}</li>`).join('')}
        </ul>
        <h3>Your Starter Skill Roadmap:</h3>
        <ul>
            ${result.roadmap.map(step => `<li>${step}</li>`).join('')}
        </ul>
    `;
    resultContainer.style.display = 'block';

    // Scroll to the result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}


// Function to handle the Goal Tracker 
function addGoal() {
    const goalInput = document.getElementById('goal-input');
    const goalList = document.getElementById('goal-list');
    const goalText = goalInput.value.trim();

    if (goalText === "") {
        alert("Please enter a goal.");
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = goalText;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        goalList.removeChild(li);
    };

    // Append delete button to list item, and list item to list
    li.appendChild(deleteBtn);
    goalList.appendChild(li);

    // Clear the input field
    goalInput.value = '';
}
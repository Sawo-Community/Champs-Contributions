const texts = document.querySelector(".texts");

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
    texts.appendChild(p);
    const text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    p.innerText = text;
    if (e.results[0].isFinal) {
        if (text.includes("how are you")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "I am fine 😃, what about you";
            texts.appendChild(p);
        }
        if (text.includes("I am fine")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Great 😃";
            texts.appendChild(p);
        }
        if (text.includes("hello")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Hi, I am HackBot 😃. How I can help you?";
            texts.appendChild(p);
        }
        if (
            text.includes("what's your name") ||
            text.includes("what is your name")
        ) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "My Name is HackBot";
            texts.appendChild(p);
        }
        if (text.includes("who created you")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = " I was created by Harshit Aditya";
            texts.appendChild(p);
            console.log("Harshit Aditya");
            window.open("https://github.com/HarshitAditya27");
        }
        if (
            text.includes("perfect") ||
            text.includes("good")
        ) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Thanks 😄";
            texts.appendChild(p);
        }
        if (
            text.includes("hackathon") ||
            text.includes("what is an hackathon")
        ) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "According to Wikipedia, Hackathon is a design sprint-like event; often, in which computer programmers and others involved in software development, including graphic designers, interface designers, product managers, project managers, domain experts, and others collaborate intensively on software projects.";
            texts.appendChild(p);
        }
        if (text.includes("where to find hackathons")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Opening a website, hope that it helps 😁";
            texts.appendChild(p);
            window.open("https://devpost.com/hackathons");
        }
        if (text.includes("web development") || text.includes("resources for webdev")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Recommending a blog on Web Devlopement, hope that it helps 😁";
            texts.appendChild(p);
            window.open("https://dev.to/harshitaditya1/mistakes-i-made-while-learning-web-development-as-a-beginner-4m7n");
        }
        p = document.createElement("p");
    }
});

recognition.addEventListener("end", () => {
    recognition.start();
});

recognition.start();

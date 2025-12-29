let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text',  {
    strings: ['Backend Developer', 'AI Developer', 'Web Designer', 'Frontend Developer', 'RAG Developer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
 });

const EMAILJS_SERVICE_ID = "service_38kfa2g";
const EMAILJS_TEMPLATE_ID = "template_dnmka28";

const contactForm = document.querySelector("#contact form");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = (contactForm.elements["name"]?.value || "").trim();
        const email = (contactForm.elements["email"]?.value || "").trim();
        const subject = (contactForm.elements["subject"]?.value || "").trim();
        const message = (contactForm.elements["message"]?.value || "").trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in Name, Email, Subject, and Message.");
            return;
        }

        if (
            !EMAILJS_SERVICE_ID ||
            !EMAILJS_TEMPLATE_ID 
        ) {
            alert("EmailJS is not configured (service/template id missing).");
            return;
        }

        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalValue = submitBtn ? submitBtn.value : null;

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.value = "Sending...";
            }

            const templateParams = {
                name: name,
                title: subject,
                message: message,
                email: email,
            };

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

            contactForm.reset();
            // alert("Message sent successfully!");
        } catch (err) {
            console.error("EmailJS send failed:", err);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                if (originalValue !== null) submitBtn.value = originalValue;
            }
        }
    });
}
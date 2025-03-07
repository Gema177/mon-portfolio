document.addEventListener("DOMContentLoaded", function() {
    const texte = "Je suis Duvet Gema Ndoumba-Mbouba, passionné d'informatique et de technologies avec une formation en mathématiques et en informatique appliquée. Actuellement étudiant en licence d'informatique, je me spécialise dans des domaines tels que la cryptologie, le développement web, et l'intelligence artificielle. Mon objectif est de repousser les limites de l'innovation à travers des projets passionnants et des solutions créatives.";
    
    let index = 0;
    const speed = 50; // Vitesse d'affichage en millisecondes
    const maxCharsPerLine = 80; // Nombre de caractères avant un saut de ligne
    let charCount = 0; // Compteur de caractères affichés

    function afficherTexte() {
        if (index < texte.length) {
            const char = texte.charAt(index);

            // Ajouter un retour à la ligne après maxCharsPerLine caractères, mais ne pas couper les mots
            if (charCount >= maxCharsPerLine && char === " ") {
                document.getElementById("texte").innerHTML += "<br>";
                charCount = 0; // Réinitialiser le compteur de caractères après le saut de ligne
            }

            // Affichage du caractère actuel
            document.getElementById("texte").innerHTML += char;
            index++;
            charCount++;

            setTimeout(afficherTexte, speed);
        }
    }

    afficherTexte();
});
//const cote=document.getElementById('carre');
//function move_carre(){
    //cote.style.height='150px';
    //cote.style.backgroundColor='blue';
//}
//cote.addEventListener('click',move_carre);
//sectionner tous les competences
const competences = document.querySelectorAll('.competence'); // Tous les boutons
const explication = document.getElementById('explication');    // La boîte pour les explications

// Stocker les éléments dans un objet
const my_object = {
    'dev-web': [
        "En développement web, je suis en mesure de concevoir et développer des sites modernes, dynamiques et entièrement responsives, intégrant des animations interactives et fluides pour une expérience utilisateur optimisée. Je maîtrise les outils et technologies nécessaires pour créer des interfaces intuitives, performantes, et adaptées à tous les appareils."
    ],
    'programming': [
        "En programmation, je suis capable de concevoir des algorithmes optimisés et de développer des applications robustes en utilisant des langages modernes, adaptés aux besoins spécifiques des projets."
    ],
    'cybersecurite': [
        "La cybersécurité protège les systèmes et données contre les menaces.",
        "Je me spécialise dans les audits de sécurité et la cryptologie."
    ],
    'ia': [
        "L'intelligence artificielle permet de créer des machines capables d'apprendre.",
        "J'ai travaillé sur des projets en machine learning et vision par ordinateur."
    ]
};

competences.forEach(competence => {
    competence.addEventListener('click', () => {
        const id = competence.id; // Récupère l'ID du bouton cliqué
        const contenu = my_object[id] // Accède à l'array de textes correspondant à l'ID
            .map(texte => `<p>${texte}</p>`) // Transforme les phrases en paragraphes
            .join(''); // Joint les paragraphes en une seule chaîne HTML

        explication.innerHTML = contenu; // Insère le texte généré dans la boîte

        // Affiche la boîte avec animation
        explication.classList.add('show');
    });

    // Ajoute un événement double-clic pour masquer le contenu
    competence.addEventListener('dblclick', () => {
        explication.innerHTML = ''; // Vide le contenu de la boîte
        explication.classList.remove('show'); // Cache la boîte avec animation
    });
});


const carouselImages = document.getElementById('carousel-images');
const images = document.querySelectorAll('.carousel-images img');
let index = 0;

function slideCarousel() {
    index++;
    if (index >= images.length) {
        index = 0; // Retour au début
    }
    const translateX = -index * 200; // Largeur de l'image (200px)
    carouselImages.style.transform = `translateX(${translateX}px)`;
}

setInterval(slideCarousel, 3000); // Change d'image toutes les 3 secondes
const couleur=document.getElementById("comp")
couleur.addEventListener('mouseover',function(){
    couleur.style.color= '#4e1f3afa'})
couleur.addEventListener('mouseout',function(){
    couleur.style.color=''
})

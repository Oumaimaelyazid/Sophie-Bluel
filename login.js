const form = document.getElementById('form-login');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);//Les données du formulaire sont récupérées sous forme d'un objet FormData. Cet objet permet d'accéder facilement aux données saisies dans les champs du formulaire.

    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',//Une requête POST est envoyée à l'API à l'URL 'http://localhost:5678/api/users/login'. Les en-têtes indiquent que le corps de la requête est au format JSON. Les données du formulaire sont converties en JSON grâce à JSON.stringify(), et les valeurs pour l'email et le mot de passe sont récupérées avec data.get().
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password')
        })
    })

    if(response.ok) {
        const result = await response.json();

        sessionStorage.setItem('token', result.token);//Si la réponse est correcte (response.ok), le JSON de la réponse est récupéré avec response.json(), et le token reçu est stocké dans le sessionStorage.

        window.location.href = 'index.html';//Si la réponse est correcte (response.ok), le JSON de la réponse est récupéré avec response.json(), et le token reçu est stocké dans le sessionStorage.
        return;
    }
    document.getElementById('error-login').style.visibility = 'visible';//Si la réponse n'est pas correcte, un message d'erreur est affiché en rendant visible l'élément HTML avec l'ID error-login.
});
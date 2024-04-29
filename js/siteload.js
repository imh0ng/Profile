const userTheme = localStorage.getItem('theme');

document.body.setAttribute('theme', userTheme == 'dark' ? 'dark' : 'light');

function revealOnScroll() {
    var sections = document.querySelectorAll('.section-box-inner');
    var dots = [document.getElementById('dot_1'), document.getElementById('dot_2'), document.getElementById('dot_3')];

    var windowHeight = window.innerHeight;
    sections.forEach(function(section, index) {
        var elementTop = section.getBoundingClientRect().top;
        var elementBottom = section.getBoundingClientRect().bottom;
        var elementVisible = 30;
        if (elementTop < windowHeight - (windowHeight * elementVisible / 100) && elementBottom > windowHeight * (elementVisible / 100)) {
            section.classList.add('visible');
            section.classList.remove('hidden');
            dots[index].classList.add('active-dot');
        } else {
            section.classList.add('hidden');
            section.classList.remove('visible');
            dots[index].classList.remove('active-dot');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

window.addEventListener('load', revealOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle').checked = (userTheme == 'dark') ? true : false;
    fetch('https://api.github.com/users/imh0ng/repos')
    .then(response => response.json())
    .then(data => {
        const repoList = document.querySelector('.repository-list-box ul');
        repoList.innerHTML = '';
        data.forEach(repo => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = '_blank';
            listItem.appendChild(link);
            repoList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching data: ', error));
});
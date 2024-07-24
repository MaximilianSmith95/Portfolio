document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const writingContainer = document.getElementById('writing-container');
            const projectsContainer = document.getElementById('projects-container');

            data.writing.forEach(writing => {
                const div = document.createElement('div');
                div.className = 'writing';
                div.innerHTML = `
                    <h3>${writing.title}</h3>
                    <img src="${writing.image}" alt="${writing.title}">
                    <p>${writing.description}</p>
                    <div class="files">
                        <h4>Files:</h4>
                        <ul>
                            ${writing.files.map(file => `<li><a href="${file.link}" target="_blank">${file.name}</a></li>`).join('')}
                        </ul>
                    </div>
                `;
                writingContainer.appendChild(div);
            });

            data.projects.forEach(project => {
                const div = document.createElement('div');
                div.className = 'project';
                div.innerHTML = `
                    <h3>${project.title}</h3>
                    <img src="${project.image}" alt="${project.title}">
                    <p>${project.description}</p>
                    <div class="files">
                        <h4>Files:</h4>
                        <ul>
                            ${project.files.map(file => `<li><a href="${file.link}" target="_blank">${file.name}</a></li>`).join('')}
                        </ul>
                    </div>
                `;
                projectsContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching the projects data:', error));
});

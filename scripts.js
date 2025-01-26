document.addEventListener('DOMContentLoaded', () => {
    // Load writing and projects
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
        .catch(error => console.error('Error fetching projects data:', error));

    // Load blogs
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        fetch('./blogs.json') // Adjust path if needed
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch blogs.json');
                return response.json();
            })
            .then(data => {
                const currentPath = window.location.pathname.toLowerCase();
                let blogs = [];
                if (currentPath.includes('football_blog')) {
                    blogs = data.footballBlogs || [];
                } else if (currentPath.includes('film_blog')) {
                    blogs = data.filmBlogs || [];
                }

                if (blogs.length === 0) {
                    blogContainer.innerHTML = '<p>No blogs available at the moment.</p>';
                    return;
                }

                blogs.forEach(blog => {
                    const div = document.createElement('div');
                    div.className = 'blog-entry';
                    div.innerHTML = `
                        <h3>${blog.title}</h3>
                        <p>${blog.description}</p>
                        ${blog.files 
                            ? blog.files.map(file => `<a href="${file.link}" target="_blank">${file.name}</a>`).join('<br>')
                            : ''}
                    `;
                    blogContainer.appendChild(div);
                });
            })
            .catch(error => {
                console.error('Error fetching blogs data:', error);
                blogContainer.innerHTML = `<p>Failed to load blog content. Please try again later. Error: ${error.message}</p>`;
            });
    }
});

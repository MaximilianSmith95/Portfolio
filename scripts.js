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
        .catch(error => console.error('Error fetching the projects data:', error));
});
document.getElementById('upload-button').addEventListener('click', () => {
    const fileInput = document.getElementById('upload-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const fileContent = event.target.result;

        // Display uploaded content (for text or HTML files)
        const writingContainer = document.getElementById('writing-container');
        const div = document.createElement('div');
        div.className = 'uploaded-file';
        div.innerHTML = `
            <h3>${file.name}</h3>
            <pre>${fileContent}</pre>
        `;
        writingContainer.appendChild(div);
    };

    // Handle different file types
    if (file.type === 'application/pdf') {
        reader.readAsArrayBuffer(file);
        alert('PDF files cannot be displayed inline. Consider downloading.');
    } else if (file.type.includes('text') || file.type.includes('wordprocessingml')) {
        reader.readAsText(file);
    } else {
        alert('Unsupported file type. Please upload .pdf, .docx, or .txt files.');
    }
});


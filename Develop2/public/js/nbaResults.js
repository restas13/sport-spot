fetch('/api/results')
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    const template = Handlebars.compile(`
      {{#each results}}
        <div class="card">
          <h2>{{team1}} vs {{team2}}</h2>
          <p>Date: {{date}}</p>
          <p>Score: {{score}}</p>
        </div>
      {{/each}}
    `);
    const renderedHtml = template({ results });
    document.querySelector('.results-container').innerHTML = renderedHtml;
  })
  .catch(error => {
    console.error('Error:', error);
  });

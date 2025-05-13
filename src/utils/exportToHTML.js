export function generateHTML(dataType, items) {
  const rows = items.map((item, idx) => {
    if (dataType === 'passwords') {
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>${item.title}</td>
          <td>${item.username}</td>
          <td>${item.password}</td>
        </tr>
      `;
    } else {
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>${item.title}</td>
          <td>${item.content}</td>
        </tr>
      `;
    }
  }).join('');

  const tableHeaders = dataType === 'passwords'
    ? '<tr><th>#</th><th>Title</th><th>Username</th><th>Password</th></tr>'
    : '<tr><th>#</th><th>Title</th><th>Content</th></tr>';

  return `
    <html>
    <head>
      <style>
        body { font-family: Arial; padding: 16px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #eee; }
      </style>
    </head>
    <body>
      <h1>Exported ${dataType === 'passwords' ? 'Passwords' : 'Notes'}</h1>
      <table>${tableHeaders}${rows}</table>
    </body>
    </html>
  `;
}

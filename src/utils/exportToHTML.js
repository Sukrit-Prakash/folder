// export function generateHTML(dataType, items) {
//   const rows = items.map((item, idx) => {
//     if (dataType === 'passwords') {
//       return `
//         <tr>
//           <td>${idx + 1}</td>
//           <td>${item.title}</td>
//           <td>${item.username}</td>
//           <td>${item.password}</td>
//         </tr>
//       `;
//     } else {
//       return `
//         <tr>
//           <td>${idx + 1}</td>
//           <td>${item.title}</td>
//           <td>${item.format === 'rich' ? item.content : item.content.replace(/\n/g, '<br>')}</td>
//         </tr>
//       `;
//     }
//   }).join('');

//   const tableHeaders = dataType === 'passwords'
//     ? '<tr><th>#</th><th>Title</th><th>Username</th><th>Password</th></tr>'
//     : '<tr><th>#</th><th>Title</th><th>Content</th></tr>';

//   return `
//     <html>
//     <head>
//       <style>
//         body { 
//           font-family: Arial; 
//           padding: 16px; 
//           line-height: 1.5;
//         }
//         table { 
//           border-collapse: collapse; 
//           width: 100%; 
//           margin-bottom: 20px;
//         }
//         th, td { 
//           border: 1px solid #ccc; 
//           padding: 12px; 
//           text-align: left; 
//           vertical-align: top;
//         }
//         th { 
//           background-color: #eee; 
//           font-weight: bold;
//         }
//         h1, h2, h3, h4, h5, h6 {
//           margin-top: 24px;
//           margin-bottom: 16px;
//           font-weight: 600;
//         }
//         ul, ol {
//           padding-left: 24px;
//         }
//         li {
//           margin: 8px 0;
//         }
//         .note-content {
//           max-width: 600px;
//         }
//       </style>
//     </head>
//     <body>
//       <h1>Exported ${dataType === 'passwords' ? 'Passwords' : 'Notes'}</h1>
//       <table>${tableHeaders}${rows}</table>
//     </body>
//     </html>
//   `;
// }

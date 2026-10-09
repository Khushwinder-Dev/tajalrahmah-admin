// utils/printHtmlContent.ts
export function printHtmlContent(htmlContent: string) {
  const printFrame = document.createElement("iframe");
  printFrame.style.position = "absolute";
  printFrame.style.top = "-9999px";
  printFrame.style.left = "-9999px";
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentWindow?.document;
  if (!frameDoc) return;

  frameDoc.open();
  frameDoc.write(`
      <html>
        <head>
          <title>Print</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
  frameDoc.close();

  printFrame.onload = () => {
    setTimeout(() => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      document.body.removeChild(printFrame);
    }, 300);
  };
}

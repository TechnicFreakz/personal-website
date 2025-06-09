const { PDFDocument } = PDFLib;

const fileInput = document.getElementById('files');
const mergeBtn   = document.getElementById('merge');
const fileList = document.getElementById('file-list');
const fileListHeader = document.getElementById('file-list-header');

let pdfFiles = [];
let sorter;

fileInput.addEventListener('change', () => {
  pdfFiles = Array.from(fileInput.files);
  mergeBtn.disabled = pdfFiles.length < 2;

  // Clear any old entries
  fileList.innerHTML = '';

  // Set file list header
  fileListHeader.textContent = pdfFiles.length > 0 ? 'Selected PDF Files:' : 'No files selected';

  // Populate list with file names
  pdfFiles.forEach((file, idx) => {
    const li = document.createElement('li');
    li.textContent = file.name;
    li.dataset.index = idx;
    fileList.appendChild(li);
  });

  // Initialize sorter
  if (sorter) sorter.destroy();
  sorter = Sortable.create(fileList, {
    animation: 150,
    ghostClass: 'sortable-ghost',
  });
});

mergeBtn.addEventListener('click', async () => {
  try {
    const orderedFiles = Array.from(fileList.children)
      .map(li => pdfFiles[li.dataset.index]);
    const mergedPdf = await PDFDocument.create();
    for (const file of orderedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }
    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'merged.pdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('❌ Merge failed:', err);
    alert('Oops! Could not merge PDFs.');
  }
});

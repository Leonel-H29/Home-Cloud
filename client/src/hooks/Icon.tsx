const getIconForFile = (fileName: string) => {
  const fileExtension: string = fileName.split('.').pop()?.toLowerCase();
  const defaultExtension = 'bi bi-file-earmark';

  const isImageExtension = /(jpg|jpeg|png|gif)/.test(fileExtension);

  const iconMapping = {
    pdf: 'bi bi-file-earmark-pdf',
    docx: 'bi bi-file-earmark-word',
    mp3: 'bi bi-file-earmark-music',
    mp4: 'bi bi-file-earmark-play',
    xls: 'bi bi-file-earmark-excel',
    txt: 'bi bi-filetype-txt',
    zip: 'bi bi-file-earmark-zip',
    sql: 'bi bi-filetype-sql',
    html: 'bi bi-filetype-html',
    py: 'bi bi-filetype-py',
    '': isImageExtension ? 'bi bi-file-earmark-image' : 'bi bi-file-earmark',
    //png: 'bi bi-file-earmark-image',
    // Agrega más extensiones y sus iconos aquí según sea necesario
  };

  return iconMapping[fileExtension] ?? defaultExtension;
};

export default getIconForFile;

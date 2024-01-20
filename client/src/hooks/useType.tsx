export function useType() {
  const hasFileExtension = (item: string, extensions: string[]) => {
    const regex = new RegExp(`\\.(${extensions.join('|')})$`, 'i');
    return regex.test(item);
  };

  const isImageFile = (item: string) => {
    return hasFileExtension(item, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']);
  };

  const isMediaFile = (item: string) => {
    return hasFileExtension(item, [
      'mp4',
      'mp3',
      'avi',
      'mkv',
      'mov',
      'wmv',
      'flv',
      'ogg',
      'wav',
      'wma',
    ]);
  };

  return { isImageFile, isMediaFile };
}

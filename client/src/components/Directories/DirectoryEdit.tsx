import axios from 'axios';

const DirectoryEdit = async (dirName: string, newDirName: string) => {
  try {
    await axios.put(`http://localhost:8082/edit/${dirName}`, {
      new_name: newDirName,
    });
    alert('Directorio editado exitosamente');
  } catch (error) {
    console.error('Error al editar directorio:', error);
  }
};
export default DirectoryEdit;

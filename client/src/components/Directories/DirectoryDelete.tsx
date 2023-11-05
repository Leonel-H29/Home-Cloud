import axios from 'axios';

const DirectoryDelete = async (dirName: string) => {
  try {
    await axios.delete(`http://localhost:8082/delete/${dirName}`);
    alert('Directorio eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar directorio:', error);
  }
};

export default DirectoryDelete;

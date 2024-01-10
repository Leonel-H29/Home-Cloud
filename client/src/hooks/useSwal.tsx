import Swal from 'sweetalert2';

export const useCustomSwalTopEnd = () => {
  const showAlert = (options) => {
    const defaultOptions = {
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    };

    Swal.fire({
      ...defaultOptions,
      ...options,
    });
  };

  return showAlert;
};

import Swal from "sweetalert2/dist/sweetalert2.all";

export const swalConfirm = (title = null, text) => {
    return Swal.fire({
        title: title || 'Are you sure?',
        text: text || 'You will not be able to revert this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    });
}

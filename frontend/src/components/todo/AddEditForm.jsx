import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { post, put } from '../../utils/fetchAPI';
import { showErrorToast, showSuccessToast } from '../../utils/toaster-alert';

function AddEditForm({ isShowModal, setIsShowModal, isEdit, initData, index }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    
    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        setFormData({...initData});
    }, [initData]);

    const submitForm = (e) => {
        e.preventDefault();
        let url = 'todos';
        if (isEdit) {
            url = `todos/${formData?.id}`;
            put(url, {...formData}).then((res) => {
                showSuccessToast(res?.data?.message);
                setFormData({});
                index();
                setIsShowModal(false);
            }).catch((err) => {
                showErrorToast(err?.response?.data?.message);
                setErrors({...err?.response?.data?.errors || {}});
            });
        } else {
            post(url, {...formData}).then((res) => {
                showSuccessToast(res?.data?.message);
                setFormData({});
                index();
                setIsShowModal(false);
            }).catch((err) => {
                showErrorToast(err?.response?.data?.message);
                setErrors({...err?.response?.data?.errors || {}});
            });
        }
    };

    return (
        <Modal
            show={isShowModal}
            onHide={() => setIsShowModal(false)}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header className='pb-2'>
                <Modal.Title>{ isEdit ? "Edit Todo" : "Add New Todo" }</Modal.Title>
            </Modal.Header>
            <form onSubmit={submitForm}>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="mb-1">Title</label>
                        <input type="text" className="form-control" required name="title" value={formData?.title} onChange={(e) => handleFormData(e)} />
                        {
                            !!errors && errors?.title && 
                            <small className="text-danger">{errors?.title}</small>
                        }
                    </div>
                    <div className="mb-3">
                        <label className="mb-1">Description</label>
                        <textarea cols="5" rows="8" className="form-control" required name="description" value={formData?.description} onChange={(e) => handleFormData(e)} />
                        {
                            !!errors && errors?.description && 
                            <small className="text-danger">{errors?.description}</small>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" disabled={false}>
                        {false && <i className="fas fa-spinner fa-spin mr-1"></i>}
                        Save
                    </Button>
                    <Button variant="secondary" onClick={() => setIsShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddEditForm;

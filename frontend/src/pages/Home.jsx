import React, { useEffect, useState } from 'react';
import { getWithParams, put } from '../utils/fetchAPI';
import { showErrorToast, showSuccessToast } from '../utils/toaster-alert';
import PerPage from '../components/PerPage';
import Pagination from "react-js-pagination";
import AddEditForm from '../components/todo/AddEditForm';
import { swalConfirm } from '../utils/SwalUti';
import Navbar from '../components/Navbar';

function Home() {
    const [todoList, setTodoList] = useState([]);
    const [perPage, setPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [initData, setInitData] = useState({
        id: '',
        title: '',
        description: '',
    });

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        index()
    }, [perPage, searchQuery]);

    function index(page = 1) {
        const payload = {
            page,
            per_page: perPage,
            is_completed: searchQuery
        };

        getWithParams("todos", payload)
            .then(res => {
                const data = res?.data?.data;
                setTodoList(data?.data);
                setCurrentPage(data.current_page);
                setTotal(data.total);
            }).catch((err) => {
                showErrorToast(err?.response?.data?.message);
            })
    }

    function addData() {
        setIsEdit(false);
        setInitData({
            id: '',
            title: '',
            description: '',
        });
        setIsShowModal(true);
    }

    function editData(todo) {
        setIsEdit(true);
        setInitData({
            id: todo?.id,
            title: todo?.title,
            description: todo?.description,
        });
        setIsShowModal(true);
    }

    async function updateTodoStatus(todoId, status) {
        let isConfirm = await swalConfirm("Are you sure?", (status === 1 ? "This todo will be completed!" : "This todo will be incomplete!"));
        if (!isConfirm?.isConfirmed) return false;

        put(`todos/update-status/${todoId}`, {is_completed: status}).then((res) => {
            showSuccessToast(res?.data?.message);
            index();
        }).catch((err) => {
            showErrorToast(err?.response?.data?.message);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="w-75 mx-auto" style={{ marginTop: "5%" }}>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <h4 className="me-2">Todo List</h4>
                                <div>
                                    <select className="form-select" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="0">Incomplete</option>
                                        <option value="1">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={addData}>Add</button>
                            </div>
                        </div>
                        <hr className="border opacity-100" />
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !!todoList && todoList.length > 0 && todoList.map((todo, todoIndex) => {
                                    return (
                                        <tr key={todoIndex}>
                                            <th scope="row">{++todoIndex}</th>
                                            <td>{todo?.title}</td>
                                            <td>{todo?.description.length > 30 ? todo?.description.substring(0, 30) + "..." : todo?.description}</td>
                                            <td className="text-center">
                                                {
                                                    todo?.is_completed === 0 ?
                                                    <span className="badge text-bg-info">Incomplete</span>
                                                    : <span className="badge text-bg-success">Completed</span>
                                                }
                                            </td>
                                            <td className="text-center">
                                                {
                                                    todo?.is_completed === 0 ?
                                                    <i className="fa-regular fa-circle-check me-2 mps" title="Complete" onClick={() => updateTodoStatus(todo?.id, 1)}></i>
                                                    : <i className="fa-regular fa-circle-xmark me-2 mps" title="Incomplete" onClick={() => updateTodoStatus(todo?.id, 0)}></i>
                                                }
                                                <i className="fas fa-edit mps" title="Edit" onClick={() => editData(todo)}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-start">
                                {
                                    (!!todoList.length > 0) &&
                                    <PerPage perPage={perPage} currentPage={currentPage} setPerPage={setPerPage} total={total}/>
                                }
                            </div>
                            <div className="col-md-6 col-sm-2 d-flex justify-content-end">
                                <div className="">
                                    <Pagination
                                        activePage={parseInt(currentPage)}
                                        itemsCountPerPage={parseInt(perPage)}
                                        totalItemsCount={parseInt(total)}
                                        onChange={(current_page) => index(current_page)}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </div>
                        <AddEditForm isShowModal={isShowModal} setIsShowModal={setIsShowModal} isEdit={isEdit} initData={initData} index={index} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

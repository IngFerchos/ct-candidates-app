import React, { useEffect, useState } from 'react';
import style from './Todos.module.css';
import ITodo from '../../utils/Interfaces/ITodo';
import Todo from './Todo';
import CreateTodoModal from './ModalCreateTodo';
import { useNavigate } from 'react-router-dom';
import { logOutAction } from '../../Redux/actions/AuthActions';
import { RootState, useAppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import APIService from '../../utils/Class/API';

const Todos = () => {
    const [items, setItems] = useState<ITodo[]>([]);
    const [filter, setFilter] = useState<'all' | 'complete' | 'incomplete'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = async () => {
        let response: ITodo[]
        if (filter && filter !== "all") {
            const onlyComplete = filter === 'complete'
            response = (await APIService.GetTodosUser(onlyComplete)).response!
        } else {
            response = (await APIService.GetTodosUser()).response!
        }
        setItems(response)
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated === false])
    const handleEdit = (index: number, field: keyof ITodo, value: any) => {
        const updatedItems = [...items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        setItems(updatedItems);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value as 'all' | 'complete' | 'incomplete');
    };

    const handleDelete = async (idTodo: number) => {
        await APIService.DeleteTodo(idTodo)
        await getTodos();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = async () => {
        setIsModalOpen(false);
        await getTodos()
    };


    const handleLogOut = () => {
        dispatch(logOutAction())
        navigate('/')
    }

    const handleSave = async () => {
        await APIService.UpdateTodos(items)
        await getTodos()
    }

    return (
        <div className={style.container}>
            <h1 className={style.h1}>ToDo List</h1>

            <div className={style.filter}>
                <label className={style.label} htmlFor="filter">Filter by completion:</label>
                <select className={style.select} id="filter" onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="complete">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <button
                    onClick={() => getTodos()}
                    className={style.btnSearch}
                >Search
                </button>
            </div>

            <div className={style.itemsContainer}>
                {items?.map((item, index) => (
                    <Todo
                        key={index}
                        order={item.order}
                        title={item.title}
                        complete={item.complete}
                        onOrderChange={(value) => handleEdit(index, 'order', value)}
                        onTitleChange={(value) => handleEdit(index, 'title', value)}
                        onCompleteChange={(value) => handleEdit(index, 'complete', value)}
                        onDelete={() => handleDelete(item.id)}
                    />
                ))}
            </div>

            <button
                className={style.btnCreate}
                onClick={handleOpenModal}>
                Create ToDo
            </button>

            <button
                onClick={handleLogOut}
                className={style.btnLogOut}>
                LogOut
            </button>

            <button
                onClick={handleSave}
                className={style.btnSave}>
                Save Changes
            </button>



            <CreateTodoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>

    );
};

export default Todos;

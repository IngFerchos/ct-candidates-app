import React, { useState } from 'react';
import style from './ModalCreateTodo.module.css';
import ITodo from '../../utils/Interfaces/ITodo';
import APIService from '../../utils/Class/API';

interface CreateTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({ isOpen, onClose }) => {
    const [todo, setTodo] = useState<ITodo>({
        order: 0,
        title: '',
        complete: false,
        id: 0,
        user_id: 0
    });

    const handleCreate = async () => {
        if (todo.title.trim() !== '' && todo.order > 0) {
            setTodo({
                order: 0,
                title: '',
                complete: false,
                id: 0,
                user_id: 0
            });
            await APIService.CreateTodo(todo)
            onClose();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: name == 'order' ? Number(value) : value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <button className={style.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2 className={style.heading}>Create New Todo</h2>
                <div className={style.formGroup}>
                    <label htmlFor="order">Order:</label>
                    <input
                        id="order"
                        name="order"
                        type="number"
                        className={style.input}
                        value={todo.order}
                        onChange={handleChange}
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className={style.input}
                        value={todo.title}
                        onChange={handleChange}
                    />
                </div>
                <div className={style.actions}>
                    <button className={style.button} onClick={handleCreate}>Create</button>
                    <button className={`${style.button} ${style.secondaryButton}`} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTodoModal;

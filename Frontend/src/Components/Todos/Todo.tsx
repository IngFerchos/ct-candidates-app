import React from 'react';
import style from './Todo.module.css';

interface TodoProps {
    order: number;
    title: string;
    complete: boolean;
    onOrderChange: (value: number) => void;
    onTitleChange: (value: string) => void;
    onCompleteChange: (value: boolean) => void;
    onDelete: () => void;
}

const Todo: React.FC<TodoProps> = ({ order, title, complete, onOrderChange, onTitleChange, onCompleteChange, onDelete }) => {
    return (
        <div className={style.todo}>
            <div className={style.infoContainer}>
                <div className={style.todoField}>
                    <label>Title:</label>
                    <input
                        className={style.inputNumberText}
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />
                </div>

                <div className={style.todoField}>
                    <label>Order:</label>
                    <input
                        className={style.inputNumberText}
                        type="number"
                        value={order}
                        onChange={(e) => onOrderChange(Number(e.target.value))}
                    />
                </div>
            </div>
            <div className={style.todoFieldColumn}>
                <div className={style.todoFieldColumn}>
                    <label>Complete</label>
                    <input
                        className={style.inputCheckBox}
                        type="checkbox"
                        checked={complete}
                        onChange={(e) => onCompleteChange(e.target.checked)}
                    />
                </div>
                <button className={style.deleteButton} onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Todo;
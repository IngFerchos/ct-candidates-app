export async function getTasks(params=null) {
    let url = 'tasks';
    if(params)
        url += `?${(new URLSearchParams(params)).toString()}`;
    return await window.axios.get(url);
}

export async function addTasks(task) {
    return await window.axios.post('tasks', task);
}

export async function updatePositions(positions) {
    return await window.axios.put('tasks/update_order/', positions);
}

export async function updateTask(id, task) {
    return await window.axios.put(`tasks/${id}`, task);
}

export async function updateTaskStatus(id, task) {
    return await window.axios.put(`tasks/complete_status/${id}`, task);
}

export async function deleteTask(id){
    return await window.axios.delete(`tasks/${id}`);
}
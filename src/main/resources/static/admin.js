import {
    getAllUsers, getOneUser, createUser, deleteCurrentUser, getRolesForNewUser, fillForm, updateCurrentUser
} from "./functions.js";

window.onload = () => {
    getAllUsers()
    getOneUser()
}

$(document).ready(() => {
    $('.nav-tabs a[href="#NewUser"]').on('show.bs.tab', () => {
        getRolesForNewUser()
        //при нажатии кноки создания нового юзера создаётся юзер
        document.getElementById('createNewUser').addEventListener('click', createUser)
    })

    //очистка формы нового юзера
    $('.nav-tabs a[href="#UserTable"]').on('show.bs.tab', () => {
        document.getElementById('createUserForm').reset()
    })

    //заполнение формы редактирования юзера
    $('#modalEdit').off().on('show.bs.modal', event => {
        let id = $(event.relatedTarget).attr("data-index")
        fillForm(id, document.forms['editUserModalForm'], 'Edit')
        //при нажатии кнопки обновления юзер обновляется
        document.getElementById('updateUser').addEventListener('click', updateCurrentUser)

    })

    //заполнение формы удаления
    $('#modalDelete').on('show.bs.modal', event => {
        let id = $(event.relatedTarget).attr("data-index")
        fillForm(id, document.forms['modalDeleteForm'], 'Delete')
        //при нажатии кнопки удаления юзер удаляется
        document.getElementById('deleteUser').addEventListener('click', (event) => {
            deleteCurrentUser(id)
        })
    })
})
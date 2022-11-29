const url = 'http://localhost:8080/api/'

export function getOneUser() {
    const currentUserLogin = document.getElementById("currentUserLogin")
    const currentUserRoles = document.getElementById("currentUserRoles")
    const currentUserTable = document.getElementById("currentUserTableBody")

    fetch(url + 'principal')
        .then(response => response.json())
        .then(data => {
            let userRoles = data.roles.map(role => role.name.substring(5))
            let columnContent = ''
            columnContent += `<tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.login}</td>
                <td>${data.age}</td>
                <td>${userRoles}</td>
                </tr>`
            currentUserLogin.innerText = data.login
            currentUserRoles.innerText = userRoles
            currentUserTable.innerHTML = columnContent
        })
}

export function getAllUsers() {
    const allUsersTableBody = document.getElementById('allUsersTableBody')

    $('#allUsersTableBody').empty()
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let columnContent = ''
                columnContent += `<tr>
                <td>${element.id}</td>
                <td>${element.firstName}</td>
                <td>${element.lastName}</td>
                <td>${element.email}</td>
                <td>${element.login}</td>
                <td>${element.age}</td>
                <td>${element.roles.map(role => role.name.substring(5))}</td>
                <td>
                    <button type="button" class="btn btn-danger delete" id="buttonDelete"
                    data-index="${element.id}" data-bs-target="#modalDelete" data-bs-toggle="modal">
                    Delete
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="buttonEdit"
                    data-index="${element.id}" data-bs-target="#modalEdit">
                    Edit
                    </button>
                    </td>
                    <td>
                </tr>`
            })
        })
}

export function getRolesForNewUser() {
    const selectRolesForNewUser = document.getElementById('selectRolesForNewUser')
    fetch(url +'roles')
        .then(response => response.json())
        .then(data => {
            let resRoles = ''
            data.forEach(element => {
                if (element.id === 2) {
                    resRoles +=
                        `
                    <option value='${element.id}' selected>
                    ${element.name}
                    </option>
                    `
                } else {
                    resRoles +=
                        `
                    <option value='${element.id}' >
                    ${element.name}
                    </option>
                    `
                }
            })
            selectRolesForNewUser.innerHTML = resRoles
        })
}

export function fillForm(id, formName, method) {
    fetch(url + id)
        .then(response => response.json())
        .then(data => {
            formName.id.value = data.id
            formName.name.value = data.name
            formName.surname.value = data.surname
            formName.email.value = data.email
            formName.login.value = data.login
            formName.age.value = data.age
            let rolesForEditedUser = document.getElementById('roles' + method)
            let userRolesId = []
            data.roles.forEach(role => {
                userRolesId.push(role.id)
            })
            fetch(url + 'roles')
                .then(response => response.json())
                .then(data => {
                    let resRoles = ''
                    data.forEach(element => {
                        if (userRolesId.includes(element.id)) {
                            resRoles +=
                                `
                    <option value='${element.id}' selected>
                    ${element.name.substring(5)}
                    </option>
                    `
                        } else {
                            resRoles +=
                                `
                    <option value='${element.id}' >
                    ${element.name.substring(5)}
                    </option>
                    `
                        }
                    })
                    rolesForEditedUser.innerHTML = resRoles
                })
        })
}


export function createUser(e) {
    e.preventDefault()
    const newUserForm = document.forms['createUserForm']
    let newUserRoles = []
    for (let option of document.getElementById('selectRolesForNewUser').options) {
        if (option.selected) {
            newUserRoles.push({
                id: option.value,
                name: 'ROLE_' + option.innerText
            })
        }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            name: newUserForm.name.value,
            first_name: newUserForm.first_name.value,
            last_name: newUserForm.last_name.value,
            email: newUserForm.email.value,
            age: newUserForm.age.value,
            login: newUserForm.login.value,
            password: newUserForm.password.value,
            roles: newUserRoles
        })
    })
        .then((response) => {
            if (response.ok) {
                newUserForm.reset()
                getAllUsers()
            }
            else {
                alert("System error")
            }
        })
}
export function deleteCurrentUser(id) {
    fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        getAllUsers()
        document.getElementById('closeDeleteModal').click()
    })
}

export function updateCurrentUser(e) {
    e.preventDefault()
    let editUserRoles = []
    for (let option of document.getElementById('rolesEdit').options) {
        if (option.selected) {
            editUserRoles.push({
                id: option.value,
                name: 'ROLE_' + option.innerText
            })
        }
    }
    let userEditForm = document.forms['editUserModalForm']
    fetch(url + 'patch', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userEditForm.id.value,
            name: userEditForm.name.value,
            surname: userEditForm.surname.value,
            email: userEditForm.email.value,
            age: userEditForm.age.value,
            login: userEditForm.login.value,
            password: userEditForm.password.value,
            roles: editUserRoles
        })
    }).then((response) => {
            if (response.ok) {
                getAllUsers()
                userEditForm.password.value = ''
                document.getElementById('closeEditModalWindow').click()
                getSuccessMessage('User has been updated!')
                $('.nav-tabs a[href="#UserTable"]').tab('show')
            } else {
                response.json()
                    .then((res) => {
                        getErrorMessage(res, userEditForm)
                    })
            }
        }
    )
}

function getErrorMessage(errorJSON, form) {
    let errorBody = document.getElementById('errorBody')
    let errorBodyText = ''
    for (let line of errorJSON.message.split(';')) {
        errorBodyText +=
            `
             <a>${line}</a>
             <br>
             `
    }
    console.log(errorJSON.message)
    errorBody.innerHTML = errorBodyText
    form.password.value = ''
    $('#errorModal').modal('toggle')
}

//получение окна выполнения успешной операции
function getSuccessMessage(message) {
    $('#successModal').modal('toggle')
    document.getElementById('successBody').innerHTML =
        `
        <a>${message}</a>
        `
}
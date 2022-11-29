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
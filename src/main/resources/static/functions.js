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
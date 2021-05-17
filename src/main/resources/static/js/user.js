
//Метод отображения всех пользователей и сама таблица
$(document).ready(showAll());
function showAll() {
    if ($('#usersTableNav').hasClass('active') === false) {
        $('#usersTableNav').addClass('active');
        $('#newUserNav').removeClass('active');
    }

    $('#basicSpace').empty();
    $('#basicSpace').append(
        `<h6 class="card-header">All users</h6>
        <div class="card-body table-responsive">
            <table class="table table-striped table-sm">
                <thead id="thead">
                    <tr>
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Password</th>
                <th>Role</th>
            </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </div>`
    );


    $.getJSON('http://localhost:8089/api/', function (json) {

        let tr = [];

        for (let i = 0; i < json.length; i++) {

            let user = {
                id: json[i].id,
                firstName: json[i].firstName,
                lastName: json[i].lastName,
                age: json[i].age,
                address: json[i].address,
                password: json[i].password,
                userRole: JSON.stringify(json[i].isRoleName.map(role=> role.authority))

            };

            tr.push(`<tr id="${user.id}">`);
            tr.push(`<td>${user.id}</td>`);
            tr.push(`<td>${user.firstName}</td>`);
            tr.push(`<td>${user.lastName}</td>`);
            tr.push(`<td>${user.age}</td>`);
            tr.push(`<td>${user.address}</td>`);
            tr.push(`<td>${user.password}</td>`);
            tr.push(`<td>${user.userRole}</td>`);

            tr.push(`<td><button class="btn btn-primary" onclick="modalEditFunc(${user.id})">Edit</button></td>`);
            tr.push(`<td><button class="btn btn-danger" onclick="modalDeleteFunc(${user.id})">Delete</button></td>`);
            tr.push(`</tr>`);
        }

        $('#tbody').empty();
        $('#tbody').append($(tr.join('')));
    });
}



// Отображение формы создания нового пользователя
function newUser() {
    if ($('#newUserNav').hasClass('active') === false) {
        $('#newUserNav').addClass("active");
        $('#usersTableNav').removeClass('active');
    }
    $('#basicSpace').empty();
    $('#basicSpace').append(
        `<h6 class="card-header">Add new user</h6>
    <div class="card-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4"></div>
                <form class="col-md-4 text-center font-weight-bold" id="newUserForm">
                    <label>FirstName</label>
                    <input type="text" id="firstName" class="form-control"
                           placeholder="Input firstName" required/>

                    <label>LastName</label>
                    <input type="text" id="lastName" class="form-control"
                           placeholder="Input lastName" required/>

                    <label>Age</label>
                    <input type="text" id="age" class="form-control"
                           placeholder="Input age" required/>

                    <label>Address</label>
                    <input type="text" id="address" class="form-control "
                           placeholder="Input address" required/>

                    <label>Password</label>
                    <input type="text" id="password" class="form-control"
                           placeholder="Input password" required/>

                    <hr>
                        <label for="selectRoles">Select roles</label>
                        <select class="form-control" multiple id="selectRoles" required
                                size="2">
                            <option value="1">ADMIN</option>
                            <option value="2">USER</option>
                        </select>
                        <br>
                            <button class="btn btn-success" type="submit" onclick="saveUser();
                            return false">
                            Add new user
                            </button>
                </form>
                <div class="col-md-4"></div>
            </div>
        </div>
    </div>`);

}
//Отправка формы нового пользователя на контроллер

function saveUser() {
    let selectedRoles = window.querySelectorAll('#selectRoles option:checked');
    let roleSet = new Set();

    for (let i = 0; i < selectedRoles.length; i++) {
        selectedRoles[i].value === "1"
            ? roleSet.add({"id": 1, "roleName": "ADMIN"})
            : roleSet.add({"id": 2, "roleName": "USER"})
    }

    let user = {
        firstName: window.newUserForm.firstName.value,
        lastName: window.newUserForm.lastName.value,
        age: window.newUserForm.age.value,
        address: window.newUserForm.address.value,
        password: window.newUserForm.password.value,
        roles: Array.from(roleSet)
    };
    if (!(Object.values(user)).includes(null)) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8089/save',
            data: JSON.stringify(user),
            dataType: 'json',
            cache: false,
            success: function (response) {
                let responseRoles = response.roles.map(role => role.roleName).sort((a, b) => a.localeCompare(b));
                $('#tbody').append(
                    `<tr id="${response.id}">
                    <td>${response.id}</td>
                    <td>${response.firstName}</td>
                    <td>${response.lastName}</td>
                    <td>${response.age}</td>
                    <td>${response.address}</td>
                    <td>${response.password}</td>
                    <td>${responseRoles}</td>
                    <td><button class="btn btn-primary editButton" onclick="modalEditFunc(${response.id})">Edit</button></td>
                    <td><button class="btn btn-danger deleteButton" onclick="modalDeleteFunc(${response.id})">Delete</button></td>
                    </tr>`
                );
                showAll();
            }

        });
    }
}



//Модальное окно с формой редактирования пользователя

    function modalEditFunc(id) {
        $.getJSON('http://localhost:8089/api/' + id, function (json) {
            let user = {
                id: json.id,
                firstName: json.firstName,
                lastName: json.lastName,
                age: json.age,
                address: json.address,
                password: json.password,
                userRole: json.isRoleName
            };

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                `<div class="modal fade" id="modalEdit" tabindex="-1"
                 aria-hidden="true"
                 aria-labelledby="modalEdit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="modalEditLabel">Edit user</h6>
                            <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="font-weight-bold">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <form class="text-center" id="formEdit">
                                        <div class="form-group">
                                            <label for="eID">ID</label>
                                            <input class="form-control" type="number" id="eID" name="id" value="${user.id}" readOnly/>
                                        </div>

                                        <div class="form-group">
                                        <label for="eFirstname">FirstName</label>
                                        <input class="form-control" type="text" id="eFirstname" name="name" value="${user.firstName}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eLastname">LastName</label>
                                            <input class="form-control" type="text" id="eLastname" name="lastname" value="${user.lastName}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eAge">Age</label>
                                            <input class="form-control" type="text" id="eAge" name="age" value="${user.age}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eAddress">Address</label>
                                            <input class="form-control" type="text" id="eAddress" name="address" value="${user.address}"/>
                                        </div>

                                        <label for="ePassword">Password</label>
                                        <input class="form-control" type="text" id="ePassword" name="password" value="${user.password}" />

                                        <div class="form-group">
                                            <label for="eSelectRoles">ROLE</label>
                                            <select class="form-control" name="selectRoles[]" multiple id="eSelectRoles" size="2" required>
                                                <option value="1">ADMIN</option>
                                                <option value="2">USER</option>
                                            </select>
                                         </div>
                                    </form>
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="btn-block text-right">
                                <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Close"/>
                                <input class="btn btn-primary" type="submit" onclick="updateUser()" data-dismiss="modal" value="Edit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            $('#modalEdit').modal();
        });
    }

// //Отправка формы отредактированного пользователя на контроллер

    function updateUser() {
        let selectedRoles = window.querySelectorAll('#eSelectRoles option:checked');
        let roleSet = new Set();

        for (let i = 0; i < selectedRoles.length; i++) {
            selectedRoles[i].value === "1"
                ? roleSet.add({"id": 1, "roleName": "ADMIN"})
                : roleSet.add({"id": 2, "roleName": "USER"})
        }

        let user = {
            id: window.formEdit.eID.value,
            firstName: window.formEdit.eFirstName.value,
            lastName: window.formEdit.eLastName.value,
            age: window.formEdit.eAge.value,
            address: window.formEdit.eAddress.value,
            password: window.formEdit.ePassword.value,
            userRole: Array.from(roleSet)
        };

        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8089/api/update',
            data: JSON.stringify(user),
            dataType: 'json',
            cache: false,
            success: function (response) {
                let responseRoles = response.roles.map(role => role.roleName).sort((a, b) => a.localeCompare(b));
                $(`#${response.id}`)
                    .replaceWith(
                        `<tr id="${response.id}">
                        <td>${response.id}</td>
                        <td>${response.firstName}</td>
                        <td>${response.lastName}</td>
                        <td>${response.age}</td>
                        <td>${response.address}</td>
                        <td>${response.password}</td>
                        <td>${responseRoles}</td>

                    <td><button class="btn btn-primary" onclick="modalEditFunc(${response.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="modalDeleteFunc(${response.id})">Delete</button></td>
                    </tr>`
                    )
            }
        })
    }

    //Модальное окно с формой для удаления пользователя

    function modalDeleteFunc(id) {
        $.getJSON('http://localhost:8089/api/' + id, function (json) {
            let user = {
                id: json.id,
                name: json.firstName,
                lastname: json.lastName,
                profession: json.age,
                address: json.address,
                password: json.password,
                userRole: JSON.stringify(json)
            };

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                `<div class="modal fade" id="modalDelete" tabindex="-1"
                 aria-hidden="true"
                 aria-labelledby="modalDelete">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="modalDeleteLabel">Delete user</h6>
                            <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="font-weight-bold">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <form class="text-center" id="formDelete">
                                        <fieldset disabled>
                                            <div class="form-group">
                                                <label for="dID">ID</label>
                                                <input class="form-control" type="number" id="dID" name="id" value="${user.id}" readonly/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dFirstname">FirstName</label>
                                                <input class="form-control" type="text" id="dFirstname" name="firstname" value="${user.firstName}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dLastname">LastName</label>
                                                <input class="form-control" type="text" id="dLastname" name="lastName" value="${user.lastName}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dAge">Profession</label>
                                                <input class="form-control" type="text" id="dAge" name="age" value="${user.age}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dAddress">Profession</label>
                                                <input class="form-control" type="text" id="dAddress" name="address" value="${user.address}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dPassword">Password</label>
                                                <input class="form-control" type="text" id="dPassword" name="password" value="${user.password}" />
                                            </div>

                                            <div class="form-group">
                                            <label for="dSelectRoles">ROLE</label>
                                            <select class="form-control" name="selectRoles[]"
                                                    multiple
                                                    id="dSelectRoles" size="2">
                                                <option value="1">ADMIN</option>
                                                <option value="2">USER</option>
                                            </select>
                                            </div>
                                        </fieldset>
                                    </form>
                                <div class="col-md-3"></div>
                            </div>

                        </div>

                        <div class="modal-footer">
                            <div class="btn-block text-right">
                                <input type="button" class="btn btn-secondary"
                                       data-dismiss="modal" value="Close"/>
                                <input class="btn btn-danger"
                                       onclick="deleteUser()"
                                       data-dismiss="modal"
                                       type="button"
                                       value="Delete"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            $('#modalDelete').modal();
        });
    }

// Отправка формы удаляемого пользователя на контроллер

    function deleteUser() {

        let id = window.formDelete.dID.value;

        $.ajax({
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8089/api/delete',
            data: JSON.stringify(id),
            dataType: 'json',
            cache: false,
            success:
                $('#' + id).remove()
        })
    }


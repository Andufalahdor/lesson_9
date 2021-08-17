let table = [];
let userIndex;
class User {
    login;
    pass;
    email;
    constructor(login, pass, email) {
        this.login = login,
            this.pass = pass,
            this.email = email;
    }
}
function addUser() {
    if (validation()) {
        event.preventDefault();
        let obj = {
            login: document.forms['core'].login.value,
            pass: document.forms['core'].pass.value,
            email: document.forms['core'].email.value,
        };
        table.push(obj);
        console.log(table);
        document.forms['core'].reset();
        render();
    }
}
function render() {
    document.getElementById('tbody').innerHTML = '';
    for (const key in table) {
        const elem = table[key];
        let newtr = document.createElement('tr');
        let index = document.createElement('td');
        index.innerHTML = `${Number(key) + 1}`;
        let login = document.createElement('td');
        login.innerHTML = elem.login;
        let pass = document.createElement('td');
        pass.innerHTML = elem.pass;
        let email = document.createElement('td');
        email.innerHTML = elem.email;
        let editTd = document.createElement('td');
        let edit = document.createElement('input');
        edit.setAttribute("type", "button");
        edit.setAttribute("onclick", "editUser()");
        edit.setAttribute("class", "edit");
        edit.value = 'Edit';
        editTd.append(edit);
        let delTd = document.createElement('td');
        let del = document.createElement('input');
        del.setAttribute("type", "button");
        del.setAttribute("onclick", "deleteUser()");
        del.setAttribute("class", "delete");
        del.value = 'Delete';
        delTd.append(del);
        newtr.append(index);
        newtr.append(login);
        newtr.append(pass);
        newtr.append(email);
        newtr.append(editTd);
        newtr.append(delTd);
        document.getElementById('tbody').append(newtr);
    }
}
function deleteUser() {
    let target = event.target;
    let deleteIndex = Number(target.parentElement.parentElement.children[0].innerHTML) - 1;
    delete table[deleteIndex];
    render();
}
function editUser() {
    let target = event.target;
    userIndex = Number(target.parentElement.parentElement.children[0].innerHTML) - 1;
    document.forms['core'].login.value = table[userIndex].login;
    document.forms['core'].pass.value = table[userIndex].pass;
    document.forms['core'].email.value = table[userIndex].email;
    document.forms['core'].submit.style.display = 'none';
    document.forms['core'].editButton.style.display = '';
}
function saveEditUser() {
    if (validation()) {
        event.preventDefault();
        document.forms['core'].login.value;
        document.forms['core'].pass.value;
        document.forms['core'].email.value;
        let obj = new User(document.forms['core'].login.value, document.forms['core'].pass.value, document.forms['core'].email.value);
        table[userIndex] = obj;
        document.forms['core'].submit.style.display = '';
        document.forms['core'].editButton.style.display = 'none';
        document.forms['core'].reset();
        render();
    }
}
function validation() {
    if (document.forms['core'].login.validity.valid && document.forms['core'].pass.validity.valid && document.forms['core'].email.validity.valid) {
        return true;
    }
    else {
        return false;
    }
}

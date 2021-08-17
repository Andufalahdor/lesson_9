// 1. Потрібно реалізувати функціонал як на відео UserList, а саме:
// 1. При кліку на кнопку Add user запускаєте функцію addUser() яка робить наступне:
// a. Стягуєте дані з полів і формує об’єкт.
// b. Цей об’єкт пушитю в масив.
// c. Поля зачищає.
// d. Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.

interface Iuser {
    login: string;
    pass: string;
    email: string;
}

let table:Array<Iuser> = [];
let userIndex: number;

class User implements Iuser {
    login:string
    pass:string
    email:string
    constructor(login:string, pass:string, email:string) {
        this.login = login,
        this.pass = pass,
        this.email = email
    }
}

function addUser():void {
    if (validation()) {
        event.preventDefault();
        let obj: Iuser = {
            login: document.forms['core'].login.value,
            pass: document.forms['core'].pass.value,
            email: document.forms['core'].email.value,
        }
        table.push(obj);
        console.log(table);
        document.forms['core'].reset();
        render();
    }
}

function render():void {
    document.getElementById('tbody').innerHTML = '';
    for (const key in table) {

        const elem:Iuser = table[key];

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
        editTd.append(edit)

        let delTd = document.createElement('td')
        let del = document.createElement('input')
        del.setAttribute("type", "button");
        del.setAttribute("onclick", "deleteUser()");
        del.setAttribute("class", "delete");
        del.value = 'Delete';
        delTd.append(del)

        newtr.append(index)
        newtr.append(login)
        newtr.append(pass)
        newtr.append(email)
        newtr.append(editTd)
        newtr.append(delTd)

        document.getElementById('tbody').append(newtr);
    }
}

// 2. При кліку на кнопку Delete запускаєте функцію deleteUser() яка робить наступне:
// a. Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// b. По цьому індексу видаляємо елемент з масиву.
// c. Запускаєм заново функцію render().

function deleteUser():void {
    let target = event.target as HTMLElement;
    let deleteIndex:number = Number(target.parentElement.parentElement.children[0].innerHTML) - 1;

    delete table[deleteIndex];
    render();
}

// 3. При кліку на кнопку Edit запускаєте функцію editUser() яка робить наступне:
// a. Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// b. По цьому індексу витягуємо конкретрний елемент(тобто об’єкт) з масиву.
// c. З об’єкт достаємо дані і передаємо в форму(тобто у value інпутів).
// d. Запам’ятовуємо даний індекс в змінну userIndex.
// e. Показуємо кнопку Edit user і приховуємо Add user.

function editUser():void {
    let target = event.target as HTMLElement;
    userIndex = Number(target.parentElement.parentElement.children[0].innerHTML) - 1;
    document.forms['core'].login.value = table[userIndex].login
    document.forms['core'].pass.value = table[userIndex].pass
    document.forms['core'].email.value = table[userIndex].email

    document.forms['core'].submit.style.display = 'none';
    document.forms['core'].editButton.style.display = '';
}

// 4. При кліку на кнопку Edit User запускаєте функцію saveEditUser() яка робить наступне:
// a. Стягуєте дані з полів і формує об’єкт через клас.
// b. Цей об’єкт додається на місце старого об’єкту через userIndex.
// c. Поля зачищає.
// d. Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.

function saveEditUser():void {

    if (validation()) {
        event.preventDefault();

        document.forms['core'].login.value
        document.forms['core'].pass.value
        document.forms['core'].email.value
        let obj:Iuser = new User(document.forms['core'].login.value, document.forms['core'].pass.value, document.forms['core'].email.value)

        table[userIndex] = obj

        document.forms['core'].submit.style.display = '';
        document.forms['core'].editButton.style.display = 'none';

        document.forms['core'].reset();
        render();
    }
}

// 5. Всі поля форми потрібно валідувати перед добавленням, а саме:
// a. Login: може бути слово англійською з великої або маленької букви від 4 до 16 символів.
// b. Password: можуть бути букви, цифри, символ нижнього підкреслювання(_), тире(-) та символ крапки(.) від 4 до 16 символів
// c. Email: обов'язково @. Усі букви повинні бути англійською. Загальні вимоги наступні
// (будь-яка кількість букв, цифр, тире і крапок@будьяка кількість букв.( net.ua, org.ua, gmail.com. і т.д.)).

function validation():boolean {
    if (document.forms['core'].login.validity.valid && document.forms['core'].pass.validity.valid && document.forms['core'].email.validity.valid) {
        return true;
    } else {
        return false;
    }
}
function register(event) {

    event.preventDefault();

    let user =
        document.getElementById("regUser").value;

    let pass =
        document.getElementById("regPass").value;

    let mail =
        document.getElementById("regMail").value;

    if (!user || !pass || !mail) {

        alert("Data tidak lengkap!");

        return;
    }

    /* AMBIL DATA USER */
    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    /* BATAS 7 USER */
    if (users.length >= 7) {

        alert("Maksimal hanya 7 user!");

        return;
    }

    /* CEK USER SUDAH ADA */
    let cekUser = users.find(
        data => data.username === user
    );

    if (cekUser) {

        alert("Username sudah digunakan!");

        return;
    }

    /* TAMBAH USER */
    users.push({
        username: user,
        password: pass,
        email: mail
    });

    /* SIMPAN */
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Register berhasil!");

    window.location.href = "login.html";
}
function login(event) {

    event.preventDefault();

    let user =
        document.getElementById("loginUser").value;

    let pass =
        document.getElementById("loginPass").value;

    /* AMBIL SEMUA USER */
    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    /* CEK USER */
    let cekUser = users.find(
        data =>
            data.username === user &&
            data.password === pass
    );

    if (cekUser) {

        /* SIMPAN USER LOGIN */
        localStorage.setItem(
            "loginUser",
            cekUser.username
        );

        alert("Login berhasil!");

        window.location.href = "index.html";

    } else {

        alert("Username atau password salah!");

    }
}

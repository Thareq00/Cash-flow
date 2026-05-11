/* AMBIL SEMUA USER */
let users = JSON.parse(localStorage.getItem("users")) || [];

let table = document.getElementById("userTable");

/* TAMPILKAN DATA */
function tampilData() {

    table.innerHTML = "";

    /* JIKA BELUM ADA USER */
    if (users.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    Belum ada data user
                </td>
            </tr>
        `;

        return;
    }

    /* LOOP USER */
    users.forEach((user, index) => {

        table.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${user.email}</td>

                <td>
                    <button onclick="hapusUser(${index})">
                        Hapus
                    </button>
                </td>

                <td>
                    <button onclick="tambahUser()">
                        Tambah
                    </button>
                </td>
            </tr>
        `;
    });
}

/* HAPUS USER */
function hapusUser(index) {

    users.splice(index, 1);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Data user berhasil dihapus!");

    tampilData();
}

/* TAMBAH USER */
function tambahUser() {

    /* BATAS 7 USER */
    if (users.length >= 7) {

        alert("Maksimal hanya 7 user!");

        return;
    }

    window.location.href = "register.html";
}

/* LOAD */
tampilData();
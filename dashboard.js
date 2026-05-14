/* USER LOGIN */
let user = localStorage.getItem("loginUser");

if (!user) {

    window.location.href = "login.html";

}

/* SAMAKAN FORMAT USER */
user = user.trim().toLowerCase();
/* WELCOME TEXT */
document.getElementById("welcome").innerHTML =
    "Selamat datang, " + user + " 👋";

/* AMBIL TRANSAKSI USER */
let transaksiKey = `transaksi_${user}`;

let transaksi =
    JSON.parse(
        localStorage.getItem(transaksiKey)
    ) || [];

/* ELEMENT */
let totalSaldo =
    document.getElementById("total-saldo");

let pemasukan =
    document.getElementById("pemasukan");

let pengeluaran =
    document.getElementById("pengeluaran");

/* TOTAL */
let saldo = 0;
let totalMasuk = 0;
let totalKeluar = 0;

/* LOOP TRANSAKSI */
transaksi.forEach((item) => {

    if (item.tipe === "masuk") {

        saldo += Number(item.jumlah);

        totalMasuk += Number(item.jumlah);

    } else {

        saldo -= Number(item.jumlah);

        totalKeluar += Number(item.jumlah);
    }

});

/* TAMPILKAN */
totalSaldo.innerHTML =
    "Rp " + saldo.toLocaleString("id-ID");

pemasukan.innerHTML =
    "Rp " + totalMasuk.toLocaleString("id-ID");

pengeluaran.innerHTML =
    "Rp " + totalKeluar.toLocaleString("id-ID");

/* LOGOUT */
function logout() {

    localStorage.removeItem("loginUser");

    window.location.href = "login.html";

}
let form = document.getElementById("cashForm");
let table = document.getElementById("data-transaksi");
let saldoText = document.getElementById("saldo");
let namaUser = document.getElementById("nama-user");
let totalMasukText = document.getElementById("total-masuk");
let totalKeluarText = document.getElementById("total-keluar");

/* CEK LOGIN */
let currentUser = localStorage.getItem("loginUser");

if (!currentUser) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "login.html";
    throw new Error("User belum login");
}

currentUser = currentUser.trim().toLowerCase();

namaUser.innerHTML = `Hallo ${currentUser}`;

/* KEY USER */
let transaksiKey = `transaksi_${currentUser}`;

/* DATA */
let transaksi = JSON.parse(localStorage.getItem(transaksiKey)) || [];

/* TAMPIL DATA */
function tampilData() {

    let totalMasuk = 0;
    let totalKeluar = 0;
    let saldo = 0;

    table.innerHTML = "";

    transaksi.forEach((item, index) => {

        let jumlah = Number(item.jumlah);

        if (item.tipe === "masuk") {
            saldo += jumlah;
            totalMasuk += jumlah;
        } else {
            saldo -= jumlah;
            totalKeluar += jumlah;
        }

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.keterangan}</td>
                <td>${item.tipe}</td>
                <td>Rp ${jumlah.toLocaleString("id-ID")}</td>
                <td>${item.tanggal}</td>
                <td>
                    <button onclick="hapusTransaksi(${index})">Hapus</button>
                    <button onclick="editTransaksi(${index})">Edit</button>
                </td>
            </tr>
        `;
    });

    saldoText.innerHTML = `Rp ${saldo.toLocaleString("id-ID")}`;
    totalMasukText.innerHTML = `Rp ${totalMasuk.toLocaleString("id-ID")}`;
    totalKeluarText.innerHTML = `Rp ${totalKeluar.toLocaleString("id-ID")}`;
}

/* TAMBAH */
form.addEventListener("submit", function(event){
    event.preventDefault();

    let keterangan = document.getElementById("keterangan").value;
    let jumlah = document.getElementById("jumlah").value;
    let tipe = document.getElementById("tipe").value;

    transaksi.push({
        keterangan,
        jumlah: Number(jumlah),
        tipe,
        tanggal: new Date().toLocaleDateString("id-ID")
    });

    localStorage.setItem(transaksiKey, JSON.stringify(transaksi));

    tampilData();
    form.reset();
});

/* HAPUS */
function hapusTransaksi(index) {
    if (confirm("Yakin ingin menghapus transaksi ini?")) {
        transaksi.splice(index, 1);

        localStorage.setItem(transaksiKey, JSON.stringify(transaksi));

        tampilData();

        alert("Transaksi berhasil dihapus!");
    }
}

/* EDIT */
function editTransaksi(index) {

    let data = transaksi[index];

    let keterangan = prompt("Edit keterangan:", data.keterangan);
    let jumlah = prompt("Edit jumlah:", data.jumlah);
    let tipe = prompt("Edit tipe (masuk/keluar):", data.tipe);

    if (!keterangan || !jumlah || !tipe) {
        alert("Data tidak boleh kosong!");
        return;
    }

    transaksi[index] = {
        keterangan,
        jumlah: Number(jumlah),
        tipe,
        tanggal: data.tanggal
    };

    localStorage.setItem(transaksiKey, JSON.stringify(transaksi));

    tampilData();

    alert("Transaksi berhasil diedit!");
}

/* NAV */
function goHome() {
    window.location.href = "index.html";
}

/* AMBIL DATA LAMA */
let oldKey = `transaksi_${localStorage.getItem("loginUser")}`;

/* KEY BARU */
let transaksiKey = `transaksi_${currentUser}`;

/* PINDAHKAN DATA LAMA */
if (
    oldKey !== transaksiKey &&
    localStorage.getItem(oldKey)
) {

    localStorage.setItem(
        transaksiKey,
        localStorage.getItem(oldKey)
    );

}
/* LOAD */
tampilData()
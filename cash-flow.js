llet form = document.getElementById("cashForm");
let table = document.getElementById("data-transaksi");
let saldoText = document.getElementById("saldo");
let namaUser = document.getElementById("nama-user");
let totalMasukText = document.getElementById("total-masuk");
let totalKeluarText = document.getElementById("total-keluar");

/* CEK LOGIN HARUS DI ATAS */
let currentUser = localStorage.getItem("loginUser");

if (!currentUser) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "login.html";
    throw new Error("User belum login");
}

currentUser = currentUser.trim().toLowerCase();

namaUser.innerHTML = `Hallo ${currentUser}`;
/* ELEMENT */
let totalMasukText =
    document.getElementById("total-masuk");

let totalKeluarText =
    document.getElementById("total-keluar");
/* KEY TRANSAKSI USER */
let transaksiKey =
    `transaksi_${currentUser}`;


/* DATA TRANSAKSI USER */
let transaksi =
    JSON.parse(
        localStorage.getItem(transaksiKey)
    ) || [];
/* TAMPILKAN DATA */
function tampilData() {
    let totalMasuk = 0;
    let totalKeluar = 0;

    table.innerHTML = "";

    let saldo = 0;

    transaksi.forEach((item, index) => {

        if(item.tipe === "masuk"){
            saldo += Number(item.jumlah);
            totalMasuk += Number(item.jumlah);
        } else {
            saldo -= Number(item.jumlah);
            totalKeluar += Number(item.jumlah);
        }

        table.innerHTML += `
    <tr>

        <td>${index + 1}</td>

        <td>${item.keterangan}</td>

        <td>${item.tipe}</td>

        <td>
            Rp ${Number(item.jumlah)
                .toLocaleString("id-ID")}
        </td>

        <td>${item.tanggal}</td>

        <td>

            <button onclick="hapusTransaksi(${index})">
                Hapus
            </button>

            <button onclick="editTransaksi(${index})">
                Edit
            </button>

        </td>

    </tr>
`;
    });

    saldoText.innerHTML = `Rp ${saldo.toLocaleString("id-ID")}`;
    totalMasukText.innerHTML =
    "Rp " + totalMasuk.toLocaleString("id-ID");

    totalKeluarText.innerHTML =
    "Rp " + totalKeluar.toLocaleString("id-ID");
}

/* TAMBAH TRANSAKSI */
form.addEventListener("submit", function(event){

    event.preventDefault();

    let keterangan = document.getElementById("keterangan").value;
    let jumlah = document.getElementById("jumlah").value;
    let tipe = document.getElementById("tipe").value;
    let tanggal = new Date().toLocaleDateString("id-ID");
    transaksi.push({
        keterangan: keterangan,
        jumlah: jumlah,
        tipe: tipe,
        tanggal: new Date().toLocaleDateString("id-ID")
    });

    localStorage.setItem(
    transaksiKey,
    JSON.stringify(transaksi)
);
    tampilData();

    form.reset();
});

/* HAPUS TRANSAKSI */
function hapusTransaksi(index) {

    let yakin = confirm("Yakin ingin menghapus transaksi ini?");

    if (yakin) {

        transaksi.splice(index, 1);

        localStorage.setItem(
            transaksiKey,
            JSON.stringify(transaksi)
        );

        tampilData();

        alert("Transaksi berhasil dihapus!");
    }
}

/* EDIT TRANSAKSI */
function editTransaksi(index) {

    let data = transaksi[index];

    let keterangan = prompt(
        "Masukkan keterangan baru:",
        data.keterangan
    );

    let jumlah = prompt(
        "Masukkan jumlah uang baru:",
        data.jumlah
    );

    let tipe = prompt(
        "Masukkan tipe transaksi (masuk/keluar):",
        data.tipe
    );

    if (!keterangan || !jumlah || !tipe) {

        alert("Data tidak boleh kosong!");

        return;
    }

    transaksi[index] = {

    keterangan: keterangan,

    jumlah: jumlah,

    tipe: tipe,

    tanggal: data.tanggal
    };
    localStorage.setItem(
        transaksiKey,
        JSON.stringify(transaksi)
    );

    tampilData();

    alert("Transaksi berhasil diedit!");
}

/*BOTTOM NAV*/
function goHome() {
    window.location.href = "index.html";
}


/* LOAD */
tampilData();
// memanggil data yang ada di cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

class Aturan {
  // Var Default
  #sp = 0; // score player
  #sc = 0; // score computer

  constructor(elementHasil) {
    if (this.constructor === Aturan) {
      throw new Error("Tidak Bisa Mengakses Abstract Class");
    }

    const { vs, hasilPermainan, textHasilPermainan1, textHasilPermainan2, cekOpacity, scorePlayer, scoreCom } = elementHasil;

    this.vs = vs;
    this.hasilPermainan = hasilPermainan;
    this.textHasilPermainan1 = textHasilPermainan1;
    this.textHasilPermainan2 = textHasilPermainan2;
    this.cekOpacity = cekOpacity;
    this.scorePlayer = scorePlayer;
    this.scoreCom = scoreCom;
  }

  // private method
  #pilihanPlayer(pp) {
    return pp.getAttribute("id");
    // mencari pilihan player
  }

  // private method
  #pilihanComputer(hasilPC) {
    switch (hasilPC) {
      case 0:
        return "batu";
      case 1:
        return "gunting";
      case 2:
        return "kertas";
      default:
        return new Error("Pilihan Computer Tidak Valid");
      // mencari pilihan computer
    }
  }

  // private method
  // mencari pemenang
  #methodHasilPermainan(hasilPP, hasilPC) {
    if (hasilPP === hasilPC) {
      this.textHasilPermainan1.style.display = "none";
      this.textHasilPermainan2.innerText = "Draw";
      this.hasilPermainan.classList.remove("bg-opacity-50");

      //menampilkan hasil permainan di console
      // console.log('Hasil: Draw')
      console.log(
        `Keterangan: Tidak ada yang mendapatkan poin, Total Score >> Player: ${this.#sp
        }, Com: ${this.#sc}`
      );
    } else if (hasilPP === "batu") {
      if (hasilPC === "gunting") {
        this.textHasilPermainan1.style.display = "block";
        this.textHasilPermainan1.innerText = "PLAYER";
        this.textHasilPermainan2.innerText = "Win";

        if (!this.cekOpacity)
          this.hasilPermainan.classList.add("bg-opacity-50");
        this.scorePlayer.innerText = this.#sp += 1;

        //menampilkan hasil permainan di console
        // console.log("Hasil: Player Win");
        console.log(
          `Keterangan: Player mendapatkan 1 poin. Total Score >> Player: ${this.#sp
          }, Com: ${this.#sc}`
        );
      } else {
        this.textHasilPermainan1.style.display = "block";
        this.textHasilPermainan1.innerText = "COM";
        this.textHasilPermainan2.innerText = "Win";

        if (!this.cekOpacity)
          this.hasilPermainan.classList.add("bg-opacity-50");
        this.scoreCom.innerText = this.#sc += 1;

        //menampilkan hasil permainan di console
        // console.log('Hasil: Com Win')
        console.log(
          `Keterangan: Computer mendapatkan 1 poin. Total Score >> Player: ${this.#sp
          }, Com: ${this.#sc}`
        );
      }
    } else if (hasilPP === "gunting") {
      if (hasilPC === "batu") {
        this.textHasilPermainan1.style.display = "block";
        this.textHasilPermainan1.innerText = "COM";
        this.textHasilPermainan2.innerText = "Win";

        if (!this.cekOpacity)
          this.hasilPermainan.classList.add("bg-opacity-50");
        this.scoreCom.innerText = this.#sc += 1;

        //menampilkan hasil permainan di console
        // console.log("Hasil: Com Win");
        console.log(
          `Keterangan: Computer mendapatkan 1 poin. Total Score >> Player: ${this.#sp
          }, Com: ${this.#sc}`
        );
      } else {
        this.textHasilPermainan1.style.display = "block";
        this.textHasilPermainan1.innerText = "PLAYER";
        this.textHasilPermainan2.innerText = "Win";

        if (!this.cekOpacity)
          this.hasilPermainan.classList.add("bg-opacity-50");
        this.scorePlayer.innerText = this.#sp += 1;

        //menampilkan hasil permainan di console
        // console.log('Hasil: Player Win')
        console.log(
          `Keterangan: Player mendapatkan 1 poin. Total Score >> Player: ${this.#sp
          }, Com: ${this.#sc}`
        );
      }
    } else if (hasilPP === "kertas") {
      if (hasilPC === "batu") {
        this.textHasilPermainan1.style.display = "block";
        this.textHasilPermainan1.innerText = "PLAYER";
        this.textHasilPermainan2.innerText = "Win";

        if (!this.cekOpacity)
          this.hasilPermainan.classList.add("bg-opacity-50");
        this.scorePlayer.innerText = this.#sp += 1;

        //menampilkan hasil permainan di console
        // console.log('Hasil: Player Win')
        console.log(
          `Keterangan: Player mendapatkan 1 poin. Total Score >> Player: ${this.#sp
          }, Com: ${this.#sc}`
        );
      } else {
        this.textHasilPermainan1.style.display = "block";
        this.textHasilPermainan1.innerText = "COM";
        this.textHasilPermainan2.innerText = "Win";

        if (!this.cekOpacity)
          this.hasilPermainan.classList.add("bg-opacity-50");
        this.scoreCom.innerText = this.#sc += 1;

        //menampilkan hasil permainan di console
        // console.log('Hasil: Com Win')
        console.log(
          `Keterangan: Computer mendapatkan 1 poin. Total Score >> Player: ${this.#sp
          }, Com: ${this.#sc}`
        );
      }
    } else {
      throw new Error("Hasil Pertandingan Tidak Valid");
    }
  }

  //encapculation
  _finalPilihanPlayer(pp) {
    return this.#pilihanPlayer(pp);
  }

  _finalPilihanComputer(hasilPC) {
    return this.#pilihanComputer(hasilPC);
  }

  _finalPermainan(hasilPP, hasilPC) {
    return this.#methodHasilPermainan(hasilPP, hasilPC);
  }
}

// inheritance
class Permainan extends Aturan {
  // variable default
  #stylePilihan = "pilihan";
  #styleHasil = "hasil";
  #waktuAnimasiMulai = 100;
  #waktuAnimasiSelesai = 1300;

  constructor(elementHasil, pilihan, ulang) {
    super(elementHasil);

    const { pilihanPlayer, pilihanComputer } = pilihan;

    this.pilihanPlayer = pilihanPlayer;
    this.pilihanComputer = pilihanComputer;
    this.ulang = ulang;
  }

  // aimasi acak pilihan computer
  #animasiPilihanComputer() {
    let waktu = this.#waktuAnimasiMulai;
    for (let i = 0; i < this.pilihanComputer.length; i++) {
      setTimeout(() => {
        this.pilihanComputer[i].classList.add(this.#stylePilihan);
      }, waktu);

      for (let i = 0; i < this.pilihanComputer.length; i++) {
        waktu += 100;
        setTimeout(() => {
          this.pilihanComputer[i].classList.remove(this.#stylePilihan);
        }, waktu);
      }
    }
  }

  // kondisi awal permainan
  #kondisiAwal() {
    this.pilihanPlayer.forEach((pp) => {
      pp.classList.remove(this.#stylePilihan);
    });

    this.pilihanComputer.forEach((pc) => {
      pc.classList.remove(this.#stylePilihan);
    });

    this.vs.style.display = "block";
    this.hasilPermainan.style.display = "none";
    this.hasilPermainan.classList.remove(this.#styleHasil);
  }

  // override pp
  _finalPilihanPlayer(pp) {
    // menampilkan hasil pilihan player
    // console.log(`Pilihan Player: `, super._finalPilihanPlayer(pp))
    return super._finalPilihanPlayer(pp);
  }

  // override hasilPC
  _finalPilihanComputer(hasilPC) {
    // menampilkan hasil pilihan computer
    // console.log('Pilihan Computer: ', super._finalPilihanComputer(hasilPC))
    return super._finalPilihanComputer(hasilPC);
  }

  // override
  _finalPermainan(hasilPilihanPlayer, hasilPilihanComputer) {
    return super._finalPermainan(hasilPilihanPlayer, hasilPilihanComputer);
  }

  // proses mencari pemenang
  methodBermain() {
    let payload = {
      win: 0,
      lose: 0,
      draw: 0,
    };
    let dataUser = JSON.parse(getCookie('qw3r7y'));
    console.log(dataUser);
    let profiles = dataUser.profiles;
    console.log(`Nama Player: ${profiles.firstName}`);
    let userId = dataUser.id;

    this.pilihanPlayer.forEach((pp) => {
      pp.addEventListener("click", (event) => {
        // mengembalikan kondisi awal permainan
        this.#kondisiAwal();
        // memberi style pilihan player
        pp.classList.add(this.#stylePilihan);
        // memberi animasi acak pada pilihan computer
        this.#animasiPilihanComputer();

        // memberi animasi hasil permainan
        setTimeout(() => {
          // ambil pilihan player
          const hasilPilihanPlayer = this._finalPilihanPlayer(pp);
          // mengambil angka acak 0-2
          const hasilPC = Math.floor(Math.random() * pilihanComputer.length);
          // mengambil pilihan computer
          const hasilPilihanComputer = this._finalPilihanComputer(hasilPC);
          // mencari pemenang
          this._finalPermainan(hasilPilihanPlayer, hasilPilihanComputer);
          // memberikan style hasil final permainan
          this.pilihanComputer[hasilPC].classList.add(this.#stylePilihan);
          this.vs.style.display = "none";
          this.hasilPermainan.style.display = "block";
          this.hasilPermainan.classList.add(this.#styleHasil);

          let y = document.getElementsByClassName('pilihan')[0].id;
          console.log(y);
          let z = document.getElementsByClassName('pilihan')[1].id;
          console.log(z);

          if (y === z) {
            payload.win = 0;
            payload.draw = 1;
            payload.lose = 0;
          } else if (y === "batu" && z === "gunting") {
            payload.win = 1;
            payload.draw = 0;
            payload.lose = 0;
          } else if (y === "batu" && z === "kertas") {
            payload.win = 0;
            payload.draw = 0;
            payload.lose = 1;
          } else if (y === "gunting" && z === "kertas") {
            payload.win = 1;
            payload.draw = 0;
            payload.lose = 0;
          } else if (y === "gunting" && z === "batu") {
            payload.win = 0;
            payload.draw = 0;
            payload.lose = 1;
          } else if (y === "kertas" && z === "batu") {
            payload.win = 1;
            payload.draw = 0;
            payload.lose = 0;
          } else if (y === "kertas" && z === "gunting") {
            payload.win = 0;
            payload.draw = 0;
            payload.lose = 1;
          } else {
            throw new Error('Hasil Pertandingan Tidak Valid')
          }
        }, this.#waktuAnimasiSelesai);

        fetch(
          'game-score',
          {
            method: 'post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              userId: userId,
              win: payload.win,
              draw: payload.draw,
              lose: payload.lose,
              typePlayer: profiles.firstName
            })
          }
        ).then((res) => {
          return res.json()
        }).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      });
    });
  }

  // mengulang permainan
  methodUlang() {
    this.ulang.addEventListener("click", (event) => {
      this.#kondisiAwal();
      this.scoreCom.innerText = 0;
      this.scorePlayer.innerText = 0;
      // menghentikan default action
      event.preventDefault();
    });
  }
}

// mengambil element yg di butuhkan
const pilihanPlayer = document.querySelectorAll(".pilihanPlayer");
const pilihanComputer = document.querySelectorAll(".pilihanComputer");
const vs = document.getElementById("vs");
const hasilPermainan = document.getElementById("hasilPermainan");
const textHasilPermainan1 = document.querySelector("#hasilPermainan h1:nth-child(1)");
const textHasilPermainan2 = document.querySelector("#hasilPermainan h1:nth-child(2)");
const cekOpacity = hasilPermainan.classList.contains("bg-opacity-50");
const scorePlayer = document.getElementById("scorePlayer");
const scoreCom = document.getElementById("scoreCom");
const ulang = document.getElementById("ulang");


// instansiasi mulaiPermainan class
const mulaiPermainan = new Permainan(
  {
    vs,
    hasilPermainan,
    textHasilPermainan1,
    textHasilPermainan2,
    cekOpacity,
    scorePlayer,
    scoreCom
  },
  {
    pilihanPlayer,
    pilihanComputer
  },
  ulang
);

// memanggil mulaiPermainan class
mulaiPermainan.methodBermain();
mulaiPermainan.methodUlang();



// // save game data (win, draw, lose)
// const saveData = document.querySelectorAll('.pilihanPlayer');
// saveData.forEach((pp) => {
//   pp.addEventListener('click', (event) => {
//     // function play() {
//     // var codePilihanComp = JSON.parse(getCookie('codePilihanComp'));
//     // console.log(codePilihanComp);
//     // let userId = dataUser.id;
//     // let win = 0;
//     // let draw = 0;
//     // let lose = 0;

//     var z = document.getElementsByName('computerChoice')[hasilPC];
//     console.log(z);

//     var y = document.getElementsByClassName('pilihan');
//     // console.log(`Hasil dari getElementsByClassName ${y}`);
//     console.log(y);

//     var x = document.querySelectorAll('.pilihan');
//     // console.log(`Hasil dari querySelectorAll ${x}`);
//     console.log(x);




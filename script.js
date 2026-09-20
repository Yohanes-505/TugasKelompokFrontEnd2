$(document).ready(function() {

    // kalau pengguna mengaktifkan "kurangi animasi" di perangkatnya, animasi dilewati
    const kurangiAnimasi = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!kurangiAnimasi) {
        $('.hero-content').children().each(function(index) {
            $(this)
                .css({ opacity: 0, position: 'relative', top: '20px' }) // mulai transparan & agak turun
                .delay(index * 250)                                      // tiap elemen jeda 250ms
                .animate({ opacity: 1, top: 0 }, 700);                   // lalu naik & muncul
        });
    }



    // 2. MENU MOBILE
    // Setelah link di navbar diklik, menu hamburger ditutup kembali
    const $navToggle = $('#nav-toggle');

    $('.nav-list a').click(function() {
        $navToggle.prop('checked', false);
    });

    // 3. ACCORDION FAQ
    // Jawaban muncul/tertutup saat pertanyaan diklik,
    // dan hanya satu jawaban yang terbuka dalam satu waktu
    // selector disimpan sekali di variabel, tidak dicari ulang setiap klik
    const $pertanyaan = $('.faq-question');
    const $jawaban    = $('.faq-answer');

    $pertanyaan.click(function() {
        const $diklik     = $(this);
        const $jawabanIni = $diklik.next('.faq-answer'); // jawaban tepat di bawah pertanyaan yang diklik

        // tutup jawaban lain yang sedang terbuka
        $jawaban.not($jawabanIni).slideUp(300);
        $pertanyaan.not($diklik).removeClass('active');

        // buka/tutup jawaban yang diklik
        $jawabanIni.slideToggle(300);
        $diklik.toggleClass('active');
    });


    // 4. TOMBOL SUKA
    // Klik pertama menambah 1, klik kedua membatalkan (mengurangi 1)
    $('.btn-like').click(function() {
        const $tombol  = $(this);
        const $counter = $tombol.find('.like-count');
        const jumlah   = parseInt($counter.text());

        $tombol.toggleClass('liked');

        if ($tombol.hasClass('liked')) {
            $counter.text(jumlah + 1);
        } else {
            $counter.text(jumlah - 1);
        }
    });


    // 5. TOMBOL KEMBALI KE ATAS
    // Muncul setelah halaman di-scroll, klik untuk kembali ke atas
    const $tombolAtas = $('#back-to-top');

    // muncul kalau sudah scroll lebih dari 300px, hilang kalau di atas
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $tombolAtas.fadeIn(300);
        } else {
            $tombolAtas.fadeOut(300);
        }
    });

    $tombolAtas.click(function() {
        // scroll-behavior: smooth di CSS membuat animate() patah-patah,
        // jadi dimatikan sementara selama animasi lalu dikembalikan
        $('html').css('scroll-behavior', 'auto');
        $('html, body').animate({ scrollTop: 0 }, 600, function() {
            $('html').css('scroll-behavior', '');
        });
    });


    // 6. VALIDASI FORM KONTAK
    const $form       = $('#form-kontak');
    const $nama       = $('#nama');
    const $email      = $('#email');
    const $pesan      = $('#pesan');
    const $formStatus = $('#form-status');

    // pola email sederhana: teks@teks.teks
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // fungsi bantu: tampilkan pesan error di bawah input
    function tampilkanError($input, pesan) {
        $input.addClass('input-error');
        $input.next('.error-msg').text(pesan);
    }

    // fungsi bantu: hapus pesan error
    function hapusError($input) {
        $input.removeClass('input-error');
        $input.next('.error-msg').text('');
    }

    // error langsung hilang begitu pengguna mulai mengetik ulang
    $form.find('input, textarea').on('input', function() {
        hapusError($(this));
    });

    $form.submit(function(event) {
        event.preventDefault(); // cegah halaman reload

        // .trim() membuang spasi di awal/akhir, supaya isian "   " tetap dianggap kosong
        const isiNama  = $nama.val().trim();
        const isiEmail = $email.val().trim();
        const isiPesan = $pesan.val().trim();

        let valid = true;

        // cek nama
        if (isiNama === '') {
            tampilkanError($nama, 'Nama wajib diisi.');
            valid = false;
        } else if (isiNama.length < 3) {
            tampilkanError($nama, 'Nama minimal 3 huruf.');
            valid = false;
        } else {
            hapusError($nama);
        }

        // cek email
        if (isiEmail === '') {
            tampilkanError($email, 'Email wajib diisi.');
            valid = false;
        } else if (!polaEmail.test(isiEmail)) {
            tampilkanError($email, 'Format email belum benar, contoh: nama@email.com');
            valid = false;
        } else {
            hapusError($email);
        }

        // cek pesan
        if (isiPesan === '') {
            tampilkanError($pesan, 'Pesan wajib diisi.');
            valid = false;
        } else if (isiPesan.length < 10) {
            tampilkanError($pesan, 'Pesan minimal 10 karakter.');
            valid = false;
        } else {
            hapusError($pesan);
        }

        // kalau ada yang salah, arahkan kursor ke kolom error pertama lalu berhenti
        if (!valid) {
            $form.find('.input-error').first().focus();
            return;
        }

        // kalau semua benar: tampilkan pesan sukses
        // .text() (bukan .html()) supaya isian pengguna tidak dijalankan sebagai kode HTML
        $formStatus
            .text('Terima kasih, ' + isiNama + '! Pesan kamu sudah terkirim.')
            .slideDown(300)
            .delay(4000)
            .slideUp(300);

        // kosongkan form
        this.reset();
    });

});
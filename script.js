$(document).ready(function() {    
    // ketika class faq-question diklik maka
    $('.faq-question').click(function() {
        // answer = isi dari class faq-answer yang berada di faq-question yang diklik
        let answer = $(this).next('.faq-answer');
        answer.slideToggle(100);
        $(this).toggleClass('active');

        // hanya salah satu faq yang terbuka
        $('.faq-answer').not(answer).slideUp(100);
        $('.faq-question').not(this).removeClass('active');
    });
  
    // untuk DOM fitur like
    $('.btn-like').click(function() {
        $(this).toggleClass('liked');
        let counterSpan = $(this).find('.like-count');
        let currentCount = parseInt(counterSpan.text());

        if ($(this).hasClass('liked')) {
            counterSpan.text(currentCount + 1);
        } else {
            counterSpan.text(currentCount - 1);
        }
    });

    let tombolAtas = $('#back-to-top');

    // muncul kalau sudah scroll lebih dari 300px, hilang kalau di atas
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            tombolAtas.fadeIn(300);
        } else {
            tombolAtas.fadeOut(300);
        }
    });

    // saat diklik, halaman naik ke atas dengan halus
    tombolAtas.click(function() {
        $('html').css('scroll-behavior', 'auto');
        $('html, body').animate({ scrollTop: 0 }, 600, function() {
            $('html').css('scroll-behavior', '');
        });
    });

        // ===== VALIDASI FORM KONTAK =====

    // fungsi bantu: tampilkan pesan error di bawah input
    function tampilkanError(input, pesan) {
        input.addClass('input-error');
        input.next('.error-msg').text(pesan);
    }

    // fungsi bantu: hapus pesan error
    function hapusError(input) {
        input.removeClass('input-error');
        input.next('.error-msg').text('');
    }

    // error langsung hilang begitu pengguna mulai mengetik ulang
    $('#form-kontak input, #form-kontak textarea').on('input', function() {
        hapusError($(this));
    });

        $('#form-kontak').submit(function(event) {
        event.preventDefault(); // cegah halaman reload

        let nama  = $('#nama');
        let email = $('#email');
        let pesan = $('#pesan');

        // .trim() membuang spasi di awal/akhir, supaya isian "   " tetap dianggap kosong
        let isiNama  = nama.val().trim();
        let isiEmail = email.val().trim();
        let isiPesan = pesan.val().trim();

        // pola email sederhana: teks@teks.teks
        let polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valid = true;

        // cek nama
        if (isiNama === '') {
            tampilkanError(nama, 'Nama wajib diisi.');
            valid = false;
        } else if (isiNama.length < 3) {
            tampilkanError(nama, 'Nama minimal 3 huruf.');
            valid = false;
        } else {
            hapusError(nama);
        }

        // cek email
        if (isiEmail === '') {
            tampilkanError(email, 'Email wajib diisi.');
            valid = false;
        } else if (!polaEmail.test(isiEmail)) {
            tampilkanError(email, 'Format email belum benar, contoh: nama@email.com');
            valid = false;
        } else {
            hapusError(email);
        }

        // cek pesan
        if (isiPesan === '') {
            tampilkanError(pesan, 'Pesan wajib diisi.');
            valid = false;
        } else if (isiPesan.length < 10) {
            tampilkanError(pesan, 'Pesan minimal 10 karakter.');
            valid = false;
        } else {
            hapusError(pesan);
        }

        // kalau ada yang salah, arahkan kursor ke kolom error pertama lalu berhenti
        if (!valid) {
            $('.input-error').first().focus();
            return;
        }

        // kalau semua benar: tampilkan pesan sukses
        $('#form-status')
            .text('Terima kasih, ' + isiNama + '! Pesan kamu sudah terkirim.')
            .slideDown(300)
            .delay(4000)
            .slideUp(300);

        // kosongkan form
        this.reset();
    });

});

// judul, paragraf, dan tombol muncul bergantian saat halaman dibuka

    let kurangiAnimasi = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!kurangiAnimasi) {
        $('.hero-content').children().each(function(index) {
            $(this)
                .css({ opacity: 0, position: 'relative', top: '20px' }) // mulai transparan & agak turun
                .delay(index * 250)                                      // tiap elemen jeda 250ms
                .animate({ opacity: 1, top: 0 }, 700);                   // lalu naik & muncul
        });
    }

 // setelah link di navbar diklik, checkbox hamburger diuncheck
    $('.nav-list a').click(function() {
        $('#nav-toggle').prop('checked', false);
    });
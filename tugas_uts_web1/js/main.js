// js/main.js - logic for all pages
(function(){
  // helpers
  const $ = id => document.getElementById(id);
  const q = sel => document.querySelector(sel);
  const qs = sel => Array.from(document.querySelectorAll(sel));
  const rupiah = n => 'Rp' + Number(n).toLocaleString('id-ID');

  /* ----------------- Modal helpers ----------------- */
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';
  modalBackdrop.innerHTML = `<div class="modal card"><h3 id="mTitle"></h3><div id="mBody"></div><div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn secondary" id="mClose">Tutup</button></div></div>`;
  document.body.appendChild(modalBackdrop);
  const mTitle = modalBackdrop.querySelector('#mTitle');
  const mBody = modalBackdrop.querySelector('#mBody');
  modalBackdrop.addEventListener('click', e => { if(e.target === modalBackdrop) hideModal(); });
  modalBackdrop.querySelector('#mClose').addEventListener('click', hideModal);
  function showModal(title, html){ mTitle.textContent = title; mBody.innerHTML = html; modalBackdrop.style.display='flex'; }
  function hideModal(){ modalBackdrop.style.display='none'; }

  /* ----------------- Login page ----------------- */
  const loginForm = $('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('email').value.trim();
      const password = $('password').value.trim();
      if(email === akunDemo.email && password === akunDemo.password){
        window.location.href = 'dashboard.html';
      } else {
        alert('email/password yang anda masukkan salah');
      }
    });
    const fForgot = $('btnForgot'); if(fForgot) fForgot.addEventListener('click', ()=> showModal('Lupa Password', `<p>Silakan hubungi admin untuk reset password (simulasi).</p>`));
    const fReg = $('btnRegister'); if(fReg) fReg.addEventListener('click', ()=> showModal('Daftar', `<p>Untuk demo gunakan akun: <strong>${akunDemo.email}</strong> / <strong>${akunDemo.password}</strong></p>`));
  }

  /* ----------------- Dashboard greeting ----------------- */
  const greetEl = $('greetingText');
  if(greetEl){
    const h = new Date().getHours();
    let g = 'Halo';
    if(h>=4 && h<11) g='Selamat Pagi';
    else if(h>=11 && h<15) g='Selamat Siang';
    else if(h>=15 && h<18) g='Selamat Sore';
    else g='Selamat Malam';
    greetEl.textContent = `${g}! Selamat datang di Toko Buku Online.`;
  }

  /* ----------------- Render catalog (stok.html) ----------------- */
  const catalogGrid = $('catalogGrid');
  function renderCatalog(){
    if(!catalogGrid) return;
    catalogGrid.innerHTML = '';
    dataKatalogBuku.forEach(book => {
      const card = document.createElement('div'); card.className = 'card book';
      card.innerHTML = `
        <div class="cover"><img src="${book.cover}" alt="${book.judul}" onerror="this.src='img/buku1.png'"></div>
        <div>
          <h4>${book.judul}</h4>
          <div class="meta">${book.penulis}</div>
          <div class="foot">
            <div>
              <div class="badge">${rupiah(book.harga)}</div>
              <div class="text-muted" style="margin-top:6px">Stok: <strong id="stok-${book.id}">${book.stok}</strong></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <button class="btn" data-add="${book.id}">Tambah ke Keranjang</button>
            </div>
          </div>
        </div>
      `;
      catalogGrid.appendChild(card);
    });

    // attach add listeners
    qs('button[data-add]').forEach(b=>{
      b.addEventListener('click', e => {
        const id = e.currentTarget.getAttribute('data-add');
        addToCartById(id, 1);
        showModal('Keranjang', `<p>Berhasil menambahkan buku ke keranjang (simulasi). Buka halaman <a href="checkout.html">Pemesanan</a> untuk lanjut.</p>`);
      });
    });
  }

  /* ----------------- Add manual stock form ----------------- */
  const addStockForm = $('addStockForm');
  if(addStockForm){
    addStockForm.addEventListener('submit', e => {
      e.preventDefault();
      const id = $('newId').value.trim(); const judul = $('newJudul').value.trim();
      const penulis = $('newPenulis').value.trim(); const harga = parseInt($('newHarga').value,10);
      const stok = parseInt($('newStok').value,10); const cover = $('newCover').value.trim() || 'img/buku1.png';
      if(!id || !judul || !penulis || isNaN(harga) || isNaN(stok)){ alert('Lengkapi data dengan benar.'); return; }
      dataKatalogBuku.push({id, judul, penulis, harga, stok, cover});
      renderCatalog();
      addStockForm.reset();
      showModal('Sukses', '<p>Buku berhasil ditambahkan ke katalog.</p>');
    });
  }

  /* ----------------- Checkout & Cart ----------------- */
  let cart = [];
  function findBookById(id){ return dataKatalogBuku.find(b => b.id === id); }
  const bookList = $('bookList');
  const cartTableBody = document.querySelector('#cartTable tbody');
  const totalAmount = $('totalAmount');
  const btnCheckout = $('btnCheckout');

  // render simple choose list in checkout page
  if(bookList){
    bookList.innerHTML = '';
    dataKatalogBuku.forEach(b => {
      const row = document.createElement('div'); row.className='card'; row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='8px';
      row.innerHTML = `<div><div style="font-weight:700">${b.judul}</div><div class="text-muted">${b.penulis} — ${rupiah(b.harga)}</div></div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="number" min="1" value="1" style="width:68px;padding:6px;border-radius:8px;border:1px solid #e6e9ef" data-qty="${b.id}">
          <button class="btn" data-add="${b.id}">Tambah</button>
        </div>`;
      bookList.appendChild(row);
    });
    qs('button[data-add]').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.currentTarget.getAttribute('data-add');
        const inp = document.querySelector(`input[data-qty="${id}"]`);
        const qty = Math.max(1, parseInt(inp.value,10) || 1);
        addToCartById(id, qty);
      });
    });
  }

  function addToCartById(id, qty=1){
    const bk = findBookById(id); if(!bk){ showModal('Error','<p>Buku tidak ditemukan</p>'); return; }
    const ex = cart.find(i => i.id === id);
    if(ex) ex.qty += qty; else cart.push({id: bk.id, judul: bk.judul, harga: bk.harga, qty});
    renderCart();
  }

  function renderCart(){
    if(!cartTableBody) return;
    cartTableBody.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const sub = item.harga * item.qty; total += sub;
      const tr = document.createElement('tr'); tr.innerHTML = `<td>${item.judul}</td><td>${rupiah(item.harga)}</td><td><input type="number" min="1" value="${item.qty}" style="width:64px;padding:4px;border-radius:6px;border:1px solid #e6e9ef" data-qty="${item.id}"></td><td>${rupiah(sub)}</td><td><button class="btn secondary" data-remove="${item.id}">Hapus</button></td>`;
      cartTableBody.appendChild(tr);
    });
    if(totalAmount) totalAmount.innerText = rupiah(total);

    // attach qty and remove events
    qs('input[data-qty]').forEach(inp => {
      inp.addEventListener('change', e => {
        const id = e.target.getAttribute('data-qty'); const val = Math.max(1, parseInt(e.target.value,10) || 1);
        const it = cart.find(c => c.id === id); if(it) it.qty = val; renderCart();
      });
    });
    qs('button[data-remove]').forEach(b => { b.addEventListener('click', e => { cart = cart.filter(c => c.id !== e.currentTarget.getAttribute('data-remove')); renderCart(); }); });
  }

  if(btnCheckout){
    btnCheckout.addEventListener('click', ()=> {
      if(cart.length===0){ alert('Keranjang kosong. Tambahkan buku terlebih dahulu.'); return; }
      const wrap = $('checkoutFormWrap'); if(wrap) { wrap.style.display='block'; window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'}); }
    });
  }

  const checkoutForm = $('checkoutForm');
  if(checkoutForm){
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      const nama = $('pNama').value.trim(); const email = $('pEmail').value.trim(); const alamat = $('pAlamat').value.trim();
      const telp = $('pTelp').value.trim(); const metode = $('pPembayaran').value;
      if(!nama || !email || !alamat || !telp || !metode){ alert('Lengkapi data pemesan.'); return; }
      const total = cart.reduce((s,i)=>s + i.harga*i.qty, 0);
      const newOrder = { orderId: 'ORD' + (1000 + Math.floor(Math.random()*9000)), nama, alamat, nomorDO: 'DO-' + (2025000 + Math.floor(Math.random()*9000)), tanggalKirim: new Date().toISOString().slice(0,10), ekspedisi:'Kurir Demo', jenisPaket:'Reguler', total, status:'Diproses' };
      dataPesanan.push(newOrder);
      // reduce stok
      cart.forEach(ci => { const bk = findBookById(ci.id); if(bk) bk.stok = Math.max(0, bk.stok - ci.qty); });
      cart = []; renderCart(); checkoutForm.reset(); $('checkoutFormWrap').style.display='none'; showModal('Sukses', `<p>Pesanan berhasil dibuat. Nomor DO: <strong>${newOrder.nomorDO}</strong></p>`);
      renderCatalog();
    });
  }

  /* ----------------- Tracking ----------------- */
  const trackingForm = $('trackingForm');
  if(trackingForm){
    trackingForm.addEventListener('submit', e => {
      e.preventDefault();
      const doNum = $('inputDO').value.trim();
      if(!doNum){ alert('Masukkan nomor DO'); return; }
      const found = dataPesanan.find(p => p.nomorDO.toLowerCase() === doNum.toLowerCase());
      if(!found){ showModal('Tidak ditemukan', '<p>Nomor DO tidak ditemukan (simulasi).</p>'); return; }
      $('trkNama').innerText = found.nama; $('trkDO').innerText = found.nomorDO; $('trkEkspedisi').innerText = found.ekspedisi; $('trkJenis').innerText = found.jenisPaket; $('trkTgl').innerText = found.tanggalKirim; $('trkTotal').innerText = Number(found.total).toLocaleString('id-ID');
      $('trackingResult').style.display = 'block';
      const status = (found.status || 'Diproses').toLowerCase();
      let pct = 20, txt = 'Pesanan diproses';
      if(status.includes('diproses')) { pct = 20; txt='Pesanan diproses'; }
      if(status.includes('dikirim') || status.includes('dalam')) { pct = 60; txt='Dalam perjalanan'; }
      if(status.includes('tiba') || status.includes('selesai')) { pct = 100; txt='Tiba di tujuan'; }
      if(found.status === 'Dikirim') { pct = 70; txt='Sudah dikirim'; }
      $('trkProgress').style.width = pct + '%'; $('trkStatusText').innerText = txt + ' — status: ' + found.status;
    });
  }

  // initial renders
  renderCatalog(); renderCart();
})();


/**
         * 1. Render songs
         * 2. Scroll top
         * 3. Play / pause / seek
         * 4. CD rotate
         * 5. Next / prev
         * 6. Random
         * 7. Next / Repeat when ended
         * 8. Active song
         * 9. Scroll active song into view
         * 10. Play song when click
        */

 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);
 const heading = $('header h2')
 const cdThumb = $('.cd-thumb')
 const audio = $('#audio')
 
 const cd = $('.cd')
 const player = $('.player')

 const playBtn = $('.btn-toggle-play')

 const progress = $('.progress')

 const app = {
   currentIndex: 0,
   isPlaying: false,
   songs: [
     {
       name: 'Yên Vũ Hành Châu',
       singer: 'Tư Nam',
       path: './asset/music/YenVuHanhChau-TiNa-6063888.mp3',
       image: './asset/img/1567920376145_640.jpg'
     },
     {
       name: 'Trạm Khí Tượng',
       singer: 'Uu',
       path: './asset/music/TramKhiTuong-Uu-7005868.mp3',
       image: './asset/img/tai-bai-hat-moi-tram-khi-tuong-hay-online.png'
     }, 
     {
       name: 'Vịnh Alaska',
       singer: 'Lam Tâm Vũ',
       path: './asset/music/Vinh Alaska - Lam Tam Vu.mp3',
       image: './asset/img/artworks-e2bEqyNorwJH5J5T-hPnzHQ-t500x500.jpg'
     }, 
     {
       name: 'Hoa Vũ Rơi',
       singer: 'Nhậm Nhiên',
       path: './asset/music/Hoa-Vu-Roi-Nham-Nhien.mp3',
       image: './asset/img/1567751369983_600.jpg'
     }, 
     {
       name: 'Tham Song',
       singer: 'Phù Sinh Mộng',
       path: './asset/music/ThamSong-PhuSinhMong-7057215.mp3',
       image: './asset/img/maxresdefault.jpg'
     }, 
     {
       name: 'Người Kế Nhiệm',
       singer: 'Nhậm Nhiên',
       path: './asset/music/Nguoi-Ke-Nhiem-Nham-Nhien.mp3',
       image: './asset/img/109509.jpg'
     }, 
     {
       name: 'Đông Miên',
       singer: 'Tư Nam',
       path: './asset/music/Dong Mien - Tu Nam.mp3',
       image: './asset/img/artworks-000678290209-1kyd9m-t500x500.jpg'
     }, 
     {
       name: 'Sơn Ngoại Tiểu Lâu Dạ Thính Vũ',
       singer: 'Nhậm Nhiên',
       path: './asset/music/SonNgoaiTieuLauDaThinhVu-NhamNhien-5921143.mp3',
       image: './asset/img/1577951486931_640.jpg'
     },
     {
       name: 'Đợi Anh Bay Đến',
       singer: 'Tiểu Điền Âm Nhạc Xã',
       path: './asset/music/DoiAnhBayDen-TieuDienAmNhacXaMacTamMocMoSanMu-7074590.mp3',
       image: './asset/img/145329.jpg'
     },
     {
       name: 'Nhìn Thấu',
       singer: 'Nhậm Nhiên',
       path: './asset/music/Nhin-thau-Nham-Nhien.mp3',
       image: './asset/img/artworks-n4Cyk0PRCGgrFzEr-qIuRdA-t500x500.jpg'
     }
   ],
   render: function() {
     const htmls = this.songs.map((song, index) => {
       return `
           <div class="song ${index === this.currentIndex ? 'active' : '' }" data-index = ${index}>
             <div class="thumb" 
               style="background-image: url('${song.image}')">
             </div>
             <div class="body">
               <h3 class="title">${song.name}</h3>
               <p class="author">${song.singer}</p>
             </div>
             <div class="option">
               <i class="fas fa-ellipsis-h"></i>
             </div>
           </div>
       `
     })
     $('.playlist').innerHTML = htmls.join('')
   },
   defineProperties: function() {
     Object.defineProperty(this, "currentSong", {
       get: function() {
         return this.songs[this.currentIndex];
       }
     })
   },

   handleEvents: function() {
     const _this = this
     // "offsetWidth" ở ngoài "onscroll", để nó cố định width ban đầu
     const cdWidth = cd.offsetWidth

   // Khi kéo danh sách nhạc thì hình tròn chính nhỏ và mờ dần đi
     document.onscroll = function() {
       const scrollTop = window.scrollY || document.documentElement.scrollTop
       const newCdWidth = cdWidth - scrollTop;

       cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
       cd.style.opacity = newCdWidth / cdWidth;
     }

   // Xử lý khi click Play
    playBtn.onclick = () => {
      if(_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }

    // Khi song được play 
    audio.onplay = function () {
      _this.isPlaying = true
      player.classList.add('playing')
    }

    // Khi song bị pause 
    audio.onpause = function () {
      _this.isPlaying = false
      player.classList.remove('playing')
    }

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime /audio.duration * 100)
        progress.value = progressPercent
      }
    }

    //Xử lý khi tua song
    progress.onchange = function(e) {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
    }
   },
   loadCurrentSong: function() {
     heading.textContent = this.currentSong.name
     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
     audio.src = this.currentSong.path
   },

   start: function() {
     //Định nghĩa các thuộc tính cho object
     this.defineProperties()

     // Lắng nghe / xử lý các sự kiện (DOM events)
     this.handleEvents()

     //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
     this.loadCurrentSong()

     // Render playlist
     this.render()
   }
 } 

 app.start()
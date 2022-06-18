
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

 const app = {
   currentIndex: 0,
   songs: [
     {
       name: 'All Around The World',
       singer: 'R3hab',
       path: './asset/music/All-Around-The-World-La-La-La-R3hab-A-Touch-Of-Class.mp3',
       image: './asset/img/song1.jpg'
     },
     {
       name: 'Nevada',
       singer: 'Vicetone',
       path: './asset/music/Nevada-Monstercat-6983746.mp3',
       image: './asset/img/song2.jpg'
     }, 
     {
       name: 'Aurora',
       singer: 'K-391',
       path: './asset/music/Aurora-K391RRY-6820884.mp3',
       image: './asset/img/song3.jpg'
     }, 
     {
       name: 'On My Way',
       singer: 'Alan Walker',
       path: './asset/music/OnMyWay-AlanWalkerSabrinaCarpenterFarruko-5919403.mp3',
       image: './asset/img/song4.jpg'
     }, 
     {
       name: 'Cold Water',
       singer: 'Justin Bieber',
       path: './asset/music/song5.mp3',
       image: './asset/img/song5.jpg'
     }, 
     {
       name: 'In The Name Of Lover',
       singer: 'Martin Garrix & Bebe Rexha',
       path: './asset/music/song6.mp3',
       image: './asset/img/song6.jpeg'
     }, 
     {
       name: 'End Of Time',
       singer: 'Alan Walker',
       path: './asset/music/song7.mp3',
       image: './asset/img/song7.jpg'
     }, 
     {
       name: 'Scared To Be Lonely',
       singer: 'Martin Garrix & Dua Lipa',
       path: './asset/music/song8.mp3',
       image: './asset/img/song8.jpg'
     },
     {
       name: 'Play',
       singer: 'Alan Walker',
       path: './asset/music/song9.mp3',
       image: './asset/img/song9.jpg'
     },
     {
       name: 'Dusk Till Dawn',
       singer: 'ZayN & Sia',
       path: './asset/music/song10.mp3',
       image: './asset/img/song10.jpg'
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
        audio.play()
        player.classList.add('playing')
    }
   },
   loadCurrentSong: function() {
     heading.textContent = this.currentSong.name
     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
     audio.scr = this.currentSong.path
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
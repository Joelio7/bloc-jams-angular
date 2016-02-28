(function() {
   
    /**
    * @function SongPlayer
    * @desc service injected into the album controller to handle manage the songplayer logic
    * @params {object} song {array} SongPlayer
    */
    
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        /**
        @desc injecting the fixtures service into the SongPlayer service
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        SongPlayer.currentSong = null;
        
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
        };
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /** 
        * @desc function that decrements the current song object in the list of songs
        * @type {Object}
        */
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
            
            if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
        };
        
       /**
       * @function playSong
       * @desc plays currently playing song and sets the playing property of song to true
       * @param {Object} song
       */
        var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
       
        /**
        * @function SongPlayer
        * @desc sets logic to play song when user clicks the play button
        * @params {object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            
         } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                playSong(song); 
                 
             }
         }
     };
        /**
        * @function SongPlayer.pause
        * @desc sets logic to pause the song when user clicks the pause button
        * @params {object} song
        */
        SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
           song.playing = false;
       };
        
    
      return SongPlayer;
  }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
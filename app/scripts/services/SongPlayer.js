(function() {
   
    /**
    * @function SongPlayer
    * @desc service injected into the album controller to handle manage the songplayer logic
    * @params {object} song {array} SongPlayer
    */
    
    function SongPlayer() {
        var SongPlayer = {};
        var currentSong = null;
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
         
            
            currentSong = song;
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
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            
         } else if (currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 currentBuzzObject.play();
                 
                 
             }
         }
     };
        /**
        * @function SongPlayer.pause
        * @desc sets logic to pause the song when user clicks the pause button
        * @params {object} song
        */
        SongPlayer.pause = function(song) {
           currentBuzzObject.pause();
           song.playing = false;
       };
        
    
      return SongPlayer;
  }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
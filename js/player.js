var player;
var interval;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '-WiK4CZotDg',
        playerVars: {
            autoplay: 0,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: '-WiK4CZotDg',
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.setVolume(100);  // 초기 볼륨 설정
    initializeProgressBar();
    initializeVolumeControl();
}

function onPlayerStateChange(event) {
    updatePlayPauseButton();
}

function togglePlayPause() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    var playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.textContent = player.getPlayerState() === YT.PlayerState.PLAYING ? '||' : '▶️';
}

function initializeProgressBar() {
    var progressBar = document.getElementById('progressBar');
    progressBar.addEventListener('input', handleProgressBarInput);
    interval = setInterval(updateProgressBar, 100);
}

function updateProgressBar() {
    var currentTime = player.getCurrentTime();
    var duration = player.getDuration();
    if (duration > 0) {
        var value = (currentTime / duration) * 100;
        document.getElementById('progressBar').value = value;
    }
}

function handleProgressBarInput() {
    clearInterval(interval);  // 자동 업데이트 중지
    var time = player.getDuration() * (this.value / 100);
    player.seekTo(time, true);
    interval = setInterval(updateProgressBar, 1000);  // 재시작
}

function initializeVolumeControl() {
    var volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener('input', handleVolumeChange);
}

function handleVolumeChange() {
    player.setVolume(this.value);
}

// YouTube IFrame API 스크립트 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

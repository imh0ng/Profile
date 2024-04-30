var player;
var interval;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',  // 플레이어 숨김
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
    event.target.setVolume(100);  // 초기 볼륨 설정
    initializeProgressBar();
    initializeVolumeControl();
}

function onPlayerStateChange(event) {
    updatePlayPauseButton();
}

function togglePlayPause() {
    var state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function updatePlayPauseButton() {
    var playPauseBtn = document.getElementById('playPauseBtn');
    var state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        playPauseBtn.textContent = '||'; // 재생 중
    } else {
        playPauseBtn.textContent = '▶️'; // 정지 중
    }
}

function initializeProgressBar() {
    var progressBar = document.getElementById('progressBar');
    progressBar.addEventListener('input', function() {
        clearInterval(interval);  // 사용자가 슬라이더를 조작하는 동안 자동 업데이트 중지
        var time = player.getDuration() * (progressBar.value / 100);
        player.seekTo(time, true);  // 동영상을 즉시 해당 위치로 이동
    });
    progressBar.addEventListener('mouseup', function() {
        interval = setInterval(updateProgressBar, 1000);  // 사용자가 마우스를 떼면 업데이트 재개
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.playVideo();  // 만약 동영상이 재생 중이었다면 계속 재생
        }
    });
}

function updateProgressBar() {
    var progressBar = document.getElementById('progressBar');
    if (!progressBar.matches(':focus')) {  // 프로그레스바가 포커스를 받고 있지 않을 때만 업데이트
        var currentTime = player.getCurrentTime();
        var duration = player.getDuration();
        if (duration > 0) {
            var value = (currentTime / duration) * 100;
            progressBar.value = value;
        }
    }
}

function seekVideo() {
    var progressBar = document.getElementById('progressBar');
    var time = player.getDuration() * (progressBar.value / 100);
    player.seekTo(time, false);
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        clearInterval(interval); // 자동 업데이트 중지
        interval = setInterval(updateProgressBar, 1000);  // 재생이 시작되지 않았다면 바로 업데이트 재개
    }
}

function initializeVolumeControl() {
    var volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener('change', function() {
        player.setVolume(volumeControl.value);
    });
}

function setVolume(volume) {
    player.setVolume(volume);
}

// YouTube IFrame API 스크립트 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

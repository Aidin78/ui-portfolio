$(function () {
  var sourceM3U8 = "";
  var video = "";

  var videoItems = document.getElementsByClassName("niafam-player-stream");
  let urls = [];

  for (var i = 0; i < videoItems.length; i++) {
    $(videoItems[i]).attr("id", `v${i}`);
    var jsonFile = $(videoItems[i]).data("video");
    urls.push(jsonFile);
  }

  let requests = urls.map((url) => fetch(url));
  Promise.all(requests)
    // map array of responses into an array of response.json() to read their content
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    // all JSON answers are parsed: "users" is the array of them
    .then((video) =>
      video.forEach((vid, index) => {
        // console.log(">>", vid.source[0].src)
        sourceM3U8 = vid.source[0].src;
        loaddata(sourceM3U8, index);
      })
    );

  function loaddata(sourceM3U8, index) {
    console.log("#<<<>>>", sourceM3U8, index);
    const defaultOptions = {};

    videoTagId = $(videoItems[index]).attr("id");
    console.log("#>>>", `${videoTagId}`);
    video = document.querySelector("#" + videoTagId);
    sourceM3U8 = sourceM3U8;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
      });
      hls.loadSource(sourceM3U8);

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        videoTagId = $(videoItems[index]).attr("id");
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0); //prepend 0 to quality array
        defaultOptions.quality = {
          default: 0, //Default - AUTO
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          var span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");
          var menuitem = document.querySelector(".plyr__menu__container .plyr__control--forward:nth-child(2)  span.plyr__menu__value");
          if (hls.autoLevelEnabled) {
            span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
            menuitem.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `AUTO`;
          }
        });
        var player = new Plyr(`#${videoTagId}`, defaultOptions);
        console.log("player", player);
      });
      hls.attachMedia(video);
      window.hls = hls;
    } else {
      // default options with no quality update in case Hls is not supported
      const player = new Plyr(`#${videoTagId}`, defaultOptions);
    }

    function updateQuality(newQuality) {
      if (newQuality === 0) {
        window.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
      } else {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            console.log("Found quality match with " + newQuality);
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    }
  }
});

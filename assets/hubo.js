var settings = {
  "apps_in_row": 4,
  "apps": [
    {
      "name": "Emby",
      "link": "http://sv01:8096",
      "icon": "emby.png"
    },
    {
      "name": "Netflix",
      "link": "http://www.netflix.com/WiHome",
      "icon": "netflix.png"
    },
    {
      "name": "Stan",
      "link": "https://www.stan.com.au/",
      "icon": "stan.png"
    },
    {
      "name": "YouTube",
      "link": "https://www.youtube.com/",
      "icon": "youtube.png"
    }
  ]
}

function AddApps() {
  let col_width = 12 / settings.apps_in_row;
  let html = "";
  let count = 1;
  for (let app of settings.apps) {
    html += `
    <div class="col-${col_width} app">
      <a class="btn btn-app" href="${app.link}" id="${count}" tabindex="${count}">
        <img src="assets/icons/${app.icon}">
        <div class="mt-2">
        ${app.name}
        </div>
      </a>
    </div>`;
    count++;
  }
  $('.div-app-row').html(html);
}

function wrap(val, min, max) {
  if (val > max)
    return wrap(val - max, min, max);
  if (val < min)
    return wrap(val + max, min, max);
  return val;
}

$(document).ready(function () {
  AddApps();
});

$(document).keydown(function (e) {
  var focus = $(':focus');
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    if (focus.hasClass('btn-app')) {
      var curId = parseInt(focus.attr('id'));
      var nextId = 0;
      //left
      if (e.keyCode == 37) {
        nextId = wrap(curId - 1, 1, settings.apps.length);
      }
      //right
      else if (e.keyCode == 39) {
        nextId = wrap(curId + 1, 1, settings.apps.length);
      }
      //up
      else if (e.keyCode == 38) {
        nextId = wrap(curId - settings.apps_in_row, 
          1, Math.ceil(settings.apps.length / settings.apps_in_row) * settings.apps_in_row);
      }
      //down
      else if (e.keyCode == 40) {
        nextId = wrap(curId + settings.apps_in_row, 
          1, Math.ceil(settings.apps.length / settings.apps_in_row) * settings.apps_in_row);
      }
      $('#' + nextId.toString()).focus();
    } else {
      $('#1').focus();
    }
  }
  //show shortcuts
  else if (e.keyCode == 83) {
    let args = `${window.location.href} --start-fullscreen`
    let html = '<h3 class="modal-title">Shortcuts</h3><hr>';
    html += `<h5>Edge</h5>"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" ${args}<br>`;

    $('#div-shortcuts').html(html);
    $('#modal-shortcuts').modal('show');
    console.log("show modal");
  }
});

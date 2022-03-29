function addApps() {
  let count = 1;
  let html = "";
  for (let app of settings.apps) {
    html += `
      <a class="app" href="${app.link}" id="${count}" tabindex="${count}">
        <img src="assets/icons/${app.icon}">
        <div class="app-name">${app.name}</div>
      </a>`;
    count++;
  }
  $('#div-app-grid').html(html);
}

function wrap(val, min, max) {
  if (val > max)
    return wrap(val - max, min, max);
  if (val < min)
    return wrap(val + max, min, max);
  return val;
}

$(document).ready(function () {
  addApps();
  let root = document.documentElement;
  root.style.setProperty('--app-cols', settings.appsInRow);
});

$(document).keydown(function (e) {
  var focus = $(':focus');
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    if (focus.hasClass('app')) {
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
});

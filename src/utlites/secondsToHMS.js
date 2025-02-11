export default secondsToHms = time => {
    d = Number(time);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ':' : ':') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ':' : ':') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? '' : '') : '';
    return hDisplay + mDisplay + sDisplay;
  };
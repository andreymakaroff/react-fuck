//helper functions
let prettyDate =  {
  rando : function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  getTime : function() {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d = new Date();
    var hours = d.getHours();
    var minutes = addZero(d.getMinutes());
    var mon = month[d.getMonth()];
    var day = d.getDate();
    var year = d.getFullYear();
    var dateAll = hours +':'+ minutes + ' ' + mon + " " + day + ", " + year;

    return dateAll;
  },
  getTaggedName : function() {
    var adjectives = ['trusted', 'secure', 'hot', 'new', 'interesting', 'best practice', 'exciting'];

    var nouns = ['es6', 'browserify', 'webpack', 'gulp', 'reactDOM', 'devTools'];

    return this.rando(adjectives) + ' ' + this.rando(nouns);
  }
}
export default prettyDate;
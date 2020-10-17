const lineChart = require('../../line-chart');

module.exports = {
    getPrettyNumber: function (number) {
        if (number === null) {
            return "no data is available"
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getUpDown: function (number) {
        let str = "";
        if (number) {
            if (number > 0) {
                str = `<i class="fa fw fa-caret-up increase"></i>`
            }
            else {
                str = `<i class="fa fw fa-caret-down decrease"></i>`
            }
        }
        return str;
    },
    getPlusMinus: function (number) {
        let str = "";
        if (number) {
            if (number > 0) {
                str = `<i class="fa fw fa-plus decrease"></i>`
            }
            else {
                str = `<i class="fa fw fa-minus increase"></i>`
            }
        }
        return str;
    },
    graphics: function () {
        let str = lineChart.createSVG();
        return str;
    },
    getTwitter: function (str) {
        let twitterLink = "";
        if (str.startsWith('@')) {
            twitterLink = `<li><a class="covid19-links"
            href=https://twitter.com/${str.slice(1)}>
            <i class="fa fw fa-twitter" aria-label="go to twitter"></i></a></li>`
        }
        return twitterLink;
    }
}
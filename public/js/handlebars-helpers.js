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
    createUniqueId: function (name, number) {
        let str = `${name}${number}`;
        return str;
    },
}
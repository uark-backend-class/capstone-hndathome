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
    graphics: function (series, yValue) {
        let str = lineChart.createSVG(series, yValue);
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
    },
    section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    leafletjs: function (locations) {
        let jsString = locations.reduce((accumulator, location) => {
            return `${accumulator} 
            var map${location.zip_code} = L.map('map${location.zip_code}').setView([${location.latitude}, ${location.longitude}], 9);

        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map${location.zip_code});
        `
        }, '')

        let jqueryString = locations.reduce((accumulator, location) => {
            return `${accumulator}
            $('#myCarousel${location.zip_code}').on('slid.bs.carousel', function () {
                var activeIndex = $(this).find('.active').index();           
                if(activeIndex === 1)
                {
                    map${location.zip_code}.invalidateSize();
                }            
              });
            `
        }, '')
        return `<script type="application/javascript">
        ${jsString} 
        ${jqueryString}
    </script>`
    }
}
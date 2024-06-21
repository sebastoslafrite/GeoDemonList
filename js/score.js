/**
 * Numbers of decimal digits to round to
 */
const scale = 2;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula
   let score = (149.61*Math.pow(1.168, (1-rank))+100.39);
     if (rank > 20) {
        score = (166.611*Math.pow(1.0099685, (2-rank))-31.152);
    } 
    if (rank > 35) {
        score = (212.61*Math.pow(1.036, (1-rank))+25.071);
    }
    if (rank > 55) {
        score = (56.191*Math.pow(2, ((54.147-(rank+3.2))*((Math.log(50)/(99)))))+6.273);
     }
    
    //Formula from the template
    //let score = (-24.9975*Math.pow(rank-1, 0.4) + 200) *
       // ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    
    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}

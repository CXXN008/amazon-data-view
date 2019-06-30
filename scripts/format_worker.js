onmessage = e => {
    let items = e.data
    let result = []
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        let checkTemplate = ''
        let itemElem = '';
        ['best', 'achoice', 'aplus', 'video', 'image', 'pvideo'].forEach(e => {
            let hStr = `
              <div class="pretty p-svg p-curve p-locked p-check">
                    <input class="card-`+ e + `" type="checkbox" ` + (element[e] > 0 ? 'checked' : '') + ` />
                    <div class="state p-success">
                        <svg class="svg svg-icon" viewBox="0 0 20 20">
                            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                        </svg>
                        <label>`+ e + `</label>
                    </div>
                </div>
              `
            checkTemplate += hStr
        });


        let itemTemplate = '' +
            '<div class="item">' +
            '<div class="item-content">' +
            '<div class="card">' +
            '<div class="card-extra">' +
            '<div class="card-id">' + (i + 1) + '</div>' +
            '<div class="card-asin">' + element.asin + '</div>' +
            '</div>' +
            '<hr/>' +
            '<img class="card-img" src="' + 'https://images-na.ssl-images-amazon.com/images' + element.imglink + '"></img>' +
            '<hr/>' +
            '<div class="card-title">' + element.name + '</div>' +
            '<div class="card-extra">' +
            '<div class="card-rating">' +
            '<span>评分:' + element.star + '</span>' +
            '<p class="starability-result" data-rating="' + Math.floor(element.star) + '"></p>' +
            '</div>' +
            '<div class="card-price">$' + element.price + '</div>' +
            '</div>' +
            '<div class="card-check">' +
            checkTemplate +
            '</div>' +
            '<div class="card-extra">' +
            '<div class="card-bot card-date">上市: ' + getLocalTime(element.date_first_on).split(' ')[0] + '</div>' +
            '<div class="card-bot card-comment">评价: ' + element.ask + '</div>' +
            '<div class="card-bot card-ask">问答: ' + element.reviews + '</div>' +
            '</div>' +
            '<div class="card-remove"><i class="material-icons">&#xE5CD;</i></div>' +
            '</div>' +
            '</div>' +
            '</div>';

        itemElem = itemTemplate;

        result.push(itemElem)

    }


    postMessage(result);
}

function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

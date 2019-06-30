document.addEventListener('DOMContentLoaded', function () {

  //
  // Initialize stuff
  //

  //date picker
  sPicker = flatpickr(".s-date-field", {
    "locale": "zh",
    mode: "range"
  });



  //get element
  let grid = null;
  let docElem = document.documentElement;
  let demo = document.querySelector('.grid-main');
  let gridElement = demo.querySelector('.grid');


  // let filterField = demo.querySelector('.filter-field');
  let searchField = demo.querySelector('.asin-field');



  let andField = demo.querySelector('.and-field');
  let orField = demo.querySelector('.or-field');
  let notField = demo.querySelector('.not-field');
  let minRateField = demo.querySelector('.min-rate-field');
  let maxRateField = demo.querySelector('.max-rate-field');
  let minPriceField = demo.querySelector('.min-price-field');
  let maxPriceField = demo.querySelector('.max-price-field');
  let minCommentsField = demo.querySelector('.min-comments-field');
  let maxCommentsField = demo.querySelector('.max-comments-field');
  let minAsksField = demo.querySelector('.min-asks-field');
  let maxAsksField = demo.querySelector('.max-asks-field');

  let sDateField = demo.querySelector('.s-date-field');
  let topField = demo.querySelector
  ('.top-field');


  let btnClear = document.getElementById('btn-clear');
  let btnSubmit = document.getElementById('btn-submit');
  let btnAnalyze = document.getElementById('btn-analyze');


  btnAnalyze.addEventListener('click',()=>{
    let asinList =[]
    grid.getItems().forEach(e => {
      asinList.push(e.getElement().querySelector('.card-asin').innerText)
    })
    window.localStorage.setItem('asinList',asinList)
    console.log(window.localStorage.getItem('asinList'));
    window.open('analysis.html','_blank')
  })


  // let bestField = demo.querySelector('.best-field');
  // let achoiceField = demo.querySelector('.achoice-field');
  // let aplusField = demo.querySelector('.aplus-field');
  // let videoField = demo.querySelector('.video-field');
  // let imageField = demo.querySelector('.image-field');
  // let pvideoField = demo.querySelector('.pvideo-field');


  // let sortField = demo.querySelector('.sort-field');
  // let layoutField = demo.querySelector('.layout-field');
  // let addItemsElement = demo.querySelector('.add-more-items');

  // let characters = 'abcdefghijklmnopqrstuvwxyz';
  // let filterOptions = ['是', '否', '不限'];
  let dragOrder = [];
  // let uuid = 0;
  // let filterFieldValue;
  let sortFieldValue;
  // let layoutFieldValue;
  // let searchFieldValue;

  //
  // Grid helper functions
  //

  function initDemo() {

    initGrid();

    // Reset field values.
    searchField.value = 'B01C89GCHU';
    // [bestField, achoiceField, aplusField, videoField, imageField, pvideoField].forEach(function (field) {
    //   field.value = field.querySelectorAll('option')[0].value;
    // });

    // Set inital search query, active filter, active sort value and active layout.
    let vAnd = andField.value.toLowerCase()
    let vOr = orField.value.toLowerCase()
    let vNot = notField.value.toLowerCase()
    let vMinComment = minCommentsField.value
    let vMaxComment = maxCommentsField.value
    let vMinRate = minRateField.value
    let vMaxRate = maxRateField.value
    let vMinPrice = minPriceField.value
    let vMaxPrice = maxPriceField.value
    let vMinAsks = minAsksField.value
    let vMaxAsks = maxAsksField.value
    let vSDate = getMillTime(sPicker.selectedDates[0])
    let vEDate = getMillTime(sPicker.selectedDates[1])
    let vTop = topField.value


    // filterFieldValue = filterField.value;
    // sortFieldValue = sortField.value;
    // layoutFieldValue = layoutField.value;

    // Search field binding.
    andField.addEventListener('keyup', function () {
      let newAnd = andField.value.toLowerCase();
      if (vAnd !== newAnd) {
        vAnd = newAnd;
        filter();
      }
    });
    orField.addEventListener('keyup', function () {
      let newOr = orField.value.toLowerCase();
      if (vOr !== newOr) {
        vOr = newOr;
        filter();
      }
    });
    notField.addEventListener('keyup', function () {
      let newNot = notField.value.toLowerCase();
      if (vNot !== newNot) {
        vNot = newNot;
        filter();
      }
    });
    minRateField.addEventListener('keyup', function () {
      let newMinRate = minRateField.value;
      if (vMinRate !== newMinRate) {
        vMinRate = newMinRate;
        filter();
      }
    });
    maxRateField.addEventListener('keyup', function () {
      let newMaxRate = maxRateField.value;
      if (vMaxRate !== newMaxRate) {
        vMaxRate = newMaxRate;
        filter();
      }
    });
    minCommentsField.addEventListener('keyup', function () {
      let newMinC = minCommentsField.value;
      if (vMinComment !== newMinC) {
        vMinComment = newMinC;
        filter();
      }
    });


    maxCommentsField.addEventListener('keyup', function () {
      let newMaxC = maxCommentsField.value;
      if (vMaxComment !== newMaxC) {
        vMaxComment = newMaxC;
        filter();
      }
    });
    minPriceField.addEventListener('keyup', function () {
      let newMinPrice = minPriceField.value;
      if (vMinPrice !== newMinPrice) {
        vMinPrice = newMinPrice;
        filter();
      }
    });
    maxPriceField.addEventListener('keyup', function () {
      let newMaxPrice = maxPriceField.value;
      if (vMaxPrice !== newMaxPrice) {
        vMaxPrice = newMaxPrice;
        filter();
      }
    });
    minAsksField.addEventListener('keyup', function () {
      let newMinAsks = minAsksField.value;
      if (vMinAsks !== newMinAsks) {
        vMinAsks = newMinAsks;
        filter();
      }
    });
    maxAsksField.addEventListener('keyup', function () {
      let newMaxAsks = maxAsksField.value;
      if (vMaxAsks !== newMaxAsks) {
        vMaxAsks = newMaxAsks;
        filter();
      }
    });

    //top先不管
    sDateField.addEventListener('change', filter);

    // bestField.addEventListener('change', filter);
    // achoiceField.addEventListener('change', filter);
    // aplusField.addEventListener('change', filter);
    // videoField.addEventListener('change', filter);
    // imageField.addEventListener('change', filter);
    // pvideoField.addEventListener('change', filter);




    // [andField,orField,notField].forEach(e => {
    //   e.addEventListener('keyup', function () {
    //     let newAnd = e.value.toLowerCase();

    //     if (searchFieldValue !== newSearch) {
    //       searchFieldValue = newSearch;
    //       filter();
    //     }
    //   });
    // });




    // Filter, sort and layout bindings.
    // bestField.addEventListener('change', filter);
    // achoiceField.addEventListener('change', sort);
    // aplusField.addEventListener('change', changeLayout);
    // videoField.addEventListener('change', changeLayout);
    // imageField.addEventListener('change', changeLayout);
    // pvideoField.addEventListener('change', changeLayout);

    // Add/remove items bindings.
    // addItemsElement.addEventListener('click', addItems);
    gridElement.addEventListener('click', function (e) {
      if (elementMatches(e.target, '.card-remove, .card-remove i')) {
        removeItem(e);
      }
    });

  }





  function initGrid() {


    var dragCounter = 0

    grid = new Muuri(gridElement, {
      items: '*',
      layoutDuration: 400,
      layoutEasing: 'ease',
      dragEnabled: true,
      dragSortInterval: 50,
      dragContainer: document.body,
      dragStartPredicate: function (item, event) {
        var isDraggable = sortFieldValue === 'order';
        var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
        return isDraggable && !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
      },
      dragReleaseDuration: 400,
      dragReleseEasing: 'ease'
    })
      .on('dragStart', function () {
        ++dragCounter;
        docElem.classList.add('dragging');
      })
      .on('dragEnd', function () {
        if (--dragCounter < 1) {
          docElem.classList.remove('dragging');
        }
      })
      .on('move', updateIndices)
      .on('sort', updateIndices);

    // let data = {
    //   "asin": searchField.value,
    //   "and_keyword": andField.value.split(' '),
    //   "or_keyword": orField.value.split(' '),
    //   "not_keyword": notField.value.split(' '),
    //   "star": { "s": minRateField.value, "e": maxRateField.value },
    //   "price": { "s": minPriceField.value, "e": maxPriceField.value },
    //   "reviews": { "s": minCommentsField.value, "e": maxCommentsField.value },
    //   "ask": { "s": minAsksField.value, "e": maxAsksField.value },
    //   "date": { "s": isNaN(getMillTime(sPicker.selectedDates[0])) ? '' : getMillTime(sPicker.selectedDates[0]), "e": isNaN(getMillTime(sPicker.selectedDates[0])) ? '' : getMillTime(sPicker.selectedDates[1]) },
    //   "best": bestField.selectedOptions[0].value,
    //   "achoice": achoiceField.selectedOptions[0].value,
    //   "image": imageField.selectedOptions[0].value,
    //   "aplus": aplusField.selectedOptions[0].value,
    //   "video": videoField.selectedOptions[0].value,
    //   "pvideo": pvideoField.selectedOptions[0].value,
    //   "top": topField.value
    // }

    // https://images-na.ssl-images-amazon.com/images
    let url =
      // 'http://116.7.52.135:8889/api/v1.0/plist/filter/analysis/'
      'http://127.0.0.1:5000/api/v1.0/plist/filter/'
      + (searchField.value == '' ? 'B01C89GCHU' : searchField.value)
    fetch(url, {
      method: 'POST',
      // body: JSON.stringify(data),
    })
      .then(r => {
        return r.json()
      })
      .then(d => {
        if (window.Worker) {
          const fWorker = new Worker("scripts/format_worker.js");
          fWorker.postMessage(d.list);
          fWorker.onmessage = e => {
            let items = []
            e.data.forEach(element => {
              let item = document.createElement('div')
              item.innerHTML = element
              items.push(item.firstChild)
            });
            grid.add(items
              // .slice(0,30)
              )
          }
        } else {
          console.log("Browser doesn't support web workers.")
          grid.add(formatElements(d.list))
        }

      })
      .catch(error => console.error(error))
  }

  function filter() {

    // filterFieldValue = filterField.value;
    let vAnd = andField.value.toLowerCase()
    let vOr = orField.value.toLowerCase()
    let vNot = notField.value.toLowerCase()
    let vMinRate = minRateField.value
    let vMaxRate = maxRateField.value
    let vMinComment = minCommentsField.value
    let vMaxComment = maxCommentsField.value
    let vMinPrice = minPriceField.value
    let vMaxPrice = maxPriceField.value
    let vMinAsks = minAsksField.value
    let vMaxAsks = maxAsksField.value
    let vSDate = getMillTime(sPicker.selectedDates[0])
    let vEDate = getMillTime(sPicker.selectedDates[1])
    let vTop = topField.value

    // let vBest = bestField.selectedOptions[0].value
    // let vAchoice = achoiceField.selectedOptions[0].value
    // let vAplus = aplusField.selectedOptions[0].value
    // let vVideo = videoField.selectedOptions[0].value
    // let vImage = imageField.selectedOptions[0].value
    // let vPvideo = pvideoField.selectedOptions[0].value


    grid.filter(function (item) {
      let element = item.getElement()
      let text = element.querySelector('.card-title').innerText
      let date = getMillTime(element.querySelector('.card-date').innerText.replace('上市: ', ''))
      let rating = element.querySelector('.card-rating').innerText.replace('评分:', '')
      let comment = element.querySelector('.card-comment').innerText.replace('评价: ', '')
      let ask = element.querySelector('.card-ask').innerText.replace('问答: ', '')
      let price = element.querySelector('.card-price').innerText.replace('$', '')
      // let best = element.querySelector('.card-best').checked ? 1 : 0
      // let achoice = element.querySelector('.card-achoice').checked ? 1 : 0
      // let aplus = element.querySelector('.card-aplus').checked ? 1 : 0
      // let video = element.querySelector('.card-video').checked ? 1 : 0
      // let image = element.querySelector('.card-image').checked ? 1 : 0
      // let pvideo = element.querySelector('.card-pvideo').checked ? 1 : 0



      let isAndMatch = !vAnd ? true : (text || '').toLowerCase().indexOf(vAnd) > -1
      let isOrMatch = !vOr ? false : (text || '').toLowerCase().indexOf(vOr) > -1
      let isNotMatch = !vNot ? false : (text || '').toLowerCase().indexOf(vNot) > -1
      let isDateMatch = isNaN(vSDate) && isNaN(vEDate) ? true : date > vSDate && date < vEDate
      let isRateMatch = !vMinRate && !vMaxRate ? true : rating > vMinRate && rating < vMaxRate
      let isCommentMatch = !vMinComment && !vMaxComment ? true : comment > vMinComment && comment < vMaxComment
      let isPriceMatch = !vMinPrice && !vMaxPrice ? true : price > vMinPrice && price < vMaxPrice
      let isAskMatch = !vMinAsks && !vMaxAsks ? true : ask > vMinAsks && ask < vMaxAsks
      // let isBestMatch = !vBest || vBest == -1 ? true : best == vBest
      // let isAchoiceMatch = !vAchoice || vAchoice == -1 ? true : achoice == vAchoice
      // let isAplusMatch = !vAplus || vAplus == -1 ? true : aplus == vAplus
      // let isVdieoMatch = !vVideo || vVideo == -1 ? true : video == vVideo
      // let isImageMatch = !vImage || vImage == -1 ? true : image == vImage
      // let isPvideoMatch = !vPvideo || vPvideo == -1 ? true : pvideo == vPvideo


      return ((isAndMatch || isOrMatch) && !isNotMatch) &&
        isDateMatch &&
        isRateMatch &&
        isCommentMatch &&
        isPriceMatch &&
        isAskMatch 
        // &&
        // isBestMatch &&
        // isAchoiceMatch &&
        // isAplusMatch &&
        // isVdieoMatch &&
        // isImageMatch &&
        // isPvideoMatch

      // && isFilterMatch;
    });

  }

  // function sort() {

  //   // Do nothing if sort value did not change.
  //   var currentSort = sortField.value;
  //   if (sortFieldValue === currentSort) {
  //     return;
  //   }

  //   // If we are changing from "order" sorting to something else
  //   // let's store the drag order.
  //   if (sortFieldValue === 'order') {
  //     dragOrder = grid.getItems();
  //   }

  //   // Sort the items.
  //   grid.sort(
  //     currentSort === 'title' ? compareItemTitle :
  //       currentSort === 'color' ? compareItemColor :
  //         dragOrder
  //   );

  //   // Update indices and active sort value.
  //   updateIndices();
  //   sortFieldValue = currentSort;

  // }

  // function addItems() {

  //   // Generate new elements.
  //   var newElems = generateElements(5);

  //   // Set the display of the new elements to "none" so it will be hidden by
  //   // default.
  //   newElems.forEach(function (item) {
  //     item.style.display = 'none';
  //   });

  //   // Add the elements to the grid.
  //   var newItems = grid.add(newElems);

  //   // Update UI indices.
  //   updateIndices();

  //   // Sort the items only if the drag sorting is not active.
  //   if (sortFieldValue !== 'order') {
  //     grid.sort(sortFieldValue === 'title' ? compareItemTitle : compareItemColor);
  //     dragOrder = dragOrder.concat(newItems);
  //   }

  //   // Finally filter the items.
  //   filter();

  // }

  function removeItem(e) {

    var elem = elementClosest(e.target, '.item');
    grid.hide(elem, {
      onFinish: function (items) {
        var item = items[0];
        grid.remove(item, { removeElements: true });
        if (sortFieldValue !== 'order') {
          var itemIndex = dragOrder.indexOf(item);
          if (itemIndex > -1) {
            dragOrder.splice(itemIndex, 1);
          }
        }
      }
    });
    updateIndices();

  }

  // function changeLayout() {

  //   layoutFieldValue = layoutField.value;
  //   grid._settings.layout = {
  //     horizontal: false,
  //     alignRight: layoutFieldValue.indexOf('right') > -1,
  //     alignBottom: layoutFieldValue.indexOf('bottom') > -1,
  //     fillGaps: layoutFieldValue.indexOf('fillgaps') > -1
  //   };
  //   grid.layout();

  // }

  //
  // Generic helper functions
  //

  function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }

  function getMillTime(d) {
    return Date.parse(d);
  }

  function formatElements(items) {
    let result = []
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      let checkTemplate = ''
      let itemElem = document.createElement('div');
      // ['best', 'achoice', 'aplus', 'video', 'image', 'pvideo'].forEach(e => {
      //   let hStr = `
      //     <div class="pretty p-svg p-curve p-locked p-check">
      //           <input class="card-`+ e + `" type="checkbox" ` + (element[e] > 0 ? 'checked' : '') + ` />
      //           <div class="state p-success">
      //               <svg class="svg svg-icon" viewBox="0 0 20 20">
      //                   <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
      //               </svg>
      //               <label>`+ e + `</label>
      //           </div>
      //       </div>
      //     `
      //   checkTemplate += hStr
      // });


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
        // '<div class="card-check">' +
        // checkTemplate +
        // '</div>' +
        '<div class="card-extra">' +
        '<div class="card-bot card-date">上市: ' + getLocalTime(element.date_first_on).split(' ')[0] + '</div>' +
        '<div class="card-bot card-comment">评价: ' + element.reviews + '</div>' +
        '<div class="card-bot card-ask">问答: ' + element.ask + '</div>' +
        '</div>' +
        '<div class="card-remove"><i class="material-icons">&#xE5CD;</i></div>' +
        '</div>' +
        '</div>' +
        '</div>';

      itemElem.innerHTML = itemTemplate;
      // https://images-na.ssl-images-amazon.com/images
      result.push(itemElem.firstChild)
    }


    return result;

  }

  // function getRandomItem(collection) {

  //   return collection[Math.floor(Math.random() * collection.length)];

  // }

  // function generateRandomWord(length) {

  //   var ret = '';
  //   for (var i = 0; i < length; i++) {
  //     ret += getRandomItem(characters);
  //   }
  //   return ret;

  // }

  // function compareItemTitle(a, b) {

  //   var aVal = a.getElement().getAttribute('data-title') || '';
  //   var bVal = b.getElement().getAttribute('data-title') || '';
  //   return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;

  // }

  // function compareItemColor(a, b) {

  //   var aVal = a.getElement().getAttribute('data-color') || '';
  //   var bVal = b.getElement().getAttribute('data-color') || '';
  //   return aVal < bVal ? -1 : aVal > bVal ? 1 : compareItemTitle(a, b);

  // }

  function updateIndices() {

    grid.getItems().forEach(function (item, i) {
      item.getElement().setAttribute('data-id', i + 1);
      item.getElement().querySelector('.card-id').innerHTML = i + 1;
    });

  }

  function elementMatches(element, selector) {

    var p = Element.prototype;
    return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);

  }

  function elementClosest(element, selector) {

    if (window.Element && !Element.prototype.closest) {
      var isMatch = elementMatches(element, selector);
      while (!isMatch && element && element !== document) {
        element = element.parentNode;
        isMatch = element && element !== document && elementMatches(element, selector);
      }
      return element && element !== document ? element : null;
    }
    else {
      return element.closest(selector);
    }

  }

  //
  // Actually start
  //

  initDemo();

});
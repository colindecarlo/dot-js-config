(function () {
"use strict";

var pullsTemplate = '<li>' +
    '<div class="select-menu js-menu-container js-select-ment">' +
      '<span class="social-count js-social-count"></span>' +
      '<span class="minibutton select-menu-button with-count js-menu-target">' +
        '<span class="js-select-button">' +
          '<span class="octicon octicon-git-pull-request"></span>' +
          'Pulls' +
        '</span>' +
      '</span>' +
      '<div class="select-menu-modal-holder">' +
        '<div class="select-menu-modal js-menu-content">' +
          '<div class="select-menu-header">' +
            '<span class="select-menu-title">Open pull requests</span>' +
            '<span class="octicon octicon-remove-close js-menu-close"></span>' +
          '</div>' +
          '<div class="select-menu-list js-navigation-container">' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</li>';

var selectItemTemplate = '<div class="select-menu-item js-navigation-item">' +
    '<div class="select-menu-item-text">' +
      '<h4></h4>' +
      '<span class="description"></span>' +
    '</div>' +
  '</div>';

var pullsLi = $(pullsTemplate);

var openFreshappPullsXhr = $.get('/api/v3/repos/dev/freshapp/pulls')
 .done(function (data, textStatus, jqXhr) {
    $('span.social-count', pullsLi).text(data.length);

    var addItem = function (index, element) {
      var item = $(selectItemTemplate).clone();
      var pullDescription = element.body;
      if (pullDescription.length > 147) {
        pullDescription = pullDescription.substring(0, 147) + '...';
      }
      $('h4', item).text(element.title);
      $('span.description', item).text(pullDescription);

      item.click(function () {
        $('span.js-menu-close').click();
        window.open(element.html_url);
      });

      $('div.select-menu-list', pullsLi).append(item);

    };

    $.each(data, addItem);

    pullsLi.prependTo($('ul.pagehead-actions'));
 });
})();

// [NEW] added second div with class item-options-left for the left buttons
var ITEM_TPL_OPTION_BUTTONS =
  '<div class="item-options">' +
  '</div>' + '<div class="item-options-left">' +
  '</div>';
/**
* @ngdoc directive
* @name ionOptionButton
* @parent ionic.directive:ionItem
* @module ionic
* @restrict E
* @description
* Creates an option button inside a list item, that is visible when the item is swiped
* to the left by the user.  Swiped open option buttons can be hidden with
* {@link ionic.service:$ionicListDelegate#closeOptionButtons $ionicListDelegate#closeOptionButtons}.
*
* Can be assigned any button class.
*
* See {@link ionic.directive:ionList} for a complete example & explanation.
*
* @usage
*
* ```html
* <ion-list>
*   <ion-item>
*     I love kittens!
*     <ion-option-button class="button-positive">Share</ion-option-button>
*     <ion-option-button class="button-assertive">Edit</ion-option-button>
*   </ion-item>
* </ion-list>
* ```
*/
IonicModule.directive('ionOptionButton', [function() {
  function stopPropagation(e) {
    e.stopPropagation();
  }
  return {
    restrict: 'E',
    require: '^ionItem',
    priority: Number.MAX_VALUE,
    compile: function($element, $attr) {
      $attr.$set('class', ($attr['class'] || '') + ' button', true);
      return function($scope, $element, $attr, itemCtrl) {
        if (!itemCtrl.optionsContainer) {
          itemCtrl.optionsContainer = jqLite(ITEM_TPL_OPTION_BUTTONS);
          itemCtrl.$element.append(itemCtrl.optionsContainer);
        }

        //[NEW] if it as an attribute side = 'left' put the button in the left container
        if ($attr.side === 'left') {
          angular.element(itemCtrl.optionsContainer[1]).append($element);
          itemCtrl.$element.addClass('item-left-editable');
        } else{
          angular.element(itemCtrl.optionsContainer[0]).append($element);
          itemCtrl.$element.addClass('item-right-editable');
        }

        //Don't bubble click up to main .item
        $element.on('click', stopPropagation);
      };
    }
  };
}]);

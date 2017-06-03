(function() {
  'use strict'

  angular.module('secret', [])
    .component('secret', {
      templateUrl: '/spa/templates/secret.template.html',
      controller: controller
    })

  controller.$inject = ['SecretService']

  function controller(SecretService) {
    let vm = this
    vm.$onInit = onInit
    vm.$all = $all
    vm.$newSecret = $newSecret
    vm.$hush = $hush
    vm.$change = $change
    vm.$toggle = $toggle
    vm.secret = []

    function onInit() { // LOAD ALL CLASSIFIED INFO AS SOON AS THE PAGE LOADS
      return $all()
    }

    function $all() { // GET ALL CLASSIFIED OBJECTS
      SecretService.$all()
        .then((all) => {
          vm.secrets = all
        })
    }

    function $newSecret() { // CREATE NEW CLASSIFIED OBJECT
      SecretService.newSecret(vm.newSecret)
      delete vm.newSecret
    }



    function $hush(id) { // BURN YOUR CLASSIFIED OBJECTS AND LEAVE NO TRACES BENHIND
      SecretService.$hush(id.id)
    }

    function $toggle(secret, $index) { //  CLASSIFIED INFO FORM DROP DOWN FORM FIELD
      vm.secret[$index] = !vm.secret[$index] // TOGGLES THE EDIT FORM ON A SPECIFIC PIECE OF INFO

      vm.changing = angular.copy(secret) // GRABS CURRENT CLASSIFIED INFO AND FILLS OUT FORM FIELDS WITH SAID HUSH HUSH STUFF
    }

    function $change(edit) { // SUBMIT FUNCTION FOR YOUR EDITED DATAS
      SecretService.$change(vm.changing) // HITS MY SERVICE UP FOR AN AJAX CALL

    }


  }
}());

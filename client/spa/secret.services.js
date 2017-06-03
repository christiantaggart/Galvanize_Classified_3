(function() {
  'use strict'

  angular.module('secret')
    .service('SecretService', service) //MY 'AJAX' CALLS TO /server/routes/classifieds.js
  service.$inject = ['$http']

  function service($http) {

    this.$all = function() { // GET ALL CLASSIFIED INFO
      return $http.get('/api/classifieds').then((all) => {
        return all.data
      })
    }

    this.newSecret = function(newSecret) { // CREATE NEW CLASSIFIED OBJECT
      console.log('SecretService post request = ', newSecret)
      $http.post('/api/classifieds', newSecret)
    }

    this.$hush = function(id) { // DELETE CLASSIFIED OBJECT
      return $http.delete(`/api/classifieds/${id}`)
    }

    this.$change = function(edit) { // 'EDIT' CLASSIFIED OBJECT
      $http.patch(`/api/classifieds/${edit.id}/`, edit)
    }

  }
})();

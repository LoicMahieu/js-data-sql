describe('DSSqlAdapter#updateAll', function () {
  it('should update all items', function () {
    var id, id2;
    return adapter.create(User, {name: 'John', age: 20})
      .then(function (user) {
        id = user.id;
        return adapter.create(User, {name: 'John', age: 30});
      }).then(function (user) {
        id2 = user.id;
        return adapter.findAll(User, {
          name: 'John'
        });
      }).then(function (users) {
        users.sort(function (a, b) {
          return a.age - b.age;
        });
        assert.equalObjects(users, [{id: id, name: 'John', age: 20, profileId: null}, {
          id: id2,
          name: 'John',
          age: 30,
          profileId: null
        }]);
        return adapter.updateAll(User, {
          name: 'Johnny'
        }, {
          name: 'John'
        });
      }).then(function (users) {
        users.sort(function (a, b) {
          return a.age - b.age;
        });
        assert.equalObjects(users, [{id: id, name: 'Johnny', age: 20, profileId: null}, {
          id: id2,
          name: 'Johnny',
          age: 30,
          profileId: null
        }]);
        return adapter.findAll(User, {
          name: 'John'
        });
      }).then(function (users) {
        assert.equalObjects(users, []);
        assert.equal(users.length, 0);
        return adapter.findAll(User, {
          name: 'Johnny'
        });
      }).then(function (users) {
        users.sort(function (a, b) {
          return a.age - b.age;
        });
        assert.equalObjects(users, [{id: id, name: 'Johnny', age: 20, profileId: null}, {
          id: id2,
          name: 'Johnny',
          age: 30,
          profileId: null
        }]);
        return adapter.destroyAll(User);
      }).then(function (destroyedUser) {
        assert.isFalse(!!destroyedUser);
      });
  });
});
